import EventEmitter from 'eventemitter3'
import * as PIXI from 'pixi.js'

class Live2DShower extends EventEmitter {
  constructor(options) {
    super()
    /**
     * PIXI.Application 配置项
     */
    this._options = options

    /**
     * PIXI.Application 实例
     */
    this._app = new PIXI.Application(options)

    /**
     * 模型管理器实例
     */
    this._live2DModel = null

    /**
     * 插件
     */
    this._plugins = []
  }

  /**
   * 将模型添加到画面
   *
   * 一个Shower最多只有一个模型
   * @param {Live2DModel} live2dModel Live2DModel实例对象
   */
  async add(live2dModel) {
    if (this._live2DModel) this._live2DModel.destroy()
    this._live2DModel = live2dModel
    await live2dModel.load(this._app)
    this.emit('added')
  }

  /**
   * 移除Shower中的模型
   */
  remove() {
    if (this._live2DModel) {
      this._live2DModel.destroy()
      this._live2DModel = null
      this.emit('removed')
    }
  }

  /**
   * 销毁app实例
   * 销毁模型实例
   * 销毁其他实例
   */
  destroy() {
    this.emit('destroy')
    if (this._live2DModel) this._live2DModel.destroy()
    this._plugins.forEach((p) => {
      p.destroy()
    })
    this._app.destroy()
    this.emit('destroyed')
  }

  /**
   * 设置插件
   * @param {Function} plugin 插件
   * @returns this
   */
  use(plugin /*, params, ... */) {
    const args = [this].concat(Array.prototype.slice.call(arguments, 1))
    plugin.apply(plugin, args)
    return this
  }
}

export default Live2DShower
