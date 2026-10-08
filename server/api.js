// API REST que expõe o banco MySQL compartilhado para o front-end, imitando a
// mesma semântica de coleções/documentos que o app já usava com localStorage
// (ver ts/types.ts LocalDb / ts/data/localDb.ts), agora com dados visíveis em
// qualquer navegador ou computador que acesse este servidor.
const bcrypt = require('bcryptjs');
const { pool } = require('./db');

// `dt` chega como string "YYYY-MM-DD HH:MM:SS" (dateStrings: true no pool, ver server/db.js),
// gravada em UTC por toMysqlDatetime — então só precisa virar ISO, sem reinterpretar fuso horário.
function toIso(dt) {
  if (!dt) return null;
  return dt.replace(' ', 'T') + '.000Z';
}

function toMysqlDatetime(iso) {
  const d = iso ? new Date(iso) : new Date();
  return d.toISOString().slice(0, 19).replace('T', ' ');
}

const collections = {
  equipamentos: {
    table: 'equipamentos',
    idColumn: 'item',
    idFromParam: id => Number(id),
    toRow(id, doc) {
      return {
        item: Number(id), grupo: doc.grupo, setor: doc.setor, cod_orc: doc.cod_orc, sigla: doc.sigla,
        maquina: doc.maquina, tipo_equip: doc.tipo_equip, valor_loc: doc.valor_loc, l_ant: doc.l_ant,
        l_atual: doc.l_atual, valor_unit: doc.valor_unit,
      };
    },
    fromRow(row) {
      return {
        id: String(row.item),
        data: {
          item: row.item, grupo: row.grupo, setor: row.setor, cod_orc: row.cod_orc, sigla: row.sigla,
          maquina: row.maquina, tipo_equip: row.tipo_equip, valor_loc: Number(row.valor_loc),
          l_ant: Number(row.l_ant), l_atual: Number(row.l_atual), valor_unit: Number(row.valor_unit),
        },
      };
    },
    fieldToColumn: { item: 'item', grupo: 'grupo', setor: 'setor', cod_orc: 'cod_orc', sigla: 'sigla', maquina: 'maquina', tipo_equip: 'tipo_equip', valor_loc: 'valor_loc', l_ant: 'l_ant', l_atual: 'l_atual', valor_unit: 'valor_unit' },
  },
  meses: {
    table: 'meses',
    idColumn: 'month_key',
    idFromParam: id => id,
    toRow(id, doc) {
      return { month_key: id, label: doc.label, created_at: toMysqlDatetime(doc.createdAt) };
    },
    fromRow(row) {
      return { id: row.month_key, data: { monthKey: row.month_key, label: row.label, createdAt: toIso(row.created_at) } };
    },
    fieldToColumn: { monthKey: 'month_key', label: 'label', createdAt: 'created_at' },
  },
  leituras: {
    table: 'leituras',
    idColumn: 'id',
    idFromParam: id => id,
    toRow(id, doc) {
      return {
        id, month_key: doc.monthKey, item: Number(doc.item), leitura_anterior: doc.leitura_anterior,
        leitura_atual: doc.leitura_atual, saved_at: toMysqlDatetime(doc.savedAt),
      };
    },
    fromRow(row) {
      return {
        id: row.id,
        data: {
          monthKey: row.month_key, item: row.item, leitura_anterior: Number(row.leitura_anterior),
          leitura_atual: Number(row.leitura_atual), savedAt: toIso(row.saved_at),
        },
      };
    },
    fieldToColumn: { monthKey: 'month_key', item: 'item', leitura_anterior: 'leitura_anterior', leitura_atual: 'leitura_atual', savedAt: 'saved_at' },
  },
};

async function upsert(conn, cfg, id, doc) {
  const row = cfg.toRow(id, doc);
  const cols = Object.keys(row);
  const placeholders = cols.map(() => '?').join(', ');
  const updates = cols.filter(c => c !== cfg.idColumn).map(c => `${c} = VALUES(${c})`).join(', ');
  const sql = `INSERT INTO ${cfg.table} (${cols.join(', ')}) VALUES (${placeholders})` +
    (updates ? ` ON DUPLICATE KEY UPDATE ${updates}` : '');
  await conn.execute(sql, cols.map(c => row[c]));
}

async function mergeUpdate(conn, cfg, id, partialDoc) {
  const [rows] = await conn.execute(`SELECT * FROM ${cfg.table} WHERE ${cfg.idColumn} = ?`, [cfg.idFromParam(id)]);
  if (!rows.length) throw Object.assign(new Error('not found'), { status: 404 });
  const current = cfg.fromRow(rows[0]).data;
  await upsert(conn, cfg, id, { ...current, ...partialDoc });
}

