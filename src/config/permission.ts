/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import VabProgress from 'nprogress'
import router from '@/router'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/stores/user'
import getPageTitle from '@/utils/pageTitle'
import settings from '@/config/index'
VabProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
})
router.beforeResolve(async (to, from, next) => {
  if (settings.progressBar)
    VabProgress.start()
  const userStore = useUserStore()

  let hasLogin = userStore.hasLogin
  if (!settings.loginInterception)
    hasLogin = true

  if (hasLogin) {
    if (to.path === '/login') {
      next({ path: '/' })
      if (settings.progressBar)
        VabProgress.done()
    }
    else {
      const hasPermissions = userStore.permissions && userStore.permissions.length > 0
      if (hasPermissions)
        next()

      // else {
      //   try {
      //     let permissions = new Array<string>()
      //     if (!settings.loginInterception) {
      //       // settings.js loginInterception为false时，创建虚拟权限
      //       userStore.permissions = ['admin']
      //       permissions = ['admin']
      //     }
      //     else {
      //       permissions = await userStore.getUserInfo()
      //     }
      //     let accessRoutes = []
      //     const routeStore = useRouteStore()
      //     if (settings.authentication === 'intelligence')
      //       accessRoutes = await routeStore.setRoutes(permissions)

      //     else if (settings.authentication === 'all')
      //       accessRoutes = await routeStore.setAllRoutes()
      //     accessRoutes.forEach((item: RouteConfig) => {
      //       router.addRoute(item)
      //     })
      //     next({ })
      //   }
      //   catch {
      //     await userStore.resetAccessToken()
      //     if (settings.progressBar)
      //       VabProgress.done()
      //   }
      // }
    }
  }
  else {
    if (settings.routesWhiteList.includes(to.path)) {
      next()
    }
    else {
      if (settings.recordRoute)
        next(`/login?redirect=${to.path}`)

      else
        next('/login')

      if (settings.progressBar)
        VabProgress.done()
    }
  }
  document.title = getPageTitle(settings.to.meta.title)
})
router.afterEach(() => {
  if (settings.progressBar)
    VabProgress.done()
})
