## 三列表格

```vue demo
<template>
  <a-tabs>
    <a-tab-pane key="1" tab="代码实例"> <TableBasicThreeCode /> </a-tab-pane>
    <!-- <a-tab-pane key="1" tab="代码实例一"> <TableBasicThreeDownCode /> </a-tab-pane>
    <a-tab-pane key="2" tab="代码实例二"> <TableBasicThreetabCode /> </a-tab-pane>
    -->
    <a-tab-pane key="3" tab="设计规范"><TableBasicThreeDoc /></a-tab-pane>
  </a-tabs>
</template>
<script setup>
import { ref } from 'vue'
// 不推荐规范
// import TableBasicThreeDownCode from './table/table-basic-threedown-code.md'
// import TableBasicThreetabCode from './table/table-basic-threetab-code.md'
import TableBasicThreeCode from './table/table-basic-three-code.md'

import TableBasicThreeDoc from './table/table-basic-three-doc.vue'
</script>
```
