import { MESES_PT } from '../config';
import { rowsForMonth, withPct } from '../data/rows';
import { state } from '../state';
import type { XlsxWorkSheet } from '../types';
import { $ } from '../utils/dom';
import { ensureXLSX } from '../utils/scriptLoader';
import { runExport, showBanner } from './download';

/* Exporta para Excel, no mesmo layout de abas da planilha original. */
function montarAbaExcel(XLSX: NonNullable<Window['XLSX']>, monthKey: string): XlsxWorkSheet {
  const rows = withPct(rowsForMonth(monthKey));
  const [ano, mes] = monthKey.split('-');
  const aoa: unknown[][] = [];
  aoa.push([`CONTROLE INTERNO  - GETIC - ${MESES_PT[Number(mes) - 1].toUpperCase()} ${ano}`, 'Local/Setor', '', '', 'COD. ORÇ.', 'Sigla', 'Maquina', 'Tipo de Equip.', '', 'Valor de Loc.', '', 'L. Ant', '', 'L. Atual', 'Qtd. Copia', 'Valor Unit', 'Valor Total', 'IP', 'Geral Imp+Loc.', '% Consumo']);
  let grupoAnterior: string | null = null;
  rows.forEach(d => {
    const mostrarGrupo = d.grupo !== grupoAnterior;
    grupoAnterior = d.grupo;
    aoa.push(['', mostrarGrupo ? d.grupo : '', d.item, d.setor, d.cod_orc, d.sigla, d.maquina, d.tipo_equip, '',
      d.valor_loc, '', d.leitura_anterior, '', d.leitura_atual, d.qtd_copia, d.valor_unit, Number(d.valor_copias.toFixed(2)),
      '', Number(d.geral.toFixed(2)), Number(d.pct.toFixed(2))]);
  });
  const totImpr = rows.reduce((s, d) => s + d.valor_copias, 0);
  const totGeral = rows.reduce((s, d) => s + d.geral, 0);
  aoa.push(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'TOTAL IMPRESSÕES=', Number(totImpr.toFixed(2)), 'TOTAL GERAL=', Number(totGeral.toFixed(2))]);
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  ws['!cols'] = [{ wch: 2 }, { wch: 16 }, { wch: 4 }, { wch: 40 }, { wch: 14 }, { wch: 16 }, { wch: 10 }, { wch: 14 }, { wch: 2 }, { wch: 10 }, { wch: 2 }, { wch: 10 }, { wch: 2 }, { wch: 10 }, { wch: 10 }, { wch: 9 }, { wch: 11 }, { wch: 14 }, { wch: 12 }, { wch: 10 }];
  return ws;
}

async function exportarExcel(): Promise<void> {
  await runExport('btnExcel', 'Gerando Excel…', async () => {
    const ok = await ensureXLSX();
    const XLSX = window.XLSX;
    if (!ok || !XLSX) {
      showBanner('Não foi possível carregar o gerador de Excel agora. Tente novamente em instantes.', 'err');
      return null;
    }
    try {
      const wb = XLSX.utils.book_new();
      state.months.forEach(mk => {
        const [ano, mes] = mk.split('-');
        XLSX.utils.book_append_sheet(wb, montarAbaExcel(XLSX, mk), `${mes}-${ano}`);
      });
      const arrayBuf = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
      const blob = new Blob([arrayBuf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const filename = `planilha_impressao_GETIC_${state.months[0]}_a_${state.months[state.months.length - 1]}.xlsx`;
      return { filename, data: blob };
    } catch (e) {
      console.error('Falha ao montar o Excel', e);
      showBanner('Não foi possível montar a planilha Excel.', 'err');
      return null;
    }
  });
}

export function bindExcel(): void {
  $('btnExcel').addEventListener('click', exportarExcel);
}
