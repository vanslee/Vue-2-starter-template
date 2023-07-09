import axios from 'axios'
// import { throttle } from 'lodash'
// import { Message } from 'element-ui'
import type { Result } from '@/types/Result'
import router from '@/router'
import { close, start } from '@/utils/nprogress'
import settings from '@/config'
import { getAccessToken, removeAccessToken } from '@/utils/accessToken'
const { baseURL } = settings

// const throttled = throttle(tipError, 1000, {
//   leading: true, // 在开始时立即执行函数
//   trailing: false, // 在结束时不执行函数
// })

const service = axios.create({
  baseURL,
  timeout: 18000000,
})
service.interceptors.request.use(
  (config) => {
    start()
    // 请求添加Token
    config.headers[settings.tokenName] = getAccessToken()
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response) => {
    const { data } = response
    if (data.code === 5000) {
      // 身份过期
      // 1.删除token
      removeAccessToken()
      router.push({ name: 'Login' })
    }
    close()
    return data
  },
  () => {
    return Promise.resolve({ code: 500, msg: '后台错误', data: {} } as Result)
    // const msg = error?.response?.data?.msg ?? '未知错误'
    // throttled(msg)
    // return Promise.resolve(response.data)
    // return Promise.reject(error)
  },
)

// function tipError(msg: string) {
//   Message.error({
//     message: msg,
//     duration: 5 * 1000,
//   })
// }

export default service
