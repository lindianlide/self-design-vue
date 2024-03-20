<script>
import { merge } from 'lodash'
import { Modal } from 'ant-design-vue'
import { withInstall } from '@packages/utils/util'
//vue3二次封装组件
const CModal = merge(Modal, {
  name: 'CModal',
  props: {
    width: {
      type: [String, Number],
      default: '60%'
    },
    destroyOnClose: {
      type: Boolean,
      default: true
    }
  }
})
export default withInstall(CModal)
</script>
