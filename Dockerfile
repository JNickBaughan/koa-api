FROM node:lts-alpine

WORKDIR /opt/src
COPY . . 

RUN npm install

EXPOSE 1000
CMD ["npm", "run", "start"]