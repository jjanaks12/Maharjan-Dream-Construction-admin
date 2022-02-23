import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import AppFooter from './partials/Footer'
import AppHeader from './partials/Header'

@Component
export default class StaticPage extends Vue {

    render(): VNode {
        return <div id="wrapper" class="static-page">
            <AppHeader />
            <main id="main">
                <transition name="slide-fade" mode="out-in">
                    <router-view />
                </transition>
            </main>
            <AppFooter />
        </div>
    }
}
