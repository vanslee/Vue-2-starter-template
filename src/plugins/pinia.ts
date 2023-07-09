import Vue from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { PiniaVuePlugin, createPinia } from 'pinia'
Vue.use(PiniaVuePlugin)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
export default pinia
