<template>
  <a-select
    :mode="computedMode"
    :dropdown-match-select-width="false"
    :open="state.dropdownVisible"
    :options="options"
    :value="computedValue"
    :style="customStyle"
    show-arrow
    allow-clear
    v-bind="$attrs"
    @change="onChange"
    @focus="onFocus"
    ref="selection"
    class="_c_v_project"
  >
    <template #dropdownRender>
      <div ref="dropdownRef" class="_c_v_project" v-click-outside="onCancel">
        <a-select
          class="project_stat"
          default-value="3"
          v-model="state.projectStat"
          popupClassName="_c_v_project"
          @change="onSearch"
        >
          <a-select-option value="3"> 在建 </a-select-option>
          <a-select-option value="-1"> 全部 </a-select-option>
        </a-select>
        <a-input-search
          :placeholder="$t('message.inputKeyword')"
          v-model:value="state.searchName"
          @input="onSearch"
          ref="inputRef"
        />
        <a-table
          :style="{ width: '508px' }"
          :row-selection="rowSelection"
          :customRow="customRow"
          :pagination="false"
          :columns="state.columns"
          :data-source="state.dataSource"
          :scroll="{ y: 160 }"
          :bordered="false"
        >
        </a-table>
      </div>
    </template>
  </a-select>
</template>

<script>
import vClickOutside from 'click-outside-vue3'
import { getProjects as getProjectDropList } from '@packages/api/index'
import {
  reactive,
  ref,
  watch,
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  onDeactivated,
  defineComponent
} from 'vue'
import { withInstall } from '@packages/utils/util'

const statusOptions = [
  { label: '前沿项目', value: '1' },
  { label: '冻结', value: '2' },
  { label: '在建', value: '3' },
  { label: '完成', value: '4' }
]

const fieldMap = {
  projNo: 'projNo',
  projId: 'projId'
}

