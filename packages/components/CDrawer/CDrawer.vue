<script>
import { merge } from 'lodash'
import { Drawer } from 'ant-design-vue'
import { withInstall } from '@packages/utils/util'
//vue3二次封装组件
const CDrawer = merge({}, Drawer, {
  name: 'CDrawer',
  props: {
    width: {
      type: [String, Number],
      default: '50%'
    },
    destroyOnClose: {
      type: Boolean,
      default: true
    }
  }
})
export default withInstall(CDrawer)
</script>
