# API CRUD

A small demonstration of an implementation of a typical API CRUD interface, written in TypeScript. It uses Fastify and Knex for routing and DB management, Swagger and Jest for documentation and tests.

## How to use it

First, you need to have or install `node` with `npm`, `docker` and `docker-compose` in order to use this project.

First, you need to install all the required modules with the command `npm i` or `npm install`, then you will need to start the `docker` service in order to use `docker-compose`. When you have started the `docker` service, you must run `sudo docker-compose build` for compiling all the project inside `docker`. Then, run `sudo docker-compose up` (with the flag `-d` if you want to run it in *Daemon* mode).

The server will be listening at `https://127.0.0.1:8080` and you will have the Swagger documentation page at the root.

## Legal Section

This project is free to use. If there is any legal troubleshoots, please send me an email at : louis.de.macedo.ldm@gmail.com