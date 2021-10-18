import { VNode } from "vue"
import { Component, Prop, Vue } from "vue-property-decorator"
import { mapActions, mapGetters } from "vuex"

import { iOrder } from "@/interfaces/order"
import OrderItem from "./OrderItem"
import Paginate from "../common/Paginate"

@Component({
    computed: {
        ...mapGetters({
            list: 'order/list',
            lastPage: 'order/lastPage',
            current: 'order/currentPage',
        })
    },
    methods: {
        ...mapActions({
            fetch: 'order/fetch',
            nextPage: 'order/nextPage',
            prevPage: 'order/prevPage',
            goto: 'order/gotoPage',
        })
    }
})
export default class Order extends Vue {
    private isLoading: boolean = false

    private list!: Array<iOrder>
    private fetch!: (payload: { realstate_id: string | null, rent_id: string | null, type: string }) => Promise<boolean>
    private current!: number
    private lastPage!: number
    private prevPage!: () => Promise<boolean>
    private nextPage!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>

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
        return this.list.length > 0
            ? <div>
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-bold text-gray-500 capitalize sm:truncate mb-2">Orders</h3>
                    {this.refreshBTN()}
                </div>
                {this.list.map((order: iOrder, index: number) => <OrderItem class={{
                    "pb-3 mb-4 border-b border-gray-700": index !== this.list.length - 1
                }} order={order} />)}
                <Paginate current={this.current} total={this.lastPage} onNext={() => this.nextPage()} onPrev={() => this.prevPage()} onGoto={(pageno: number) => this.goto(pageno)} />
            </div>
            : <span>No orders yet {this.refreshBTN()}</span>
    }

    async fetchRecord() {
        this.isLoading = true

        await this.fetch({
            realstate_id: this.realstateId,
            rent_id: this.rentId,
            type: this.type
        })

        this.isLoading = false
    }

    refreshBTN(): VNode {
        return <a href="#" class="text-yellow-500 text-sm hover:text-gray-500 transition-colors" onClick={(event: MouseEvent) => {
            event.preventDefault()

            this.fetchRecord()
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" class={{"h-4 w-4 inline-block align-middle mr-1": true, "animate-spin": this.isLoading}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            refresh
        </a>
    }
}