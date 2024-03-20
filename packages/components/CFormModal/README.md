## CFormModal 弹框表单

### 基础用法

弹框表单

```vue demo
<template>
  <a-button @click="open">打开弹窗</a-button>
  <c-form-modal :columns="columns" @save="save" ref="formModal">
    <template #proj="{ slotScope }">
      <c-project-select v-model:value="slotScope['projectId']" />
    </template>
  </c-form-modal>
</template>

<script setup>
import { ref } from 'vue'
const formModal = ref()
const columns = ref([
  {
    title: 'No',
    dataIndex: 'no',
    type: 'inputNumber',
    decorator: { rules: [{ required: true, message: '必填项！' }] }
  },
  {
    title: 'projectId',
    dataIndex: 'projectId',
    scopedSlots: { customFormRender: 'proj' }
  },
  {
    dataIndex: 'createDate',
    title: 'Date',
    type: 'date'
  },
  {
    dataIndex: 'options',
    title: 'options',
    type: 'select',
    options: {
      options: [
        { value: 1, label: '区域' },
        { value: 2, label: '系统' },
        { value: 3, label: '分段' },
        { value: 4, label: '单元' },
        { value: 5, label: '舱室' }
      ]
    }
  },
  {
    title: '性别',
    dataIndex: 'sex',
    complex: { default: true }
  },
  {
    title: '年龄',
    dataIndex: 'age',
    complex: { default: true }
  },
  {
    title: '用户',
    dataIndex: 'user',
    type: 'user',
    complex: { default: true }
  },
  {
    title: '多用户',
    dataIndex: 'users',
    type: 'users',
    complex: { default: true }
  },
  {
    title: '身高',
    dataIndex: 'high',
    complex: { default: true }
  }
])
const open = () => {
  formModal.value.show({ no: 1, createDate: '2023-09-07T12:20:23.254+00:00' })
}
const save = (values) => {
  console.log(values)
}
</script>
```

### API

| 参数           | 类型                 | 默认值    | 说明                                                                                                                                                                    |
| -------------- | -------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| columns        | Array                | []        | 校验信息：decorator: { rules: [{ required: true, message: '必填项！' }] }; scopedSlots: { customFormRender: 'test'}； #test="{ slotScope }" slotScope 为当前表单所有值} |
| title          | String               | Form      | 标题                                                                                                                                                                    |
| ajax           | [Function,undefined] | undefined |                                                                                                                                                                         |
| width          | String               | 60%       |                                                                                                                                                                         |
| layout         | String               | inline    | 表单单行布局 horizontal，行内自适应布局 inline                                                                                                                          |
| formItemLayout | Object               |           | {labelCol: { span: 10 },wrapperCol: {span: 14 }} 标签和内容的比例 24 栅栏                                                                                               |

### 事件

| 参数 | 说明            |
| ---- | --------------- |
| save | emit 输入的内容 |

### 方法

| 名称  | 描述       | 说明 |
| ----- | ---------- | ---- |
| show  | 设置默认值 |      |
| reset | 重置输入项 |      |

## FAQ

两种布局：默认值行内布局（layout：inline）
layout：inline 一行多个表单 item；
layout：horizontal 一行一个表单 item；

表单 label 宽度调整：
使用 formItemLayout 属性；
宽 label 推荐 :formItemLayout="{ labelCol: { span: 12 }, wrapperCol: { span: 12 } }"
