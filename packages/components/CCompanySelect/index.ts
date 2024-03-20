import { App } from 'vue'

import CCompanySelect from './CCompanySelect.vue'
CCompanySelect.install = function (app: App) {
  // 组件注册，按需引入
  app.component(CCompanySelect.name, CCompanySelect)
  return app
}

export default CCompanySelect
