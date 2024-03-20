<template>
  <a-button
    v-if="type == 'button'"
    type="link"
    :icon="computedIcon"
    :style="style"
    @click="zoom"
  ></a-button>
  <span v-else @click="zoom">
    <FullscreenOutlined v-if="!isFullScreen" :style="style" />
    <FullscreenExitOutlined v-else :style="style" />
  </span>
</template>

<script>
import { defineComponent, computed, ref, h, onUnmounted, onMounted } from 'vue'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue'

import { withInstall } from '@packages/utils/util'
const requestFullscreen = (dom) => {
  if (dom.requestFullscreen) {
    dom.requestFullscreen()
  } else if (dom.mozRequestFullScreen) {
    dom.mozRequestFullScreen()
  } else if (dom.webkitRequestFullscreen) {
    dom.webkitRequestFullscreen()
  } else if (dom.msRequestFullscreen) {
    dom.msRequestFullscreen()
  }
}

const exitFullscreen = () => {
  if (document.exitFullScreen) {
    document.exitFullScreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

const isFullScreenFun = () => {
  return !!(
    document.fullscreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen ||
    document.webkitFullScreen ||
    document.msFullScreen
  )
}

const isFullscreenEnabled = () => {
  return (
    document.fullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.msFullscreenEnabled
  )
}

const getFullscreendomment = () => {
  return (
    document.fullscreendomment ||
    document.mozFullScreendomment ||
    document.msFullScreendomment ||
    document.webkitFullscreendomment ||
    null
  )
}

const addFullScreenListener = (fullScreenHandler) => {
  if ('onfullscreenchange' in document) {
    document.addEventListener('fullscreenchange', fullScreenHandler)
  }
  if ('onmozfullscreenchange' in document) {
    document.addEventListener('mozfullscreenchange', fullScreenHandler)
  }
  if ('onwebkitfullscreenchange' in document) {
    document.addEventListener('webkitfullscreenchange', fullScreenHandler)
  }
  if ('onmsfullscreenchange' in document) {
    document.onmsfullscreenchange = fullScreenHandler
  }
}

const removeFullScreenListener = (fullScreenHandler) => {
  if ('onfullscreenchange' in document) {
    document.removeEventListener('fullscreenchange', fullScreenHandler)
  }
  if ('onmozfullscreenchange' in document) {
    document.removeEventListener('mozfullscreenchange', fullScreenHandler)
  }
  if ('onwebkitfullscreenchange' in document) {
    document.removeEventListener('webkitfullscreenchange', fullScreenHandler)
  }
  if ('onmsfullscreenchange' in document) {
    document.removeEventListener('msfullscreenchange', fullScreenHandler)
  }
}
const CZoom = defineComponent({
  name: 'CZoom',
  components: { FullscreenOutlined, FullscreenExitOutlined },
  props: {
    dom: {
      type: HTMLElement,
      default: () => document.body
    },
    type: {
      type: String,
      default: 'button',
      validator: (value) => {
        return ['icon', 'button'].includes(value)
      }
    },
    style: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    let isFullScreen = ref(isFullScreenFun())
    const computedIcon = computed(() => {
      return isFullScreen.value ? h(FullscreenExitOutlined) : h(FullscreenOutlined)
    })

    const zoom = () => {
      isFullScreen.value = !isFullScreen.value
      if (isFullScreen.value) requestFullscreen(props.dom)
      else exitFullscreen()
    }
    const fullScreenHandler = () => {
      isFullScreen.value = isFullScreenFun()
    }

    onMounted(() => {
      addFullScreenListener(fullScreenHandler)
    })
    onUnmounted(() => {
      removeFullScreenListener(fullScreenHandler)
    })
    return { isFullScreen, computedIcon, zoom }
  }
})

export default withInstall(CZoom)
</script>

<style scoped></style>
