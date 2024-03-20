## CForm 表单

### 基础用法

表单

```vue demo
<template>
  <a-button @click="resetFields">重置表单</a-button>
  <a-button @click="validateFields">校验表单</a-button>
  <c-form
    :columns="columns"
    layout="horizontal"
    @submit="submitModal"
    :saveButton="true"
    ref="formHorizontal"
  >
  </c-form>
  <c-form :columns="columns" layout="horizontal" labelWidth="middle" :saveButton="true"> </c-form>
  <c-form :columns="columns" layout="horizontal" labelWidth="large" :saveButton="true"> </c-form>
</template>

<script setup>
import { ref } from 'vue'
const formHorizontal = ref()

const columns = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    invisible: false,

    decorator: { rules: [{ required: true, message: '必填项！' }] }
  },
  {
    dataIndex: 'createDate',
    width: 120,
    disabled: true,
    title: 'Date',
    type: 'date'
  },
  {
    dataIndex: 'createDate',
    width: 120,
    title: 'Date',
    type: 'date'
  },
  {
    dataIndex: 'createDate',
    width: 120,
    title: 'Date',
    type: 'date'
  },
  {
    dataIndex: 'type',
    title: 'type',
    type: 'select',
    width: 150,
    options: {
      options: [
        { value: 1, label: '区域' },
        { value: 2, label: '系统' },
        { value: 3, label: '分段' }
      ]
    },
    editable: true
  },
  {
    dataIndex: 'project',
    title: 'project',
    type: 'project',
    customStyle: { width: '120px' },
    //行内编辑时更改formatter展示的值
    options: {
      onChange: (project, row) => {
        //行内编辑有row，需配置projectName，弹框编辑无需
        row && (row.projectName = project?.projId)
      },
      parameter: { isLimitByUser: 1 },
      fieldNames: { value: 'projNo', optionLabelProp: 'projId' }
    }
  }
])
const resetFields = () => {
  formHorizontal.value.resetFields()
}
const validateFields = () => {
  formHorizontal.value.validateFields().then((res) => {
    console.log('validateFields=', res)
  })
}
const submitModal = (record) => {
  console.log('record', record)
}
</script>
```

### API

| 参数           | 类型    | 默认值         | 说明                                                                                                                                                                    |
| -------------- | ------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| columns        | Array   | []             | 校验信息：decorator: { rules: [{ required: true, message: '必填项！' }] }; scopedSlots: { customFormRender: 'test'}； #test="{ slotScope }" slotScope 为当前表单所有值} |
| record         | Object  | {}             | 默认填充值                                                                                                                                                              |
| layout         | String  | inline         | 表单单行布局 horizontal，垂直布局'vertical' 行内自适应布局'inline'                                                                                                      |
| formItemLayout | Object  |                | {labelCol: { span: 10 },wrapperCol: {span: 14 }} 标签和内容的比例 24 栅栏                                                                                               |
| customStyle    | Object  | {width: 120px} |                                                                                                                                                                         |
| labelWidth     | String  | small          | large \| middle \| small \| 调整 label 宽度                                                                                                                             |
| saveButton     | Boolean | false          |                                                                                                                                                                         |
| resetButton    | Boolean | false          |                                                                                                                                                                         |

### 事件

| 参数   | 说明       |
| ------ | ---------- |
| submit | 输入的内容 |

### 方法

| 名称           | 描述     | 说明 |
| -------------- | -------- | ---- |
| validateFields | 校验方法 |      |
| resetFields    | 重置表单 |      |
| onSubmit       | 提交表单 |      |

## FAQ

兼容老 api：columns 配置 decorator: { rules: [{ required: true, message: '必填项！' }] }，该组件会校验；
columns 配置 rules: [{ required: true, message: '必填项！' }]该组件会校验，顶部搜索表单不会校验
