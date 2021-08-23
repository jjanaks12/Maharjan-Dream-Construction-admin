import { newRouteConfig } from '@/interfaces/app'

const routes: Array<newRouteConfig> = [{
  path: '/',
  name: 'home',
  component: () => import('@/pages/Home'),
  meta: {
    layout: 'simple',
    type: 'unauthorized'
  }
}, {
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('@/pages/Dashboard'),
  meta: {
    layout: 'default',
    type: 'authorized'
  }
}, {
  path: '/login',
  name: 'login',
  component: () => import('@/pages/Login'),
  meta: {
    layout: 'simple',
    type: 'unauthorized'
  }
}, {
  path: '/register',
  name: 'register',
  component: () => import('@/pages/Login'),
  meta: {
    layout: 'simple',
    type: 'unauthorized'
  }
}, {
  path: '/login',
  name: 'forgot-password',
  component: () => import('@/pages/Login'),
  meta: {
    layout: 'simple',
    type: 'unauthorized'
  }
}, {
  path: '/user/:uuid?',
  name: 'user',
  component: () => import('@/pages/User'),
  meta: {
    layout: 'default',
    type: 'authorized'
  }
}, {
  path: '/notification',
  name: 'notification',
  component: () => import('@/pages/Notification'),
  meta: {
    layout: 'default',
    type: 'authorized'
  }
}, {
  path: '/realstate',
  name: 'realstate',
  component: () => import('@/pages/RealState'),
  meta: {
    layout: 'default',
    type: 'authorized'
  }
}, {
  path: '/material',
  name: 'material',
  component: () => import('@/pages/Material'),
  meta: {
    layout: 'default',
    type: 'authorized'
  }
}, {
  path: '/setting',
  name: 'setting',
  component: () => import('@/pages/Settings'),
  meta: {
    layout: 'default',
    type: 'authorized'
  }
}, {
  path: '/rent',
  name: 'rent',
  component: () => import('@/pages/Rent'),
  meta: {
    layout: 'default',
    type: 'authorized'
  }
}, {
  path: '/resturant',
  name: 'resturant',
  component: () => import('@/pages/Resturant'),
  meta: {
    layout: 'default',
    type: 'authorized'
  }
}, {
  path: '/training/:id?',
  name: 'training',
  component: () => import('@/pages/Training'),
  meta: {
    layout: 'default',
    type: 'authorized'
  }
}, {
  path: '/:slug',
  name: 'single_page',
  component: () => import('@/pages/SinglePage'),
  meta: {
    layout: 'simple',
    type: 'unauthorized'
  }
}, {
  path: '*',
  name: '404',
  component: () => import('@/pages/NotFound'),
  meta: {
    layout: 'simple',
    type: 'none'
  }
}]

export default routes