import type { PageRecord } from '@/types/Article'
import type { Result } from '@/types/Result'
import request from '@/utils/request'
export function getArticleListApi(params: PageRecord): Promise<Result> {
  return request.post('article/list', params)
}
// export function getSeftArticleApi(cid, params) {
//   return request.get('')
// }

export function getArticleDetailsApi(articleId: string): Promise<Result> {
  return request.get(`article/details/${articleId}`)
}
export function publishArticleApi(article: any): Promise<Result> {
  return request.put('article/publish', article)
}
export async function getMarkdownTextApi(markdownUrl: string) {
  const response = await fetch(markdownUrl)
  const text = await response.text()
  return { text }
}
export function getArticleTagsApi(params: any): Promise<Result> {
  const { current, size } = params
  return request.get(`tag/list?current=${current}&size=${size}`)
}
export function getArticleCategoriesApi(params: any): Promise<Result> {
  const { current, size } = params
  return request.get(`category/list?current=${current}&size=${size}`)
}
export function getArticlesByCid(params: any, categoryId: number) {
  const { current, size } = params
  return request.get(`article/category/${categoryId}?current=${current}&size=${size}`)
}
export function deleteAritcleApi(id: number): Promise<Result> {
  return request.delete(`article/delete/${id}`)
}
