<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      :style="style"
      style="overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, nextTick, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
defineProps({
  style: {
    type: Object,
    default: () => ({ height: '500px' })
  },
  toolbarConfig: {
    type: Object,
    default: () => ({})
  },
  editorConfig: {
    type: Object,
    default: () => ({
      placeholder: '请输入内容...'
    })
  }
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')
const mode = 'default' // 或 'simple'

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const getData = () => {
  return valueHtml.value
}
const setData = (data) => {
  nextTick(() => {
    valueHtml.value = data
  })
}
defineExpose({
  getData,
  setData
})
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>
<script>
export default {
  name: 'CEditor'
}
</script>
