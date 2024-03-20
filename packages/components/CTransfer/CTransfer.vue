<script>
import { Transfer } from 'ant-design-vue'
import { withInstall } from '@packages/utils/util'
import { merge } from 'lodash'

const CTransfer = merge({}, Transfer, {
  name: 'CTransfer'
})
export default withInstall(CTransfer)
</script>

<style scoped lang="less">
.ant-transfer {
  display: flex;
  justify-content: center;
  align-items: Center;
}

:deep(.ant-transfer) {
  .ant-transfer-list {
    min-height: 300px;
    min-width: 200px;
    height: 400px;
    width: 20vw;
  }
}
</style>
