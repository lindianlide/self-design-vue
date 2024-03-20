<template>
  <div class="c-table-wrap">
    <c-toolbar v-if="toolbar" :toolbar="toolbar" @toolbar-button-click="onToolbarClick"></c-toolbar>
    <c-table-main v-bind="$attrs" :customType="customType" ref="tableRef">
      <!-- 通过便利实现插槽透传 -->
      <template
        v-for="(item, key, slotIndex) in $slots"
        :key="slotIndex"
        v-slot:[key]="{ record, index, column }"
      >
        <slot
          :name="key"
          v-bind="{ key: key, index: index, record: record, column: column }"
        ></slot>
      </template>
    </c-table-main>
  </div>
</template>
<script>
import { defineComponent, provide, ref, h } from 'vue'
import CTableMain from './CTableMain.vue'
import CToolbar from './CToolbar.vue'

import { useProjectDropList } from '@packages/hooks/useProjectDropList'
import { useCompanyDropList } from '@packages/hooks/useCompanyDropList'
import { useBuildCaseDropList } from '@packages/hooks/useBuildCaseDropList'

import CEmployeeDescription from '@packages/components/CEmployeeDescription/CEmployeeDescription.vue'
import CUserInput from '@packages/components/CUserInput/CUserInput.vue'
import CProjectSelect from '@packages/components/CProjectSelect/CProjectSelect.vue'
import CCompanySelect from '@packages/components/CCompanySelect/CCompanySelect.vue'
import CBuildCaseSelect from '@packages/components/CBuildCaseSelect/CBuildCaseSelect.vue'

class ProjectCellRender {
  constructor(column) {
    this.column = column
    this.projects = []
  }
  getProjects(column, _this) {
    if (_this.projects.length > 0) {
      return _this.projects
    }
    const props = column.options || {}
    props.parameter = props.parameter || {}
    const { getProjectList } = useProjectDropList()
    return getProjectList(props.parameter).then((response) => {
      _this.projects = response.map((item) =>
        props.fieldNames && props.fieldNames instanceof Function
          ? props.fieldNames(item)
          : {
              label: props?.fieldNames?.label ? item[props.fieldNames.label] : `${item.projId}`,
              value: props?.fieldNames?.value ? item[props.fieldNames.value] : item.projNo
            }
      )
      return _this.projects
    })
  }

  async displayRender(args, column, data, _this) {
    const { text } = args
    if (column.formatter && column.formatter instanceof Function) {
      return column.formatter({ ...args, cellValue: args.text, row: args.record })
    } else {
      const projects = await _this.getProjects(column, _this)
      const item = projects.find((x) => x.value === text)
      return item ? item.label : text
    }
  }
  editorRender({ text, record }, column, data, _this) {
    // eslint-disable-next-line no-unused-vars
    const { fieldNames, ...restOptions } = column.options || {}
    return h(CProjectSelect, {
      value: text,
      size: 'small',
      allowClear: true,
      showSearch: false,
      customStyle: column.customStyle || { width: '100px' },
      filterOption: (input, option) => {
        return (
          option && option.label && option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
        )
      },
      ...restOptions,
      onChange: (project) => {
        restOptions?.onChange?.(project, record)
        record[column.dataIndex] = project.value
        record['isEdit'] = true
        column['isEdit'] = true
        // 配置
        // column.customCell = (recordCell, rowIndex, columnCell) => {
        //   if (recordCell.id === record.id) {
        //     return {
        //       style: {
        //         'background-color': 'rgb(255,150,150)'
        //       }
        //     }
        //   }
        // }
      }
    })
  }
}

class EmployeeCellRender {
  constructor(column) {
    this.column = column
  }
  displayRender({ text, record }, column) {
    const displayProperty = column.options && column.options.fieldNames
    const displayValue = displayProperty && record[displayProperty.value]
    const displayLabel = displayProperty && record[displayProperty.label]
    return h(
      CEmployeeDescription,
      { rowKey: displayValue || text },
      {
        default: () => h('div', displayLabel ? `${displayLabel} (${displayValue})` : text)
      }
    )
  }
  editorRender({ text, record }, column, data, _this) {
    // eslint-disable-next-line no-unused-vars
    const { fieldNames, ...restOptions } = column.options || {}
    const userValue = record[column.dataIndex] || {
      label: record[fieldNames.label],
      value: record[fieldNames.value]
    }
    return h(CUserInput, {
      value: userValue,
      size: 'small',
      customStyle: column.customStyle || { width: '100px' },
      filterOption: (input, option) => {
        return (
          option && option.label && option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
        )
      },
      ...restOptions,
      onChange: (user) => {
        restOptions?.onChange?.(user, record)
        //修改当前行的组装数据及原数据
        record[column.dataIndex] = { label: user.name, value: user.code }
        record[fieldNames.label] = user.name
        record[fieldNames.value] = user.code
        record['isEdit'] = true
        column['isEdit'] = true
      }
    })
  }
}

