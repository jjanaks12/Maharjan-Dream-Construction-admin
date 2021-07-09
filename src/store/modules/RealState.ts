import { AxiosError } from 'axios';
import { iRealState } from '@/interfaces/app';
import { iErrorMessage } from '@/interfaces/auth';
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

import { iUserDetail } from "@/interfaces/auth";
import axios from '@/services/axios';
import { AxiosResponse } from 'axios';

@Module
export default class RealState extends VuexModule {
    private propertyList: Array<iUserDetail> = []

    get getPropertyList(): Array<iUserDetail> {
        return this.propertyList
    }

    @Mutation
    SET_PROPERTY_LIST(userList: Array<iUserDetail>): void {
        this.propertyList = userList
    }

    @Action
    fetchProperty(): Promise<boolean | iErrorMessage> {
        return new Promise((resolve) => {

            axios.get('realStates')
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
                    this.context.dispatch('fetchProperty')
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

                    this.context.dispatch('fetchProperty')
                    resolve(true)
                })
                .catch(() => { })
        })
    }
}