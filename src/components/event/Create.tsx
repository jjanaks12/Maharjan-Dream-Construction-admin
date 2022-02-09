import { Component, Prop } from "vue-property-decorator"
import { VNode } from "vue"
import { validate } from "vee-validate"
import { mapActions } from "vuex"
import moment from "moment"

import FormComponent from "@/core/FormComponent"
import { eventInit, iEvent } from "@/interfaces/event"
import TextEditor from "../common/TextEditor"

const today = moment().format('YYYY-MM-DD[T]hh:mm:ss')

@Component({
    methods: {
        ...mapActions({
            save: 'event/save',
        })
    }
})
export default class EventCreate extends FormComponent {
    private isSaving: boolean = false
    private formData: iEvent = eventInit

    private save!: (formData: any) => Promise<boolean>

    @Prop() detail!: iEvent

    constructor(props: any) {
        super(props)

        this.errors = {
            name: [],
            description: [],
            start: [],
            end: []
        }
    }

    mounted() {
        if (this.detail) {
            this.formData = {
                id: this.detail.id,
                name: this.detail.name,
                description: this.detail.description,
                start: moment(this.detail.start).format('YYYY-MM-DD[T]HH:mm'),
                end: moment(this.detail.end).format('YYYY-MM-DD[T]HH:mm')
            }
        }
    }

    render(): VNode {
        return <form method="POST" class="rounded-md overflow-hidden px-4 py-5 bg-gray-900 space-y-6 sm:p-6 text-gray-700" onSubmit={this.formSubmitted} novalidate>
            <div class="mb-6">
                <label for="name" class="block text-sm font-medium">Event Name</label>
                <input type="text" name="name" id="name" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.name.length > 0 }} v-model={this.formData.name} />
            </div>
            <div class="mb-6">
                <label for="name" class="block text-sm font-medium">Event Detail</label>
                <TextEditor v-model={this.formData.description} invalid={this.errors.description.length > 0} />
            </div>
            <div class="flex flex-wrap -mx-2">
                <div class="w-1/2 px-2 mb-6">
                    <label for="start" class="block text-sm font-medium">Event starts at</label>
                    <input type="datetime-local" name="start" id="start" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.start.length > 0 }} v-model={this.formData.start} min={today} />
                </div>
                <div class="w-1/2 px-2 mb-6">
                    <label for="end" class="block text-sm font-medium">Event ends at</label>
                    <input type="datetime-local" name="end" id="end" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors.end.length > 0 }} v-model={this.formData.end} min={this.formData.start ? this.formData.start : today} />
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
        </form>
    }

    async formSubmitted(event: HTMLFormElement): Promise<void> {
        event.preventDefault()
        this.resetErrorMessage()

        await validate(this.formData.name, 'required', { name: 'name' })
            .then(result => {
                this.errors['name'] = result.errors
            })

        await validate(this.formData.description, 'required', { name: 'description' })
            .then(result => {
                this.errors['description'] = result.errors
            })

        await validate(this.formData.start, 'required', { name: 'start' })
            .then(result => {
                this.errors['start'] = result.errors
            })

        await validate(this.formData.end, 'required', { name: 'end' })
            .then(result => {
                this.errors['end'] = result.errors
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