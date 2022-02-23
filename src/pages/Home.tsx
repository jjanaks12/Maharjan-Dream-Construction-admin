import { iUserDetail } from '@/interfaces/auth'
import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

@Component({
    computed: {
        ...mapGetters({
            loggedinUser: 'root/getLoggedinUser'
        })
    }
})
export default class Home extends Vue {
    private loggedinUser!: iUserDetail

    get isLoggedin(): boolean {
        return (Object.keys(this.loggedinUser).length > 0)
    }

    render(): VNode {
        return (<div id="wrapper" class="bg-gray-800 flex flex-col justify-center items-center text-gray-500 min-h-screen relative overflow-hidden">
            <div class="logo w-48 mb-9">
                <router-link class="font-bold text-yellow-300" to={{ name: 'home' }}>
                    <img src="/img/logo.png" alt="Maharjan Construction" />
                </router-link>
            </div>
            <h1 class="text-2xl">Welcome to Maharjan Groups</h1>
            <div class="pt-3">
                <ul class="flex space-x-3">
                    <li><router-link to={{ name: 'event.list' }} class="text-white hover:text-yellow-300 transition-all">Events</router-link></li>
                    <li><router-link to="/privacy_policy" class="text-white hover:text-yellow-300 transition-all">Privacy Policy</router-link></li>
                    <li><router-link to="/terms_and_conditions" class="text-white hover:text-yellow-300 transition-all">Terms and Conditions</router-link></li>
                    {
                        this.isLoggedin
                            ? [
                                <li><router-link to={{ name: 'dashboard' }} class="text-white hover:text-yellow-300 transition-all">Dashboard</router-link></li>
                            ]
                            : <li><router-link to={{ name: 'login' }} class="text-white hover:text-yellow-300 transition-all">Login</router-link></li>
                    }
                </ul>
            </div>
        </div>)
    }
}
