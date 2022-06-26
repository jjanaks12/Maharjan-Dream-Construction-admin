import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios"

import { initOrder, iOrder, OrderStatus, PaymentStatus } from "@/interfaces/order"
import axios from "@/services/axios"
import { RequestQuery } from "@/interfaces/app"

let params: { params: {} } = {
    params: {
        per_page: 10
    }
}

@Module
export default class Order extends VuexModule {
    private orders: Array<iOrder> = []

    get list(): Array<iOrder> {
        return this.orders
    }

    get totalCount(): number {
        return this.orders.length
    }

    @Mutation
    SET_LIST(list: Array<iOrder>) {
        this.orders = list
    }

    @Action({ commit: 'SET_LIST' })
    async fetch(query: RequestQuery): Promise<Array<iOrder> | null> {
        params = { params: query }
        const { data, status }: AxiosResponse = await axios.get('orders', { ...query })

        if (status === 200)
            return data

        return null
    }

    @Action
    async updateOrderStatus(formData: { order_status: OrderStatus, order_id: string, delivery_date: string | null }) {
        const { status }: AxiosResponse = await axios({
            method: "put",
            url: `orders/${formData.order_id}/updateOrderStatus`,
            data: {
                order_status: formData.order_status,
                delivery_date: formData.delivery_date
            }
        })

        if (status === 200)
            this.context.dispatch('fetch')
    }

    @Action
    async updatePaymentStatus(formData: { payment_status: PaymentStatus, order_id: string }) {

        const { status }: AxiosResponse = await axios({
            method: 'put',
            url: `orders/${formData.order_id}/updatePayment`,
            data: {
                payment_status: formData.payment_status
            }
        })

        if (status === 200)
            this.context.dispatch('fetch')
    }

    @Action
    async get(id: string): Promise<iOrder> {
        const { data, status }: AxiosResponse = await axios('orders/' + id)

        if (status === 200)
            return data

        return initOrder
    }
}