FROM node:20.5.0-bookworm-slim
RUN apt-get update
RUN apt-get install -y git
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
USER node
COPY --chown=node:node package*.json ./
COPY --chown=node:node . .
