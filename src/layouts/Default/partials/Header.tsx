import Dropdown from '@/components/common/Dropdown'
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
                <Dropdown>
                    <ul>
                        <li><router-link to={{ name: 'home' }} class="text-base font-medium text-gray-500 block px-3 py-1 hover:bg-yellow-300 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block align-middle mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                            </svg>
                            Back to Site
                        </router-link></li>
                        <li><router-link to={{ name: 'setting' }} class="text-base font-medium text-gray-500 block px-3 py-1 hover:bg-yellow-300 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block align-middle mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                            </svg>
                            Settings
                        </router-link></li>
                        <li><a href="#" class="text-base font-medium text-gray-500 block px-3 py-1 hover:bg-yellow-300 transition-colors" onClick={this.makeLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block align-middle mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
                            </svg>
                            Logout
                        </a></li>
                    </ul>
                </Dropdown>
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
