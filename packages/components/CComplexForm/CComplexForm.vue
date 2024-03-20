<template>
  <div class="c-search-panel">
    <a-form
      class="c-search-form"
      :model="formSearch"
      ref="formSearchRef"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      @finish="handleSearch"
    >
      <a-row :gutter="10">
        <template v-for="(e, i) in computedDefaultColumns" :key="i">
          <a-col
            v-bind="span"
            class="c-field-block"
            :class="'c-field-block-' + randoms"
            ref="searchColumnRefs"
            v-show="!e._form_invisible"
          >
            <a-form-item
              :label="e.title || ''"
              :name="e.dataIndex"
              :rules="e.decorator?.rules || e.rules || []"
            >
              <a-input-group compact>
                <a-form-item-rest>
                  <a-select
                    class="select-operate"
                    :options="computedOperators(e.complex.operators, e.dataIndex)"
                    :defaultValue="defaultOperatorValue"
                    @change="handleOperatorChange"
                    :dropdownMatchSelectWidth="false"
                  ></a-select
                ></a-form-item-rest>
                <div class="c-value-field" style="width: calc(90% - 100px)">
                  <div
                    :style="e.soltStyle"
                    v-if="
                      e.scopedSlots &&
                      (e.scopedSlots.customFormRender || e.scopedSlots.customRender)
                    "
                  >
                    <slot :name="e.scopedSlots.customRender" :slotScope="formSearch"></slot>
                  </div>
                  <c-field
                    v-else
                    :type="e.type"
                    :options="e.options"
                    v-model:value="formSearch[e.dataIndex]"
                    v-bind="e.editorProps"
                  ></c-field>
                </div>
              </a-input-group>
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
            <a-button class="c-button" @click.prevent="handleModalShow">
              {{ $t('crud.remain') }}
            </a-button>
            <a class="c-button" @click="toggle" v-if="hasExpand">
              <span> {{ expand ? $t('crud.collapse') : $t('crud.expand') }}&nbsp; </span>
              <down-outlined v-if="expand === 'down'" />
              <up-outlined v-else />
            </a>
          </div>
        </a-col>
      </a-row>
    </a-form>
    <a-row></a-row>
    <c-modal
      destroyOnClose
      v-model:open="modelVisible"
      :title="$t('crud.remain')"
      @ok="handleModalConfirm"
    >
      <a-checkbox-group
        :default-value="computedDefaultColumns"
        @change="handleDefaultColumnsChange"
      >
        <a-row>
          <a-col :span="8" v-for="e in computedColumns" :key="e.dataIndex">
            <a-checkbox :value="e">
              {{ e.title }}
            </a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </c-modal>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { random, operatorOptions } from '@packages/utils/util'
import isString from 'lodash/isString'
import CField from '@packages/components/CTable/CField.vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
const trim = (value) => (isString(value) ? value.trim() : value)

const props = defineProps({
  slotStyle: {
    type: String,
    default: ''
  },
  columns: {
    type: Array,
    required: true
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
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    })
  },
  span: {
    type: Object,
    default: () => ({
      xs: 12 * 2,
      sm: 12 * 2,
      md: 12 * 2,
      lg: 12,
      xl: 8,
      xxl: 8
    })
  }
})
const emit = defineEmits(['search', 'reset', 'toggle'])
const searchColumnRefs = ref([])
const formSearch = ref({})
const formSearchRef = ref()
const fieldBlocks = new Array()
const randoms = random()
const expand = ref(false)
const hasExpand = ref(true)
const modelVisible = ref(false)

let maxColumn = 0
let remainedColumns = new Array()
let operatorMap = new Object()
const defaultOperatorValue = ref('EQUALS')

const computedColumns = computed(() => {
  return props.columns
    .filter((x) => x.complex)
    .map((x) => {
      x.complex = x.complex instanceof Object ? x.complex : {}
      return x
    })
})
const computedDefaultColumns = computed(() => {
  return computedColumns.value.filter((x) => x.complex.default)
})

const computedOperators = computed(() => {
  return (operators, key) => {
    const result =
      !operators || !operators.length
        ? operatorOptions
        : operators.map((x) => {
            return operatorOptions.find((y) => y.value == x || y.alias == x || y.label == x)
          })

    return result.map((x) => ({ ...x, dataIndex: key }))
  }
})

const handleSearch = () => {
  const parameters = convertExpressionValues(formSearch.value)
  emit('search', encodeURIComponent(JSON.stringify(parameters)), parameters)
}
const handleReset = () => {
  formSearchRef.value.resetFields()
  emit('reset', formSearchRef.value)
}

const handleModalShow = () => {
  modelVisible.value = true
}

const handleModalConfirm = () => {
  computedColumns.value.forEach((x) => {
    x.complex && (x.complex.default = remainedColumns.includes(x))
  })
  modelVisible.value = false
}

const handleOperatorChange = (value, node) => {
  if (!value || !node) return
  const { dataIndex } = node
  operatorMap[dataIndex] = value
}

const handleDefaultColumnsChange = (checkedValues) => {
  remainedColumns = checkedValues
}

const toggle = () => {
  expand.value = !expand.value
  expandFieldBlocks(expand.value)
  //todo this.$parent.$forceUpdate()
  emit('toggle', expand.value)
}

const expandFieldBlocks = (isExpand) => {
  if (1 > fieldBlocks.length) return
  computedColumns.value
    .filter((x, i) => i + 1 + 1 > maxColumn)
    .forEach((x) => {
      x._form_invisible = !isExpand
    })
}

const convertExpressionValues = (data) => {
  return Object.keys(data)
    .map(
      (x) =>
        (data[x] === 0 || data[x]) && {
          expression: {
            name: x,
            operator: operatorMap[x] || defaultOperatorValue,
            values: [trim(data[x])],
            alias: ''
          },
          operator: 'and'
        }
    )
    .filter((x) => x)
}
onMounted(() => {
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
  name: 'CComplexForm'
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
  .c-field-block {
    min-width: 300px;
  }
  .ant-form-item {
    display: flex;
    margin-bottom: 2px;

    .ant-form-item-label {
      height: 45px;
    }

    .ant-form-item-control {
      height: 45px;
    }
  }
}
.c-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

:deep(.c-value-field) {
  :first-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
.ant-input-number,
.ant-calendar-picker {
  width: 100%;
}

.ant-modal-body > .ant-checkbox-group {
  width: 100%;
}

.ant-modal-body > .ant-checkbox-group > .ant-row > .ant-col {
  margin-bottom: 10px;
}

.c-button-group {
  max-width: 250px;
  white-space: nowrap;
  display: flex;
  margin-left: auto;
}

.c-button-group > div {
  flex: 1;
  text-align: right;
  display: table-cell;
  vertical-align: middle;
  line-height: 30px;
}

.c-button {
  margin-left: 5px;
}

.select-operate {
  width: 80px;
  :deep(.ant-select-selection-item) {
    font-size: 12px;
  }
}
</style>
