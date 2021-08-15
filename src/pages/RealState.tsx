import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import { iRealState } from '@/interfaces/app'
import { iErrorMessage } from '@/interfaces/auth'
import PropertyCreate from '@/components/property/Create'
import PropertyCard from '@/components/property/Card'
import Modal from '@/components/common/Modal'
import PropertyLoading from '@/components/property/Loading'
import Paginate from '@/components/common/Paginate'

let timer: any = null

@Component({
    computed: {
        ...mapGetters({
            propertyList: 'realstate/getPropertyList',
            lastPage: 'realstate/lastPage',
            current: 'realstate/currentPage',
        })
    },
    methods: {
        ...mapActions({
            fetchProperty: 'realstate/fetch',
            nextPage: 'realstate/nextPage',
            prevPage: 'realstate/prevPage',
            goto: 'realstate/gotoPage',
            search: 'realstate/search',
        })
    }
})
export default class Realstate extends Vue {
    private isLoading: boolean = false
    private propertyList!: Array<iRealState>
    private showForm: boolean = false
    private fetchProperty!: () => Promise<boolean | iErrorMessage>
    private current!: number
    private lastPage!: number
    private prevPage!: () => Promise<boolean>
    private nextPage!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>

    private search!: (searchText: string) => Promise<boolean>

    private searchText: string = ''

    mounted() {
        this.isLoading = true

        this.fetchProperty()
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
        return (<div class="py-8">
            <div class="container mx-auto px-2">
                <header class="text-gray-500 flex justify-between items-center mb-10">
                    <h2 class="text-3xl font-bold capitalize sm:truncate">Property List</h2>
                    <div class="flex items-center space-x-2">
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
                    {!this.isLoading ? [<div class="md:space-y-1">
                        {this.propertyList.map((property: iRealState, index: number) => (<PropertyCard property={property} key={property.id} style={{ '--transition-delay': index * 0.3 + 's' }} />))}
                    </div>,
                    <Paginate current={this.current} total={this.lastPage} onNext={() => this.nextPage()} onPrev={() => this.prevPage()} onGoto={(pageno: number) => this.goto(pageno)} />] : <PropertyLoading />}
                </div>
                <Modal v-model={this.showForm}>
                    <PropertyCreate onClose={() => { this.showForm = false }} />
                </Modal>

            </div>
        </div>)
    }

    toggleCreateForm(event: MouseEvent): void {
        event.preventDefault()
        this.showForm = !this.showForm
    }
}
