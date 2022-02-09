import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios"

import { iResponse, RequestQuery, responseInit } from "@/interfaces/app"
import { iEvent } from "@/interfaces/event"
import axios from '@/services/axios'

let params: RequestQuery = {
    params: {
        per_page: 10
    }
}

@Module
export default class Event extends VuexModule {
    private eventsResponse: iResponse<iEvent> = responseInit

    get list(): Array<iEvent> {
        return this.eventsResponse.data
    }

    get totalCount(): number {
        return this.eventsResponse.total
    }

    get lastPage(): number {
        return this.eventsResponse.last_page
    }

    get currentPage(): number {
        return this.eventsResponse.current_page
    }

    @Mutation
    SET_EVENT(event: iResponse<iEvent>): void {
        this.eventsResponse = event
    }

    @Action({ commit: 'SET_EVENT' })
    async fetch(data?: RequestQuery) {
        const parameter = { ...params.params, ...data }
        params = { params: parameter }

        const response: AxiosResponse<iResponse<iEvent>> = await axios.get('events', { params: parameter })
        return response.data
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
    save(formData: iEvent): Promise<boolean> {
        return new Promise((resolve) => {

            axios({
                method: formData.id ? 'put' : 'post',
                url: formData.id ? `events/${formData.id}` : 'events',
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

            axios.delete('events/' + id)
                .then(() => {
                    this.context.dispatch('fetch')
                    resolve(true)
                })
                .catch(() => { })
        })
    }
}