import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import { iPage } from '@/interfaces/page'
import Modal from '@/components/common/Modal'
import PageCreate from '@/components/pages/Create'
import Paginate from '@/components/common/Paginate'
import PageLoading from '@/components/pages/Loading'
import PageCard from '@/components/pages/Card'

let timer: any = null

@Component({
    computed: {
        ...mapGetters({
            pageList: 'page/list',
            currentPage: 'page/currentPage',
            lastPage: 'page/lastPage'
        })
    },
    methods: {
        ...mapActions({
            prevPage: 'page/prevPage',
            nextPage: 'page/nextPage',
            search: 'page/search',
            gotoPage: 'page/gotoPage'
        })
    }
})
export default class Page extends Vue {
    private isLoading: boolean = false
    private showForm: boolean = false

    private currentPage!: number
    private lastPage!: number
    private nextPage!: () => Promise<boolean>
    private prevPage!: () => Promise<boolean>
    private gotoPage!: (pageno: number) => Promise<boolean>
    private pageList!: Array<iPage>

    private search!: (searchText: string) => Promise<boolean>
    private searchText: string = ''

    constructor(props: any) {
        super(props)
    }

    mounted() {
        this.fetchRecord()
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
        return <div class="py-8">
            <div class="container mx-auto px-2">
                <header class="text-gray-500 flex justify-between items-center mb-10">
                    <h2 class="text-3xl font-bold text-gray-500 capitalize sm:truncate">Page List</h2>
                    <div class="flex items-center space-x-2">
                        {this.refreshBTN()}
                        <input type="search" placeholder="Search text" v-model={this.searchText} class="bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm" />
                        <button type="button" class="w-40 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700" onClick={this.toggleCreateForm}>
                            <svg xmlns="http://www.w3.org/2000/svg" class={{ "h-6 w-6 relative": true, 'transform rotate-90 ': this.showForm }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>Create</span>
                        </button>
                    </div>
                </header>
                <div class="md:space-y-1">
                    {!this.isLoading
                        ? [
                            <div class="md:space-y-1">
                                {this.pageList.map((page: iPage, index: number) => (<PageCard page={page} key={page.id} style={{ '--transition-delay': index * 0.3 + 's' }} />))}
                            </div>,
                            <Paginate current={this.currentPage} total={this.lastPage} onNext={() => this.nextPage()} onPrev={() => this.prevPage()} onGoto={(pageno: number) => this.gotoPage(pageno)} />
                        ]
                        : <PageLoading />}
                </div>
            </div>
            <Modal v-model={this.showForm}>
                <PageCreate onClose={() => { this.showForm = false }} />
            </Modal>
        </div>
    }

    refreshBTN(): VNode {
        return <a href="#" class="text-yellow-500 text-sm hover:text-gray-500 transition-colors whitespace-nowrap" onClick={(event: MouseEvent) => {
            event.preventDefault()

            this.fetchRecord()
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" class={{ "h-4 w-4 inline-block align-middle mr-1": true, "animate-spin": this.isLoading }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            refresh
        </a>
    }

    async fetchRecord() {
        this.isLoading = true

        this.$store.dispatch('page/fetch')
            .finally(() => {
                this.isLoading = false
            })
    }

    toggleCreateForm(event: MouseEvent): void {
        event.preventDefault()
        this.showForm = !this.showForm
    }
}