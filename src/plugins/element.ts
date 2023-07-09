import Vue from 'vue'
import 'element-ui/lib/theme-chalk/display.css'
import 'element-ui/lib/theme-chalk/index.css'
import { Button, Card, Divider, Image, Input, Link, Menu, MenuItem, Message, Pagination, Submenu, Timeline, TimelineItem } from 'element-ui'
Vue.use(Link)
Vue.use(Card)
Vue.use(Menu)
Vue.use(Input)
Vue.use(Image)
Vue.use(Divider)
Vue.use(Submenu)
Vue.use(Timeline)
Vue.use(MenuItem)
Vue.use(Pagination)
Vue.use(TimelineItem)
Vue.component(Button.name, Button)
Vue.component(Message.name, Message)
