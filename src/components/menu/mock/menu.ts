export interface MenuStruct {
  title?: string
  icon?: string
  children: Array<MenuStruct>
  path?: string
  auth?: Boolean
}
export const IndexLeftAside: Array<MenuStruct> = [
  {
    title: '关注',
    icon: 'el-icon-star-off',
    children: [],
    path: '',
    auth: false,
  },
  {
    title: '综合',
    icon: 'el-icon-discover',
    children: [],
    path: 'all',
    auth: false,
  },
  {
    title: '前端',
    icon: 'el-icon-monitor',
    children: [],
    path: 'front',
    auth: false,
  },
  {
    title: '后端',
    icon: 'el-icon-s-platform',
    children: [],
    path: 'backend',
    auth: false,
  },
  {
    title: '安卓',
    icon: 'el-icon-mobile',
    children: [],
    path: 'android',
    auth: false,
  },
  {
    title: '运维',
    icon: 'el-icon-cpu',
    children: [],
    path: 'deployment',
    auth: false,
  },
  {
    title: '开发工具',
    icon: 'el-icon-s-tools',
    children: [],
    path: 'develoment',
    auth: false,
  },
  {
    title: '阅读',
    icon: 'el-icon-notebook-1',
    children: [],
    path: 'read',
    auth: false,
  },
]
export const HeaderLeftMenu: Array<MenuStruct> = [
  {
    title: '首页',
    children: [],
    path: '/',
    auth: false,
  },
  {
    title: '热搜',
    children: [],
    path: 'hot',
    auth: false,
  },
  {
    title: '课程',
    children: [],
    path: 'cursors',
    auth: false,
  },
  {
    title: '直播',
    children: [],
    path: '/live',
    auth: false,
  },
  {
    title: '活动',
    children: [],
    path: '/events',
    auth: false,
  },
  {
    title: '竞赛',
    children: [],
    path: 'match',
    auth: false,
  },
  {
    title: '商城',
    children: [],
    path: 'stores',
    auth: false,
  },
  {
    title: 'APP',
    children: [],
    path: '/app',
    auth: false,
  },
  {
    title: '插件',
    children: [],
    path: 'plugins',
    auth: false,
  },
]
export const HeaderRightMenu: Array<MenuStruct> = [
  {
    title: '会员',
    icon: 'el-icon-medal',
    children: [],
    path: '/vip',
    auth: false,
  },
  {
    title: '登录/注册',
    children: [],
    path: '/login',
    auth: true,
  },
]
export const ToolTips: Array<MenuStruct> = [
  {
    title: '我的主页',
    icon: 'el-icon-user',
    path: '',
    children: [],
  },
  {
    title: '成长福利',
    icon: 'el-icon-present',
    path: '',
    children: [],
  },
  {
    title: '闪念笔记',
    icon: 'el-icon-notebook-1',
    path: '',
    children: [],
  },
  {
    title: '会员中心',
    icon: 'el-icon-trophy',
    path: '',
    children: [],
  },
]
