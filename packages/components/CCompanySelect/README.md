## CCompanySelect 公司选择

### 基础用法

公司选择下拉框

```vue demo
<template>
  <c-company-select v-model:value="orgCode" :customStyle="customStyle" :fieldNames="fieldNames" />
</template>
<script setup>
import { ref } from 'vue'
const orgCode = ref('C000030')
const customStyle = ref({ width: '200px' })
const fieldNames = ref({ value: 'code', optionLabelProp: 'name' })
</script>
```

### API

| 参数          | 类型   | 默认值              | 说明                         |
| ------------- | ------ | ------------------- | ---------------------------- |
| v-model:value | String |                     | 默认选中值                   |
| customStyle   | Object | { width: '150px' }  | 自定义样式{ width: '200px' } |
| param         | Object | {}                  | 接口查询参数                 |
| fieldNames    | Object | { value: 'projNo' } | 选择绑定的值                 |
| disabled      | Boolean | false               | 是否置灰                     |

### 事件

| 参数   | 说明     |
| ------ | -------- |
| change | 选中的值 |

### 方法

| 名称 | 描述 | 版本 |
| ---- | ---- | ---- |
|      |      |      |

## FAQ
