FROM node:18.16.1
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm i
COPY --chown=node:node . .
CMD ["npm", "start"]
