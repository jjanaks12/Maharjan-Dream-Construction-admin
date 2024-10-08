import { mapActions, mapGetters } from 'vuex'
import { VNode } from 'vue'
import { validate } from 'vee-validate'
import { Component, Prop } from 'vue-property-decorator'

import { iImage } from '@/interfaces/app'
import { iMaterial, iMaterialCategory } from '@/interfaces/material'

import FormComponent from '@/core/FormComponent'
import SnackBar from '@/components/common/SnackBar'
import MaterialSelect from './MaterialSelect'
import TextEditor from '../common/TextEditor'
import VendorSelect from './VendorSelect'

@Component({
    computed: {
        ...mapGetters({
            categoryList: 'material/getCategoryList'
        })
    },
    methods: {
        ...mapActions({
            save: 'material/save',
            deleteImage: 'material/deleteImage'
        })
    }
})
export default class MaterialCreate extends FormComponent {
    private isSaving: boolean = false
    private maxSize: number = 10
    private imageList: Array<iImage> = []
    private images: Array<ArrayBuffer> = []
    private categoryList!: Array<iMaterialCategory>
    private save!: (formData: any) => Promise<boolean>
    private deleteImage!: (id: string) => Promise<boolean>
    private formData: iMaterial = {
        name: '',
        excerpt: '',
        description: '',
        quantity: '',
        measurement_unit: '',
        price: '',
        material_category_id: '',
        vendor_id: ''
    }

    @Prop() detail!: iMaterial

    constructor(prop: any) {
        super(prop)

        this.errors = {
            name: [],
            excerpt: [],
            description: [],
            quantity: [],
            measurement_unit: [],
            material_category_id: [],
            price: [],
            vendor_id: [],
        }
    }

    get canEdit(): boolean {
        return this.$route.name == 'material'
    }

    mounted() {
        if (this.detail) {
            this.formData = {
                id: this.detail.id,
                name: this.detail.name,
                excerpt: this.detail.excerpt,
                description: this.detail.description,
                quantity: this.detail.quantity,
                price: this.detail.price,
                measurement_unit: this.detail.measurement_unit,
                material_category_id: this.detail.material_category_id,
                vendor_id: this.detail.vendor_id
            }

            this.imageList = this.detail.images && this.detail.images.length > 0 ? this.detail.images : []
        }
    }

