FROM node:16-alpine

RUN mkdir -p /home/node/gorry-well/node_modules && chown -R node:node /home/node/gorry-well

WORKDIR /home/node/gorry-well

COPY package*.json ./

USER root


RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "./bin/www" ]