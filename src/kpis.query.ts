import knex, { Knex } from "knex"
import { Kpi } from "./dbmodel"

export async function set_kpi(db: Knex, kpi: Kpi)
{
    await db.insert(kpi).into("kpis")
}

export async function check_kpi(db: Knex, id: number, kpi: Kpi): Promise<boolean>
{
    const customer_id: number[] = await db.select("id").from("customers").where("id", id)

    if (!("number_purchase" in kpi) || !("store" in kpi) || !("customer_id" in kpi))
        return false
    if (!customer_id)
        return false
    return true
}
