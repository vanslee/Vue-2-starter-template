import request from '@/utils/request'
export function getRouterList(data: any) {
  return request({
    url: '/menu/navigate',
    method: 'post',
    data,
  })
}
