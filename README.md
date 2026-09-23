# PrintGest · Controle de Impressão

O **PrintGest** (Sistema de Gestão Centralizada de Impressões) é um dashboard para acompanhar custos de impressão e locação de equipamentos no âmbito do contrato **AC-2022-CS-003**. Ele centraliza leituras mensais de contadores por equipamento, calcula custos por página e por período, e exibe KPIs, gráficos e históricos que facilitam o controle orçamentário e a conferência de faturas da locadora.

A aplicação utiliza atualmente o armazenamento local do navegador via `localStorage` (numa camada que imita a API de coleções de um banco de documentos), e relatórios podem ser exportados em Excel, PDF ou SQL diretamente da interface. A arquitetura pode ser integrada a um backend e a um banco de dados futuramente, conforme a necessidade do projeto.

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
- **Docker + Nginx** para build e serviço dos arquivos estáticos em produção.

## Estrutura do projeto

```
ts/
  main.ts            # ponto de entrada, monta o bundle
  config.ts           # constantes, regras de preço/contrato, credenciais admin, URLs de CDN
  state.ts             # estado em memória da aplicação
  types.ts             # tipos de domínio e das libs globais carregadas por CDN
  data/
    repository.ts      # carga/gravação no "banco" local (localStorage)
    localDb.ts          # implementação da API de coleções sobre localStorage
    pricing.ts          # regras de valor por folha e por locação
    rows.ts              # montagem das linhas de cada mês (cálculo de custo/percentual)
    seed.ts               # dados semente (equipamentos e histórico real)
    categorias.ts          # agrupamentos/categorias usados nos gráficos
  ui/
    render.ts           # orquestração da renderização da página
    kpis.ts, charts.ts, tables.ts, filters.ts, selectors.ts, lancamento.ts, admin.ts
  export/
    excel.ts, pdf.ts, sql.ts, download.ts
  utils/
    dom.ts, format.ts, scriptLoader.ts
html/index.html        # HTML principal (referencia css/ e dist/app.js)
css/                    # folhas de estilo
assets/                 # logo, ícones e fontes locais
dist/app.js              # bundle gerado pelo build (gerado, não versionado no runtime de prod)
legacy/                  # versão HTML standalone anterior, mantida como referência
```

## Como rodar localmente

Pré-requisitos: Node.js 20+ e npm.

```bash
npm install
npm run dev
```

O `dev` sobe um servidor local (esbuild `--servedir`) em **http://localhost:8080**, com bundle e sourcemap gerados a partir de `ts/main.ts`. Abra `html/index.html` pelo servidor (ex.: `http://localhost:8080/html/index.html`).

### Scripts disponíveis

| Script      | Descrição                                                                 |
|-------------|----------------------------------------------------------------------------|
| `npm run dev`     | Build com sourcemap + servidor estático com live reload manual (esbuild). |
| `npm run watch`   | Rebuild automático a cada alteração em `ts/`, sem servidor.               |
| `npm run build`   | Checagem de tipos (`tsc`) + bundle minificado de produção em `dist/app.js`. |
| `npm run typecheck` | Roda apenas o `tsc` (sem emitir arquivos), útil em CI/pre-commit.        |

## Build e execução via Docker

```bash
docker build -t printgest .
docker run --rm -p 3500:3500 printgest
```

O `Dockerfile` usa build multi-stage: a primeira etapa roda `npm ci` + `npm run build` (checagem de tipos e bundle); a segunda copia `dist/`, `html/`, `css/` e `assets/` para uma imagem `nginx-unprivileged`, que serve tudo na porta 3500 (ver `nginx.conf`). A porta foi escolhida para não colidir com serviços comuns do host (ex.: 3000 do Dokploy, 8080/8090/3400 já usados por outros serviços); ajuste `nginx.conf` (Docker) ou a variável `PORT` (`npm start`, Nixpacks) se precisar de outra.

## Persistência de dados

Atualmente, todo o estado (equipamentos, meses lançados e leituras) é gravado no `localStorage` do navegador através de uma camada (`ts/data/localDb.ts`) que expõe uma API de coleções (`collection().doc().get()/set()/update()`), inspirada em bancos de documentos. Na primeira execução, o app semeia automaticamente os equipamentos e o histórico real de meses (`ts/data/seed.ts`). Essa camada pode ser substituída ou conectada a um backend e a um banco de dados quando essa evolução for necessária.

> Como os dados vivem no navegador do usuário, limpar o cache/localStorage do navegador apaga o histórico local. Use as exportações (Excel/PDF/SQL) para manter backups fora do navegador.

## Segurança

O botão **"🔒 Área admin"** libera ações sensíveis (lançar mês, exportar Excel/SQL, baixar relatório) mediante usuário e senha. Essa validação é feita **inteiramente no cliente** (`ts/config.ts` / `ts/ui/admin.ts`) e as credenciais ficam visíveis em texto claro no bundle JavaScript gerado — portanto **não é um mecanismo de segurança real**, apenas uma barreira de uso para evitar edições acidentais por usuários comuns. Não trate essa aplicação como apta a proteger dados sensíveis ou impedir acesso de usuários mal-intencionados; para isso seria necessária autenticação no lado do servidor.

## Contexto do contrato

Os valores de locação e de impressão por folha seguem a Cláusula Terceira do Contrato **AC-2022-CS-003** (SERMATEC), conferidos linha a linha contra a planilha oficial (Jan–Ago/2026) e centralizados em `ts/config.ts`:

- **Locação**: R$ 184,00/mês para os modelos C7020, C306, C605 e T120; R$ 80,00/mês para os demais.
- **Valor por folha**: R$ 0,38 para C7020, C306 e C605; R$ 8,00 para o T120 (plotter A1, impressão de grande formato); R$ 0,05 para os demais.
- **Total mensal estimado**: R$ 4.810,00 (impressão) + R$ 2.496,00 (locação, já com aditivo) — total anual de R$ 87.672,00.

Qualquer alteração contratual (novos equipamentos, reajuste de preços) deve ser refletida em `ts/config.ts` e `ts/data/pricing.ts`.
