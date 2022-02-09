import { VNode } from "vue"
import { Component, Prop, Vue } from "vue-property-decorator"
import moment from "moment"

import { iEvent } from "@/interfaces/event"
import EventCreate from "./Create"
import Modal from "../common/Modal"
import { formatDate } from "@/plugin/filter"
import CopyLink from "../common/CopyLink"

const today = moment()

@Component
export default class EventCard extends Vue {
    private showModal: boolean = false
    private isDeleting: boolean = false

    @Prop({ required: true }) event!: iEvent

    constructor(props: any) {
        super(props)
    }

    render(): VNode {
        return <div>
            <div class="bg-gray-900 rounded-lg flex justify-between p-3 text-gray-200">
                <div class="flex-grow">
                    <strong class="text-2xl font-medium capitalize">{this.event.name}</strong>
                    <span class="block not-italic text-gray-500 text-sm">Start{moment(this.event.start).isAfter(today) ? 'ed' : 's on'}: <strong>{formatDate(this.event.start)}</strong> and ends on <strong>{formatDate(this.event.end)}</strong></span>
                </div>
                <div class="pl-3 text-right flex-grow-0">
                    <div class="action text-sm space-x-3 mb-3">
                        <CopyLink link={`/event/${this.event.slug}`} />
                        <a href="#" class="text-purple-400 hover:text-gray-400 transition" onClick={this.toggleModal}>view</a>
                        <a href="#" class="text-red-400 hover:text-gray-400 transition" onClick={this.toggleDelete}>delete</a>
                    </div>
                </div>
                {this.isDeleting ? (<div class="bg-black bg-opacity-30 w-40 flex flex-col p-4 items-center space-y-2 ml-3 rounded-md">
                    <a href="#" class="text-yellow-400 hover:text-gray-400 transition" onClick={this.deleteEvent}>confirm</a>
                    <a href="#" class="text-green-400 hover:text-gray-400 transition" onClick={this.toggleDelete}>cancel</a>
                </div>) : null}
            </div>
            <Modal v-model={this.showModal}>
                <EventCreate detail={this.event} onClose={() => { this.showModal = false }} />
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

    deleteEvent(event: MouseEvent): void {
        event.preventDefault()

        this.$store.dispatch('event/destory', this.event.id)
    }
}