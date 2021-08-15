import { RequestQuery } from './../../interfaces/app';
import { iErrorMessage, userResponse } from '@/interfaces/auth';
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

import { iUserDetail } from "@/interfaces/auth";
import axios from '@/services/axios';
import { AxiosResponse } from 'axios';

@Module
export default class User extends VuexModule {
    private userList: userResponse = {
        data: [],
        current_page: 0,
        last_page: 0,
        per_page: 0,
        total: 0
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

    @Action
    fetch(isAdmin: boolean = true, data: RequestQuery): Promise<boolean> {
        return new Promise((resolve) => {
            const url = isAdmin ? 'admins' : 'users'
            this.context.commit('SET_USER_LIST', [])

            axios.get(url, {
                params: {
                    ...data,
                    per_page: 10
                }
            })
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

                this.context.dispatch('fetch', {
                    page: this.currentPage + 1
                })
            }

            resolve(true)
        })
    }

    @Action
    prevPage(): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentPage > 1)
                this.context.dispatch('fetch', {
                    page: this.currentPage - 1
                })

            resolve(true)
        })
    }

    @Action
    gotoPage(pageno: number): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentPage >= 1)
                this.context.dispatch('fetch', {
                    page: pageno
                })

            resolve(true)
        })
    }
}