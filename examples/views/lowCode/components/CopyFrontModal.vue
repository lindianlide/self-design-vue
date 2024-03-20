<template>
  <c-modal v-model:open="modalVisible" title="前端代码" okText="复制" @ok="copy">
    <a-tabs v-model:activeKey="activeKey" class="tab-code">
      <a-tab-pane key="vue" tab="vue">
        <highlightjs autodetect :code="vueCode" />
      </a-tab-pane>
      <a-tab-pane key="js" tab="js">
        <highlightjs autodetect :code="jsCode" />
      </a-tab-pane>
    </a-tabs>
  </c-modal>
</template>
<script setup>
import { ref, computed } from 'vue'
import beautify from 'js-beautify'
import useClipboard from 'vue-clipboard3'
import { message } from 'ant-design-vue'

const props = defineProps({
  copyFrontState: {
    type: Object,
    default: () => ({
      vueCode: '',
      jsCode: ''
    })
  }
})

const vueCode = computed(() => {
  return beautify.html(props.copyFrontState.vueCode)
})
const jsCode = computed(() => {
  return beautify.html(props.copyFrontState.jsCode)
})

const { toClipboard } = useClipboard()

const activeKey = ref('vue')
const modalVisible = ref(false)

const copy = async () => {
  try {
    if (activeKey.value === 'vue') {
      await toClipboard(vueCode.value)
    } else {
      await toClipboard(jsCode.value)
    }
    message.success('复制成功')
  } catch (e) {
    message.error('复制失败')
  }
}

defineExpose({
  modalVisible
})
</script>
<style lang="less">
.tab-code {
  code {
    height: 700px;
  }
}
</style>
