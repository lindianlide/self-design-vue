## 分布表单

```vue demo
<template>
  <a-tabs>
    <a-tab-pane key="2" tab="代码实例" force-render> <FormStepCode /> </a-tab-pane>
    <a-tab-pane key="1" tab="设计规范"><FormStepDoc /></a-tab-pane>
  </a-tabs>
</template>
<script setup>
import { ref } from 'vue'
import FormStepCode from './form/form-step-code.md'
import FormStepDoc from './form/form-step-doc.vue'
</script>
```
