<template>
  <div class="c-date-range">
    <a-button-group class="c-button-group">
      <a-button
        v-for="(item, index) in dateRangeButtons"
        :key="index"
        :type="item.checked ? 'primary' : 'default'"
        @click="setDateRange(item.subtractDays)"
      >
        {{ item.name }}
      </a-button>
    </a-button-group>
    <a-range-picker
      :allowClear="allowClear"
      :value="dateRange"
      :disabled-date="setDisabledDate"
      @change="onDateChange"
    ></a-range-picker>
  </div>
</template>

<script>
import { defineComponent, watch, ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import { withInstall } from '@packages/utils/util'

const CRecentDateRangePicker = defineComponent({
  name: 'CRecentDateRangePicker',
  props: {
    value: {
      type: Array
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    defaultRange: {
      type: String,
      default: 'lastWeek',
      validator: (value) => ['lastWeek', 'lastMonth'].indexOf(value) !== -1
    }
  },
  emits: ['update:value', 'change'],

  setup(props, { emit }) {
    const dateRangeButtons = ref([
      // { id: "yesterday", name: "昨天", subtractDays: [1, 1], checked: false },
      { id: 'lastWeek', name: '近一周', subtractDays: [7, 0], checked: false },
      { id: 'lastMonth', name: '近一月', subtractDays: [30, 0], checked: false }
    ])

    const dateRange = ref([])
    // watch(
    //   () => props.value,
    //   (newValue) => {
    //     if (!newValue.length) return
    //     dateRange.value = newValue.map((x) => dayjs(x))
    //   },
    //   {
    //     immediate: true,
    //     deep: true
    //   }
    // )
    const onDateChange = (date, dateString, custom) => {
      dateRange.value = date
      emit('change', dateString)
      emit('update:value', dateString)

      if (!custom)
        dateRangeButtons.value.splice(
          0,
          dateRangeButtons.value.length,
          ...dateRangeButtons.value.map((x) => ({ ...x, checked: false }))
        )
    }

    const setDateRange = (date = []) => {
      dateRange.value = date.map((x) => dayjs().subtract(x, 'days'))
      onDateChange(
        dateRange.value,
        dateRange.value.map((x) => x.format('YYYY-MM-DD')),
        true
      )
      const computedButtons = dateRangeButtons.value.map((x) => ({
        ...x,
        checked: x.subtractDays.toString() === date.toString()
      }))

      dateRangeButtons.value.splice(0, dateRangeButtons.value.length, ...computedButtons)
    }
    const setDisabledDate = (currentDate) => {
      return currentDate.isAfter(dayjs())
    }

    onMounted(() => {
      const target = dateRangeButtons.value.find((x) => x.checked || x.id == props.defaultRange)
      if (!target) return false
      setDateRange(target.subtractDays)
    })
    return { setDisabledDate, setDateRange, onDateChange, dateRange, dateRangeButtons }
  }
})
export default withInstall(CRecentDateRangePicker)
</script>

<style scoped>
.c-button-group {
  margin-right: 8px;
}
.c-date-range {
  min-width: 460px;
}

.ant-btn {
  line-height: 0;
}
</style>
