<script>
import MarkdownIt from 'markdown-it'
import { mapActions, mapState } from 'pinia'
import { getMarkdownTextApi } from '@/apis/article'
import { useArticleStore } from '@/stores/article'
export default {
  name: 'MarkDownCpt',
  props: {
    mdUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      html: '',
    }
  },
  computed: {
    ...mapState(useArticleStore, ['titles']),
  },
  mounted() {
    setTimeout(() => {
      this.fetchData()
    }, 500)
  },
  methods: {
    ...mapActions(useArticleStore, ['setTitles']),
    async fetchData() {
      const { text } = await getMarkdownTextApi(this.mdUrl)
      const md = new MarkdownIt()
      this.html = md.render(text.slice(0, 120))
    },
  },
}
</script>

<template>
  <div style="cursor: pointer;" v-html="html" />
</template>

  <style scoped></style>
