<template>
  <c-modal
    class="c-form-modal"
    v-bind="$attrs"
    :width="width"
    :title="title"
    :open="innerVisible"
    @cancel="cancel"
    @ok="save"
  >
    <c-form
      v-bind="$attrs"
      :columns="columns"
      :record="record"
      :layout="layout"
      :formItemLayout="computedFormItemLayout"
      :customStyle="computedCustomStyle"
      ref="cformRef"
    >
      <!-- 通过便利实现插槽透传 -->
      <template v-for="(item, key, index) in $slots" :key="index" v-slot:[key]="{ slotScope }">
        <slot :name="key" v-bind="{ slotScope: slotScope }"></slot>
      </template>
    </c-form>
  </c-modal>
</template>

<script>
import { ref, defineComponent, nextTick, computed } from 'vue'
import { notification } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'

import { withInstall } from '@packages/utils/util'

const CFormModal = defineComponent({
  name: 'CFormModal',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: 'Form'
    },
    ajax: {
      type: [Function, undefined],
      default: undefined
    },
    width: {
      type: String,
      default: '60%'
    },
    layout: {
      type: String,
      default: 'inline'
    },
    formItemLayout: {
      type: Object
    }
  },
  emits: ['save'],
  //此处不能声明
  //expose: ['show', 'reset'],

  setup(props, { emit, expose }) {
    const innerVisible = ref(false)
    const record = ref()
    const cformRef = ref()

    const computedCustomStyle = computed(() => {
      if (props.layout === 'horizontal') {
        return {
          width: '250px'
        }
      } else if (props.layout === 'vertical') {
        return {
          width: '400px'
        }
      } else {
        return {
          width: '150px'
        }
      }
    })

    const computedFormItemLayout = computed(() => {
      if (props.formItemLayout) {
        return props.formItemLayout
      } else {
        if (props.layout === 'horizontal') {
          return {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 }
          }
        } else if (props.layout === 'vertical') {
          return {}
        } else {
          return {
            labelCol: { span: 10 },
            wrapperCol: { span: 14 }
          }
        }
      }
    })

    const show = (recordData = {}) => {
      innerVisible.value = true
      record.value = cloneDeep(recordData)
      nextTick(() => {
        reset()
      })
    }
    const cancel = () => {
      innerVisible.value = false
    }
    const save = () => {
      const { ajax } = props
      cformRef.value
        .validateFields()
        .then((values) => {
          if (ajax) {
            const request = ajax(values)(values)
            request.then(() => {
              cancel()
              notification['success']({
                message: '成功',
                description: '操作成功'
              })
            })
          } else {
            cancel()
            emit('save', values, record.value)
          }
        })
        .catch((err) => console.log(err))
    }
    const reset = () => {
      cformRef.value.resetFields()
    }
    expose({ show, cancel, reset })
    return {
      innerVisible,
      record,
      cancel,
      save,
      cformRef,
      computedFormItemLayout,
      computedCustomStyle
    }
  }
})
export default withInstall(CFormModal)
</script>
<style lang="less" scoped></style>
