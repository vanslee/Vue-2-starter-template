<script>
import { useArticleStore } from '@/stores/article'
import { formatTimeStamp } from '@/utils/time'
import ArticleCard from '@/views/article/ArticleCard.vue'
export default {
  components: {
    ArticleCard,
  },
  setup() {
    const articleStore = useArticleStore()
    return {
      articleStore,
      params: {},
    }
  },
  computed: {
    articles() {
      return this.articleStore.articles
    },
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.articleStore.getArticleList()
    },
    changePage() {
      this.articleStore.getArticleList()
    },
    formatTimeStamp,
  },

}
// export default {
//   components: {
//     ArticleCard,
//   },
//   data() {
//     const userStore = useUserStore()
//     return {
//       total: 0,
//       userStore,
//       formatTimeStamp,
//     }
//   },
//   computed: {
//     ...mapState(useArticleStore, ['articles', 'params']),
//   },
//   created() {
//     this.getArticleList()
//   },
//   methods: {
//     ...mapActions(useArticleStore, ['getArticleList']),
//     async fetchData() {
//       await this.getArticleList()
//     },
//     changePage(current) {
//       this.params.current = current
//       this.fetchData()
//     },
//   },
// }
</script>

<template>
  <div class="scorll-wrapper">
    <el-timeline style="padding: 0">
      <el-timeline-item
        v-for="article in articles" :key="article.id" :timestamp="formatTimeStamp(article.publishDate)"
        placement="top"
      >
        <el-card :body-style="{ padding: '10px' }">
          <ArticleCard :article="article" />
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-pagination
      class="pagination" background layout="prev, pager, next" :total="params.total" :page-size="params.size"
      @current-change="changePage"
    />
  </div>
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
