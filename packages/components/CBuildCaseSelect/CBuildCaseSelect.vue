<template>
  <div>
    <a-select
      v-bind="$attrs"
      v-model:value="currentValue"
      :style="customStyle"
      :options="buildCases"
      :filter-option="filterOption"
      :dropdownMatchSelectWidth="false"
      :optionLabelProp="fieldNames.optionLabelProp || 'name'"
      show-search
      allow-clear
      @change="onSelectChange"
    >
    </a-select>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useBuildCaseDropList } from '@packages/hooks/useBuildCaseDropList'

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
      value: 'orgNo',
      optionLabelProp: 'name'
    })
  }
})
const emit = defineEmits(['change', 'update:value'])

const { getBuildCaseList } = useBuildCaseDropList()
const buildCases = ref([])
const currentValue = ref()

watch(
  () => props.value,
  (newValue) => {
    currentValue.value = newValue
  }
)

onMounted(async () => {
  const res = await getBuildCaseList(props.parameter)
  currentValue.value = props.value
  const optionValue = props.fieldNames.value || 'orgNo'
  buildCases.value = res.map((item) => {
    return {
      label: `${item.name}`,
      value: item[optionValue],
      ...item
    }
  })
})

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
  name: 'CBuildCaseSelect'
}
</script>
