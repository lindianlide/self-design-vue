```vue demo
<template>
  <c-search-panel :columns="tableState.columns" @search="onSearch"> </c-search-panel>
  <c-table
    :columns="tableState.columns"
    :toolbar="tableState.toolbar"
    :proxy-config="tableState.proxyConfig"
    @toolbar-button-click="onToolbarClick"
    :pagination="tableState.pagination"
    ref="tableRef"
  >
  </c-table>
  <section class="common-tablelr">
    <c-table
      class="common-tablel"
      :columns="cloneDeep(tableState.columns)"
      :toolbar="tableState.toolbar"
      :proxy-config="tableState.proxyConfig"
      @toolbar-button-click="onToolbarClick"
      :pagination="tableState.pagination"
      ref="tablelRef"
    >
    </c-table>

    <a-tabs v-model:activeKey="tabKey" class="common-tabler">
      <a-tab-pane key="2" tab="表格一">
        <c-table
          :key="tabKey"
          :columns="cloneDeep(tableState.columns)"
          :toolbar="tableState.toolbar"
          :proxy-config="tableState.proxyConfig"
          @toolbar-button-click="onToolbarClick"
          :pagination="tableState.pagination"
          ref="tablerRef"
        >
        </c-table
      ></a-tab-pane>
      <a-tab-pane key="1" tab="表格二">
        <c-table
          :key="tabKey"
          :columns="cloneDeep(tableState.columns)"
          :toolbar="tableState.toolbar"
          :proxy-config="tableState.proxyConfig"
          @toolbar-button-click="onToolbarClick"
          :pagination="tableState.pagination"
          ref="tablerRef"
        >
        </c-table
      ></a-tab-pane>
    </a-tabs>
  </section>

  <c-form-modal :columns="tableState.columns" @save="submitModal" ref="formModal"> </c-form-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { cloneDeep } from 'lodash-es'
import { getTableBasicList } from '@/api/index'
const tabKey = ref('1')
const tableState = reactive({
  toolbar: {
    buttons: [
      { code: 'insertInline', name: '行内新增' },
      { code: 'insertModal', name: '弹框新增' },
      { code: 'saveTable', name: '保存' },
      { code: 'testMethod', name: 'test method' },
      { code: 'strong', name: '强调', status: 'danger' },
      { code: 'warn', name: '警示', status: 'primary' }
    ],
    custom: false
  },
  pagination: { pageSize: 5 },
  proxyConfig: {
    autoLoad: true,
    ajax: {
      query: (pagination) => getTableBasicList({ ...pagination })
    }
  },
  columns: [
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
  ]
})
const tableRef = ref(null)
const ctable = computed(() => tableRef.value?.getTable())

const formModal = ref()

const onSearch = (values) => {
  console.log(values)
}

//表头按钮操作
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
