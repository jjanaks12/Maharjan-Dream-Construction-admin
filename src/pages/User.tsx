import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import Toggle from '@/components/common/Toggle'
import UserCard from '@/components/user/UserCard'
import { iUserDetail } from '@/interfaces/auth'
import Paginate from '@/components/common/Paginate'

@Component({
    computed: {
        ...mapGetters({
            userList: 'user/getUserList',
            currentPage: 'training/currentPage',
            lastPage: 'training/lastPage'
        })
    },
    methods: {
        ...mapActions({
            fetch: 'user/fetch',
            prevPage: 'training/prevPage',
            nextPage: 'training/nextPage',
            gotoPage: 'training/gotoPage'
        })
    }
})
export default class User extends Vue {
    private userList!: Array<iUserDetail>
    private isMaster: boolean = false
    private isLoading: boolean = false
    private fetch!: (isAdmin: boolean) => Promise<boolean>

    private currentPage!: number
    private lastPage!: number
    private nextPage!: () => Promise<boolean>
    private prevPage!: () => Promise<boolean>
    private gotoPage!: (pageno: number) => Promise<boolean>

    mounted() {
        this.fetchUser()
    }

    @Watch('isMaster')
    watchIsMaster(): void {
        this.fetchUser()
    }

    render(): VNode {
        return (<div class="py-8">
            <div class="container mx-auto px-2">
                <header class="text-gray-500 flex justify-between items-center mb-10">
                    <h2 class="text-3xl font-bold capitalize sm:truncate">User List</h2>
                    <Toggle v-model={this.isMaster}>{this.isMaster ? 'Showing Admins' : 'Showing Users'}</Toggle>
                </header>
                {!this.isLoading ? [<div class="md:space-y-1">
                    {this.userList.map((user: iUserDetail, index: number) => (<UserCard isMaster={this.isMaster} user={user} key={index} style={{ '--transition-delay': index * 0.3 + 's' }} />))}
                </div>,
                this.lastPage > 1 ? <Paginate current={this.currentPage} total={this.lastPage} onNext={() => this.nextPage()} onPrev={() => this.prevPage()} onGoto={(pageno: number) => this.gotoPage(pageno)} /> : null] : null}
            </div>
        </div>)
    }

    fetchUser(): void {
        this.isLoading = true

        this.fetch(this.isMaster)
            .finally(() => {
                this.isLoading = false
            })
    }
}
