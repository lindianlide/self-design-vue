import { App } from 'vue'

import CEmployeeDescription from './CEmployeeDescription.vue'
CEmployeeDescription.install = function (app: App) {
  // 组件注册，按需引入
  app.component(CEmployeeDescription.name, CEmployeeDescription)
  return app
}

export default CEmployeeDescription
