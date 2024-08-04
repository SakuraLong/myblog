import EventEmitter from 'eventemitter3'

class SelectorItem extends EventEmitter {
  constructor(selector, element, select, event, trigger, option) {
    super()
    /**
     * 选择器实例
     */
    this.selector = selector

    /**
     * 选定的标签
     */
    this.element = element

    /**
     * 选定该标签使用的querySelectorAll语句
     */
    this.select = select

    /**
     * 需要绑定的事件
     */
    this.event = event

    /**
     * 事件触发后，回调需要触发的事件
     */
    this.trigger = trigger

    /**
     * 配置项
     * ```js
     * const option = {
     *   childrenEvent: false, // 如果事件从子元素冒泡，是否接收(false：不接收)
     * }
     * ```
     */
    this.option = option || {}

    this.onEvent_ = this.onEvent.bind(this)

    this.element.addEventListener(this.event, this.onEvent_)
  }

  onEvent(e) {
    if (e.target !== this.element && !this.option.childrenEvent) return
    e.preventDefault()
    this.selector.onEvent(this.element, this.event, this.select, e, this.trigger)
  }

  destroy() {
    this.element.removeEventListener(this.event, this.onEvent_)
  }
}

export default class Selector extends EventEmitter {
  constructor(selectList, root, config) {
    super()
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

    /**
     * 选择列表
     * ```js
     * const selectList = [
     *   // event, querySelectorAll(...), trigger event name, opt
     *   ['click', '#app', 'clickApp'],
     *   ['mouseenter', 'a', 'enterA', { childrenEvent: false }]
     * ]
     * ```
     */
    this.selectList = selectList || []

    /**
     * 监视变化的根元素
     */
    this.root = root || document.body

    /**
     * 校验
     * 防止reselect事件回调触发
     */
    this.destroyed = false

    /**
     * 标签与SelectorItem图
     *
     * - key: element
     * - value: [selectorItem1, selectorItem2, ...]
     */
    this.map = new Map()

    /**
     * MutationObserver观察者
     */
    this.observer = new MutationObserver((mutationsList, observer) => {
      this.reselect(false, mutationsList, observer)
    })

    /**
     * MutationObserver观察配置项
     */
    this.config = config || { childList: true, subtree: true }

    /**
     * 开始观察
     */
    this.observer.observe(this.root, this.config)

    /**
     * 初始化标签选择
     */
    this.select()
  }

  /**
   * 更新选择列表，并重新选择
   * @param {Array} selectList 选择列表
   */
  updateSelectList(selectList) {
    this.selectList = selectList
    this.reselect(true)
  }

  /**
   * 销毁选择器实例
   */
  destroy() {
    if (this.destroyed) return
    this.destroyed = true
    const selectorItemLists = Array.from(this.map.values())
    selectorItemLists.forEach((selectorItemList) => {
      selectorItemList.forEach((selectorItem) => {
        selectorItem.destroy()
      })
    })
    this.observer.disconnect()
    this.map.clear()
    this.removeAllListeners()
  }

  /**
   * 选择标签
   */
  select() {
    setTimeout(() => {
      if (this.destroyed) return
      this.selectList.forEach((item) => {
        const event = item[0]
        const select = item[1]
        const trigger = item[2]
        const elements = Array.from(document.querySelectorAll(select))
        elements.forEach((element) => {
          const selectorItem = new SelectorItem(this, element, select, event, trigger)
          if (!this.map.has(element)) this.map.set(element, [])
          this.map.get(element).push(selectorItem)
        })
      })
    }, 0)
  }

  /**
   * 重新选择
   */
  reselect(force = false) {
    setTimeout(() => {
      if (this.destroyed) {
        return
      }
      if (force === true) {
        const selectorItemLists = Array.from(this.map.values())
        selectorItemLists.forEach((selectorItemList) => {
          selectorItemList.forEach((selectorItem) => {
            selectorItem.destroy()
          })
        })
        this.map.clear()
      }
      const tempMap = new Map()
      const visitedElements = new Set()
      this.selectList.forEach((item) => {
        const event = item[0]
        const select = item[1]
        const trigger = item[2]
        const elements = Array.from(document.querySelectorAll(select))
        elements.forEach((element) => {
          // 文档中存在该元素
          //
          visitedElements.add(element)
          // 如果map中存在该元素 直接忽略
          // 这样会导致reselect过程不能增加event
          // 新增事件 需要force为true
          //
          if (this.map.has(element)) return
          const selectorItem = new SelectorItem(this, element, select, event, trigger)
          if (!tempMap.has(element)) tempMap.set(element, [])
          tempMap.get(element).push(selectorItem)
        })
      })
      // 由于tempMap和map键不会有冲突
      // 直接合并
      //
      this.map = new Map([...this.map, ...tempMap])
      const elements = Array.from(this.map.keys())
      elements.forEach((element) => {
        if (
          !document.contains(element) ||
          !visitedElements.has(element)
        ) {
          // dom中不存在的
          // 元素没有被遍历过的（dom中存在，但是没有被select）（但是好像不会出现这个情况，触发直接改selectList然后reselect(false)）
          //
          const selectorItemList = this.map.get(element)
          selectorItemList.forEach((selectorItem) => {
            selectorItem.destroy()
          })
          this.map.delete(element)
        }
      })
    }, 0)
  }

  /**
   * SelectorItem实例触发后的回调函数
   *
   * @param {HTMLElement} element html元素
   * @param {String} event 事件触发名字
   * @param {String} select querySelectorAll对应的选择方法
   * @param {Object} e 事件获取的事件对象
   * @param {String} trigger 触发器名字
   */
  onEvent(element, event, select, e, trigger) {
    this.emit(trigger, {
      element,
      event,
      select,
      e
    })
  }
}
