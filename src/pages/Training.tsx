import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import { iTraining } from '@/interfaces/training'
import Modal from '@/components/common/Modal'
import TrainingCreate from '@/components/training/Create'
import TrainingCard from '@/components/training/Card'
import Paginate from '@/components/common/Paginate'
import TrainingLoading from '@/components/training/Loading'

let timer: any = null

@Component({
    computed: {
        ...mapGetters({
            trainingList: 'training/getTrainingList',
            currentPage: 'training/currentPage',
            lastPage: 'training/lastPage'
        })
    },
    methods: {
        ...mapActions({
            prevPage: 'training/prevPage',
            nextPage: 'training/nextPage',
            search: 'training/search',
            gotoPage: 'training/gotoPage'
        })
    }
})
export default class Training extends Vue {
    private trainingList!: Array<iTraining>
    private showForm: boolean = false
    private isLoading: boolean = false

    private currentPage!: number
    private lastPage!: number
    private nextPage!: () => Promise<boolean>
    private prevPage!: () => Promise<boolean>
    private gotoPage!: (pageno: number) => Promise<boolean>

    private search!: (searchText: string) => Promise<boolean>
    private searchText: string = ''

    mounted() {
        this.isLoading = true
        this.$store.dispatch('training/fetch')
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

    /**
     * Template pf the component
     * 
     * @returns VNode
     */
    render(): VNode {
        return (<div class="py-8">
            <div class="container mx-auto px-2">
                <header class="text-gray-500 flex justify-between items-center mb-10">
                    <h2 class="text-3xl font-bold text-gray-500 capitalize sm:truncate">Training</h2>
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
                        {this.trainingList.map((training: iTraining, index: number) => (<TrainingCard training={training} key={training.id} style={{ '--transition-delay': index * 0.3 + 's' }} />))}
                    </div>,
                    <Paginate current={this.currentPage} total={this.lastPage} onNext={() => this.nextPage()} onPrev={() => this.prevPage()} onGoto={(pageno: number) => this.gotoPage(pageno)} />] : <TrainingLoading />}
                </div>
            </div>
            <Modal v-model={this.showForm}>
                <TrainingCreate onClose={() => { this.showForm = false }} />
            </Modal>
        </div>)
    }

    toggleCreateForm(event: MouseEvent): void {
        event.preventDefault()
        this.showForm = !this.showForm
    }
}
