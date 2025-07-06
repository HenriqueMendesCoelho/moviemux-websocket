FROM node:24.3.0-alpine AS build
WORKDIR /usr/src/app

COPY . .

RUN corepack enable && \
    corepack prepare pnpm@latest --activate && \
    pnpm install --frozen-lockfile

RUN pnpm build

FROM node:24.3.0-alpine AS prod

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3333 3334
CMD [ "node", "./dist/server.js" ]