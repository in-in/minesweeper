FROM node:20.9.0-bookworm-slim
RUN apt-get update
RUN apt-get install -y git
# cypress dependency
RUN apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
USER node
COPY --chown=node:node package*.json ./
COPY --chown=node:node . .
