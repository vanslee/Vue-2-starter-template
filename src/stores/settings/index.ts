/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import { defineStore } from 'pinia'
import settings from '@/config'
const { tabsBar, logo, layout, header, themeBar } = settings
const theme: any = JSON.parse(localStorage.getItem('vue-admin-beautiful-theme') || '{}')
export const useSettingStore = defineStore('setting', {
  state: () => ({
    tabsBar: theme.tabsBar || tabsBar,
    logo,
    collapse: false,
    layout: theme.layout || layout,
    header: theme.header || header,
    device: 'desktop',
    themeBar,
  }),

  actions: {
    changeLayout(layout: string) {
      if (layout)
        this.layout = layout
    },
    changeHeader(header: string) {
      if (header)
        this.header = header
    },
    changeTabsBar(tabsBar: string) {
      if (tabsBar)
        this.tabsBar = tabsBar
    },
    changeCollapse() {
      this.collapse = !this.collapse
    },
    foldSideBar() {
      this.collapse = true
    },
    openSideBar() {
      this.collapse = false
    },
    toggleDevice(device: string) {
      this.device = device
    },
  },
})
