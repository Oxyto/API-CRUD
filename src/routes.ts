import { FastifyReply, FastifyRequest } from "fastify"
import { get_customers_list, set_customers } from "./customers.query"
import { Customer, Kpi, CustomerKpi } from "./models"
import { set_kpi } from "./kpis.query"
import { db } from "./dbconfig"

function check_object(attr_list: string[], obj: object): boolean {
  for (const key in obj) {
    if (!attr_list.includes(key)) return false
  }
  return true
}

/* recieves nothing, return list of customers and their kdi */
export async function get_customers(_req: FastifyRequest, res: FastifyReply) {
  const list: CustomerKpi[] = await get_customers_list(db)

  return res.status(200).send(list)
}

/* recieves a customer, return customer id and status */
export async function post_customers(
  req: FastifyRequest<{ Body: Customer }>,
  res: FastifyReply
) {
  const customer: Customer = req.body

  if (
    !customer ||
    !check_object(["username", "lastname", "birthdate"], customer)
  )
    return res.status(400).send({ error: "Bad request" })
  await set_customers(db, customer)
  return res.status(201).send()
}

/* recieves customer id and kdi, return status */
export async function post_customers_kpi(
  req: FastifyRequest<{ Params: { id: number }; Body: Kpi }>,
  res: FastifyReply
) {
  const customer_id: number = req.params.id
  const kpi: Kpi = req.body

  if (
    customer_id < 1 ||
    !kpi ||
    !check_object(["number_purchase", "store"], kpi) ||
    kpi.number_purchase < 0
  )
    return res.status(400).send({ error: "Bad request" })
  await set_kpi(db, customer_id, kpi)
  return res.status(201).send()
}
