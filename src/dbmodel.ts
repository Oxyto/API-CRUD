export enum StatusEnum {
    occasional,
    regular,
    VIP,
}

export interface Kpi {
    customer_id: number;
    number_purchase: number;
    store: string;
    status: StatusEnum;
}

export interface Customer {
    username: string;
    lastname: string;
    birthdate: Date;
}
