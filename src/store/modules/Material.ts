import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { AxiosResponse } from "axios";

import { iMaterial, iMaterialCategory, iMaterialCategoryResponse, iMaterialResponse, RequestQuery } from '@/interfaces/app';
import axios from '@/services/axios';

const materialInit: iMaterial = {
    name: '',
    description: '',
    material_category_id: '',
    measurement_unit: '',
    price: '',
    quantity: ''
}

@Module
export default class Material extends VuexModule {
    private categoryList: iMaterialCategoryResponse = {
        data: [],
        current_page: 0,
        last_page: 0,
        per_page: 0,
        total: 0
    }
    private materialList: iMaterialResponse = {
        data: [],
        current_page: 0,
        last_page: 0,
        per_page: 0,
        total: 0
    }

    get getMaterialList(): Array<iMaterial> {
        return this.materialList.data
    }

    get getCategoryList(): Array<iMaterialCategory> {
        return this.categoryList.data
    }

    get totalMaterialCount(): number {
        return this.materialList.total
    }

    get lastMaterialPage(): number {
        return this.materialList.last_page
    }

    get currentMaterialPage(): number {
        return this.materialList.current_page
    }

    @Mutation
    SET_MATERIAL_LIST(materialList: iMaterialResponse): void {
        this.materialList = materialList
    }

    @Mutation
    SET_CATEGORY_LIST(categoryList: iMaterialCategoryResponse): void {
        this.categoryList = categoryList
    }

    @Action
    fetch(data: RequestQuery): Promise<boolean> {
        return new Promise((resolve) => {

            axios.get('materials', {
                params: {
                    ...data,
                    per_page: 10
                }
            })
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

    @Action
    nextMaterialPage(): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentMaterialPage < this.lastMaterialPage) {
                console.log('a');

                this.context.dispatch('fetch', {
                    page: this.currentMaterialPage + 1
                })
            }

            resolve(true)
        })
    }

    @Action
    prevMaterialPage(): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentMaterialPage > 1)
                this.context.dispatch('fetch', {
                    params: {
                        page: this.currentMaterialPage - 1
                    }
                })

            resolve(true)
        })
    }
}