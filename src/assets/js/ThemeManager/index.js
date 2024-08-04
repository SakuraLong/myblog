import { set, get } from '@/utils/stroage'
import EventEmitter from 'eventemitter3'

export default class ThemeManager {
  static instance = null
  constructor() {
    if (ThemeManager.instance !== null) return ThemeManager.instance
    /**
     * 本地数据库键
     */
    this.KEY = 'blog-theme'

    /**
     * 系统主题
     *
     * - 0 light
     * - 1 dark
     */
    this.mode = 0

    /**
     * 设置主题
     *
     * - 0 light
     * - 1 dark
     * - 2 os
     */
    this.themeMode = 0

    /**
     * 应该使用的主题
     *
     * - 0 light
     * - 1 dark
     */
    this.useMode = 0

    this.ee = new EventEmitter()

    this.init()

    ThemeManager.instance = this
  }

  init() {
    this.listenForSystemThemeChange() // get os mode
    const data = get(0, this.KEY, {
      themeMode: 2
    }, 'JSON')
    this.themeMode = data.themeMode

    this.useTheme()
  }

  useTheme() {
    if (this.themeMode === 2) this.useMode = this.mode
    else this.useMode = this.themeMode

    if (this.useMode === 0) {
      document.body.classList.remove('theme-dark')
      document.body.classList.add('theme-light')
    } else {
      document.body.classList.remove('theme-light')
      document.body.classList.add('theme-dark')
    }
    if (this.themeMode === 2) {
      document.body.classList.add('theme-os-default')
    } else {
      document.body.classList.remove('theme-os-default')
    }
    this.ee.emit('change', {
      useMode: this.useMode,
      themeMode: this.themeMode
    })
  }

  listenForSystemThemeChange() {
    // 检查matchMedia是否可用
    if (window.matchMedia) {
      // 创建一个媒体查询来检测主题偏好
      const prefersDarkSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
      // 定义一个回调函数，当主题偏好变化时调用
      const handleThemeChange = (e) => {
        const currentTheme = e.matches ? 'dark' : 'light'
        this.mode = currentTheme === 'dark' ? 1 : 0
        this.useTheme()
      }
      // 初始调用，以确保在添加监听器之前打印当前主题
      handleThemeChange(prefersDarkSchemeQuery)
      // 添加监听器
      prefersDarkSchemeQuery.addEventListener('change', handleThemeChange)
    } else {
      console.log('当前浏览器不支持matchMedia API')
    }
  }

  changeTMTo(themeMode) {
    if (this.themeMode !== themeMode) {
      this.themeMode = themeMode
      set(0, this.KEY, {
        themeMode: this.themeMode
      }, 'JSON')

      if (document.startViewTransition) { // 如果支持就视图变换
        document.startViewTransition(() => { // 开始视图变换
          this.useTheme()
        })
      } else { // 不支持就执行原来的逻辑
        this.useTheme()
      }
    }
  }

  on() {
    this.ee.on(...arguments)
  }

  off() {
    this.ee.off(...arguments)
  }
}
