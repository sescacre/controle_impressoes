import { MESES_PT } from '../config';
import type { BannerKind } from '../types';

export const fmtR = (n: number | null | undefined): string => 'R$ ' + (n || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const fmtN = (n: number | null | undefined): string => (n || 0).toLocaleString('pt-BR', { maximumFractionDigits: 0 });

export function monthLabel(key: string): string {
  const [y, m] = key.split('-').map(Number);
  return MESES_PT[m - 1] + '/' + y;
}

/** "Setembro de 2026" (versão por extenso, usada no aviso de mês sem dados). */
export function monthLabelLong(key: string): string {
  const [y, m] = key.split('-').map(Number);
  return MESES_PT[m - 1] + ' de ' + y;
}

export function nextMonthKey(key: string): string {
  let [y, m] = key.split('-').map(Number);
  m++;
  if (m > 12) { m = 1; y++; }
  return y + '-' + String(m).padStart(2, '0');
}

export function banner(msg: string, kind: BannerKind): string {
  return `<div class="banner ${kind}">${msg}</div>`;
}

export function sqlEscape(v: unknown): string {
  if (v === null || v === undefined) return 'NULL';
  if (typeof v === 'number') return String(v);
  return "'" + String(v).replace(/'/g, "''") + "'";
}
