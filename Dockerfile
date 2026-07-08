# ── Збірка ───────────────────────────────────────────────
FROM node:24-alpine AS build

WORKDIR /app

# Спершу лише маніфести — шар з npm ci кешується, поки залежності не змінились
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Роздача ──────────────────────────────────────────────
FROM nginx:1.29-alpine

# Railway підставляє свій PORT; локально працює 8080
ENV PORT=8080

# Образ nginx проганяє envsubst по /etc/nginx/templates/*.template
# і кладе результат у /etc/nginx/conf.d/ перед стартом
COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

# Штатний entrypoint nginx:alpine сам виконає підстановку і запустить сервер
