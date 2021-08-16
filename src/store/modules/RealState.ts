import { AxiosError } from 'axios'
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from 'axios'

import { iRealState, iRealStateResponse, RequestQuery } from '@/interfaces/app'
import { iErrorMessage } from '@/interfaces/auth'
import axios from '@/services/axios'

let params: { params: {} } = {
    params: {
        per_page: 10
    }
}

@Module
export default class RealState extends VuexModule {
    private list: iRealStateResponse = {
        data: [],
        current_page: 0,
        last_page: 0,
        per_page: 0,
        total: 0
    }

    get getPropertyList(): Array<iRealState> {
        return this.list.data
    }

    get totalCount(): number {
        return this.list.total
    }

    get lastPage(): number {
        return this.list.last_page
    }

    get currentPage(): number {
        return this.list.current_page
    }

    @Mutation
    SET_PROPERTY_LIST(userList: iRealStateResponse): void {
        this.list = userList
    }

    @Action
    fetch(data: RequestQuery): Promise<boolean | iErrorMessage> {
        return new Promise((resolve) => {

            axios.get('realStates', { ...data })
                .then((response: AxiosResponse) => {

                    this.context.commit('SET_PROPERTY_LIST', response.data)
                    resolve(true)
                })
                .catch(() => { })
        })
    }

    @Action
    save(formData: iRealState): Promise<boolean | iErrorMessage> {
        return new Promise((resolve, reject) => {

            axios({
                method: formData.id ? 'put' : 'post',
                url: formData.id ? `realStates/${formData.id}` : 'realStates',
                data: formData
            })
                .then(() => {
                    this.context.dispatch('fetch')
                    resolve(true)
                }).catch((error: AxiosError) => {
                    reject(error.response?.data)
                })
        })
    }

    @Action
    destory(id: number): Promise<boolean> {
        return new Promise((resolve) => {

            axios.delete('realStates/' + id)
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
    search(searchtext: string): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentPage >= 1) {
                params = {
                    params: {
                        location: searchtext
                    }
                }
                this.context.dispatch('fetch', params)
            }

            resolve(true)
        })
    }

    @Action
    deleteImage(id: number): Promise<boolean> {
        return new Promise((resolve) => {

            axios.delete(`realStates/image/${id}`)
            resolve(true)
        })
    }
}