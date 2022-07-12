import { Knex } from "knex"
import { Kpi } from "./dbmodel"

export async function set_kpi(db: Knex, id: number, kpi: Kpi)
{
    await db("kpis")
        .insert({
            customer_id: id,
            number_purchase: kpi.number_purchase,
            store: kpi.store,
            status: kpi.status
        })
        .onConflict(["customer_id", "store"])
        .ignore()
}
