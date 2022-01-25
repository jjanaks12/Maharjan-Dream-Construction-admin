import { VNode } from "vue"
import { Component, Vue, Watch } from "vue-property-decorator"
import { mapActions, mapGetters } from "vuex"

import { iMaterialCategory } from "@/interfaces/material"
import Paginate from "../common/Paginate"
import MaterialCategoryCard from "./CategoryCard"
import MaterialLoading from "./MaterialLoading"
import Modal from "../common/Modal"
import MaterialCategoryCreate from "./CreateCategory"

let timer: any = null

@Component({
    computed: {
        ...mapGetters({
            categoryList: 'material/getCategoryList',
            current: 'material/currentCategoryPage',
            lastPage: 'material/lastCategoryPage',
        })
    },
    methods: {
        ...mapActions({
            fetchCategory: 'material/fetchCategory',
            categorySearch: 'material/categorySearch',
            nextPage: 'material/nextCategoryPage',
            prevPage: 'material/prevCategoryPage',
            goto: 'material/categoryGotoPage'
        })
    }
})
export default class CategoryList extends Vue {
    private showMaterialCategoryForm: boolean = false
    private isLoading: boolean = false
    private categoryList!: Array<iMaterialCategory>

    private current!: number
    private lastPage!: number
    private fetchCategory!: () => Promise<boolean>
    private nextPage!: () => Promise<boolean>
    private prevPage!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>

    private categorySearch!: (searchText: string) => Promise<boolean>
    private searchText: string = ''

    @Watch('searchText')
    searchTextChanged() {
        if (timer)
            clearTimeout(timer)

        timer = setTimeout(() => {
            this.categorySearch(this.searchText)
        }, 300);
    }

    constructor(props: any) {
        super(props)
    }

    mounted() {
        this.getMaterialCategory()
    }

    render(): VNode {
        return <div>
            <div class="flex items-center space-x-2 justify-end">
                <button type="button" onClick={(event: MouseEvent) => {
                    event.preventDefault()
                    this.getMaterialCategory()
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" class={{ "h-4 w-4": true, 'animate-spin': this.isLoading }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
                <button type="button" class="min-w-40 inline-flex justify-center items-center px-4 py-2 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-gray-200 transition" onClick={this.toggleCreateMaterialCategoryForm}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Create Material Category</span>
                </button>
                <input type="search" placeholder="Search Categories" v-model={this.searchText} class="bg-gray-700 appearance-none relative block w-56 px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm" />
            </div>
            {!this.isLoading ? [] : <MaterialLoading />}
            <div class="md:space-y-1 pt-3">
                <div class="md:space-y-1">
                    {this.categoryList.map((category: iMaterialCategory, index: number) => (<MaterialCategoryCard category={category} key={category.id} style={{ '--transition-delay': index * 0.3 + 's' }} />))}
                </div>
            </div>
            <Paginate current={this.current} total={this.lastPage} onNext={() => this.nextPage()} onPrev={() => this.prevPage()} onGoto={(pageno: number) => this.goto(pageno)} />
            <Modal v-model={this.showMaterialCategoryForm}>
                <MaterialCategoryCreate onClose={() => { this.showMaterialCategoryForm = false }} />
            </Modal>
        </div >
    }

    toggleCreateMaterialCategoryForm(event: MouseEvent): void {
        event.preventDefault()
        this.showMaterialCategoryForm = !this.showMaterialCategoryForm
    }

    getMaterialCategory() {
        this.isLoading = true

        this.fetchCategory()
            .finally(() => {
                this.isLoading = false
            })
    }
}