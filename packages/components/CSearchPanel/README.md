## CSearchPanel 表格顶部搜索表单

### 基础用法

表格顶部搜索表单

```vue demo
<template>
  <c-search-panel :columns="columns" :expandAll="expandAll" @search="onSearch">
    <template #name="{ slotScope }">
      <a-input-number :min="1" :max="10" v-model:value="slotScope['name']"></a-input-number>
    </template>
    <template #proj="{ slotScope }">
      <c-project-select v-model:value="slotScope['projectId']" />
    </template>
  </c-search-panel>
</template>

<script setup>
import { ref } from 'vue'
const expandAll = ref(true)
const maxRow = ref(2)
const columns = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    condition: true,
    decorator: { rules: [{ required: true, message: '必填项！' }] }
    //scopedSlots: { customSearchRender: 'name' }
  },
  {
    title: 'projectId',
    dataIndex: 'projectId',
    condition: true,
    scopedSlots: { customSearchRender: 'proj' }
  },
  {
    title: 'user',
    dataIndex: 'user',
    type: 'user',
    condition: true
  },
  //设置初始值
  {
    dataIndex: 'createDate',
    condition: true,
    title: 'Date',
    type: 'date',
    decorator: { initialValue: '2023-12-23' }
  },
  {
    dataIndex: 'project',
    condition: true,
    title: 'project',
    type: 'project'
  },
  {
    dataIndex: 'orgName',
    condition: true,
    title: 'company',
    type: 'company'
  },
  {
    dataIndex: 'caseName',
    condition: true,
    title: '基地',
    type: 'buildCase'
  },
  {
    dataIndex: 'options',
    title: 'options',
    type: 'select',
    condition: true,
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
    title: '身高',
    dataIndex: 'high',
    complex: { default: true }
  }
])
const onSearch = (values) => {
  console.log(values)
}
</script>
```

### API

| 参数           | 类型    | 默认值                                              | 说明                                                                             |
| -------------- | ------- | --------------------------------------------------- | -------------------------------------------------------------------------------- |
| columns        | Array   | []                                                  | 搜索项 ,校验信息 decorator: { rules: [{ required: true, message: '必填项！' }] } |
| expandAll      | Boolean | false                                               | 默认是否全部展开                                                                 |
| formItemLayout | Object  | { labelCol: { span: 8 }, wrapperCol: { span: 16 } } | 参照 a-form formItemLayout 属性，控制表单 label 宽度                             |
| span           | Object  | {xs: 24, sm: 12, md: 8, lg: 6, xl: 6, xxl: 4}       | 参照 a-col span 属性，控制一行展示几个搜索条件                                   |

### 事件

| 参数   | 说明     |
| ------ | -------- |
| search | 选中的项 |
| reset  | 重置条件 |
| toggle | 展开收起 |

### 方法

| 名称 | 描述 | 版本 |
| ---- | ---- | ---- |
|      |      |      |

## FAQ

兼容老 api：columns 配置 decorator: { rules: [{ required: true, message: '必填项！' }] }，该组件会校验；
columns 配置 rules: [{ required: true, message: '必填项！' }]该组件不会校验，弹框表单会校验
