export interface ArticleRecord {
  id?: number
  authorName: string
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
  articleAbstract: string
  articleContent: string
  categoryId: string
  tags: Array<TagRecord>
  category?: CategoryRecord
}
export interface TagRecord {
  id: number
  createTime: number
  name: string
}
export interface CategoryRecord {
  id: number
  name: string
  createTime: number
  description: string
  cover: string
}
export class Tag implements TagRecord {
  id = -1
  name: string
  createTime = 0
  constructor(id: number, name: string) {
    this.name = name
    this.id = id
  }
}
export class Category implements CategoryRecord {
  id = -1
  name: string
  description = ''
  cover = ''
  createTime = 0
  constructor(id: number, name: string) {
    this.name = name
    this.id = id
  }
}
export interface PageRecord {
  page: number
  size: number
  current: number
  uid?: string
  total: number
  sort: string
  keyword: string
}
export class Article implements ArticleRecord {
  [key: string]: any
  categoryId = ''
  authorName = ''
  articleAbstract = ''
  tags = [] as Array<TagRecord>
  articleContent = ''
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
  keyword = ''
  page = 0
  size = 10
  uid? = ''
  sort = 'desc'
  total = 0
  current = 0
}
