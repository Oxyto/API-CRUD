import { Knex } from "knex"
import { Customer } from "./dbmodel"

export async function get_customers_list(db: Knex): Promise<Customer[]>
{
    const customers_list: Customer[] = await db.select("username", "lastname", "birthdate",
        "kpis.number_purchase", "kpis.store", "kpis.status").from("customers").leftJoin("kpis",
        "kpis.customer_id", "customers.id")

    return customers_list
}

export async function set_customers(db: Knex, customer: Customer)
{
    await db.insert(customer).into("customers")
}

export async function check_customers(db: Knex, customer: Customer): Promise<boolean>
{
    if (!("username" in customer) || !("lastname" in customer) || !("birthdate" in customer))
        return false

    const customer_query: Customer[] = await db.select("username").from("customers").where("username", customer.username)

    if (customer_query.length > 0)
        return false
    return true
}
