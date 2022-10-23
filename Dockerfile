FROM node:18

ENV NODE_ENV=production
WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
