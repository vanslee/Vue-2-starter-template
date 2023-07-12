<script>
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      icons: [
        '&#xe608;',
        '&#xe651;',
        '&#xe610;',
        '&#xe744;',
        '&#xe718;',
        '&#xe6c6;',
      ],
    })
    return {
      ...state,
    }
  },
  computed: {},
  created() {},
  methods: {
    scrollToEnd() {
      this.$bus.$emit('scrollToEnd')
    },
  },
}
</script>

<template>
  <el-card class="left-aside">
    <nav v-for="icon in icons" :key="icon">
      <i class="iconfont icon" v-html="icon" />
    </nav>
  </el-card>
</template>

  <style scoped lang="scss">
  @import '@/assets/styles/themes/default.scss';
  i {
    cursor: pointer;
    color: $regular_color
  }
  .left-aside {
    margin-left: 10px;
    display: flex;
    justify-content: center;
  }
 nav {
  margin: 20px 0;
 }
  .iconfont {
    font-size: 2rem;
  }
  .icon {
    background-color: #fff;
    border: 1px solid black;
    border-radius: 50%;
  }
  </style>
