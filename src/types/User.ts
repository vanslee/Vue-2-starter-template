import type { CategoryRecord } from './Article'

export interface UserRecorc {
  id: number
  phone: number
  username: string
  gender: number
  tureName: string
  personalBrief: string
  avatarImgUrl: string
  categories: Array<CategoryRecord>
}
