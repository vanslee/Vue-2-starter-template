<script  lang="ts">
export default {
  setup() {
    return {

    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    changeTheme() {
      document.documentElement.setAttribute('data-theme', 'theme2')
    },
  },
}
</script>

<template>
  <div>
    <span class="header">asdasd</span>
    <el-button @click="changeTheme">
      切换主题
    </el-button>
  </div>
</template>

<style  scoped lang="scss">
@import "@/assets/styles/themes/default.scss";
@import "@/assets/styles/themes/mixin.scss";
.header {
    width: 100%;
    height: 100px;
    font-size: $font_medium;
    @include bg_color();
}
</style>
