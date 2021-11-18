FROM node:10-alpine
WORKDIR /var/source
COPY package*.json ./
RUN npm install lumber-cli -g -s
RUN npm install -s
COPY . .
EXPOSE 3000
CMD ["npm", "start"]