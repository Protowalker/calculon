# from base image node
FROM node:18-slim

COPY ./ ./home/app
WORKDIR /home/app


ENV SQLITE_URL="file:./dev.db"
ENV MYSQL_URL="mysql://root:3jgU8gJLpmtP7Da@104.197.122.174:3306/calculon"

RUN ls -l
RUN npm install
RUN npm run build
RUN npx prisma db push
RUN npx prisma db seed

ENV NODE_ENV="production"

CMD ["npx", "remix-serve", "./build"]