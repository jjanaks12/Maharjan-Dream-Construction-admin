import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iPage } from '@/interfaces/page'
import Modal from '../common/Modal'
import PageCreate from './Create'

@Component
export default class PageCard extends Vue {
    private showModal: boolean = false
    private isDeleting: boolean = false

    @Prop({ required: true }) page!: iPage

    constructor(props: any) {
        super(props)
    }

    render(): VNode {
        return <div>
        <div class="bg-gray-900 rounded-lg flex justify-between p-3 text-gray-200">
            <div class="flex-grow">
                <strong class="text-2xl font-medium capitalize">{this.page.title}</strong>
            </div>
            <div class="pl-3 text-right flex-grow-0">
                <div class="action text-sm space-x-3 mb-3">
                    <a href="#" class="text-purple-400 hover:text-gray-400 transition" onClick={this.toggleModal}>view</a>
                    <a href="#" class="text-red-400 hover:text-gray-400 transition" onClick={this.toggleDelete}>delete</a>
                </div>
            </div>
            {this.isDeleting ? (<div class="bg-black bg-opacity-30 w-40 flex flex-col p-4 items-center space-y-2 ml-3 rounded-md">
                <a href="#" class="text-yellow-400 hover:text-gray-400 transition" onClick={this.deletePage}>confirm</a>
                <a href="#" class="text-green-400 hover:text-gray-400 transition" onClick={this.toggleDelete}>cancel</a>
            </div>) : null}
        </div>
        <Modal v-model={this.showModal}>
            <PageCreate detail={this.page} onClose={() => { this.showModal = false }} />
        </Modal>
    </div>
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

    deletePage(event: MouseEvent): void {
        event.preventDefault()

        this.$store.dispatch('page/destory', this.page.id)
    }
}