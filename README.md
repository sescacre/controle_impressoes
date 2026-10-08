# PrintGest · Controle de Impressão

O **PrintGest** (Sistema de Gestão Centralizada de Impressões) é um dashboard para acompanhar custos de impressão e locação de equipamentos no âmbito do contrato **AC-2022-CS-003**. Ele centraliza leituras mensais de contadores por equipamento, calcula custos por página e por período, e exibe KPIs, gráficos e históricos que facilitam o controle orçamentário e a conferência de faturas da locadora.

A aplicação usa um banco de dados **MySQL compartilhado no servidor** (via uma pequena API em `server.js`/`server/`), então os dados lançados ficam visíveis em qualquer navegador ou computador que acesse o mesmo endereço — não ficam mais presos ao `localStorage` de um navegador específico. Relatórios podem ser exportados em Excel, PDF ou SQL diretamente da interface.

## Funcionalidades

- **Dashboard mensal**: KPIs de custo total, impressão, locação e consumo por mês/ano de referência.
- **Gráficos** (Chart.js): custo por setor, mix por tipo de equipamento e custo por unidade (Rio Branco, Interior e Centro Sul).
- **Lançamento de leituras**: tela para registrar as leituras atuais de cada equipamento a cada novo mês.
- **Histórico**: navegação entre meses já lançados, com recálculo automático de quantidade de cópias, valor e percentual de consumo.
- **Exportações**: Excel (.xlsx, no mesmo layout da planilha original), PDF (relatório/recibo) e geração de SQL.
- **Área administrativa**: protegida por usuário/senha (ver [Segurança](#segurança)), libera as ações de lançar mês, exportar, gerar SQL e cadastrar novos usuários.
- **Regras de preço centralizadas**: valor por folha e valor de locação calculados por modelo de máquina (`ts/data/pricing.ts`), aplicados retroativamente caso mudem.

## Stack técnica

- **TypeScript** compilado para IIFE único via [esbuild](https://esbuild.github.io/), sem framework de UI (DOM manipulado diretamente).
- **Chart.js**, **jsPDF**, **SweetAlert2** e **SheetJS (xlsx)** — carregados por CDN em runtime (com fallback `cdnjs` → `jsdelivr`, ver `ts/config.ts` e `ts/utils/scriptLoader.ts`) ou usados como tipos de desenvolvimento via `devDependencies`.
- **CSS puro**, organizado por responsabilidade em `css/` (variáveis, base, header, tabelas, modal, etc.).
- **Node (`http` nativo) + MySQL (`mysql2`)** como backend: `server.js` serve os arquivos estáticos e expõe a API `/api/...` (`server/api.js`, `server/db.js`) que lê/grava no banco compartilhado. Senhas de usuário são hasheadas com **bcryptjs** antes de ir para o banco.
- **Docker** com build multi-stage: a primeira etapa builda o TypeScript, a segunda roda o próprio `server.js` (Node) em produção — ver [Build e execução via Docker](#build-e-execução-via-docker).

## Estrutura do projeto

```
ts/
  main.ts            # ponto de entrada, monta o bundle
  config.ts           # constantes, regras de preço/contrato, credenciais admin, URLs de CDN
  state.ts             # estado em memória da aplicação
  types.ts             # tipos de domínio e das libs globais carregadas por CDN
  data/
    repository.ts      # carga/gravação no banco (via apiDb.ts)
    apiDb.ts             # implementação da API de coleções sobre fetch("/api/db/...")
    pricing.ts          # regras de valor por folha e por locação
    rows.ts              # montagem das linhas de cada mês (cálculo de custo/percentual)
    seed.ts               # dados semente (equipamentos e histórico real)
    categorias.ts          # agrupamentos/categorias usados nos gráficos
  ui/
    render.ts           # orquestração da renderização da página
    kpis.ts, charts.ts, tables.ts, filters.ts, selectors.ts, lancamento.ts, admin.ts, importar.ts
  export/
    excel.ts, pdf.ts, sql.ts, download.ts
  utils/
    dom.ts, format.ts, scriptLoader.ts
html/index.html        # HTML principal (referencia css/ e dist/app.js)
css/                    # folhas de estilo
assets/                 # logo, ícones e fontes locais
dist/app.js              # bundle gerado pelo build (gerado, não versionado no runtime de prod)
legacy/                  # versão HTML standalone anterior, mantida como referência
server.js                # serve os arquivos estáticos e delega /api/... para server/api.js
server/
  db.js                  # pool de conexão MySQL (lê host/usuário/senha de variáveis de ambiente)
  api.js                  # rotas REST /api/db/:colecao, /api/import e /api/usuarios, usadas por ts/data/apiDb.ts e ts/ui/admin.ts
db/schema.sql             # schema MySQL (equipamentos, meses, leituras, usuarios) para configurar o banco
```

## Como rodar localmente

Pré-requisitos: Node.js 20+, npm e um MySQL acessível (ex.: WampServer).

1. Configure o banco: rode `db/schema.sql` no seu MySQL (ex.: `mysql -u root -p < db/schema.sql`, ou importe pelo phpMyAdmin). Isso cria o banco `controle_impressoes` com as tabelas `equipamentos`, `meses`, `leituras` e `usuarios` (já com a conta `admin` semeada — ver [Segurança](#segurança)).
2. Configure as credenciais em `.env` (na raiz do projeto, já listado no `.gitignore`):

   ```
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD="sua_senha"
   DB_NAME=controle_impressoes
   ```
3. Instale as dependências e suba o app:

   ```bash
   npm install
   npm run dev
   ```

`npm run dev` libera a porta 3009 (se um processo anterior ficou preso nela), gera `dist/app.js` com sourcemap e sobe `server.js` em **http://localhost:3009** — mesma porta usada em produção (ver [Build e execução via Docker](#build-e-execução-via-docker)) —, servindo os arquivos estáticos **e** a API `/api/...` que fala com o MySQL. Para rebuild automático a cada alteração em `ts/` enquanto o servidor já está no ar, rode `npm run watch` em outro terminal.

### Scripts disponíveis

| Script      | Descrição                                                                 |
|-------------|----------------------------------------------------------------------------|
| `npm run dev`     | Libera a porta 3009, builda com sourcemap e sobe `server.js` (estáticos + API ligada ao MySQL). |
| `npm start`       | Sobe só `server.js` a partir do `dist/app.js` já existente (usado em produção). |
| `npm run watch`   | Rebuild automático de `dist/app.js` a cada alteração em `ts/`, sem servidor. |
| `npm run build`   | Checagem de tipos (`tsc`) + bundle minificado de produção em `dist/app.js`. |
| `npm run typecheck` | Roda apenas o `tsc` (sem emitir arquivos), útil em CI/pre-commit.        |

## Build e execução via Docker

```bash
docker build -t printgest .
docker run --rm -p 3009:3009 printgest
```

O `Dockerfile` usa build multi-stage: a primeira etapa roda `npm ci` + `npm run build` (checagem de tipos e bundle); a segunda instala só as dependências de produção e roda **`node server.js`** (estáticos + API ligada ao MySQL), na porta 3009. O `nginx.conf` do repositório não é mais usado pela imagem Docker (ficou como referência). A porta segue a sequência já usada no host (3000–3005 ocupadas por outros serviços/Dokploy; 8080 também ocupada); ajuste a variável `PORT` se precisar de outra.

Como a imagem não embute `.env` (fica fora do build por segurança), as variáveis `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` e `DB_NAME` precisam ser configuradas como variáveis de ambiente na plataforma de deploy (ex.: aba "Environment" no Dokploy) — sem elas, `server/db.js` cai nos valores padrão (`127.0.0.1`/`root`/sem senha) e não encontra o MySQL em produção.

## Persistência de dados

Todo o estado (equipamentos, meses lançados e leituras) é gravado em um **banco MySQL compartilhado no servidor**, não mais no navegador. O front-end fala com esse banco através de `ts/data/apiDb.ts`, que expõe a mesma API de coleções usada antes (`collection().doc().get()/set()/update()`) só que via `fetch("/api/db/...")`; quem de fato lê/grava no MySQL é `server/api.js` + `server/db.js` (pool `mysql2`, credenciais em variáveis de ambiente — ver `.env`). O schema fica em `db/schema.sql`, e inclui também a tabela `usuarios` (contas com acesso à área administrativa — ver [Segurança](#segurança)). Na primeira execução com o banco vazio, o app semeia automaticamente os equipamentos e o histórico real de meses (`ts/data/seed.ts`).

Como os dados agora ficam no servidor, qualquer navegador ou computador que acesse o mesmo endereço enxerga os mesmos lançamentos — diferente da versão anterior, em que cada navegador tinha sua própria cópia isolada em `localStorage`.

### Importar dados que ficaram presos em um navegador (migração da versão antiga)

Quem já usava a versão anterior (só `localStorage`) pode ter lançamentos que só existem em um navegador específico. A área administrativa tem o botão **"Importar dados deste navegador"**, que lê o `localStorage` do navegador atual e envia para o banco compartilhado (substituindo, no servidor, os registros de mês/equipamento que também existirem localmente). Use-o uma vez, no navegador onde os dados reais estão, depois que o backend estiver configurado e no ar.

> ⚠️ **Status atual**: a integração está validada rodando localmente e em produção contra um MySQL dedicado. A imagem Docker (`Dockerfile`) já roda `server.js` (estáticos + API), não mais nginx puro — ver [Build e execução via Docker](#build-e-execução-via-docker).

## Segurança

O botão **"🔒 Área admin"** libera ações sensíveis (lançar mês, exportar Excel/SQL, baixar relatório, cadastrar usuário) mediante usuário e senha. Essa validação ainda é feita **inteiramente no cliente** (`ts/config.ts` / `ts/ui/admin.ts`) e as credenciais padrão ficam visíveis em texto claro no bundle JavaScript gerado — portanto **ainda não é um mecanismo de segurança real**, apenas uma barreira de uso para evitar edições acidentais por usuários comuns. Não trate essa aplicação como apta a proteger dados sensíveis ou impedir acesso de usuários mal-intencionados; para isso é necessária autenticação no lado do servidor (próximo passo planejado).

### Tabela `usuarios`

Já existe uma tabela `usuarios` no banco (`db/schema.sql`), semeada com a conta `admin` (mesma senha hoje usada no login do cliente). As senhas são **sempre hasheadas com bcrypt** (`bcryptjs`, custo 10) antes de ir para o banco — nunca em texto puro. Dentro da área admin, o botão **"+ Cadastrar novo usuário"** abre um formulário (modal SweetAlert2 com nome, usuário, senha e confirmação de senha) que grava um novo registro via `POST /api/usuarios` (`server/api.js`).

> ⚠️ **Importante**: essa tabela ainda **não é consultada no login** — o botão "Área admin" continua validando contra `ADMIN_USER`/`ADMIN_PASS` no cliente. Além disso, `POST /api/usuarios` (como toda a API `/api/...` hoje) **não exige nenhuma autenticação no servidor**: qualquer pessoa com acesso de rede ao servidor pode chamar essa rota diretamente, sem passar pela tela de login. A tabela e o cadastro são a base para a próxima etapa (login validado no servidor + sessão), que ainda precisa ser implementada para fechar essa brecha.

## Contexto do contrato

Os valores de locação e de impressão por folha seguem a Cláusula Terceira do Contrato **AC-2022-CS-003** (SERMATEC), conferidos linha a linha contra a planilha oficial (Jan–Ago/2026) e centralizados em `ts/config.ts`:

- **Locação**: R$ 184,00/mês para os modelos C7020, C306, C605 e T120; R$ 80,00/mês para os demais.
- **Valor por folha**: R$ 0,38 para C7020, C306 e C605; R$ 8,00 para o T120 (plotter A1, impressão de grande formato); R$ 0,05 para os demais.
- **Total mensal estimado**: R$ 4.810,00 (impressão) + R$ 2.496,00 (locação, já com aditivo) — total anual de R$ 87.672,00.

Qualquer alteração contratual (novos equipamentos, reajuste de preços) deve ser refletida em `ts/config.ts` e `ts/data/pricing.ts`.
