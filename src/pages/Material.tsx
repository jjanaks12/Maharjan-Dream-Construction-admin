import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import { iMaterial, iMaterialCategory } from '@/interfaces/app'
import MaterialCreate from '@/components/material/Create'
import MaterialCard from '@/components/material/Card'
import MaterialCategoryCreate from '@/components/material/CreateCategory'
import MaterialCategoryCard from '@/components/material/CategoryCard'
import Modal from '@/components/common/Modal'

@Component({
    computed: {
        ...mapGetters({
            materialList: 'material/getMaterialList',
            categoryList: 'material/getCategoryList',
            lastMaterialPage: 'material/lastMaterialPage',
            currentMaterialPage: 'material/currentMaterialPage',
        })
    },
    methods: {
        ...mapActions({
            fetchCategory: 'material/fetchCategory',
            fetch: 'material/fetch',
            nextMaterialPage: 'material/nextMaterialPage',
            prevMaterialPage: 'material/prevMaterialPage'
        })
    }
})
export default class Material extends Vue {
    private showMaterialForm: boolean = false
    private showMaterialCategoryForm: boolean = false
    private materialList!: Array<iMaterial>
    private categoryList!: Array<iMaterialCategory>
    private fetchCategory!: () => Promise<boolean>
    private fetch!: () => Promise<boolean>
    private currentMaterialPage!: number
    private lastMaterialPage!: number
    private nextMaterialPage!: () => Promise<boolean>
    private prevMaterialPage!: () => Promise<boolean>

    mounted() {
        Promise.all([
            this.fetchCategory(),
            this.fetch()
        ])
    }

    render(): VNode {
        return (<div class="py-8">
            <div class="container mx-auto px-2">
                <header class="flex justify-between items-center mb-8">
                    <h2 class="text-3xl font-bold capitalize sm:truncate">Materials</h2>
                    <div class="space-x-3 ml-auto">
                        <button type="button" class="min-w-40 inline-flex justify-center items-center px-4 py-2 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-gray-200 transition" onClick={this.toggleCreateMaterialCategoryForm}>
                            <svg xmlns="http://www.w3.org/2000/svg" class={{ "h-6 w-6 relative": true, 'transform rotate-90 ': this.showMaterialForm }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>Create Material Category</span>
                        </button>
                        <button type="button" class="min-w-40 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition" onClick={this.toggleCreateMaterialForm}>
                            <svg xmlns="http://www.w3.org/2000/svg" class={{ "h-6 w-6 relative": true, 'transform rotate-90 ': this.showMaterialForm }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>Create Material</span>
                        </button>
                    </div>
                </header>
                <div class="flex flex-wrap -mx-2">
                    <div class="w-2/3 px-2">
                        <div class="md:space-y-1 pt-3">
                            <transition-group tag="div" name="fade-in" class="md:space-y-1">
                                {this.materialList.map((material: iMaterial, index: number) => (<MaterialCard material={material} key={material.id} style={{ '--transition-delay': index * 0.3 + 's' }} />))}
                            </transition-group>
                        </div>
                        <ul>
                            {this.currentMaterialPage > 1 ? (<li><a href="#" onClick={this.prevMaterial}>prev</a></li>) : null}
                            {this.currentMaterialPage < this.lastMaterialPage ? (<li><a href="#" onClick={this.nextMaterial}>next</a></li>) : null}
                        </ul>
                    </div>
                    {/* <div class="w-1/3 px-2">
                        <h3 class="text-xl font-bold capitalize sm:truncate">Categories</h3>
                        <div class="md:space-y-1 pt-3">
                            <transition-group tag="div" name="fade-in" class="md:space-y-1">
                                {this.categoryList.map((category: iMaterialCategory, index: number) => (<MaterialCategoryCard category={category} key={category.id} style={{ '--transition-delay': index * 0.3 + 's' }} />))}
                            </transition-group>
                        </div>
                    </div> */}
                </div>
                <Modal v-model={this.showMaterialCategoryForm}>
                    <MaterialCategoryCreate onClose={() => { this.showMaterialCategoryForm = false }} />
                </Modal>
                <Modal v-model={this.showMaterialForm}>
                    <MaterialCreate onClose={() => { this.showMaterialForm = false }} />
                </Modal>
            </div>
        </div>)
    }

    toggleCreateMaterialForm(event: MouseEvent): void {
        event.preventDefault()
        this.showMaterialForm = !this.showMaterialForm
    }

    toggleCreateMaterialCategoryForm(event: MouseEvent): void {
        event.preventDefault()
        this.showMaterialCategoryForm = !this.showMaterialCategoryForm
    }

    nextMaterial(event: MouseEvent): void {
        event.preventDefault()
        this.nextMaterialPage()
    }

    prevMaterial(event: MouseEvent): void {
        event.preventDefault()
        this.prevMaterialPage()
    }
}
