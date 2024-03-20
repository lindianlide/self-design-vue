## CRemoveButton 删除确认提示

### 基础用法

删除确认提示

```vue demo
<template>
  <c-remove-button @confirm="confirm"></c-remove-button>
  <c-remove-button type="primary" danger @confirm="confirm"></c-remove-button>
  <c-remove-button danger @confirm="confirm"></c-remove-button>
  <c-remove-button :button="false" @confirm="confirm"></c-remove-button>
</template>
<script setup>
const confirm = () => {
  console.log('confirm')
}
</script>
```

### API

| 参数    | 类型    | 默认值             | 说明                          |
| ------- | ------- | ------------------ | ----------------------------- |
| button  | Boolean | true               | 以按钮组件渲染                |
| message | String  | 确定执行删除操作 ? |                               |
| type    | String  | link               | 按钮样式 ，参照 a-button 属性 |

### 事件

| 名称    | 描述     |
| ------- | -------- |
| confirm | 确认操作 |
| cancel  | 取消操作 |

### 方法

| 名称 | 描述 |
| ---- | ---- |
|      |      |

## FAQ

a-button 属性都可以使用
