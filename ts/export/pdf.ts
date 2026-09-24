import type { jsPDF } from 'jspdf';
import { mesTemDados, rowsForMonth, withPct } from '../data/rows';
import { state } from '../state';
import type { LinhaMes } from '../types';
import { $ } from '../utils/dom';
import { fmtN, fmtR, monthLabel } from '../utils/format';
import { ensureJsPDF } from '../utils/scriptLoader';
import { runExport, showBanner } from './download';

interface Coluna {
  key: keyof LinhaMes;
  title: string;
  w: number;
  align: 'left' | 'right';
}

const COLS: Coluna[] = [
  { key: 'item', title: '#', w: 8, align: 'left' },
  { key: 'sigla', title: 'Sigla', w: 24, align: 'left' },
  { key: 'cod_orc', title: 'Centro de Custo', w: 26, align: 'left' },
  { key: 'setor', title: 'Setor', w: 58, align: 'left' },
  { key: 'tipo_equip', title: 'Tipo', w: 22, align: 'left' },
  { key: 'leitura_anterior', title: 'Leit. Ant.', w: 18, align: 'right' },
  { key: 'leitura_atual', title: 'Leit. Atual', w: 18, align: 'right' },
  { key: 'qtd_copia', title: 'Cópias', w: 16, align: 'right' },
  { key: 'valor_loc', title: 'Locação (R$)', w: 20, align: 'right' },
  { key: 'valor_copias', title: 'Impressão (R$)', w: 22, align: 'right' },
  { key: 'geral', title: 'Total (R$)', w: 20, align: 'right' },
  { key: 'pct', title: '%', w: 12, align: 'right' },
];

function truncateToWidth(doc: jsPDF, text: unknown, maxWidth: number): string {
  const str = String(text ?? '');
  if (doc.getTextWidth(str) <= maxWidth) return str;
  let t = str;
  while (t.length > 1 && doc.getTextWidth(t + '…') > maxWidth) { t = t.slice(0, -1); }
  return t + '…';
}

interface Logo {
  dataUrl: string;
  ratio: number;
}

