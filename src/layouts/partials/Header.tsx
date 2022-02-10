import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'

@Component({
    methods: {
        ...mapActions({
            logout: 'root/logout'
        })
    }
})
export default class Header extends Vue {
    private logout!: () => Promise<boolean>

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<header id="header" class="relative bg-gray-900 py-6">
            <div class="container flex justify-between items-center px-2 mx-auto">
                <div class="logo w-28">
                    <router-link class="font-bold text-yellow-300" to={{ name: 'home' }}>
                        <img src="/img/logo.png" alt="Maharjan Construction" />
                    </router-link>
                </div>
                <a href="#" class="text-base font-medium text-gray-500 hover:text-yellow-300" onClick={this.makeLogout}>Logout</a>
            </div>
        </header>)
    }

    /**
     * User logout
     *
     * @param event
     *
     * @returns void
     */
    makeLogout(event: MouseEvent): void {
        event.preventDefault()

        this.logout()
            .then(() => {
                this.$router.push({ name: 'login' })
            })
    }
}
