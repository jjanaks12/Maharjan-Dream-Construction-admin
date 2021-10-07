import { Component, Prop, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'

import { iDelivery } from '@/interfaces/delivery'
import Modal from '../common/Modal'
import DeliveryItemForm from './Form'

@Component
export default class DeliveryItem extends Vue {
    private showModal: boolean = false
    @Prop({ required: true }) delivery!: iDelivery

    constructor(prop: any) {
        super(prop)
    }

    mounted() {
        if (this.$route.query.delivery == this.delivery.id)
            this.showModal = true
    }

    render(): VNode {
        return <div class="flex text-sm">
            <div class="flex-grow">
                <strong class="text-xl block">{this.delivery.name}</strong>
                {this.delivery.price > 0 ? <em class="not-italic">{this.delivery.price} for {this.delivery.weight} kg</em> : <span>Free of charge</span>}
            </div>
            <div class="flex-grow-0">
                <a href="#" class="text-yellow-400 hover:text-gray-400 transition-colors" onClick={(event: MouseEvent) => {
                    event.preventDefault()
                    this.$router.push({
                        name: 'setting',
                        query: {
                            delivery: this.delivery.id
                        }
                    })
                    this.showModal = true
                }}>Edit</a>
            </div>
            <Modal v-model={this.showModal} onInput={this.closeModal}>
                <DeliveryItemForm delivery={this.delivery} onClose={this.closeModal} />
            </Modal>
        </div>
    }

    closeModal(status: boolean) {
        if (!status) {
            this.showModal = false
            this.$router.push({ name: 'setting' })
        }
    }
}