import { ElMessage } from 'element-plus'

function getType(obj) {
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[Object.prototype.toString.call(obj)]
}

export function deepClone(target, stack) {
  const type = getType(target)
  if (type === 'array' || type === 'object') {
    let _clone
    if (type === 'array')  _clone = []
    if (type === 'object') _clone = {}
    // 检查循环引用并返回其对应的克隆
    stack || (stack = new WeakMap())
    var stacked = stack.get(target)
    if (stacked) {
      return stacked
    }
    stack.set(target, _clone)
    // 复杂数据类型 递归实现
    if (type === 'array') {
      target.forEach((element) => {
        _clone.push(deepClone(element, stack))
      })
    } else {
      for (const key in target) {
        if (Object.hasOwnProperty.call(target, key)) {
          const element = target[key]
          _clone[key] = deepClone(element, stack)
        }
      }
    }
    return _clone
  } else {
    // 基础数据类型 直接返回
    return target
  }
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

export function isObject(value) {
  return typeof value === 'object' && value !== null && Object.prototype.toString.call(value) === '[object Object]'
}

export function probability(a, b) {
  if (a <= 0 || b <= 0) {
    throw new Error('输入的a和b必须大于0')
  }
  const random = Math.random()
  return random < (a / b)
}

export function isInTimeInterval(timePeriods) {
  // 获取当前时间
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()

  // 将当前时间转换为分钟
  const currentMinutes = hours * 60 + minutes

  // 遍历时间区间列表
  for (const [start, end] of timePeriods) {
    // 将时间区间的开始和结束时间转换为分钟
    const startMinutes = start * 60
    const endMinutes = end === 24 ? 24 * 60 : end * 60 // 如果结束时间是24，转换为1440

    // 检查当前时间是否在时间区间内
    // 如果当前时间大于等于开始时间，并且小于结束时间
    if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
      return true
    }
  }

  // 如果当前时间不在任何时间区间内，返回false
  return false
}

export function createQuickClickJudge(time = 400, amount = 5) {
  let now = 0
  let timer = null
  return function(func) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      now = 0
    }, time)
    now++
    if (now >= amount) {
      func()
    }
  }
}
