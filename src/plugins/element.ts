import Vue from 'vue'
import 'element-ui/lib/theme-chalk/display.css'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Button,
  Card,
  Divider,
  Drawer,
  Image,
  Input,
  Link,
  Menu,
  MenuItem,
  MenuItemGroup,
  Message,
  Pagination,
  RadioButton,
  RadioGroup,
  Submenu,
  Timeline,
  TimelineItem,
} from 'element-ui'
Vue.use(Link)
Vue.use(Card)
Vue.use(Menu)
Vue.use(Input)
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
