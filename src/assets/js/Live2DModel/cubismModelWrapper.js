import EventEmitter from 'eventemitter3'
/**
 * live2D模型包装类
 */
export default class CubismModelWrapper extends EventEmitter {
  constructor() {
    super()
    /**
     * live2D模型
     *
     * 等待子类赋值
     */
    this._cubismModel = null

    /**
     * 是否已经被销毁
     */
    this._destroyed = false
  }

  setCubismModel(cubismModel) {
    this._cubismModel = cubismModel
  }

  addParameterValueById(parameterId, value, weight) {
    if (!this._cubismModel) return
    this._cubismModel.addParameterValueById(parameterId, value, weight)
  }

  setParameterValueById(parameterId, value, weight) {
    if (!this._cubismModel) return
    this._cubismModel.setParameterValueById(parameterId, value, weight)
  }

  getParameterIndex(parameterId) {
    if (!this._cubismModel) return
    this._cubismModel.getParameterIndex(parameterId)
  }

  getParameterValueById(parameterId) {
    if (!this._cubismModel) return
    this._cubismModel.getParameterValueById(parameterId)
  }

  saveParameters() {
    if (!this._cubismModel) return
    this._cubismModel.saveParameters()
  }

  loadParameters() {
    if (!this._cubismModel) return
    this._cubismModel.loadParameters()
  }

  destroy() {
    if (this._destroyed) return
    this._destroyed = true
    this.removeAllListeners()
  }
}
