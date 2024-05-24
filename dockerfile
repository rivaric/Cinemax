FROM node:20

WORKDIR ./app

COPY package.json ./

RUN yarn install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

EXPOSE 7000

CMD ["sh", "-c", "npx prisma migrate deploy && yarn run build && yarn run start"]
