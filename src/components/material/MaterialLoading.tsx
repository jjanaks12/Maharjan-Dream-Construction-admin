import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue/types/umd"

@Component
export default class MaterialLoading extends Vue {
    render(): VNode {
        return (<div>loading...</div>)
    }
}