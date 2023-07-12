<script>
import { mapActions, mapState } from 'pinia'
import Comment from '@/views/comment/index.vue'
import { getMarkdownTextApi } from '@/apis/article'
import { useArticleStore } from '@/stores/article'
import { formatTime } from '@/utils/time'
export default {
  components: {
    Comment,
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
    formatTime,
    ...mapActions(useArticleStore, ['getArticleDetails', 'setTitles']),
  },
}
</script>

<template>
  <div
    ref="scorllWraper"
    class="scorllWraper"
  >
    <div style="display: flex;justify-content: space-between;">
      <div style="font-weight: 600; font-size: 2rem">
        {{ article.articleTitle }}
      </div>
      <el-button class="hidden-sm-and-up" type="primary">
        关注
      </el-button>
    </div>
    <span>{{ author.username }}</span>
    <span style="font-size: 0.75rem">
      {{ formatTime(article.publishDate) }}
      {{ article.views }}阅读 {{ article.likes }}喜欢 {{ article.collects }}收藏
      {{ article.comments }}评论
    </span>
    <div style="width: 100%; height: 30vh; text-align: center">
      <img
        v-lazy="article.imgUrl"
        style="
          object-fit: scale-down;
          width: 95%;
          height: 95%;
          border-radius: 4px;
          border: 1px solid #909399;
        "
      >
    </div>
    <v-md-editor
      ref="preview"
      mode="preview"
      :value="html"
    />
    <div class="hidden-sm-and-up operator-btn">
      <span>
        <i class="iconfont">&#xe651;</i>
        {{ article.likes }}
      </span>
      <span>
        <i class="iconfont">&#xe610;</i>
        {{ article.collects }}
      </span>
      <span>
        <i class="iconfont">&#xe718;</i>
        分享
      </span>
    </div>
    <el-card>
      <Comment :article_id="article_id" />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/themes/default.scss';
  .scorllWraper {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
 span {
   color: $regular_color;
   font-size: $font_samll;
 }
  .user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 100px;
  }
  .operator-btn {
    display: flex;
    justify-content: space-around;
    span {
      display: flex;
      flex-direction: column;
      align-items: center;
      i {
        font-size: $font-max;
      }
    }
  }
  </style>
