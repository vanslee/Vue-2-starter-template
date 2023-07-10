import Vue from 'vue'
import type { RouteConfig } from 'vue-router'
import VueRouter from 'vue-router'
import { normalRoute } from './modules/normal'
import { adminRoute } from './modules/admin'
import settings from '@/config'

Vue.use(VueRouter)
export const constantRoutes: RouteConfig[] = [
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/test.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: () => import('@/views/login/index.vue'),
  },

  {
    path: '/loading/:tk',
    name: 'Loading',
    meta: {
      title: '加载',
      hidden: true,
    },
    component: () => import('@/views/error-page/loading.vue'),
    props: route => ({ query: route.query.tk }),
  },
  {
    path: '/401',
    name: '401',
    meta: {
      hidden: true,
    },
    component: () => import('@/views/error-page/401.vue'),
  },
  {
    path: '/404',
    meta: {
      hidden: true,
    },
    name: '404',
    component: () => import('@/views/error-page/404.vue'),
  },
  // {
  //   path: '*',
  //   meta: {
  //     requireAuth: false
  //   },
  //   component: () => import('@/views/error-page/404.vue')
  // },
]
const routes = [...constantRoutes, ...adminRoute, ...normalRoute]
const router = new VueRouter({
  base: settings.publicPath,
  mode: settings.routerMode,
  routes,
})
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return Promise.resolve(originalPush.call(this, location)).catch((err: any) => err)
}

export default router
