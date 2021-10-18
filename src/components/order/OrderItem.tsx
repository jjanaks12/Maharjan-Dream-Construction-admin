import moment from 'moment'
import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iOrder, OrderStatus, PaymentStatus } from '@/interfaces/order'
import Dropdown from '@/components/common/Dropdown'
import { mapActions } from 'vuex'
import Modal from '../common/Modal'
import OrderForm from './Form'
import OrderDetail from './Detail'

@Component({
    methods: {
        ...mapActions({
            updateOrderStatus: 'order/updateOrderStatus',
            updatePaymentStatus: 'order/updatePaymentStatus'
        })
    }
})
export default class OrderItem extends Vue {
    private modalStatus: boolean = false
    private showDetail: boolean = false

    private updateOrderStatus!: (payload: { order_status: OrderStatus, order_id: string }) => Promise<boolean>
    private updatePaymentStatus!: (payload: { payment_status: PaymentStatus, order_id: string }) => Promise<boolean>

    @Prop({ required: true }) order!: iOrder

    constructor(prop: any) {
        super(prop)
    }

    mounted() {
        if (this.$route.query.order === this.order.id)
            this.showDetail = true
    }

    get isOrderDisabled(): boolean {
        return !([OrderStatus.PENDING, OrderStatus.PROCESSING].includes(this.order.order_status))
    }

    get isPaymentDisabled(): boolean {
        return this.isOrderDisabled || PaymentStatus.PAID == this.order.payment_status
    }

    render(): VNode {
        return <div class="flex items-start text-sm">
            <div class="flex-grow">
                <em class="not-italic">{moment(this.order.ordered_at).format('Do [of] MMM, YYYY [at] hh:mm a')}</em>
                <strong class="block"><span class="font-normal">Order by</span> {this.order.user?.name}</strong>
                {this.order.delivery_date ? <span class="text-xs">Will be delivered in {moment(this.order.delivery_date).format('Do [of] MMM, YYYY')}</span> : null}
            </div>
            <div class="flex items-center space-x-2">
                <span class="text-xs">Order status</span>
                <Dropdown disabled={this.isOrderDisabled} opener={(): VNode => <span class={{
                    'text-blue-500': this.order.order_status === OrderStatus.PENDING,
                    'text-green-500': this.order.order_status === OrderStatus.SHIPPED,
                    'text-yellow-500': this.order.order_status === OrderStatus.PROCESSING,
                    'text-red-500': this.order.order_status === OrderStatus.CANCELLED,
                    'text-purple-500': this.order.order_status === OrderStatus.COMPLETED,
                    "font-semibold": true
                }}>&bull; {this.order.order_status}</span>}>
                    <ul class="text-xs text-right">
                        {Object.values(OrderStatus).map(status => <li><a href="#" class={{
                            'text-blue-500': status === OrderStatus.PENDING,
                            'text-green-500': status === OrderStatus.SHIPPED,
                            'text-yellow-500': status === OrderStatus.PROCESSING,
                            'text-red-500': status === OrderStatus.CANCELLED,
                            'text-purple-500': status === OrderStatus.COMPLETED,
                            "text-white p-1 block": true
                        }} onClick={(event: MouseEvent) => {
                            event.preventDefault()

                            if (status === OrderStatus.PROCESSING)
                                this.modalStatus = true
                            else
                                this.updateOrderStatus({
                                    order_id: this.order.id || '',
                                    order_status: status
                                })
                        }}>&bull; {status}</a></li>)}
                    </ul>
                </Dropdown>
                <span class="text-xs">Payment status</span>
                <Dropdown disabled={this.isPaymentDisabled} opener={(): VNode => <span class={{
                    'text-green-500': this.order.payment_status === PaymentStatus.PAID,
                    'text-red-500': this.order.payment_status === PaymentStatus.UNPAID,
                    "font-semibold": true
                }}>&bull; {this.order.payment_status}</span>}>
                    <ul class="text-xs text-right">
                        {Object.values(PaymentStatus).map(status => <li><a href="#" class={{
                            'text-green-500': status === PaymentStatus.PAID,
                            'text-red-500': status === PaymentStatus.UNPAID,
                            "text-white p-1 block": true
                        }} onClick={(event: MouseEvent) => {
                            event.preventDefault()
                            this.updatePaymentStatus({
                                order_id: this.order.id || '',
                                payment_status: status
                            })
                        }}>&bull; {status}</a></li>)}
                    </ul>
                </Dropdown>
                <a href="#" class="text-purple-500 hover:text-gray-500 transition-colors" onClick={(event: MouseEvent) => {
                    event.preventDefault()
                    this.showDetail = true
                    this.$router.push({
                        name: 'dashboard',
                        query: {
                            order: this.order.id
                        }
                    })
                }}>view</a>
            </div>
            <Modal v-model={this.modalStatus}>
                <OrderForm order={this.order} onClose={() => this.modalStatus = false} />
            </Modal>
            <Modal v-model={this.showDetail} onInput={(status: boolean) => {
                if (!status) {
                    this.showDetail = false
                    this.$router.push({ name: 'dashboard' })
                }
            }}>
                <OrderDetail order-id={this.order.id} />
            </Modal>
        </div>
    }
}