<template>
  <a-tree-select
    allowClear
    treeNodeFilterProp="title"
    :treeDefaultExpandedKeys="computedTreeDefaultExpandedKeys"
    :showSearch="showSearch"
    v-model:value="treeValue"
    :treeData="treeData"
    :multiple="multiple"
    :style="customStyle"
    :dropdownStyle="dropdownStyle"
    :showCheckedStrategy="SHOW_PARENT"
    :dropdownMatchSelectWidth="dropdownMatchSelectWidth"
    @change="onChange"
    v-bind="$attrs"
  >
  </a-tree-select>
</template>

<script>
import { ref, computed, onMounted, watch, defineComponent } from 'vue'
import { getOrganizations } from '@packages/api'
import array2tree from 'array-to-tree'
import { withInstall } from '@packages/utils/util'
import { TreeSelect } from 'ant-design-vue'

const COrganizationSelect = defineComponent({
  name: 'COrganizationSelect',
  props: {
    value: {
      type: [Array, String],
      default: ''
    },
    fieldNames: {
      type: Object,
      default: () => ({ label: 'name', value: 'id', children: 'children' })
    },
    customStyle: {
      type: Object,
      default: () => ({ width: '150px' })
    },
    dropdownStyle: {
      type: Object,
      default: () => ({ maxHeight: '300px', overflow: 'auto' })
    },
    dropdownMatchSelectWidth: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    disabledType: {
      type: String
    },
    root: {
      type: String
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:value', 'change', 'select'],
  setup(props, { emit, expose }) {
    const treeData = ref([])
    let originData = []
    const treeValue = ref(undefined)
    const SHOW_PARENT = TreeSelect.SHOW_PARENT

    const computedType = computed(() => {
      return props.disabledType ? props.disabledType.toUpperCase() : undefined
    })
    const computedTreeDefaultExpandedKeys = computed(() => {
      return treeData.value && treeData.value.length == 1 ? [treeData.value[0].key] : []
    })

    watch(
      () => props.value,
      (newValue) => {
        treeValue.value = newValue
      },
      {
        immediate: true,
        deep: true
      }
    )
    watch(
      () => props.root,
      (newValue) => {
        init(newValue)
      }
    )

    const clear = () => {
      treeValue.value = undefined
    }

    const onChange = (value) => {
      treeValue.value = value || undefined
      const values = value || undefined
      const selectedOptions = value
        ? Array.isArray(value)
          ? originData.filter((x) => value.some((y) => y == x[props.fieldNames.value]))
          : originData.filter((x) => value == x[props.fieldNames.value])
        : undefined
      if (props.multiple) {
        emit('change', values, selectedOptions)
        emit('select', selectedOptions)
      } else {
        emit('change', values, selectedOptions[0])
        emit('select', selectedOptions[0])
      }
      //父v-model:value接受，cField use
      emit('update:value', values)
    }

    const init = (rootOption = props.root) => {
      const condition = { recursion: true }
      //接口不支持
      if (rootOption) {
        condition[props.fieldNames.value] = rootOption
      } else {
        condition.isRoot = true
      }
      getOrganizations(condition)
        .then((response) => {
          if (!response.data || !response.data.length) return false

          const { data } = response

          const dataMap = data.map((x) => {
            const result = {
              // isLeaf: !x.children || !x.children.length ,
              title: x[props.fieldNames.label],
              key: x[props.fieldNames.value],
              value: x[props.fieldNames.value],
              disabled: props.disabledType && computedType.value != x.type,
              type: x.type,
              parentId: x.parentId,
              id: x.id,
              number: x.number
            }

            result[props.fieldNames.label] = x[props.fieldNames.label]
            result[props.fieldNames.value] = x[props.fieldNames.value]

            return result
          })

          originData = Object.freeze(dataMap)
          treeData.value = array2tree(dataMap, { parentProperty: 'parentId' })
        })
        .catch((error) => {
          console.error(error)
        })
    }
    onMounted(() => {
      init()
    })
    expose({ clear })

    return { SHOW_PARENT, computedTreeDefaultExpandedKeys, treeData, treeValue, onChange }
  }
})
export default withInstall(COrganizationSelect)
</script>
