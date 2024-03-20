<template>
  <a-popconfirm
    :title="message || $t('crud.removeOperationConfirmMessage')"
    :ok-text="$t('crud.conform')"
    :cancel-text="$t('crud.cancel')"
    @confirm="confirm"
    @cancel="cancel"
  >
    <a-button v-if="button" v-bind="$attrs" :type="type">{{ $t('crud.remove') }}</a-button>
    <a v-else v-bind="$attrs">{{ $t('crud.remove') }}</a>
  </a-popconfirm>
</template>

<script>
import { defineComponent } from 'vue'
import { withInstall } from '@packages/utils/util'

const CRemoveButton = defineComponent({
  name: 'CRemoveButton',
  props: {
    message: {
      type: String
    },
    type: {
      type: String,
      default: 'link'
    },
    button: {
      type: Boolean,
      default: true
    }
  },
  emits: ['confirm'],

  setup(props, { emit }) {
    const confirm = () => {
      emit('confirm')
    }
    const cancel = () => {
      emit('cancel')
    }
    return { confirm, cancel }
  }
})
export default withInstall(CRemoveButton)
</script>
