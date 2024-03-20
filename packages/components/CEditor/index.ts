import { App } from 'vue'

import CEditor from './CEditor.vue'
CEditor.install = function (app: App) {
  // 组件注册，按需引入
  app.component(CEditor.name, CEditor)
  return app
}

export default CEditor
