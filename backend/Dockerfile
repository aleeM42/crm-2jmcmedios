FROM node:20-alpine

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiamos primero package.json para aprovechar el caché de capas de Docker
COPY package*.json ./

# Obviar el package-lock estricto y usar npm install
RUN npm install --omit=dev

# Copiamos el resto del código
COPY . .

# Exponemos el puerto (por defecto Express usa el 3001 si process.env.PORT no está definido)
EXPOSE 3001

# Comando de inicio
CMD ["npm", "start"]
