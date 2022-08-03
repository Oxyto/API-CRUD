import { getKpiStatus } from "../kpiUtils"
import { CustomerResponse } from "../models"

function createCustomersQueryFunctional(customersQuery: CustomerResponse[]) {
  return customersQuery
    .map((customer, _i, query_list) => ({
      id: customer.id,
      username: customer.username,
      lastname: customer.lastname,
      birthdate: customer.birthdate,
      kpis: query_list
        .filter((elem) => elem.id === customer.id)
        .map((elem) => ({
          number_purchase: elem.number_purchase,
          store: elem.store,
          status: getKpiStatus(elem.number_purchase),
        })),
    }))
    .filter(
      (elem, i, list) =>
        list.findIndex((rawElem) => rawElem.id === elem.id) === i
    )
}

function createCustomersQueryImperative(customersQuery: CustomerResponse[]) {
  const mapCustomerList = new Map(),
    mapKpis = new Map()

  customersQuery.forEach((customer) => {
    if (!mapKpis.get(customer.id))
      mapKpis.set(customer.id, [])
    mapKpis
      .get(customer.id)
      .push({ store: customer.store, number_purchase: customer.number_purchase, status: customer.status })
    mapCustomerList.set(
      customer.id,
      {
        id: customer.id,
        username: customer.username,
        lastname: customer.lastname,
        birthdate: customer.birthdate,
        kpis: mapKpis.get(customer.id)
      }
    )
  })
  return Array.from(mapCustomerList.values())
}

const query: CustomerResponse[] = [
  {
    id: 1,
    username: "Bob",
    lastname: "Ross",
    birthdate: new Date("1942-10-29"),
    number_purchase: 3,
    store: "FNAC",
    status: getKpiStatus(3)
  },
  {
    id: 1,
    username: "Bob",
    lastname: "Ross",
    birthdate: new Date("1942-10-29"),
    number_purchase: 12,
    store: "Amazon",
    status: getKpiStatus(12)
  },
  {
    id: 2,
    username: "Jean",
    lastname: "Neymar",
    birthdate: new Date("2012-12-12"),
    number_purchase: 4,
    store: "Darty",
    status: getKpiStatus(4)
  }
]

test("Test performance between imperative and functional", () => {

  var time = Date.now()
  console.log(createCustomersQueryImperative(query))
  console.log(`\x1b[40mTime for imperative implementation\x1b[0m : \x1b[7m${Date.now() - time}ms\x1b[0m`)

  time = Date.now()
  console.log(createCustomersQueryFunctional(query))
  console.log(`\x1b[40mTime for functional implementation\x1b[0m : \x1b[7m${Date.now() - time}ms\x1b[0m`)
})
