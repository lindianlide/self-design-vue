<template>
  <a-qrcode :value="value" :size="size" :type="type" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { withInstall } from '@packages/utils/util'

const CQrcode = defineComponent({
  name: 'CQrcode',
  props: {
    value: {
      type: String,
      require: true
    },
    size: {
      type: Number,
      default: 100
    },
    type: {
      type: String,
      default: 'svg'
    }
  }
})
export default withInstall(CQrcode)
</script>
