## 页面详情

```vue demo
<template>
  <a-tabs>
    <a-tab-pane key="1" tab="代码实例一"> <DetailPageCode /> </a-tab-pane>
    <a-tab-pane key="2" tab="代码实例二"> <DetailPageTwoCode /> </a-tab-pane>
    <a-tab-pane key="3" tab="设计规范"><DetailPageDoc /></a-tab-pane>
  </a-tabs>
</template>
<script setup>
import { ref } from 'vue'
import DetailPageCode from './detail/detail-page-code.md'
import DetailPageTwoCode from './detail/detail-page-two-code.md'

import DetailPageDoc from './detail/detail-page-doc.vue'
</script>
```
