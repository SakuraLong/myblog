import CubismModelWrapper from './cubismModelWrapper'

import { Live2DModel } from 'pixi-live2d-display/cubism4'
import Timer from '@/utils/timer'

/**
 * 模型管理器
 *
 * ### 表情调用方式
 * 1. InternalModel.prototype.__expression(string expression, object options)
 *     - 该函数不可被子类重写
 * 2. InternalModel.prototype.expression(子类重写自定义类型, object options)
 *     - 函数内部最终应该调用ModelManager.prototype.__expression
 * ### 动作调用方式
 * 1. InternalModel.prototype.__motion(string motion, object options)
 *     - 该函数不可被子类重写
 * 2. InternalModel.prototype.motion(子类重写自定义类型, object options)
 *     - 函数内部最终应该调用ModelManager.prototype.__motion
 * ### 可重写回调函数
 * 1. InternalModel.prototype.loaded() 模型加载完成后触发
 * 2. InternalModel.prototype.hitAreas(Array hitAreas) 模型被点击时触发
 * 3. InternalModel.prototype.idle() 模型进入空闲状态时触发
 * 4. InternalModel.prototype.destroy() 模型被销毁时触发
 * 6. InternalModel.prototype.restoreExpression() 模型表情恢复至最近一次保存的状态
 */
export default class InternalModel extends CubismModelWrapper {
  static name = 'default'
  constructor(name) {
    super()
    /**
     * 模型名字
     */
    this._name = name || 'default'

    /**
     * pixi-live2d-display/cubism4 模型
     */
    this._model = null

    /**
     * live2D配置项，子类必须要重写
     */
    this._live2DFrom = {}

    /**
     * 动画计时器
     */
    this._timer = new Timer()

    /**
     * 当前的表情
     */
    this._expression = ''

    /**
     * 当前的动作
     */
    this._motion = ''

    /**
     * 暂存的数据
     */
    this._saveData = {
      expression: '',
      motion: ''
    }

    /**
     * 状态数据
     */
    this._statusData = {
      hitIgnore: false
    }

    this.init()
  }

  init() {
    // 创建表情恢复计时器
    // 创建闲暇状态计时器
    //
    this._timer.create('expression', false, 5000)
    this._timer.create('idle', false, 1000 * 60 * 5)
    // 监听表情恢复计时器
    // 监听闲暇状态计时器
    //
    this._timer.addTimeoutListener('expression', this.restoreExpression, this)
    this._timer.addTimeoutListener('idle', this.idle, this)
    // 启动闲暇状态计时器
    //
    this._timer.restart('idle')
  }

  setHitIgnore(hitIgnore) {
    this._statusData.hitIgnore = hitIgnore
  }

  async load(app) {
    this._model = await Live2DModel.from(this._live2DFrom)
    if (this._destroyed || this._model === null || app.stage === null) return
    app.stage.addChild(this._model)
    this.setCubismModel(this._model.internalModel.coreModel)

    this._model.on('hit', (hitAreas) => {
      this.hitAreas(hitAreas)
    })

    this.loaded()
  }

  loaded() {
    this.emit('loaded')
  }

  destroy() {
    super.destroy()
    if (this._time)  this._time.destroy()
    if (this._model)  this._model.destroy()
  }

  /**
   * 保存表情名字
   * @param {String} expression 表情名字
   * @returns
   */
  saveExpression(expression) {
    if (this._saveData.expression !== '') return
    this._saveData.expression = expression
  }

  /**
   * 尝试恢复上次保存的表情
   * @returns
   */
  restoreExpression() {
    if (this._saveData.expression === '') return
    this.__expression(this._saveData.expression)
    this._saveData.expression = ''
    this.restoreExpression()
  }

  /**
   * 空闲状态触发
   */
  idle() {
    return
  }

  /**
   * 做表情
   * ```js
   * const options = {
   *   autoRecover: true, // 默认 true, 默认动画是否恢复
   *   update: true, // 是否更新 __expression__
   *   duration: 5000, // 默认 5000, 默认动画恢复默认时长
   *   restore: false, // 默认 false, 是否恢复为最近一次保存的状态(为true时，其余参数无效，且无需指定表情名字)
   * }
   * ```
   * @param {String} expression 表情
   * @param {Object} options
   * @returns
   */
  __expression(expression, options) {
    // console.log(expression)
    if (this._destroyed) return
    if (!this._model || expression === '') return
    options = options || {}
    const autoRecover   =   options.autoRecover   === undefined
    const update        =   options.update        ===  undefined
    const duration      =   options.duration      ||  5000
    const restore       =   !(options.restore     === undefined)
    if (restore) {
      this.restoreExpression()
    } else {
      if (autoRecover) {
        this.saveExpression(this._expression)
        this._timer.restart('expression', duration)
      } else {
        this._timer.stop('expression')
      }
      if (update) {
        this._expression = expression
      }
      this._model.expression(expression)
      this.emit('expression', expression)
    }
  }

  /**
   * 子类重写的做表情方法
   * @param {*} expression 子类定义的表情参数
   * @param {Object} options 配置项
   */
  expression(expression, options) {
    this.__expression(expression, options)
  }

  /**
   * 做动作
   * @param {Array} motion 动作
   * @param {Object} options 配置项
   * @returns
   */
  __motion(motion, options) {
    if (this._model) this._model.motion(...motion)
    return true
  }

  /**
   * 点击事件触发
   * @param {Array} hitAreas 点击区域列表
   */
  hitAreas(hitAreas) {
    if (this._statusData.hitIgnore) {
      this._statusData.hitIgnore = false
      return false
    }
    // 重启空闲状态计时器
    //
    this._timer.restart('idle')
    this.emit('hitAreas', hitAreas)
    return true
  }

  /**
   * 改变模型主题
   * @param {*} theme 主题
   * @returns
   */
  themeTo(theme) {
    return
  }

  /**
   * 获取主题
   * @returns theme list
   */
  getThemes() {
    return ['light', 'dark']
  }

  /**
   * 更换模型服装
   * @param {*} costume 服装
   * @returns
   */
  costumeTo(costume) {
    return
  }

  /**
   * 获取模型服装
   * @returns costumes list
   */
  getCostumes() {
    return []
  }
}
