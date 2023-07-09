<script>
import MarkdownIt from 'markdown-it'
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useArticleStore } from '@/stores/article'
import TagInput from '@/components/tag/TagInput.vue'
import { getAccessToken } from '@/utils/accessToken'
export default {
  components: {
    TagInput,
  },
  data() {
    const userStore = useUserStore()
    const article = {
      imgUrl: '',
      tags: [],
      categories: [],
      articleTitle: '',
      articleContent: '',
      articleType: '原创',
      userId: userStore.user.id,
      author: userStore.user.username,
    }
    return {
      url: '',
      html: '',
      rules: {},
      visible: false,
      article,
      userStore,
      uploadImg: '',
      loading: false,
      formItemLayout: {},
      tagValue: '',
      categoryValue: '',
      tagInputVisible: false,
      categoryInputVisible: false,
      UPLOAD_SERVER_URL: process.env.VUE_APP_UPLOAD_SERVER,
    }
  },

  computed: {
    ...mapState(useUserStore, ['user']),
    token() {
      return getAccessToken()
    },
    // 给方法起别名
    // ...mapActions(useArticleStore,{alias:'setTitles'})
  },
  methods: {
    ...mapActions(useArticleStore, ['publishArticle']),
    onFinishFailed() { },
    beforeUpload() { },

    async submit() {
      // 发布文章
      this.loading = true
      const success = await this.publishArticle(this.article)
      this.loading = false
      if (success) {
        this.visible = false
        localStorage.removeItem('content')
        this.$router.push({ name: 'Index' })
      }
    },
    handleAvatarSuccess(res) {
      const { data, code } = res
      if (code === 200)
        this.article.imgUrl = data.url
    },
    showDlg(content) {
      this.article.articleContent = content
      const md = new MarkdownIt()
      this.html = md.render(content)
      this.visible = true
    },
    setCategories(category) {
      this.article.categories.push(category)
    },
    setTags(tag) {
      this.article.tags.push(tag)
    },
    removeTag(tag) {
      this.article.tags.splice(this.article.tags.indexOf(tag), 1)
    },
    removeCategory(category) {
      this.article.categories.splice(
        this.article.categories.indexOf(category),
        1,
      )
    },
  },
}
</script>

<template>
  <el-dialog v-model:visible="visible" width="90%" center title="发布文章">
    <div style="display: flex">
      <div style="width: 50%">
        <div style="display: flex;white-space: nowrap;overflow: hidden;; flex-direction: column; align-items: center">
          <el-image :src="user.avatarImgUrl" style="border-radius: 50%; width: 5rem; height: 5rem" />
          <h3
            style="
              white-space: nowrap;
              text-overflow: ellipsis;
            "
          >
            作者: {{ article.author }}
          </h3>
          <div style="display: flex; align-items: center">
            <span style="white-space: nowrap">标题:</span>
            <el-input v-model="article.articleTitle" type="text" />
          </div>
        </div>
        <!-- <div>
          文章作者:
          <el-input size="mini" type="text" style="width: 30vw" disabled />
        </div> -->
      </div>
      <div style="flex-grow: 1; text-align: center">
        <h1>封面</h1>
        <el-upload
          drag name="file" accept="image/*" :show-file-list="false" :on-success="handleAvatarSuccess"
          :action="UPLOAD_SERVER_URL" :headers="{ litubao_authentication: token }"
        >
          <img
            v-lazy="article.imgUrl" class="hidden-sm-and-up" style="
              width: 9rem;
              height: 9rem;
              object-fit: fill;
              border-radius: 0;
            "
          >
          <img
            v-lazy="article.imgUrl" class="hidden-sm-and-down" style="
              width: 20rem;
              height: 10rem;
              object-fit: fill;
              border-radius: 0;
            "
          >
        </el-upload>
      </div>
    </div>
    <el-divider />
    <h2 style="text-align: center;">
      文章预览
    </h2>
    <div style="height: 20vh;width: 100%;overflow-x: hidden;overflow-y: scroll;" v-html="html" />
    <el-divider />
    <!-- <el-card style="" v-html="html" /> -->
    <div style="display: flex; align-items: center; justify-content: center">
      <span>标签:</span>
      <TagInput text="新建" :data="article.tags" icon="icon-tag-fill" @set-items="setTags" @rm-item="removeTag" />
    </div>
    <div style="display: flex; align-items: center; justify-content: center">
      <span>分类:</span>
      <TagInput
        text="新建" icon="icon-pushpin-fill" :data="article.categories" type="danger"
        @set-items="setCategories" @rm-item="removeCategory"
      />
    </div>
    <template #footer>
      <el-button @click="(visible = false), (loading = false)">
        取消
      </el-button>
      <el-button type="primary" :loading="loading" @click="submit">
        发布
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
div {
  margin: 5px;
}

::v-deep .el-upload {
  width: 100%;
  height: 100%;
}

::v-deep .el-upload-dragger {
  width: 100%;
  height: 100%;
}
</style>
