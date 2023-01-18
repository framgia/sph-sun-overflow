FROM node:alpine

ENV PORT 3000

WORKDIR /var/www/html/frontend

COPY package.json /var/www/html/frontend
COPY package-lock.json /var/www/html/frontend

RUN npm install

COPY . /var/www/html/frontend

EXPOSE 3000

ENTRYPOINT ["npm", "run", "dev"]
