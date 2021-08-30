import { AxiosResponse } from 'axios'
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"

import { RequestQuery } from '@/interfaces/app'
import { availability, availabilityResponse, AppointmentStatus } from '@/interfaces/availability';
import axios from '@/services/axios'

let params: RequestQuery = {
    params: {
        per_page: 10
    }
}

@Module
export default class Appointment extends VuexModule {
    private availability: availabilityResponse = {
        data: [],
        current_page: 0,
        last_page: 0,
        per_page: 0,
        total: 0
    }

    get list(): Array<availability> {
        return this.availability.data
    }

    get totalCount(): number {
        return this.availability.total
    }

    get lastPage(): number {
        return this.availability.last_page
    }

    get currentPage(): number {
        return this.availability.current_page
    }

    @Mutation
    SET_AVAILABILITY(availability: availabilityResponse): void {
        this.availability = availability
    }

    @Action({ commit: 'SET_AVAILABILITY' })
    async fetch(data?: RequestQuery) {
        const parameter = { ...params.params, ...data }
        params = { params: parameter }

        const response: AxiosResponse<availabilityResponse> = await axios.get('appointment', { params: parameter })
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
    async updateStatus({ status, id }: { status: AppointmentStatus, id: string }) {
        const { data }: AxiosResponse = await axios.put(`appointment/${id}`, { status })

        if (data) {
            this.context.dispatch('fetch')
            return data
        }
    }
}