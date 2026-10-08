// Conexão com o MySQL compartilhado (mesmo banco visto por qualquer navegador/computador).
// Credenciais vêm de variáveis de ambiente (.env em dev; configuradas no host em produção).
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'controle_impressoes',
  waitForConnections: true,
  connectionLimit: 10,
  // As colunas DATETIME guardam o horário UTC como texto "puro" (sem fuso).
  // Sem isso, o driver devolve objetos Date reinterpretados no fuso do servidor
  // Node, deslocando o horário ao converter de volta para ISO (ver toIso/toMysqlDatetime em api.js).
  dateStrings: true,
});

module.exports = { pool };
