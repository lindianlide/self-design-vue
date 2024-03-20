import { createI18n } from 'vue-i18n/dist/vue-i18n.cjs'

export const language = {
  defaultValue: 'zhCN',
  getItem() {
    let language = localStorage.getItem('language')
    if (language) return language
    language =
      navigator.language && navigator.language.startsWith('en')
        ? 'enUS'
        : navigator.language.replace('-', '').replace('_', '') || this.defaultValue
    localStorage.setItem('language', language)
    return language
  },
  setItem(item) {
    localStorage.setItem('language', item)
  }
}
// const modules = import.meta.globEager("@/locales/**/*.json");

import enUS from '@packages/locales/enUS.json'
import zhCN from '@packages/locales/zhCN.json'

const messages = {
  zhCN: zhCN,
  enUS: enUS
}

export default createI18n({
  legacy: false,
  locale: language.getItem(),
  messages
})
