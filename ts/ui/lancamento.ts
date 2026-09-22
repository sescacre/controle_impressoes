import { seedReadings } from '../data/rows';
import { SEED_MONTH, state } from '../state';
import type { LinhaLancamento } from '../types';
import { $ } from '../utils/dom';
import { banner, fmtN, fmtR, monthLabel, nextMonthKey } from '../utils/format';

let lancMonthKey = '';
let lancRows: LinhaLancamento[] = [];

const overlay = (): HTMLElement => $('overlay');

function openLanc(): void {
  const { db, canWrite } = state;
  if (!db || !canWrite) return;
  lancMonthKey = nextMonthKey(state.months[state.months.length - 1] || SEED_MONTH);
  const prevMonth = state.months[state.months.length - 1] || SEED_MONTH;
  const prevReadings = state.readingsByMonth[prevMonth] || seedReadings();
  lancRows = state.equipList.map(e => ({
    item: e.item, sigla: e.sigla, cod_orc: e.cod_orc, valor_unit: e.valor_unit,
    leitura_anterior: (prevReadings[e.item] ? prevReadings[e.item].leitura_atual : e.l_atual),
    leitura_atual: null,
  }));
  $('lancTitulo').textContent = 'Lançamento de leituras — ' + monthLabel(lancMonthKey);
  $('lancBanner').innerHTML = '';
  $('lancStatus').textContent = '';
  renderLancTable();
  overlay().classList.add('open');
}

function closeLanc(): void {
  overlay().classList.remove('open');
}

/** Cópias e valor de uma linha; sem leitura atual informada, considera consumo zero. */
function calcLinha(r: LinhaLancamento): { qtd: number; val: number } {
  const atual = r.leitura_atual == null ? r.leitura_anterior : r.leitura_atual;
  const qtd = Math.max(0, atual - r.leitura_anterior);
  return { qtd, val: qtd * r.valor_unit };
}

function renderLancTable(): void {
  $('lancBody').innerHTML = lancRows.map((r, i) => `
    <div class="lanc-cols lanc-row">
      <div class="lanc-cell name">${r.sigla}</div>
      <div class="lanc-cell name">${r.cod_orc}</div>
      <div class="lanc-cell num">${fmtN(r.leitura_anterior)}</div>
      <div class="lanc-cell num"><input type="number" step="0.01" min="0" data-i="${i}" class="input-atual" placeholder="${fmtN(r.leitura_anterior)}"></div>
      <div class="lanc-cell num" id="lanc-qtd-${i}">0</div>
      <div class="lanc-cell num" id="lanc-val-${i}">R$ 0,00</div>
    </div>
  `).join('');
  document.querySelectorAll<HTMLInputElement>('.input-atual').forEach(inp => {
    inp.addEventListener('input', () => {
      const i = Number(inp.dataset.i);
      lancRows[i].leitura_atual = inp.value === '' ? null : parseFloat(inp.value);
      updateLancRow(i);
      updateLancTotals();
    });
  });
  updateLancTotals();
}

function updateLancRow(i: number): void {
  const { qtd, val } = calcLinha(lancRows[i]);
  $('lanc-qtd-' + i).textContent = fmtN(qtd);
  $('lanc-val-' + i).textContent = fmtR(val);
}

function updateLancTotals(): void {
  let totQtd = 0, totVal = 0;
  lancRows.forEach(r => {
    const { qtd, val } = calcLinha(r);
    totQtd += qtd;
    totVal += val;
  });
  $('lancTotCopias').textContent = fmtN(totQtd);
  $('lancTotValor').textContent = fmtR(totVal);
}

async function salvarLancamento(onSaved: () => void): Promise<void> {
  const db = state.db;
  if (!db) return;
  const faltando = lancRows.filter(r => r.leitura_atual == null);
  const invalidas = lancRows.filter(r => r.leitura_atual != null && r.leitura_atual < r.leitura_anterior);
  if (faltando.length) {
    $('lancBanner').innerHTML = banner(`Faltam ${faltando.length} leitura(s) atual(is) para salvar o mês inteiro.`, 'warn');
    return;
  }
  if (invalidas.length) {
    $('lancBanner').innerHTML = banner(`${invalidas.length} leitura(s) atual(is) menor(es) que a anterior — confira antes de salvar.`, 'err');
    return;
  }
  const btnSalvar = $<HTMLButtonElement>('btnSalvarLanc');
  btnSalvar.disabled = true;
  $('lancStatus').textContent = 'Salvando…';
  try {
    await Promise.all(lancRows.map(r => db.collection('leituras').doc(lancMonthKey + '_' + r.item).set({
      monthKey: lancMonthKey, item: r.item, leitura_anterior: r.leitura_anterior, leitura_atual: r.leitura_atual, savedAt: new Date().toISOString(),
    })));
    await db.collection('meses').doc(lancMonthKey).set({ monthKey: lancMonthKey, label: monthLabel(lancMonthKey), createdAt: new Date().toISOString() });

    state.months.push(lancMonthKey);
    const r: Record<string, { leitura_anterior: number; leitura_atual: number }> = {};
    lancRows.forEach(x => { r[x.item] = { leitura_anterior: x.leitura_anterior, leitura_atual: x.leitura_atual as number }; });
    state.readingsByMonth[lancMonthKey] = r;
    state.currentMonth = lancMonthKey;

    $('lancStatus').textContent = 'Salvo!';
    setTimeout(() => { closeLanc(); onSaved(); }, 400);
  } catch (e) {
    console.error(e);
    $('lancBanner').innerHTML = banner('Não foi possível salvar agora. Tente novamente em instantes.', 'err');
    $('lancStatus').textContent = '';
  }
  btnSalvar.disabled = false;
}

export function bindLancamento(onSaved: () => void): void {
  $('btnNovoMes').addEventListener('click', openLanc);
  $('btnFechar').addEventListener('click', closeLanc);
  $('btnCancelar').addEventListener('click', closeLanc);
  $('btnSalvarLanc').addEventListener('click', () => salvarLancamento(onSaved));
  overlay().addEventListener('click', (e) => { if (e.target === overlay()) closeLanc(); });
}
