import knex, { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const db = knex({
  client: "pg",
  connection: {
    host: process.env.PG_HOST,
    port: 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWD,
    database: process.env.PG_DATABASE,
  },
});
