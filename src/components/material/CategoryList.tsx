import { VNode } from "vue"
import { Component, Vue, Watch } from "vue-property-decorator"
import { mapActions, mapGetters } from "vuex"

import { iMaterialCategory } from "@/interfaces/app"
import Paginate from "../common/Paginate"
import MaterialCategoryCard from "./CategoryCard"
import MaterialLoading from "./MaterialLoading"

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
            fetch: 'material/fetchCategory',
            categorySearch: 'material/categorySearch',
            nextPage: 'material/nextCategoryPage',
            prevPage: 'material/prevCategoryPage',
            goto: 'material/categoryGotoPage'
        })
    }
})
export default class CategoryList extends Vue {
    private isLoading: boolean = false

    private categoryList!: Array<iMaterialCategory>
    private fetch!: () => Promise<boolean>

    private current!: number
    private lastPage!: number
    private nextPage!: () => Promise<boolean>
    private prevPage!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>

    private categorySearch!: (searchText: string) => Promise<boolean>
    private searchText: string = ''

    mounted() {
        this.isLoading = true

        this.fetch()
            .finally(() => {
                this.isLoading = false
            })
    }

    @Watch('searchText')
    searchTextChanged() {
        if (timer)
            clearTimeout(timer)

        timer = setTimeout(() => {
            this.categorySearch(this.searchText)
        }, 300);
    }

    render(): VNode {
        return <div class="w-1/3 px-2">
            <div class="flex justify-between items-center space-x-2">
                <h3 class="text-xl font-bold capitalize sm:truncate">Categories</h3>
                <input type="search" placeholder="Search Categories" v-model={this.searchText} class="bg-gray-700 appearance-none relative block w-1/2 px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm" />
            </div>
            {!this.isLoading ? [<div class="md:space-y-1 pt-3">
                <div class="md:space-y-1">
                    {this.categoryList.map((category: iMaterialCategory, index: number) => (<MaterialCategoryCard category={category} key={category.id} style={{ '--transition-delay': index * 0.3 + 's' }} />))}
                </div>
            </div>, <Paginate current={this.current} total={this.lastPage} onNext={() => this.nextPage()} onPrev={() => this.prevPage()} onGoto={(pageno: number) => this.goto(pageno)} />] : <MaterialLoading />
            }
        </div >
    }
}