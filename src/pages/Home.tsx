import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
    render(): VNode {
        return (<div id="wrapper" class="bg-gray-800 flex flex-col justify-center items-center text-gray-500 min-h-screen relative overflow-hidden">
            <div class="logo w-48 mb-9">
                <router-link class="font-bold text-yellow-300" to={{ name: 'home' }}>
                    <img src="/img/logo.png" alt="Maharjan Construction" />
                </router-link>
            </div>
            <h1>Welcome to Maharjan Groups</h1>
            <p>Please <router-link to={{ name: 'login' }} class="text-white hover:text-yellow-300 transition-all">login</router-link> in access admin panel</p>
        </div>)
    }
}
