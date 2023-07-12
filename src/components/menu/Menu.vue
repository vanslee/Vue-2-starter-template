<script  lang='ts'>
import { reactive } from 'vue'
import type { MenuStruct } from './mock/menu'
export default {
  props: {
    data: {
      type: Array<MenuStruct>,
      default: () => [],
    },
    mode: {
      type: String,
      default: 'vertical',
    },
  },
  setup() {
    const state = reactive({
      isCollapse: false,
    })
    return {
      state,
    }
  },
  methods: {
    click() {
      this.state.isCollapse = !this.state.isCollapse
      console.error(this.state.isCollapse)
    },
    handleOpen(key: string, keyPath: string) {
      console.error(key, keyPath)
    },
    handleClose(key: string, keyPath: string) {
      console.error(key, keyPath)
    },
  },
}
</script>

<template>
  <div>
    <el-menu :router="true" :mode="mode" :collapse-transition="false" default-active="1" class="el-menu-vertical-demo" :collapse="state.isCollapse" @open="handleOpen" @close="handleClose">
      <el-menu-item v-for="menu in data" :key="menu.title" :index="menu.path">
        <i :class="menu.icon" />
        <span>{{ menu.title }}</span>
        <el-menu-item-group v-if="menu.children?.length > 0">
          <el-menu-item v-for="sub in menu.children" :key="sub.title">
            <template #title>
              <i :class="menu.icon" />
              <span>{{ menu.title }}</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-menu-item>
    </el-menu>
  </div>
</template>
