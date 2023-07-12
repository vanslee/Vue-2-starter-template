<script>
// import { logoutApi } from '@/apis/user'
import { mapActions, mapState } from 'pinia'
import { HeaderLeftMenu, HeaderRightMenu, IndexLeftAside } from '@/components/menu/mock/menu'
import MenuVue from '@/components/menu/Menu.vue'
import { hasLogin } from '@/utils/accessToken'
import { useUserStore } from '@/stores/user'
import DrawerVue from '@/components/draw/index.vue'
import OutLine from '@/components/outline/index.vue'
export default {
  components: {
    OutLine,
    MenuVue,
    DrawerVue,
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
  computed: {
    ...mapState(useUserStore, ['user']),
    hasLogin() {
      return hasLogin()
    },
  },
  created() {
    this.currentPageName = this.$router.currentRoute.name || ''
  },
  methods: {
    ...mapActions(useUserStore, ['logout']),
    showDrawer() {
      if (this.currentPageName === 'Details')
        this.$refs.outLineRef?.showVisible()

      else
        this.$refs.drawerRef?.showVisible()

      // console.error(this.$refs.drawerRef)
    },
    // logout() {
    //   const sucess = this.userStore.logout()
    //   if (sucess) {
    //     this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    //   }
    // }
  },
}
</script>

<template>
  <div class="Header">
    <div class="pc hidden-xs-only">
      <MenuVue :data="HeaderLeftMenu" mode="horizontal" />
      <MenuVue :data="HeaderRightMenu" mode="horizontal" />
    </div>
    <div class="mobile hidden-sm-and-up">
      <div style="align-items: center;">
        <span style="margin-right: 10px;">首页</span>
        <i class="el-icon-s-operation" @click="showDrawer" />
      </div>
      litubao
      <span>登录</span>
    </div>
    <OutLine ref="outLineRef" />
    <DrawerVue ref="drawerRef" :data="IndexLeftAside" />
  </div>
</template>

  <style scoped lang="scss">
  /* el-submenu__icon-arrow el-icon-arrow-down */
.Header {
  div{
    justify-content: space-between;
    display: flex;
  }
  .mobile {
    padding: 10px;
  }
  height: 100%;
  width: 100%;
}
  </style>
