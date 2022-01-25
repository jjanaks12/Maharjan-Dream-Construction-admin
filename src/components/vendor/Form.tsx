import { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import FormComponent from '@/core/FormComponent'
import SnackBar from '@/components/common/SnackBar'
import { iVendor } from '@/interfaces/vendor'
import { validate } from 'vee-validate'
import { mapActions } from 'vuex'

@Component({
    methods: {
        ...mapActions({
            save: 'vendor/save',
        })
    }
})
export default class VendorForm extends FormComponent {
    private isSaving: boolean = false
    private formData: iVendor = {
        name: '',
        address: '',
        pan_no: '',
        vat_no: '',
        logo: '',
    }
    private save!: (formData: any) => Promise<boolean>

    @Prop() detail!: iVendor

    constructor(prop: any) {
        super(prop)

        this.errors = {
            name: [],
            address: [],
            pan_no: [],
            vat_no: [],
            logo: [],
        }
    }

    mounted() {
        if (this.detail) {
            this.formData = {
                id: this.detail.id,
                name: this.detail.name,
                address: this.detail.address,
                pan_no: this.detail.pan_no,
                vat_no: this.detail.vat_no,
                logo_url: this.detail.logo_url,
            }
        }
    }

    render(): VNode {
        return <form action="#" method="POST" class="rounded-md overflow-hidden" onSubmit={this.formSubmitted}>
            <div class="px-4 py-5 bg-gray-900 space-y-6 sm:p-6 text-gray-700">
                <div>
                    <label for="name" class="block text-sm font-medium">Name</label>
                    <input type="text" name="name" id="name" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.name.length > 0 }} v-model={this.formData.name} />
                </div>
                <div>
                    <label for="address" class="block text-sm font-medium">Address</label>
                    <input type="text" name="address" id="address" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.address.length > 0 }} v-model={this.formData.address} />
                </div>
                <div class="flex -mx-2">
                    <div class="w-1/2 px-2">
                        <label for="pan_no" class="block text-sm font-medium">PAN No</label>
                        <input type="text" name="pan_no" id="pan_no" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.pan_no.length > 0 }} v-model={this.formData.pan_no} />
                    </div>
                    <div class="w-1/2 px-2">
                        <label for="vat_no" class="block text-sm font-medium">VAT No</label>
                        <input type="text" name="vat_no" id="vat_no" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.vat_no.length > 0 }} v-model={this.formData.vat_no} />
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

        await validate(this.formData.name, 'required', { name: 'name' })
            .then(result => {
                this.errors['name'] = result.errors
            })

        await validate(this.formData.address, 'required', { name: 'address' })
            .then(result => {
                this.errors['address'] = result.errors
            })

        await validate(this.formData.pan_no, 'required', { name: 'pan_no' })
            .then(result => {
                this.errors['pan_no'] = result.errors
            })
            
        await validate(this.formData.vat_no, 'required', { name: 'vat_no' })
            .then(result => {
                this.errors['vat_no'] = result.errors
            })

        this.$nextTick(() => {
            if (!this.hasError) {
                this.isSaving = true

                this.save({ ...this.formData })
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