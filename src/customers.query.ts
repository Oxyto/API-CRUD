import { Knex } from "knex"
import { Customer, CustomerKpi, CustomerResponse } from "./models"
import { getKpiStatus } from "./kpiUtils"

export async function getCustomersList(db: Knex): Promise<CustomerKpi[]> {
  const customersQuery: CustomerResponse[] = await db("customers")
    .select(
      "customers.id",
      "customers.username",
      "customers.lastname",
      "customers.birthdate",
      "number_purchase",
      "store",
    )
    .leftJoin("kpis", "customers.id", "kpis.customer_id")
  const customers: CustomerKpi[] = customersQuery.map((customer, _i, query_list) => ({
    id: customer.id,
    username: customer.username,
    lastname: customer.lastname,
    birthdate: customer.birthdate,
    kpis: query_list.filter((elem) => elem.id === customer.id)
      .map((elem) => ({
        number_purchase: elem.number_purchase,
        store: elem.store,
        status: getKpiStatus(elem.number_purchase),
      }))
  }))
  .filter((elem, i, list) => list.findIndex((rawElem) => rawElem.id === elem.id) === i)

  return customers
}
export async function setCustomers(db: Knex, customer: Customer) {
  await db("customers")
    .insert(customer)
    .onConflict(["username", "lastname", "birthdate"])
    .ignore()
}
