FROM node:18-alpine

WORKDIR /usr/api/

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["sh","-c","npm start"]
