<script lang="ts">
import { defineComponent, computed, h, Component, ref } from 'vue'
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  TimePicker,
  RangePicker,
  Switch,
  Checkbox
} from 'ant-design-vue'
import CProjectSelect from '@packages/components/CProjectSelect/index'
import CCompanySelect from '@packages/components/CCompanySelect/index'
import CBuildCaseSelect from '@packages/components/CBuildCaseSelect/index'
import COrganizationSelect from '@packages/components/COrganizationSelect/COrganizationSelect.vue'

import CUserInput from '@packages/components/CUserInput/index'

import type { PropType } from 'vue'
import type { Crud } from './crud'
import { getAsyncOptions } from '@packages/utils/util'

const defaultProps = { allowClear: true, style: { minWidth: '150px', width: '100%' } }

//add type
const defaultComponentMap: { [key: string]: [Component, Record<string, any>] } = {
  input: [Input, {}],
  inputNumber: [InputNumber, {}],
  select: [
    Select,
    {
      showSearch: true,
      filterOption: (input: string, option: { label: string }) => {
        return option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    }
  ],
  textarea: [Input.TextArea, {}],
  date: [DatePicker, { valueFormat: 'YYYY-MM-DD' }],
  time: [TimePicker, {}],
  datetime: [DatePicker, { showTime: true, valueFormat: 'YYYY-MM-DD HH:mm:ss' }],
  week: [DatePicker, { picker: 'week' }],
  month: [DatePicker, { picker: 'month' }],
  quarter: [DatePicker, { picker: 'quarter' }],
  year: [DatePicker, { picker: 'year' }],
  range: [RangePicker, {}],
  switch: [Switch, {}],
  checkBox: [Checkbox, {}],
  project: [CProjectSelect, {}],
  employeeDescription: [CUserInput, {}],
  company: [CCompanySelect, {}],
  buildCase: [CBuildCaseSelect, {}],
  organization: [COrganizationSelect, {}],
  user: [CUserInput, {}],
  users: [CUserInput, { mode: 'multiple' }]
}

export default defineComponent({
  name: 'CField',
  props: {
    value: {},
    checked: {
      type: [Boolean, Number],
      default: false
    },
    type: {
      type: String as PropType<Crud.CustomColumnType>,
      default: 'input'
    },
    options: {
      type: Object,
      default: () => ({})
    },
    record: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    },
    renderFormItem: {
      type: Function
    },
    customStyle: { type: Object }
  },
  emits: ['update:value', 'update:checked', 'select'],
  // eslint-disable-next-line no-unused-vars
  setup(props, { emit }) {
    const formItemContext = Form.useInjectFormItemContext()
    const node = computed(() => {
      return defaultComponentMap[props.type] || defaultComponentMap['input']
    })
    //column options 配置ajax场景
    const ajaxOptions = ref([])
    const computedChecked = computed(() => {
      return !!props.checked
    })

    //column.options 自定义事件会自动触发
    const changeEventOption = {
      ['onUpdate:value']: (value: any) => {
        emit('update:value', value)
        formItemContext?.onFieldChange()
      }
    }

    const selectEventOption = {
      ['onSelect']: (value: any) => {
        emit('select', value)
      }
    }

    // const focusEventOption = {
    //   ['onFocus']: async () => {
    //     ajaxOptions.value = await getAsyncOptions(props.options)
    //     //console.log('focus focus', ajaxOptions.value)
    //   }
    // }

    const checkEventOption = {
      ['onUpdate:checked']: (value: any) => {
        emit('update:checked', value)
        formItemContext?.onFieldChange()
      }
    }

    const options = Object.assign({}, defaultProps, node.value[1] || {})

    if (props.customStyle) {
      Object.assign(options, props.customStyle, { style: props.customStyle })
    }
    //todo提取公共丢失响应式，编辑场景
    // const fieldParam = {
    //   ...changeEventOption,
    //   ...options,
    //   ...props.options,
    //   value: props.options?.value?.value || props.value,
    //   customStyle: props.customStyle,
    //   disabled: props.disabled
    //   //style: props.customStyle
    // }

    //checked value不能解构赋值，会丢失响应式
    if (props.renderFormItem) {
      return () => [props.renderFormItem()]
    } else if (props.type === 'switch' || props.type === 'checkBox') {
      return () => [
        h(node.value[0], {
          ...checkEventOption,
          ...options,
          ...props.options,
          checked: computedChecked.value,
          customStyle: props.customStyle,
          disabled: props.disabled,
          width: '45px',
          style: { width: '45px' }
        })
      ]
    } else if (props.type === 'select') {
      if (props.options.ajax) {
        getAsyncOptions(props.options).then((res) => {
          ajaxOptions.value = res
        })

        return () => [
          h(node.value[0], {
            ...changeEventOption,
            //...focusEventOption,
            ...options,
            ...props.options,
            options: ajaxOptions.value,
            value: props.options?.value?.value || props.value,
            customStyle: props.customStyle,
            disabled: props.disabled
            //style: props.customStyle
          })
        ]
      }
      return () => [
        h(node.value[0], {
          ...changeEventOption,
          ...options,
          ...props.options,
          value: props.options?.value?.value || props.value,
          customStyle: props.customStyle,
          disabled: props.disabled
          //style: props.customStyle
        })
      ]
    } else if (props.type === 'text') {
      return () => [h('span', {}, props.value?.value)]
    } else {
      return () => [
        h(node.value[0], {
          ...changeEventOption,
          ...options,
          ...props.options,
          value: props.options?.value?.value || props.value,
          customStyle: props.customStyle,
          disabled: props.disabled,
          ...selectEventOption
          //style: props.customStyle
        })
      ]
    }
  }
})
</script>
