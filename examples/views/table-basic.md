## 普通表格

```vue demo
<template>
  <a-tabs>
    <a-tab-pane key="2" tab="代码实例" force-render> <TableBasicCode /> </a-tab-pane>
    <a-tab-pane key="1" tab="设计规范"><TableBasicDoc /></a-tab-pane>
  </a-tabs>
</template>
<script setup>
import { ref } from 'vue'
import TableBasicCode from './table/table-basic-code.md'
import TableBasicDoc from './table/table-basic-doc.vue'
</script>
```
