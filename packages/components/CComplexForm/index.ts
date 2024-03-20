import { App } from 'vue'

import CComplexForm from './CComplexForm.vue'
CComplexForm.install = function (app: App) {
  // 组件注册，按需引入
  app.component(CComplexForm.name, CComplexForm)
  return app
}

export default CComplexForm
