import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Dashboard extends Vue {
  /**
   * Template pf the component
   * 
   * @returns VNode
   */
  render(): VNode {
    return (<div class="py-8">
      <div class="container mx-auto px-2">
        <header class="mb-10">
          <h2 class="text-3xl font-bold text-gray-500 capitalize sm:truncate">Dashboard</h2>
        </header>
      </div>
    </div>)
  }
}
