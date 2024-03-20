<template>
  <iframe
    class="c-iframe c-filled-iframe"
    :id="id"
    :src="url"
    :title="title"
    width="100%"
    height="100%"
    scrolling="no"
  ></iframe>
</template>

<script>
import { onMounted, defineComponent } from 'vue'

import { withInstall } from '@packages/utils/util'

const CIframe = defineComponent({
  name: 'CIframe',
  props: {
    url: {
      type: String
    },
    title: {
      type: String,
      default: 'iframe'
    },
    id: {
      type: String,
      default: 'iframeId'
    }
  },
  setup() {
    const resetHeight = () => {
      const headerHeight = document
        .querySelector('.ant-layout-header')
        ?.getBoundingClientRect().height
      //TODO:
      let margin = 10
      document.querySelector('.c-filled-iframe').style.height = `calc(100vh - ${headerHeight}px - ${
        margin * 2
      }px )`
    }
    onMounted(() => {
      resetHeight()
    })
  }
})
export default withInstall(CIframe)
</script>

<style scoped>
.c-iframe {
  min-height: 100%;
  overflow: hidden;
  border: 0;
}
</style>
