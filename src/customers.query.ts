import { Knex } from "knex"
import { Customer, CustomerKpi } from "./models"

export async function get_customers_list(db: Knex): Promise<CustomerKpi[]> {
  const customers_list: CustomerKpi[] = await db("kpis")
    .select(
      "customers.id",
      "customers.username",
      "customers.lastname",
      "customers.birthdate",
      "number_purchase",
      "store",
      "status"
    )
    .fullOuterJoin("customers", "customers.id", "kpis.customer_id")

  return customers_list
}

export async function set_customers(db: Knex, customer: Customer) {
  await db("customers")
    .insert(customer)
    .onConflict(["username", "lastname", "birthdate"])
    .ignore()
}
