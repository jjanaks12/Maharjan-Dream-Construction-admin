import { Component, Prop } from 'vue-property-decorator'

import FormComponent from '@/core/FormComponent'
import { iPage, pageInit } from '@/interfaces/page'
import { VNode } from 'vue'
import { validate } from 'vee-validate'
import { mapActions } from 'vuex'
import TextEditor from '../common/TextEditor'

@Component({
    methods: {
        ...mapActions({
            save: 'page/save',
        })
    }
})
export default class PageCreate extends FormComponent {

    private isSaving: boolean = false
    private formData: iPage = pageInit

    private save!: (formData: any) => Promise<boolean>

    @Prop() detail!: iPage

    constructor(props: any) {
        super(props)

        this.errors = {
            title: [],
            subtitle: [],
            description: [],
        }
    }

    mounted() {
        if (this.detail) {
            this.formData = {
                id: this.detail.id,
                title: this.detail.title,
                subtitle: this.detail.subtitle,
                description: this.detail.description,
            }
        }
    }

    render(): VNode {
        return <form method="POST" class="rounded-md overflow-hidden px-4 py-5 bg-gray-900 space-y-6 sm:p-6 text-gray-700" onSubmit={this.formSubmitted} novalidate>
            <div class="mb-6">
                <label for="name" class="block text-sm font-medium">Page Name</label>
                <input type="text" name="title" id="title" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.title.length > 0 }} v-model={this.formData.title} />
            </div>
            <div class="mb-6">
                <label for="name" class="block text-sm font-medium">Page Subtitle</label>
                <input type="text" name="subtitle" id="subtitle" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.subtitle.length > 0 }} v-model={this.formData.subtitle} />
            </div>
            <div class="mb-6">
                <label for="name" class="block text-sm font-medium">Event Detail</label>
                <TextEditor min-height="350px" v-model={this.formData.description} invalid={this.errors.description.length > 0} />
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

    async formSubmitted(event: HTMLFormElement): Promise<void> {
        event.preventDefault()
        this.resetErrorMessage()

        await validate(this.formData.title, 'required', { name: 'title' })
            .then(result => {
                this.errors['title'] = result.errors
            })

        await validate(this.formData.description, 'required', { name: 'description' })
            .then(result => {
                this.errors['description'] = result.errors
            })

        this.$nextTick(() => {
            if (!this.hasError) {
                this.isSaving = true

                this.save(this.formData)
                    .then(() => {
                        this.resetErrorMessage()
                        this.formData = {
                            title: '',
                            description: '',
                        }
                        this.$emit('close')
                    })
                    .catch(() => { })
                    .finally(() => {
                        this.isSaving = false
                    })
            }
        })
    }
}