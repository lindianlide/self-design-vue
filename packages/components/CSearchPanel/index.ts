import { App } from 'vue'

import CSearchPanel from './CSearchPanel.vue'
CSearchPanel.install = function (app: App) {
  // 组件注册，按需引入
  app.component(CSearchPanel.name, CSearchPanel)
  return app
}

export default CSearchPanel
