import { Component, Vue, Watch } from "vue-property-decorator"
import { VNode } from "vue/types/umd"
import { mapActions, mapGetters } from "vuex"

import { iMenu } from "@/interfaces/resturant"

import Paginate from "../common/Paginate"
import Modal from "../common/Modal"
import MenuCreate from "./MenuCreate"
import MenuCard from "./MenuCard"

let timer: any = null

@Component({
    computed: {
        ...mapGetters({
            menuList: 'resturant/getMenuList',
            lastPage: 'resturant/lastMenuPage',
            current: 'resturant/currentMenuPage',
        })
    },
    methods: {
        ...mapActions({
            fetch: 'resturant/menuFetch',
            nextPage: 'resturant/nextMenuPage',
            prevPage: 'resturant/prevMenuPage',
            goto: 'resturant/menuGotoPage',
            search: 'resturant/menuSearch',
        })
    }
})
export default class MenuList extends Vue {
    private isLoading: boolean = false
    private showForm: boolean = false

    private menuList!: Array<iMenu>
    private fetch!: () => Promise<boolean>

    private current!: number
    private lastPage!: number
    private nextPage!: () => Promise<boolean>
    private prevPage!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>

    private search!: (searchText: string) => Promise<boolean>
    private searchText: string = ''

    constructor(props: any) {
        super(props)
    }

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
        return <div class="desk__list">
            <h3>Menus</h3>
            <div class="flex items-center space-x-2">
                <input type="search" placeholder="Search Menus" v-model={this.searchText} class="bg-gray-700 appearance-none relative block w-56 px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm ml-auto" />
                <button type="button" class="w-40 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700" onClick={this.toggleCreateForm}>
                    <svg xmlns="http://www.w3.org/2000/svg" class={{ "h-6 w-6 relative": true, 'transform rotate-90 ': this.showForm }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Create</span>
                </button>
            </div>
            {!this.isLoading ? [<div class="md:space-y-1 pt-3">
                <div class="md:space-y-1">
                    {this.menuList.map((menu: iMenu, index: number) => (<MenuCard menu={menu} key={menu.id} style={{ '--transition-delay': index * 0.3 + 's' }} />))}
                </div>
            </div>,
            <Paginate current={this.current} total={this.lastPage} onNext={() => this.nextPage()} onPrev={() => this.prevPage()} onGoto={(pageno: number) => this.goto(pageno)} />] : <div>locading...</div>}
            <Modal v-model={this.showForm}>
                <MenuCreate onClose={() => { this.showForm = false }} />
            </Modal>
        </div>
    }

    toggleCreateForm(event: MouseEvent): void {
        event.preventDefault()
        this.showForm = !this.showForm
    }
}