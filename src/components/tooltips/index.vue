<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { ToolTips } from '@/components/menu/mock/menu'
export default {
  components: {
  },
  data() {
    return {
      ToolTips,
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
  },
  created() {
  },
  methods: {
  },
}
</script>

<template>
  <el-popover effect="light" trigger="click">
    <div class="page-box">
      <div class="userinfo">
        <img
          v-lazy="user.avatarImgUrl ?? ''"
          class="avatar"
        >
        <div>
          <span style="margin-left: 10px;">{{ user.username }}</span>
          <!-- <span style="margin-left: 30px;">{{ user.personalBrief }}</span> -->
          <span style="margin-left: 10px;">12312</span>
        </div>
      </div>
      <div class="user-panel">
        <div class="user-panel-item">
          <span>0</span>
          <span>关注</span>
        </div>
        <div class="user-panel-item">
          <span>0</span>
          <span>赞过</span>
        </div>
        <div class="user-panel-item">
          <span>0</span>
          <span>关注</span>
        </div>
      </div>
      <el-divider />
      <div class="content">
        <div v-for="item in ToolTips" :key="item.title" class="content-item">
          <i :class="item.icon">{{ item.title }}</i>
        </div>
      </div>
      <el-divider />
      <div class="footer">
        <span>我的设置</span>
        <span>退出登录</span>
      </div>
    </div>
    <template #reference>
      <img
        v-lazy="user.avatarImgUrl ?? ''"
        class="avatar"
      >
    </template>
  </el-popover>
</template>

<style  lang="scss" scoped>
@import '@/assets/styles/themes/default.scss';
.avatar {
  width: $avatar-width;
  height: $avatar-height;
  border-radius: 50%;
}
.userinfo {
  display: flex;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
  }
}
.page-box {
  padding: 10px;
  .user-panel {
    display: flex;
    justify-content: space-around;
    .user-panel-item {
      align-items: center;
      display: flex;
      flex-direction: column;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    font-size: $font_samll;
  }
  // width: 20%;
  // height: 20vh;
}
.content {
  display: flex;
  flex-wrap: wrap;
  .content-item {
  flex-basis: calc(50% - 10px);
  text-align: center;
  // margin-right: 20px;
  padding: 10px;
}
}
</style>
