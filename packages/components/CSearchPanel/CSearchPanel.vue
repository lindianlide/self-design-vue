<template>
  <div class="c-search-panel">
    <a-form
      class="c-search-form"
      :model="formSearch"
      ref="formSearchRef"
      @finish="handleSearch"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-row :gutter="8">
        <template v-for="(e, i) in computedColumns" :key="i">
          <a-col
            v-bind="span"
            ref="searchColumnRefs"
            :class="'c-field-block-' + randoms"
            class="c-search-col"
            v-show="!e._form_invisible"
          >
            <a-form-item
              :name="e.dataIndex"
              :label="e.title || ''"
              :rules="e.decorator?.rules || []"
            >
              <template
                v-if="
                  e.scopedSlots &&
                  'boolean' != typeof e.scopedSlots.customSearchRender &&
                  (e.scopedSlots.customSearchRender || e.scopedSlots.customRender)
                "
              >
                <slot
                  :name="e.scopedSlots.customSearchRender || e.scopedSlots.customRender"
                  :slotScope="formSearch"
                ></slot>
              </template>
              <c-field
                v-else
                :type="e.type"
                :options="e.options"
                v-model:value="formSearch[e.dataIndex]"
                v-bind="e.editorProps"
              ></c-field>
            </a-form-item>
          </a-col>
        </template>
        <a-col v-bind="span" class="c-button-group">
          <div>
            <a-button type="primary" html-type="submit">
              {{ $t('crud.search') }}
            </a-button>
            <a-button class="c-button" @click.prevent="handleReset">
              {{ $t('crud.reset') }}
            </a-button>
            <a class="button-expand" @click="toggle" v-if="hasExpand">
              <span> {{ expand ? $t('crud.collapse') : $t('crud.expand') }}&nbsp; </span>
              <down-outlined v-if="!expand" />
              <up-outlined v-else />
            </a>
          </div>
        </a-col>
      </a-row>
    </a-form>
    <a-row></a-row>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import isString from 'lodash/isString'
import mapValues from 'lodash/mapValues'
import CField from '@packages/components/CTable/CField.vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'

import { random } from '@packages/utils/util'

const props = defineProps({
  columns: {
    type: Array
  },
  expandAll: {
    type: Boolean,
    default: false
  },
  maxRow: {
    type: Number,
    default: 1
  },
  formItemLayout: {
    type: Object,
    default: () => ({
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    })
  },
  span: {
    type: Object,
    default: () => ({
      xs: 12 * 2,
      sm: 12,
      md: 8,
      lg: 6,
      xl: 6,
      xxl: 6
    })
  }
})
const emit = defineEmits(['search', 'reset', 'toggle'])

const formSearch = ref({})
const formSearchRef = ref()
const fieldBlocks = new Array()
const randoms = random()
const expand = ref(false)
const hasExpand = ref(true)
let maxColumn = 0
const searchColumnRefs = ref([])

const computedColumns = computed(() => {
  return (props.columns.filter((x) => x.condition) || []).sort((x, y) => {
    return x.order - y.order
  })
})

const handleSearch = () => {
  // 官方@finish="onFinish"
  emit(
    'search',
    mapValues(formSearch.value, (v) => (isString(v) && !v ? undefined : v))
  )
}

const handleReset = () => {
  formSearchRef.value.resetFields()
  emit('reset', formSearchRef.value)
}

const toggle = () => {
  expand.value = !expand.value
  expandFieldBlocks(expand.value)
  //todo this.$parent.$forceUpdate()
  emit('toggle', expand.value)
}

// const renderChild = (h, row) => {
//   const render =
//     this.$scopedSlots[row.scopedSlots.customSearchRender || row.scopedSlots.customRender]
//   if (render) this.$slots.default = render({ record: row })
// }

const expandFieldBlocks = (isExpand) => {
  if (1 > fieldBlocks.length) return
  computedColumns.value
    .filter((x, i) => i + 1 + 1 > maxColumn)
    .forEach((x) => {
      x._form_invisible = !isExpand
    })
}
onMounted(() => {
  //form赋初始值
  props.columns
    .filter((column) => column.condition && column.decorator?.initialValue !== undefined)
    .forEach((item) => {
      formSearch.value[item.dataIndex] = item.decorator.initialValue
    })
  //折叠、搜索
  const nodes = searchColumnRefs.value
  if (1 > nodes.length) return
  let maxLine = 1
  nodes.forEach((node, i) => {
    const el = node.$el
    const bottom = el.getBoundingClientRect().bottom
    const block = { dom: el, bottom: bottom, line: 1 }
    if (0 < i) {
      const previousBlock = fieldBlocks[i - 1]
      block.line = previousBlock.line + (previousBlock.bottom < bottom ? 1 : 0)
    }
    if (block.line > props.maxRow && !props.expandAll) {
      // x.style.display = "none";
      // nodes[i - 1].style.display = "none";
      block._form_invisible = true
      fieldBlocks[i - 1]._form_invisible = true
    }
    if (block.line > maxLine) {
      maxLine = block.line
      if (0 == maxColumn) maxColumn = i
    }
    fieldBlocks.push(block)
  })
  if (2 > maxLine && 2 > props.maxRow) hasExpand.value = false
  if (maxLine == props.maxRow || props.expandAll) expand.value = true
  computedColumns.value.forEach((col, i) => {
    col._form_invisible = fieldBlocks.length > i && fieldBlocks[i]._form_invisible
  })
})
</script>
<script>
export default {
  name: 'CSearchPanel'
}
</script>
<style lang="less" scoped>
.c-search-panel {
  padding: 17px 10px 0px 10px;
  background: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
}

.c-search-panel .ant-form {
  max-width: none;
}

:deep(.c-search-form) {
  .c-search-col {
    min-width: 220px;
  }

  .ant-form-item {
    display: flex;
    margin-bottom: 2px;

    .ant-row.ant-form-row {
      width: 100%;
    }

    .ant-form-item-label {
      min-width: 70px;
      height: 45px;
    }

    .ant-form-item-control {
      height: 45px;
      .ant-form-item-control-input-content {
        min-width: 150px;
      }
      .ant-input-number {
        width: 100%;
      }
    }
  }
}

.c-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

.ant-input-number,
.ant-calendar-picker {
  width: 100%;
}

.c-button-group {
  white-space: nowrap;
  display: flex;
  margin-left: auto;
  margin-bottom: 10px;
}

.c-button-group > div {
  flex: 1;
  text-align: right;
  display: table-cell;
  vertical-align: middle;
  line-height: 30px;
}

.c-button {
  display: inline-block;
  margin-left: 8px;
}
.button-expand {
  margin-left: 5px;
}
</style>
