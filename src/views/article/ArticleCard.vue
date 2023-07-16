<script lang="ts">
import { formatTime } from '@/utils/time'
// import MarkDownCpt from '@/components/markdown/Preview.vue'
import { ArticleDetails } from '@/components/menu/mock/menu'
import { Article } from '@/types/Article'
export default {
  props: {
    article: {
      type: Article,
      required: true,
      default: () => new Article(),
    },
  },
  data() {
    return {
      content: '',
      ArticleDetails,
    }
  },
  computed: {},
  created() { },
  mounted() { },
  methods: {
    formatTime,
    jumpToArticleDetails() {
      this.$router.push({ name: 'Details', params: { id: this.article.id } })
    },
  },
}
</script>

<template>
  <div class="page-box">
    <nav class="cover-header">
      <span>{{ article.authorName }} | <i>{{ formatTime(article.publishDate) }}</i></span>
      <span v-for="category in article.categories" :key="category.name">{{ category.name }}</span>
    </nav>
    <nav class="cover-content">
      <nav @click="jumpToArticleDetails">
        {{ article.articleAbstract }}
        <!-- <MarkDownCpt :md-url="article.mdUrl" style="width: 70%;" /> -->
      </nav>
      <img v-lazy="article.imgUrl" style="width: 30%;">
    </nav>
    <nav class="cover-footer">
      <nav v-for="item in ArticleDetails" :key="item.title" style="margin-right: 12px">
        <i :class="item.icon" />
        {{ article[item.title] }}
      </nav>
    </nav>
  </div>
</template>

  <style scoped>
  .article_card_box {
    cursor: pointer;
  }
  .cover-header {
    display: flex;
    justify-content: space-between;
  }
  .cover-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .cover-footer {
    display: flex;
  }
  </style>
