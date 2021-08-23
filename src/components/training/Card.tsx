import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import moment from 'moment'

import { iTraining } from '@/interfaces/app'
import { formatDate } from '@/plugin/filter'

import Modal from '@/components/common/Modal'
import Tab from '@/components/common/tab/Index'
import TabItem from '@/components/common/tab/Item'

import TrainingCreate from '@/components/training/Create'
import EnrolledList from '@/components/training/EnrolledList'

@Component
export default class TrainingCard extends Vue {
    private showModal: boolean = false
    private isDeleting: boolean = false

    @Prop({ required: true }) training!: iTraining

    constructor(prop: any) {
        super(prop)
    }

    get hasExpired(): boolean {
        return moment(this.training.start_date).local().isBefore(moment())
    }

    render(): VNode {
        return (<div>
            <div class="bg-gray-900 rounded-lg flex justify-between p-3 text-gray-200">
                <div class="flex-grow">
                    <strong class="text-2xl font-medium capitalize">
                        {this.training.title}
                        {this.hasExpired
                            ? <span class="text-red-500 text-sm font-normal ml-3">expired</span>
                            : null}
                    </strong>
                    <div class="html-content" domPropsInnerHTML={this.training.excerpt} />
                    <time datetime={this.training.start_date} class="block not-italic text-gray-500 text-sm">Added {formatDate(this.training.start_date)}</time>
                </div>
                <div class="pl-3 text-right">
                    <div class="action text-sm space-x-3 mb-3">
                        <a href="#" class="text-purple-400 hover:text-gray-400 transition" onClick={this.toggleModal}>view</a>
                        <a href="#" class="text-red-400 hover:text-gray-400 transition" onClick={this.toggleDelete}>delete</a>
                    </div>
                    <em class="not-italic text-xl font-medium block leading-none">Rs. {this.training.price}</em>
                    {/* <span class="text-sm text-gray-400 leading-none">for {this.training.machinery}</span> */}
                </div>
                {this.isDeleting ? (<div class="bg-black bg-opacity-30 w-40 flex flex-col p-4 items-center space-y-2 ml-3 rounded-md">
                    <a href="#" class="text-yellow-400 hover:text-gray-400 transition" onClick={this.deleteProperty}>confirm</a>
                    <a href="#" class="text-green-400 hover:text-gray-400 transition" onClick={this.toggleDelete}>cancel</a>
                </div>) : null}
            </div>
            <Modal v-model={this.showModal}>
                <Tab>
                    <TabItem title="Training Detail">
                        <TrainingCreate detail={this.training} onClose={() => { this.showModal = false }} />
                    </TabItem>
                    <TabItem title="Enrolled">
                        <EnrolledList training={this.training} />
                    </TabItem>
                </Tab>
            </Modal>
        </div>)
    }

    toggleModal(event: MouseEvent | null): void {
        if (event)
            event.preventDefault()

        this.showModal = !this.showModal
    }

    toggleDelete(event: MouseEvent): void {
        event.preventDefault()

        this.isDeleting = !this.isDeleting
    }

    deleteProperty(event: MouseEvent): void {
        event.preventDefault()

        this.$store.dispatch('training/destory', this.training.id)
    }
}
