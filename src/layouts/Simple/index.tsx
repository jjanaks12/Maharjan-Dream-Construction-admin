import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Simple extends Vue {
  render(): VNode {
    return <router-view />
  }
}
