# Potato's QA Academy — single small Node service (API + static site).
# Node 24 ships SQLite built in, so there's nothing native to compile.
FROM node:24-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

COPY . .

ENV NODE_ENV=production \
    PORT=3000 \
    DB_PATH=/app/data/potato.db

EXPOSE 3000

# Progress lives here — mount this as a persistent volume in Coolify.
VOLUME ["/app/data"]

CMD ["node", "server/index.js"]
