export interface ArticleRecord {
  id: number
  originalUrl: string
  articleTitle: string
  publishDate: number
  updateDate: number
  imgUrl: string
  views: number
  likes: number
  comments: number
  isDelete: boolean
  userId: number
  collects: number
  mdUrl: string
  articleContent: string
}
export interface PageRecord {
  page: number
  size: number
  current: number
  uid?: string
  total: number
}
export class Article implements ArticleRecord {
  articleContent = ''
  id = -1
  originalUrl = ''
  articleTitle = ''
  publishDate = -1
  updateDate = -1
  imgUrl = ''
  views = 0
  likes = 0
  comments = 0
  isDelete = false
  userId = -1
  collects = 0
  mdUrl = ''
}
export class Page implements PageRecord {
  page = 0
  size = 5
  uid? = ''
  total = 0
  current = 0
}
