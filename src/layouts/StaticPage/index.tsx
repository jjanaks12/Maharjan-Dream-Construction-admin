import { iPage } from '@/interfaces/page'
import { formatDate } from '@/plugin/filter'
import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

@Component({
    computed: {
        ...mapGetters({
            page: 'page/get'
        })
    }
})
export default class StaticPage extends Vue {
    private page!: iPage

    render(): VNode {
        return <div id="wrapper" class="static-page">
            <header id="header">
                <div class="container">
                    <div class="header__info">
                        <div class="logo">
                            <router-link to={{ name: 'home' }}>
                                <img src="/img/logo01.png" alt="Maharjan Construction" />
                            </router-link>
                        </div>
                        <div class="page-header">
                            <h1>{this.page.title}</h1>
                            <time datetime={formatDate(this.page.updated_at, 'YYYY-MM-DD HH:mm')}>{formatDate(this.page.updated_at)}</time>
                        </div>
                    </div>
                </div>
            </header>
            <main id="main">
                <div class="container">
                    <router-view />
                </div>
            </main>
            <footer id="footer">
                <div class="container">
                    <div class="footer__info">
                        <strong>
                            <svg class="stroke-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                            <span>VAT N0:609917961</span>
                        </strong>
                        <em class="footer__copyright">&copy; Copyright {(new Date()).getFullYear()} <router-link to={{ name: 'home' }}>Maharjan Dreams</router-link>. All rights reserved.</em>
                        <strong>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <address>Tarkeshwor-11, Kathmandu</address>
                        </strong>
                    </div>
                </div>
            </footer>
        </div>
    }
}
