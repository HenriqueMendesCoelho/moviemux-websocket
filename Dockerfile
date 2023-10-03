FROM node:20.5.1-slim AS build
WORKDIR /usr/src/app
COPY . .
RUN corepack enable
RUN yarn install --prod
RUN yarn build

FROM node:20.5.1-slim AS prod
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3333 3334
CMD [ "node", "./dist/server.js" ]