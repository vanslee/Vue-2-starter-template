import Vue from 'vue'
import 'element-ui/lib/theme-chalk/display.css'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Button,
  Card,
  Col,
  Dialog,
  Divider,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Image,
  Input,
  Link,
  Loading,
  Menu,
  MenuItem,
  MenuItemGroup,
  Message,
  Option,
  Pagination,
  Popover,
  RadioButton,
  RadioGroup,
  Row,
  Select,
  Submenu,
  Switch,
  Tag,
  Timeline,
  TimelineItem,
  Tooltip,
  Upload,
} from 'element-ui'
Vue.use(Row)
Vue.use(Col)
Vue.use(Link)
Vue.use(Form)
Vue.use(Option)
Vue.use(Tag)
Vue.use(FormItem)
Vue.use(Card)
Vue.use(Upload)
Vue.use(Menu)
Vue.use(Input)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Select)
Vue.use(Switch)
Vue.use(Popover)
Vue.use(Dialog)
Vue.use(Tooltip)
Vue.use(Image)
Vue.use(Drawer)
Vue.use(Divider)
Vue.use(Timeline)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(RadioGroup)
Vue.use(Pagination)
Vue.use(RadioButton)
Vue.use(TimelineItem)
Vue.use(MenuItemGroup)
Vue.component(Button.name, Button)
Vue.component(Message.name, Message)
Vue.use(Loading.directive)
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
