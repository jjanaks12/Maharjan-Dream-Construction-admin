import { iTraining } from '@/interfaces/training'
import FormComponent from '@/core/FormComponent'
import SnackBar from '@/components/common/SnackBar'
import TextEditor from '@/components/common/TextEditor'

import { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { validate } from 'vee-validate'
import moment from 'moment'
import { mapGetters } from 'vuex'

@Component({
    computed: {
        ...mapGetters({
            today: 'training/today'
        })
    }
})
export default class TrainingCreate extends FormComponent {
    private isSaving: boolean = false
    private today!: string
    private formData: iTraining = {
        title: '',
        excerpt: '',
        description: '',
        price: '',
        duration: '',
        duration_type: '',
        start_date: '',
    }

    @Prop() detail!: iTraining

    constructor(prop: any) {
        super(prop)

        this.errors = {
            title: [],
            excerpt: [],
            description: [],
            price: [],
            duration: [],
            duration_type: [],
            start_date: [],
        }
    }

    mounted() {
        if (this.detail) {
            this.formData = {
                id: this.detail.id,
                title: this.detail.title,
                excerpt: this.detail.excerpt,
                description: this.detail.description,
                price: this.detail.price,
                duration: this.detail.duration,
                duration_type: this.detail.duration_type,
                start_date: moment(this.detail.start_date).local().format('YYYY-MM-DD[T]HH:mm'),
            }
        }
    }

    /**
     * Page rendering
     * @returns VNode
     */
    render(): VNode {
        const minDate: string = this.detail?.start_date ? this.detail.start_date : this.today

        return (<form action="#" method="POST" class="rounded-md overflow-hidden" onSubmit={this.formSubmitted}>
            <div class="bg-gray-900 space-y-6 text-gray-700">
                <div>
                    <label for="title" class="block text-sm font-medium">Title</label>
                    <input type="text" name="title" id="title" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.title.length > 0 }} v-model={this.formData.title} />
                </div>
                <div>
                    <label for="excerpt" class="block text-sm font-medium">Excerpt</label>
                    <textarea name="excerpt" id="excerpt" class={{ 'bg-gray-700 h-32 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.excerpt.length > 0 }} v-model={this.formData.excerpt} />
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
                        <label for="start_date" class="block text-sm font-medium">Start Date</label>
                        <input type="datetime-local" name="start_date" id="start_date" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.start_date.length > 0 }} min={minDate} v-model={this.formData.start_date} />
                    </div>
                </div>
                <div class="flex -mx-2">
                    <div class="w-1/2 px-2">
                        <label for="duration" class="block text-sm font-medium">Duration</label>
                        <input type="text" name="duration" id="duration" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.duration.length > 0 }} v-model={this.formData.duration} />
                    </div>
                    <div class="w-1/2 px-2">
                        <label for="duration_type" class="block text-sm font-medium">Duration Type</label>
                        <input type="text" name="duration_type" id="duration_type" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.duration_type.length > 0 }} v-model={this.formData.duration_type} />
                    </div>
                </div>
            </div>
            <div class="mt-4 py-3 bg-gray-900 border-t border-gray-800 text-right">
                <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 outline-none" disabled={this.isSaving}>
                    {this.isSaving ? (<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 relative animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>) : null}
                    <span>Save</span>
                </button>
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

        await validate(this.formData.title, 'required', { name: 'title' })
            .then(result => {
                this.errors['title'] = result.errors
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

        await validate(this.formData.duration, 'required', { name: 'duration' })
            .then(result => {
                this.errors['duration'] = result.errors
            })

        await validate(this.formData.duration_type, 'required', { name: 'duration_type' })
            .then(result => {
                this.errors['duration_type'] = result.errors
            })

        await validate(this.formData.start_date, 'required', { name: 'start_date' })
            .then(result => {
                this.errors['start_date'] = result.errors
            })

        this.$nextTick(() => {
            if (!this.hasError) {
                this.isSaving = true

                this.$store.dispatch('training/save', this.formData)
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

    disabledDate(date: Date): boolean {
        return moment(date).isBefore(moment())
    }
}
