import { createCustomersQuery } from "../customers.query"
import { getKpiStatus } from "../kpiUtils"
import type { CustomerKpi, CustomerResponse } from "../models"

test("Convert a list of customers response to a customer kpis list", () => {
  const customerQuery: CustomerResponse[] = [
    {
      id: 1,
      username: "Bob",
      lastname: "Ross",
      birthdate: new Date(1942, 10, 29),
      number_purchase: 42,
      store: "FNAC",
      status: getKpiStatus(42),
    },
    {
      id: 1,
      username: "Bob",
      lastname: "Ross",
      birthdate: new Date(1942, 10, 29),
      number_purchase: 3,
      store: "Amazon",
      status: getKpiStatus(3),
    },
  ]
  const customers: CustomerKpi[] = [
    {
      id: 1,
      username: "Bob",
      lastname: "Ross",
      birthdate: new Date(1942, 10, 29),
      kpis: [
        {
          number_purchase: 42,
          store: "FNAC",
          status: getKpiStatus(42),
        },
        {
          number_purchase: 3,
          store: "Amazon",
          status: getKpiStatus(3),
        },
      ],
    },
  ]

  expect(createCustomersQuery(customerQuery)).toStrictEqual(customers)
})
