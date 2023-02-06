FROM node:16.18.0-alpine3.15 AS builder

WORKDIR /app

COPY package.json ./
COPY prisma ./prisma/

RUN corepack enable
RUN npm install webpack -g
RUN pnpm i

COPY . .

RUN pnpm run build

FROM node:16.18.0-alpine3.15
RUN corepack enable

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 5000


CMD ["pnpm", "run", "start:prod" ]