/** Converte o logo do cabeçalho da página (PNG branco, fundo transparente) em data URL para o jsPDF. */
function carregarLogo(): Promise<Logo | null> {
  const src = document.querySelector<HTMLImageElement>('header .logo')?.src;
  if (!src) return Promise.resolve(null);
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) { resolve(null); return; }
        ctx.drawImage(img, 0, 0);
        resolve({ dataUrl: canvas.toDataURL('image/png'), ratio: img.naturalWidth / img.naturalHeight });
      } catch (e) {
        console.error('Falha ao preparar o logo para o PDF', e);
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function gerarRelatorioPdf(jsPDFCtor: NonNullable<Window['jspdf']>['jsPDF'], logo: Logo | null): jsPDF {
  const rows = withPct(rowsForMonth(state.currentMonth));
  const totGeral = rows.reduce((s, d) => s + d.geral, 0);
  const totImpr = rows.reduce((s, d) => s + d.valor_copias, 0);
  const totLoc = rows.reduce((s, d) => s + d.valor_loc, 0);
  const totCop = rows.reduce((s, d) => s + d.qtd_copia, 0);

  const doc = new jsPDFCtor({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const PAGE_W = doc.internal.pageSize.getWidth();
  const PAGE_H = doc.internal.pageSize.getHeight();
  const MARGIN = 12;
  const HEADER_H = 26;

  function drawHeader(): void {
    doc.setFillColor(21, 37, 64);
    doc.rect(0, 0, PAGE_W, HEADER_H, 'F');
    doc.setTextColor(255, 255, 255);
    if (logo) {
      const h = 11;
      doc.addImage(logo.dataUrl, 'PNG', MARGIN, 3, h * logo.ratio, h);
    } else {
      doc.setFont('helvetica', 'bold'); doc.setFontSize(16);
      doc.text('PrintGest', MARGIN, 11);
    }
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
    doc.text('Controle de Impressão & Locação de Equipamentos', MARGIN, 18.5);
    doc.setFontSize(7.5);
    doc.text('GETIC — Gerência de Tecnologia da Informação e Comunicação', MARGIN, 22.5);
    doc.setFontSize(9);
    doc.text('Mês de referência: ' + monthLabel(state.currentMonth), PAGE_W - MARGIN, 11, { align: 'right' });
    doc.setFontSize(8);
    doc.text('Gerado em ' + new Date().toLocaleString('pt-BR'), PAGE_W - MARGIN, 18.5, { align: 'right' });
  }

  function drawKpis(y: number): number {
    const kpis = [
      { label: 'Custo total do mês', value: fmtR(totGeral) },
      { label: 'Custo com impressão', value: fmtR(totImpr) },
      { label: 'Custo com locação', value: fmtR(totLoc) },
      { label: 'Cópias/impressões', value: fmtN(totCop) },
    ];
    const gap = 4, w = (PAGE_W - 2 * MARGIN - gap * 3) / 4, h = 16;
    kpis.forEach((k, i) => {
      const x = MARGIN + i * (w + gap);
      doc.setDrawColor(225, 230, 238); doc.setFillColor(255, 255, 255);
      doc.roundedRect(x, y, w, h, 1.5, 1.5, 'FD');
      doc.setFillColor(47, 111, 237); doc.rect(x, y, 1.2, h, 'F');
      doc.setTextColor(92, 107, 128); doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
      doc.text(k.label, x + 5, y + 6);
      doc.setTextColor(21, 37, 64); doc.setFont('helvetica', 'bold'); doc.setFontSize(12.5);
      doc.text(String(k.value), x + 5, y + 12.5);
    });
    return y + h + 6;
  }

  const totalW = COLS.reduce((s, c) => s + c.w, 0);
  const rowH = 6.2;

  function drawTableHeader(y: number): number {
    doc.setFillColor(21, 37, 64);
    doc.rect(MARGIN, y, totalW, 7, 'F');
    doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5);
    let x = MARGIN;
    COLS.forEach(c => {
      const tx = c.align === 'right' ? x + c.w - 1.5 : x + 1.5;
      doc.text(c.title, tx, y + 4.8, { align: c.align });
      x += c.w;
    });
    return y + 7;
  }

  function drawRow(y: number, d: LinhaMes, idx: number): void {
    if (idx % 2 === 1) { doc.setFillColor(244, 246, 249); doc.rect(MARGIN, y, totalW, rowH, 'F'); }
    doc.setTextColor(27, 36, 52); doc.setFont('helvetica', 'normal'); doc.setFontSize(7.3);
    let x = MARGIN;
    COLS.forEach(c => {
      let text: string;
      if (c.key === 'qtd_copia' || c.key === 'leitura_anterior' || c.key === 'leitura_atual') text = fmtN(d[c.key]);
      else if (c.key === 'valor_loc' || c.key === 'valor_copias' || c.key === 'geral') text = fmtR(d[c.key]).replace('R$ ', '');
      else if (c.key === 'pct') text = d.pct.toFixed(1) + '%';
      else text = String(d[c.key] ?? '');
      if (c.key === 'setor') text = truncateToWidth(doc, text, c.w - 3);
      const tx = c.align === 'right' ? x + c.w - 1.5 : x + 1.5;
      doc.text(text, tx, y + 4.3, { align: c.align });
      x += c.w;
    });
  }

  function drawTotalsRow(y: number): number {
    doc.setFillColor(21, 37, 64);
    doc.rect(MARGIN, y, totalW, 7, 'F');
    doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(7.6);
    doc.text('TOTAL GERAL', MARGIN + 1.5, y + 4.8);
    let x = MARGIN;
    COLS.forEach(c => {
      if (c.key === 'valor_loc') { doc.text(fmtR(totLoc).replace('R$ ', ''), x + c.w - 1.5, y + 4.8, { align: 'right' }); }
      if (c.key === 'valor_copias') { doc.text(fmtR(totImpr).replace('R$ ', ''), x + c.w - 1.5, y + 4.8, { align: 'right' }); }
      if (c.key === 'geral') { doc.text(fmtR(totGeral).replace('R$ ', ''), x + c.w - 1.5, y + 4.8, { align: 'right' }); }
      if (c.key === 'qtd_copia') { doc.text(fmtN(totCop), x + c.w - 1.5, y + 4.8, { align: 'right' }); }
      x += c.w;
    });
    return y + 7;
  }

  drawHeader();
  let y = drawKpis(HEADER_H + 6);
  y = drawTableHeader(y);
  rows.forEach((d, idx) => {
    if (y + rowH > PAGE_H - 16) {
      doc.addPage();
      doc.setFillColor(21, 37, 64); doc.rect(0, 0, PAGE_W, 10, 'F');
      doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(9);
      doc.text('Continuação — ' + monthLabel(state.currentMonth), MARGIN, 6.5);
      y = drawTableHeader(14);
    }
    drawRow(y, d, idx);
    y += rowH;
  });
  y = drawTotalsRow(y);

  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setTextColor(140, 150, 165); doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5);
    doc.text('Página ' + p + ' de ' + pageCount, PAGE_W - MARGIN, PAGE_H - 6, { align: 'right' });
    doc.text('Centro de custo = COD. ORÇ. da planilha de origem.', MARGIN, PAGE_H - 6);
  }

  return doc;
}

async function baixarRecibo(): Promise<void> {
  await runExport('btnRecibo', 'Gerando PDF…', async () => {
    if (!mesTemDados(state.currentMonth)) {
      showBanner('Não há leituras lançadas para este mês. Selecione um mês com dados para gerar o relatório.', 'warn');
      return null;
    }
    const ok = await ensureJsPDF();
    const lib = window.jspdf;
    if (!ok || !lib) {
      showBanner('Não foi possível carregar o gerador de PDF agora. Verifique a conexão e tente novamente.', 'err');
      return null;
    }
    try {
      const blob = gerarRelatorioPdf(lib.jsPDF, await carregarLogo()).output('blob');
      return { filename: `relatorio_getic_${state.currentMonth}.pdf`, data: blob };
    } catch (e) {
      console.error('Falha ao montar o PDF', e);
      showBanner('Não foi possível montar o relatório em PDF.', 'err');
      return null;
    }
  });
}

export function bindPdf(): void {
  $('btnRecibo').addEventListener('click', baixarRecibo);
}
