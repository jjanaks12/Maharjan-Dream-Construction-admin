import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from 'axios'

import { RequestQuery } from '@/interfaces/app'
import { iErrorMessage, userResponse, iUserDetail } from "@/interfaces/auth"
import axios from '@/services/axios'

let params: RequestQuery = {
    params: {
        per_page: 10
    }
}

@Module
export default class User extends VuexModule {
    private isAdmin: boolean = false
    private userList: userResponse = {
        data: [],
        current_page: 0,
        last_page: 0,
        per_page: 0,
        total: 0
    }

    get isRoot(): boolean {
        return this.isAdmin
    }

    get getUserList(): Array<iUserDetail> {
        return this.userList.data
    }

    get total(): number {
        return this.userList.total
    }

    get lastPage(): number {
        return this.userList.last_page
    }

    get currentPage(): number {
        return this.userList.current_page
    }

    @Mutation
    SET_USER_LIST(userList: userResponse): void {
        this.userList = userList
    }

    @Mutation
    SET_USER_TYPE(isAdmin: boolean): void {
        this.isAdmin = isAdmin
    }

    @Action
    fetch(data: RequestQuery): Promise<boolean> {
        return new Promise((resolve) => {
            const url = this.isAdmin ? 'admins' : 'users'

            axios.get(url, { ...data })
                .then((userResponse: AxiosResponse) => {

                    this.context.commit('SET_USER_LIST', userResponse.data)
                    resolve(true)
                })
                .catch(() => { })
        })
    }

    @Action
    destory(id: string): Promise<boolean | iErrorMessage> {
        return new Promise((resolve) => {

            axios.delete('users/' + id)
                .then(() => {

                    this.context.dispatch('fetchUser', false)
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

            params = {
                params: {
                    name: searchtext
                }
            }
            this.context.dispatch('fetch', params)

            resolve(true)
        })
    }
}