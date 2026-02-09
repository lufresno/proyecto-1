# Fase 1: Construcción (Builder)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Fase 2: Ejecución (Runtime)
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copiamos solo lo necesario de la fase anterior
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]