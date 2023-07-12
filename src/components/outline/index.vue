<script lang="ts">
export default {
  props: {
    direction: {
      type: String,
      default: 'ltr',
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    showVisible() {
      this.visible = true
    },
    handleClose() {
      this.visible = false
    },
  },
}
</script>

<template>
  <el-drawer
    :show-close="false"
    :visible="visible"
    :direction="direction"
    :before-close="handleClose"
  >
  目录
    <h1>111</h1>
    <h1>222</h1>
    <h1>333</h1>
    <h1>444</h1>
    <h1>555</h1>
  </el-drawer>
</template>

<style  scoped>
</style>
