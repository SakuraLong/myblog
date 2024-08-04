import ManagerBase from '../../MessageManager/base'

import Selector from '@/utils/selector'

import { debounce, isObject } from '@/utils/utils'

export default class HTMLMessageManager extends ManagerBase {
  constructor(messageManager, om, mm) {
    super(messageManager)

    /**
     * origin message
     */
    this.om = om.html || []

    /**
     * model message
     */
    this.mm = mm.html || []

    /**
     * message 图
     *
     * - key event
     * - value selectMap
     *
     * selectMap
     *
     * - key select
     * - message row
     */
    this.messageMap = null

    /**
     * 传递给Selector的list
     */
    this.selectList = []

    this.init()

    /**
     * html标签选择器实例
     */
    this.selector = new Selector(this.selectList)

    /**
     * 设置防抖的信息回调函数
     */
    this.onMessageD = debounce(this.onMessage, 100)

    this.selector.on('htmlMessage', this.onMessageD, this)
  }

  init() {
    const resMap = new Map()
    const build = (config) => {
      const events = Object.keys(config)
      events.forEach((event) => {
        if (!resMap.has(event)) resMap.set(event, new Map())
        const messages = config[event]
        messages.forEach((message) => {
          const select = message[0]
          resMap.get(event).set(select, message)
        })
      })
    }
    const getSelectList = () => {
      const res = []
      const events = Array.from(resMap.keys())
      events.forEach((event) => {
        const selects = Array.from(resMap.get(event).entries())
        selects.forEach((select) => {
          res.push([event, select[0], 'htmlMessage'])
        })
      })
      return res
    }
    // 相同选择器下 后面的配置会覆盖前面的配置
    //
    build(this.om)
    build(this.mm)
    const sl = getSelectList()
    this.messageMap = resMap
    this.selectList = sl
  }

  /**
   * 有html标签被选中时的信息回调
   * @param {Object} data 信息
   * @returns
   */
  onMessage(data) {
    const e = data.e
    const element = data.element
    const event = data.event
    const select = data.select
    let message = ''
    if (this.messageMap.has(event) && this.messageMap.get(event).has(select)) {
      const data = this.messageMap.get(event).get(select)
      const defaultMsg = data[1]
      const attr = data[2]
      const regexp = data[3]
      let attrData = null
      let rfData = null
      document.body.getAttribute
      if (attr) {
        if (element.hasAttribute(attr)) {
          attrData = decodeURIComponent(element.getAttribute(attr))
        } else {
          attrData = decodeURIComponent(element.attr)
        }

        if (regexp instanceof RegExp) {
          // 是正则表达式
          rfData = regexp.exec(attrData)
          regexp.lastIndex = 0
        } else if (regexp instanceof Function) {
          // 是函数
          rfData = regexp(attrData, element)
        }
      }

      if (rfData === false) return

      if (attrData === null) {
        message = defaultMsg
      } else {
        if (rfData === null) {
          message = attrData
        } else {
          if (Array.isArray(rfData)) {
            // 数组
            message = defaultMsg
            rfData.forEach((r, i) => {
              message = message.replace('$' + i.toString(), r)
            })
          } else if (isObject(rfData)) {
            message = rfData.message || defaultMsg
          } else if (typeof rfData === 'string') {
            message = rfData
          }
        }
      }
      if (message === '') return

      this.messageManager.onMessage(message)
    }
  }

  /**
   * 销毁
   */
  destroy() {
    super.destory()
    this.selector.off('htmlMessage', this.onMessageD, this)
    this.selector.destroy()
  }
}
