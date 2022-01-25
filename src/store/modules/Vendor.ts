import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios"

import { iResponse, RequestQuery, responseInit } from "@/interfaces/app"
import { iVendor } from "@/interfaces/vendor"
import axios from '@/services/axios'

let params: { params: {} } = {
    params: {
        per_page: 10
    }
}

@Module
export default class Vendor extends VuexModule {
    private vendor: iResponse<iVendor> = responseInit

    get vendorList(): Array<iVendor> {
        return this.vendor.data
    }

    get totalCount(): number {
        return this.vendor.total
    }

    get lastPage(): number {
        return this.vendor.last_page
    }

    get currentPage(): number {
        return this.vendor.current_page
    }

    @Mutation
    SET_LIST(list: iResponse<iVendor>) {
        this.vendor = list
    }

    @Action
    fetch(data: RequestQuery): Promise<boolean> {
        return new Promise((resolve) => {

            axios.get('vendors', { ...data })
                .then((response: AxiosResponse) => {
                    this.context.commit('SET_LIST', response.data)
                    resolve(true)
                })
                .catch(() => { })
        })
    }

    @Action
    save(formData: iVendor): Promise<boolean> {
        return new Promise((resolve) => {

            axios({
                method: formData.id ? 'put' : 'post',
                url: formData.id ? `vendors/${formData.id}` : 'vendors',
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
    nextPage(): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentPage < this.lastPage) {
                params = {
                    params: {
                        ...params.params,
                        page: this.currentPage + 1
                    }
                }
                this.context.dispatch('fetch', params)
            }

            resolve(true)
        })
    }

    @Action
    prevPage(): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentPage > 1) {
                params = {
                    params: {
                        ...params.params,
                        page: this.currentPage - 1
                    }
                }
                this.context.dispatch('fetch', params)
            }

            resolve(true)
        })
    }

    @Action
    gotoPage(pageno: number): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentPage >= 1) {
                params = {
                    params: {
                        ...params.params,
                        page: pageno
                    }
                }
                this.context.dispatch('fetch', params)
            }

            resolve(true)
        })
    }

    @Action
    destory(id: number): Promise<boolean> {
        return new Promise((resolve) => {

            axios.delete('vendors/' + id)
                .then(() => {
                    this.context.dispatch('fetch')
                    resolve(true)
                })
                .catch(() => { })
        })
    }

    @Action
    search(searchtext: string): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentPage >= 1) {
                params = {
                    params: {
                        search: searchtext
                    }
                }
                this.context.dispatch('fetch', params)
            }

            resolve(true)
        })
    }
}