import type { Chart } from 'chart.js';
import { CATEGORIAS, categoriaOf, rotuloCategoria, type CategoriaEquip } from '../data/categorias';
import { filtered, rowsForMonth, withPct } from '../data/rows';
import { state } from '../state';
import { $ } from '../utils/dom';
import { fmtR } from '../utils/format';

const charts: Record<string, Chart> = {};

/* Cor fixa por categoria: não muda de cor quando o filtro de unidade faz uma categoria sumir. */
const COR_CATEGORIA: Record<CategoriaEquip, string> = {
  multifuncional: '--accent',
  plotter: '--amber',
  frenteVerso: '--teal',
  policromatica: '--purple',
};

function destroy(id: string): void {
  if (charts[id]) { charts[id].destroy(); delete charts[id]; }
}

const hasChart = (): boolean => typeof window.Chart !== 'undefined';

/** Chamado uma vez na inicialização, depois que o Chart.js (CDN) já foi carregado. */
export function configureChartDefaults(): void {
  if (window.Chart) {
    window.Chart.defaults.font.family = "'IBM Plex Sans', system-ui, sans-serif";
    window.Chart.defaults.font.size = 11.5;
  }
}

function cssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/** Devolve o canvas, ou null (já mostrando o aviso) se o Chart.js não estiver disponível. */
function canvasOrFallback(id: string): HTMLCanvasElement | null {
  const canvas = $<HTMLCanvasElement>(id);
  if (!hasChart()) {
    (canvas.parentElement as HTMLElement).innerHTML = '<div class="chart-fallback">Gráfico indisponível nesta visualização.</div>';
    return null;
  }
  return canvas;
}

function renderChartSetor(): void {
  const canvas = canvasOrFallback('chartSetor');
  if (!canvas) return;
  const rows = [...filtered()].sort((a, b) => b.geral - a.geral).slice(0, 10);
  destroy('setor');
  charts.setor = new window.Chart!(canvas, {
    type: 'bar',
    data: { labels: rows.map(d => d.sigla), datasets: [{ data: rows.map(d => d.geral), backgroundColor: cssVar('--accent'), borderRadius: 4, maxBarThickness: 22 }] },
    options: {
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => fmtR(c.raw as number), afterLabel: c => `Impressora: ${rotuloCategoria(rows[c.dataIndex])}` } },
      },
      scales: { x: { grid: { color: cssVar('--grid') }, ticks: { callback: v => 'R$' + v } }, y: { grid: { display: false } } },
    },
  });
}

function renderChartTipo(): void {
  const canvas = canvasOrFallback('chartTipo');
  if (!canvas) return;
  const byCategoria: Partial<Record<CategoriaEquip, number>> = {};
  filtered().forEach(d => { const c = categoriaOf(d); byCategoria[c] = (byCategoria[c] || 0) + d.geral; });
  const categorias = CATEGORIAS.filter(c => byCategoria[c.id] !== undefined);
  destroy('tipo');
  charts.tipo = new window.Chart!(canvas, {
    type: 'doughnut',
    data: {
      labels: categorias.map(c => c.plural.charAt(0).toUpperCase() + c.plural.slice(1)),
      datasets: [{ data: categorias.map(c => byCategoria[c.id] as number), backgroundColor: categorias.map(c => cssVar(COR_CATEGORIA[c.id])), borderWidth: 2, borderColor: cssVar('--panel') }],
    },
    options: { cutout: '62%', plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, boxHeight: 10, padding: 14 } }, tooltip: { callbacks: { label: c => c.label + ': ' + fmtR(c.raw as number) } } } },
  });
}

function renderChartUnidade(): void {
  const canvas = canvasOrFallback('chartUnidade');
  if (!canvas) return;
  const rows = withPct(rowsForMonth(state.currentMonth));
  const byGrupo: Record<string, number> = {};
  rows.forEach(d => { byGrupo[d.grupo] = (byGrupo[d.grupo] || 0) + d.geral; });
  const labels = Object.keys(byGrupo);
  destroy('unidade');
  charts.unidade = new window.Chart!(canvas, {
    type: 'bar',
    data: { labels, datasets: [{ data: labels.map(l => byGrupo[l]), backgroundColor: labels.map(l => l === state.currentGrupo || state.currentGrupo === 'Todos' ? cssVar('--teal') : cssVar('--muted')), borderRadius: 4, maxBarThickness: 46 }] },
    options: { plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => fmtR(c.raw as number) } } }, scales: { x: { grid: { display: false } }, y: { grid: { color: cssVar('--grid') }, ticks: { callback: v => 'R$' + v } } } },
  });
}

function renderChartTop(): void {
  const canvas = canvasOrFallback('chartTop');
  if (!canvas) return;
  const rows = [...filtered()].sort((a, b) => b.pct - a.pct).slice(0, 8);
  destroy('top');
  charts.top = new window.Chart!(canvas, {
    type: 'bar',
    data: { labels: rows.map(d => d.sigla), datasets: [{ data: rows.map(d => d.pct), backgroundColor: cssVar('--amber'), borderRadius: 4, maxBarThickness: 20 }] },
    options: { indexAxis: 'y', plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => c.raw + '%' } } }, scales: { x: { grid: { color: cssVar('--grid') }, ticks: { callback: v => v + '%' } }, y: { grid: { display: false } } } },
  });
}

export function renderCharts(): void {
  try { renderChartSetor(); renderChartTipo(); renderChartUnidade(); renderChartTop(); }
  catch (e) { console.error('Falha ao desenhar gráficos', e); }
}