function getSelectorParentNodes(dom) {
  const className = '_c_v_project'
  let parentNode = dom.parentNode
  let result = false
  while (parentNode && !result) {
    result = parentNode && parentNode.classList && parentNode.classList.contains(className)
    parentNode = parentNode.parentNode
  }
  return result
}
const CProjectSelect = defineComponent({
  name: 'CProjectSelect',
  props: {
    //mode: custom自定义项目list
    mode: {
      type: String,
      default: 'default'
    },
    customStyle: {
      type: Object,
      default: () => ({ minWidth: '150px' })
    },
    fieldNames: {
      type: Object
    },
    parameter: {
      type: Object,
      default: () => ({})
    },
    ajax: {
      type: [Promise, Function],
      default: () => (parameters) => getProjectDropList(parameters)
    },
    value: {
      type: [String, Number, Array]
    },
    projctList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['change', 'update:value'],
  directives: { clickOutside: vClickOutside.directive },

  setup(props, { emit }) {
    const state = reactive({
      values: [],
      selfFieldNames: {
        value: 'projNo',
        label: 'projId'
      },
      dropdownVisible: false,
      selectedRowKeys: [],
      dataSource: [],
      originalDataSource: [],
      searchName: '',
      projectStat: '3',
      columns: [
        { dataIndex: 'projId', title: '编号', width: 100 },
        { dataIndex: 'projName', title: '名称', width: 160 },
        { dataIndex: 'vesselTypeId', title: '类型', width: 100 },
        {
          dataIndex: 'stat',
          title: '状态',
          customRender: ({ text }) => {
            return getStatus(text)
          },
          width: 80
        }
      ]
    })

    const selection = ref()
    const inputRef = ref()

    const computedValue = computed(() => {
      if (props.value instanceof Array) {
        return props.value
      } else if (props.value) {
        return props.value + ''
      } else {
        return undefined
      }
    })

    const multiple = computed(() => {
      return props.mode === 'multiple'
    })

    const computedMode = computed(() => {
      return multiple.value ? 'tags' : 'default'
    })
    const options = computed(() => {
      const options = state.dataSource.map((x) => ({
        label: x[state.selfFieldNames.label],
        value: x[state.selfFieldNames.value]
      }))
      return options || []
    })
    const rowSelection = computed(() => {
      return {
        onChange: (selectedRowKeys) => {
          onChange(selectedRowKeys)
          if (!multiple.value) {
            state.dropdownVisible = false
          }
        },
        selectedRowKeys: state.values,
        type: multiple.value ? 'checkbox' : 'radio'
      }
    })

    const customRow = computed(() => {
      return (record) => {
        return {
          onClick: () => {
            const { key } = record
            if (!multiple.value) state.values.splice(0, state.values.length, key)
            else {
              const index = state.values.indexOf(key)
              if (index < 0) state.values.push(key)
              else state.values.splice(index, 1)
            }
            onChange(state.values)
            if (!multiple.value) {
              state.dropdownVisible = false
            }
          }
        }
      }
    })

    watch(
      () => props.fieldNames,
      (value) => {
        if (!state.selfFieldNames) {
          state.selfFieldNames = {
            value: 'projNo',
            label: 'projId'
          }
        }
        if (value) {
          if (fieldMap[value.label]) state.selfFieldNames.label = fieldMap[value.label]
          if (fieldMap[value.value]) state.selfFieldNames.value = fieldMap[value.value]
        }
      },
      { deep: true, immediate: true }
    )
    watch(
      () => props.value,
      (value) => {
        if (value === undefined) state.dropdownVisible = false
        state.values = value ? (value instanceof Array ? value : [value]) : []
      },
      { deep: true, immediate: true }
    )

    watch(
      () => props.projctList,
      (values) => {
        state.dataSource = values.map((x) => ({ ...x, key: x[state.selfFieldNames.value] + '' }))
        state.originalDataSource = JSON.parse(JSON.stringify(state.dataSource))
        //Object.freeze(state.originalDataSource)
      },
      { deep: true, immediate: true }
    )

    const onChange = (values = []) => {
      state.values.splice(0, state.values.length, ...values)
      const value = multiple.value ? values : values[0]
      emit('change', value)
      emit('update:value', value)
    }
    const onSearch = () => {
      // this.getData({ key: value });
      const value = state.searchName
      state.dataSource.splice(
        0,
        state.dataSource.length,
        ...state.originalDataSource.filter((x) => {
          const isFilter =
            x.projId.includes(value) || x.projName.toUpperCase().includes(value.toUpperCase())
          if (state.projectStat === '-1') {
            return isFilter
          } else {
            return x.stat.includes(state.projectStat) && isFilter
          }
        })
      )
    }
    const onFocus = () => {
      if (state.dropdownVisible) return
      state.dropdownVisible = true
      state.searchName = ''
      nextTick(() => {
        onSearch()
        if (selection.value) selection.value.blur()
        if (inputRef.value) {
          inputRef.value.focus()
        }
      })
    }
    const onCancel = (event) => {
      if (!getSelectorParentNodes(event.target)) state.dropdownVisible = false
    }
    const getStatus = (value) => {
      const option = statusOptions.find((x) => x.value === value)
      return option ? option.label : value
    }
    const getData = (parameters = {}) => {
      getProjectDropList({
        ...props.parameter,
        ...parameters
      }).then(({ data }) => {
        state.dataSource = data.map((x) => ({
          ...x,
          projNo: x.projNo + '',
          key: x[state.selfFieldNames.value] + ''
        }))
        state.originalDataSource = JSON.parse(JSON.stringify(state.dataSource))
        //Object.freeze(state.originalDataSource)
      })
    }

    onMounted(() => {
      if (props.mode !== 'custom') {
        getData()
      }
    })

    onUnmounted(() => {
      state.dropdownVisible = false
    })

    onDeactivated(() => {
      state.dropdownVisible = false
    })

    return {
      state,
      computedValue,
      computedMode,
      options,
      rowSelection,
      customRow,
      onFocus,
      onCancel,
      onSearch,
      getStatus,
      onChange
    }
  }
})
export default withInstall(CProjectSelect)
</script>
<style scoped lang="less">
:deep(.ant-input-group-wrapper) {
  width: 421px;
  .ant-input {
    border-radius: 0;
    &:hover {
      z-index: 1;
    }
    &:focus {
      z-index: 1;
    }
  }
}
:deep(.project_stat) {
  width: 90px;
  margin-right: -2px;
  z-index: 1;
  .ant-select-selector {
    border-radius: 4px 0 0 4px;
  }
}
.c-buttons {
  width: 100%;
  margin: 2px;
}

:deep(.c-buttons) {
  :first-child {
    margin-left: auto;
  }
}
</style>
