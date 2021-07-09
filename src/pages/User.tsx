import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import Toggle from '@/components/common/Toggle'
import UserCard from '@/components/user/UserCard'
import { iUserDetail } from '@/interfaces/auth'

@Component({
    computed: {
        ...mapGetters({
            userList: 'user/getUserList'
        })
    }
})
export default class User extends Vue {
    private userList!: Array<iUserDetail>
    private isMaster: boolean = true

    mounted() {
        this.$store.dispatch('user/fetchUser')
    }

    @Watch('isMaster')
    watchIsMaster(): void {
        this.$store.dispatch('user/fetchUser', this.isMaster)
    }

    render(): VNode {
        return (<div class="py-8">
            <div class="container mx-auto px-2">
                <header class="text-gray-500 flex justify-between items-center mb-10">
                    <h2 class="text-3xl font-bold capitalize sm:truncate">User List</h2>
                    <Toggle v-model={this.isMaster}>{this.isMaster ? 'Showing Admins' : 'Showing Users'}</Toggle>
                </header>
                <transition-group tag="div" name="fade-in" class="md:space-y-1">
                    {this.userList.map((user: iUserDetail, index: number) => (<UserCard user={user} key={user.id} style={{ '--transition-delay': index * 0.3 + 's' }} />))}
                </transition-group>
            </div>
        </div>)
    }
}
