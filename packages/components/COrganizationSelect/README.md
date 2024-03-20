## COrganizationSelect 部门选择下拉

### 基础用法

部门选择下拉

```vue demo
<template>
  <c-organization-select v-model:value="projId" />

  <c-organization-select v-model:value="projId" disabledType="DEPARTMENT" :showSearch="false" />
</template>
<script setup>
import { ref } from 'vue'
const projId = ref('7f304de353c358egcfg267f023db8f25')
const customStyle = ref({ width: '200px' })
const fieldNames = ref({ value: 'projNo' })
</script>
```

### API

| 参数          | 类型    | 默认值                                               | 说明                                                               |
| ------------- | ------- | ---------------------------------------------------- | ------------------------------------------------------------------ |
| v-model:value | String  |                                                      | 默认选中值                                                         |
| customStyle   | Object  | { width: '150px' }                                   | 自定义样式                                                         |
| disabledType  | String  |                                                      | 置灰的元素类型 DEPARTMENT，COMPANY                                 |
| fieldNames    | Object  | { label: 'name', value: 'id', children: 'children' } | 替换 treeNode 中 label,value,children 字段为 treeData 中对应的字段 |
| dropdownStyle | Object  | { maxHeight: '300px', overflow: 'auto' }             | 下拉菜单的样式                                                     |
| showSearch    | Boolean | true                                                 | 是否显示搜索                                                       |

### 事件

| 参数   | 说明     |
| ------ | -------- |
| change | 选中的值 |

### 方法

| 名称 | 描述 | 版本 |
| ---- | ---- | ---- |
|      |      |      |

## FAQ
