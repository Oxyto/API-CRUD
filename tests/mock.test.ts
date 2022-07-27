import got from "got"
import { getKpiStatus } from "./kpiUtils"
import type { Customer, Kpi } from "./models"

test("Get a empty list of customers", async () => {
  const res = await got.get(
    `http://${process.env.HOST_IP}:${process.env.HOST_PORT}/customers`
  )

  expect(res.body).toEqual([])
})

test("Create a new customer", async () => {
  const customerBody: Customer = {
    username: "Bob",
    lastname: "Ross",
    birthdate: new Date(1942, 10, 29),
  }
  const res = await got.post(
    `http://${process.env.HOST_IP}:${process.env.HOST_PORT}/customers`,
    { json: customerBody }
  )

  expect(res.statusCode).toBe(201)
})

test("Create a new customer with invalid body", async () => {
  const res = await got.post(
    `http://${process.env.HOST_IP}:${process.env.HOST_PORT}/customers`,
    {}
  )

  expect(res.statusCode).toBe(400)
})

test("Create a new customer with empty body", async () => {
  const res = await got.post(
    `http://${process.env.HOST_IP}:${process.env.HOST_PORT}/customers`,
    {}
  )

  expect(res.statusCode).toBe(400)
})

test("Create new customer kpi", async () => {
  const kpiBody: Kpi = {
    number_purchase: 42,
    store: "FNAC",
  }
  const res = await got.post(
    `http://${process.env.HOST_IP}:${process.env.HOST_PORT}/customers/1/kpi`,
    { json: kpiBody }
  )

  expect(res.statusCode).toBe(201)
})

test("Create new customer kpi with invalid id", async () => {
  const kpiBody: Kpi = {
    number_purchase: 42,
    store: "FNAC",
  }
  const res = await got.post(
    `http://${process.env.HOST_IP}:${process.env.HOST_PORT}/customers/0/kpi`,
    { json: kpiBody }
  )

  expect(res.statusCode).toBe(400)
})

test("Create new customer kpi with invalid body", async () => {
  const kpiBody = {
    a: 2,
    number_purchase: 42,
  }
  const res = await got.post(
    `http://${process.env.HOST_IP}:${process.env.HOST_PORT}/customers/1/kpi`,
    { json: kpiBody }
  )

  expect(res.statusCode).toBe(400)
})

test("Create new customer kpi with empty body", async () => {
  const res = await got.post(
    `http://${process.env.HOST_IP}:${process.env.HOST_PORT}/customers/1/kpi`,
    { json: {} }
  )

  expect(res.statusCode).toBe(400)
})

test("Get a non-empty list of customers", async () => {
  const res = await got.get(
    `http://${process.env.HOST_IP}:${process.env.HOST_PORT}/customers`
  )

  expect(res.body).toEqual([
    {
      username: "Bob",
      lastname: "Ross",
      birthdate: new Date(1942, 10, 29),
      kpis: [
        {
          number_purchase: 42,
          store: "FNAC",
          status: getKpiStatus(42),
        },
      ],
    },
  ])
})
