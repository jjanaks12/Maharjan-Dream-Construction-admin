import { VNode } from 'vue'
import { mapActions } from 'vuex'
import { Component, Prop } from 'vue-property-decorator'

import FormComponent from '@/core/FormComponent'
import { deliveryInit, iDelivery } from '@/interfaces/delivery'

@Component({
    methods: {
        ...mapActions({
            save: 'delivery/save'
        })
    }
})
export default class DeliveryItemForm extends FormComponent {
    private isSaving: boolean = false
    private formData: iDelivery = deliveryInit

    private save!: (FormData: iDelivery) => Promise<boolean>

    @Prop() delivery!: iDelivery

    constructor(prop: any) {
        super(prop)

        this.errors = {
            name: [],
            weight: [],
            price: [],
        }
    }

    mounted() {
        if (this.delivery) {
            this.formData = {
                id: this.delivery.id,
                name: this.delivery.name,
                weight: this.delivery.weight,
                price: this.delivery.price,
            }
        }
    }

    render(): VNode {
        return <form onSubmit={this.formSubmit} class="px-4 py-5 bg-gray-900 space-y-6 sm:p-6 text-gray-700 rounded-md overflow-hidden">
            <div>
                <label for="name" class="block text-sm font-medium">Name</label>
                <input type="text" name="name" id="name" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.name.length > 0 }} v-model={this.formData.name} />
            </div>
            <div>
                <label for="weight" class="block text-sm font-medium">Weight</label>
                <input type="text" name="weight" id="weight" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.weight.length > 0 }} v-model={this.formData.weight} />
            </div>
            <div>
                <label for="price" class="block text-sm font-medium">Price</label>
                <input type="text" name="price" id="price" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.price.length > 0 }} v-model={this.formData.price} />
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

    async formSubmit(event: HTMLFormElement) {
        event.preventDefault()

        const status = await this.save(this.formData)

        if (status)
            this.$emit('close', false)
    }
}