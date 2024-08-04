
import JSEncrypt from 'jsencrypt'
import BlogManager from '@/assets/js/BlogManager'

/**
 * RSA加密
 * @param publicKey 公钥
 * @param plainText 明文
 * @returns {*} 密文
 */
function encrypt(plainText) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(BlogManager.password.RSA_PUBLIC_KEY)
  return encryptor.encrypt(plainText)
}

export default {
  encrypt
}
