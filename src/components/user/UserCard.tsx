import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iUserDetail } from '@/interfaces/auth'
import { formatDate } from '@/plugin/filter'

import Modal from '@/components/common/Modal'
import UserDetail from '@/components/user/UserDetail'

@Component
export default class UserCard extends Vue {
    readonly name: string = 'UserCard'
    private isDeleting: boolean = false
    private showModal: boolean = false

    @Prop({ required: true }) user!: iUserDetail

    @Prop({ required: true }) isMaster!: boolean

    constructor(prop: any) {
        super(prop)
    }

    mounted() {
        if (this.user.uuid && this.user.uuid === this.$route.params.uuid)
            this.showModal = true
    }

    get hasDeleted(): boolean {
        return Boolean(this.user.deleted_at)
    }

    render(): VNode {
        return (<div class="lg:flex lg:items-center lg:justify-between bg-gray-900 rounded-lg">
            <div class="flex-grow lg:flex lg:items-center lg:justify-between p-3">
                <div class="flex-1 min-w-0 flex text-gray-200">
                    {this.user.photo ? <div class="w-24 h-24 mr-4 rounded-full overflow-hidden">
                        <img src={this.user.photo_url} alt={this.user.name} class="w-full h-full object-cover" />
                    </div> : <div class="bg-gray-400 text-white w-24 h-24 text-2xl flex justify-center items-center font-bold mr-4 rounded-full overflow-hidden">
                        {this.getNameInitials(this.user.name)}
                    </div>}
                    <div class="flex-grow">
                        <h3 class="text-xl font-bold leading-7 capitalize sm:truncate">{this.user.name} {this.user.email_verified_at ? (<span class="text-green-400 text-xs">(verified)</span>) : null}</h3>
                        <em class="not-italic">{this.user.email}</em>
                        <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                            <div class="mt-2 flex items-center text-sm text-gray-500">
                                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                                </svg>
                                <span>{formatDate(this.user.created_at)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {!this.isMaster ? (<div class="mt-5 flex lg:mt-0 lg:ml-4 md:space-x-5">
                    <a href="#" class="text-purple-400 hover:text-gray-400 transition" onClick={(event: MouseEvent) => {
                        event.preventDefault()
                        this.showModal = true
                        this.$router.replace({
                            name: this.$route.name as string,
                            params: {
                                uuid: this.user.uuid as string
                            }
                        })
                    }}>view</a>
                    {/* <a href="#" class="text-red-400 hover:text-gray-400 transition" onClick={this.toggleDelete}>Deactivate</a>
                    {this.hasDeleted ? (<button type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-800 hover:bg-red-900" onClick={this.toggleDelete}>
                        <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        <span>Delete</span>
                    </button>) : null} */}
                </div>) : null}
            </div>
            {this.isDeleting ? (<div class="flex-grow-0 flex-shrink-0 h-full bg-black bg-opacity-30 w-40 flex flex-col p-4 items-center space-y-2 ml-3 rounded-md">
                <a href="#" class="text-yellow-400 hover:text-gray-400 transition" onClick={this.deleteUser}>confirm</a>
                <a href="#" class="text-green-400 hover:text-gray-400 transition" onClick={this.toggleDelete}>cancel</a>
            </div>) : null}
            <Modal v-model={this.showModal} onInput={(status: boolean) => {
                this.$router.replace({ name: this.$route.name as string })
            }}>
                <UserDetail user={this.user} />
            </Modal>
        </div>)
    }

    getNameInitials(name: string): string {
        return name.split(' ').map((word: string) => word.charAt(0)).slice(0, 2).join('')
    }

    deleteUser(event: MouseEvent): void {
        event.preventDefault()

        this.$store.dispatch('user/destory', this.user.uuid)
    }

    restoreUser(event: MouseEvent): void {
        event.preventDefault()

        this.$store.dispatch('user/restore', this.user.uuid)
    }

    toggleDelete(event: MouseEvent): void {
        event.preventDefault()

        this.isDeleting = !this.isDeleting
    }
}
