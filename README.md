# SGCI — Controle de Impressão e Locação (Sesc Acre)

O SGCI (Sistema de Gestão Centralizada de Impressões) é um dashboard de custos de impressão e locação de equipamentos (contrato AC-2022-CS-003). Roda inteiramente no navegador; os dados ficam no `localStorage`.

O projeto segue o mesmo padrão de linguagem do [portal do cliente](../cliente/README.md): **TypeScript** em modo `strict`, com HTML e CSS separados do código.

---

# Estrutura

```text
html/
  index.html            página (sem CSS nem JS embutidos)
assets/
  apple-icon.png        ícone do Sesc (mesmo do portal do cliente), usado na aba do navegador
  logo-sgci.png         logotipo do SGCI exibido no cabeçalho (recorte de icone.png, com fundo transparente)
css/
  variables.css         tokens de cor, fontes e raio
  base.css              reset, layout base e utilitários
  header.css            cabeçalho, seletores de mês/ano, botões
  contract.css          KPIs do contrato no cabeçalho
  swal.css              tema do SweetAlert2 (login admin)
  dashboard.css         KPIs, painéis, gráficos e filtros
  tables.css            tabelas de detalhamento e histórico
  modal.css             modal de lançamento de leituras
ts/
  main.ts               ponto de entrada: liga eventos e inicializa
  config.ts             constantes (contrato, regras de preço, admin, CDNs)
  types.ts              tipos de domínio e declarações das libs globais
  state.ts              estado compartilhado
  data/                 seed.ts (dados da planilha), pricing.ts, rows.ts,
                        localDb.ts (localStorage), repository.ts
  ui/                   render.ts, kpis.ts, charts.ts, tables.ts, filters.ts,
                        selectors.ts, lancamento.ts, admin.ts
  export/               excel.ts, sql.ts, pdf.ts, download.ts
  utils/                dom.ts, format.ts, scriptLoader.ts
dist/
  app.js                bundle gerado a partir de ts/ (não editar)
legacy/
  dashboard_getic_standalone.html   versão original, em arquivo único
```

---

# Como usar

```bash
npm install
npm run build      # confere os tipos (tsc) e gera dist/app.js
```

Depois é só abrir `html/index.html` no navegador (duplo clique, sem servidor). Chart.js, jsPDF, SheetJS e SweetAlert2 continuam sendo carregados por CDN, como antes — é preciso ter internet.

Durante o desenvolvimento, `npm run dev` compila o TypeScript em memória e serve o projeto em <http://localhost:8080/html/index.html> (recarregue a página após editar; não altera `dist/`). Já `npm run watch` recompila a cada alteração (com sourcemap) e `npm run typecheck` roda só a checagem de tipos.

> Depois de editar qualquer arquivo em `ts/`, rode `npm run build` (ou deixe o `watch` ligado): a página carrega `dist/app.js`, não os `.ts`.
