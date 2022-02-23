import { VNode } from "vue"
import { Component, Vue } from "vue-property-decorator"
import { mapGetters } from "vuex"

import { iEvent } from "@/interfaces/event"
import { formatDate } from "@/plugin/filter"

@Component({
    computed: {
        ...mapGetters({
            list: 'event/list'
        })
    }
})
export default class Event extends Vue {
    private isLoading: boolean = false
    private list!: Array<iEvent>

    mounted() {
        this.$store.dispatch('event/fetchEvent')
    }

    render(): VNode {
        return <div>
            <div class="page-header">
                <div class="container">
                    <h1>Events</h1>
                </div>
            </div>
            <div class="container">
                {this.list.map((event: iEvent) => <div>
                    <h2><router-link to={{ name: 'event.single', params: { slug: event.slug } }}>{event.name}</router-link></h2>
                    <em>Ends on {formatDate(event.end)}</em>
                </div>)}
            </div>
        </div>
    }
}