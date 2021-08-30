import { iRent } from '@/interfaces/app'
import FormComponent from '@/core/FormComponent'
import SnackBar from '@/components/common/SnackBar'

import { validate } from 'vee-validate'
import { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import TextEditor from '@/components/common/TextEditor'

@Component
export default class RentCreate extends FormComponent {
    private isSaving: boolean = false
    private formData: iRent = {
        name: '',
        excerpt: '',
        description: '',
        machinery: '',
        price: '',
    }

    @Prop() detail!: iRent

    constructor(prop: any) {
        super(prop)

        this.errors = {
            name: [],
            excerpt: [],
            description: [],
            machinery: [],
            price: []
        }
    }

    mounted() {
        if (this.detail) {
            this.formData = {
                id: this.detail.id,
                name: this.detail.name,
                excerpt: this.detail.excerpt,
                description: this.detail.description,
                machinery: this.detail.machinery,
                price: this.detail.price
            }
        }
    }

    /**
     * Page rendering
     * @returns VNode
     */
    render(): VNode {
        return (<form action="#" method="POST" class="rounded-md overflow-hidden" onSubmit={this.formSubmitted}>
            <div>
                <div class="space-y-6 text-gray-700">
                    <div>
                        <label for="name" class="block text-sm font-medium">Name</label>
                        <input type="text" name="name" id="name" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.name.length > 0 }} v-model={this.formData.name} />
                    </div>
                    <div>
                        <label for="excerpt" class="block text-sm font-medium">Excerpt</label>
                        <textarea name="excerpt" id="excerpt" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.excerpt.length > 0 }} v-model={this.formData.excerpt} />
                    </div>
                    <div>
                        <label for="description" class="block text-sm font-medium">Description</label>
                        <TextEditor v-model={this.formData.description} invalid={this.errors.description.length > 0} />
                    </div>
                    <div class="flex -mx-2">
                        <div class="w-1/2 px-2">
                            <label for="price" class="block text-sm font-medium">Price</label>
                            <input type="text" name="price" id="price" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.price.length > 0 }} v-model={this.formData.price} />
                        </div>
                        <div class="w-1/2 px-2">
                            <label for="machinery" class="block text-sm font-medium">Machinery</label>
                            <input type="text" name="machinery" id="machinery" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.machinery.length > 0 }} v-model={this.formData.machinery} />
                        </div>
                    </div>
                </div>
                <div class="px-4 py-3 bg-gray-900 border-t border-gray-800 text-right sm:px-6">
                    <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 outline-none" disabled={this.isSaving}>
                        {this.isSaving ? (<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 relative animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>) : null}
                        <span>Save</span>
                    </button>
                </div>
            </div>
            {this.hasError ? (<SnackBar message={this.errorMessage} />) : null}
        </form>)
    }

    /**
     * For form submit handling
     * @param event 
     * @returns void
     */
    async formSubmitted(event: HTMLFormElement): Promise<void> {
        event.preventDefault()
        this.resetErrorMessage()

        await validate(this.formData.name, 'required', { name: 'name' })
            .then(result => {
                this.errors['name'] = result.errors
            })

        await validate(this.formData.excerpt, 'required', { name: 'excerpt' })
            .then(result => {
                this.errors['excerpt'] = result.errors
            })

        await validate(this.formData.description, 'required', { name: 'description' })
            .then(result => {
                this.errors['description'] = result.errors
            })

        await validate(this.formData.price, 'required', { name: 'price' })
            .then(result => {
                this.errors['price'] = result.errors
            })

        await validate(this.formData.machinery, 'required', { name: 'machinery' })
            .then(result => {
                this.errors['machinery'] = result.errors
            })

        this.$nextTick(() => {
            if (!this.hasError) {
                this.isSaving = true

                this.$store.dispatch('rent/save', this.formData)
                    .then(() => {
                        this.$emit('close')
                    })
                    .catch(() => { })
                    .finally(() => {
                        this.isSaving = false
                        this.resetErrorMessage()
                    })
            }
        })
    }
}
