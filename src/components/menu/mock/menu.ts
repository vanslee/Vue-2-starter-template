export interface MenuStruct {
  title?: string
  icon?: string
  children: Array<MenuStruct>
  path: string
}
export const IndexLeftAside: Array<MenuStruct> = [
  {
    title: '关注',
    icon: 'el-icon-star-off',
    children: [],
    path: '',
  },
  {
    title: '综合',
    icon: 'el-icon-discover',
    children: [],
    path: 'all',
  },
  {
    title: '前端',
    icon: 'el-icon-monitor',
    children: [],
    path: 'front',
  },
  {
    title: '后端',
    icon: 'el-icon-s-platform',
    children: [],
    path: 'backend',
  },
  {
    title: '安卓',
    icon: 'el-icon-mobile',
    children: [],
    path: 'android',
  },
  {
    title: '运维',
    icon: 'el-icon-cpu',
    children: [],
    path: 'deployment',
  },
  {
    title: '开发工具',
    icon: 'el-icon-s-tools',
    children: [],
    path: 'develoment',
  },
  {
    title: '阅读',
    icon: 'el-icon-notebook-1',
    children: [],
    path: 'read',
  },
]
export const HeaderLeftMenu: Array<MenuStruct> = [
  {
    title: '首页',
    children: [],
    path: '/',
  },
  {
    title: '热搜',
    children: [],
    path: 'hot',
  },
  {
    title: '课程',
    children: [],
    path: 'cursors',
  },
  {
    title: '直播',
    children: [],
    path: '/live',
  },
  {
    title: '活动',
    children: [],
    path: '/events',
  },
  {
    title: '竞赛',
    children: [],
    path: 'match',
  },
  {
    title: '商城',
    children: [],
    path: 'stores',
  },
  {
    title: 'APP',
    children: [],
    path: '/app',
  },
  {
    title: '插件',
    children: [],
    path: 'plugins',
  },
]
export const HeaderRightMenu: Array<MenuStruct> = [
  {
    title: '会员',
    icon: 'el-icon-medal',
    children: [],
    path: '/vip',
  },
  {
    icon: 'el-icon-message-solid',
    children: [],
    path: '',
  },
  {
    title: '登录/注册',
    children: [],
    path: '/login',
  },
]
