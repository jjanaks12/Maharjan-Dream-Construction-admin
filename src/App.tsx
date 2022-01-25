import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue"
import Default from "./layouts/Default"
import Simple from "./layouts/Simple"

@Component
export default class App extends Vue {
  render(): VNode {

    return (<transition name="fade-transition">
      {this?.$route?.meta?.layout === 'default' ? (<Default />) : (<Simple />)}
    </transition>)
  }
}