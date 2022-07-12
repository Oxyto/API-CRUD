import { Knex } from "knex"
import { Kpi, StatusEnum } from "./models"

function get_kpi_status(number_purchase: number): StatusEnum
{
    if (number_purchase < 4)
        return StatusEnum.occasional
    if (number_purchase < 10)
        return StatusEnum.regular
    return StatusEnum.VIP
}

export async function set_kpi(db: Knex, id: number, kpi: Kpi)
{
    await db("kpis")
        .insert({
            customer_id: id,
            number_purchase: kpi.number_purchase,
            store: kpi.store,
            status: get_kpi_status(kpi.number_purchase)
        })
        .onConflict(["customer_id", "store"])
        .ignore()
}
