import { App } from 'vue'

import CBuildCaseSelect from './CBuildCaseSelect.vue'
CBuildCaseSelect.install = function (app: App) {
  // 组件注册，按需引入
  app.component(CBuildCaseSelect.name, CBuildCaseSelect)
  return app
}

export default CBuildCaseSelect
