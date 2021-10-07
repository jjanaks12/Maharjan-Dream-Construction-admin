import { VNode } from "vue"
import { Component, Prop, Vue } from "vue-property-decorator"
import { mapActions, mapGetters } from "vuex"

import { iOrder } from "@/interfaces/order"
import OrderItem from "./OrderItem"

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
    private list!: Array<iOrder>
    private fetch!: (payload: { realstate_id: string | null, rent_id: string | null, type: string }) => Promise<boolean>

    mounted() {
        this.fetch({
            realstate_id: this.realstateId,
            rent_id: this.rentId,
            type: this.type
        })

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
                <h3 class="text-xl font-bold text-gray-500 capitalize sm:truncate mb-2">Orders</h3>
                {this.list.map((order: iOrder, index: number) => <OrderItem class={{
                    "pb-3 mb-4 border-b border-gray-700": index !== this.list.length - 1
                }} order={order} />)}
            </div>
            : <span>No orders yet</span>
    }
}