    /**
     * Page rendering
     * @returns VNode
     */
    render(): VNode {
        return (<form action="#" method="POST" class="rounded-md overflow-hidden" onSubmit={this.formSubmitted}>
            <div>
                <div class="px-4 py-5 bg-gray-900 space-y-6 sm:p-6 text-gray-700">
                    <div>
                        <label for="name" class="block text-sm font-medium">Name</label>
                        <input type="text" name="name" id="name" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.name.length > 0 }} v-model={this.formData.name} readonly={!this.canEdit} />
                    </div>
                    <div>
                        <label for="excerpt" class="block text-sm font-medium">Excerpt</label>
                        <textarea name="excerpt" id="excerpt" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.excerpt.length > 0 }} v-model={this.formData.excerpt} readonly={!this.canEdit} />
                    </div>
                    <div>
                        <label for="description" class="block text-sm font-medium">Description</label>
                        {this.canEdit
                            ? <TextEditor v-model={this.formData.description} invalid={this.errors.description.length > 0} />
                            : <div class="bg-gray-700 text-gray-400 w-full px-3 py-2 rounded-md sm:text-sm" domPropsInnerHTML={this.formData.description} />}
                    </div>

                    <div class="flex flex-wrap -mx-2">
                        <div class="w-1/2 px-2 mb-6">
                            <label for="quantity" class="block text-sm font-medium">Quantity</label>
                            <input type="text" name="quantity" id="quantity" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.quantity.length > 0 }} v-model={this.formData.quantity} readonly={!this.canEdit} />
                        </div>
                        <div class="w-1/2 px-2 mb-6">
                            <label for="measurement_unit" class="block text-sm font-medium">Measurement Unit</label>
                            <input type="text" name="measurement_unit" id="measurement_unit" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.measurement_unit.length > 0 }} v-model={this.formData.measurement_unit} readonly={!this.canEdit} />
                        </div>
                        <div class="w-1/3 px-2">
                            <label for="price" class="block text-sm font-medium">Price</label>
                            <input type="text" name="price" id="price" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.price.length > 0 }} v-model={this.formData.price} readonly={!this.canEdit} />
                        </div>
                        <div class="w-1/3 px-2">
                            <label for="material_category_id" class="block text-sm font-medium">Vendor</label>
                            {this.categoryList.length > 0 ? (<VendorSelect v-model={this.formData.vendor_id} invalid={this.errors.vendor_id.length > 0} />) : null}
                        </div>
                        <div class="w-1/3 px-2">
                            <label for="material_category_id" class="block text-sm font-medium">Material Category</label>
                            {this.categoryList.length > 0 ? (<MaterialSelect v-model={this.formData.material_category_id} invalid={this.errors.material_category_id.length > 0} />) : null}
                        </div>
                    </div>

                    <div class="grid grid-cols-4 gap-2">
                        <strong class="col-span-full">Property Images</strong>
                        {this.imageList.map((image: iImage, index: number) => (<div class="bg-gray-800 border max-h-40 border-gray-800 rounded-md p-1 relative">
                            <img src={image.image_url ? image.image_url : image.file} class="w-full h-full object-contain" />
                            {this.canEdit
                                ? <a href="#" class="text-red-900 hover:text-yellow-400 absolute top-0 right-0 transform  translate-x-1/2 -translate-y-1/2 transition transition-color" onClick={(event: MouseEvent) => this.removeImage(event, index, image.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                                : null
                            }
                        </div>))}
                        {this.images.map((image: ArrayBuffer, index: number) => <div class="bg-gray-800 border max-h-40 border-gray-800 rounded-md p-1 relative">
                            <img src={image} class="w-full h-full object-contain" />
                            <a href="#" class="text-red-900 hover:text-yellow-400 absolute top-0 right-0 transform  translate-x-1/2 -translate-y-1/2 transition transition-color" onClick={(event: MouseEvent) => this.removeImages(event, index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                </svg>
                            </a>
                        </div>)}
                        {this.canEdit
                            ? <label class="text-center mt-1 flex flex-col items-center px-6 pt-5 pb-6 border-2 border-gray-800 border-dashed rounded-md space-y-1">
                                <input name="file-upload" type="file" class="sr-only" onChange={this.fileHandler} accept="image/*" multiple />
                                <svg class="h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div class="flex text-sm text-gray-600">Upload an Image</div>
                                <p class="text-xs">PNG, JPG, GIF up to 10MB</p>
                            </label>
                            : null}
                    </div>
                </div>
                {this.canEdit
                    ? <div class="px-4 py-3 bg-gray-900 border-t border-gray-800 text-right sm:px-6">
                        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 outline-none" disabled={this.isSaving}>
                            {this.isSaving ? (<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 relative animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>) : null}
                            <span>Save</span>
                        </button>
                    </div>
                    : null}
            </div>
            {this.hasError ? (<SnackBar message={this.errorMessage} />) : null}
        </form >)
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

        await validate(this.formData.quantity, 'required', { name: 'quantity' })
            .then(result => {
                this.errors['quantity'] = result.errors
            })

        await validate(this.formData.measurement_unit, 'required', { name: 'Measurement Unit' })
            .then(result => {
                this.errors['measurement_unit'] = result.errors
            })

        await validate(this.formData.material_category_id, 'required', { name: 'Material Category' })
            .then(result => {
                this.errors['material_category_id'] = result.errors
            })

        this.$nextTick(() => {
            if (!this.hasError) {
                this.isSaving = true

                this.save({
                    ...this.formData,
                    images: this.images
                })
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

    /**
     * for file uploading and conveting images to base64 format
     * @param event 
     * @returns void
     */
    fileHandler(event: Event): void {
        const element = event.target as HTMLInputElement
        const fileList: FileList | null = element.files
        const readers: Array<FileReader> = []

        if (fileList) {
            for (let index: number = 0; index < fileList.length; index++) {
                const fileReader: FileReader = new FileReader()
                const uploadedFile: File | null = fileList.item(index)

                if (uploadedFile) {
                    const size: number = (uploadedFile.size / (1024 * 1024))

                    if (size > this.maxSize)
                        break

                    fileReader.readAsDataURL(uploadedFile)
                    readers.push(fileReader)
                }
            }
        }

        Promise.all(readers).then(() => {
            readers.forEach((fileReader: FileReader) => {
                fileReader.onload = () => {
                    if (fileReader.result) {
                        this.images.push(fileReader.result as ArrayBuffer)
                    }
                }
            })
        })
    }

    removeImage(event: MouseEvent, index: number, id: string): void {
        event.preventDefault()

        this.deleteImage(id)
            .then(() => {
                this.imageList.splice(index, 1)
            })
    }

    removeImages(event: MouseEvent, index: number): void {
        event.preventDefault()

        this.images.splice(index, 1)
    }
}
