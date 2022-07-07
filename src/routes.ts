import { FastifyReply, FastifyRequest } from "fastify"
import * as query from "./query"

/* recieves nothing, return list of customers and their kdi */
export async function get_customers(req: FastifyRequest, res: FastifyReply)
{
    const list = await query.get_customers_list()

    return res.status(200).send()
}

/* recieves a customer, return customer's id and status */
export async function post_customers(req: FastifyRequest, res: FastifyReply)
{
    return res.status(201).send()
}

/* recieves customer'id and kdi, return status */
export async function post_customers_kdi(req: FastifyRequest, res: FastifyReply)
{
    return res.status(201).send()
}
