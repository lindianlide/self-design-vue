## CQrcode 二维码

### 基础用法

二维码

```vue demo
<template>
  <c-qrcode :value="data"></c-qrcode>
</template>
<script setup>
import { ref } from 'vue'
const data = ref('111')
</script>
```

### API

| 参数  | 类型   | 默认值 | 说明                |
| ----- | ------ | ------ | ------------------- |
| value | String |        | 需要生成的文案      |
| size  | Number | 100    | 二维码大小          |
| type  | String | svg    | 渲染类型 svg canvas |

### 事件

| 参数 | 说明 |
| ---- | ---- |

### 方法

| 名称 | 描述 | 版本 |
| ---- | ---- | ---- |
|      |      |      |

## FAQ

对 qrcode.vue 二次封装
