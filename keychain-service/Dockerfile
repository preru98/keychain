FROM node:18-alpine

WORKDIR /usr/src/app

ENV POSTGRES_HOST "postgres"
ENV POSTGRES_USER "prerna"
ENV POSTGRES_PASSWORD "postgres-password"
ENV REDIS_HOST "redis"

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["node", "dist/src/main.js"]