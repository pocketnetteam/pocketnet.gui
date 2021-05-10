FROM node:current-alpine

EXPOSE 8899 8099

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i --only=production
COPY . .

WORKDIR /usr/src/app/proxy16
CMD ["/usr/local/bin/npm", "run", "serve"]
