<template>
  <a-popover placement="rightTop" v-model:open="visible">
    <template v-slot:content>
      <a-spin :spinning="loading">
        <a-descriptions size="small" :column="1" bordered>
          <a-descriptions-item
            v-for="(item, index) in computedEmployee"
            :label="item.label"
            :key="index"
          >
            <a-space>
              <span>{{ item.value }}</span>
              <a-tag v-if="item.tag" size="small">{{ item.tag }}</a-tag>
            </a-space>
          </a-descriptions-item>
        </a-descriptions>
      </a-spin>
    </template>
    <slot>{{ rowKey }}</slot>
  </a-popover>
</template>

<script>
import { ref, computed, watch, defineComponent } from 'vue'
import { getAccounts } from '@packages/api'

const getEmployeeOptions = (item) => [
  { label: '姓名', value: item.nickname, tag: item.type },
  item.organization && { label: '组织', value: item.organization.name },
  item.email && { label: '邮箱', value: item.email }
]
const CEmployeeDescription = defineComponent({
  name: 'CEmployeeDescription',
  props: {
    rowKey: {
      type: String
    }
  },
  setup(props) {
    const employee = ref({})
    const loading = ref(false)
    const visible = ref(false)

    const computedEmployee = computed(() => {
      return getEmployeeOptions(employee.value).filter((x) => x)
    })

    watch(visible, (value) => {
      if (!value || !props.rowKey) return
      loading.value = true
      getAccounts({ key: props.rowKey })
        .then(({ data }) => {
          if (data.content.length) employee.value = data.content[0]
          loading.value = false
        })
        .catch((error) => {
          loading.value = false
          console.error(error)
        })
    })
    return { visible, loading, employee, computedEmployee }
  }
})
export default CEmployeeDescription
</script>
