import { iService } from '@/interfaces/app'
import FormComponent from '@/core/FormComponent'

import { VNode } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

interface aService {
    title: string, value: number
}

@Component
export default class ServiceForm extends FormComponent {
    private hasChanged: boolean = false
    private detail: Array<aService> = []

    constructor(prop: any) {
        super(prop)

        this.errors = {}

        this.detail.forEach((service: aService) => {
            this.errors[service.title] = []
            this.errors[service.title + 'value'] = []
        });
    }

    @Prop() service!: iService

    @Watch('detail', { deep: true })
    detailPropertyChanged() {
        this.$nextTick(() => {
            this.hasChanged = true
        })
    }

    mounted() {
        this.$nextTick(() => {
            if (this.service && Object.keys(this.service).length > 0) {
                this.detail = []

                Object.keys(this.service).forEach((key: string) => {
                    this.detail.push({
                        title: key,
                        value: this.service[key]
                    })
                });
            }
        })
    }

    /**
     * Page rendering
     * @returns VNode
     */
    render(): VNode {
        return (<div class="">
            <div class="flex justify-between items-center mb-2">
                <strong class="col-span-full">Property Detail</strong>
                <button type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 outline-none" onClick={this.addNewService}>Add New</button>
            </div>
            <div class="grid grid-cols-2 gap-2 mb-5">
                {this.detail.map((service: aService, index: number) => <div class="flex items-center space-x-3">
                    <input type="text" v-model={service.title} class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors[service.title] && this.errors[service.title].length > 0 }} />

                    <input type="number" v-model={service.value} id={`service_${index}`} class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.errors[service.title + 'value'] && this.errors[service.title + 'value'].length > 0 }} />
                    <a href="#" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 outline-none" onClick={(event: MouseEvent) => { event.preventDefault(); this.deleteService(index) }}>Delete</a>
                </div>)}
            </div>
            {this.hasChanged ? <div class="text-right">
                <button type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 outline-none" onClick={this.updateForm}>Update</button>
            </div> : null}
        </div>)
    }

    addNewService(event: MouseEvent): void {
        event.preventDefault()

        this.detail.push({
            title: 'newfield',
            value: 0
        })
    }

    deleteService(index: number) {
        this.detail.splice(index, 1)
    }

    updateForm(event: MouseEvent): void {
        event.preventDefault()
        const details = this.detail.reduce((acc: iService, service: aService) => {
            return {
                ...acc,
                [service.title]: Number(service.value)
            }
        }, {})

        this.$emit('update', details)
        // this.hasChanged = false
    }
}
