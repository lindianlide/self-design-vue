## CDrawer 抽屉

### 基础用法

抽屉

```vue demo
<template>
  <a-button type="primary" @click="showDrawer">Open Drawer</a-button>
  <c-drawer v-model:open="open" title="Basic Drawer" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
  </c-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const open = ref<boolean>(false)

const showDrawer = () => {
  open.value = true
}

const handleOk = (e: MouseEvent) => {
  console.log(e)
  open.value = false
}
</script>
```

### API

| 参数           | 类型    | 默认值 | 说明 |
| -------------- | ------- | ------ | ---- |
| width          | string  | 50%    | 50%  |
| destroyOnClose | boolean |        | true |

| 参数                | 说明                                                                             | 类型                                            | 默认值              |
| ------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------- |
| autofocus           | 抽屉展开后是否将焦点切换至其 Dom 节点                                            | boolean                                         | true                |
| bodyStyle           | 可用于设置 Drawer 内容部分的样式                                                 | CSSProperties                                   | -                   |
| class               | 对话框外层容器的类名                                                             | string                                          | -                   |
| closable            | 是否显示左上角的关闭按钮                                                         | boolean                                         | true                |
| closeIcon           | 自定义关闭图标                                                                   | VNode \| slot                                   | `<CloseOutlined />` |
| contentWrapperStyle | 可用于设置 Drawer 包裹内容部分的样式                                             | CSSProperties                                   | -                   |
| drawerStyle         | 用于设置 Drawer 弹出层的样式                                                     | object                                          | -                   |
| extra               | 抽屉右上角的操作区域                                                             | VNode \| slot                                   | -                   |
| footer              | 抽屉的页脚                                                                       | VNode \| slot                                   | -                   |
| footerStyle         | 抽屉页脚部件的样式                                                               | CSSProperties                                   | -                   |
| forceRender         | 预渲染 Drawer 内元素                                                             | boolean                                         | false               |
| getContainer        | 指定 Drawer 挂载的 HTML 节点                                                     | HTMLElement \| `() => HTMLElement` \| Selectors | 'body'              |
| headerStyle         | 用于设置 Drawer 头部的样式                                                       | CSSProperties                                   | -                   |
| height              | 高度, 在 `placement` 为 `top` 或 `bottom` 时使用                                 | string \| number                                | 378                 |
| keyboard            | 是否支持键盘 esc 关闭                                                            | boolean                                         | true                |
| mask                | 是否展示遮罩                                                                     | Boolean                                         | true                |
| maskClosable        | 点击蒙层是否允许关闭                                                             | boolean                                         | true                |
| maskStyle           | 遮罩样式                                                                         | CSSProperties                                   | {}                  |
| placement           | 抽屉的方向                                                                       | 'top' \| 'right' \| 'bottom' \| 'left'          | 'right'             |
| push                | 用于设置多层 Drawer 的推动行为                                                   | boolean \| {distance: string \| number}         | { distance: 180 }   |
| size                | 预设抽屉宽度（或高度），default `378px` 和 large `736px`                         | `default` \| `large`                            | `default`           |
| style               | 可用于设置 Drawer 最外层容器的样式，和 `drawerStyle` 的区别是作用节点包括 `mask` | CSSProperties                                   | -                   |
| title               | 标题                                                                             | string \| slot                                  | -                   |
| visible(v-model)    | Drawer 是否可见                                                                  | boolean                                         | -                   |
| zIndex              | 设置 Drawer 的 `z-index`                                                         | Number                                          | 1000                |

### 事件

| 名称               | 描述                                 | 类型              | 默认值 |
| ------------------ | ------------------------------------ | ----------------- | ------ |
| afterVisibleChange | 切换抽屉时动画结束后的回调           | function(visible) | 无     |
| close              | 点击遮罩层或左上角叉或取消按钮的回调 | function(e)       | 无     |

### 方法

| 名称 | 描述 | 说明 |
| ---- | ---- | ---- |

## FAQ

其他属性参照 a-drawer
