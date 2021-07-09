import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import PropertyCreate from '@/components/property/Create'
import { iRealState } from '@/interfaces/app'
import PropertyCard from '@/components/property/Card'
import Modal from '@/components/common/Modal'

@Component({
    computed: {
        ...mapGetters({
            propertyList: 'realstate/getPropertyList'
        })
    }
})
export default class User extends Vue {
    private propertyList!: Array<iRealState>
    private showForm: boolean = false

    mounted() {
        this.$store.dispatch('realstate/fetchProperty')
    }

    render(): VNode {
        return (<div class="py-8">
            <div class="container mx-auto px-2">
                <header class="text-gray-500 flex justify-between items-center mb-10">
                    <h2 class="text-3xl font-bold capitalize sm:truncate">Property List</h2>
                    <button type="button" class="w-40 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700" onClick={this.toggleCreateForm}>
                        <svg xmlns="http://www.w3.org/2000/svg" class={{ "h-6 w-6 relative": true, 'transform rotate-90 ': this.showForm }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Create</span>
                    </button>
                </header>
                <div class="md:space-y-1">
                    <transition-group tag="div" name="fade-in" class="md:space-y-1">
                        {this.propertyList.map((property: iRealState, index: number) => (<PropertyCard property={property} key={property.id} style={{ '--transition-delay': index * 0.3 + 's' }} />))}
                    </transition-group>
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
