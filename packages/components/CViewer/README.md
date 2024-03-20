## 图片放大轮播

### 基础用法

图片放大轮播

```vue demo
<template>
  <div class="cviewer-box" v-viewer>
    <img class="cview-img" v-for="(item, index) of imgArr" :key="index" :src="item" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const imgArr = ref([
  'https://cn.bing.com/th/id/OIP-C.Md86Wi2EYiKHNPldRZiD4gHaEo',
  'https://tse4-mm.cn.bing.net/th/id/OIP-C.7sAjIeoQYWnXV_QnuYs1jQHaEK',
  'https://tse3-mm.cn.bing.net/th/id/OIP-C.nkWmM-lReaN8kH-ieXmZrQHaEo'
])
</script>
<style lang="less">
.cviewer-box {
  .cview-img {
    width: 200px;
    height: 150px;
    + .cview-img {
      margin-left: 10px;
    }
  }
}
</style>
```

### API

### 事件

### 方法

## FAQ

基于 v-viewer ，父元素加 v-viewer 指令即可,可通过键盘左右箭头轮播图片。
