import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { AxiosResponse } from "axios";

import { iTraining, iTrainingResponse, RequestQuery } from '@/interfaces/app';
import axios from '@/services/axios';
import moment from "moment";

@Module
export default class Training extends VuexModule {
    private trainingList: iTrainingResponse = {
        data: [],
        current_page: 0,
        last_page: 0,
        per_page: 0,
        total: 0
    }

    get getTrainingList(): Array<iTraining> {
        return this.trainingList.data
    }

    get today(): string {
        return moment().add(1, "day").format('YYYY-MM-DD')
    }

    get total(): number {
        return this.trainingList.total
    }

    get lastPage(): number {
        return this.trainingList.last_page
    }

    get currentPage(): number {
        return this.trainingList.current_page
    }

    @Mutation
    SET_TRAINING_LIST(trainingList: iTrainingResponse): void {
        this.trainingList = trainingList
    }

    @Action
    fetch(data: RequestQuery): Promise<boolean> {
        return new Promise((resolve) => {

            axios.get('trainings', {
                params: {
                    ...data,
                    per_page: 10
                }
            })
                .then((response: AxiosResponse) => {
                    this.context.commit('SET_TRAINING_LIST', response.data)
                    resolve(true)
                })
                .catch(() => { })
        })
    }

    @Action
    save(formData: iTraining): Promise<boolean> {
        return new Promise((resolve) => {

            axios({
                method: formData.id ? 'put' : 'post',
                url: formData.id ? `trainings/${formData.id}` : 'trainings',
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

            axios.delete('trainings/' + id)
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