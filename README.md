# PrintGest · Controle de Impressão

O **PrintGest** (Sistema de Gestão Centralizada de Impressões) é um dashboard para acompanhar custos de impressão e locação de equipamentos no âmbito do contrato **AC-2022-CS-003**. Ele centraliza leituras mensais de contadores por equipamento, calcula custos por página e por período, e exibe KPIs, gráficos e históricos que facilitam o controle orçamentário e a conferência de faturas da locadora.

A aplicação usa um banco de dados **MySQL compartilhado no servidor** (via uma pequena API em `server.js`/`server/`), então os dados lançados ficam visíveis em qualquer navegador ou computador que acesse o mesmo endereço — não ficam mais presos ao `localStorage` de um navegador específico. Relatórios podem ser exportados em Excel, PDF ou SQL diretamente da interface.

## Funcionalidades

- **Dashboard mensal**: KPIs de custo total, impressão, locação e consumo por mês/ano de referência.
- **Gráficos** (Chart.js): custo por setor, mix por tipo de equipamento e custo por unidade (Rio Branco, Interior e Centro Sul).
- **Lançamento de leituras**: tela para registrar as leituras atuais de cada equipamento a cada novo mês.
- **Histórico**: navegação entre meses já lançados, com recálculo automático de quantidade de cópias, valor e percentual de consumo.
- **Exportações**: Excel (.xlsx, no mesmo layout da planilha original), PDF (relatório/recibo) e geração de SQL.
- **Área administrativa**: protegida por usuário/senha (ver [Segurança](#segurança)), libera as ações de lançar mês, exportar e gerar SQL.
- **Regras de preço centralizadas**: valor por folha e valor de locação calculados por modelo de máquina (`ts/data/pricing.ts`), aplicados retroativamente caso mudem.

## Stack técnica

- **TypeScript** compilado para IIFE único via [esbuild](https://esbuild.github.io/), sem framework de UI (DOM manipulado diretamente).
- **Chart.js**, **jsPDF**, **SweetAlert2** e **SheetJS (xlsx)** — carregados por CDN em runtime (com fallback `cdnjs` → `jsdelivr`, ver `ts/config.ts` e `ts/utils/scriptLoader.ts`) ou usados como tipos de desenvolvimento via `devDependencies`.
- **CSS puro**, organizado por responsabilidade em `css/` (variáveis, base, header, tabelas, modal, etc.).
- **Node (`http` nativo) + MySQL (`mysql2`)** como backend: `server.js` serve os arquivos estáticos e expõe a API `/api/...` (`server/api.js`, `server/db.js`) que lê/grava no banco compartilhado.
- **Docker + Nginx** para build e serviço dos arquivos estáticos em produção (a integração do container de produção com o MySQL ainda depende de uma etapa futura — ver [Persistência de dados](#persistência-de-dados)).

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
  api.js                  # rotas REST /api/db/:colecao e /api/import, usadas por ts/data/apiDb.ts
db/schema.sql             # schema MySQL (equipamentos, meses, leituras) para configurar o banco
```

## Como rodar localmente

Pré-requisitos: Node.js 20+, npm e um MySQL acessível (ex.: WampServer).

1. Configure o banco: rode `db/schema.sql` no seu MySQL (ex.: `mysql -u root -p < db/schema.sql`, ou importe pelo phpMyAdmin). Isso cria o banco `controle_impressoes` com as tabelas `equipamentos`, `meses` e `leituras`.
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

O `Dockerfile` usa build multi-stage: a primeira etapa roda `npm ci` + `npm run build` (checagem de tipos e bundle); a segunda copia `dist/`, `html/`, `css/` e `assets/` para uma imagem `nginx-unprivileged`, que serve tudo na porta 3009 (ver `nginx.conf`). A porta segue a sequência já usada no host (3000–3005 ocupadas por outros serviços/Dokploy; 8080 também ocupada); ajuste `nginx.conf` (Docker) ou a variável `PORT` (`npm start`, Nixpacks) se precisar de outra.

## Persistência de dados

Todo o estado (equipamentos, meses lançados e leituras) é gravado em um **banco MySQL compartilhado no servidor**, não mais no navegador. O front-end fala com esse banco através de `ts/data/apiDb.ts`, que expõe a mesma API de coleções usada antes (`collection().doc().get()/set()/update()`) só que via `fetch("/api/db/...")`; quem de fato lê/grava no MySQL é `server/api.js` + `server/db.js` (pool `mysql2`, credenciais em variáveis de ambiente — ver `.env`). O schema fica em `db/schema.sql`. Na primeira execução com o banco vazio, o app semeia automaticamente os equipamentos e o histórico real de meses (`ts/data/seed.ts`).

Como os dados agora ficam no servidor, qualquer navegador ou computador que acesse o mesmo endereço enxerga os mesmos lançamentos — diferente da versão anterior, em que cada navegador tinha sua própria cópia isolada em `localStorage`.

### Importar dados que ficaram presos em um navegador (migração da versão antiga)

Quem já usava a versão anterior (só `localStorage`) pode ter lançamentos que só existem em um navegador específico. A área administrativa tem o botão **"Importar dados deste navegador"**, que lê o `localStorage` do navegador atual e envia para o banco compartilhado (substituindo, no servidor, os registros de mês/equipamento que também existirem localmente). Use-o uma vez, no navegador onde os dados reais estão, depois que o backend estiver configurado e no ar.

> ⚠️ **Status atual**: a integração está validada rodando localmente contra um MySQL (ex.: WampServer). A imagem Docker de produção (`Dockerfile`/`nginx.conf`) ainda serve só os arquivos estáticos, sem o backend/MySQL — portanto o deploy em produção precisa ser adaptado (rodar `server.js` em vez de nginx puro, e apontar para um MySQL acessível pelo host) antes que a versão compartilhada substitua a de produção atual.

## Segurança

O botão **"🔒 Área admin"** libera ações sensíveis (lançar mês, exportar Excel/SQL, baixar relatório) mediante usuário e senha. Essa validação é feita **inteiramente no cliente** (`ts/config.ts` / `ts/ui/admin.ts`) e as credenciais ficam visíveis em texto claro no bundle JavaScript gerado — portanto **não é um mecanismo de segurança real**, apenas uma barreira de uso para evitar edições acidentais por usuários comuns. Não trate essa aplicação como apta a proteger dados sensíveis ou impedir acesso de usuários mal-intencionados; para isso seria necessária autenticação no lado do servidor.

## Contexto do contrato

Os valores de locação e de impressão por folha seguem a Cláusula Terceira do Contrato **AC-2022-CS-003** (SERMATEC), conferidos linha a linha contra a planilha oficial (Jan–Ago/2026) e centralizados em `ts/config.ts`:

- **Locação**: R$ 184,00/mês para os modelos C7020, C306, C605 e T120; R$ 80,00/mês para os demais.
- **Valor por folha**: R$ 0,38 para C7020, C306 e C605; R$ 8,00 para o T120 (plotter A1, impressão de grande formato); R$ 0,05 para os demais.
- **Total mensal estimado**: R$ 4.810,00 (impressão) + R$ 2.496,00 (locação, já com aditivo) — total anual de R$ 87.672,00.

Qualquer alteração contratual (novos equipamentos, reajuste de preços) deve ser refletida em `ts/config.ts` e `ts/data/pricing.ts`.
