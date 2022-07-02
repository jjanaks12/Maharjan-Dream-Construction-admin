import { Component } from "vue-property-decorator"
import { VNode } from 'vue'
import { validate } from 'vee-validate'

import FormComponent from "@/core/FormComponent"
import { iOrderSearch } from "@/interfaces/order"
import { mapActions } from "vuex"
import { RequestQuery } from "@/interfaces/app"

@Component({
    methods: {
        ...mapActions({
            'fetch': 'order/fetch'
        })
    }
})
export default class OrderSearch extends FormComponent {
    private isLoading: boolean = false
    private formData: iOrderSearch = {
        id: ''
    }
    private fetch!: (query: RequestQuery) => Promise<boolean>

    constructor(props: any) {
        super(props)

        this.errors = {
            id: []
        }
    }

    render(): VNode {
        return <form action="#" onSubmit={this.onSubmit} class="bg-gray-900 p-3 mt-4 rounded-md">
            <div class="flex items-start space-x-2">
                <div class="flex-grow">
                    <label for="of_search" class="block text-sm font-medium invisible absolute opacity-0">Payment Status</label>
                    <input type="search" name="end_date" id="of_search" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.id.length > 0 }} v-model={this.formData.id} placeholder="Search Order by ID" />
                    {this.errors.id.length > 0
                        ? <span class="text-red-700 inline-block align-top mt-1 text-sm">{this.errors.id}</span>
                        : null}
                </div>
                <button type="submit" class="min-w-40 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block align-middle mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        {this.isLoading
                            ? <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            : <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        }
                    </svg>
                    Search
                </button>
            </div>
        </form>
    }

    async onSubmit(event: HTMLFormElement) {
        event.preventDefault()
        this.resetErrorMessage()

        await validate(this.formData.id, 'required|min:36', { name: 'id' })
            .then(result => {
                this.errors['id'] = result.errors
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