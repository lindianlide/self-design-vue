import { App } from 'vue'

import CProjectSelect from './CProjectSelect.vue'
CProjectSelect.install = function (app: App) {
  // 组件注册，按需引入
  app.component(CProjectSelect.name, CProjectSelect)
  return app
}

export default CProjectSelect
