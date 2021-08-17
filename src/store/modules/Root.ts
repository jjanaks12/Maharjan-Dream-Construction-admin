import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { AxiosResponse } from "axios";

import { iLogin, iUserDetail } from "@/interfaces/auth";
import axios from '@/services/axios'

@Module
export default class Root extends VuexModule {
    private token: string | null = null
    private userDetail: iUserDetail | null = null

    get getLoggedinUser(): iUserDetail | null {
        return this.userDetail
    }

    get getToken(): string | null {
        return this.token
    }

    @Mutation
    SET_TOKEN(token: string): void {
        this.token = token
    }

    @Mutation
    SET_LOGIN_USER(userDetail: iUserDetail): void {
        this.userDetail = { ...userDetail }
    }

    @Action
    login(formData: iLogin): Promise<void | boolean> {
        return new Promise((resolve) => {

            axios.post('admin/login', formData)
                .then((userResponse: AxiosResponse) => {
                    this.context.commit('SET_TOKEN', userResponse.data.token)
                    this.context.commit('SET_LOGIN_USER', userResponse.data)

                    resolve(true)
                })
                .catch(() => { })
        })
    }

    @Action
    logout(): Promise<boolean> {
        return new Promise((resolve) => {

            axios.post('admin/logout')
                .then(() => {
                    this.context.commit('SET_TOKEN', null)
                    this.context.commit('SET_LOGIN_USER', {})
                    resolve(true)
                })
                .catch(() => { })
        })
    }

    @Action
    fetchLogginedUser(): Promise<boolean> {
        return new Promise((resolve) => {

            resolve(true)
            axios.post('admin/logout')
                .then(() => {
                    this.context.commit('SET_TOKEN', null)
                    this.context.commit('SET_LOGIN_USER', {})
                })
                .catch(() => { })
        })
    }

    @Action
    resetUser(): Promise<boolean> {
        return new Promise((resolve) => {
            this.context.commit('SET_TOKEN', null)
            this.context.commit('SET_LOGIN_USER', {})

            resolve(true)
        })
    }
}