FROM node:20-alpine AS build

WORKDIR /app

# Copiar package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY apps/frontend ./apps/frontend
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Build de producción
RUN npx nx build frontend --configuration=production

# Etapa de producción con Nginx
FROM nginx:alpine

# Borrar config default
RUN rm -rf /usr/share/nginx/html/*

# Copiar build de Angular
COPY --from=build /app/dist/apps/frontend/browser /usr/share/nginx/html

# Copiar configuración de Nginx
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
