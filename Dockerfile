# ============================================
# Stage 1: Build (checagem de tipos + bundle do TypeScript)
# ============================================

ARG NODE_VERSION=24.13.0-slim
ARG NGINX_VERSION=1.27-alpine

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
# Stage 2: Servir os arquivos estáticos com nginx
# ============================================

FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html/dist
COPY html /usr/share/nginx/html/html
COPY css /usr/share/nginx/html/css
COPY assets /usr/share/nginx/html/assets

# nginx-unprivileged já roda como usuário não-root e escuta na 3400
EXPOSE 3400
