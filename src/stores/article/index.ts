import { defineStore } from 'pinia'
import { Loading } from 'element-ui'
import { type ArticleRecord, Page } from '@/types/Article'
import {
  deleteAritcleApi,
  getArticleCategoriesApi,
  getArticleDetailsApi,
  getArticleListApi,
  getArticleTagsApi,
  getMarkdownTextApi,
  publishArticleApi,
} from '@/apis/article'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useArticleStore = defineStore('article', {
  // other options...
  state: () => ({
    hadMore: true,
    articles: [] as Array<ArticleRecord>,
    author: {},
    isLoading: {} as any,
    titles: new Array<string>(),
    article: {} as ArticleRecord,
    tagsIpage: {},
    categoriesIpage: {},
    params: new Page(),
  }),
  getters: {
    getTitles: (state: any) => state.titles || [],
    tags: (state: any) => state.tagsIpage.records || [],
    totalTags: (state: any) => state.tagsIpage.total || 0,
    categories: (state: any) => state.categoriesIpage.records || [],
    totalCategories: (state: any) => state.categoriesIpage.total || 0,
  },
  actions: {
    setTitles(titles: Array<string>) {
      this.titles = titles
    },
    // randomizeCounter() {
    //   this.counter = Math.round(100 * Math.random())
    // },
    async publishArticle(article: any) {
      const { code } = await publishArticleApi(article)
      if (code === 200)
        return true

      else
        return false
    },
    async getArticleDetails(articleId: string) {
      const { code, data } = await getArticleDetailsApi(articleId)
      if (code === 200) {
        this.author = data.author
        this.article = data.article
        // this.article.imgUrl = `${process.env.VUE_APP_WEBSITE_CDN}${this.article.imgUrl}`
        // this.article.mdUrl = `${process.env.VUE_APP_WEBSITE_CDN}${this.article.mdUrl}`
        const { text } = await getMarkdownTextApi(this.article?.mdUrl)
        this.article.articleContent = text
        // this.author.avatarImgUrl = `${process.env.VUE_APP_WEBSITE_CDN}${this.author.avatarImgUrl}`
        return true
      }
      else {
        return false
      }
    },
    async getArticleTags(params: any) {
      const { data, code } = await getArticleTagsApi(params)
      if (code === 200)
        this.tagsIpage = data
    },
    async getArticleCategoires(params: any) {
      const { data, code } = await getArticleCategoriesApi(params)
      if (code === 200)
        this.categoriesIpage = data
    },
    async getArticleList(current = 0) {
      console.error(this.params)

      if (this.hadMore) {
        if (!this.isLoading.visible) {
          this.isLoading = Loading.service({
            lock: true,
            text: '加载中。。。',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            fullscreen: true,
          })

          this.params.current = current
          const { data } = await getArticleListApi(this.params)
          if (data.records.length < 1)
            this.hadMore = false
          this.articles = [...this.articles, ...data.records]
          this.params.total = data.total
          this.params.current = data.current
          this.params.size = data.size
          setTimeout(() => {
            this.isLoading.close()
          }, 300)
        }
      }
    },
    async handleCurrentChange(current: number) {
      this.params.current = current
      this.getArticleList()
    },
    async handleSizeChange(size: number) {
      this.params.size = size
      this.getArticleList()
    },
    async deleteArticle(id: number) {
      const { code } = await deleteAritcleApi(id)
      if (code === 200) {
        // Message.success(msg)
        this.getArticleList()
      }
    },
  },
})
