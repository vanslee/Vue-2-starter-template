<script>
import { mapActions, mapState } from 'pinia'
import { useArticleStore } from '@/stores/article'
import { formatTime } from '@/utils/time'
import ArticleCard from '@/views/article/ArticleCard.vue'
export default {
  components: {
    ArticleCard,
  },
  data() {
    return {
      current: 0,
      isLoading: { visible: false },
    }
  },
  computed: {
    ...mapState(useArticleStore, ['articles']),

  },
  mounted() {
  },
  methods: {
    ...mapActions(useArticleStore, ['getArticleList']),
    fetchData() {
      this.getArticleList(this.current)
      this.current++
    },
    formatTime,
  },

}
</script>

<template>
  <ul v-infinite-scroll="fetchData" :infinite-scroll-delay="200" :infinite-scroll-immediate="false" :infinite-scroll-distance="0" class="scorll-wrapper">
    <li v-for="article in articles" :key="article.id">
      <el-card :body-style="{ padding: '10px' }">
        <ArticleCard :article="article" />
      </el-card>
    </li>
  </ul>
</template>

  <style scoped>
  ::v-deep .el-timeline-item__wrapper {
    padding-left: 18px;
  }

  .article_box {
    height: 100%;
  }

  .pagination {
    display: flex;
    justify-content: center;
  }

  .scorll-wrapper {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  </style>
