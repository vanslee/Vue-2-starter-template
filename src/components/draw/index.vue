<script  lang='ts'>
import { reactive } from 'vue'
import MenuVue from '@/components/menu/Menu.vue'
import type { MenuStruct } from '@/components/menu/mock/menu'
export default {
  components: {
    MenuVue,
  },
  props: {
    direction: {
      type: String,
      default: 'ltr',
    },
    data: {
      type: Array<MenuStruct>,
      dafault: () => [],
    },
  },
  setup() {
    const state = reactive({
      drawer: false,
    })
    return {
      state,
    }
  },
  methods: {
    handleClose() {
      this.state.drawer = false
    },
    showVisible() {
      this.state.drawer = true
    },
  },
}
</script>

<template>
  <el-drawer
    :show-close="false"
    :visible="state.drawer"
    :direction="direction"
    :before-close="handleClose"
  >
    <MenuVue :data="data" />
  </el-drawer>
</template>

<style scoped>

</style>
