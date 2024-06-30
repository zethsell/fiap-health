FROM node:18-alpine

WORKDIR /usr/api/

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["sh","-c","npm start"]
