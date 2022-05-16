# from base image node
FROM node:18-slim

COPY ./ ./home/app
WORKDIR /home/app


ENV SQLITE_URL="file:./dev.db"

RUN ls -l
RUN npm install
RUN npm run build
RUN npx prisma db seed

ENV NODE_ENV="production"

CMD ["npx", "remix-serve", "./build"]