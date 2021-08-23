import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iDesk } from '@/interfaces/resturant'
import { mapActions } from 'vuex'
import Modal from '../common/Modal'
import DeskCreate from './DeskCreate'

@Component({
    methods: {
        ...mapActions({
            destory: 'resturant/deskDelete'
        })
    }
})
export default class DeskCard extends Vue {
    private showForm: boolean = false
    private isDeleting: boolean = false

    private destory!: (id: string) => Promise<boolean>

    @Prop({ required: true }) desk!: iDesk

    constructor(prop: any) {
        super(prop)
    }

    render(): VNode {
        return (<div>
            <div class="bg-gray-900 rounded-lg flex justify-between p-3 text-gray-200 relative overflow-hidden">
                <div class="flex-grow">
                    <strong class="text-xl font-medium capitalize">{this.desk.name}</strong>
                </div>
                <div class="pl-3 text-right">
                    <div class="mt-5 flex lg:mt-0 lg:ml-4 md:space-x-5">
                        <a href="#" class="hover:text-gray-400inline-flex items-center p-1 border border-purple-400 rounded-md text-sm font-medium text-purple-400 hover:bg-purple-400 hover:text-gray-100 transition" onClick={(event: MouseEvent) => {
                            event.preventDefault()
                            this.showForm = true
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </a>
                        <a href="#" class="inline-flex items-center p-1 border border-red-400 rounded-md text-sm font-medium text-red-400 hover:bg-red-400 hover:text-gray-100 transition" onClick={this.toggleDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </a>
                    </div>
                </div>
                {this.isDeleting ? (<div class="bg-black bg-opacity-80 flex justify-end p-2 absolute inset-0 space-x-2">
                    <a href="#" class="inline-flex items-center p-1 border border-yellow-400 rounded-md text-sm font-medium text-yellow-400 hover:bg-yellow-400 hover:text-gray-100 transition" onClick={(event: MouseEvent) => {
                        event.preventDefault()

                        this.destory(this.desk.id || '')
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </a>
                    <a href="#" class="inline-flex items-center p-1 border border-green-400 rounded-md text-sm font-medium text-green-400 hover:bg-green-400 hover:text-gray-100 transition" onClick={this.toggleDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </a>
                </div>) : null}
            </div>
            <Modal v-model={this.showForm}>
                <DeskCreate detail={this.desk} onClose={() => { this.showForm = false }} />
            </Modal>
        </div>)
    }

    toggleDelete(event: MouseEvent): void {
        event.preventDefault()

        this.isDeleting = !this.isDeleting
    }
}
