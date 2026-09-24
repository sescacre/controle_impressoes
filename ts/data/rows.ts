import { state } from '../state';
import type { LeiturasMes, LinhaMes } from '../types';
import { EQUIP_SEED } from './pricing';

/** Fallback: leituras do último mês semente, usado só se algum mês pedido não existir em lugar nenhum. */
export function seedReadings(): LeiturasMes {
  const r: LeiturasMes = {};
  EQUIP_SEED.forEach(e => { r[e.item] = { leitura_anterior: e.l_ant, leitura_atual: e.l_atual }; });
  return r;
}

/**
 * Quantidade cobrada entre duas leituras: a diferença exata, com 2 casas decimais
 * (a plotter A1 mede em metros, ex.: 4.374,86 − 4.305,16 = 69,70 m). O arredondamento
 * em 2 casas só remove o ruído de ponto flutuante (69,69999999 → 69,70).
 */
export function qtdCobrada(anterior: number, atual: number): number {
  return Math.max(0, Math.round((atual - anterior) * 100) / 100);
}

export function rowsForMonth(monthKey: string): LinhaMes[] {
  const readings = state.readingsByMonth[monthKey] || {};
  return state.equipList.map(e => {
    const rd = readings[e.item] || { leitura_anterior: e.l_ant, leitura_atual: e.l_ant };
    const qtd = qtdCobrada(rd.leitura_anterior, rd.leitura_atual);
    const valor_copias = qtd * e.valor_unit;
    const geral = valor_copias + e.valor_loc;
    return {
      item: e.item, grupo: e.grupo, setor: e.setor, cod_orc: e.cod_orc, sigla: e.sigla,
      maquina: e.maquina, tipo_equip: e.tipo_equip, valor_loc: e.valor_loc, valor_unit: e.valor_unit,
      leitura_anterior: rd.leitura_anterior, leitura_atual: rd.leitura_atual,
      qtd_copia: qtd, valor_copias, geral, pct: 0,
    };
  });
}

export function withPct(rows: LinhaMes[]): LinhaMes[] {
  const tot = rows.reduce((s, d) => s + d.geral, 0) || 1;
  rows.forEach(d => { d.pct = Math.round(d.geral / tot * 1000) / 10; });
  return rows;
}

/** O mês já tem leituras lançadas? Meses sem dados não devem ser tratados como consumo zero. */
export function mesTemDados(monthKey: string): boolean {
  return state.months.includes(monthKey);
}

/** Linhas do mês corrente, já com % de consumo e respeitando o filtro de unidade. */
export function filtered(): LinhaMes[] {
  const rows = withPct(rowsForMonth(state.currentMonth));
  return state.currentGrupo === 'Todos' ? rows : rows.filter(d => d.grupo === state.currentGrupo);
}
