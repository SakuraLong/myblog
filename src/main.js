import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import '@/assets/css'
import i18n from './assets/i18n/index.js'

import * as PIXI from 'pixi.js'

window.PIXI = PIXI

import mydetails from '@/components/CategoriesSmall/mydetails.vue'

import BlogManager from '@/assets/js/BlogManager'

const app = createApp(App)
app.use(store).use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(i18n)

app.component('MyDetails', mydetails)

app.mount('#app')

const helloText = BlogManager.data.personalInfo.helloText
const nameText = BlogManager.data.personalInfo.nameText
const consoleStyle = BlogManager.data.blog.consoleStyle

console.log('%c ' + helloText + ' this is ' + nameText, consoleStyle)
