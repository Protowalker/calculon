# from base image node
FROM node:18-slim

COPY ./ ./home/app
WORKDIR /home/app



RUN ls -l
RUN npm install
RUN npm run build

ENV NODE_ENV="production"

CMD ["npx", "remix-serve", "./build"]