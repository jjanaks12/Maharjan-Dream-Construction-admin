import VueRouter, { Route } from 'vue-router'

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter,
    $route: Route
  }
}

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.css'
declare module '*.png'