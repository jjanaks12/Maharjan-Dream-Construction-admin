import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios"

import axios from '@/services/axios'
import { iResponse, RequestQuery, responseInit } from '@/interfaces/app'
import { iNotification } from '@/interfaces/notification'

let params: { params: {} } = {
    params: {
        per_page: 10
    }
}

@Module
export default class Notification extends VuexModule {
    private notifications: iResponse<iNotification> = responseInit

    get list(): Array<iNotification> {
        return this.notifications.data
    }

    get totalCount(): number {
        return this.notifications.total
    }

    get lastPage(): number {
        return this.notifications.last_page
    }

    get currentPage(): number {
        return this.notifications.current_page
    }

    @Mutation
    SET_LIST(list: iResponse<iNotification>) {
        this.notifications = list
    }

    @Mutation
    ADD_TO_LIST(notification: iNotification) {
        this.notifications.data.unshift(notification)
    }

    @Action({ commit: 'SET_LIST' })
    async fetch(query: RequestQuery): Promise<Array<iNotification> | null> {
        const { data, status }: AxiosResponse = await axios.get('notifications/all', { ...query })

        if (status === 200)
            return data

        return null
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
    async markAsRead(id: string): Promise<boolean> {
        const { status } = await axios('notifications/mark_as_read/' + id)

        this.context.dispatch('fetch', params)
        return status === 200
    }
}