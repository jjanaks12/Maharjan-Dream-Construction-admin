import { iPage, pageInit } from '@/interfaces/page'
import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
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
    private isLoading: boolean = false

    private fetch!: (slug: string) => Promise<iPage>

    async mounted() {
        this.isLoading = true

        await this.fetch(this.$route.params.slug)

        this.isLoading = false
    }

    render(): VNode {
        return this.isLoading
            ? <div>loading...</div>
            : this.page
                ? <article id="content" domPropsInnerHTML={this.page.description}></article>
                : <div>test</div>
    }
}
