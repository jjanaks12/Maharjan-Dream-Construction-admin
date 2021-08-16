import { Component, Vue, Watch } from "vue-property-decorator"
import { VNode } from "vue/types/umd"
import { mapActions, mapGetters } from "vuex"

import { iMaterial } from "@/interfaces/app"
import MaterialCard from "./Card"
import Paginate from "../common/Paginate"
import MaterialLoading from "./MaterialLoading"

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
            fetch: 'material/fetch',
            nextPage: 'material/nextMaterialPage',
            prevPage: 'material/prevMaterialPage',
            goto: 'material/materialGotoPage',
            search: 'material/search',
        })
    }
})
export default class MaterialList extends Vue {
    private isLoading: boolean = false

    private materialList!: Array<iMaterial>
    private fetch!: () => Promise<boolean>

    private current!: number
    private lastPage!: number
    private nextPage!: () => Promise<boolean>
    private prevPage!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>

    private search!: (searchText: string) => Promise<boolean>
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
            this.search(this.searchText)
        }, 300);
    }

    render(): VNode {
        return <div class="w-2/3 px-2">
            <div class="flex items-center space-x-2">
                <input type="search" placeholder="Search Materials" v-model={this.searchText} class="bg-gray-700 appearance-none relative block w-56 px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm ml-auto" />
            </div>
            {!this.isLoading ? [<div class="md:space-y-1 pt-3">
                <div class="md:space-y-1">
                    {this.materialList.map((material: iMaterial, index: number) => (<MaterialCard material={material} key={material.id} style={{ '--transition-delay': index * 0.3 + 's' }} />))}
                </div>
            </div>,
            <Paginate current={this.current} total={this.lastPage} onNext={() => this.nextPage()} onPrev={() => this.prevPage()} onGoto={(pageno: number) => this.goto(pageno)} />] : <MaterialLoading />}
        </div>
    }
}