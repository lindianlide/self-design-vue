## CRecentDateRangePicker 日期范围选择

### 基础用法

日期范围选择

```vue demo
<template>
  <c-recent-date-range-picker v-model:value="data" @change="onChange"></c-recent-date-range-picker>
</template>
<script setup>
import { ref, nextTick } from 'vue'
const data = ref([])
const onChange = (item) => {
  nextTick(() => {
    console.log('change value', item)
    console.log('v-model:value', data.value)
  })
}
</script>
```

### API

| 参数         | 类型    | 默认值   | 说明                      |
| ------------ | ------- | -------- | ------------------------- |
| allowClear   | Boolean | false    | 是否展示清除按钮          |
| defaultRange | String  | lastWeek | ['lastWeek', 'lastMonth'] |
|              |

### 事件

| 名称   | 描述                                 |
| ------ | ------------------------------------ |
| change | 返回数组['2023-09-06', '2023-09-13'] |

### 方法

| 名称 | 描述 |
| ---- | ---- |
|      |      |

## FAQ
