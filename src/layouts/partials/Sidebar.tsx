import { iMenu } from '@/interfaces/app'
import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'

import menuList from './menuList'

@Component({
  methods: {
    ...mapActions({
      logout: 'root/logout'
    })
  }
})
export default class Sidebar extends Vue {
  private logout!: () => Promise<boolean>

  /**
   * @returns VNode
   */
  render(): VNode {
    return (<aside id="sidebar" class="navbar-light bg-light">
      <router-link class="navbar-brand" to={{ name: 'home' }}>Maharjan Construction</router-link>
      <ul class="main__menu navbar-nav">
        {menuList.map((menu: iMenu) => (<li class="nav-item">
          <router-link class={{ 'nav-link': true, 'active': this.$route.name === menu.path }} to={{ name: menu.path }}>{menu.name}</router-link>
        </li>))}
      </ul>
      <a class="logout" href="#" onClick={this.makeLogout}>logout</a>
    </aside>)
  }

  /**
   * User logout
   * 
   * @param event 
   * 
   * @returns void
   */
  makeLogout(event: MouseEvent): void {
    event.preventDefault()

    this.logout()
      .then(() => {
        alert('logging out')
      })
  }
}
