import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SinglePage extends Vue {
    render(): VNode {
        return (<div class="py-8">

        </div>)
    }
}
