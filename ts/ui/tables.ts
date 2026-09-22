import { categoriaOf, rotuloCategoria } from '../data/categorias';
import { filtered, rowsForMonth, withPct } from '../data/rows';
import { state } from '../state';
import type { LinhaHistorico, LinhaMes } from '../types';
import { $ } from '../utils/dom';
import { fmtN, fmtR, monthLabel } from '../utils/format';

/* Colunas de texto ordenam de A a Z na primeira vez; as numéricas, do maior para o menor. */
const TEXT_COLUMNS = ['sigla', 'setor', 'tipo_equip', 'cod_orc'];

/** Etiqueta colorida da categoria do equipamento (coluna "Tipo"). */
function tagFor(d: LinhaMes): string {
  return `<span class="tag cat-${categoriaOf(d)}">${rotuloCategoria(d)}</span>`;
}

/** A coluna "Tipo" mostra a categoria, então é por ela que ordena (não pelo tipo_equip bruto). */
function valorOrdenacao<T extends LinhaMes>(d: T, key: keyof T): string | number {
  return key === 'tipo_equip' ? rotuloCategoria(d) : d[key] as string | number;
}

/* ---------------- detalhamento por equipamento ---------------- */

let sortKey: keyof LinhaMes = 'geral';
let sortDir = -1;

export function renderTable(): void {
  const rows = [...filtered()];
  rows.sort((a, b) => {
    const av = valorOrdenacao(a, sortKey), bv = valorOrdenacao(b, sortKey);
    if (typeof av === 'string') return sortDir * av.localeCompare(bv as string);
    return sortDir * ((av as number) - (bv as number));
  });
  const maxPct = Math.max(1, ...withPct(rowsForMonth(state.currentMonth)).map(d => d.pct));
  $('tbody').innerHTML = rows.map(d => `
    <tr>
      <td>${d.item}</td>
      <td class="name">${d.sigla}</td>
      <td class="cc">${d.cod_orc}</td>
      <td class="name">${d.setor}</td>
      <td>${tagFor(d)}</td>
      <td class="num">${fmtR(d.valor_loc)}</td>
      <td class="num">${fmtN(d.qtd_copia)}</td>
      <td class="num">${fmtR(d.valor_copias)}</td>
      <td class="num">${fmtR(d.geral)}</td>
      <td class="num"><span class="barcell"><i style="width:${(d.pct / maxPct * 100).toFixed(0)}%"></i></span>${d.pct}%</td>
    </tr>
  `).join('');
}

/* ---------------- histórico completo (área admin) ---------------- */

let sortKeyHist: keyof LinhaHistorico = 'monthKey';
let sortDirHist = -1;

export function renderHistoryTable(): void {
  const rows: LinhaHistorico[] = [];
  state.months.forEach(mk => {
    rowsForMonth(mk).forEach(d => { rows.push({ ...d, monthKey: mk, monthLabel: monthLabel(mk) }); });
  });
  rows.forEach(d => { d.pct = 0; });
  rows.sort((a, b) => {
    const av = valorOrdenacao(a, sortKeyHist), bv = valorOrdenacao(b, sortKeyHist);
    if (typeof av === 'string') return sortDirHist * String(av).localeCompare(String(bv));
    return sortDirHist * (((av as number) || 0) - ((bv as number) || 0));
  });
  $('tbodyHist').innerHTML = rows.map(d => `
    <tr>
      <td>${d.monthLabel}</td>
      <td class="name">${d.sigla}</td>
      <td class="cc">${d.cod_orc}</td>
      <td class="name">${d.setor}</td>
      <td>${tagFor(d)}</td>
      <td class="num">${fmtN(d.leitura_anterior)}</td>
      <td class="num">${fmtN(d.leitura_atual)}</td>
      <td class="num">${fmtN(d.qtd_copia)}</td>
      <td class="num">${fmtR(d.valor_copias)}</td>
      <td class="num">${fmtR(d.valor_loc)}</td>
      <td class="num">${fmtR(d.geral)}</td>
    </tr>
  `).join('');
}

export function bindTableSorting(): void {
  document.querySelectorAll<HTMLElement>('#tbl thead th').forEach(th => {
    th.addEventListener('click', () => {
      const k = th.dataset.k as keyof LinhaMes;
      if (sortKey === k) { sortDir *= -1; } else { sortKey = k; sortDir = TEXT_COLUMNS.includes(k) ? 1 : -1; }
      renderTable();
    });
  });
  document.querySelectorAll<HTMLElement>('#tblHist thead th').forEach(th => {
    th.addEventListener('click', () => {
      const k = th.dataset.k as keyof LinhaHistorico;
      if (sortKeyHist === k) { sortDirHist *= -1; } else { sortKeyHist = k; sortDirHist = (TEXT_COLUMNS.includes(k) || k === 'monthKey') ? 1 : -1; }
      renderHistoryTable();
    });
  });
}
