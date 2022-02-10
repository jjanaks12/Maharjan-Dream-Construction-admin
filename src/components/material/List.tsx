import { Component, Vue, Watch } from "vue-property-decorator"
import { VNode } from "vue/types/umd"
import { mapActions, mapGetters } from "vuex"

import { iMaterial } from "@/interfaces/material"
import MaterialCard from "./Card"
import Paginate from "../common/Paginate"
import MaterialLoading from "./MaterialLoading"
import Modal from "../common/Modal"
import MaterialCreate from "./Create"

let timer: any = null

@Component({
    computed: {
        ...mapGetters({
            materialList: 'material/getMaterialList',
            lastPage: 'material/lastMaterialPage',
            current: 'material/currentMaterialPage',
        })
    },
    methods: {
        ...mapActions({
            fetchMaterial: 'material/fetch',
            nextPage: 'material/nextMaterialPage',
            prevPage: 'material/prevMaterialPage',
            goto: 'material/materialGotoPage',
            search: 'material/search',
        })
    }
})
export default class MaterialList extends Vue {
    private showMaterialForm: boolean = false
    private isLoading: boolean = false
    private materialList!: Array<iMaterial>

    private current!: number
    private lastPage!: number
    private fetchMaterial!: () => Promise<boolean>
    private nextPage!: () => Promise<boolean>
    private prevPage!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>

    private search!: (searchText: string) => Promise<boolean>
    private searchText: string = ''

    @Watch('searchText')
    searchTextChanged() {
        if (timer)
            clearTimeout(timer)

        timer = setTimeout(() => {
            this.search(this.searchText)
        }, 300);
    }

    mounted() {
        this.getMaterial()
    }

    render(): VNode {
        return <div class="">
            <div class="flex items-center space-x-2 justify-end">
                <button type="button" onClick={(event: MouseEvent) => {
                    event.preventDefault()
                    this.getMaterial()
                }} class="whitespace-nowrap">
                    <svg xmlns="http://www.w3.org/2000/svg" class={{ "h-4 w-4 inline-block align-middle mr-1": true, 'animate-spin': this.isLoading }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    refresh
                </button>
                <button type="button" class="min-w-40 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition" onClick={this.toggleCreateMaterialForm}>
                    <svg xmlns="http://www.w3.org/2000/svg" class={{ "h-6 w-6 relative": true, 'transform rotate-90 ': this.showMaterialForm }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Create Material</span>
                </button>
                <input type="search" placeholder="Search Materials" v-model={this.searchText} class="bg-gray-700 appearance-none relative block w-56 px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm" />
            </div>
            <div class="md:space-y-1 pt-3">
                <div class="md:space-y-1">
                    {this.materialList.map((material: iMaterial, index: number) => (<MaterialCard material={material} key={material.id} style={{ '--transition-delay': index * 0.3 + 's' }} />))}
                </div>
            </div>
            <Paginate current={this.current} total={this.lastPage} onNext={() => this.nextPage()} onPrev={() => this.prevPage()} onGoto={(pageno: number) => this.goto(pageno)} />
            {!this.isLoading ? [] : <MaterialLoading />}
            <Modal v-model={this.showMaterialForm}>
                <MaterialCreate onClose={() => { this.showMaterialForm = false }} />
            </Modal>
        </div>
    }

    toggleCreateMaterialForm(event: MouseEvent): void {
        event.preventDefault()
        this.showMaterialForm = !this.showMaterialForm
    }

    getMaterial() {
        this.isLoading = true

        this.fetchMaterial()
            .finally(() => {
                this.isLoading = false
            })
    }
}