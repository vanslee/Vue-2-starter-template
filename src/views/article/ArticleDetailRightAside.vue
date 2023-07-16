<script>
import { mapState } from 'pinia'
import { useArticleStore } from '@/stores/article'
import { formatTime } from '@/utils/time'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(useArticleStore, ['titles', 'article', 'author']),
    article_id() {
      return parseInt(this.$route.params.id)
    },
  },
  created() {},
  methods: {
    formatTime,
  },
}
</script>

<template>
  <el-card style="margin-right: 10px;">
    <div class="user-info-box">
      <img
        v-lazy="author.avatarImgUrl ?? ''"
      >
      <div>
        <span class="username">{{ author.username }}</span>
        <span class="personal-brief">{{ author.personalBrief }}</span>
      </div>
    </div>
    <div class="btn-box">
      <el-button
        class="btn"
        type="primary"
        size="small"
      >
        关注
      </el-button>
      <el-button
        class="btn"
        size="small"
      >
        私信
      </el-button>
    </div>
    <nav class="article-views">
      <i class="iconfont">&#xe651;</i>获得点赞 {{article.likes}}
    </nav>
    <nav class="article-views">
      <i class="iconfont">&#xe651;</i>文章被阅读 {{article.views}}
    </nav>
    <el-divider />
    相关文章
    <el-divider />
    目录
  </el-card>
</template>

<style scoped lang="scss">
@import '@/assets/styles/themes/default.scss';
.user-info-box {
  display: flex;
  justify-content: space-between;
  font-size: $font_medium_s;
  img {
    width: 40px;
    height: 40px;
    // flex: 1;
    border-radius: 50%;
  }
  div {
    flex: 1;
    overflow: hidden;
    margin-left: 10px;
    white-space: nowrap;
    text-overflow:ellipsis ;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .personal-brief {
      color: $regular_color;
      font-size: $font_small;
    }
  }
}
.btn-box {
  .btn {
    width: $btn-width
  }
  margin-top: $margin-default;
  display: flex;
  justify-content: space-between;
}
.article-views {
  margin: 5px 0;
  color: $regular_color;
  font-size: $font_medium_s;
}
</style>
