import JsBase64 from 'js-base64'

const USER_TOKEN = 'LILI-TOKEN'
const USER_INFO = 'LILI-USERINFO'
const USER_SETTING = 'LILI-SETTING'

/**
 * 设置用户授权token
 *
 * @param {String} token
 */
export function setToken (token) {
  return localStorage.setItem(
    USER_TOKEN,
    token
  )
}

/**
 * 获取授权token
 */
export function getToken () {
  return localStorage.getItem(USER_TOKEN)
}

/**
 * 设置用户信息
 *
 * @param {Object} data
 */
export function setUserInfo (data) {
  localStorage.setItem(USER_INFO, JsBase64.Base64.encode(JSON.stringify(data)))
}

/**
 * 获取用户信息
 */
export function getUserInfo () {
  const data = JsBase64.Base64.decode(localStorage.getItem(USER_INFO) || '')
  return data ? JSON.parse(data) : {}
}

/**
 * 获取用户本地缓存的设置信息
 */
export function getUserSettingCache () {
  const data = localStorage.getItem(USER_SETTING)
  return data ? JSON.parse(data) : {}
}

/**
 * 用户设置保存到浏览器缓存中
 *
 * @param {Object} state 用户设置相关信息
 */
export function setUserSettingCache (state) {
  localStorage.setItem(USER_SETTING, JSON.stringify(state))
}

/**
 * 删除用户相关缓存信息
 */
export function removeAll () {
  localStorage.removeItem(USER_TOKEN)
  localStorage.removeItem(USER_INFO)
  localStorage.removeItem(USER_SETTING)
}
