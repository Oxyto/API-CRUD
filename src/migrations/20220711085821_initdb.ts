import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE TABLE customers (
        id SERIAL,
        username VARCHAR(255),
        lastname VARCHAR(255),
        birthdate DATE,
        UNIQUE (username, lastname, birthdate),
        PRIMARY KEY (id)
    );
    
    CREATE TABLE kpis (
        customer_id INT NOT NULL,
        number_purchase INT,
        store VARCHAR(255),
        status VARCHAR(255),
        PRIMARY KEY (customer_id, store),
        FOREIGN KEY (customer_id) REFERENCES customers(id)
    );`)
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    DROP TABLE IF EXISTS customers;
    DROP TABLE IF EXISTS kpis;
    `)
}
