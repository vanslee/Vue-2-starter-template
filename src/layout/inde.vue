<script>
import FooterVue from '@/layout/footer/index.vue'
import HeaderVue from '@/layout/header/index.vue'
// import BlogRightAside from '@/layout/components/Sidebar/BlogRightAside.vue'
export default {
  name: 'LayoutIndex',
  components: {
    FooterVue,
    HeaderVue,
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {},
}
</script>

<template>
  <div
    style="
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      "
  >
    <header style="height: 10%; width: 100%">
      <HeaderVue />
    </header>
    <main
      style="
          height: 90%;
          width: 100%;
          display: flex;
          justify-content: space-between;
        "
    >
      <aside
        style="width: 30%"
        class="hidden-sm-and-down"
      >
        <RouterView name="left" />
      </aside>
      <content style="width: 100%; padding: 0 5vw">
        <RouterView name="main" />
      </content>
      <aside
        style="width: 30%"
        class="hidden-sm-and-down"
      >
        <RouterView name="right" />
      </aside>
    </main>
    <footer style="width: 100%">
      <FooterVue />
    </footer>
  </div>
</template>

  <style scoped>
  * {
    overflow: hidden;
  }
  </style>
