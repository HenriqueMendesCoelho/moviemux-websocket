FROM node:20.5.1-slim AS build
WORKDIR /usr/src/app
COPY . .
RUN yarn install --prod
RUN yarn build

FROM node:20.5.1-slim
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist

ENV NODE_ENV=production
ENV TZ=America/Sao_Paulo
EXPOSE 3333
CMD [ "node", "./dist/server.js" ]