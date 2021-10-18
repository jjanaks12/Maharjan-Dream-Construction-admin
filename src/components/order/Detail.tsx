import moment from 'moment'
import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iMaterial } from '@/interfaces/material'
import { initOrder, iOrder } from '@/interfaces/order'

import MaterialCard from '../material/Card'
import User from '@/components/common/User'
import { mapActions } from 'vuex'

@Component({
    methods: {
        ...mapActions({
            getOrder: 'order/get'
        })
    }
})
export default class OrderDetail extends Vue {
    private order: iOrder = initOrder
    private getOrder!: (id: string) => Promise<iOrder>

    @Prop({ required: true }) orderId!: string

    async mounted() {
        this.order = await this.getOrder(this.orderId)
    }

    constructor(props: any) {
        super(props)
    }

    render(): VNode {
        return <div class="px-4 py-5 bg-gray-900 space-y-6 sm:p-6 text-gray-700 rounded-md overflow-hidden">
            <dl>
                <dt>Order Date</dt>
                <dd>{moment(this.order.ordered_at).format('Do [of] MMM, YYYY [at] hh:mm a')}</dd>
                <dt>Delivery Date</dt>
                <dd>
                    {
                        this.order.delivery_date ?
                            moment(this.order.delivery_date).format('Do [of] MMM, YYYY')
                            : <span class="bg-yellow-400 text-black px-2 py-1 text-xs rounded-md uppercase font-bold inline-block align-top mt-1">has't set yet</span>
                    }
                </dd>
                <dt>User</dt>
                <dd class="pl-4">
                    <User user={this.order.user} />
                </dd>
                <dt>Delivey Address</dt>
                <dd><address>{this.order.delivery_address}</address></dd>
            </dl>
            <div>
                <strong>Material</strong>
                {this.order.material.map((material: iMaterial) => <MaterialCard material={material} />)}
            </div>
            <div class="pt-4 border-t border-dashed border-gray-500 text-right">
                <dl>
                    <dt>Delivery Charge</dt>
                    <dd><span>{this.order.delivery_charge}</span></dd>
                    <dt>Total</dt>
                    <dd><span>{this.order.total}</span></dd>
                </dl>
            </div>
        </div>
    }
}