import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iMenu } from '@/interfaces/resturant'
import { mapActions } from 'vuex'
import Modal from '../common/Modal'
import MenuCreate from './MenuCreate'

@Component({
    methods: {
        ...mapActions({
            destory: 'resturant/menuDelete'
        })
    }
})
export default class MenuCard extends Vue {
    private isDeleting: boolean = false
    private showForm: boolean = false
    private destory!: (id: string) => Promise<boolean>

    @Prop({ required: true }) menu!: iMenu

    constructor(prop: any) {
        super(prop)
    }

    render(): VNode {
        return (<div>
            <div class="bg-gray-900 rounded-lg flex justify-between p-3 text-gray-200">
                <div class="flex-grow">
                    <strong class="text-xl font-medium capitalize">{this.menu.name}</strong>
                    <div class="html-content" domPropsInnerHTML={this.menu.excerpt} />
                </div>
                <div class="pl-3 text-right">
                    <div class="action text-sm space-x-3 mb-3">
                        <a href="#" class="text-purple-400 hover:text-gray-400 transition" onClick={(event: MouseEvent) => {
                            event.preventDefault()
                            this.showForm = true
                        }}>view</a>
                        <a href="#" class="text-red-400 hover:text-gray-400 transition" onClick={this.toggleDelete}>delete</a>
                    </div>
                    {this.menu.parent_id ? <em class="not-italic text-xl font-medium block leading-none">Rs. {this.menu.price}</em> : null}
                </div>
                {this.isDeleting ? (<div class="bg-black bg-opacity-30 w-40 flex flex-col px-2 items-center space-y-2 ml-3 rounded-md">
                    <a href="#" class="text-yellow-400 hover:text-gray-400 transition" onClick={(event: MouseEvent) => {
                        event.preventDefault()

                        this.destory(this.menu.id || '')
                    }}>confirm</a>
                    <a href="#" class="text-green-400 hover:text-gray-400 transition" onClick={this.toggleDelete}>cancel</a>
                </div>) : null}
            </div>
            {this.menu.children && this.menu.children.length > 0
                ? <div class="space-y-1 pt-1">
                    {this.menu.children.map((menuItem: iMenu, index: number) => <MenuCard menu={menuItem} class="ml-9" />)}
                </div>
                : null}
            <Modal v-model={this.showForm}>
                <MenuCreate detail={this.menu} onClose={() => { this.showForm = false }} />
            </Modal>
        </div>)
    }

    toggleDelete(event: MouseEvent): void {
        event.preventDefault()

        this.isDeleting = !this.isDeleting
    }
}
