## CEditor 富文本编辑器

### 基础用法

富文本编辑器

```vue demo
<template>
  <c-editor ref="cEditorRef" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
const cEditorRef = ref({})

onMounted(() => {
  cEditorRef?.value.setData('<p>111</p>')
  //获取数据
  //console.log(cEditorRef?.value.getData())
})
</script>
```

### API

| 参数          | 类型   | 默认值              | 说明                     |
| ------------- | ------ | ------------------- | ------------------------ |
| toolbarConfig | Object |                     | 参照 wangEditor 官方配置 |
| editorConfig  | Object |                     | 参照 wangEditor 官方配置 |
| style         | Object | { height: '500px' } |                          |

### 事件

| 参数 | 说明 |
| ---- | ---- |

### 方法

| 名称    | 描述           | 版本 |
| ------- | -------------- | ---- |
| setData | 设置编辑器内容 |      |
| getData | 获取编辑器内容 |      |

## FAQ
