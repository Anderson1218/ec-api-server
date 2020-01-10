FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose port 8080 to the outside world
EXPOSE 8080

CMD ["npm", "start"]

