import { App } from 'vue'

import CUserInput from './CUserInput.vue'
CUserInput.install = function (app: App) {
  // 组件注册，按需引入
  app.component(CUserInput.name, CUserInput)
  return app
}

export default CUserInput
