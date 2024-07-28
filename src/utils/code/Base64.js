import { Base64 } from 'js-base64'

const encode = (word) => {
  return Base64.encode(word)
}

const decode = (word) => {
  return Base64.decode(word)
}

export default {
  encode,
  decode
}
