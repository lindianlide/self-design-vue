## 弹框详情

```vue demo
<template>
  <a-tabs>
    <a-tab-pane key="2" tab="代码实例" force-render> <ModalPageCode /> </a-tab-pane>
    <a-tab-pane key="1" tab="设计规范"><ModalPageDoc /></a-tab-pane>
  </a-tabs>
</template>
<script setup>
import { ref } from 'vue'
import ModalPageCode from './detail/detail-modal-code.md'
import ModalPageDoc from './detail/detail-modal-doc.vue'
</script>
```
