import { Knex } from "knex"
import { Customer, CustomerKpi, CustomerQuery } from "./models"

export async function get_customers_list(db: Knex): Promise<CustomerKpi[]> {
  const customers_query_list: CustomerQuery[] = await db("customers")
    .select(
      "customers.id",
      "customers.username",
      "customers.lastname",
      "customers.birthdate",
      "number_purchase",
      "store",
      "status"
    )
    .leftJoin("kpis", "customers.id", "kpis.customer_id")
  var customers_list: CustomerKpi[] = []

  console.log(customers_query_list)
  for (var i: number = 0; i < customers_query_list.length; i++) {
    if (customers_query_list[i].id === -1)
      continue;
    customers_list[i] = {
      id: customers_query_list[i].id,
      username: customers_query_list[i].username,
      lastname: customers_query_list[i].lastname,
      birthdate: customers_query_list[i].birthdate,
      kpis: []
    }
    for (var j: number = i; j < customers_query_list.length; j++) {
      if (customers_list[i].id === customers_query_list[j].id) {
        customers_list[i].kpis.push({
          number_purchase: customers_query_list[j].number_purchase,
          store: customers_query_list[j].store,
          status: customers_query_list[j].status
        })
        customers_query_list[j].id = -1
      }
    }
  }

  return customers_list
}

export async function set_customers(db: Knex, customer: Customer) {
  await db("customers")
    .insert(customer)
    .onConflict(["username", "lastname", "birthdate"])
    .ignore()
}
