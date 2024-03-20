## vue3 常用 api

```vue demo
<script setup>
import {
  ref,
  toRef,
  toRefs,
  reactive,
  readonly,
  toRaw,
  computed,
  watchEffect,
  watch,
  getCurrentInstance,
  nextTick,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onRenderTracked,
  onRenderTriggered,
  onActivated,
  onDeactivated,
  onErrorCaptured
} from 'vue'

console.log('---setup')

const props = defineProps({
  tab: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:tab'])

const num = ref(1)
const count = ref(1)

const userInfo = reactive({ name: '1', age: 18 })
const userInfoRead = readonly(userInfo)
const age = toRef(userInfo, 'age')
const propsData = toRefs(props)
const userInfoOrigin = toRaw(userInfo)

//获取全局数据
const app = getCurrentInstance()
// 全局数据，是不具备响应式的。
const globalData = app.appContext.config.globalProperties

console.log('---num', num.value)
console.log('---userInfo', userInfo)

//computed用法
const plusOne = computed(() => num.value + 1)
const plusOneCustom = computed({
  get: () => num.value + 1,
  set: (val) => {
    num.value = val - 1
  }
})

//侦听一个 ref
watch(num, (num, prevNum) => {
  /* ... */
  nextTick(() => {
    /* ... */
  })
})
//侦听一个 getter 函数
watch(
  () => userInfo.age,
  (age, prevAge) => {
    /* ... */
  }
)
//深层模式
watch(
  () => userInfo,
  (newValue, oldValue) => {
    // newValue === oldValue
  },
  { deep: true }
)
//监听计算属性的变化,stop()可停止监听
const stop = watch(plusOne, (newNum, oldNum) => {
  /* ... */
})
//侦听多个来源时
watch([num, count], ([num, count], [prevNum, prevCount]) => {
  /* ... */
})
//自动收集其内部响应式依赖
watchEffect(
  () => {
    console.log('---effect post', num.value)
  },
  { flush: 'post' }
)

const change = (tab) => {
  emit('update:tab', tab) // 向父组件回传数据
}

//父组件可以访问的属性及方法
defineExpose({
  change
})
// 挂载阶段
onBeforeMount(() => console.log('---开始挂载'))
onRenderTracked(() => console.log('---跟踪'))
onMounted(() => console.log('---挂载完成'))

// 更新阶段
onRenderTriggered(() => console.log('---触发'))
onBeforeUpdate(() => console.log('---开始更新'))
onUpdated(() => console.log('---更新完成'))

// 销毁阶段
onBeforeUnmount(() => console.log('---开始销毁'))
onUnmounted(() => console.log('---销毁完成'))

// 与动态组件有关
onActivated(() => console.log('---激活'))
onDeactivated(() => console.log('---休眠'))

// 异常捕获
onErrorCaptured(() => console.log('---错误捕获'))
</script>
```
