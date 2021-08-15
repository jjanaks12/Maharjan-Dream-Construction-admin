import { iMaterialCategory } from "@/interfaces/app"
import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue/types/umd"
import { mapActions, mapGetters } from "vuex"
import Paginate from "../common/Paginate"
import MaterialCategoryCard from "./CategoryCard"
import MaterialLoading from "./MaterialLoading"

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

    mounted() {
        this.isLoading = true

        this.fetch()
            .finally(() => {
                this.isLoading = false
            })
    }

    render(): VNode {
        return <div class="w-1/3 px-2">
            <h3 class="text-xl font-bold capitalize sm:truncate">Categories</h3>
            {!this.isLoading ? [<div class="md:space-y-1 pt-3">
                <div class="md:space-y-1">
                    {this.categoryList.map((category: iMaterialCategory, index: number) => (<MaterialCategoryCard category={category} key={category.id} style={{ '--transition-delay': index * 0.3 + 's' }} />))}
                </div>
            </div>, <Paginate current={this.current} total={this.lastPage} onNext={() => this.nextPage()} onPrev={() => this.prevPage()} onGoto={(pageno: number) => this.goto(pageno)} />] : <MaterialLoading />}
        </div>
    }
}