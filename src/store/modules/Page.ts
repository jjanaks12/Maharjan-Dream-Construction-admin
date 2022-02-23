import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios"

import { iResponse, RequestQuery, responseInit } from "@/interfaces/app"
import { iPage, pageInit } from "@/interfaces/page"
import axios from '@/services/axios'

let params: RequestQuery = {
    params: {
        per_page: 10
    }
}

@Module
export default class Page extends VuexModule {
    private pageResponse: iResponse<iPage> = responseInit
    private pageDetail: iPage = pageInit

    get list(): Array<iPage> {
        return this.pageResponse.data
    }

    get totalCount(): number {
        return this.pageResponse.total
    }

    get lastPage(): number {
        return this.pageResponse.last_page
    }

    get currentPage(): number {
        return this.pageResponse.current_page
    }

    get get(): iPage {
        return this.pageDetail
    }

    @Mutation
    SET_PAGE(event: iResponse<iPage>): void {
        this.pageResponse = event
    }

    @Mutation
    SET_PAGE_DETAIL(page: iPage): void {
        this.pageDetail = page
    }

    @Action({ commit: 'SET_PAGE' })
    async fetch(data?: RequestQuery) {
        this.context.commit('SET_PAGE', {})
        const parameter = { ...params.params, ...data }
        params = { params: parameter }

        const response: AxiosResponse<iResponse<iPage>> = await axios.get('pages', { params: parameter })
        return response.data
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

            if (this.currentPage >= 1) {
                params = {
                    params: {
                        location: searchtext
                    }
                }
                this.context.dispatch('fetch', params)
            }

            resolve(true)
        })
    }

    @Action
    save(formData: iPage): Promise<boolean> {
        return new Promise((resolve) => {

            axios({
                method: formData.id ? 'put' : 'post',
                url: formData.id ? `pages/${formData.id}` : 'pages',
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

            axios.delete('pages/' + id)
                .then(() => {
                    this.context.dispatch('fetch')
                    resolve(true)
                })
                .catch(() => { })
        })
    }

    @Action({ commit: 'SET_PAGE_DETAIL' })
    async getPage(slug: string) {

        const { data }: AxiosResponse = await axios.get(`page/${slug}`)
        return data
    }
}