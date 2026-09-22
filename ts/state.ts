import { ALL_MONTHS_SEED } from './data/seed';
import { EQUIP_SEED } from './data/pricing';
import type { Equipamento, LeiturasPorMes, LocalDb, LocalDownloads } from './types';

export const SEED_MONTHS = Object.keys(ALL_MONTHS_SEED).sort();
export const SEED_MONTH = SEED_MONTHS[SEED_MONTHS.length - 1];
const currentYear = new Date().getFullYear();
const seedYear = Number(SEED_MONTH.split('-')[0]);
const initialMonth = currentYear > seedYear ? `${currentYear}-01` : SEED_MONTH;

interface AppState {
  db: LocalDb | null;
  downloads: LocalDownloads | null;
  canWrite: boolean;
  equipList: Equipamento[];
  months: string[];
  currentMonth: string;
  readingsByMonth: LeiturasPorMes;
  currentGrupo: string;
}

/* Estado compartilhado entre os módulos. É um objeto (e não `let` exportado)
   porque módulos ES não podem reatribuir bindings importados. */
export const state: AppState = {
  db: null,
  downloads: null,
  canWrite: true,
  equipList: EQUIP_SEED.slice(),
  months: SEED_MONTHS.slice(),
  currentMonth: initialMonth,
  readingsByMonth: JSON.parse(JSON.stringify(ALL_MONTHS_SEED)),
  currentGrupo: 'Todos',
};
