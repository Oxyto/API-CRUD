import { Knex } from "knex"
import { Kpi } from "./models"

function get_kpi_status(number_purchase: number): string {
  if (number_purchase < 4) return "occasional"
  if (number_purchase < 10) return "regular"
  return "VIP"
}

export async function set_kpi(db: Knex, id: number, kpi: Kpi) {
  await db("kpis")
    .insert({
      customer_id: id,
      number_purchase: kpi.number_purchase,
      store: kpi.store,
      status: get_kpi_status(kpi.number_purchase),
    })
    .onConflict(["customer_id", "store"])
    .merge()
}
