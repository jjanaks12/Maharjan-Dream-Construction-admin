import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { AxiosResponse } from "axios";

import { iMaterial, iMaterialCategory } from '@/interfaces/app';
import axios from '@/services/axios';

@Module
export default class Material extends VuexModule {
    private materialList: Array<iMaterial> = []
    private categoryList: Array<iMaterialCategory> = []

    get getMaterialList(): Array<iMaterial> {
        return this.materialList
    }

    get getCategoryList(): Array<iMaterialCategory> {
        return this.categoryList
    }

    @Mutation
    SET_MATERIAL_LIST(materialList: Array<iMaterial>): void {
        this.materialList = materialList
    }

    @Mutation
    SET_CATEGORY_LIST(categoryList: Array<iMaterialCategory>): void {
        this.categoryList = categoryList
    }

    @Action
    fetch(): Promise<boolean> {
        return new Promise((resolve) => {

            axios.get('materials')
                .then((response: AxiosResponse) => {
                    this.context.commit('SET_MATERIAL_LIST', response.data)
                    resolve(true)
                })
                .catch(() => { })
        })
    }

    @Action
    fetchCategory(): Promise<boolean> {
        return new Promise((resolve) => {

            axios.get('materialCategories')
                .then((response: AxiosResponse) => {
                    this.context.commit('SET_CATEGORY_LIST', response.data)
                    resolve(true)
                })
                .catch(() => { })
        })
    }

    @Action
    save(formData: iMaterial): Promise<boolean> {
        return new Promise((resolve) => {

            axios({
                method: formData.id ? 'put' : 'post',
                url: formData.id ? `materials/${formData.id}` : 'materials',
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
    saveCategory(formData: iMaterialCategory): Promise<boolean> {
        return new Promise((resolve) => {

            axios.post('materialCategories', formData)
                .then(() => {
                    this.context.dispatch('fetchCategory')
                    resolve(true)
                })
                .catch(() => { })
        })
    }

    @Action
    destory(id: number): Promise<boolean> {
        return new Promise((resolve) => {

            axios.delete('materials/' + id)
                .then(() => {
                    this.context.dispatch('fetch')
                    resolve(true)
                })
                .catch(() => { })
        })
    }

    @Action
    deleteCategory(id: number): Promise<boolean> {
        return new Promise((resolve) => {

            axios.delete('materialCategories/' + id)
                .then(() => {
                    this.context.dispatch('fetchCategory')
                    resolve(true)
                })
                .catch(() => { })
        })
    }
}