import knex from "knex"
import dotenv from "dotenv"

dotenv.config({ path: "../.env" })

const db = knex({
    client: "pg",
    connection: {
        host: process.env.PG_HOST,
        port: 5432,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWD,
        database: process.env.PG_DATABASE
    }
})

enum StatusEnum {
    occasional,
    regular,
    VIP
}

interface Kpi {
    customer_id: number,
    number_purchase: number,
    store: string,
    status: StatusEnum
}

interface Customer {
    username: string,
    lastname: string,
    birthdate: Date
}

export async function get_customers_list()
{
    const customers_list = db.select("username", "lastname", "birthdate",
        "number_purchase", "store", "status").from("customers").leftJoin("kpis",
        "id", "customer_id")

    return customers_list
}

export async function set_customers(customer: Customer)
{
    db.update(customer).into("customers")
}

export async function set_kpi(kpi: Kpi)
{
    db.update(kpi).into("kpis")
}