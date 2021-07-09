import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iMaterial } from '@/interfaces/app'
import Modal from '@/components/common/Modal'
import MaterialCreate from '@/components/material/Create'

@Component
export default class MaterialCard extends Vue {
    private showModal: boolean = false
    private isDeleting: boolean = false
    @Prop({ required: true }) material!: iMaterial

    constructor(prop: any) {
        super(prop)
    }

    render(): VNode {
        return (<div>
            <div class="bg-gray-900 rounded-lg flex justify-between p-3 text-gray-200">
                <div class="flex-grow">
                    <strong class="text-2xl font-medium capitalize">{this.material.name}</strong>
                    <div class="html-content" domPropsInnerHTML={this.material.excerpt} />
                    <span class="block not-italic text-gray-500 text-sm">in stock: {this.material.quantity}</span>
                    {/* <time datetime={this.material.created_at} class="block not-italic text-gray-500 text-sm">Added on {this.material.created_at}</time> */}
                </div>
                <div class="pl-3 text-right">
                    <div class="action text-sm space-x-3 mb-3">
                        <a href="#" class="text-purple-400 hover:text-gray-400 transition" onClick={this.toggleModal}>view</a>
                        <a href="#" class="text-red-400 hover:text-gray-400 transition" onClick={this.toggleDelete}>delete</a>
                    </div>
                    <em class="not-italic text-xl font-medium block leading-none">Rs. {this.material.price}</em>
                    <span class="text-sm text-gray-400 leading-none">{this.material.measurement_unit}</span>
                </div>
                {this.isDeleting ? (<div class="bg-black bg-opacity-30 w-40 flex flex-col p-4 items-center space-y-2 ml-3 rounded-md">
                    <a href="#" class="text-yellow-400 hover:text-gray-400 transition" onClick={this.deleteMaterial}>confirm</a>
                    <a href="#" class="text-green-400 hover:text-gray-400 transition" onClick={this.toggleDelete}>cancel</a>
                </div>) : null}
            </div>
            <Modal v-model={this.showModal}>
                <MaterialCreate detail={this.material} onClose={() => { this.showModal = false }} />
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

    deleteMaterial(event: MouseEvent): void {
        event.preventDefault()

        this.$store.dispatch('material/destory', this.material.id)
    }
}
