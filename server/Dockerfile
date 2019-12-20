FROM node:10

WORKDIR /usr/src/app
RUN npm install yarn -g --silent
COPY package*.json ./
RUN yarn install --silent
COPY . .
RUN yarn build

EXPOSE 8080
CMD [ "yarn", "start" ]
