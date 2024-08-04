import Event from './event'
import { isObject } from './utils'

class TimerItem {
  static NULL = 'null'
  static CREATED = 'created'
  static ERROR = 'error'
  static RUNNING = 'running'
  static INTERRUPT = 'interrupt'
  static FINISH = 'finish'
  constructor(t, event, name, interval, time, options, meta) {
    this.t = t

    this.event = event

    this.name = name

    this.interval = interval

    this.time = time

    this.options = options || {}

    this.meta = meta || {}

    this.state = TimerItem.NULL // null created running interrupt finish error

    this.timer = null

    if (!this.check()) this.state = TimerItem.ERROR
    else this.state = TimerItem.CREATED
  }

  check() {
    if (typeof this.interval !== 'boolean') return false
    if (Number.isNaN(Number(this.time))) return false
    if (this.time < 0 || !Number.isInteger(this.time)) return false
    if (!isObject(this.options) || !isObject(this.meta)) return false
    return true
  }

  start(time) {
    this.time = time || this.time
    if (this.timer) {
      if (this.interval) clearInterval(this.timer)
      else clearTimeout(this.timer)
    }
    if (this.interval) {
      this.timer = setInterval(this.callback.bind(this), this.time)
    } else {
      this.timer = setTimeout(this.callback.bind(this), this.time)
    }
    this.state = TimerItem.RUNNING
  }

  stop() {
    if (this.timer) {
      if (this.interval) clearInterval(this.timer)
      else clearTimeout(this.timer)
    }
    this.state = TimerItem.INTERRUPT
  }

  callback() {
    this.state = TimerItem.FINISH
    const res = {
      meta: this.meta,
      data: {
        name: this.name,
        interval: this.interval,
        time: this.time
      }
    }
    this.event.trigger(this.name, res)

    this.afterCallback()
  }

  afterCallback() {
    if (this.options.delete === true) {
      this.t.delete(this.name)
    }
  }

  destroy() {
    if (this.timer) {
      if (this.interval) clearInterval(this.timer)
      else clearTimeout(this.timer)
    }
  }
}

class Timer {
  constructor() {
    this.timerMap = new Map()

    this.timerEvent = new Event()
  }

  /**
   * 创建新的计时器
   * ```js
   * const options = {
   *   delete: false, // 倒计时完成自销毁
   * }
   * ```
   *
   * @param {String} name 计时器实例名字（唯一）
   * @param {Boolean} interval 是否循环
   * @param {Number} time 计时器时长
   * @param {Object} options 配置项
   * @param {Object} meta 传递参数
   * @returns 是否创建成功
   */
  create(name = 'base', interval = true, time = 0, options = {}, meta = {}) {
    if (this.has(name)) return false
    const timerItem = new TimerItem(this, this.timerEvent, name, interval, time, options, meta)
    if (timerItem.state === TimerItem.ERROR) return false
    this.timerMap.set(name, timerItem)
    return true
  }

  get(name) {
    if (name === true) return Array.from(this.timerMap.entries())
    else return this.timerMap.get(name)
  }

  has(name) {
    return this.timerMap.has(name)
  }

  state(name) {
    if (!this.has(name)) return false
    return this.get(name).state
  }

  start(name, time) {
    if (!this.has(name)) return false
    const ti = this.get(name)
    if (ti.state === TimerItem.RUNNING) return false
    this.get(name).start(time)
    return true
  }

  stop(name) {
    if (name instanceof Function) {
      const list = this.get(true)
      list.forEach((item) => {
        if (name(item[0]) === true) {
          item[1].stop()
        }
      })
      return true
    }
    if (!this.has(name)) return false
    this.get(name).stop()
    return true
  }

  restart(name, time) {
    if (!this.has(name)) return false
    this.get(name).start(time)
    return true
  }

  delete(name) {
    if (!this.has(name)) return false
    this.get(name).destroy()
    this.timerMap.delete(name)
    return true
  }

  destroy() {
    const timerItems = this.get(true)
    timerItems.forEach((ti) => {
      ti[1].destroy()
    })
  }

  addTimeoutListener(timerName, func, context = null) {
    this.timerEvent.addEventListener(timerName, func, context)
  }

  removeTimeoutListener(timerName, func, context = null) {
    this.timerEvent.removeEventListener(timerName, func, context)
  }
}

export default Timer
