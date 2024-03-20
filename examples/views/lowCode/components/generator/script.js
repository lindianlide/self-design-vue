import { Switch, CheckedType, EditType, FixType } from '../../utils/const'
//const { tableButtonOptions } = useTableConfig()

function buildScript(config) {
  const scriptList = []
  scriptList.push(buildScriptState(config))
  scriptList.push(buildScriptMethod(config))
  const scriptStr = scriptList.join('\n')
  return scriptStr
}

function buildScriptState(config) {
  const {
    tableCheckedType,
    tableButton,
    tableButtonOptions,
    tablePage,
    tableEditType,
    tableColumns
  } = config
  const stateProps = []

  //处理复选单选信息
  if (tableCheckedType !== CheckedType.No) {
    stateProps.push(`selectedRowKeys: []`)
  }
  //是否分页
  if (tablePage === Switch.On) {
    stateProps.push(`pagination: { pageSize: 20 }`)
  }
  //代理信息todoldl
  stateProps.push(`proxyConfig: {
      autoLoad: false,
      ajax: {
        query: (pagination) => {
          return getTableBasicList(pagination)
        }
      }
    }`)

  //处理按钮信息
  if (tableButton.length > 0) {
    const buttonProps = []
    tableButton.forEach((buttonItem) => {
      const buttonInfo = tableButtonOptions.find((option) => option.value === buttonItem)
      buttonProps.push(`{name: '${buttonInfo.label}', code: '${buttonInfo.value}'}`)
    })
    const buttonStr = buttonProps.join(',\n')
    stateProps.push(`toolbar: {buttons: [${buttonStr}]}`)
  }
  //列信息
  const columnProps = []
  tableColumns.forEach((column) => {
    const {
      title,
      dataIndex,
      condition,
      type,
      editRequired,
      searchRequired,
      sorter,
      width,
      fixed,
      editable
    } = column
    const columnItem = [`title: '${title}', dataIndex: '${dataIndex}',width: ${width}`]
    if (type) {
      columnItem.push(`type: '${type}'`)
    }
    if (condition) {
      columnItem.push(`condition: ${condition}`)
    }
    if (searchRequired) {
      //查询必填
      columnItem.push(`decorator: {rules: [{required: true, message: '必填项！'}]}`)
    } else if (editRequired) {
      columnItem.push(`rules: [{required: true, message: '必填项！'}]`)
    }
    if (!sorter) {
      columnItem.push(`sorter: ${sorter}`)
    }
    if (tableEditType !== EditType.No && editable) {
      columnItem.push(`editable: ${editable}`)
    }
    if (fixed !== FixType.No) {
      columnItem.push(`fixed: '${fixed}'`)
    }

    columnProps.push(`{${columnItem}}`)
  })
  const columnStr = columnProps.join(',\n')
  stateProps.push(`columns: [${columnStr}]`)

  const stateStr = stateProps.join(',\n')
  const str = `const tableState = reactive({${stateStr}})
  const tableRef = ref(null)
  const ctable = computed(() => tableRef.value?.getTable())
`
  return str
}

function buildScriptMethod(config) {
  const methodProps = []
  const {
    tableCheckedType,
    tableButton,
    tableCondition,
    tableButtonOptions,
    tablePage,
    tableEditType,
    tableColumns
  } = config

  if (tableCondition) {
    methodProps.push(`const onSearch = (values) => {ctable.value.commitProxy("query", values)}`)
  }

  if (tableButton.length > 0) {
    const toolbarSwitch = []
    const toolbarTargetMethod = []
    tableButton.forEach((buttonItem) => {
      toolbarSwitch.push(`case ${buttonItem}: 
        ${buttonItem}()
        break`)
      toolbarTargetMethod.push(`const ${buttonItem} = () => {}`)
    })
    toolbarSwitch.push(`default: break`)
    const onToolbarClick = `const onToolbarClick = (target) => {
      switch (target.code) {
        ${toolbarSwitch.join('\n')}
      }
    }`
    methodProps.push(onToolbarClick)
    methodProps.push(toolbarTargetMethod.join('\n'))
  }

  if (tableCheckedType !== CheckedType.No) {
    methodProps.push(`const onSelectChange = (selectedRowKeys) => {
      tableState.selectedRowKeys = selectedRowKeys
    }`)
  }
  return methodProps.join('\n')
}

/**
 * 组装script代码。【入口函数】
 */
export function makeUpScript(config) {
  const vueScriptStr = buildScript(config)
  return `<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue'
      ${vueScriptStr}
  </script>
  <style scoped lang="less">
  </style>
  `
}
