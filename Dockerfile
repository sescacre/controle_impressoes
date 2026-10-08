# ============================================
# Stage 1: Build (checagem de tipos + bundle do TypeScript)
# ============================================

ARG NODE_VERSION=24.13.0-slim

FROM node:${NODE_VERSION} AS builder

WORKDIR /app

# Dependências primeiro, para aproveitar o cache de camadas
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# Código-fonte (ver .dockerignore) e build: tsc + esbuild -> dist/app.js
COPY tsconfig.json ./
COPY ts ./ts
RUN npm run build

# ============================================
# Stage 2: servidor Node (estáticos + API /api/... ligada ao MySQL)
# ============================================

FROM node:${NODE_VERSION} AS runner

WORKDIR /app
ENV NODE_ENV=production

# Só as dependências de produção (mysql2) — sem devDependencies de build
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --no-audit --no-fund

COPY server.js ./
COPY server ./server
COPY html ./html
COPY css ./css
COPY assets ./assets
COPY --from=builder /app/dist ./dist

# server.js lê DB_HOST/DB_USER/DB_PASSWORD/DB_NAME etc. de variáveis de
# ambiente configuradas no host de deploy (Dokploy) — não existe .env na
# imagem, então process.loadEnvFile() falha em silêncio em produção (ver server.js).

EXPOSE 3009
USER node

CMD ["node", "server.js"]
