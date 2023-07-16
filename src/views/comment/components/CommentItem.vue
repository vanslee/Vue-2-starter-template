<script>
import { VEmojiPicker } from 'v-emoji-picker'
import { mapActions, mapState } from 'pinia'
import { formatTimeStamp } from '@/utils/time'
import { useUserStore } from '@/stores/user'
import { useCommentStore } from '@/stores/comments'
import { hasLogin } from '@/utils/accessToken'
export default {
  components: { VEmojiPicker },
  props: {
    comment: {
      type: Object,
      default: () => { },
    },
    articleId: {
      type: Number,
      default: -1,
    },
  },
  data() {
    const userStore = useUserStore()
    const params = {
      content: '',
      rootCommentId: '',
      replyCommentId: '',
      user_id: userStore.user.id,
      articleId: this.articleId,
      user_nick: userStore.user.username,
      user_avatar: userStore.user.avatarImgUrl,
    }
    return {
      params,
      emoji: '',
      isDesktop: false,
      userStore: {},
      isLoading: false,
      emojiRootVisible: false,
      emojiReplyVisible: false,
      commentInputVisible: false,
      cdn: import.meta.env.VITE_APP_WEBSITE_CDN,
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    hasLogin() {
      return hasLogin()
    },
  },
  created() { },
  mounted() {
    this.userStore = useUserStore()
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    formatTimeStamp,
    handleResize() {
      this.isDesktop = window.innerWidth >= 768
    },
    selectReplyEmoji(emoji) {
      this.emojiReplyVisible = false
      this.params.content = `${this.params.content}${emoji.data}`
    },
    showCommmentInput(rootCommentId, replyCommentId, nick) {
      if (this.hasLogin) {
        this.params.rootCommentId = rootCommentId
        this.params.replyCommentId = replyCommentId
        this.params.content = `@${nick}: `
        this.commentInputVisible = true
      }
      else {
        this.$message.error('请先登录')
      }
    },
    submit() {
      this.isLoading = true
      const success = this.submitComment(this.params)
      if (success) {
        this.$message.success('发送成功')
        this.fetchData()
      }
      else {
        this.$message.error('发送失败')
      }
      this.commentParam.content = ''
      this.isLoading = false
    },
    ...mapActions(useCommentStore, ['fetchData', 'submitComment']),
  },
}
</script>

<template>
  <div style="width: 100%;">
    <el-divider />
    <el-row>
      <el-col :span="2" class="hidden-xs-only">
        <img v-lazy="`${cdn}${comment.userAvatar}`" class="user-avatar">
      </el-col>
      <el-col :span="2" class="hidden-sm-and-up">
        <img v-lazy="`${cdn}${comment.userAvatar}`" style="width: 12vw">
      </el-col>
      <el-col :span="22" class="hidden-sm-and-up">
        <el-row>
          <el-row style="margin-left: 5px;">
            {{ comment.userNick }}
            <i style="color: red">[作者]</i>
          </el-row>
          <el-row>{{ comment.content }}</el-row>
          <el-row class="comment-time">
            {{ formatTimeStamp(comment.createTime) }} {{ comment.location }} &emsp; &emsp;
            <nav>
              <i class="iconfont">&#xe717;</i>
              {{ comment.likes }}
            &nbsp;
              <i class="iconfont">&#xe716;</i>
            &emsp; &emsp;
              <i @click="showCommmentInput(comment.id, comment.id, comment.userNick)">回复</i>
            </nav>
          </el-row>
        </el-row>
        <el-row
          v-for="children in comment.childrens" :key="children.id" style="margin-top: 15px" type="flex"
        >
          <el-col :span="3">
            <img
              v-lazy="`${cdn}${children.userAvatar}`"
              class="reply-user-avatar"
            >
          </el-col>
          <el-col :span="21">
            <el-row>
              <el-row>
                <i>{{ children.userNick }}</i>
                回复 {{ children.content }}
              </el-row>
              <el-row class="comment-time">
                {{ formatTimeStamp(children.createTime) }}
                {{ children.location }} &emsp; &emsp;
                <nav>
                  <i class="iconfont">&#xe717;</i>
                  {{ children.likes }}
                  &nbsp;
                  <i class="iconfont">&#xe716;</i>
                  &emsp; &emsp;
                  <i @click="showCommmentInput(comment.id, children.id, children.userNick)">回复</i>
                </nav>
              </el-row>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="22" class="hidden-xs-only">
        <el-row>
          <el-row>
            {{ comment.userNick }}
            <i style="color: red">[作者]</i>
          </el-row>
          <el-row>{{ comment.content }}</el-row>
          <el-row>
            <span class="comment-time">{{ formatTimeStamp(comment.createTime) }} {{ comment.location }} &emsp; &emsp;</span>
            <i class="iconfont">&#xe717;</i>
            {{ comment.likes }}
            &nbsp;
            <i class="iconfont">&#xe716;</i>
            &emsp; &emsp;
            <i @click="showCommmentInput(comment.id, comment.id, comment.userNick)">回复</i>
          </el-row>
        </el-row>
        <el-row
          v-for="children in comment.childrens" :key="children.id" style="margin-top: 15px" type="flex"
          align="middle"
        >
          <el-col :span="1">
            <img
              v-lazy="`${cdn}${children.userAvatar}`"
              class="reply-user-avatar"
            >
          </el-col>
          <el-col :span="23">
            <el-row>
              <el-row>
                <i>{{ children.userNick }}</i>
                回复 {{ children.content }}
              </el-row>
              <el-row class="comment-time">
                {{ formatTimeStamp(children.createTime) }}
                {{ children.location }} &emsp; &emsp;
                <i class="iconfont">&#xe717;</i>
                {{ children.likes }}
                &nbsp;
                <i class="iconfont">&#xe716;</i>
                &emsp; &emsp;
                <i @click="showCommmentInput(comment.id, children.id, children.userNick)">回复</i>
              </el-row>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 手机 -->
    <el-drawer
      style="width: 100%"
      :visible="commentInputVisible && !isDesktop"
      title="发表评论"
      direction="btt"
      :show-close="false"
      @close="commentInputVisible = false"
    >
      <el-input v-model="params.content" type="textarea" placeholder="机会是留给有准备的人">
        <el-popover trigger="click">
          <template #append>
            <VEmojiPicker @select="selectReplyEmoji" />
            <el-button>
              <template #reference>
                <i class="el-icon-wind-power" />
              </template>
            </el-button>
          </template>
        </el-popover>
      </el-input>
      <el-button
        type="primary" :loading="isLoading" style="position: absolute; right: 16vw; bottom: 20px"
        @click="submit"
      >
        发表评论
      </el-button>
    </el-drawer>

    <!-- 电脑 -->

    <el-drawer
      title="发表评论"
      direction="btt"
      :show-close="false"
      :append-to-body="true"
      style="width: 50%;margin: 0 auto"
      :visible="commentInputVisible && isDesktop"
      @close="commentInputVisible = false"
    >
      <el-row>
        <el-input v-model="params.content" type="textarea" :rows="3" placeholder="机会是留给有准备的人" />
      </el-row>
      <el-tooltip v-model="emojiReplyVisible" placement="top">
        <template #content>
          <VEmojiPicker @select="selectReplyEmoji" />
        </template>
        <el-button size="mini">
          <i class="el-icon-wind-power" />
          表情
        </el-button>
      </el-tooltip>
      <el-button
        type="primary" :loading="isLoading" style="position: absolute; right: 10px; bottom: 20px"
        @click="submit"
      >
        发表评论
      </el-button>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/themes/default.scss';
i {
  cursor: pointer;
}
.reply-user-avatar {
  width: $avatar-small-width;
  height: $avatar-small-height;
  border-radius: 50%;
}
.user-avatar {
  width: $avatar-width;
  height: $avatar-height;
  border-radius: 50%;
}
.comment-time {
 font-size: $font_small;
}
.ddddddd {
  width: 400px;
}
</style>