class UsersCellRender {
  constructor(column) {
    this.column = column
  }
  displayRender(args, column, data, _this) {
    const { text } = args
    if (column.formatter && column.formatter instanceof Function) {
      return column.formatter({ ...args, cellValue: args.text, row: args.record })
    } else {
      return text
    }
  }
  editorRender({ text, record }, column, data, _this) {
    // eslint-disable-next-line no-unused-vars
    const { fieldNames = {}, ...restOptions } = column.options || {}
    //源数据，后端接口返回的多个用户字段
    const { dataIndex, label, value } = fieldNames

    const userValues =
      record[dataIndex]?.map((user) => ({ label: user[label], value: user[value] })) || []

    return h(CUserInput, {
      value: userValues,
      size: 'small',
      mode: 'multiple',
      customStyle: column.customStyle || { width: '100px' },
      filterOption: (input, option) => {
        return (
          option && option.label && option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
        )
      },
      ...restOptions,
      onChange: (users) => {
        restOptions?.onChange?.(users, record)
        //修改当前行的组装数据及原数据
        record[column.dataIndex] = users
        record[dataIndex] = users.map((user) => ({ [label]: user.label, [value]: user.value }))
        record['isEdit'] = true
        column['isEdit'] = true
      }
    })
  }
}

class CompanyCellRender {
  constructor(column) {
    this.column = column
    this.companys = []
  }

  getCompanys(column, _this) {
    if (_this.companys.length > 0) {
      return _this.companys
    }
    const props = column.options || {}
    props.parameter = props.parameter || {}
    const { getCompanyList } = useCompanyDropList()
    return getCompanyList(props.parameter).then((response) => {
      _this.companys = response.map((item) =>
        props.fieldNames && props.fieldNames instanceof Function
          ? props.fieldNames(item)
          : {
              label: props?.fieldNames?.label ? item[props.fieldNames.label] : `${item.name}`,
              value: props?.fieldNames?.value ? item[props.fieldNames.value] : item.code
            }
      )
      return _this.companys
    })
  }

  async displayRender(args, column, data, _this) {
    const { text } = args
    if (column.formatter && column.formatter instanceof Function) {
      return column.formatter({ ...args, cellValue: args.text, row: args.record })
    } else {
      const companys = await _this.getCompanys(column, _this)
      const item = companys.find((x) => x.value === text)
      return item ? item.label : text
    }
  }
  editorRender({ text, record }, column, data, _this) {
    // eslint-disable-next-line no-unused-vars
    const { fieldNames, ...restOptions } = column.options || {}
    return h(CCompanySelect, {
      value: text,
      size: 'small',
      allowClear: true,
      showSearch: false,
      customStyle: column.customStyle || { width: '100px' },
      filterOption: (input, option) => {
        return (
          option && option.label && option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
        )
      },
      ...restOptions,
      onChange: (project) => {
        restOptions?.onChange?.(project, record)
        record[column.dataIndex] = project.value
        record['isEdit'] = true
        column['isEdit'] = true
      }
    })
  }
}

class BuildCaseCellRender {
  constructor(column) {
    this.column = column
    this.buildCases = []
  }

  getBuildCases(column, _this) {
    if (_this.buildCases.length > 0) {
      return _this.buildCases
    }
    const props = column.options || {}
    props.parameter = props.parameter || {}
    const { getBuildCaseList } = useBuildCaseDropList()
    return getBuildCaseList(props.parameter).then((response) => {
      _this.buildCases = response.map((item) =>
        props.fieldNames && props.fieldNames instanceof Function
          ? props.fieldNames(item)
          : {
              label: props?.fieldNames?.label ? item[props.fieldNames.label] : item.name,
              value: props?.fieldNames?.value ? item[props.fieldNames.value] : item.orgNo
            }
      )
      return _this.buildCases
    })
  }

  async displayRender(args, column, data, _this) {
    const { text } = args
    if (column.formatter && column.formatter instanceof Function) {
      return column.formatter({ ...args, cellValue: args.text, row: args.record })
    } else {
      const buildCases = await _this.getBuildCases(column, _this)
      const item = buildCases.find((x) => x.value === text)
      return item ? item.label : text
    }
  }
  editorRender({ text, record }, column, data, _this) {
    // eslint-disable-next-line no-unused-vars
    const { fieldNames, ...restOptions } = column.options || {}
    return h(CBuildCaseSelect, {
      value: text,
      size: 'small',
      allowClear: true,
      showSearch: false,
      customStyle: column.customStyle || { width: '100px' },
      filterOption: (input, option) => {
        return (
          option && option.label && option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
        )
      },
      ...restOptions,
      onChange: (buildCase) => {
        restOptions?.onChange?.(buildCase, record)
        record[column.dataIndex] = buildCase.value
        record['isEdit'] = true
        column['isEdit'] = true
      }
    })
  }
}
export default defineComponent({
  name: 'CTable',
  components: { CTableMain, CToolbar },
  props: {
    toolbar: {
      type: [Object, Boolean],
      default: () => ({})
    }
  },
  emits: ['toolbar-button-click'],

  setup(props, { attrs, emit }) {
    provide('__crud_columns', attrs.columns)
    const tableRef = ref(null)
    const customType = {
      project: ProjectCellRender,
      employeeDescription: EmployeeCellRender,
      user: EmployeeCellRender,
      users: UsersCellRender,
      company: CompanyCellRender,
      buildCase: BuildCaseCellRender
    }

    const onToolbarClick = (value) => {
      emit('toolbar-button-click', value)
    }
    return { tableRef, customType, getTable: () => tableRef.value, onToolbarClick }
  }
})
</script>
