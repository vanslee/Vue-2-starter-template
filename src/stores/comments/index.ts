import { defineStore } from 'pinia'
// import { loginApi, userInfoApi, logoutApi } from '@/apis/user'
import { getCommentBriefApi, publishCommentApi } from '@/apis/comment'
import type { Result } from '@/types/Result'
export const useCommentStore = defineStore('comment', {
  // 开启持久化
  persist: false,
  // 定义state
  state: () => ({
    comments: [],
    total: 0,
  }),
  getters: {},
  actions: {
    // 用户登录获取token
    async fetchData(params: any) {
      const { code, data } = await getCommentBriefApi(params)
      if (code === 200) {
        this.comments = data.data
        this.total = data.total
      }
    },
    async submitComment(params: any): Promise<Result> {
      const { code } = await publishCommentApi(params)
      if (code === 200)
        return Promise.resolve({ code: 200 })
      else
        return Promise.resolve({ code: 500 })
    },
  },
})
