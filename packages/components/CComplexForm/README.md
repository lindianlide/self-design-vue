## CComplexForm 表格顶部复杂搜索表单

### 基础用法

表格顶部复杂搜索表单

```vue demo
<template>
  <c-complex-form :columns="columns" :expandAll="expandAll" @search="onSearch"> </c-complex-form>
</template>

<script setup>
import { ref } from 'vue'
const expandAll = ref(false)
const maxRow = ref(1)
const columns = ref([
  {
    title: '名称',
    dataIndex: 'name',
    complex: { default: true, operators: ['='] }
  },
  {
    dataIndex: 'createDate',
    title: '开始日期',
    type: 'date',
    complex: { default: true, operators: ['='] }
  },
  {
    dataIndex: 'options',
    title: '类型',
    type: 'select',
    complex: { default: true },
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

| 参数           | 类型    | 默认值                                              | 说明                                                 |
| -------------- | ------- | --------------------------------------------------- | ---------------------------------------------------- |
| columns        | Array   | []                                                  | 搜索项,需配置 complex，否则不展示                    |
| expandAll      | Boolean | false                                               | 默认是否全部展开                                     |
| formItemLayout | Object  | { labelCol: { span: 6 }, wrapperCol: { span: 18 } } | 参照 a-form formItemLayout 属性，控制表单 label 宽度 |
| span           | Object  | {xs: 24, sm: 24, md: 24, lg: 12, xl: 8, xxl: 8 }    | 参照 a-col span 属性，控制一行展示几个搜索条件       |

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
