import { VNode } from "vue";
import { Component, Vue } from "vue-property-decorator"

@Component
export default class EventLoading extends Vue {
    render():VNode {
        return <div>loading...</div>
    }
}