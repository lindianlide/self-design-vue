## CUserInput 用户搜索

### 基础用法

用户搜索

```vue demo
<template>
  <div>
    <c-user-input v-model:value="user" @change="onUserChange"> </c-user-input>
    <c-user-input v-model:value="userMuti" mode="multiple" @change="onUserMutiChange">
    </c-user-input>
  </div>
</template>
<script lang="ts" setup>
import { ref, nextTick } from 'vue'
const user = ref({ label: 'name', value: 'number' })
const userMuti = ref([{ label: 'name', value: 'number' }])

const onUserMutiChange = (item) => {
  nextTick(() => {
    console.log('userMuti', userMuti.value, item)
  })
}

const onUserChange = (item) => {
  nextTick(() => {
    console.log('user', user.value, item)
  })
}
</script>
```

### API

| 参数        | 类型            | 默认值             | 说明                                  |
| ----------- | --------------- | ------------------ | ------------------------------------- |
| mode        | String          |                    | 是否多选 'multiple' 'tags' 'combobox' |
| value       | [Object, Array] |                    | 默认展示值                            |
| fieldNames  | Object          | {value: 'code'}    | 默认绑定的属性                        |
| customStyle | Object          | { width: '150px' } | 自定义样式{ width: '150px' }          |

### 事件

| 参数         | 说明                        |
| ------------ | --------------------------- |
| change       | 选中的信息                  |
| update:value | 双向绑定的信息{label,value} |

### 方法

| 名称 | 描述 | 说明 |
| ---- | ---- | ---- |

## FAQ
