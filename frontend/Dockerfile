# Etapa 1: Build y compilación (Node)
FROM node:20-alpine AS build-stage

WORKDIR /app

# Copiar configuración e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código fuente y compilar (creará la carpeta /app/dist)
COPY . .
RUN npm run build

# Etapa 2: Servidor Web de Producción (Nginx)
FROM nginx:stable-alpine AS production-stage

# Copiar la compilación de la Etapa 1
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponder el puerto interno del Nginx
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
