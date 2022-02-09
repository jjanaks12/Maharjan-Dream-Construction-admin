import '@/assets/css/main.css'

import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import AppHeader from '@/layouts/partials/Header'
import Notification from '@/layouts/partials/Notification'

@Component
export default class Default extends Vue {

  /**
   * Template pf the component
   * 
   * @returns VNode
   */
  render(): VNode {
    return (<div id="wrapper">
      <AppHeader />
      <main id="main">
        <transition name="slide-fade" mode="out-in">
          <router-view class="flex-grow" />
        </transition>
        <aside id="sidebar">
          <Notification />
        </aside>
      </main>
    </div>)
  }
}
