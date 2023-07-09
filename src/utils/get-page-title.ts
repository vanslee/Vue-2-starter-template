import settings from '@/config'

const title = settings.defaultSettings.title || '李图报个人博客'

export default function getPageTitle(pageTitle: string) {
  if (pageTitle)
    return `${pageTitle} - ${title}`

  return `${title}`
}
