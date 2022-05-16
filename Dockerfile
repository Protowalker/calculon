# from base image node
FROM node:18-slim

COPY ./ ./home/app
WORKDIR /home/app

ENV NODE_ENV="production"


RUN ls -l
RUN npm install
RUN npm run build


CMD ["npx", "remix-serve", "./build"]