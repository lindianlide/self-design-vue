<template>
  <div>
    <a-select
      v-bind="$attrs"
      v-model:value="currentValue"
      :style="customStyle"
      :options="projects"
      :filter-option="filterOption"
      :dropdownMatchSelectWidth="false"
      :optionLabelProp="fieldNames.optionLabelProp || 'projId'"
      show-search
      allow-clear
      @change="onSelectChange"
    >
    </a-select>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useProjectDropList } from '@packages/hooks/useProjectDropList'

const props = defineProps({
  value: {
    type: [String, Number]
  },
  customStyle: {
    type: Object,
    default: () => ({ minWidth: '150px' })
  },
  parameter: {
    type: Object,
    default: () => ({})
  },
  fieldNames: {
    type: Object,
    default: () => ({
      value: 'projNo',
      optionLabelProp: 'projId'
    })
  }
})
const emit = defineEmits(['change', 'update:value'])

const { getProjectList } = useProjectDropList()
const projects = ref([])
const currentValue = ref()
const statusOptions = [
  { label: '前沿项目', value: '1' },
  { label: '冻结', value: '2' },
  { label: '在建', value: '3' },
  { label: '完成', value: '4' }
]
watch(
  () => props.value,
  (newValue) => {
    currentValue.value = newValue
  }
)

onMounted(async () => {
  const res = await getProjectList(props.parameter)
  currentValue.value = props.value
  const optionValue = props.fieldNames.value || 'projNo'
  projects.value = res.map((item) => {
    const status = getStatus(item.stat)
    return {
      label: `${item.projId} (${item.projName})-${status}`,
      value: item[optionValue],
      ...item
    }
  })
})

const getStatus = (value) => {
  const option = statusOptions.find((x) => x.value === value)
  return option ? option.label : value
}

const filterOption = (input, option) => {
  return option && option.label && option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

const onSelectChange = (newValue, option) => {
  currentValue.value = newValue
  emit('change', option)
  //父v-model:value接受，cField use
  emit('update:value', newValue)
}
</script>
<script>
export default {
  name: 'CProjectSelect'
}
</script>
