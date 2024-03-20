<template>
  <a-form
    class="c-form"
    :layout="layout"
    ref="formRef"
    :model="formModel"
    :label-col="computedFormItemLayout.labelCol"
    :label-wrap="true"
    :wrapper-col="computedFormItemLayout.wrapperCol"
    v-bind="{ ...computedFormItemLayout.spanCol }"
    @finish="onSubmit"
  >
    <template v-for="item in computedColumns" :key="randoms()">
      <a-form-item
        :label="item.title"
        :name="item.dataIndex"
        :required="item.required"
        :rules="item.decorator?.rules || item.rules || []"
        v-if="!(item.searchInvisible || item.formInvisible)"
      >
        <template v-if="item.scopedSlots?.customFormRender">
          <slot :name="item.scopedSlots?.customFormRender" :slotScope="formModel"></slot>
        </template>

        <c-field
          v-else-if="item.type === 'switch' || item.type === 'checkBox'"
          v-model:checked="formModel[item.dataIndex]"
          :type="item.type"
          :customStyle="computedCustomStyle"
          :options="item.options"
          :disabled="item.disabled"
          :renderFormItem="renderFormItem(item)"
        >
          <!-- <template v-slot:[item.scopedSlots?.customFormRender]="{ value, record }">
            <slot
              :name="item?.scopedSlots?.customFormRender"
              :value="value"
              :record="record"
            ></slot>
          </template> -->
        </c-field>
        <c-field
          v-else
          v-model:value="formModel[item.dataIndex]"
          :type="item.type"
          :customStyle="computedCustomStyle"
          :options="item.options"
          :disabled="item.disabled"
          :renderFormItem="renderFormItem(item)"
          @select="onSelect($event, item)"
        >
        </c-field>
      </a-form-item>
    </template>
    <a-form-item
      v-if="saveButton || resetButton"
      :wrapper-col="{ offset: computedFormItemLayout.labelCol?.span }"
    >
      <a-space>
        <a-button v-if="saveButton" type="primary" html-type="submit"> 提交 </a-button>
        <a-button v-if="resetButton" @click="resetFields"> 重置 </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { useSlots, renderSlot, watch, ref, computed } from 'vue'
//import { useI18n } from "vue-i18n";
import type { PropType } from 'vue'
import CField from '@packages/components/CTable/CField.vue'
import type { CForm } from '@packages/components/CForm/index'
import { random } from '@packages/utils/util'
import { flatten } from '@packages/utils/util'

//const { t } = useI18n();
const props = defineProps({
  columns: {
    type: Array as PropType<CForm.CustomColumnProps[]>
  },
  layout: {
    type: String,
    default: 'inline'
  },
  record: {
    type: Object,
    required: false,
    default: () => ({})
  },
  formItemLayout: {
    type: Object
  },
  customStyle: { type: Object },
  //large | middle | small
  labelWidth: {
    type: String
  },
  saveButton: {
    type: Boolean,
    default: false
  },
  resetButton: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])
const slots = useSlots()

const formRef = ref()
//todo 赋值
const formModel = ref<Record<string, any>>(props.record)

const invisibleTypes = ['index', 'checkbox', 'radio', 'operation', 'custom']

//操作列没有dataIndex，被过滤
const computedColumns = computed(() => {
  const data = flatten(props.columns)?.filter(
    (x) =>
      !(x.children && x.children.length) &&
      (x.dataIndex || x.decorator) &&
      !(x.type && invisibleTypes.includes(x.type))
  )
  return data
})

const computedCustomStyle = computed(() => {
  if (props.customStyle) {
    return props.customStyle
  }
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
  //设定label field布局，优先级formItemLayout > labelWidth > layout
  if (props.formItemLayout) {
    return props.formItemLayout
  } else {
    if (props.labelWidth === 'small') {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
      }
    } else if (props.labelWidth === 'middle') {
      return {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      }
    } else if (props.labelWidth === 'large') {
      return {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
      }
    }
    if (props.layout === 'horizontal') {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
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

watch(
  () => props.record,
  (newValue) => {
    formModel.value = newValue
  },
  { deep: true }
)

const randoms = () => {
  return random()
}

const onSubmit = (values: Record<string, any>) => {
  emit('submit', values)
}

const validateFields = () => {
  return formRef.value.validateFields().then((values) => {
    return values
  })
}
const resetFields = () => {
  formRef.value.resetFields()
}
const onSelect = (value, columnItem) => {
  columnItem?.options?.onSelect(value, formModel.value)
}
const renderFormItem = (item: CForm.CustomColumnProps) => {
  return item.renderFormItem && item.dataIndex
    ? //@ts-ignore
      () => item.renderFormItem(formModel.value[item.dataIndex as string], formModel.value)
    : item?.scopedSlots?.customFormRender && item.dataIndex
    ? (customOptions = {}) =>
        renderSlot(slots, item.scopedSlots!.customFormRender!, {
          value: formModel.value[item.dataIndex as string],
          record: formModel.value,
          ...customOptions
        })
    : undefined
}
defineExpose({
  onSubmit,
  validateFields,
  resetFields
})
</script>
<script lang="ts">
export default {
  name: 'CForm'
}
</script>
<style lang="less" scoped>
.c-form {
  &.ant-form {
    padding: 20px 0px;
    &.ant-form-vertical {
      padding: 20px 40px;
    }
  }

  :deep(.ant-form-item) {
    margin-bottom: 20px;

    .ant-form-item-control-input-content {
      min-width: 150px;
    }
    .ant-form-item-label {
      //max-width: 160px;
      min-width: 100px;
    }
  }
}
</style>
