import { iPage, pageInit } from '@/interfaces/page'
import Loading from '@/layouts/StaticPage/partials/Loading'
import { formatDate } from '@/plugin/filter'
import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

@Component({
    computed: {
        ...mapGetters({
            page: 'page/get'
        })
    },
    methods: {
        ...mapActions({
            fetch: 'page/getPage'
        })
    }
})
export default class SinglePage extends Vue {
    private page!: iPage
    private hasContent: boolean = true
    private isLoading: boolean = false

    private fetch!: (slug: string) => Promise<iPage>

    async mounted() {
        this.fetchPage()
    }

    @Watch('$route', { deep: true })
    routeChanged() {
        this.fetchPage()
    }

    render(): VNode {
        return this.isLoading
            ? <Loading />
            : Object.keys(this.page).length > 0
                ? <div>
                    <div class="page-header">
                        <div class="container">
                            <h1>{this.page.title}</h1>
                            <time datetime={formatDate(this.page.updated_at, 'YYYY-MM-DD HH:mm')}>{formatDate(this.page.updated_at)}</time>
                        </div>
                    </div>
                    <div class="container">
                        <article id="content" domPropsInnerHTML={this.page.description}></article>
                    </div>
                </div>
                : this.notFound()
    }

    async fetchPage() {
        this.isLoading = true

        await this.fetch(this.$route.params.slug)

        this.hasContent = Object.keys(this.page).length > 0
        this.isLoading = false
    }

    notFound(): VNode {
        if (!this.hasContent)
            this.$router.push({ name: '404' })

        return <div></div>
    }
}
