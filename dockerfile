FROM node:20

WORKDIR ./app

COPY package.json ./

RUN yarn install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

EXPOSE 7000

CMD ["bash", "-c", "npx prisma migrate dev && yarn run dev"]
