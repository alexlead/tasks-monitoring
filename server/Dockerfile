FROM node:23-alpine3.20

WORKDIR /app
RUN npm install -g nodemon
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "dev"]