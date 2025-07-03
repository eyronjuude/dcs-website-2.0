# syntax=docker/dockerfile:1

FROM node:lts AS builder

WORKDIR /app

COPY ./website-frontend/package*.json .
COPY ./website-frontend/pnpm-lock.yaml .

RUN npm i -g pnpm
RUN npm install

COPY ./website-frontend/ .

ARG PUBLIC_APIURL
ARG STATIC_ACCESS_TOKEN

ENV PUBLIC_APIURL=${PUBLIC_APIURL}
ENV STATIC_ACCESS_TOKEN=${STATIC_ACCESS_TOKEN}

RUN npm run build
RUN npm prune --prod

FROM node:lts AS deployer

WORKDIR /app

COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

EXPOSE 3000


CMD [ "node", "build" ]