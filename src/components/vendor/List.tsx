import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import { iVendor } from '@/interfaces/vendor'

import Paginate from '@/components/common/Paginate'
import VendorCard from '@/components/vendor/Card'
import Modal from '../common/Modal'
import VendorForm from './Form'

let timer: any = null

@Component({
    computed: {
        ...mapGetters({
            list: 'vendor/vendorList',
            lastPage: 'vendor/lastPage',
            current: 'vendor/currentPage',
        })
    },
    methods: {
        ...mapActions({
            fetch: 'vendor/fetch',
            nextPage: 'vendor/nextPage',
            prevPage: 'vendor/prevPage',
            goto: 'vendor/gotoPage',
            search: 'vendor/search',
        })
    }
})
export default class VendorList extends Vue {
    private isLoading: boolean = false
    private showVendorForm: boolean = false

    private list!: Array<iVendor>
    private fetch!: () => Promise<boolean>

    private current!: number
    private lastPage!: number
    private nextPage!: () => Promise<boolean>
    private prevPage!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>

    private search!: (searchText: string) => Promise<boolean>
    private searchText: string = ''

    mounted() {
        this.getVendor()
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
        return <div>
            <div class="flex justify-end items-center space-x-2">
                <button type="button" onClick={(event: MouseEvent) => {
                    event.preventDefault()
                    this.getVendor()
                }} class="whitespace-nowrap">
                    <svg xmlns="http://www.w3.org/2000/svg" class={{ "h-4 w-4 inline-block align-middle mr-1": true, 'animate-spin': this.isLoading }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    refresh
                </button>
                <button type="button" class="min-w-40 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition" onClick={(event: MouseEvent) => {
                    event.preventDefault()
                    this.showVendorForm = !this.showVendorForm
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" class={{ "h-6 w-6 relative": true, 'transform rotate-90 ': this.showVendorForm }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Create Vendor</span>
                </button>
                <input type="search" placeholder="Search Vendors" v-model={this.searchText} class="bg-gray-700 appearance-none relative block w-56 px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm" />
            </div>
            <div class="md:space-y-1 pt-3">
                <div class="md:space-y-1">
                    {this.list.map((material: iVendor, index: number) => (<VendorCard vendor={material} key={material.id} style={{ '--transition-delay': index * 0.3 + 's' }} />))}
                </div>
            </div>
            <Paginate current={this.current} total={this.lastPage} onNext={() => this.nextPage()} onPrev={() => this.prevPage()} onGoto={(pageno: number) => this.goto(pageno)} />
            <Modal v-model={this.showVendorForm}>
                <VendorForm onClose={() => { this.showVendorForm = false }} />
            </Modal>
        </div>
    }

    getVendor() {
        this.isLoading = true

        this.fetch()
            .finally(() => {
                this.isLoading = false
            })
    }
}