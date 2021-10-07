import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios"

import { iOrder, OrderStatus, PaymentStatus } from "@/interfaces/order"
import axios from "@/services/axios"

@Module
export default class Order extends VuexModule {
    private orders: Array<iOrder> = []

    get list(): Array<iOrder> {
        return this.orders
    }

    @Mutation
    SET_LIST(list: Array<iOrder>) {
        this.orders = list
    }

    @Action({ commit: 'SET_LIST' })
    async fetch(): Promise<Array<iOrder> | null> {
        const { data, status }: AxiosResponse = await axios.get('orders')

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
        console.log(formData);

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
}