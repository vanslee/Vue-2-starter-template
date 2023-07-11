export interface MenuStruct {
  title?: string
  icon?: string
  children: Array<MenuStruct>
}
export const IndexLeftAside: Array<MenuStruct> = [
  {
    title: '关注',
    icon: 'el-icon-star-off',
    children: [],
  },
  {
    title: '综合',
    icon: 'el-icon-discover',
    children: [],
  },
  {
    title: '前端',
    icon: 'el-icon-monitor',
    children: [],
  },
  {
    title: '后端',
    icon: 'el-icon-s-platform',
    children: [],
  },
  {
    title: '安卓',
    icon: 'el-icon-mobile',
    children: [],
  },
  {
    title: '运维',
    icon: 'el-icon-cpu',
    children: [],
  },
  {
    title: '开发工具',
    icon: 'el-icon-s-tools',
    children: [],
  },
  {
    title: '阅读',
    icon: 'el-icon-notebook-1',
    children: [],
  },
]
export const HeaderLeftMenu: Array<MenuStruct> = [
  {
    title: '首页',
    children: [],
  },
  {
    title: '热搜',
    children: [],
  },
  {
    title: '课程',
    children: [],
  },
  {
    title: '直播',
    children: [],
  },
  {
    title: '活动',
    children: [],
  },
  {
    title: '竞赛',
    children: [],
  },
  {
    title: '商城',
    children: [],
  },
  {
    title: 'APP',
    children: [],
  },
  {
    title: '插件',
    children: [],
  },
]
export const HeaderRightMenu: Array<MenuStruct> = [
  {
    title: '会员',
    icon: 'el-icon-medal',
    children: [],
  },
  {
    icon: 'el-icon-message-solid',
    children: [],
  },
  {
    title: '登录/注册',
    children: [],
  },
]
