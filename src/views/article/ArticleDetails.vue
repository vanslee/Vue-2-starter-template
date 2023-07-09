<script>
import { mapActions, mapState } from 'pinia'
import Comment from '@/views/comment/index.vue'
import { getMarkdownTextApi } from '@/apis/article'
import { useArticleStore } from '@/stores/article'
import ArticleDetailHeader from '@/views/article/ArticleDetailHeader.vue'
export default {
  components: {
    Comment,
    ArticleDetailHeader,
  },
  data() {
    return {
      html: '',
    }
  },
  computed: {
    ...mapState(useArticleStore, ['titles', 'article', 'author']),
    article_id() {
      return parseInt(this.$route.params.id)
    },
  },
  created() { },
  mounted() {
    this.fetchData()
    this.$bus.$on('directory-navigation', (anchor) => {
      const { scorllWraper, preview } = this.$refs
      if (!scorllWraper || !preview)
        return

      scorllWraper.scrollTop = scorllWraper.clientHeight
      const { lineIndex } = anchor
      scorllWraper.scrollTop
          = preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`).offsetTop
          - scorllWraper.offsetTop
    })
    this.$nextTick(() => {
      this.$bus.$on('scroll-to-end', this.scrollToEnd)
    })
  },
  methods: {
    async fetchData() {
      await this.getArticleDetails(this.$route.params.id)
      const { text } = await getMarkdownTextApi(this.article.mdUrl)
      this.html = text
      setTimeout(() => {
        this.$nextTick(() => {
          const anchors
              = this.$refs.preview.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')
          if (!anchors)
            return

          let titles = Array.from(anchors).filter(
            title => !!title.innerText.trim(),
          )
          if (!titles.length) {
            this.setTitles([])
            return
          }
          const hTags = Array.from(
            new Set(titles.map(title => title.tagName)),
          ).sort()
          titles = titles.map(el => ({
            title: el.innerText,
            lineIndex: el.getAttribute('data-v-md-line'),
            indent: hTags.indexOf(el.tagName),
          }))
          this.setTitles(titles)
        })
      }, 1000)
    },
    scrollToEnd() {
      const el = this.$refs.scorllWraper
      if (el)
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    },
    ...mapActions(useArticleStore, ['getArticleDetails', 'setTitles']),
  },
}
</script>

<template>
  <div
    ref="scorllWraper"
    class="scorllWraper"
  >
    <ArticleDetailHeader />
    <v-md-editor
      ref="preview"
      mode="preview"
      :value="html"
    />
    <Comment :article_id="article_id" />
  </div>
</template>

  <style scoped>
  .scorllWraper {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 100px;
  }
  </style>
