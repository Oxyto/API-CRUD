import { FastifyReply, FastifyRequest } from "fastify"
import { getCustomersList, setCustomers } from "./customers.query"
import type { Customer, Kpi, CustomerKpi } from "./models"
import { setKpi } from "./kpis.query"
import { db } from "./dbconfig"

function checkObject(attr_list: string[], obj: object): boolean {
  return (
    Object.keys(obj).every((elem) => attr_list.includes(elem)) &&
    Object.keys(obj).length > 0
  )
}

export async function getCustomers(_req: FastifyRequest, res: FastifyReply) {
  const list: CustomerKpi[] = await getCustomersList(db)

  return res.status(200).send(list)
}

export async function postCustomers(
  req: FastifyRequest<{ Body: Customer }>,
  res: FastifyReply
) {
  const customer: Customer = req.body

  if (
    !customer ||
    !checkObject(["username", "lastname", "birthdate"], customer)
  )
    return res.status(400).send({ error: "Bad request" })
  await setCustomers(db, customer)
  return res.status(201).send()
}

export async function postCustomersKpi(
  req: FastifyRequest<{ Params: { id: number }; Body: Kpi }>,
  res: FastifyReply
) {
  const customerId: number = req.params.id
  const kpi: Kpi = req.body

  if (
    customerId < 1 ||
    !kpi ||
    !checkObject(["number_purchase", "store"], kpi) ||
    kpi.number_purchase < 0
  )
    return res.status(400).send({ error: "Bad request" })
  await setKpi(db, customerId, kpi)
  return res.status(201).send()
}
