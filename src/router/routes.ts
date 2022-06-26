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
  path: '/user/:id?',
  name: 'users',
  component: () => import('@/pages/User'),
  meta: {
    layout: 'default',
    type: 'authorized'
  }
}, {
  path: '/realstate/:id?',
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
  path: '/rent/:id?',
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
  path: '/occasions/:id?',
  name: 'events',
  component: () => import('@/pages/Events'),
  meta: {
    layout: 'default',
    type: 'authorized'
  }
}, {
  path: '/pages/:id?',
  name: 'pages',
  component: () => import('@/pages/Page'),
  meta: {
    layout: 'default',
    type: 'authorized'
  }
}, {
  path: '/order/:id?',
  name: 'orders',
  component: () => import('@/pages/Order'),
  meta: {
    layout: 'default',
    type: 'authorized'
  }
}, {
  path: '/events',
  name: 'event.list',
  component: () => import('@/pages/Event'),
  meta: {
    layout: 'StaticPage',
    type: 'unauthorized'
  }
}, {
  path: '/event/:slug',
  name: 'event.single',
  component: () => import('@/pages/EventSingle'),
  meta: {
    layout: 'StaticPage',
    type: 'unauthorized'
  }
}, {
  path: '/:slug',
  name: 'single_page',
  component: () => import('@/pages/SinglePage'),
  meta: {
    layout: 'StaticPage',
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