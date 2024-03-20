## CTable 表格

### 基础用法

表格

```vue demo
<template>
  <c-table
    :columns="tableState.columns"
    :toolbar="tableState.toolbar"
    :customRow="customRow"
    :rowSelection="rowSelection"
    :proxy-config="tableState.proxyConfig"
    @toolbar-button-click="onToolbarClick"
    :pagination="tableState.pagination"
    ref="tableRef"
  >
    <template #action="{ key, index, record, column }">
      <a-button type="link" @click="editRow(column, record)"> 编辑 </a-button>
      <a-button type="link" @click="deleteRow({ key, index, record, column })"> 删除 </a-button>
    </template>
  </c-table>

  <c-table
    :columns="secondColumns"
    :dataSource="secondDataSource"
    :pagination="false"
    :scroll="{ x: '100%', y: '300px' }"
    ref="tableTwoRef"
  >
  </c-table>

  <c-form-modal :columns="tableState.columns" @save="submit" ref="formModal"> </c-form-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { getTableBasicList } from '@/api/index'

const tableState = reactive({
  toolbar: {
    buttons: [
      {
        code: 'insertInline',
        name: '行内新增'
      },
      { code: 'insertModal', name: '弹框新增' },
      { code: 'saveTable', name: '保存' },
      { code: 'importTable', name: '导入', type: 'upload' },
      { code: 'testMethod', name: 'test method' },
      { code: 'icon', name: 'icon', icon: 'DownloadOutlined' },
      { code: 'visible', name: 'invisible', visible: false },
      { code: 'disabled', name: 'disabled', disabled: true }
    ],
    limit: 8
  },
  //默认勾选
  selectedRowKeys: [2],
  pagination: { pageSize: 20 },

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
      //超长显示省略号
      ellipsis: true,
      width: 300,
      //最大可拖动到的宽度
      maxWidth: 400,
      condition: true,
      editable: true,
      invisible: false,
      rules: [{ required: true, message: '必填项！' }]
    },
    {
      dataIndex: 'ajax',
      condition: true,
      width: 120,
      title: 'ajax',
      type: 'select',
      editable: true,
      options: {
        options: [],
        fieldNames: { label: 'name', value: 'id' },
        ajax: getTableBasicList().then((res) => {
          return res
        })
      }
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
      dataIndex: 'userLabel',
      title: 'user',
      type: 'user',
      options: {
        fieldNames: {
          label: 'userName',
          value: 'userCode'
        }
      },
      width: 150,
      editable: true
    },
    {
      dataIndex: 'userListLabel',
      title: 'users',
      type: 'users',
      formatter: ({ row }) => {
        const usersShow = []
        row?.userList?.forEach((user) => {
          usersShow.push(`${user.name}(${user.code})`)
        })
        return usersShow.join(',')
      },
      //用于多用户行内编辑，赋初始值 fieldNames.dataIndex:数据源，fieldNames.label:数据源label，fieldNames.value:value
      options: {
        fieldNames: {
          dataIndex: 'userList',
          label: 'name',
          value: 'code'
        }
      },
      width: 150,
      editable: true
    },
    {
      dataIndex: 'employeeLabel',
      title: '人员',
      type: 'employeeDescription',
      options: {
        fieldNames: {
          label: 'userName',
          value: 'userCode'
        }
      },
      width: 150,
      editable: true
    },
    {
      dataIndex: 'orgCode',
      title: 'company',
      type: 'company',
      width: 150,
      editable: true,
      formatter: ({ row }) => row.orgName
    },
    {
      dataIndex: 'caseCode',
      title: '基地',
      type: 'buildCase',
      width: 150,
      editable: true,
      formatter: ({ row }) => row.caseName
    },
    {
      dataIndex: 'checkBox',
      title: 'checkbox',
      type: 'checkBox',
      width: 150,
      formatter: ({ row }) => (row.checkBox ? '是' : '否'),
      editable: true
    },
    {
      dataIndex: 'switch',
      title: 'switch',
      type: 'switch',
      width: 150,
      editable: true,
      formatter: ({ row }) => (row.switch ? '开' : '关')
    },

    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      width: 140
    }
  ]
})

const formModal = ref()
const tableRef = ref(null)
const ctable = computed(() => tableRef.value?.getTable())

const secondDataSource = ref([
  {
    id: 2,
    name: 11,
    createDate: '2010-02-02',
    checkbox: false,
    no: 2,
    type: '分段',
    project: 1362,
    projectName: 'H517'
  }
])
const secondColumns = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    width: 300
  },
  {
    title: 'createDate',
    dataIndex: 'createDate',
    width: 300
  },
  {
    dataIndex: 'type',
    title: 'type',
    type: 'select',
    width: 150,
    options: {
      options: [
        { value: 1, label: '区域' },
        { value: 2, label: '系统' },
        { value: 3, label: '分段' }
      ]
    }
  }
])

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
    case 'importTable':
      importTable()
      break
    default:
      break
  }
}

const insertInline = () => {
  ctable.value.insert({})
}
const saveTable = () => {
  //输入校验
  ctable.value.validateEditFields().then((values) => {
    console.log('getUpdateRecords', ctable.value.getUpdateRecords())
  })
}

const submit = (record) => {
  console.log('record', record)
}
const importTable = () => {
  ctable.value.readFile({ types: ['xlsx', 'xls'] }).then((response) => {
    console.log('response.', response)
    const { file, files } = response
  })
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

const editRow = (column, record) => {
  console.log('record', record)
  record.userLabel = { label: record.userName, value: record.userCode }
  record.employeeLabel = { label: record.userName, value: record.userCode }
  record.userListLabel =
    record?.userList?.map((user) => ({ label: user.name, value: user.code })) || []
  formModal.value.show(record)
}
const insertModal = () => {
  formModal.value.show()
}

const deleteRow = (slope) => {
  console.log('record', slope)
  ctable.value.deleteRow(slope.index)
}
//添加行事件
const customRow = (record, index) => {
  return {
    onClick: (event) => {
      //console.log(record, index, event, 'customRow')
    }
  }
}

const getHandleUsers = (record) => {
  const usersShow = []
  record?.userList.forEach((user) => {
    usersShow.push(`${user.name}(${user.code})`)
  })
  return usersShow.join(',')
}

//行勾选属性
const rowSelection = computed(() => {
  return {
    //type: 'radio', // 是否为单选
    selectedRowKeys: tableState.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows, event) => {
      //selectedRowKeys 为你点击选框时这一页选中的所有key
      //selectedRows 为你点击选框时这一页选中的所有数据
      tableState.selectedRowKeys = selectedRowKeys
      console.log('onChange', selectedRowKeys, selectedRows, event)
    },
    onSelect: (record, selected, selectedRows, nativeEvent) => {
      //record 点击某一条的所有数据
      //selected 点击的一条是否被选中
      console.log('onSelect', record, selected, selectedRows, nativeEvent)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      //selected 点击全选是否选中
      //selectedRows 点击全选判断所有的选中数据
      //changeRows 所有改变选中状态的数据
      console.log('onSelectAll', selected, selectedRows, changeRows)
    },
    getCheckboxProps: (record) => ({
      // 某几项默认禁止选中(R: 当id等于1时)
      disabled: record.id == 1
    })
  }
})
</script>
```

