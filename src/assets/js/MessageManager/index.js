import EventEmitter from 'eventemitter3'

export default class MessageManager extends EventEmitter {
  constructor() {
    super()
    /**
     * 管理器
     */
    this.managers = []
  }

  /**
   * 销毁事件管理器
   */
  destroy() {
    this.managers.forEach((manager) => {
      manager.destroy()
    })
    this.removeAllListeners()
  }

  /**
   * 收到信息，发布信息事件
   * @param {String} message 信息
   * @param {*} options 配置项（暂时保留）
   */
  onMessage(message, options) {
    this.emit('message', message, options)
  }

  /**
   * 增加管理器
   * @param {ManagerBase} Manager 管理器类
   * @returns 实例化结果
   */
  addManager(Manager /*, params, ... */) {
    const args = [this].concat(Array.prototype.slice.call(arguments, 1))
    const manager = new Manager(...args)
    this.managers.push(manager)
    return manager
  }

  /**
   * 移除管理器实例
   * @param {ManagerBase} manager 管理器实例
   */
  removeManager(manager) {
    this.managers.filter((_manager) => manager === _manager)
    manager.destroy()
  }

  /**
   * 移除所有管理器实例
   */
  removeAllManagers() {
    this.managers.forEach((manager) => {
      manager.destroy()
    })
    this.managers = []
  }
}
