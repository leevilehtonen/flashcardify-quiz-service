FROM node:lts-alpine as base
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install

FROM node:lts-alpine as builder
WORKDIR /app
COPY . .
COPY --from=base /app/node_modules ./node_modules
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
