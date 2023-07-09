import type { RouteConfig } from 'vue-router'
/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import { defineStore } from 'pinia'
// import { convertRouter, filterAsyncRoutes } from '@/utils/handleRoutes'
export const useRouteStore = defineStore('routes', {
  state: () => ({
    routes: new Array<RouteConfig>(),
    partialRoutes: new Array<RouteConfig>(),
  }),
  actions: {

  },
})
