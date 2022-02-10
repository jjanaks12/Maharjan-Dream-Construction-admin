import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions, mapGetters, mapMutations } from 'vuex'

import Toggle from '@/components/common/Toggle'
import UserCard from '@/components/user/UserCard'
import { iUserDetail } from '@/interfaces/auth'
import Paginate from '@/components/common/Paginate'

let timer: any = null

@Component({
    computed: {
        ...mapGetters({
            userList: 'user/getUserList',
            currentPage: 'user/currentPage',
            lastPage: 'user/lastPage',
            isAdmin: 'user/isRoot'
        })
    },
    methods: {
        ...mapActions({
            fetch: 'user/fetch',
            prevPage: 'user/prevPage',
            nextPage: 'user/nextPage',
            search: 'user/search',
            gotoPage: 'user/gotoPage'
        }),
        ...mapMutations({
            toggleType: 'user/SET_USER_TYPE'
        })
    }
})
export default class User extends Vue {
    private isMaster: boolean = false

    private userList!: Array<iUserDetail>
    private isLoading: boolean = false
    private fetch!: () => Promise<boolean>

    private currentPage!: number
    private lastPage!: number
    private nextPage!: () => Promise<boolean>
    private prevPage!: () => Promise<boolean>
    private gotoPage!: (pageno: number) => Promise<boolean>

    private search!: (searchText: string) => Promise<boolean>
    private searchText: string = ''

    private isAdmin!: boolean
    private toggleType!: (isAdmin: boolean) => void

    mounted() {
        this.fetchRecord()
    }

    @Watch('isMaster')
    watchIsMaster(): void {
        this.toggleType(this.isMaster)
        this.fetch()
    }

    @Watch('searchText')
    searchTextChanged() {
        this.isLoading = true
        if (timer)
            clearTimeout(timer)

        timer = setTimeout(() => {
            this.search(this.searchText)
                .finally(() => {

                    this.isLoading = false
                })
        }, 300);
    }

    render(): VNode {
        return (<div class="py-8">
            <div class="container mx-auto px-2">
                <header class="text-gray-500 flex justify-between items-center mb-10">
                    <h2 class="text-3xl font-bold capitalize sm:truncate">User List</h2>
                    <div class="flex items-center space-x-3 ml-auto">
                        <a href="#" class="text-yellow-500 text-sm hover:text-gray-500 transition-colors whitespace-nowrap" onClick={(event: MouseEvent) => {
                            event.preventDefault()
                            this.fetchRecord()
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" class={{ "h-4 w-4 inline-block align-middle mr-1": true, "animate-spin": this.isLoading }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            refresh
                        </a>
                        <input type="search" placeholder="Search text" v-model={this.searchText} class="bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm" />
                        <Toggle class="flex-shrink-0" v-model={this.isMaster}>{this.isMaster ? 'Showing Admins' : 'Showing Users'}</Toggle>
                    </div>
                </header>
                {!this.isLoading ? [<div class="md:space-y-1">
                    {this.userList.map((user: iUserDetail) => (<UserCard isMaster={this.isMaster} user={user} />))}
                </div>,
                <Paginate current={this.currentPage} total={this.lastPage} onNext={() => this.nextPage()} onPrev={() => this.prevPage()} onGoto={(pageno: number) => this.gotoPage(pageno)} />] : null}
            </div>
        </div>)
    }

    fetchRecord() {
        this.isLoading = true
        this.fetch()
            .finally(() => {

                this.isLoading = false
                this.isMaster = this.isAdmin
            })
    }
}
