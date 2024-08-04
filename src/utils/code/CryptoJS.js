import CryptoJS from 'crypto-js'
import BlogManager from '@/assets/js/BlogManager'

/**
 * 随机生成指定数量的16进制key
 * @param {int} num key长度
 * @returns key
 */
const generateKey = (num) => {
  const library = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let key = ''
  for (var i = 0; i < num * 16; i++) {
    const randomPoz = Math.floor(Math.random() * library.length)
    key += library.substring(randomPoz, randomPoz + 1)
  }
  return key
}

/**
 * 加密
 * @param {string} word 需要加密的字符串
 * @param {string} key_str key
 * @returns
 */
const encrypt = (word, key_str) => {
  key_str = key_str || BlogManager.password.AES_KEY // 判断是否存在ksy，不存在就用定义好的key
  var key = CryptoJS.enc.Utf8.parse(key_str)
  var srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.toString()
}
/**
 * 解密
 * @param {string} word 需要解密的字符串
 * @param {string} key_str key
 * @returns
 */
const decrypt = (word, key_str) => {
  key_str = key_str || BlogManager.password.AES_KEY
  var key = CryptoJS.enc.Utf8.parse(key_str)
  var decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

export default {
  generateKey,
  encrypt,
  decrypt
}
