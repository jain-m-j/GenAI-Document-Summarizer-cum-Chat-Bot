FROM node:22

WORKDIR /app

COPY package.json ./
#COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm","run","dev"]