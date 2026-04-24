# -------- BUILD --------
FROM node:20-alpine AS build

WORKDIR /app

# copiar TODO el repo (no solo package.json)
COPY . .

# instalar deps
RUN npm install

# build angular con nx
RUN npx nx build frontend

# -------- SERVE --------
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# copiar build generado
COPY --from=build /app/dist/apps/frontend /usr/share/nginx/html

# nginx config
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
