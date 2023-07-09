import settings from '@/config'
const { storage, tokenName, userInfoName } = settings
export function hasLogin() {
  return getAccessToken().length > 12
}
/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description 获取accessToken
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getAccessToken(): string {
  if (storage) {
    if (storage === 'localStorage')
      return localStorage.getItem(tokenName) || ''

    else if (storage === 'sessionStorage')
      return sessionStorage.getItem(tokenName) || ''

    else
      return localStorage.getItem(tokenName) || ''
  }
  else {
    return localStorage.getItem(tokenName) || ''
  }
}

/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description 存储accessToken
 * @param accessToken
 * @returns {void|*}
 */
export function setAccessToken(accessToken: string) {
  if (storage) {
    if (storage === 'localStorage')
      return localStorage.setItem(tokenName, accessToken)

    else if (storage === 'sessionStorage')
      return sessionStorage.setItem(tokenName, accessToken)

    else
      return localStorage.setItem(tokenName, accessToken)
  }
  else {
    return localStorage.setItem(tokenName, accessToken)
  }
}

/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description 移除accessToken
 * @returns {void|Promise<void>}
 */
export function removeAccessToken() {
  if (storage) {
    if (storage === 'localStorage') {
      localStorage.removeItem(userInfoName)
      localStorage.removeItem(tokenName)
    }
    else if (storage === 'sessionStorage') {
      return sessionStorage.clear()
    }
    else {
      localStorage.removeItem(userInfoName)
      localStorage.removeItem(tokenName)
    }
  }
  else {
    localStorage.removeItem(userInfoName)
    localStorage.removeItem(tokenName)
  }
}
