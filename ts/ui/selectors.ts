import { MESES_PT } from '../config';
import { state } from '../state';
import { $ } from '../utils/dom';

export function renderYearSelect(): void {
  const yearSel = $<HTMLSelectElement>('yearSelect');
  const years = Array.from(new Set([
    ...state.months.map(mk => mk.split('-')[0]),
    String(new Date().getFullYear()),
  ]));
  const curYear = state.currentMonth.split('-')[0];
  if (!years.includes(curYear)) years.push(curYear);
  years.sort();
  yearSel.innerHTML = years.map(y => `<option value="${y}"${y === curYear ? ' selected' : ''}>${y}</option>`).join('');
}

export function renderMonthSelect(): void {
  renderYearSelect();
  const sel = $<HTMLSelectElement>('monthSelect');
  const year = state.currentMonth.split('-')[0];
  let opts = '';
  for (let m = 1; m <= 12; m++) {
    const mk = year + '-' + String(m).padStart(2, '0');
    const has = state.months.includes(mk);
    const sel_attr = mk === state.currentMonth ? ' selected' : '';
    const label = MESES_PT[m - 1] + (has ? '' : ' (sem dados)');
    opts += `<option value="${mk}"${sel_attr}>${label}</option>`;
  }
  sel.innerHTML = opts;
}

export function bindSelectors(onChange: () => void): void {
  $<HTMLSelectElement>('yearSelect').addEventListener('change', (e) => {
    const newYear = (e.target as HTMLSelectElement).value;
    const monthPart = state.currentMonth.split('-')[1];
    const candidate = newYear + '-' + monthPart;
    state.currentMonth = state.months.includes(candidate) ? candidate : (state.months.find(mk => mk.startsWith(newYear + '-')) || candidate);
    onChange();
  });
  $<HTMLSelectElement>('monthSelect').addEventListener('change', (e) => {
    state.currentMonth = (e.target as HTMLSelectElement).value;
    onChange();
  });
}
