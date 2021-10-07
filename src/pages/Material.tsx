import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import MaterialCreate from '@/components/material/Create'
import MaterialCategoryCreate from '@/components/material/CreateCategory'
import Modal from '@/components/common/Modal'
import MaterialList from '@/components/material/List'
import CategoryList from '@/components/material/CategoryList'
import { iMaterial } from '@/interfaces/material'

@Component({
    computed: {
        ...mapGetters({
            categoryList: 'material/getCategoryList'
        })
    },
    methods: {
        ...mapActions({
            fetchMaterial: 'material/fetch',
            fetchCategory: 'material/fetchCategory',
        })
    }
})
export default class Material extends Vue {
    private isLoading: boolean = false
    private showMaterialForm: boolean = false
    private showMaterialCategoryForm: boolean = false

    private fetchMaterial!: () => Promise<boolean>
    private fetchCategory!: () => Promise<boolean>
    private categoryList!: Array<iMaterial>

    mounted() {
        this.isLoading = true

        Promise.all([
            this.fetchMaterial(),
            this.fetchCategory()
        ])
            .finally(() => {
                this.isLoading = false
            })
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
                        {
                            this.categoryList.length > 0
                                ? <button type="button" class="min-w-40 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition" onClick={this.toggleCreateMaterialForm}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class={{ "h-6 w-6 relative": true, 'transform rotate-90 ': this.showMaterialForm }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span>Create Material</span>
                                </button>
                                : null
                        }
                    </div>
                </header>
                {
                    !this.isLoading && this.categoryList.length == 0
                        ? <div class="text-center p-3 mb-4 border border-dashed border-gray-500 rounded-md">
                            <p>You need to have atleast one <strong>Category</strong> to start entering <strong>Material</strong></p>
                        </div>
                        : null
                }
                {
                    !this.isLoading
                        ? <div class="flex flex-wrap -mx-2">
                            <MaterialList />
                            <CategoryList />
                        </div>
                        : null
                }
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
}
