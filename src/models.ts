export interface Kpi {
  number_purchase: number
  store: string
}

export interface Customer {
  username: string
  lastname: string
  birthdate: Date
}

export interface CustomerKpi extends Customer {
  customer_id: number
  kpis: Kpi[]
}
