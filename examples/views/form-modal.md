## 弹框表单

```vue demo
<template>
  <a-tabs>
    <a-tab-pane key="2" tab="代码实例" force-render> <FormModalCode /> </a-tab-pane>
    <a-tab-pane key="1" tab="设计规范"><FormModalDoc /></a-tab-pane>
  </a-tabs>
</template>
<script setup>
import { ref } from 'vue'
import FormModalCode from './form/form-modal-code.md'
import FormModalDoc from './form/form-modal-doc.vue'
</script>
```
