import type { Result } from '@/types/Result'
import request from '@/utils/request'
export function loginApi(params: any): Promise<Result> {
  return request.post('user/login', params)
}
export function userInfoApi(): Promise<Result> {
  return request.get('user/info')
}
export function logoutApi(): Promise<Result> {
  return request.post('user/logout')
}
export function registryApi(params: any) {
  return request.post('user/registry', params)
}
export function updateUserInfoApi(user: any): Promise<Result> {
  return request.post('user/info', user)
}
