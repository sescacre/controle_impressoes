import { mesTemDados } from '../data/rows';
import { state } from '../state';
import { $ } from '../utils/dom';
import { monthLabel, monthLabelLong } from '../utils/format';
import { renderCharts } from './charts';
import { renderFilters } from './filters';
import { renderContractKpis, renderKpis } from './kpis';
import { renderMonthSelect } from './selectors';
import { renderHistoryTable, renderTable } from './tables';

function renderFooter(temDados: boolean): void {
  const footer = $('footerNote');
  footer.classList.toggle('left', !temDados);
  footer.textContent = temDados
    ? `Mês de referência: ${monthLabel(state.currentMonth)} · Fonte inicial: planilha_de_impressão.xlsx (semente Agosto/2026) · Centro de custo = COD. ORÇ. da planilha.`
    : 'Fonte: planilha “Relatório de Impressão Sermatec 2026” (controle interno GETIC, jan-ago). Leituras lançadas ficam salvas neste navegador (localStorage). Plotter A1 é medida em metros lineares.';
}

export function renderAll(): void {
  const temDados = mesTemDados(state.currentMonth);
  // mostra/esconde antes de desenhar: o Chart.js precisa do contêiner visível para medir o tamanho
  $('dashboardContent').hidden = !temDados;
  $('emptyState').hidden = temDados;

  renderMonthSelect();
  renderFilters(renderAll);
  renderContractKpis();
  renderHistoryTable();
  renderFooter(temDados);
  if (temDados) {
    renderKpis();
    renderTable();
    renderCharts();
  } else {
    $('emptyTitle').textContent = monthLabelLong(state.currentMonth);
  }
}
