import type { Result } from '@/types/Result'
import request from '@/utils/request'
export function getCommentBriefApi(params: any): Promise<Result> {
  return request.post('comment/comment_brief', params)
}
export function publishCommentApi(params: any): Promise<Result> {
  return request.put('comment/add_article_comment', params)
}
