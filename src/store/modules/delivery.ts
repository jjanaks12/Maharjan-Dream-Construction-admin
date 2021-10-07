import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios"

import axios from '@/services/axios'
import { iDelivery } from "@/interfaces/delivery"

@Module
export default class Delivery extends VuexModule {
    private deliveries: Array<iDelivery> = []

    get list(): Array<iDelivery> {
        return this.deliveries
    }

    @Mutation
    SET_LIST(list: Array<iDelivery>) {
        this.deliveries = list
    }

    @Action({ commit: 'SET_LIST' })
    async fetch(): Promise<Array<iDelivery>> {
        const { data }: AxiosResponse = await axios.get('deliveries')
        return data
    }

    @Action
    async save(formData: iDelivery): Promise<boolean> {
        const { status }: AxiosResponse = await axios({
            method: formData.id ? 'put' : 'post',
            url: formData.id ? `/deliveries/${formData.id}` : 'deliveries',
            data: formData
        })

        if (status === 200) {
            this.context.dispatch('fetch')
            return true
        }

        return false
    }
}