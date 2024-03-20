import { App } from 'vue'

import CForm from './CForm.vue'
CForm.install = function (app: App) {
  // 组件注册，按需引入
  app.component(CForm.name, CForm)
  return app
}

export default CForm
