# Movie Mux - Socket.IO

## Introduction

This is a personal project aimed at creating a comprehensive movie rating portal. Whether you're a movie buff or simply looking for a way to discover new films.

Inspired by IMDB and TMDB.

## Technologies

```
Typescript, Express, Socket.io, Node.js, SQLite, TypeORM
```

### Link

[Movie Mux frontEnd](https://github.com/HenriqueMendesCoelho/moviemux)

This product uses the TMDB API but is not endorsed or certified by TMDB.

## Security regression tests

Use Node.js 24 and install dependencies with `pnpm install --frozen-lockfile`.
The tests require a local PostgreSQL test database and a user allowed to create
schemas. Never supply production credentials. Each run creates a uniquely named
schema and removes only that schema when finished.

```sh
TEST_DATABASE_URL=postgresql://test_user:test_password@127.0.0.1:5432/test_database pnpm test
pnpm build
```
