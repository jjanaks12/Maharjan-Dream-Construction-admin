import { VNode } from "vue"
import { Component, Prop } from "vue-property-decorator"
import { validate } from "vee-validate"
import { mapActions } from "vuex"

import FormComponent from "@/core/FormComponent"
import { iOrder, OrderStatus } from "@/interfaces/order"

@Component({
    methods: {
        ...mapActions({
            save: 'order/updateOrderStatus',
        })
    }
})
export default class OrderForm extends FormComponent {
    private isSaving: boolean = false
    private formData: { order_status: OrderStatus, order_id: string, delivery_date: string | null } = {
        order_status: OrderStatus.PROCESSING,
        order_id: '',
        delivery_date: null
    }

    private save!: (formData: any) => Promise<boolean>

    @Prop({ required: true }) order!: iOrder

    constructor(props: any) {
        super(props)

        this.errors = {
            delivery_date: []
        }
    }

    mounted() {
        this.formData.order_id = this.order.id as string
    }

    render(): VNode {
        return <form method="POST" class="rounded-md overflow-hidden px-4 py-5 bg-gray-900 space-y-6 sm:p-6 text-gray-700" onSubmit={this.formSubmitted}>
            <div class="mb-6">
                <label for="delivery_date" class="block text-sm font-medium">Delivery Date</label>
                <input type="date" name="delivery_date" id="delivery_date" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.delivery_date.length > 0 }} v-model={this.formData.delivery_date} />
            </div>
            <div class="px-4 py-3 bg-gray-900 border-t border-gray-800 text-right sm:px-6">
                <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 outline-none" disabled={this.isSaving}>
                    {this.isSaving ? (<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 relative animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>) : null}
                    <span>Save</span>
                </button>
            </div>
        </form>
    }

    /**
     * For form submit handling
     * @param event 
     * @returns void
     */
    async formSubmitted(event: HTMLFormElement): Promise<void> {
        event.preventDefault()
        this.resetErrorMessage()

        await validate(this.formData.delivery_date, 'required', { name: 'delivery_date' })
            .then(result => {
                this.errors['delivery_date'] = result.errors
            })

        this.$nextTick(() => {
            if (!this.hasError) {
                this.isSaving = true

                this.save(this.formData)
                    .then(() => {
                        this.$emit('close')
                        this.resetErrorMessage()
                    })
                    .catch(() => { })
                    .finally(() => {
                        this.isSaving = false
                    })
            }
        })
    }
}