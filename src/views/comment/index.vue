<script>
import { mapActions, mapState } from 'pinia'
import CommentItemVue from './components/CommentItem.vue'
import CommentVue from './components/Comment.vue'
import { useUserStore } from '@/stores/user'
import { useCommentStore } from '@/stores/comments'
import { hasLogin } from '@/utils/accessToken'

export default {
  name: 'CommentIndex',
  components: {
    CommentItemVue,
    CommentVue,
  },
  props: {
    articleId: {
      type: Number,
      default: -1,
    },
  },
  data() {
    const userStore = useUserStore()
    const commentStore = useCommentStore()
    const params = {
      size: 5,
      current: 1,
      articleId: this.articleId,
    }

    return {
      params,
      userStore,
      commentStore,
      isLoading: false,
      emojiRootVisible: false,
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useCommentStore, ['comments', 'total']),
    hasLogin() {
      return hasLogin()
    },
  },
  created() {},
  mounted() {
    this.fetchData(this.params)
  },
  methods: {
    handleChangePage(page) {
      this.params.current = page
      this.fetchData(this.params)
    },
    ...mapActions(useCommentStore, ['fetchData', 'submitComment']),
  },
}
</script>

<template>
  <div>
    <CommentVue :article-id="articleId" />
    <div
      v-for="comment in comments"
      :key="comment.id"
    >
      <CommentItemVue
        :comment="comment"
        :article-id="articleId"
        @fetch-data="fetchData"
      />
    </div>
    <el-pagination
      v-model:current-page="params.current"
      :total="total"
      style="text-align: center"
      layout="prev, pager, next"
      :page-size="params.size"
      @current-change="handleChangePage"
    />
  </div>
</template>

<style scoped>
.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
