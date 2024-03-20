## 两列表格

```vue demo
<template>
  <a-tabs>
    <a-tab-pane key="2" tab="代码实例" force-render> <TableBasicTwoCode /> </a-tab-pane>
    <a-tab-pane key="1" tab="设计规范"><TableBasicTwoDoc /></a-tab-pane>
  </a-tabs>
</template>
<script setup>
import { ref } from 'vue'
import TableBasicTwoCode from './table/table-basic-two-code.md'
import TableBasicTwoDoc from './table/table-basic-two-doc.vue'
</script>
```
