import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import 'vite-plugin-doc-preview/style/style.css'
import 'ant-design-vue/dist/reset.css'
import './assets/main.less'

// highlight 的样式，依赖包，组件
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

import Antd from 'ant-design-vue'

// 完整引入组件库
import selfDesignVue from '../packages/components/index'
// import selfDesignVue from '../lib/selfDesignVue.js'
//import '../lib/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(selfDesignVue)
app.use(Antd)
app.use(i18n)
app.use(hljsVuePlugin)
app.mount('#app')
