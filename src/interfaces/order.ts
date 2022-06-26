import { iMaterial } from "./material"
import { initUserDetail, iUserDetail } from "./auth"
import { deliveryInit, iDelivery } from "./delivery"

export enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    CANCELLED = 'cancelled',
    SHIPPED = 'shipped',
    COMPLETED = 'completed',
}

export enum PaymentStatus {
    UNPAID = 'unpaid',
    PAID = 'paid',
}

export interface iOrder {
    id?: string
    user: iUserDetail
    type: string
    price: number
    ordered_at: string
    order_status: OrderStatus
    delivery: iDelivery
    delivery_date: string | null
    delivery_address: string
    delivery_charge: number
    total: number
    payment_status: PaymentStatus
    material: Array<iMaterial>
}

export interface iOrderForm {
    startDate?: string,
    endDate?: string | null,
    status?: OrderStatus,
    payment_status?: PaymentStatus
}

export const initOrder = {
    user: initUserDetail,
    type: '',
    price: 0,
    ordered_at: '',
    order_status: OrderStatus.PENDING,
    delivery: deliveryInit,
    delivery_date: null,
    delivery_address: '',
    delivery_charge: 0,
    total: 0,
    payment_status: PaymentStatus.UNPAID,
    material: [],
}