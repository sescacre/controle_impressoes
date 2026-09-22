import { LS_KEY } from '../config';
import type { CollectionRef, DocData, DocRef, DocSnapshot, LocalDb, LocalDownloads } from '../types';

/* ---------------- versão standalone: localStorage no lugar do banco do Claude ---------------- */

type Store = Record<string, Record<string, DocData>>;

function lsLoadStore(): Store {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { equipamentos: {}, leituras: {}, meses: {} };
    const parsed = JSON.parse(raw);
    return { equipamentos: parsed.equipamentos || {}, leituras: parsed.leituras || {}, meses: parsed.meses || {} };
  } catch (e) {
    console.error('Falha ao ler localStorage', e);
    return { equipamentos: {}, leituras: {}, meses: {} };
  }
}

function lsSaveStore(store: Store): boolean {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(store));
    return true;
  } catch (e) {
    console.error('Falha ao salvar no localStorage', e);
    return false;
  }
}

export function makeLocalDb(): LocalDb {
  const store = lsLoadStore();

  function collection(name: string): CollectionRef {
    if (!store[name]) store[name] = {};
    const docsOf = (): DocSnapshot[] => Object.keys(store[name]).map(id => ({ id, data: () => store[name][id] }));

    return {
      async get() {
        const docs = docsOf();
        return { empty: docs.length === 0, docs };
      },
      doc(id: string): DocRef {
        return {
          id,
          async get() {
            const exists = Object.prototype.hasOwnProperty.call(store[name], id);
            return { exists, data: () => store[name][id] };
          },
          async set(data) { store[name][id] = { ...data }; lsSaveStore(store); },
          async update(data) { store[name][id] = { ...(store[name][id] || {}), ...data }; lsSaveStore(store); },
          async delete() { delete store[name][id]; lsSaveStore(store); },
        };
      },
      where(field, op, value) {
        const filtered = docsOf().filter(d => {
          const v = d.data()[field];
          if (op === '==' || op === 'eq') return v === value;
          if (op === '!=') return v !== value;
          return true;
        });
        return { async get() { return { empty: filtered.length === 0, docs: filtered }; } };
      },
      orderBy(field, dir) {
        const all = docsOf();
        all.sort((a, b) => {
          const av = a.data()[field] as string | number;
          const bv = b.data()[field] as string | number;
          const cmp = av < bv ? -1 : (av > bv ? 1 : 0);
          return dir === 'desc' ? -cmp : cmp;
        });
        return { async get() { return { empty: all.length === 0, docs: all }; } };
      },
    };
  }

  return { collection };
}

export function makeLocalDownloads(): LocalDownloads {
  return {
    async save({ filename, data }) {
      let blob: Blob;
      if (data instanceof Blob) { blob = data; }
      else if (typeof data === 'string') { blob = new Blob([data], { type: 'text/plain;charset=utf-8' }); }
      else { blob = new Blob([data]); }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      return { status: 'saved' };
    },
  };
}
