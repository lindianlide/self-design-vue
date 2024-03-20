<template>
  <a-spin :spinning="isLoading">
    <c-transfer
      :dataSource="dataSource"
      :titles="titles"
      v-model:targetKeys="targetKeys"
      :render="titleRender"
      showSearch
      @change="handleChange"
      @search="handleSearch"
    >
    </c-transfer>
  </a-spin>
</template>

<script>
import { ref, computed, onMounted, defineComponent } from 'vue'

import { getAccounts } from '@packages/api'
import debounce from 'lodash/debounce'
import orderBy from 'lodash/orderBy'
import { withInstall } from '@packages/utils/util'

const CEmployeeTransfer = defineComponent({
  name: 'CEmployeeTransfer',
  props: {
    data: {
      type: Array
    }
  },
  emits: ['update:targetKeys', 'change'],
  setup(props, { emit, expose }) {
    const isLoading = ref(false)
    const dataSource = ref([])

    const titles = ref(['Source', 'Target'])
    const targetKeys = ref([])
    const selectedKeys = ref([])

    const computedData = computed(() => {
      return orderBy(props.data, ['organization.level', 'organization.id'], ['asc', 'asc'])
    })

    const titleRender = (item) => `${item.title} - ${item.description}`

    const convert = (data) => {
      return !data || !data.length
        ? []
        : data.map((x) => ({
            key: x.number,
            title: x.number,
            description: `${x.nickname || ''} - ${x.organization ? x.organization.name : ''}`
          }))
    }

    const findAll = (p) => {
      isLoading.value = true
      getAccounts({ ...p })
        .then((response) => {
          isLoading.value = false
          if (!response.data) return false
          const result =
            response.data.content && response.data.content.length
              ? response.data.content.filter((x) => !targetKeys.value.includes(x.number))
              : []
          const _dataSource = [
            ...dataSource.value.filter((x) => targetKeys.value.includes(x.key)),
            ...convert(result)
          ]
          dataSource.value = orderBy(_dataSource, ['organization.id'], ['asc'])
        })
        .catch((error) => {
          isLoading.value = false
          console.error(error)
        })
    }

    const handleChange = (nextTargetKeys, direction, moveKeys) => {
      emit('change', { nextTargetKeys, direction, moveKeys })
      emit('update:targetKeys', nextTargetKeys)
    }

    const handleSearch = debounce((direction, value) => {
      if (direction == 'right') return false
      if (!value) return false
      findAll({ key: value, size: -1 })
    }, 300)

    onMounted(() => {
      dataSource.value = convert(computedData.value)
      targetKeys.value = dataSource.value.map((x) => x.key)
    })
    return {
      handleChange,
      handleSearch,
      dataSource,
      isLoading,
      titleRender,
      titles,
      targetKeys,
      selectedKeys
    }
  }
})
export default withInstall(CEmployeeTransfer)
</script>

<style scoped></style>
