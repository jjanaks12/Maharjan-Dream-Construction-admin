import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iMaterialCategory } from '@/interfaces/material'
import Modal from '../common/Modal'
import MaterialCategoryCreate from './CreateCategory'

@Component
export default class MaterialCategoryCard extends Vue {
    private showMaterialCategoryForm: boolean = false
    private showConfirm: boolean = false
    @Prop({ required: true }) category!: iMaterialCategory

    constructor(prop: any) {
        super(prop)
    }

    render(): VNode {
        return (<div class="lg:flex lg:items-center lg:justify-between bg-gray-800 p-2 rounded-lg overflow-hidden relative">
            <div class="flex-1 min-w-0 text-gray-200">
                <h4 class="text-lg font-bold leading-7 capitalize sm:truncate">{this.category.title}</h4>
            </div>
            <div class="mt-5 flex lg:mt-0 lg:ml-4 md:space-x-5">
                <a href="#" class="text-purple-400 hover:text-gray-400 transition" onClick={(event: MouseEvent) => {
                    event.preventDefault()

                    this.showMaterialCategoryForm = true
                }}>view</a>
                <button type="button" class="inline-flex items-center p-1 border border-red-400 rounded-md text-sm font-medium text-red-400 hover:bg-red-400 hover:text-gray-100 transition" onClick={(this.toggleConfirm)}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
            <transition name="fade" mode="out-in">
                {this.showConfirm ? (<div class="bg-black bg-opacity-80 flex justify-end p-2 absolute inset-0 space-x-2">
                    <button type="button" class="inline-flex items-center p-1 border border-red-400 rounded-md text-sm font-medium text-red-400 hover:bg-red-400 hover:text-gray-100 transition" onClick={this.deleteMaterial}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                    <button type="button" class="inline-flex items-center p-1 border border-red-400 rounded-md text-sm font-medium text-red-400 hover:bg-red-400 hover:text-gray-100 transition" onClick={this.toggleConfirm}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>) : null}
            </transition>
            <Modal v-model={this.showMaterialCategoryForm}>
                <MaterialCategoryCreate detail={this.category} onClose={() => { this.showMaterialCategoryForm = false }} />
            </Modal>
        </div>)
    }

    deleteMaterial(event: MouseEvent): void {
        event.preventDefault()

        this.$store.dispatch('material/deleteCategory', this.category.id)
    }

    toggleConfirm(event: MouseEvent): void {
        event.preventDefault()

        this.showConfirm = !this.showConfirm
    }
}
