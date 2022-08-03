# API CRUD

A small demonstration of an implementation of a typical API CRUD interface, written in **TypeScript**. It uses **Fastify** and **Knex** for routing and DB management, **Swagger** and **Jest** for documentation and tests.

## Prerequist

You will need to install `docker` and `docker-compose` in order to use this project and `node` with `npm`, then run `npm i` to install all the required modules.

## How to use it

First, you will need to start the `docker` service in order to use `docker-compose`.

Once you have started the `docker` service, you must run `sudo docker-compose build` for compiling all the project inside `docker`.

Then, run `sudo docker-compose up` (with the flag `-d` if you want to run it in *Daemon* mode).

The server will be listening at `https://127.0.0.1:8080` and you will have the Swagger documentation page at the root.

## Running Tests

For running unit tests, run `npm run unit-test`.

For integration tests, you must run the `docker-compose` beforehand, then run `npm run integration-test`. 

## Legal Section

This project is free to use. If there is any legal troubleshoots, please send me an email at : louis.de.macedo.ldm@gmail.com