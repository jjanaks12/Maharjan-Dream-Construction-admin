import { iErrorMessage } from '@/interfaces/auth';
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

import { iUserDetail } from "@/interfaces/auth";
import axios from '@/services/axios';
import { AxiosResponse } from 'axios';

@Module
export default class User extends VuexModule {
    private userList: Array<iUserDetail> = []

    get getUserList(): Array<iUserDetail> {
        return this.userList
    }

    @Mutation
    SET_USER_LIST(userList: Array<iUserDetail>): void {
        this.userList = userList
    }

    @Action
    fetchUser(isAdmin: boolean = true): Promise<boolean | iErrorMessage> {
        return new Promise((resolve) => {
            const url = isAdmin ? 'admins' : 'users'
            this.context.commit('SET_USER_LIST', [])

            axios.get(url)
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
}