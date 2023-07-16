<script>
import { CreatorDropdownItems } from '@/components/menu/mock/menu.ts'
export default {
  data() {
    return {
      CreatorDropdownItems,
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    jumpPage(path) {
      this.$router.push({ path })
    },

  },
}
</script>

<template>
  <el-dropdown trigger="click">
    <el-button type="primary" class="el-dropdown-link">
      创作者中心<i class="el-icon-arrow-down el-icon--right" />
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <div style="display: flex;" dropdown-menu>
          <nav v-for="item in CreatorDropdownItems" :key="item.title" class="dropdown-items">
            <i style="cursor: pointer;" :class="item.icon" class="item-icon" @click="jumpPage(item.path)" />
            <span class="item-title">
              {{ item.title }}
            </span>
          </nav>
        </div>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style  scoped lang="scss">
@import '@/assets/styles/themes/default.scss';
.dropdown-items {
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .item-icon {
    font-size: $font-max
  }
  .item-title{
    font-size: $font_small;
    color: $regular_color
  }
}
</style>
