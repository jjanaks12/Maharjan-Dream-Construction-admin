import moment from 'moment'
import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Printd } from 'printd'

import { iMaterial } from '@/interfaces/material'
import { initOrder, iOrder, OrderStatus } from '@/interfaces/order'

import MaterialCard from '../material/Card'
import User from '@/components/common/User'
import { mapActions } from 'vuex'
import { formatDate } from '@/plugin/filter'

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
        return <div class="px-4 py-5 bg-gray-900 space-y-6 sm:p-6 text-gray-700 rounded-md overflow-hidden relative">
            <a href="#" class="text-red-800 absolute top-4 right-4 hover:text-gray-500 transition-colors" onClick={this.downloadPDF}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-h-10 inline-block align-middle mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Download PDF
            </a>
            <div class="order--print sr-only" ref="PDFDownload" style="font-family: Arial, sans-serif;">
                <dl>
                    <dt>ID</dt>
                    <dd style="margin-left: 0; margin-bottom: 10px;">{this.order.id}</dd>
                    <dt>Order Status</dt>
                    <dd style="margin-left: 0; margin-bottom: 10px;"><strong style="text-transform: uppercase;">{this.order.order_status}</strong></dd>
                    <dt>Payment Status</dt>
                    <dd style="margin-left: 0; margin-bottom: 10px;"><strong style="text-transform: uppercase;">{this.order.payment_status}</strong></dd>
                    <dt>Ordered At</dt>
                    <dd style="margin-left: 0; margin-bottom: 10px;">{formatDate(this.order.ordered_at, process.env.VUE_APP_DATE_FORMAT)}</dd>
                    {this.order.user
                        ? [
                            <dt>Ordered By</dt>,
                            <dd style="margin-left: 0; margin-bottom: 10px;">{this.order.user.name}</dd>
                        ]
                        : null}
                    {this.order.order_status !== OrderStatus.CANCELLED
                        ? [
                            <dt>Delivery Detail</dt>,
                            <dd style="margin-left: 0; margin-bottom: 10px;">
                                <dl>
                                    <dt>Address</dt>
                                    <dd style="margin-left: 0; margin-bottom: 10px;">{this.order.delivery_address}</dd>
                                    <dt>Cost</dt>
                                    <dd style="margin-left: 0; margin-bottom: 10px;">Rs. {this.order.delivery_charge}</dd>
                                    {this.order.delivery_date
                                        ? [
                                            <dt>Date</dt>,
                                            <dd style="margin-left: 0; margin-bottom: 10px;">{formatDate(this.order.delivery_date)}</dd>
                                        ]
                                        : null}
                                </dl>
                            </dd>
                        ]
                        : null}
                    {this.order.material
                        ? [
                            <dt>Order Summary</dt>,
                            <dd style="margin-left: 0; margin-bottom: 10px;">
                                <table style="width: 100%; border: 1px solid #606060; border-spacing: 0;">
                                    <thead>
                                        <tr>
                                            <th style="text-align: left; padding: 0 5px; border-bottom: 1px solid #606060;">ID</th>
                                            <th style="text-align: left; padding: 0 5px; border-bottom: 1px solid #606060; border-left: 1px solid #606060;">Name</th>
                                            <th style="text-align: left; padding: 0 5px; border-bottom: 1px solid #606060; border-left: 1px solid #606060;">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.order.material.map((material: iMaterial) => <tr style="border-bottom: 1px solid #606060;">
                                            <td style="white-space: nowrap; padding: 0 5px; border-bottom: 1px solid #606060;"><span class="text-wrap">{material.id}</span></td>
                                            <td style="width: 40%; padding: 0 5px; border-bottom: 1px solid #606060; border-left: 1px solid #606060;">{material.name}</td>
                                            <td style="width: 70px; padding: 0 5px; border-bottom: 1px solid #606060; border-left: 1px solid #606060;">Rs. {material.price}</td>
                                        </tr>)}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th style="text-align: left; padding: 0 5px;" colspan="2">Total</th>
                                            <th style="text-align: left; padding: 0 5px; border-left: 1px solid #606060;">Rs. {this.order.total}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </dd>
                        ]
                        : null}
                </dl>
            </div>
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

    downloadPDF(event: MouseEvent) {
        event.preventDefault()

        const PDF = new Printd()

        if (this.$refs.PDFDownload) {
            PDF.print(this.$refs.PDFDownload as HTMLElement, [], [], ({ launchPrint }) => {
                launchPrint()
            })
        }
    }
}