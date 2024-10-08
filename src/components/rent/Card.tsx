import { VNode } from 'vue'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import { iRent } from '@/interfaces/app'
import { formatDate } from '@/plugin/filter'
import { AvailabilityType } from '@/interfaces/availability'

import Modal from '@/components/common/Modal'
import RentCreate from '@/components/rent/Create'
import Tab from '@/components/common/tab/Index'
import TabItem from '@/components/common/tab/Item'
import Appointment from '@/components/dashboard/Appointment'

@Component
export default class RentCard extends Vue {
    private showModal: boolean = false
    private isDeleting: boolean = false

    @Prop({ required: true }) rent!: iRent

    constructor(prop: any) {
        super(prop)
    }

    @Watch('showModal')
    showModalChanged() {
        if (!this.showModal) {

            this.$router.push({
                name: this.$route.name as string
            })
        }
    }

    mounted() {
        if (this.rent.id && this.rent.id.toString() === this.$route.params.id)
            this.showModal = true
    }

    render(): VNode {
        return (<div>
            <div class="bg-gray-900 rounded-lg flex justify-between p-3 text-gray-200">
                <div class="flex-grow">
                    <strong class="text-2xl font-medium capitalize">{this.rent.name}</strong>
                    <div class="html-content" domPropsInnerHTML={this.rent.excerpt} />
                    {this.rent.created_at ? <time datetime={this.rent.created_at} class="block not-italic text-gray-500 text-sm">Added {formatDate(this.rent.created_at)}</time> : null}
                </div>
                <div class="pl-3 text-right">
                    <div class="action text-sm space-x-3 mb-3">
                        <a href="#" class="text-purple-400 hover:text-gray-400 transition" onClick={this.toggleModal}>view</a>
                        <a href="#" class="text-red-400 hover:text-gray-400 transition" onClick={this.toggleDelete}>delete</a>
                    </div>
                    <em class="not-italic text-xl font-medium block leading-none">Rs. {this.rent.price}</em>
                    <span class="text-sm text-gray-400 leading-none">for {this.rent.machinery}</span>
                </div>
                {this.isDeleting ? (<div class="bg-black bg-opacity-30 w-40 flex flex-col p-4 items-center space-y-2 ml-3 rounded-md">
                    <a href="#" class="text-yellow-400 hover:text-gray-400 transition" onClick={this.deleteProperty}>confirm</a>
                    <a href="#" class="text-green-400 hover:text-gray-400 transition" onClick={this.toggleDelete}>cancel</a>
                </div>) : null}
            </div>
            <Modal v-model={this.showModal}>
                <Tab>
                    <TabItem title="Rent Detail">
                        <RentCreate detail={this.rent} onClose={() => { this.showModal = false }} />
                    </TabItem>
                    <TabItem title="Appointments">
                        <Appointment type={AvailabilityType.RENT} rent-id={this.rent.id} />
                    </TabItem>
                </Tab>
            </Modal>
        </div>)
    }

    toggleModal(event: MouseEvent | null): void {
        if (event)
            event.preventDefault()

        this.$router.push({
            name: this.$route.name as string,
            params: {
                id: this.rent.id ? this.rent.id.toString() : ''
            }
        })
        this.showModal = !this.showModal
    }

    toggleDelete(event: MouseEvent): void {
        event.preventDefault()

        this.isDeleting = !this.isDeleting
    }

    deleteProperty(event: MouseEvent): void {
        event.preventDefault()

        this.$store.dispatch('rent/destory', this.rent.id)
    }
}
