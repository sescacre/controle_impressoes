import { PROJETO_POR_COD_ORC } from '../data/centrosCusto';
import { rowsForMonth } from '../data/rows';
import { state } from '../state';
import { $ } from '../utils/dom';
import { runExport } from './download';

const HISTORICO = 'PREGÃO ELETRÔNICO Nº 04/2022';
const GRUPO_LOCACAO = '3332001';
const FLUXO_LOCACAO = '2001007';
const GRUPO_IMPRESSAO = '3332003';
const FLUXO_IMPRESSAO = '3001002';

const CSV_DELIM = ';';

function csvEscape(value: string): string {
  if (value.includes(CSV_DELIM) || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function formatValorBR(n: number): string {
  return n.toFixed(2).replace('.', ',');
}

/* Monta o CSV de rateio (locação + impressão) por centro de custo/projeto, no formato
   esperado pela tela de Importação: grupo de pagamento; fluxo de caixa; centro de
   custo; projeto; valor; histórico. */
function montarCsvRateio(monthKey: string): string {
  const rows = rowsForMonth(monthKey);
  const linhas: string[][] = [
    ['Código do grupo de pagamento', 'Fluxo de caixa', 'Centro de custo', 'Projeto', 'Valor', 'Histórico'],
  ];
  rows.forEach(d => {
    const info = PROJETO_POR_COD_ORC[d.cod_orc];
    const centroCusto = d.cod_orc;
    const projeto = info ? String(info.projeto) : '';
    linhas.push([GRUPO_LOCACAO, FLUXO_LOCACAO, centroCusto, projeto, formatValorBR(d.valor_loc), HISTORICO]);
    linhas.push([GRUPO_IMPRESSAO, FLUXO_IMPRESSAO, centroCusto, projeto, formatValorBR(d.valor_copias), HISTORICO]);
  });
  const csv = linhas.map(linha => linha.map(csvEscape).join(CSV_DELIM)).join('\r\n');
  return `﻿${csv}`;
}

function dataAtualBR(): string {
  const hoje = new Date();
  const dd = String(hoje.getDate()).padStart(2, '0');
  const mm = String(hoje.getMonth() + 1).padStart(2, '0');
  return `${dd}-${mm}-${hoje.getFullYear()}`;
}

async function exportarCsv(): Promise<void> {
  await runExport('btnExcel', 'Gerando CSV…', async () => {
    const csv = montarCsvRateio(state.currentMonth);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const filename = `PrintGest_GETIC_${dataAtualBR()}.csv`;
    return { filename, data: blob };
  });
}

export function bindExcel(): void {
  $('btnExcel').addEventListener('click', exportarCsv);
}
