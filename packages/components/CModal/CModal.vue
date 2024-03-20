<template>
  <a-modal v-bind="{ ...$props, ...$attrs }">
    <!-- 遍历父组件传入的 solts 透传给子组件 -->
    <template v-for="(item, key, i) in $slots" :key="i" v-slot:[key]>
      <slot :name="key"></slot>
    </template>
  </a-modal>
</template>
<script>
import { defineComponent } from 'vue'
import { withInstall } from '@packages/utils/util'

const CModal = defineComponent({
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
