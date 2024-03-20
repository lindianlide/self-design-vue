## CTransfer 图标

### 基础用法

图标

```vue demo
<template>
  <div>
    <c-transfer
      v-model:target-keys="targetKeys"
      v-model:selected-keys="selectedKeys"
      :data-source="mockData"
      :titles="['Source', 'Target']"
      :render="(item) => item.title"
      :disabled="disabled"
      @change="handleChange"
      @selectChange="handleSelectChange"
      @scroll="handleScroll"
    />
    <a-switch
      v-model:checked="disabled"
      un-checked-children="enabled"
      checked-children="disabled"
      style="margin-top: 16px"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
interface MockData {
  key: string
  title: string
  description: string
  disabled: boolean
}
const mockData: MockData[] = []
for (let i = 0; i < 10; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1
  })
}

const oriTargetKeys = mockData.filter((item) => +item.key % 3 > 1).map((item) => item.key)
const disabled = ref<boolean>(false)

const targetKeys = ref<string[]>(oriTargetKeys)

const selectedKeys = ref<string[]>(['1', '4'])

const handleChange = (nextTargetKeys: string[], direction: string, moveKeys: string[]) => {
  console.log('targetKeys: ', nextTargetKeys)
  console.log('direction: ', direction)
  console.log('moveKeys: ', moveKeys)
}
const handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
  console.log('sourceSelectedKeys: ', sourceSelectedKeys)
  console.log('targetSelectedKeys: ', targetSelectedKeys)
}
const handleScroll = (direction: string, e: Event) => {
  console.log('direction:', direction)
  console.log('target:', e.target)
}
</script>
```

### API

| 参数                  | 说明                                                                                                                                            | 类型                                                                                                 | 默认值                                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| dataSource            | 数据源，其中的数据将会被渲染到左边一栏中，`targetKeys` 中指定的除外。                                                                           | \[{key: string.isRequired,title: string.isRequired,description: string,disabled: bool}]\[]           | \[]                                                                                                     |
| disabled              | 是否禁用                                                                                                                                        | boolean                                                                                              | false                                                                                                   |
| filterOption          | 接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。                                            | (inputValue, option): boolean                                                                        |                                                                                                         |
| footer                | 可以设置为一个 作用域插槽                                                                                                                       | slot="footer" slot-scope="props"                                                                     |                                                                                                         |
| listStyle             | 两个穿梭框的自定义样式                                                                                                                          | CSSProperties                                                                                        |                                                                                                         |
| locale                | 各种语言                                                                                                                                        | object                                                                                               | `{ itemUnit: '项', itemsUnit: '项', notFoundContent: '列表为空', searchPlaceholder: '请输入搜索内容' }` |
| oneWay                | 展示为单向样式                                                                                                                                  | boolean                                                                                              | false                                                                                                   |
| operations            | 操作文案集合，顺序从上至下                                                                                                                      | string\[]                                                                                            | \['>', '&lt;']                                                                                          |
| operationStyle        | 操作栏的自定义样式                                                                                                                              | CSSProperties                                                                                        | -                                                                                                       |
| pagination            | 使用分页样式，自定义渲染列表下无效                                                                                                              | boolean \| { pageSize: number, simple: boolean, showSizeChanger?: boolean, showLessItems?: boolean } | flase                                                                                                   |
| render                | 每行数据渲染函数，该函数的入参为 `dataSource` 中的项，返回值为 element。或者返回一个普通对象，其中 `label` 字段为 element，`value` 字段为 title | Function(record)\| slot                                                                              |                                                                                                         |
| selectAllLabels       | 自定义顶部多选框标题的集合                                                                                                                      | VueNode \| ((info: { selectedCount: number; totalCount: number }) => VueNode);                       | -                                                                                                       |
| selectedKeys(v-model) | 设置哪些项应该被选中                                                                                                                            | string\[]                                                                                            | \[]                                                                                                     |
| showSearch            | 是否显示搜索框                                                                                                                                  | boolean                                                                                              | false                                                                                                   |
| showSelectAll         | 是否展示全选勾选框                                                                                                                              | boolean                                                                                              | true                                                                                                    |
| status                | 设置校验状态                                                                                                                                    | 'error' \| 'warning'                                                                                 | -                                                                                                       |
| targetKeys(v-model)   | 显示在右侧框数据的 key 集合                                                                                                                     | string\[]                                                                                            | \[]                                                                                                     |
| titles                | 标题集合，顺序从左至右                                                                                                                          | string\[]                                                                                            | \['', '']                                                                                               |

### 事件

| 事件名称     | 说明                           | 回调参数                                          |
| ------------ | ------------------------------ | ------------------------------------------------- |
| change       | 选项在两栏之间转移时的回调函数 | (targetKeys, direction, moveKeys): void           |
| scroll       | 选项列表滚动时的回调函数       | (direction, event): void                          |
| search       | 搜索框内容时改变时的回调函数   | (direction: 'left'\|'right', value: string): void |
| selectChange | 选中项发生改变时的回调函数     | (sourceSelectedKeys, targetSelectedKeys): void    |

### 方法

| 名称 | 描述 | 说明 |
| ---- | ---- | ---- |

## FAQ

基于 transfer 拓展样式，属性参照 transfer
