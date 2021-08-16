import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios"

import { iMaterial, iMaterialCategory, iMaterialCategoryResponse, iMaterialResponse, RequestQuery } from '@/interfaces/app'
import axios from '@/services/axios'

let categoryParams: { params: {} } = {
    params: {
        per_page: 10
    }
}
let params: { params: {} } = {
    params: {
        per_page: 10
    }
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

    get currentCategoryPage(): number {
        return this.categoryList.current_page
    }

    get totalCatergoryCount(): number {
        return this.categoryList.total
    }

    get lastCategoryPage(): number {
        return this.categoryList.last_page
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

            axios.get('materials', { ...data })
                .then((response: AxiosResponse) => {
                    this.context.commit('SET_MATERIAL_LIST', response.data)
                    resolve(true)
                })
                .catch(() => { })
        })
    }

    @Action
    fetchCategory(data: RequestQuery): Promise<boolean> {
        return new Promise((resolve) => {

            axios.get('materialCategories', { ...data })
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
                params = {
                    params: {
                        ...params.params,
                        page: this.currentMaterialPage + 1
                    }
                }
                this.context.dispatch('fetch', params)
            }

            resolve(true)
        })
    }

    @Action
    prevMaterialPage(): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentMaterialPage > 1) {
                params = {
                    params: {
                        ...params.params,
                        page: this.currentMaterialPage - 1
                    }
                }
                this.context.dispatch('fetch', {
                    page: this.currentMaterialPage - 1
                })
            }

            resolve(true)
        })
    }

    @Action
    materialGotoPage(pageno: number): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentMaterialPage >= 1) {
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
    nextCategoryPage(): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentCategoryPage < this.lastCategoryPage) {
                categoryParams = {
                    params: {
                        ...categoryParams.params,
                        page: this.currentCategoryPage + 1
                    }
                }
                this.context.dispatch('fetchCategory', categoryParams)
            }

            resolve(true)
        })
    }

    @Action
    prevCategoryPage(): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentCategoryPage > 1) {
                categoryParams = {
                    params: {
                        ...categoryParams.params,
                        page: this.currentCategoryPage - 1
                    }
                }
                this.context.dispatch('fetchCategory', categoryParams)
            }

            resolve(true)
        })
    }

    @Action
    categoryGotoPage(pageno: number): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentCategoryPage >= 1) {
                categoryParams = {
                    params: {
                        ...categoryParams.params,
                        page: pageno
                    }
                }
                this.context.dispatch('fetchCategory', categoryParams)
            }

            resolve(true)
        })
    }

    @Action
    search(searchtext: string): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentCategoryPage >= 1) {
                params = {
                    params: {
                        name: searchtext
                    }
                }
                this.context.dispatch('fetch', params)
            }

            resolve(true)
        })
    }

    @Action
    categorySearch(searchtext: string): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentCategoryPage >= 1) {
                categoryParams = {
                    params: {
                        title: searchtext
                    }
                }
                this.context.dispatch('fetchCategory', categoryParams)
            }

            resolve(true)
        })
    }

    @Action
    deleteImage(id: number): Promise<boolean> {
        return new Promise((resolve) => {

            axios.delete(`materials/image/${id}`)
            resolve(true)
        })
    }


}