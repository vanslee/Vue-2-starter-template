import settings from '@/config'

/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description 设置标题
 * @param pageTitle
 * @returns {string}
 */
export default function getPageTitle(pageTitle: string): string {
  if (pageTitle)
    return `${pageTitle}-${settings.title}`
  return `${settings.title}`
}
