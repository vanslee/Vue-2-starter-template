<script>
import { VEmojiPicker } from 'v-emoji-picker'
import { mapActions, mapState } from 'pinia'
import { formatTime } from '@/utils/time'
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
      formatTime,
      userStore: {},
      isLoading: false,
      emojiRootVisible: false,
      emojiReplyVisible: false,
      commentInputVisible: false,
      cdn: process.env.VUE_APP_WEBSITE_CDN,
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
  },
  methods: {
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
  <div>
    <el-divider />
    <el-row>
      <el-col :span="2" class="hidden-xs-only">
        <el-image :src="`${cdn}${comment.userAvatar}`" class="user-avatar" />
      </el-col>
      <el-col :span="4" class="hidden-sm-and-up">
        <el-image style="width: 12vw" :src="`${cdn}${comment.userAvatar}`" />
      </el-col>
      <el-col :span="16" class="hidden-sm-and-up">
        <el-row>
          <el-row>
            {{ comment.userNick }}
            <i style="color: red">[作者]</i>
          </el-row>
          <el-row>{{ comment.content }}</el-row>
          <el-row>
            {{ formatTime(comment.createTime) }} {{ comment.location }} &emsp; &emsp;
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
          <el-col :span="2">
            <el-image
              :style="{ width: '60px', height: '60px', borderRadius: '50%' }"
              :src="`${cdn}${children.userAvatar}`"
            />
          </el-col>
          <el-col :span="22">
            <el-row>
              <el-row>
                <i>{{ children.userNick }}</i>
                回复 {{ children.content }}
              </el-row>
              <el-row>
                {{ formatTime(children.createTime) }}
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
      <el-col :span="20" class="hidden-xs-only">
        <el-row>
          <el-row>
            {{ comment.userNick }}
            <i style="color: red">[作者]</i>
          </el-row>
          <el-row>{{ comment.content }}</el-row>
          <el-row>
            {{ formatTime(comment.createTime) }} {{ comment.location }} &emsp; &emsp;
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
          <el-col :span="2">
            <el-image
              :style="{ width: '60px', height: '60px', borderRadius: '50%' }"
              :src="`${cdn}${children.userAvatar}`"
            />
          </el-col>
          <el-col :span="22">
            <el-row>
              <el-row>
                <i>{{ children.userNick }}</i>
                回复 {{ children.content }}
              </el-row>
              <el-row>
                {{ formatTime(children.createTime) }}
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
    <el-drawer
      v-model:visible="commentInputVisible" size="30%" title="发表评论" direction="btt" :show-close="false"
      style="width: 50%; margin: 0 auto" class="hidden-xs-only"
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
    <el-drawer
      v-model:visible="commentInputVisible" title="发表评论" direction="btt" :show-close="false"
      class="hidden-sm-and-up"
    >
      <el-input v-model="params.content" style="width: 90vw" placeholder="机会是留给有准备的人">
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
  </div>
</template>

<style scoped>
i {
  cursor: pointer;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>
