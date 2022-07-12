export enum StatusEnum {
    occasional,
    regular,
    VIP,
}

export interface Kpi {
    number_purchase: number,
    store: string,
    status: StatusEnum
}

export interface Customer {
    username: string,
    lastname: string,
    birthdate: Date
}

export interface CustomerKpi extends Customer {
    kpis: Kpi[]
}
