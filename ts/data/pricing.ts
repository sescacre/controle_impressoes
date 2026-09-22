import { MAQUINAS_038, MAQUINAS_LOC_184 } from '../config';
import type { Equipamento } from '../types';
import { EQUIP_SEED_RAW } from './seed';

/* Regra de preço por folha e de locação, centralizada aqui para valer em qualquer mês,
   inclusive nos já lançados. As regras em si estão documentadas em config.ts. */
export function valorUnitFor(maquina: string): number {
  if (MAQUINAS_038.has(maquina)) return 0.38;
  if (maquina === 'T120') return 8.0;
  return 0.05;
}

export function valorLocFor(maquina: string): number {
  return MAQUINAS_LOC_184.has(maquina) ? 184 : 80;
}

export const EQUIP_SEED: Equipamento[] = EQUIP_SEED_RAW.map(e => ({
  ...e,
  setor: e.setor === 'Gestão de Comunicação Institucional - DPI - Bosque'
    ? 'Gerencia de Comunicação Institucional - DPI - Bosque'
    : e.setor,
  valor_unit: valorUnitFor(e.maquina),
  valor_loc: valorLocFor(e.maquina),
}));
