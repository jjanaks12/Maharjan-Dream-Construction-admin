import { Vue, Component, Prop } from "vue-property-decorator"
import { VNode } from "vue"
import { mapGetters } from "vuex"
import { iVendor } from "@/interfaces/vendor"

@Component({
    computed: {
        ...mapGetters({
            vendorList: 'vendor/vendorList'
        })
    }
})
export default class VendorSelect extends Vue {
    private isOpen: boolean = false
    private vendorList!: Array<iVendor>
    private selectedOption: iVendor | null = {
        name: '',
        address: '',
        pan_no: '',
        vat_no: '',
    }

    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) value!: string | null
    @Prop({ default: false }) invalid!: boolean

    mounted() {
        this.$nextTick(() => {
            this.selectedOption = this.vendorList.find((category: iVendor) => category.id === this.value) || null
        })
    }

    render(): VNode {
        return <div class="mt-1 relative" v-click-outside={this.close}>
            <button type="button" class={{ "relative w-full bg-gray-700 text-gray-400 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default border border-transparent outline-none focus:outline-none sm:text-sm": true, 'border-red-700 text-red-700': this.invalid }} aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" onClick={this.toggleDropdown}>
                <span class="font-normal ml-3 block truncate">{this.selectedOption ? this.selectedOption.name : 'Select One'}</span>
                <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </span>
            </button>
            <div class={{ "absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base overflow-auto sm:text-sm": true, "hidden": !this.isOpen }} tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                <div class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9" role="option" onClick={() => this.changed(null)}>
                    <span class="font-normal ml-3 block truncate">Select one</span>
                    {!this.selectedOption ? (<span class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                    </span>) : null}
                </div>
                {this.vendorList.map((vendor: iVendor) => (<div class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9" role="option" onClick={() => this.changed(vendor)}>
                    <span class="font-normal ml-3 block truncate">{vendor.name}</span>
                    {this.selectedOption && this.selectedOption.id == vendor.id ? (<span class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                    </span>) : null}
                </div>))}
            </div>
        </div>
    }

    toggleDropdown(event: MouseEvent): void {
        event.preventDefault()

        this.isOpen = !this.isOpen
    }

    changed(vendor: iVendor | null): void {

        if (vendor)
            this.$emit('input', vendor.id)
        else
            this.$emit('input', this.selectedOption?.id || '')

        this.selectedOption = vendor

        this.close()
    }

    close(): void {
        this.isOpen = false
    }
}