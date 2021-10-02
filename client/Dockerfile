FROM node:14 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY .. .

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html

RUN mkdir /usr/share/nginx/html

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html