function sendJson(res, status, body) {
  const data = JSON.stringify(body);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(data);
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

/** Trata uma requisição /api/... . Retorna true se a rota foi reconhecida (e já respondida). */
async function handleApi(req, res, pathname, query) {
  const parts = pathname.split('/').filter(Boolean); // ['api', 'db', 'equipamentos', '123'] ou ['api', 'import']

  if (parts[0] !== 'api') return false;

  try {
    if (parts[1] === 'import' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const conn = await pool.getConnection();
      try {
        await conn.beginTransaction();
        for (const name of ['equipamentos', 'leituras', 'meses']) {
          const cfg = collections[name];
          const docs = body[name] || {};
          for (const id of Object.keys(docs)) await upsert(conn, cfg, id, docs[id]);
        }
        await conn.commit();
      } catch (e) {
        await conn.rollback();
        throw e;
      } finally {
        conn.release();
      }
      sendJson(res, 200, { status: 'imported' });
      return true;
    }

    if (parts[1] === 'auth' && parts[2] === 'login' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const usuario = String(body.usuario || '').trim();
      const senha = String(body.senha || '');
      const [rows] = await pool.execute('SELECT nome, senha_hash FROM usuarios WHERE usuario = ?', [usuario]);
      const row = rows[0];
      const ok = row ? await bcrypt.compare(senha, row.senha_hash) : false;
      if (!ok) { sendJson(res, 401, { error: 'Usuário ou senha inválidos' }); return true; }
      sendJson(res, 200, { status: 'ok', nome: row.nome });
      return true;
    }

    if (parts[1] === 'usuarios' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const usuario = String(body.usuario || '').trim();
      const nome = String(body.nome || '').trim();
      const senha = String(body.senha || '');
      if (!usuario || !nome || senha.length < 6) {
        sendJson(res, 400, { error: 'Preencha nome, usuário e uma senha com pelo menos 6 caracteres.' });
        return true;
      }
      const senha_hash = await bcrypt.hash(senha, 10);
      try {
        await pool.execute(
          'INSERT INTO usuarios (usuario, nome, senha_hash, created_at) VALUES (?, ?, ?, ?)',
          [usuario, nome, senha_hash, toMysqlDatetime()],
        );
      } catch (e) {
        if (e.code === 'ER_DUP_ENTRY') { sendJson(res, 409, { error: 'Já existe um usuário com esse nome de login.' }); return true; }
        throw e;
      }
      sendJson(res, 200, { status: 'created' });
      return true;
    }

    if (parts[1] === 'db' && parts[2]) {
      const name = parts[2];
      const cfg = collections[name];
      if (!cfg) { sendJson(res, 404, { error: 'coleção desconhecida' }); return true; }
      const id = parts[3];

      if (req.method === 'GET' && id) {
        const [rows] = await pool.execute(`SELECT * FROM ${cfg.table} WHERE ${cfg.idColumn} = ?`, [cfg.idFromParam(id)]);
        if (!rows.length) { sendJson(res, 200, { exists: false, data: null }); return true; }
        sendJson(res, 200, { exists: true, data: cfg.fromRow(rows[0]).data });
        return true;
      }

      if (req.method === 'GET' && !id) {
        let sql = `SELECT * FROM ${cfg.table}`;
        const params = [];
        if (query.where) {
          const [field, op, value] = query.where.split(',');
          const col = cfg.fieldToColumn[field];
          if (col && op === '==') { sql += ` WHERE ${col} = ?`; params.push(value); }
        }
        if (query.orderBy) {
          const [field, dir] = query.orderBy.split(',');
          const col = cfg.fieldToColumn[field];
          if (col) sql += ` ORDER BY ${col} ${dir === 'desc' ? 'DESC' : 'ASC'}`;
        }
        const [rows] = await pool.execute(sql, params);
        sendJson(res, 200, { docs: rows.map(r => cfg.fromRow(r)) });
        return true;
      }

      if (req.method === 'PUT' && id) {
        const doc = await readJsonBody(req);
        const conn = await pool.getConnection();
        try { await upsert(conn, cfg, cfg.idFromParam(id), doc); } finally { conn.release(); }
        sendJson(res, 200, { status: 'ok' });
        return true;
      }

      if (req.method === 'PATCH' && id) {
        const doc = await readJsonBody(req);
        const conn = await pool.getConnection();
        try { await mergeUpdate(conn, cfg, cfg.idFromParam(id), doc); } finally { conn.release(); }
        sendJson(res, 200, { status: 'ok' });
        return true;
      }
    }
  } catch (e) {
    console.error('Erro na API', e);
    sendJson(res, e.status || 500, { error: 'Falha ao acessar o banco de dados' });
    return true;
  }

  return false;
}

module.exports = { handleApi };
