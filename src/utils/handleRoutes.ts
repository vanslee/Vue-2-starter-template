import type { RouteConfig } from 'vue-router/types/router'

/**
 * @author vanslee
 * @description all模式渲染后端返回路由
 * @param constantRoutes
 * @returns {*}
 */
// export function convertRouter(asyncRoutes: Array<RouteConfigSingleView>): Array<RouteConfigSingleView> {
//   return asyncRoutes.map((route) => {
//     if (route.component) {
//       if (route.component === 'Layout') {
//         route.component = resolve => require(['@/layout/admin'], resolve)
//       }
//       // else if (route.component === 'EmptyLayout') {
//       //   route.component = (resolve) =>
//       //     require(['@/layout/admin/EmptyLayout'], resolve)
//       // }
//       else {
//         const index = route.component.indexOf('views')
//         const path
//           = index > 0 ? route.component.slice(index) : `views/${route.component}`
//         route.component = resolve => require([`@/${path}`], resolve)
//       }
//     }
//     if (route.children && route.children.length)
//       route.children = convertRouter(route.children)
//     if (route.children && route.children.length === 0)
//       delete route.children
//     return route
//   })
// }

/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description 判断当前路由是否包含权限
 * @param permissions
 * @param route
 * @returns {boolean|*}
 */
function hasPermission(permissions: Array<string>, route: RouteConfig): boolean {
  if (route.meta && route.meta.permissions)
    return permissions.some(role => route.meta?.permissions.includes(role))

  else
    return true
}

/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description intelligence模式根据permissions数组拦截路由
 * @param routes
 * @param permissions
 * @returns {[]}
 */
export function filterAsyncRoutes(routes: Array<RouteConfig>, permissions: Array<string>): Array<RouteConfig> {
  const finallyRoutes: Array<RouteConfig> = []
  routes.forEach((route) => {
    const item = { ...route }
    if (hasPermission(permissions, item)) {
      if (item.children)
        item.children = filterAsyncRoutes(item.children, permissions)

      finallyRoutes.push(item)
    }
  })
  return finallyRoutes
}