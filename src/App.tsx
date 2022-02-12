import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue"

import Default from "./layouts/Default/index"
import Simple from "./layouts/Simple/index"
import StaticPage from "./layouts/StaticPage/index"

@Component
export default class App extends Vue {
  render(): VNode {

    return (<transition name="fade-transition">
      {this?.$route?.meta?.layout === 'default' ? (<Default />) : null}
      {this?.$route?.meta?.layout === 'simple' ? (<Simple />) : null}
      {this?.$route?.meta?.layout === 'StaticPage' ? <StaticPage /> : null}
    </transition>)
  }
}