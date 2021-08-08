import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { AxiosResponse } from "axios";

import { iRent, iRentResponse } from '@/interfaces/app';
import axios from '@/services/axios';

@Module
export default class Rent extends VuexModule {
    private rentList: iRentResponse = {
        data: [],
        current_page: 0,
        last_page: 0,
        per_page: 0,
        total: 0
    }

    get getRentList(): Array<iRent> {
        return this.rentList.data
    }

    @Mutation
    SET_RENT_LIST(rentList: iRentResponse): void {
        this.rentList = rentList
    }

    @Action
    fetch(): Promise<boolean> {
        return new Promise((resolve) => {

            axios.get('rents')
                .then((response: AxiosResponse) => {
                    this.context.commit('SET_RENT_LIST', response.data)
                    resolve(true)
                })
                .catch(() => { })
        })
    }

    @Action
    save(formData: iRent): Promise<boolean> {
        return new Promise((resolve) => {

            axios({
                method: formData.id ? 'put' : 'post',
                url: formData.id ? `rents/${formData.id}` : 'rents',
                data: formData
            })
                .then(() => {
                    this.context.dispatch('fetch')
                    resolve(true)
                })
                .catch(() => { })
        })
    }

    @Action
    destory(id: number): Promise<boolean> {
        return new Promise((resolve) => {

            axios.delete('rents/' + id)
                .then(() => {
                    this.context.dispatch('fetch')
                    resolve(true)
                })
                .catch(() => { })
        })
    }
}