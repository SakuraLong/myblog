import { set, get, del } from '@/utils/stroage'
import code from './code'
import BlogManager from '@/BlogManager'

export function setToken(token /* encrypted */) {
  try {
    token = code.Base64.decode(token)
    token = code.CryptoJS.decrypt(token)
    token = code.CryptoJS.encrypt(token, BlogManager.password.AES_TOKEN_KEY)
    set(0, 'TOKEN', token)
  } catch {
    return false
  }
  return true
}

export function getToken() {
  try {
    let token = get(0, 'TOKEN', '')
    if (token === '') return false
    token = code.CryptoJS.decrypt(token, BlogManager.password.AES_TOKEN_KEY)
    token = code.RSA.encrypt(token)
    return token /* encrypted */
  } catch {
    return false
  }
}
