<script lang="ts">
import MarkdownIt from 'markdown-it'
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useArticleStore } from '@/stores/article'
import TagInput from '@/components/tag/TagInput.vue'
import { getAccessToken } from '@/utils/accessToken'
import type { Result } from '@/types/Result'
import { Article, Tag } from '@/types/Article'
export default {
  components: {
    TagInput,
  },
  data() {
    const userStore = useUserStore()
    // const article = {
    //   imgUrl: '',
    //   tags: [],
    //   categories: [],
    //   articleTitle: '',
    //   articleContent: '',
    //   articleType: '原创',
    //   userId: userStore.user.id,
    //   author: userStore.user.username,
    // }
    return {
      url: '',
      title: '',
      html: '',
      rules: {},
      visible: false,
      article: new Article(),
      userStore,
      uploadImg: '',
      loading: false,
      formItemLayout: {},
      tagValue: '',
      categoryValue: '',
      tagInputVisible: false,
      categoryInputVisible: false,
      UPLOAD_SERVER_URL: import.meta.env.VITE_APP_UPLOAD_URL,
    }
  },
  created() {
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
    handleAvatarSuccess(res: Result) {
      const { data, code } = res
      if (code === 200)
        this.article.imgUrl = data.url
    },
    showDlg(content: string) {
      this.article.articleContent = content
      const md = new MarkdownIt()
      this.html = md.render(content)
      this.visible = true
    },
    setTags(tag: string) {
      const index = this.article.tags.length
      for (const item of this.article.tags) {
        if (item.name === tag)
          return
      }
      const newTag = new Tag(index, tag)
      this.article.tags.push(newTag)
    },
    removeTag(id: number) {
      this.article.tags.forEach((item, index) => {
        if (item.id === id)
          this.article.tags.splice(index, 1)
      })
    },
  },
}
</script>

<template>
  <el-drawer
    :visible="visible"
    title="发布文章"
    direction="rtl"
    size="80%%"
    @close="visible = false"
  >
    <el-form label-width="100px">
      <el-form-item label="标题" prop="tags">
        <el-input v-model="article.articleTitle" />
      </el-form-item>
      <!-- <el-form-item label="分类" prop="tags1">
        <TagInput
          text="新建" icon="icon-pushpin-fill" :data="article.categories" type="danger"
          @setItems="setCategories" @rmItem="removeCategory"
        />
      </el-form-item> -->
      <el-form-item label="标签" prop="tags2">
        <TagInput
          text="新建" icon="icon-pushpin-fill" :data="article.tags"
          @setItems="setTags " @rmItem="removeTag"
        />
      </el-form-item>
      <el-form-item label="文章封面" prop="tags3">
        <el-upload
          class="avatar-uploader"
          drag name="file"
          accept="image/*"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :action="UPLOAD_SERVER_URL"
          :headers="{ litubao_authentication: token }"
        >
          <!-- class="hidden-sm-and-up" -->
          <img
            v-if="article.imgUrl"
            v-lazy="article.imgUrl" class="avatar"
          >
          <i
            v-else class="el-icon-plus upload-icon"
          />
          <!-- class="hidden-sm-and-down" -->
          <!-- <img
            v-lazy="article.imgUrl" style="
              width: 20rem;
              height: 10rem;
              object-fit: fill;
              border-radius: 0;
            "
          > -->
        </el-upload>
      </el-form-item>
      <el-form-item label="收录至专栏">
        <el-select v-model="article.categoryId" placeholder="请添加专栏，一篇文章最多添加一个专栏">
          <el-option
            v-for="item in user.categories"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="编辑摘要">
        <el-input v-model="article.articleAbstract" :autosize="{ minRows: 6, maxRows: 8 }" type="textarea" />
      </el-form-item>
      <el-form-item size="large">
        <el-button>取消</el-button>
        <el-button type="primary" @click="submit">
          确定并发布
        </el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped>
div {
  margin: 5px;
}
::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
::v-deep  .el-upload-dragger{
  width: 100%;
  height: 100%;
    border-color: #409EFF;
  }
  .upload-icon {
    font-size: 28px;
    color: #8c939d;
    width: 9rem;
    height: 9rem;
    line-height: 9rem;
    text-align: center;
  }
  .avatar {
    width: 9rem;
    height: 9rem;
    display: block;
  }
/* ::v-deep .el-upload {
  width: 100%;
  height: 100%;
  align-items: center;
  text-align: center;
}
.upload-icon {
  width: 9rem;
  height: 9rem;
  text-align: center;
  align-items: center;
}
::v-deep .el-upload-dragger {
  width: 100%;
  height: 100%;
  align-items: center;
  text-align: center;
} */
</style>
