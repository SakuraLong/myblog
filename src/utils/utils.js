import { ElMessage } from 'element-plus'

export const deepClone = (obj, cache = []) => {
  // 如果为普通数据类型，则直接返回，完成拷贝
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  // cache用来储存原始值和对应拷贝数据，在递归调用deepCopy函数时，如果本次拷贝的原始值在之前已经拷贝了，则直接返回储存中的copy值，这样的话就不用再循环复制本次原始值里面的每一项了。
  // 还有一个更为重要的作用，假如原始值里面嵌套两个引用地址相同的对象，使用cache可以保证拷贝出来的copy值里面两个对象的引用地址也相同。
  // 如果find查找的是一个空数组，则不会执行
  const hit = find(cache, (c) => c.original === obj)
  if (hit) {
    return hit.copy
  }
  // 定义拷贝的数据类型
  const copy = Array.isArray(obj) ? [] : {}
  // 用来记录拷贝的原始值和copy值
  cache.push[
    {
      original: obj,
      copy
    }
  ]
  // 递归调用深拷贝函数，拷贝对象中的每一个值
  Object.keys(obj).forEach((key) => {
    copy[key] = deepClone(obj[key], cache)
  })
  return copy
}

/**
 * 显示提示框
 * @param {String} msg 提示信息
 * @param {String} type 提示类型（默认error）
 * @param {Number} duration 提示时长（默认3000(ms)）
 */
export function message(msg, type, duration) {
  type = type || 'error'
  ElMessage({
    message: msg,
    type: type,
    duration: duration || (type === 'error' ? 4 * 1000 : 3 * 1000)
  })
}

/**
 * 防抖函数
 * @param {Function} func 待执行的函数
 * @param {Number} delay 防抖时间
 * @returns Function
 */
export function debounce(func, delay = 200) {
  let timerId
  return function(...args) {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param {Function} func 待执行的函数
 * @param {Number} delay 节流时间
 * @returns Function
 */
export function throttle(func, delay = 200) {
  let timerId
  let lastExecutedTime = 0
  return function(...args) {
    const currentTime = Date.now()
    const timeSinceLastExecution = currentTime - lastExecutedTime
    if (timeSinceLastExecution >= delay) {
      func.apply(this, args)
      lastExecutedTime = currentTime
    } else {
      clearTimeout(timerId)
      timerId = setTimeout(() => {
        func.apply(this, args)
        lastExecutedTime = Date.now()
      }, delay - timeSinceLastExecution)
    }
  }
}

/**
   * 随机字符串生成函数生成器
   * - 闭包存储map
   * @returns 随机字符串生成函数
   */
export function generateRandomStringBase(characters_) {
  const idMap = new Map()
  idMap.set('', true)
  return function(length = 10) {
    let result = ''
    const length_ = length
    const characters = characters_ || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const charactersLength = characters.length

    while (idMap.get(result) === true) {
      for (let i = 0; i < length_; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
    }
    idMap.set(result, true)

    return result
  }
}

/**
 * 将对象全部的key都转成小驼峰
 * @param {Object} obj 对象
 * @returns 对象
 */
export function convertKeysToCamelCase(obj, save = false) {
  const convertKey = (key) => {
    return key.replace(/_([a-zA-Z0-9])/g, (match, letter) => letter.toUpperCase())
  }

  const convertObject = (source) => {
    const result = Array.isArray(source) ? [] : {}
    Object.keys(source).forEach((key) => {
      const camelCaseKey = convertKey(key)
      const value = source[key]
      if (value && typeof value === 'object') {
        result[camelCaseKey] = convertObject(value)
      } else {
        result[camelCaseKey] = value
      }
      // 保留原key
      if (save) result[key] = value
    })
    return result
  }

  return convertObject(obj)
}

/**
 * 将对象全部的key都转成下划线命名法
 * @param {Object} obj 对象
 * @returns 对象
 */
export function convertKeysToSnakeCase(obj) {
  const convertKey = (key) => {
    key = key.replace(/([A-Z]{2,})/g, (match, letter) => `_${letter}`)
    key = key.replace(/[^_A-Z]([A-Z])/g, (match, letter) => match[0] + `_${letter.toLowerCase()}`)
    key = key.replace(/([0-9]+)/g, (match, letter) => `_${letter}`)
    if (key[0] === '_') key = key.slice(1)
    return key
  }

  const convertObject = (source) => {
    const result = Array.isArray(source) ? [] : {}
    if (Array.isArray(source)) {
      source.forEach((item) => {
        if (item && typeof item === 'object') {
          result.push(convertObject(item))
        } else {
          result.push(item)
        }
      })
    } else {
      Object.keys(source).forEach((key) => {
        const snakeCaseKey = convertKey(key)
        const value = source[key]
        if (value && typeof value === 'object') {
          result[snakeCaseKey] = convertObject(value)
        } else {
          result[snakeCaseKey] = value
        }
      })
    }
    return result
  }

  return convertObject(obj)
}

export function scrollToTop(instant = true) {
  window.scrollTo({
    top: 0,
    behavior: instant ? 'instant' : 'smooth'
  })
}
