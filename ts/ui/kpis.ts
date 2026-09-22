import { CONTRATO_ANUAL } from '../config';
import { CATEGORIAS, categoriaOf, type CategoriaEquip } from '../data/categorias';
import { filtered, rowsForMonth } from '../data/rows';
import { state } from '../state';
import type { LinhaMes } from '../types';
import { $ } from '../utils/dom';
import { fmtN, fmtR } from '../utils/format';

/** "3 policromáticas · 1 plotter A1 · …": só as categorias que existem no filtro atual. */
function detalheEquipamentos(rows: LinhaMes[]): string {
  const contagem: Partial<Record<CategoriaEquip, number>> = {};
  rows.forEach(d => { const c = categoriaOf(d); contagem[c] = (contagem[c] || 0) + 1; });
  return CATEGORIAS
    .filter(c => contagem[c.id])
    .map(c => `<span>${contagem[c.id]} ${contagem[c.id] === 1 ? c.singular : c.plural}</span>`)
    .join(' · ');
}

export function renderKpis(): void {
  const rows = filtered();
  const geral = rows.reduce((s, d) => s + d.geral, 0);
  const impr = rows.reduce((s, d) => s + d.valor_copias, 0);
  const loc = rows.reduce((s, d) => s + d.valor_loc, 0);
  const cop = rows.reduce((s, d) => s + d.qtd_copia, 0);
  $('kpis').innerHTML = `
    <div class="kpi k-geral"><div class="lbl">Custo total do mês</div><div class="val">${fmtR(geral)}</div><div class="sub">locação + impressão</div></div>
    <div class="kpi k-impr"><div class="lbl">Custo com impressão</div><div class="val">${fmtR(impr)}</div><div class="sub">${geral ? (impr / geral * 100).toFixed(1) : '0'}% do total</div></div>
    <div class="kpi k-loc"><div class="lbl">Custo com locação</div><div class="val">${fmtR(loc)}</div><div class="sub">${geral ? (loc / geral * 100).toFixed(1) : '0'}% do total</div></div>
    <div class="kpi k-eq"><div class="lbl">Equipamentos ativos</div><div class="val">${rows.length}<span class="unit">${rows.length === 1 ? 'unidade' : 'unidades'}</span></div><div class="sub">${detalheEquipamentos(rows)}</div></div>
    <div class="kpi k-cop"><div class="lbl">Cópias/impressões</div><div class="val">${fmtN(cop)}</div><div class="sub">custo médio ${cop ? fmtR(impr / cop) : 'R$ 0,00'}/cópia</div></div>
  `;
}

export function renderContractKpis(): void {
  // acumulado desde o início do contrato (soma de todos os meses já lançados)
  let acumImpr = 0, acumLoc = 0;
  state.months.forEach(mk => {
    rowsForMonth(mk).forEach(d => { acumImpr += d.valor_copias; acumLoc += d.valor_loc; });
  });
  const saldoImpr = CONTRATO_ANUAL.impressao - acumImpr;
  const saldoLoc = CONTRATO_ANUAL.locacao - acumLoc;
  $('contractKpis').innerHTML = `
    <div class="ckpi"><div class="lbl">Valor total (Impressões)</div><div class="val">${fmtR(CONTRATO_ANUAL.impressao)}</div><div class="sub">contrato anual</div></div>
    <div class="ckpi"><div class="lbl">Valor total (Locação)</div><div class="val">${fmtR(CONTRATO_ANUAL.locacao)}</div><div class="sub">contrato anual</div></div>
    <div class="ckpi ${saldoImpr >= 0 ? 'ok' : 'warn'}"><div class="lbl">Saldo Impressão</div><div class="val">${fmtR(saldoImpr)}</div><div class="sub">${saldoImpr >= 0 ? 'restante a consumir' : 'já ultrapassou em ' + fmtR(Math.abs(saldoImpr))} · gasto ${fmtR(acumImpr)}</div></div>
    <div class="ckpi ${saldoLoc >= 0 ? 'ok' : 'warn'}"><div class="lbl">Saldo Locação</div><div class="val">${fmtR(saldoLoc)}</div><div class="sub">${saldoLoc >= 0 ? 'restante a consumir' : 'já ultrapassou em ' + fmtR(Math.abs(saldoLoc))} · gasto ${fmtR(acumLoc)}</div></div>
  `;
}
