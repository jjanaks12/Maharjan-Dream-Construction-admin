import { iMenu } from '@/interfaces/app'
import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'

import menuList from './menuList'

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
                <router-link class="font-bold text-yellow-300" to={{ name: 'home' }}>Maharjan Construction</router-link>
                <nav class="hidden md:flex">
                    <ul class="md:space-x-10 flex">
                        {menuList.map((menu: iMenu) => (<li>
                            <router-link class={{ 'text-base font-medium hover:text-yellow-300': true, 'text-gray-500': this.$route.name !== menu.path, 'text-yellow-300': this.$route.name === menu.path }} to={{ name: menu.path }}>{menu.name}</router-link>
                        </li>))}
                        <li><a href="#" class="text-base font-medium text-gray-500 hover:text-yellow-300" onClick={this.makeLogout}>Logout</a></li>
                    </ul>
                </nav>
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
