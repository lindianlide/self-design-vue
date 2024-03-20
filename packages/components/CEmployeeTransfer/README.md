## CEmployeeTransfer 人员选择穿梭框

### 基础用法

人员选择穿梭框

```vue demo
<template>
  <c-employee-transfer
    :data="data"
    v-model:targetKeys="targetKeys"
    @change="onChange"
  ></c-employee-transfer>
</template>
<script setup>
import { ref, nextTick } from 'vue'
const targetKeys = ref([])
const data = ref([
  {
    number: 'number',
    nickname: 'name',
    organization: { name: '业务' }
  }
])
const onChange = (item) => {
  nextTick(() => {
    console.log('targetKeys', targetKeys.value, item)
  })
}
</script>
```

### API

| 参数               | 类型  | 默认值 | 说明                                                                              |
| ------------------ | ----- | ------ | --------------------------------------------------------------------------------- |
| v-model:targetKeys | Array | []     | 右侧选中的 number                                                                 |
| data               | Array | []     | 默认选中项，[{number: 'Y...',nickname: 'NAME',organization: { name: '部门名称' }} |
|                    |

### 事件

| 参数   | 说明                                            |
| ------ | ----------------------------------------------- |
| change | 选中的值{ nextTargetKeys, direction, moveKeys } |

### 方法

| 名称 | 描述 | 版本 |
| ---- | ---- | ---- |
|      |      |      |

## FAQ

对 transfer 二次封装
