<script>
import { mapActions, mapState } from 'pinia'
import MarkdownIt from 'markdown-it'
import Comment from '@/views/comment/index.vue'
import { getMarkdownTextApi } from '@/apis/article'
import { useArticleStore } from '@/stores/article'
import { formatTime } from '@/utils/time'
import { UnderlineWord } from '@/components/menu/mock/menu'
import NoteVue from '@/components/note/index.vue'
export default {
  components: {
    Comment,
    NoteVue,
  },
  data() {
    return {
      html: '',
      isShow: false,
      UnderlineWord,
      start: 0,
      end: 0,
      currentEle: {},
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
    const element = this.$refs.markdown
    this.currentEle = element
    document.addEventListener('mousedown', (event) => {
      if (event.target !== element)
        this.isShow = false
    })
    element.addEventListener('mouseup', (event) => {
      event.preventDefault()
    })
    element.addEventListener('mouseup', (event) => {
      const selection = window.getSelection()
      if (selection.toString().length > 0) {
        this.isShow = true
        const popover = this.$refs.popover1.$el
        const range = selection.getRangeAt(0)
        this.range = range.cloneRange()
        const rect = range.getBoundingClientRect()
        popover.style.position = 'absolute'
        popover.style.top = `${rect.top - 80}px`
        popover.style.left = `${rect.left + (rect.width / 2 - 150)}px`
        const navStart = document.createElement('note')
        const navEnd = document.createElement('note')
        navStart.textContent = '[NAV-START]'
        navEnd.textContent = '[NAV-END]'
        range.insertNode(navEnd)
        range.collapse(false)
        range.insertNode(navStart)
      }
      else {
        this.isShow = false
      }
    })
    this.fetchData()
    // this.$bus.$on('directory-navigation', (anchor) => {
    //   const { scorllWraper, preview } = this.$refs
    //   if (!scorllWraper || !preview)
    //     return

    //   scorllWraper.scrollTop = scorllWraper.clientHeight
    //   const { lineIndex } = anchor
    //   scorllWraper.scrollTop
    //       = preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`).offsetTop
    //       - scorllWraper.offsetTop
    // })
    // this.$nextTick(() => {
    //   this.$bus.$on('scroll-to-end', this.scrollToEnd)
    // })
  },
  methods: {
    publishNote() {
      const select = window.getSelection()
      if (select.toString().length > 0) {
        const range = select.getRangeAt(0)
        const navStart = document.createElement('nav')
        const navEnd = document.createElement('nav')
        navStart.textContent = '[NAV-START]'
        navEnd.textContent = '[NAV-END]'
        range.insertNode(navEnd)
        range.collapse(false)
        range.insertNode(navStart)
      }
    },
    async fetchData() {
      await this.getArticleDetails(this.$route.params.id)
      const { text } = await getMarkdownTextApi(this.article.mdUrl)
      const md = new MarkdownIt()
      this.html = md.render(text)
    },
    choseMenu(e) {
      e.preventDefault()
      const range = new Range()
      range.setStart(this.currentEle, 0)
      range.setEnd(this.currentEle, 2)
      document.getSelection().addRange(range)
      if (e.target.textContent.toString() === '写想法')
        this.$refs.noteRef.showDlg()
    },
    // async fetchData() {
    //   await this.getArticleDetails(this.$route.params.id)
    //   const { text } = await getMarkdownTextApi(this.article.mdUrl)
    //   this.html = text
    //   setTimeout(() => {
    //     this.$nextTick(() => {
    //       const anchors
    //           = this.$refs.preview.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')
    //       if (!anchors)
    //         return

    //       let titles = Array.from(anchors).filter(
    //         title => !!title.innerText.trim(),
    //       )
    //       if (!titles.length) {
    //         this.setTitles([])
    //         return
    //       }
    //       const hTags = Array.from(
    //         new Set(titles.map(title => title.tagName)),
    //       ).sort()
    //       titles = titles.map(el => ({
    //         title: el.innerText,
    //         lineIndex: el.getAttribute('data-v-md-line'),
    //         indent: hTags.indexOf(el.tagName),
    //       }))
    //       this.setTitles(titles)
    //     })
    //   }, 1000)
    // },
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
    <el-popover
      ref="popover1"
      v-model="isShow"
      width="300"
      trigger="manual"
    >
      <div style="display: flex;justify-content: space-between;">
        <div v-for="item in UnderlineWord" :key="item.title" style="display: flex;flex-direction: column;align-items: center;" @click.prevent="choseMenu">
          <span>{{ item.title }}</span>
          <i :class="item.icon" />
        </div>
      </div>
    </el-popover>
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
    <div ref="markdown" v-html="html" />
    <!-- <v-md-editor
      ref="preview"
      v-contextmenu:contextmenu
      mode="preview"
      :value="html"
    /> -->
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
      <Comment :article-id="article_id" />
    </el-card>
    <NoteVue ref="noteRef" @publishNote="publishNote" />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/themes/default.scss';
note {
  color: wheat;
  text-decoration: underline;
}
.note {
  position: absolute;
  top: 0px;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
}
  .scorllWraper {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .active {
    color: red;
    text-decoration: underline
  }
 span {
   color: $regular_color;
   font-size: $font_small;
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
