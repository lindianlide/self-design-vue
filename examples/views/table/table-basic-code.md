```vue demo
<template>
  <c-search-panel :columns="tableState.columns" @search="onSearch">
    <template #no="{ slotScope }">
      <a-input-number :min="1" :max="10" v-model:value="slotScope['no']"></a-input-number>
    </template>
  </c-search-panel>
  <c-table
    :columns="tableState.columns"
    :toolbar="tableState.toolbar"
    :rowSelection="{ selectedRowKeys: tableState.selectedRowKeys, onChange: onSelectChange }"
    :proxy-config="tableState.proxyConfig"
    @toolbar-button-click="onToolbarClick"
    :pagination="tableState.pagination"
    :customRow="customRow"
    ref="tableRef"
  >
    <template #action="{ key, index, record, column }">
      <a-button type="link" @click="editRow(column, record)"> 编辑 </a-button>
      <a-button type="link" @click="deleteRow({ key, index, record, column })"> 删除 </a-button>
    </template>
    <template #checkbox="{ key, index, record, column }">
      <a-checkbox v-model:checked="record.checkbox"></a-checkbox>
    </template>
  </c-table>

  <c-form-modal :columns="tableState.columns" @save="submitModal" ref="formModal"> </c-form-modal>
</template>

<script lang="ts" setup>
import { ref, unref, reactive, computed } from 'vue'
import { getTableBasicList } from '@/api/index'
import { Table } from 'ant-design-vue'

const tableState = reactive({
  toolbar: {
    buttons: [
      { code: 'insertInline', name: '行内新增' },
      { code: 'insertModal', name: '弹框新增' },
      { code: 'saveTable', name: '保存' },
      { code: 'testMethod', name: 'test method' },
      { code: 'strong', name: '强调', status: 'danger' },
      { code: 'warn', name: '警示', status: 'primary' }
    ]
  },
  selectedRowKeys: [],
  pagination: { pageSize: 5 },
  proxyConfig: {
    autoLoad: true,
    ajax: {
      query: (pagination) => {
        console.log('pagination=', pagination)
        return getTableBasicList({ ...pagination })
      }
    }
  },
  columns: [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: false,
      //超长显示省略号
      ellipsis: true,
      width: 300,
      //最大可拖动到的宽度
      maxWidth: 400,
      condition: true,
      editable: true,
      invisible: false,
      //配置编辑状态的控件宽度
      customStyle: { width: '200px' },
      decorator: { rules: [{ required: true, message: '必填项！' }] },
      rules: [{ required: true, message: '必填项！' }]
    },
    {
      dataIndex: 'no',
      condition: true,
      width: 120,
      editable: true,
      title: 'no',
      scopedSlots: { customSearchRender: 'no' }
    },
    {
      dataIndex: 'organization',
      condition: true,
      type: 'organization',
      width: 120,
      title: 'organization',
      options: {
        onSelect: (organization, row) => {
          console.log('organization, row', organization, row)
          //行内编辑有row，需配置projectName，弹框编辑无需
          row && (row.orgCode = organization?.number)
        },
        fieldNames: { label: 'name', value: 'number', children: 'children' }
      }
    },
    {
      dataIndex: 'checkbox',
      width: 120,
      editable: true,
      title: 'checkbox',
      formInvisible: true,
      scopedSlots: { customRender: 'checkbox' }
    },
    {
      dataIndex: 'createDate',
      condition: true,
      width: 120,
      title: 'Date',
      editable: true,
      formatter: ({ row }) => {
        return row.cellValue
      },
      rules: [{ required: true, message: '必填项2！' }]
    },
    {
      dataIndex: 'createDate',
      condition: true,
      width: 120,
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
    },
    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      width: 140,
      fixed: 'right',
      formInvisible: true
    }
  ]
})
const tableRef = ref(null)
const ctable = computed(() => tableRef.value?.getTable())

const formModal = ref()

//搜索
const onSearch = (values) => {
  console.log(values)
  ctable.value.commitProxy()
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
  //输入校验
  ctable.value.validateEditFields().then((values) => {
    console.log('getUpdateRecords', ctable.value.getUpdateRecords())
    ctable.value.commitProxy()
  })
}
const testMethod = () => {
  //ctable.value.toggleCheckboxRow(ctable.value.getRowById(11))
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

//添加行事件
const customRow = (record, index) => {
  return {
    onClick: (event) => {
      //console.log(record, index, event, 'customRow')
    }
  }
}

const onSelectChange = (selectedRowKeys) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys)
  tableState.selectedRowKeys = selectedRowKeys
}
</script>
```
