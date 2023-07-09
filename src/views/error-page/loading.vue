<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
export default {
  name: 'LoadingVue',
  data() {
    return {}
  },
  computed: {
    ...mapState(useUserStore, ['user']),
  },
  mounted() {
    const token = this.$route.params.tk
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    this.setToken(token)
    const success = this.getUserInfo()
    loading.close()
    if (success)
      this.$router.push({ name: 'Index' })
    else
      this.$router.push({ name: 'Login' })
  },
  created() {},
  methods: {
    ...mapActions(useUserStore, ['setToken', 'getUserInfo']),
  },
}
</script>

<template>
  <div>111</div>
</template>

<style scoped></style>
