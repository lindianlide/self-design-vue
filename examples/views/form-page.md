## 页面表单

```vue demo
<template>
  <a-tabs>
    <a-tab-pane key="2" tab="代码实例" force-render> <FormPageCode /> </a-tab-pane>
    <a-tab-pane key="1" tab="设计规范"><FormPageDoc /></a-tab-pane>
  </a-tabs>
</template>
<script setup>
import { ref } from 'vue'
import FormPageCode from './form/form-page-code.md'
import FormPageDoc from './form/form-page-doc.vue'
</script>
```
