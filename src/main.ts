import Vue from 'vue'
import App from '@/App.vue'
import '@/assets/iconfont/iconfont.css'
import '@/plugins/element'
import '@/plugins/lazyload'
import '@/plugins/markdown'
import pinia from '@/plugins/pinia'
import 'virtual:windi.css'
import router from '@/router'
/**
 * 事件总线
 */
export const EventBus = new Vue()
Vue.prototype.$bus = EventBus // 将EventBus实例挂载到Vue原型上
Vue.config.productionTip = false
Vue.config.devtools = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  pinia,
  render: h => h(App),
})
