import { VNode } from "vue";
import { Component, Vue } from "vue-property-decorator"

@Component
export default class PageLoading extends Vue {
    render():VNode {
        return <div>loading...</div>
    }
}