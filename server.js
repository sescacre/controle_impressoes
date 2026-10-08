// Servidor estático + API do banco compartilhado (MySQL). Serve os arquivos do
// app (réplica do comportamento de nginx.conf: reescreve "/" para "/html/index.html"
// e desabilita cache para .js/.css) e responde as rotas /api/... consultadas pelo
// front-end, para que os dados fiquem visíveis em qualquer navegador/computador
// que acesse este servidor, em vez de ficarem presos no localStorage de um único navegador.
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

try { process.loadEnvFile(); } catch { /* sem .env (ex.: produção, variáveis já vêm do host) */ }

const { handleApi } = require('./server/api');

const PORT = process.env.PORT || 3009;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

const NO_CACHE_EXTENSIONS = new Set(['.js', '.css']);

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (parsedUrl.pathname.startsWith('/api/')) {
    const query = Object.fromEntries(parsedUrl.searchParams);
    const handled = await handleApi(req, res, parsedUrl.pathname, query);
    if (handled) return;
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Rota de API não encontrada');
    return;
  }

  let urlPath = decodeURIComponent(parsedUrl.pathname);
  if (urlPath === '/') urlPath = '/html/index.html';

  const filePath = path.join(ROOT, urlPath);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Requisição inválida'); 
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Não encontrado');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const headers = { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' };
    if (NO_CACHE_EXTENSIONS.has(ext)) headers['Cache-Control'] = 'no-cache';
    res.writeHead(200, headers);
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`PrintGest servindo em http://localhost:${PORT}`);
});
