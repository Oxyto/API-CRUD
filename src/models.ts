export enum StatusEnum {
  occasional = "occasional",
  regular = "regular",
  VIP = "VIP",
}

export interface Kpi {
  number_purchase: number
  store: string
}

export interface KpiResponse extends Kpi {
  status: StatusEnum
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
