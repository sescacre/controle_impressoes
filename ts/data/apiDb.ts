import type { CollectionRef, DocData, DocRef, DocSnapshot, LocalDb, LocalDownloads } from '../types';

/* ---------------- banco compartilhado: fala com a API do server.js (/api/db/...),
   que por sua vez lê/grava no MySQL. Mesma interface de coleções/documentos usada
   antes com localStorage, então o resto do app não precisa saber a diferença. ---------------- */

async function apiGet(path: string): Promise<{ docs: DocSnapshot[] }> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Falha ao consultar ${path}: ${res.status}`);
  const body = await res.json() as { docs: { id: string; data: DocData }[] };
  return { docs: body.docs.map(d => ({ id: d.id, data: () => d.data })) };
}

async function apiWrite(method: 'PUT' | 'PATCH', path: string, data: DocData): Promise<void> {
  const res = await fetch(path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Falha ao salvar ${path}: ${res.status}`);
}

export function makeApiDb(): LocalDb {
  function collection(name: string): CollectionRef {
    return {
      async get() {
        const { docs } = await apiGet(`/api/db/${name}`);
        return { empty: docs.length === 0, docs };
      },
      doc(id: string): DocRef {
        const path = `/api/db/${name}/${encodeURIComponent(id)}`;
        return {
          id,
          async get() {
            const res = await fetch(path);
            if (!res.ok) throw new Error(`Falha ao consultar ${path}: ${res.status}`);
            const body = await res.json() as { exists: boolean; data: DocData | null };
            return { exists: body.exists, data: () => body.data || {} };
          },
          async set(data) { await apiWrite('PUT', path, data); },
          async update(data) { await apiWrite('PATCH', path, data); },
          async delete() { throw new Error('delete não é suportado pelo banco compartilhado'); },
        };
      },
      where(field, op, value) {
        return {
          async get() {
            const { docs } = await apiGet(`/api/db/${name}?where=${encodeURIComponent(field)},${encodeURIComponent(op)},${encodeURIComponent(String(value))}`);
            return { empty: docs.length === 0, docs };
          },
        };
      },
      orderBy(field, dir) {
        return {
          async get() {
            const { docs } = await apiGet(`/api/db/${name}?orderBy=${encodeURIComponent(field)},${dir || 'asc'}`);
            return { empty: docs.length === 0, docs };
          },
        };
      },
    };
  }

  return { collection };
}

export function makeApiDownloads(): LocalDownloads {
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
