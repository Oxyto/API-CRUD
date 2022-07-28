export interface Kpi {
  number_purchase: number
  store: string
}

export interface KpiResponse extends Kpi {
  status: string
}

export interface Customer {
  username: string
  lastname: string
  birthdate: Date
}

export interface CustomerResponse extends Customer, KpiResponse {
  id: number
}

export interface CustomerKpi extends Customer {
  id: number
  kpis: KpiResponse[]
}
