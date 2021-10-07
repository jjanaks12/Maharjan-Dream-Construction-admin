import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import { iDelivery } from '@/interfaces/delivery'
import DeliveryItem from '../delivery/item'

@Component({
    computed: {
        ...mapGetters({
            list: 'delivery/list'
        })
    },
    methods: {
        ...mapActions({
            getDelivery: 'delivery/fetch'
        })
    }
})
export default class Delivery extends Vue {
    private isLoading: boolean = false
    private list!: Array<iDelivery>
    private getDelivery!: () => Promise<Array<iDelivery>>

    mounted() {
        this.getDelivery()
    }

    render(): VNode {
        return <div class="mt-10 sm:mt-0">
            <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="md:col-span-1">
                    <div class="px-4 sm:px-0">
                        <h3 class="text-lg font-medium leading-6">Delivery Charges</h3>
                        <p class="mt-1 text-sm text-gray-600">Delivery charges for each delivery type</p>
                    </div>
                </div>
                <div class="mt-5 md:mt-0 md:col-span-2">
                    <div class="shadow overflow-hidden sm:rounded-md px-4 py-5 bg-gray-600 text-gray-800">
                        {
                            !this.isLoading
                                ? this.list.map((delivery: iDelivery, index: number) => <DeliveryItem delivery={delivery} class={{ "pb-4 mb-4 border-b border-dashed border-gray-800": index < this.list.length - 1 }} />)
                                : null
                        }
                    </div>
                </div>
            </div>
        </div>
    }
}