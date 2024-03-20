import { Switch, CheckedType, EditType } from '../../utils/const'

export function dialogWrapper(str) {
  return `<el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" title="Dialog Titile">
    ${str}
    <div slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handelConfirm">确定</el-button>
    </div>
  </el-dialog>`
}

function buildTemplate(config) {
  const htmlList = []
  const { tableCondition } = config
  //搜索模块
  if (tableCondition === Switch.On) {
    htmlList.push(buildSearchTemplate())
  }
  //表格模块
  htmlList.push(buildTableTemplate(config))

  const htmlStr = htmlList.join('\n')
  return htmlStr
}

function buildSearchTemplate() {
  let str = `<c-search-panel :columns="columns" @search="onSearch"></c-search-panel>`
  return str
}

function buildTableTemplate(config) {
  //todoldl seq page
  const { tableCheckedType, tableButton, tablePage, tableEditType } = config
  //表格table属性
  const tableProps = []
  //是否复选、单选
  if (tableCheckedType === CheckedType.Checkbox) {
    tableProps.push(
      `:rowSelection={ selectedRowKeys: tableState.selectedRowKeys, onChange: onSelectChange }`
    )
  } else if (tableCheckedType === CheckedType.Radio) {
    tableProps.push(
      `:rowSelection={ type:'radio', selectedRowKeys: tableState.selectedRowKeys, onChange: onSelectChange }`
    )
  }
  //是否分页
  if (tablePage === Switch.On) {
    tableProps.push(`:pagination="tableState.pagination"`)
  } else {
    tableProps.push(`:pagination="false"`)
  }

  if (tableButton.length > 0) {
    tableProps.push(`:toolbar="tableState.toolbar"`)
    tableProps.push(`@toolbar-button-click="onToolbarClick"`)
  }
  const propStr = tableProps.join('\n')

  //插槽属性，默认空字符串数组为了首尾换行展示
  const slotProps = ['']
  if (tableEditType === EditType.Modal) {
    slotProps.push(`<template #action="{ key, index, record, column }">
        <a-button type="link" @click="editRow(column, record)"> 编辑 </a-button>
      </template>`)
  }
  slotProps.push('')
  const slotStr = slotProps.join('\n')

  let str = `<c-table
    :columns="tableState.columns"
    ${propStr}
    :proxy-config="tableState.proxyConfig"
    ref="tableRef"
  >${slotStr}</c-table>`

  return str
}

/**
 * 组装html代码。【入口函数】
 */
export function makeUpTemplate(config) {
  const vueTemplateStr = buildTemplate(config)
  return `<template>
    <div>
      ${vueTemplateStr}
    </div>
  </template>`
}
