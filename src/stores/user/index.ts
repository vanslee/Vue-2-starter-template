import { defineStore } from 'pinia'
import { Message, Notification } from 'element-ui'
import type { User } from '@/types/User'
import type { Result } from '@/types/Result'
import {
  removeAccessToken,
  setAccessToken,
} from '@/utils/accessToken'
import { loginApi, logoutApi, updateUserInfoApi, userInfoApi } from '@/apis/user'
import setting from '@/config'

import router from '@/router'
export const useUserStore = defineStore('user', {
  // 开启持久化
  persist: true,
  // 定义state
  state: () => ({
    user: {} as User,
  }),
  getters: {},
  actions: {
    // 用户登录获取token
    async login(params: any) {
      await this.getAccessToken(params)
      await this.getUserInfo()
    },
    // 获取token
    async getAccessToken(params: any): Promise<void> {
      const { code, data } = await loginApi(params)
      if (code === 200) {
        const accessToken = data.tokenValue
        setAccessToken(accessToken)
        const hour = new Date().getHours()
        const thisTime
          = hour < 8
            ? '早上好'
            : hour <= 11
              ? '上午好'
              : hour <= 13
                ? '中午好'
                : hour < 18
                  ? '下午好'
                  : '晚上好'
        Notification.success(`欢迎登录${setting.title},${thisTime}！`)
      }
      else {
        Notification.error(`登录接口异常，未正确返回${setting.tokenName}...`)
      }
    },
    // 获取token成功后获取用户信息
    async getUserInfo(): Promise<string[]> {
      const { code, data } = await userInfoApi()
      if (code !== 200) {
        Message.error('验证失败，请重新登录...')
        return ['']
      }
      else {
        // this.permissions = ['admin']
        this.user = data
        return []
        // return this.permissions
      }
    },
    async logout() {
      const { code } = await logoutApi()
      if (code === 200) {
        removeAccessToken()
        router.push({ name: 'Login' })
        this.$reset()
        return true
      }
      return false
    },
    // setPermissions(permissions: string[]) {
    //   this.permissions = permissions
    // },
    resetAccessToken() {
      // this.permissions = []
      setAccessToken('')
      removeAccessToken()
    },
    async updateUserInfo() {
      const { code, msg } = await updateUserInfoApi(this.user)
      if (code === 200)
        Message.success('修改成功')

      else
        Message.error(msg)
    },
    uploadUserAvatar(res: Result) {
      const { data, code } = res
      if (code === 200)
        this.user.avatarImgUrl = data.url
    },

  },
})
