## 普通表格

```vue demo
<template>
  <a-tabs>
    <a-tab-pane key="2" tab="代码实例" force-render> <ResultPageCode /> </a-tab-pane>
    <a-tab-pane key="1" tab="设计规范"><ResultPageDoc /></a-tab-pane>
  </a-tabs>
</template>
<script setup>
import { ref } from 'vue'
import ResultPageCode from './result/result-page-code.md'
import ResultPageDoc from './result/result-page-doc.vue'
</script>
```
