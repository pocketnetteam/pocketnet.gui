FROM node:current-alpine

EXPOSE 8899 8099

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

WORKDIR /usr/src/app/proxy16
CMD ["node", "cli.js", "--cli"]