import { MAQUINAS_POLICROMATICAS } from '../config';

export type CategoriaEquip = 'policromatica' | 'plotter' | 'frenteVerso' | 'multifuncional';

/** Ordem em que as categorias aparecem no card "Equipamentos ativos". */
export const CATEGORIAS: { id: CategoriaEquip; rotulo: string; singular: string; plural: string }[] = [
  { id: 'policromatica', rotulo: 'Policromática', singular: 'policromática', plural: 'policromáticas' },
  { id: 'plotter', rotulo: 'Plotter A1', singular: 'plotter A1', plural: 'plotter A1' },
  { id: 'frenteVerso', rotulo: 'Frente e verso', singular: 'frente e verso', plural: 'frente e verso' },
  { id: 'multifuncional', rotulo: 'Multifuncional', singular: 'multifuncional', plural: 'multifuncionais' },
];

export function categoriaOf(e: { maquina: string; tipo_equip: string }): CategoriaEquip {
  if (MAQUINAS_POLICROMATICAS.has(e.maquina)) return 'policromatica';
  if (e.tipo_equip === 'Impressora A1') return 'plotter';
  if (e.tipo_equip === 'Impressora') return 'frenteVerso';
  return 'multifuncional';
}

/** Nome da categoria como aparece na coluna "Tipo" das tabelas. */
export function rotuloCategoria(e: { maquina: string; tipo_equip: string }): string {
  const id = categoriaOf(e);
  return (CATEGORIAS.find(c => c.id === id) as (typeof CATEGORIAS)[number]).rotulo;
}
