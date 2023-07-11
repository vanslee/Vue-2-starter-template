<script  lang="ts">
export default {
  setup() {
    return {
      a: 1,
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    changeTheme() {
      this.a++
      if (this.a % 2 === 0)
        document.documentElement.setAttribute('data-theme', 'theme2')
      else
        document.documentElement.setAttribute('data-theme', 'theme1')
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
