```vue demo
<template>
  <a-radio-group v-model:value="lrMode" :style="{ marginBottom: '8px' }">
    <a-radio-button value="l-4">左4右6</a-radio-button>
    <a-radio-button value="">左5右5</a-radio-button>
    <a-radio-button value="l-6">左6右4</a-radio-button>
  </a-radio-group>

  <c-search-panel :columns="columns" @search="onSearch"></c-search-panel>
  <section class="common-tablelr" :class="lrMode">
    <c-table
      class="common-tablel"
      :columns="columns"
      :toolbar="toolbar"
      :proxy-config="proxyConfig"
      @toolbar-button-click="onToolbarClick"
      :pagination="pagination"
      ref="tablelRef"
    >
    </c-table>
    <c-table
      class="common-tabler"
      :columns="cloneDeep(columns)"
      :toolbar="toolbar"
      :proxy-config="proxyConfig"
      @toolbar-button-click="onToolbarClick"
      :pagination="pagination"
      ref="tablerRef"
    >
    </c-table>
  </section>

  <c-form-modal :columns="columns" @save="submitModal" ref="formModal"> </c-form-modal>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { cloneDeep } from 'lodash-es'
import { getTableBasicList } from '@/api/index'
const formModal = ref()
const tablelRef = ref(null)
const tablerRef = ref(null)
const lrMode = ref('')

const pagination = ref({ pageSize: 5 })
const proxyConfig = ref({
  autoLoad: true,
  ajax: {
    query: (pagination) => getTableBasicList({ ...pagination })
  }
})
const toolbar = ref({
  buttons: [
    { code: 'insertInline', name: '行内新增' },
    { code: 'insertModal', name: '弹框新增' },
    { code: 'saveTable', name: '保存' },
    { code: 'testMethod', name: 'test method' }
  ]
})
const columns = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    //超长显示省略号
    ellipsis: true,
    width: 300,
    //最大可拖动到的宽度
    maxWidth: 400,
    condition: true,
    editable: true,
    invisible: false,
    decorator: { rules: [{ required: true, message: '必填项！' }] }
  },
  {
    dataIndex: 'createDate',
    condition: true,
    width: 120,
    editable: true,
    title: 'Date',
    type: 'date'
  },
  {
    dataIndex: 'createDate',
    condition: true,
    width: 120,
    editable: true,
    title: 'Date',
    type: 'date'
  },
  {
    dataIndex: 'type',
    title: 'type',
    type: 'select',
    width: 150,
    condition: true,
    options: {
      options: [
        { value: 1, label: '区域' },
        { value: 2, label: '系统' },
        { value: 3, label: '分段' }
      ]
    },
    editable: true
  },
  {
    dataIndex: 'project',
    title: 'project',
    type: 'project',
    width: 150,
    condition: true,
    customStyle: { width: '120px' },
    editable: true,
    formatter: ({ row }) => row.projectName || row.project,
    //行内编辑时更改formatter展示的值
    options: {
      onChange: (project, row) => {
        //行内编辑有row，需配置projectName，弹框编辑无需
        row && (row.projectName = project?.projId)
      },
      parameter: { isLimitByUser: 1 },
      fieldNames: { value: 'projNo', optionLabelProp: 'projId' }
    }
  }
])

const ctable = computed(() => tablelRef.value?.getTable())

const onToolbarClick = (target) => {
  switch (target.code) {
    case 'insertInline':
      insertInline()
      break
    case 'insertModal':
      insertModal()
      break
    case 'saveTable':
      saveTable()
      break
    case 'testMethod':
      testMethod()
      break
    default:
      break
  }
}
const onSearch = (values) => {
  console.log(values)
}

//表头按钮操作
const insertInline = () => {
  ctable.value.insert({})
}
const insertModal = () => {
  formModal.value.show()
}
const saveTable = () => {
  console.log('getUpdateRecords', ctable.value.getUpdateRecords())
}
const testMethod = () => {
  console.log(ctable)
  console.log('getCheckboxRecords', ctable.value.getCheckboxRecords())
  console.log('getRowById', ctable.value.getRowById(11))
  console.log('getData', ctable.value.getData())
  console.log('getUpdateRecords', ctable.value.getUpdateRecords())
  console.log('getInsertRecords', ctable.value.getInsertRecords())
  ctable.value.commitProxy()
}

//表格操作
const editRow = (column, record) => {
  console.log('record', record)
  formModal.value.show(record)
}
const deleteRow = (slope) => {
  console.log('record', slope)
  ctable.value.deleteRow(slope.index)
}

const submitModal = (record) => {
  console.log('record', record)
}
</script>
```
