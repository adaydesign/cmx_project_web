# base node image
FROM node:lts-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./ .
RUN npm install
RUN npm run build

ENV NODE_ENV=production
EXPOSE 9202
CMD ["npm", "start"]