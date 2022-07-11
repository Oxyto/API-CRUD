import { FastifyReply, FastifyRequest } from "fastify"
import { Knex } from "knex"
import { check_customers, get_customers_list, set_customers } from "./customers.query"
import { Customer } from "./dbmodel"
import { Kpi } from "./dbmodel"
import { check_kpi, set_kpi } from "./kpis.query"
import { db } from "./dbconfig"

/* recieves nothing, return list of customers and their kdi */
export async function get_customers(req: FastifyRequest, res: FastifyReply)
{
    const list: Customer[] = await get_customers_list(db)

    return res.status(200).send(list)
}

/* recieves a customer, return customer id and status */
export async function post_customers(req: FastifyRequest<{ Body: Customer }>,
    res: FastifyReply)
{
    const customer: Customer = req.body

    if (!customer || !await check_customers(db, customer))
        return res.status(400).send({ error: "Bad request" })
    await set_customers(db, customer)
    return res.status(201).send()
}

/* recieves customer id and kdi, return status */
export async function post_customers_kpi(req: FastifyRequest<{ Params: { id: number }, Body: Kpi }>,
    res: FastifyReply)
{
    const customer_id: number = req.params.id
    const kpi: Kpi = req.body

    if (!kpi || !await check_kpi(db, customer_id, kpi))
        return res.status(400).send({ error: "Bad request" })
    await set_kpi(db, kpi)
    return res.status(201).send()
}
