import { VNode } from "vue"
import { Component, Vue } from "vue-property-decorator"

@Component
export default class Event extends Vue {
    render(): VNode {
        return <div></div>
    }
}