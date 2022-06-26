import { VNode } from "vue"
import { Component, Prop, Vue } from "vue-property-decorator"
import { mapActions, mapGetters } from "vuex"
import moment from "moment"

import { iOrder, iOrderForm } from "@/interfaces/order"
import { RequestQuery } from "@/interfaces/app"
import { iMaterial } from "@/interfaces/material"
import { exportCSV } from "@/plugin/filter"

import OrderItem from "@/components/order/OrderItem"
import OrderFilter from "@/components/order/OrderFilter"

@Component({
    computed: {
        ...mapGetters({
            list: 'order/list'
        })
    },
    methods: {
        ...mapActions({
            fetch: 'order/fetch'
        })
    }
})
export default class Order extends Vue {
    private isLoading: boolean = false
    private showOrderFilter: boolean = false
    private filter: iOrderForm = {
        startDate: moment().startOf('months').format('YYYY-MM-DD')
    }

    private list!: Array<iOrder>
    private fetch!: (query: RequestQuery) => Promise<boolean>

    mounted() {
        this.fetchRecord()
        this.$forceUpdate()
    }

    constructor(props: any) {
        super(props)
    }

    @Prop({
        default: 'realstate',
        validator: (val: string) => ['realstate', 'rent'].includes(val)
    }) type!: string
    @Prop({ default: null }) realstateId!: string | null
    @Prop({ default: null }) rentId!: string | null

    render(): VNode {
        return <div class="py-8">
            <div class="container mx-auto px-2">
                <header class="mb-10">
                    <h2 class="text-3xl font-bold text-gray-500 capitalize sm:truncate">Order</h2>
                    <div class="flex items-center space-x-3 justify-end">
                        {this.refreshBTN()}
                        <span>&bull;</span>
                        {this.filterBTN()}
                        <span>&bull;</span>
                        {this.downloadBTN()}
                    </div>
                    <OrderFilter v-model={this.filter} onClose={() => { this.showOrderFilter = false }} />
                </header>
                {this.list.length > 0
                    ? this.list.map((order: iOrder, index: number) => <OrderItem class={{
                        "pb-3 mb-4 border-b border-gray-700": index !== this.list.length - 1
                    }} order={order} />)
                    : <span>No orders yet {this.refreshBTN()}</span>}
            </div>
        </div >
    }

    async fetchRecord() {
        this.isLoading = true

        await this.fetch({
            params: this.filter
        })

        this.isLoading = false
    }

    refreshBTN(): VNode {
        return <a href="#" class="text-yellow-500 text-sm hover:text-gray-500 transition-colors" onClick={(event: MouseEvent) => {
            event.preventDefault()

            this.fetchRecord()
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" class={{ "h-4 w-4 inline-block align-middle mr-1": true, "animate-spin": this.isLoading }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            refresh
        </a>
    }

    downloadBTN(): VNode {
        return <a href="#" class="text-green-500 text-sm hover:text-gray-500 transition-colors" onClick={(event: MouseEvent) => {
            event.preventDefault()

            exportCSV(this.list.map((order: iOrder) => ({
                id: order.id,
                materials: order.material.map((material: iMaterial) => ({
                    id: material.id,
                    name: material.name,
                    price: material.price
                })),
                address: order.delivery_address,
                delivery_charge: order.delivery_charge,
                total: order.total
            })), 'Order records from ' + Object.values(this.filter).join('-'))
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            download
        </a>
    }

    filterBTN(): VNode {
        return <a href="#" class="text-purple-500 text-sm hover:text-gray-500 transition-colors" onClick={(event: MouseEvent) => {
            event.preventDefault()

            this.showOrderFilter = true
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            filter
        </a>
    }
}