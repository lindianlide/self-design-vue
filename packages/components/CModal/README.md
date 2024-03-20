## CModal 弹框

### 基础用法

弹框

```vue demo
<template>
  <a-button type="primary" @click="showModal">Open Modal</a-button>
  <c-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </c-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const open = ref<boolean>(false)

const showModal = () => {
  open.value = true
}

const handleOk = (e: MouseEvent) => {
  console.log(e)
  open.value = false
}
</script>
```

### API

| 参数           | 说明                        | 类型          | 默认值 |
| -------------- | --------------------------- | ------------- | ------ |
| destroyOnClose | 关闭时销毁 Modal 里的子元素 | boolean       | true   |
| width          | 宽度                        | string number | 60%    |

| 参数              | 说明                                                        | 类型                                   | 默认值              |
| ----------------- | ----------------------------------------------------------- | -------------------------------------- | ------------------- |
| afterClose        | Modal 完全关闭后的回调                                      | function                               | 无                  |
| bodyStyle         | Modal body 样式                                             | object                                 | {}                  |
| cancelButtonProps | cancel 按钮 props                                           | [ButtonProps](/components/button/#api) | -                   |
| cancelText        | 取消按钮文字                                                | string\| slot                          | 取消                |
| centered          | 垂直居中展示 Modal                                          | boolean                                | false               |
| closable          | 是否显示右上角的关闭按钮                                    | boolean                                | true                |
| closeIcon         | 自定义关闭图标                                              | VNode \| slot                          | -                   |
| confirmLoading    | 确定按钮 loading                                            | boolean                                | 无                  |
| footer            | 底部内容，当不需要默认底部按钮时，可以设为 `:footer="null"` | string\|slot                           | 确定取消按钮        |
| forceRender       | 强制渲染 Modal                                              | boolean                                | false               |
| getContainer      | 指定 Modal 挂载的 HTML 节点                                 | (instance): HTMLElement                | () => document.body |
| keyboard          | 是否支持键盘 esc 关闭                                       | boolean                                | true                |
| mask              | 是否展示遮罩                                                | boolean                                | true                |
| maskClosable      | 点击蒙层是否允许关闭                                        | boolean                                | true                |
| maskStyle         | 遮罩样式                                                    | object                                 | {}                  |
| okButtonProps     | ok 按钮 props                                               | [ButtonProps](/components/button/#api) | -                   |
| okText            | 确认按钮文字                                                | string\|slot                           | 确定                |
| okType            | 确认按钮类型                                                | string                                 | primary             |
| title             | 标题                                                        | string\|slot                           | 无                  |
| open(v-model)     | 对话框是否可见                                              | boolean                                | 无                  |
| wrapClassName     | 对话框外层容器的类名                                        | string                                 | -                   |
| zIndex            | 设置 Modal 的 `z-index`                                     | number                                 | 1000                |

### 事件

| 事件名称 | 说明                                 | 回调参数    |
| -------- | ------------------------------------ | ----------- |
| cancel   | 点击遮罩层或右上角叉或取消按钮的回调 | function(e) |
| ok       | 点击确定回调                         | function(e) |

### 方法

| 名称 | 描述 | 说明 |
| ---- | ---- | ---- |

## FAQ

其他属性参照 a-modal
