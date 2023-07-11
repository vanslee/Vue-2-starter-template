<script lang="ts">
import { reactive } from 'vue'
import { IndexLeftAside } from '@/components/menu/mock/menu'
import MenuVue from '@/components/menu/Menu.vue'
export default {
  components: {
    MenuVue,
  },
  setup() {
    const state = reactive({

    })
    return {
      state,
      IndexLeftAside,
    }
  },
  computed: {},
  created() { },
  methods: {},
}
</script>

<template>
    <MenuVue :data="IndexLeftAside" />
</template>

<style  scoped>
* {
  margin-left: 20px;
}
</style>
