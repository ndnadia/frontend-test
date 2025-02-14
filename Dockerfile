
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm install --production

COPY . .
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "run", "start"]
