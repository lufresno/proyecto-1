# 1. Usamos una imagen de Node ligera
FROM node:20-alpine

# 2. Creamos el directorio de la app
WORKDIR /usr/src/app

# 3. Copiamos los archivos de dependencias
COPY package*.json ./

# 4. Instalamos las dependencias
RUN npm install

# 5. Copiamos el resto del código
COPY . .

# 6. Construimos la aplicación NestJS
RUN npm run build

# 7. Exponemos el puerto (el que pusimos en el .env)
EXPOSE 3000

# 8. Comando para arrancar la app
CMD ["npm", "run", "start:prod"]