import type { Chart as ChartJS } from 'chart.js';
import type { jsPDF } from 'jspdf';
import type SweetAlert from 'sweetalert2';

/* ---------------- domínio ---------------- */

export interface Equipamento {
  item: number;
  grupo: string;
  setor: string;
  cod_orc: string;
  sigla: string;
  maquina: string;
  tipo_equip: string;
  valor_loc: number;
  l_ant: number;
  l_atual: number;
  valor_unit: number;
}

export interface Leitura {
  leitura_anterior: number;
  leitura_atual: number;
}

/** Leituras de um mês, indexadas pelo número do item do equipamento. */
export type LeiturasMes = Record<string, Leitura>;
/** Leituras de todos os meses, indexadas por "AAAA-MM". */
export type LeiturasPorMes = Record<string, LeiturasMes>;

export interface LinhaMes {
  item: number;
  grupo: string;
  setor: string;
  cod_orc: string;
  sigla: string;
  maquina: string;
  tipo_equip: string;
  valor_loc: number;
  valor_unit: number;
  leitura_anterior: number;
  leitura_atual: number;
  qtd_copia: number;
  valor_copias: number;
  geral: number;
  pct: number;
}

export interface LinhaHistorico extends LinhaMes {
  monthKey: string;
  monthLabel: string;
}

export interface LinhaLancamento {
  item: number;
  sigla: string;
  cod_orc: string;
  valor_unit: number;
  leitura_anterior: number;
  leitura_atual: number | null;
}

export type BannerKind = 'warn' | 'err' | 'ok';

/* ---------------- banco local (localStorage imitando a API de coleções) ---------------- */

export type DocData = Record<string, unknown>;

export interface DocSnapshot {
  id: string;
  data: () => DocData;
}

export interface QuerySnapshot {
  empty: boolean;
  docs: DocSnapshot[];
}

export interface Query {
  get(): Promise<QuerySnapshot>;
}

export interface DocRef {
  id: string;
  get(): Promise<{ exists: boolean; data: () => DocData }>;
  set(data: DocData): Promise<void>;
  update(data: DocData): Promise<void>;
  delete(): Promise<void>;
}

export interface CollectionRef extends Query {
  doc(id: string): DocRef;
  where(field: string, op: string, value: unknown): Query;
  orderBy(field: string, dir?: 'asc' | 'desc'): Query;
}

export interface LocalDb {
  collection(name: string): CollectionRef;
}

export interface LocalDownloads {
  save(file: { filename: string; data: Blob | string }): Promise<{ status: 'saved' }>;
}

/* ---------------- bibliotecas carregadas por CDN (globais em window) ---------------- */

export interface XlsxWorkSheet {
  [key: string]: unknown;
  '!cols'?: { wch: number }[];
}
export type XlsxWorkBook = object;

export interface XlsxLib {
  utils: {
    aoa_to_sheet(data: unknown[][]): XlsxWorkSheet;
    book_new(): XlsxWorkBook;
    book_append_sheet(wb: XlsxWorkBook, ws: XlsxWorkSheet, name: string): void;
  };
  write(wb: XlsxWorkBook, opts: { type: 'array'; bookType: 'xlsx' }): ArrayBuffer;
}

declare global {
  interface Window {
    Chart?: typeof ChartJS;
    jspdf?: { jsPDF: typeof jsPDF };
    XLSX?: XlsxLib;
    Swal?: typeof SweetAlert;
  }
}
