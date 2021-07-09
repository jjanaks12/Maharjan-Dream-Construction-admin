import '@/assets/css/main.css'

import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import AppHeader from '@/layouts/partials/Header'
import { mapGetters } from 'vuex'
import { iUserDetail } from '@/interfaces/auth'

@Component({
  computed: {
    ...mapGetters({
      userDetail: 'root/getLoggedinUser'
    })
  }
})
export default class Default extends Vue {
  private userDetail!: iUserDetail | null

  /**
   * Mounted hooks
   */
  mounted() {
    if (this.userDetail && Object.keys(this.userDetail).length === 0) {
      // this.$store.dispatch('root/fetchLogginedUser')
    }
  }

  /**
   * Template pf the component
   * 
   * @returns VNode
   */
  render(): VNode {
    return (<div id="wrapper" class="bg-gray-800 text-gray-500 min-h-screen relative overflow-hidden">
      <AppHeader />
      <main id="main">
        <transition name="slide-fade" mode="out-in">
          <router-view />
        </transition>
      </main>
    </div>)
  }
}
