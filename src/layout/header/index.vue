<script>
// import { logoutApi } from '@/apis/user'
import { mapActions, mapState } from 'pinia'
import { HeaderLeftMenu, HeaderRightMenu, IndexLeftAside } from '@/components/menu/mock/menu'
import MenuVue from '@/components/menu/Menu.vue'
import { hasLogin } from '@/utils/accessToken'
import { useUserStore } from '@/stores/user'
import DrawerVue from '@/components/draw/index.vue'
import OutLine from '@/components/outline/index.vue'
import UserToolTip from '@/components/tooltips/index.vue'
// import CreatorBtn from '@/components/creator-button/index.vue'
export default {
  components: {
    OutLine,
    MenuVue,
    DrawerVue,
    UserToolTip,
  },
  data() {
    const activeIndex = '1'
    const userStore = useUserStore()
    return {
      currentPageName: '',
      userStore,
      activeIndex,
      HeaderLeftMenu,
      HeaderRightMenu,
      IndexLeftAside,
    }
  },
  watch: {
    $route() {
      this.currentPageName = this.$router.currentRoute.name || ''
    },
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    hasLogin() {
      return hasLogin()
    },
  },
  methods: {
    ...mapActions(useUserStore, ['logout']),
    showDrawer() {
      if (this.currentPageName === 'Details')
        this.$refs.outLineRef?.showVisible()
      else
        this.$refs.drawerRef?.showVisible()
    },
  },
}
</script>

<template>
  <div class="Header">
    <div class="pc hidden-xs-only">
      <MenuVue :data="HeaderLeftMenu" mode="horizontal" />
      <!-- <CreatorBtn /> -->
      <UserToolTip v-if="hasLogin" />
      <MenuVue v-else :data="HeaderRightMenu" mode="horizontal" />
    </div>
    <div class="mobile hidden-sm-and-up">
      <div style="align-items: center;">
        <i class="el-icon-s-operation" @click="showDrawer" />
        <RouterLink v-show="currentPageName !== 'Index'" style="margin-left: 20px" to="/">
          首页
        </RouterLink>
      </div>
      litubao
      <UserToolTip v-if="hasLogin" />
      <RouterLink v-else to="/login">
        登录
      </RouterLink>
    </div>
    <OutLine ref="outLineRef" />
    <DrawerVue ref="drawerRef" :data="IndexLeftAside" />
  </div>
</template>

  <style scoped lang="scss">
  /* el-submenu__icon-arrow el-icon-arrow-down */
.Header {
  div{
    justify-content: space-around;
    display: flex;
  }
  .pc {
    align-items: center;
  }
  .mobile {
    padding: 10px;
    align-items: center;
  }
  height: 100%;
  width: 100%;
}
  </style>
