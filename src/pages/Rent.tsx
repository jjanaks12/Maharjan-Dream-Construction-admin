import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import { iRent } from '@/interfaces/app'
import RentCard from '@/components/rent/Card'
import Modal from '@/components/common/Modal'
import RentCreate from '@/components/rent/Create'
import Paginate from '@/components/common/Paginate'
import RentLoading from '@/components/rent/Loading'

@Component({
    computed: {
        ...mapGetters({
            rentList: 'rent/getRentList',
            currentPage: 'rent/currentPage',
            lastPage: 'rent/lastPage'
        })
    },
    methods: {
        ...mapActions({
            prevPage: 'rent/prevPage',
            nextPage: 'rent/nextPage',
            gotoPage: 'rent/gotoPage'
        })
    }
})
export default class Rent extends Vue {
    private rentList!: Array<iRent>
    private showForm: boolean = false
    private isLoading: boolean = false

    private currentPage!: number
    private lastPage!: number
    private nextPage!: () => Promise<boolean>
    private prevPage!: () => Promise<boolean>
    private gotoPage!: (pageno: number) => Promise<boolean>

    mounted() {
        this.isLoading = true
        this.$store.dispatch('rent/fetch')
            .finally(() => {
                this.isLoading = false
            })
    }

    /**
     * Template pf the component
     * 
     * @returns VNode
     */
    render(): VNode {
        return (<div class="py-8">
            <div class="container mx-auto px-2">
                <header class="text-gray-500 flex justify-between items-center mb-10">
                    <h2 class="text-3xl font-bold text-gray-500 capitalize sm:truncate">Rent List</h2>
                    <button type="button" class="w-40 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700" onClick={this.toggleCreateForm}>
                        <svg xmlns="http://www.w3.org/2000/svg" class={{ "h-6 w-6 relative": true, 'transform rotate-90 ': this.showForm }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Create</span>
                    </button>
                </header>
                <div class="md:space-y-1">
                    {!this.isLoading ? [<div class="md:space-y-1">
                        {this.rentList.map((rent: iRent, index: number) => (<RentCard rent={rent} key={rent.id} style={{ '--transition-delay': index * 0.3 + 's' }} />))}
                    </div>,
                    <Paginate current={this.currentPage} total={this.lastPage} onNext={() => this.nextPage()} onPrev={() => this.prevPage()} onGoto={(pageno: number) => this.gotoPage(pageno)} />
                    ] : <RentLoading />}
                </div>
            </div>
            <Modal v-model={this.showForm}>
                <RentCreate onClose={() => { this.showForm = false }} />
            </Modal>
        </div>)
    }

    toggleCreateForm(event: MouseEvent): void {
        event.preventDefault()
        this.showForm = !this.showForm
    }
}
