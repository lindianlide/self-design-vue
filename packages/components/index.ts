import { App } from 'vue'
import components from './component'
// 所有组件
export * from './component'
import '@packages/assets/common.less'
import '@packages/assets/layout.less'

// 完整引入组件
const install = function (app: App) {
  components.forEach((component) => {
    app.use(component as unknown as { install: () => any })
  })
}

export default {
  install
}
