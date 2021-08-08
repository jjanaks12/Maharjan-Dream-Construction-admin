import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { AxiosResponse } from "axios";

import { iTraining, iTrainingResponse } from '@/interfaces/app';
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

    @Mutation
    SET_TRAINING_LIST(trainingList: iTrainingResponse): void {
        this.trainingList = trainingList
    }

    @Action
    fetch(): Promise<boolean> {
        return new Promise((resolve) => {

            axios.get('trainings')
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
}