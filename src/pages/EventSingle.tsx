import { VNode } from "vue"
import { Component, Vue } from "vue-property-decorator"

@Component
export default class EventSingle extends Vue {
    render(): VNode {
        return <div>
            test
        </div>
    }
}