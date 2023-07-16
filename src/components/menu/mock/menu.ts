export interface MenuStruct {
  title: string
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
    title: '写博客',
    icon: 'el-icon-notebook-1',
    path: '/write',
    children: [],
  },
  {
    title: '会员中心',
    icon: 'el-icon-trophy',
    path: '',
    children: [],
  },
  {
    title: '课程中心',
    icon: 'el-icon-trophy',
    path: '',
    children: [],
  },
  {
    title: '我的优惠',
    icon: 'el-icon-trophy',
    path: '',
    children: [],
  },
  {
    title: '我的报名',
    icon: 'el-icon-trophy',
    path: '',
    children: [],
  },
  {
    title: '我的足迹',
    icon: 'el-icon-trophy',
    path: '',
    children: [],
  },
]
export const UnderlineWord: Array<MenuStruct> = [
  {
    title: '复制',
    icon: 'el-icon-user',
    path: '',
    children: [],
  },
  {
    title: '马克笔',
    icon: 'el-icon-present',
    path: '',
    children: [],
  },
  {
    title: '波浪线',
    icon: 'el-icon-notebook-1',
    path: '',
    children: [],
  },
  {
    title: '直线',
    icon: 'el-icon-trophy',
    path: '',
    children: [],
  },
  {
    title: '写想法',
    icon: 'el-icon-trophy',
    path: '',
    children: [],
  },
]
export const ArticleDetails: Array<MenuStruct> = [
  {
    title: 'views',
    icon: 'el-icon-view',
    path: '',
    children: [],
  },
  {
    title: 'likes',
    icon: 'el-icon-orange',
    path: '',
    children: [],
  },
  {
    title: 'comments',
    icon: 'el-icon-chat-square',
    path: '',
    children: [],
  },
  {
    title: 'collects',
    icon: 'el-icon-trophy',
    path: '',
    children: [],
  },
]
export const CreatorDropdownItems: Array<MenuStruct> = [
  {
    title: '写文章',
    icon: 'el-icon-view',
    path: '/write',
    children: [],
  },
  {
    title: '发沸点',
    icon: 'el-icon-orange',
    path: '',
    children: [],
  },
  {
    title: '写笔记',
    icon: 'el-icon-chat-square',
    path: '',
    children: [],
  },
  {
    title: '写代码',
    icon: 'el-icon-trophy',
    path: '',
    children: [],
  },
  {
    title: '草稿箱',
    icon: 'el-icon-trophy',
    path: '',
    children: [],
  },
]
