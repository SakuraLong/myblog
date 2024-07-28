import { createI18n } from 'vue-i18n'
import { get } from '@/utils/stroage'
import enLocale from './en' // 导入项目中用到的英文语言包
import zhLocale from './zh-Hans' // 导入项目中用到的中文语言包
const KEY = 'blog-lang'
const nowLang = get(0, KEY, ['简体中文', 'zh-Hans', 0], 'JSON')
const i18n = createI18n({
  locale: nowLang[1],
  messages:{
    'zh-Hans':zhLocale,
    en: enLocale
  }
})
export default i18n
