import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'

// plugins
import '@/plugin/validation'

// components
import fallback from '@/layouts/Default'
import simple from '@/layouts/Simple'

Vue.config.productionTip = false

Vue.component('default', fallback)
Vue.component('simple', simple)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