### API

| 参数         | 类型   | 默认值             | 说明                                                                                                                                                                                                                                                                                           |
| ------------ | ------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dataSource   | Array  | ''                 | 表格数据源                                                                                                                                                                                                                                                                                     |
| columns      | Array  | { width: '200px' } | 表格列选项,customStyle 自定义渲染的元素宽度（如：project，默认 100px），options:{options:[],onChange: (row, project)=>{}, fieldNames: { value: '',optionLabelProp:'', label:''}, parameter: { isLimitByUser: 1 }}                                                                              |
| rowSelection | Object | {}                 | 首列是否支持复勾选                                                                                                                                                                                                                                                                             |
| proxyConfig  | Object |                    | 同 vxe-table                                                                                                                                                                                                                                                                                   |
| pagination   | Object | { pageSize: 10 }   | 分页参数                                                                                                                                                                                                                                                                                       |
| toolbar      | Object |                    | { buttons: [ { code: 'save', name: 'test', status:'primary', icon:'DownloadOutlined', visible: true, disabled: false } ], limit: 8, custom: true, zoom:true} limit 超出放入下拉框中;showFilter 是否展示右侧列过滤按钮；type:primary \| danger \| default; icon:自定义图标(ant-design-vue 内的) |
| scroll       | Object |                    | 表格是否可滚动，可以指定滚动区域的宽、高， { x: 100%, y: '500px' } ,设 y 则表格渲染高度则为 500                                                                                                                                                                                                |

### 事件

| 参数 | 说明 |
| ---- | ---- |
|      |      |

### 方法

| 名称               | 类型     | 描述                     |
| ------------------ | -------- | ------------------------ |
| getCheckboxRecords | Array    | 获取勾选的行数据         |
| getRowById         | Object   | 选中的行数据             |
| commitProxy        | Function |                          |
| reloadData         | Function |                          |
| reloadColumn       | Function |                          |
| getData            | Array    | 所有的表格数据           |
| getUpdateRecords   | Array    | 行内编辑，获取修改的数据 |
| getInsertRecords   | Array    | 行内编辑，获取新增的数据 |
| insert             |          | 行首插入数据             |
| deleteRow          |          | 删除行 index，前端删除   |

### column

| 参数        | 类型    | 默认值 | 说明                                                                                                                                                                                                 |
| ----------- | ------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options     | Object  |        | options:{options:[],onChange: (row, project)=>{}, fieldNames: { value: '',optionLabelProp:'', label:''}, parameter: { isLimitByUser: 1 }}                                                            |
| formatter   | Object  |        | Function({cellValue, text, row, record, index, column }) {}                                                                                                                                          |
| type        | String  |        | 列类型,'index','input','textarea','select','date','time','datetime','week','month','quarter','year','range','project','employeeDescription','company','buildCase','user','users','switch','checkBox' |
| editable    | Boolean | false  | 是否编辑                                                                                                                                                                                             |
| dataIndex   | String  |        | 列 key                                                                                                                                                                                               |
| title       | String  |        | 列名                                                                                                                                                                                                 |
| width       | Number  |        | 列宽                                                                                                                                                                                                 |
| customStyle | Object  |        | 自定义样式                                                                                                                                                                                           |
| scopedSlots | Object  |        | customRender：表格列自定义渲染插槽 customFormRender：弹框新增、编辑表单类自定义插槽 customEditorRender：表格列编辑状态自定义渲染插槽                                                                 |

## FAQ

列 slot template 里可以获取四个属性：key, index, record, column；key 是 slot name、index 为行 index、record 为当前行内容、column 为列配置信息
其他属性参考 ant-design-vue
column.type 属性：为区分老版本原生属性 checkbox，修改为 checkBox；checkBox 和 switch 暂不支持行内编辑渲染，支持弹框编辑渲染
表格默认高度是充满屏幕，可通过配置 scroll: { x: 100%, y: '500px' },来设定高度，也兼容老 api height:"500px"
