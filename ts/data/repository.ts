import { ALL_MONTHS_SEED } from './seed';
import { SEED_MONTH, SEED_MONTHS, state } from '../state';
import type { Equipamento, LocalDb } from '../types';
import { $ } from '../utils/dom';
import { banner, monthLabel } from '../utils/format';
import { EQUIP_SEED, valorLocFor, valorUnitFor } from './pricing';

/** Grava no banco todas as leituras de um mês do histórico semente e registra o mês. */
async function semearMes(db: LocalDb, mk: string): Promise<void> {
  const readings = ALL_MONTHS_SEED[mk];
  await Promise.all(Object.keys(readings).map(itemStr => db.collection('leituras').doc(mk + '_' + itemStr).set({
    monthKey: mk, item: Number(itemStr), leitura_anterior: readings[itemStr].leitura_anterior, leitura_atual: readings[itemStr].leitura_atual, savedAt: new Date().toISOString(),
  })));
  await db.collection('meses').doc(mk).set({ monthKey: mk, label: monthLabel(mk), createdAt: new Date().toISOString() });
}

export async function loadFromDb(db: LocalDb): Promise<void> {
  try {
    const eqSnap = await db.collection('equipamentos').get();
    if (eqSnap.empty) {
      await Promise.all(EQUIP_SEED.map(e => db.collection('equipamentos').doc(String(e.item)).set({ ...e })));
      // semeia o histórico real (um mês por vez, para não estourar o limite de escritas simultâneas)
      for (const mk of SEED_MONTHS) await semearMes(db, mk);
    } else {
      state.equipList = eqSnap.docs.map(d => d.data() as unknown as Equipamento);
      state.equipList.sort((a, b) => a.item - b.item);
      // autocorreção: garante que a regra de preço por máquina (locação e valor por folha) esteja sempre em vigor,
      // mesmo em cadastros salvos antes do ajuste.
      const corrigir = state.equipList.filter(e => e.valor_unit !== valorUnitFor(e.maquina) || e.valor_loc !== valorLocFor(e.maquina));
      if (corrigir.length) {
        state.equipList = state.equipList.map(e => ({ ...e, valor_unit: valorUnitFor(e.maquina), valor_loc: valorLocFor(e.maquina) }));
        try {
          await Promise.all(corrigir.map(e => db.collection('equipamentos').doc(String(e.item)).update({ valor_unit: valorUnitFor(e.maquina), valor_loc: valorLocFor(e.maquina) })));
        } catch (e) { console.error('Falha ao corrigir valores salvos', e); }
      }
    }

    const mesesSnap = await db.collection('meses').orderBy('monthKey', 'asc').get();
    if (!mesesSnap.empty) {
      state.months = mesesSnap.docs.map(d => d.id);
    }

    // migração: completa no banco qualquer mês do histórico real (SEED_MONTHS) que ainda não
    // tenha sido lançado por este artifact, sem tocar em meses que o usuário já lançou/editou.
    const faltantesHistorico = SEED_MONTHS.filter(mk => !state.months.includes(mk));
    if (faltantesHistorico.length) {
      for (const mk of faltantesHistorico) await semearMes(db, mk);
      const mesesSnap2 = await db.collection('meses').orderBy('monthKey', 'asc').get();
      state.months = mesesSnap2.docs.map(d => d.id);
    }

    state.readingsByMonth = {};
    for (const mk of state.months) {
      const snap = await db.collection('leituras').where('monthKey', '==', mk).get();
      const r: Record<string, { leitura_anterior: number; leitura_atual: number }> = {};
      snap.docs.forEach(d => {
        const v = d.data() as { item: number; leitura_anterior: number; leitura_atual: number };
        r[v.item] = { leitura_anterior: v.leitura_anterior, leitura_atual: v.leitura_atual };
      });
      state.readingsByMonth[mk] = r;
    }
    state.currentMonth = state.months[state.months.length - 1] || SEED_MONTH;
  } catch (e) {
    console.error('Falha ao ler banco do artifact', e);
    $('banners').innerHTML = banner('Não foi possível carregar os dados salvos agora. Mostrando o mês semente.', 'warn');
  }
}
