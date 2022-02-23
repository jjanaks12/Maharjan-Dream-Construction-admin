import { VNode } from "vue"
import { Component, Vue } from "vue-property-decorator"
import { mapGetters } from "vuex"

import { iUserDetail } from "@/interfaces/auth"

@Component({
    computed: {
        ...mapGetters({
            loggedinUser: 'root/getLoggedinUser'
        })
    }
})
export default class AppHeader extends Vue {
    private loggedinUser!: iUserDetail

    get isLoggedin(): boolean {
        return (Object.keys(this.loggedinUser).length > 0)
    }

    render(): VNode {
        return <header id="header">
            <div class="container">
                <div class="header__info">
                    <div class="logo">
                        <router-link to={{ name: 'home' }}>
                            <img src="/img/logo01.png" alt="Maharjan Construction" />
                        </router-link>
                    </div>
                    <nav id="nav">
                        <ul class="navbar">
                            {this.isLoggedin
                                ? [
                                    <li><router-link to={{ name: "dashboard" }}>Dashboard</router-link></li>
                                ]
                                : <li><router-link to={{ name: "login" }}>Login</router-link></li>}
                            <li><router-link to={{ name: 'event.list' }}>Events</router-link></li>
                            <li><router-link to="/privacy_policy">Privacy Policy</router-link></li>
                            <li><router-link to="/terms_and_conditions">Terms and Conditions</router-link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    }
}