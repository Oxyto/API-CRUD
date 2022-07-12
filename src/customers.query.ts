import { Knex } from "knex"
import { Customer } from "./dbmodel"

export async function get_customers_list(db: Knex): Promise<Customer[]>
{
    const customers_list: Customer[] = await db("customers")
        .select("username", "lastname", "birthdate", "kpis.number_purchase",
            "kpis.store", "kpis.status")
        .leftJoin("kpis", "kpis.customer_id", "customers.id")

    return customers_list
}

export async function set_customers(db: Knex, customer: Customer)
{
    await db("customers")
        .insert(customer)
        .onConflict(["username", "lastname", "birthdate"])
        .ignore()
}
