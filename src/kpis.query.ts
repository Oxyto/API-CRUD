import { Knex } from "knex"
import type { Kpi } from "./models"

export async function setKpi(db: Knex, id: number, kpi: Kpi) {
  await db("kpis")
    .insert({
      customer_id: id,
      number_purchase: kpi.number_purchase,
      store: kpi.store,
    })
    .onConflict(["customer_id", "store"])
    .merge()
}
