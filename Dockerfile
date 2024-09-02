FROM node:20-alpine AS builder

RUN mkdir -p /app
WORKDIR /app

COPY package.json  .
COPY package-lock.json .
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]