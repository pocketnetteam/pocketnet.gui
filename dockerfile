FROM node:current-alpine

EXPOSE 8899 8099
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

CMD ["node", "proxy16/cli.js", "--cli"]