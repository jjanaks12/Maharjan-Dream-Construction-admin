import { VNode } from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { validate } from 'vee-validate'
import { mapActions } from "vuex"
import moment from 'moment'

import FormComponent from "@/core/FormComponent"
import { RequestQuery } from "@/interfaces/app"
import { iOrderForm, PaymentStatus, OrderStatus } from "@/interfaces/order"

const today = moment().format('YYYY-MM-DD')

@Component({
    methods: {
        ...mapActions({
            'fetch': 'order/fetch'
        })
    }
})
export default class OrderFilter extends FormComponent {
    private formData: iOrderForm = { startDate: moment().startOf('months').format('YYYY-MM-DD') }
    private isLoading: boolean = false

    private fetch!: (query: RequestQuery) => Promise<boolean>

    constructor(props: any) {
        super(props)

        this.errors = {
            startDate: [],
            endDate: [],
            status: [],
            payment_status: [],
        }
    }

    @Prop({ required: true }) value!: iOrderForm

    mounted() {
        this.formData = this.value
    }

    @Watch('value')
    onValueChanged(): void {
        this.formData = this.value
    }

    get maxDate(): string {
        return today
    }

    render(): VNode {
        return <div class="bg-gray-900 p-2 text-gray-700 rounded-md overflow-hidden mt-4">
            <form method="POST" class="flex flex-wrap -mx-2" onSubmit={this.formSubmitted}>
                <div class="w-1/4 px-2">
                    <label for="of_start_date" class="block text-sm font-medium">Delivery Date</label>
                    <input type="date" name="start_date" id="of_start_date" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.startDate.length > 0 }} v-model={this.formData.startDate} max={this.maxDate} />
                </div>
                <div class="w-1/4 px-2">
                    <label for="of_end_date" class="block text-sm font-medium">Delivery Date</label>
                    <input type="date" name="end_date" id="of_end_date" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.endDate.length > 0 }} v-model={this.formData.endDate} min={this.formData.startDate} />
                </div>
                <div class="w-1/4 px-2">
                    <label for="of_order_status" class="block text-sm font-medium">Order Status</label>
                    <select type="date" name="end_date" id="of_order_status" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.status.length > 0 }} v-model={this.formData.status}>
                        <option value=""></option>
                        <option value={OrderStatus.PENDING}>Pending</option>
                        <option value={OrderStatus.PROCESSING}>Processing</option>
                        <option value={OrderStatus.CANCELLED}>Cancelled</option>
                        <option value={OrderStatus.SHIPPED}>Shipped</option>
                        <option value={OrderStatus.COMPLETED}>Completed</option>
                    </select>
                </div>
                <div class="w-1/4 px-2">
                    <label for="of_payment_status" class="block text-sm font-medium">Payment Status</label>
                    <select type="date" name="end_date" id="of_payment_status" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.payment_status.length > 0 }} v-model={this.formData.payment_status}>
                        <option value=""></option>
                        <option value={PaymentStatus.PAID}>Paid</option>
                        <option value={PaymentStatus.UNPAID}>Unpaid</option>
                    </select>
                </div>
                <div class="flex-grow bg-gray-900 border-t border-gray-800 text-right mt-2 pt-2 px-2">
                    <button type="submit" class="min-w-40 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block align-middle mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            {this.isLoading
                                ? <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                : <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            }
                        </svg>
                        Apply Filter
                    </button>
                </div>
            </form>
        </div>
    }

    async formSubmitted(event: HTMLFormElement): Promise<void> {
        event.preventDefault()
        this.resetErrorMessage()

        await validate(this.formData.startDate, 'required', { name: 'startDate' })
            .then(result => {
                this.errors['startDate'] = result.errors
            })

        this.$nextTick(() => {
            if (!this.hasError) {
                this.isLoading = true

                this.fetch({
                    params: this.formData
                })
                    .finally(() => {
                        this.isLoading = false
                        this.$emit('close')
                        this.$emit('input', this.formData)
                    })
            }
        })
    }
}