<template>
  <div class="c-table">
    <a-form ref="tableFormRef" :model="computedDataSource">
      <a-table
        ref="aTableRef"
        :row-key="computedRowKey"
        :data-source="computedDataSource"
        :columns="computedColumns"
        :loading="computedLoading || $attrs.loading"
        :pagination="computedPagination"
        :rowSelection="rowSelection"
        :customHeaderRow="customHeaderRow"
        v-bind="computedAttrs"
        :scroll="scrolls"
      >
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

        <template #headerCell="{ column }">
          <span v-if="column.editable">
            <FormOutlined />
            {{ column.title }}
          </span>
        </template>
      </a-table>
    </a-form>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  h,
  ref,
  reactive,
  watch,
  toRaw,
  computed,
  renderSlot,
  nextTick
} from 'vue'
import { FormOutlined } from '@ant-design/icons-vue'

import type { PropType } from 'vue'
import { FormItem } from 'ant-design-vue'
import CField from './CField.vue'

import { cloneDeep } from 'lodash-es'

import { useRequest, usePagination } from './utils/request'

import { getTableScroll } from './utils/index'
import useCellDisplayValue from './utils/cellRender'
//import { pluginKey } from './utils/key'
import { isPx } from '@packages/utils/util'

import { Crud } from './crud'
import type { ColumnType } from 'ant-design-vue/lib/table/interface'

export default defineComponent({
  name: 'CTableMain',
  components: { FormOutlined },
  props: {
    dataSource: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => []
    },
    columns: {
      type: Array as PropType<Crud.CustomTableColumnProps[]>,
      default: () => []
    },
    rowSelection: {
      type: Object as PropType<Crud.RowSelection>
    },
    proxyConfig: {
      type: Object as PropType<Crud.ProxyConfigProps>
    },
    pagination: {
      type: [Boolean, Object],
      default: () => ({ pageSize: 20 })
    },
    customType: {
      type: Object
    },
    scroll: {
      type: Object
    },
    height: {
      type: String
    }
  },
  setup(props, { attrs, slots }) {
    //plugin
    //const pluginProps = inject<Crud.TablePluginProps>(pluginKey)

    const customTypeRenderPlugins: { [key: string]: any } = {}

    const aTableRef = ref(null)
    const tableFormRef = ref()
    const scrolls = ref({ x: '100%' })

    //origin data source
    const originalDataSource = ref<Record<string, any>>()

    //[dataIndex,rowIndex];
    const currentEditableCell = reactive<[string, number] | []>([])
    const computedDataSource = ref<Record<string, any>[]>(props.dataSource)

    const isCurrentCell = (columnDataIndex: string, rowIndex: number) =>
      currentEditableCell.length &&
      currentEditableCell[0] === columnDataIndex &&
      currentEditableCell[1] === rowIndex

    watch(
      () => props.dataSource,
      (value) => {
        computedDataSource.value = value || []
      },
      { deep: true }
    )

    //row key
    const computedRowKey = computed<string | Function>(() => {
      return (
        (attrs['row-key'] as string) ||
        (attrs.rowKey as string) ||
        ((record: { id?: string; key?: string }) => record.id || record.key)
      )
    })

    //proxy result
    const result = reactive<Crud.ProxyResult>({
      query: { dataSource: undefined },
      save: { dataSource: undefined },
      delete: { dataSource: undefined }
    })

    watch(
      () => result.query.dataSource,
      (value) => {
        computedDataSource.value = value
      }
    )
    watch(
      () => result.save.dataSource,
      (value) => {
        computedDataSource.value = value
      }
    )
    watch(
      () => result.delete.dataSource,
      (value) => (computedDataSource.value = value)
    )

    //loading
    const computedLoading = computed(
      () => result.query.loading || result.save.loading || result.delete.loading
    )

    //pagination
    const computedPagination = computed(() => {
      //Object.assign(result.query.pagination, props.pagination)
      if (!props.pagination) {
        return false
      }
      return result.query.pagination
    })
    //on change
    const onChange = (...args) => {
      result.query?.onPaginationChange(...args)
      // @ts-ignore
      attrs?.onChange?.(...args)
    }

    //proxy config
    const commitProxy = (code: string | number = 'query', args: any) => {
      switch (code) {
        case 'save':
          //TODO: arguments
          result?.[code]?.run(computedDataSource.value)
          break
        case 'delete':
          //TODO:
          break
        default:
          //添加默认分页参数
          result?.['query']?.run({
            ...args,
            size: props.pagination?.pageSize
          })
          break
      }
    }

    if (props.proxyConfig?.ajax) {
      const {
        query: queryFunction,
        save: saveFunction,
        delete: deleteFunction
      } = props.proxyConfig.ajax
      //query
      if (queryFunction) {
        result.query = usePagination(queryFunction, {
          manual: !(props.proxyConfig.autoLoad === undefined || props.proxyConfig.autoLoad),
          //params为添加额外参数,每次请求都会覆盖
          //defaultParams为manual为false时胡默认参数
          defaultParams: [{ page: 0, size: props.pagination?.pageSize }],
          onSuccess: () => {
            //保存信息commitProxy后还原column isEdit属性，防止未编辑标红
            resetColumnEditProp()
          }
        })
        //添加默认分页配置
        //Object.assign(result.query.pagination, props.pagination)
        //console.log("proxyConfig", result.query.pagination);
      }

      //save
      if (saveFunction) {
        result.save = useRequest(saveFunction, { manual: true })
      }

      //delete
      if (deleteFunction) {
        result.delete = useRequest(deleteFunction, { manual: true })
      }
    }

    //row selection //todoldl radio
    // const getRowSelection = (type = 'checkbox') => ({
    //   onChange: (selectedKeys: string[]) => {
    //     //console.log("selectedKeys", selectedKeys);
    //     selectedRowKeys.value = selectedKeys
    //   },
    //   selectedRowKeys,
    //   type,
    //   allowCancelRadio: true
    // })

    //default props
    const defaultProps = {
      size: 'small',
      bordered: true,
      //rowSelection: props.rowSelection === true ? getRowSelection() : undefined,
      //scroll: { x: 'max-content' },
      //scroll: { x: '100%' },
      onResizeColumn: (width: any, column: { width: any }) => {
        column.width = width
      }
    }

    const defaultColumnProps = {
      resizable: true,
      drag: true,
      ellipsis: true,
      sorter: true,
      editable: false,
      formatter: false
    }

    const getCellDisplayValue = ({
      text,
      index,
      column
    }: {
      text: string
      index: number
      column: Crud.CustomTableColumnProps
    }) => {
      return useCellDisplayValue({ text, index, column }, computedDataSource)
    }

    //表头渲染必填样式
    const customHeaderRow = (columns) => {
      columns.forEach((column, index) => {
        if (column.editable && column.rules) {
          const isRequired = column.rules.filter((rule) => rule.required)
          isRequired && (columns[index].className = 'is-required')
        }
      })
    }
    const customCell = (
      record: any,
      rowIndex: number | undefined,
      column: ColumnType<any> | undefined
    ) => {
      //console.log('record', record, rowIndex, column)
      return {
        onClick: () => {
          //点击更新currentEditableCell的rowIndex
          if (column?.dataIndex && rowIndex !== undefined)
            currentEditableCell.splice(0, 2, column.dataIndex as string, rowIndex)
        },
        //column.isEdit 定位列  record.isEdit定位行
        style:
          record.isEdit && column.isEdit
            ? {
                background: 'linear-gradient(135deg, red 5px, transparent  0) top left',
                backgroundRepeat: 'no-repeat'
              }
            : {}
      }
    }

    const getCustomRender = (
      column: Crud.CustomTableColumnProps,
      displayRender?: Crud.CustomNodeRender,
      editorRender?: Crud.CustomNodeRender,
      customRenderClass?: Crud.CustomRenderClass
    ) => {
      return (args: Crud.CustomRenderProps) => {
        const { text, record, index } = args
        const { defaultValue, displayValue } = getCellDisplayValue(args)
        //选中单元格状态，渲染编辑态editorRender，
        if (column.editable && isCurrentCell(column.dataIndex as string, index)) {
          if (column.type === 'switch' || column.type === 'checkBox') {
            return [
              editorRender?.(args, column, computedDataSource, customRenderClass) ||
                //@ts-ignore
                h(CField, {
                  type: column.type,
                  checked: record[column.dataIndex],
                  options: {
                    //使用cfiled的project需配置value
                    ['onUpdate:checked']: (value: any) => {
                      if (!originalDataSource.value)
                        originalDataSource.value = cloneDeep(computedDataSource.value)
                      // @ts-ignore
                      record[column.dataIndex] = value
                      record['isEdit'] = true
                      column['isEdit'] = true
                    },
                    size: 'small',
                    ...column.options
                  },
                  customStyle: column.customStyle
                })
            ]
          } else {
            return [
              editorRender?.(args, column, computedDataSource, customRenderClass) ||
                //@ts-ignore
                h(
                  FormItem,
                  {
                    //namePath
                    name: [index, column.dataIndex],
                    rules: column.rules
                  },
                  () =>
                    h(CField, {
                      type: column.type,
                      options: {
                        defaultValue,
                        //使用cfiled的project需配置value
                        value: defaultValue,
                        ['onUpdate:value']: (value: any) => {
                          if (!originalDataSource.value)
                            originalDataSource.value = cloneDeep(computedDataSource.value)
                          // @ts-ignore
                          record[column.dataIndex] = value
                          record['isEdit'] = true
                          column['isEdit'] = true
                          //行内编辑校验
                          validateEditFields()
                        },
                        size: 'small',
                        ...column.options
                      },
                      customStyle: column.customStyle || { width: '100%' }
                    })
                )
            ]
          }
        } else {
          //todo isEdit
          //否则正常渲染displayRender
          if (displayRender) {
            const displayName = ref()
            //project 、buildcase、company需要异步获取数据，二次渲染
            const displayResult = displayRender(args, column, computedDataSource, customRenderClass)
            if (displayResult instanceof Promise) {
              displayResult.then((res) => (displayName.value = res))
            } else {
              displayName.value = displayResult
            }
            //解决项目等异步获取数据，此处监听displayName进行二次渲染
            return [
              //@ts-ignore
              h(CField, {
                type: 'text',
                value: displayName
              })
            ]
          } else {
            return [
              column.formatter?.({
                ...args,
                cellValue: args.text,
                row: args.record
              }) || displayValue
            ]
          }
        }
      }
    }

    const computedColumns = computed(() => {
      const { columns } = props
      //visible
      const visibleColumns = columns.filter((column) => {
        if (column.type && ['radio', 'checkbox'].includes(column.type)) {
          //defaultProps.rowSelection = getRowSelection(column.type)
          return false
        }
        return !column.invisible && column.visible !== false && !column.tableInvisible
      })
      const size = visibleColumns.length
      return visibleColumns.map((column, index) => {
        //index
        if (column.type === 'index') {
          column.customRender = ({ index }) => 1 + index
          column.width = column.width || 50
          column.align = column.align || 'center'
          return column
        }
        //resize
        if (1 + index !== size && column.resizable === undefined)
          column.resizable = defaultColumnProps.resizable
        //todo ldl 自适应宽度 英文模式
        if (column.resizable && !column.width) column.width = (column.title.length + 1) * 30 || 100
        //sort
        if (column.sorter === undefined) column.sorter = defaultColumnProps.sorter
        //ellipsis
        if (column.ellipsis === undefined) column.ellipsis = defaultColumnProps.ellipsis
        //drag
        if (column.drag === undefined) column.drag = defaultColumnProps.drag
        //formatter
        if (column.formatter && !column.customRender) {
          // Function({text, value, record, index, column}) {}
          column.customRender = (args: { text: any; record: unknown }) => {
            return column.formatter!({
              ...args,
              cellValue: args.text,
              row: args.record
            })
          }
        }
        //type
        if (column.type && !column.editable) {
          if (column.formatter) {
            column.customRender = (args: { text: any; record: unknown }) => {
              return column.formatter!({
                ...args,
                cellValue: args.text,
                row: args.record
              })
            }
          } else {
            column.customRender = (args: Crud.CustomRenderProps) =>
              getCellDisplayValue(args).displayValue
          }
        }

        //edit
        if (column.editable && !column.scopedSlots) {
          column.customCell = customCell
          column.customRender = getCustomRender(column)
        }
        //slot
        if (column.scopedSlots?.customRender && !column.scopedSlots?.customEditorRender) {
          column.customRender = (args) => renderSlot(slots, column.scopedSlots!.customRender!, args)
        }
        if (column.scopedSlots?.customEditorRender) {
          column.customCell = customCell
          column.customRender = getCustomRender(
            column,
            column.scopedSlots?.customRender
              ? (args: Crud.CustomRenderProps) =>
                  renderSlot(slots, column.scopedSlots!.customRender!, {
                    ...args
                  })
              : undefined,
            (args: Crud.CustomRenderProps) =>
              renderSlot(slots, column.scopedSlots!.customEditorRender!, {
                ...args
              })
          )
        }

        //plugin
        if (column.type && props?.customType?.[column.type]) {
          const customNodeRender = props.customType?.[column.type]
          if (customNodeRender) {
            column.customCell = customCell

            const customNodeRenderClass =
              customTypeRenderPlugins[column.type] || new customNodeRender(column)

            if (!customTypeRenderPlugins[column.type])
              customTypeRenderPlugins[column.type] = customNodeRenderClass

            column.customRender = getCustomRender(
              column,
              customNodeRenderClass?.displayRender,
              customNodeRenderClass?.editorRender,
              customNodeRenderClass
            )
          }
        }

        //兼容历史minWidth，新版本width已具备自适应性
        if (column.minWidth) {
          column.width = column.minWidth
        }
        return column
      })
    })

    const getCheckboxRecords = () => {
      if (!props.rowSelection?.selectedRowKeys?.length) return []
      const selectedRows = toRaw(computedDataSource.value).filter((record: Record<string, any>) => {
        const key = computedRowKey.value
        const value = key instanceof Function ? key(record) : record[key]
        return props.rowSelection?.selectedRowKeys?.includes(value)
      })
      return selectedRows
    }

    const validateEditFields = () => {
      return tableFormRef.value.validateFields()
    }

    const getUpdateRecords = () => {
      //TODO:
      return toRaw(computedDataSource.value)
        .filter((row) => row.isEdit || row.isInsert)
        .map(({ isEdit, isInsert, ...rest }) => rest)
    }

    const getInsertRecords = () => {
      //TODO:
      return toRaw(computedDataSource.value)
        .filter((row) => row.isInsert)
        .map(({ isInsert, isEdit, ...rest }) => rest)
    }

    //兼容vxe-table切换某一行的选中状态，使用方法ctable.value.toggleCheckboxRow(ctable.value.getRowById(11))
    const toggleCheckboxRow = (record: Record<string, any>) => {
      const key = computedRowKey.value
      const value = key instanceof Function ? key(record) : record[key]
      const index = props.rowSelection?.selectedRowKeys.findIndex((item) => item === value)
      if (index < 0) props.rowSelection?.selectedRowKeys.push(value)
      else props.rowSelection?.selectedRowKeys.splice(index, 1)
    }

    //file chooser
    let fileInput: HTMLInputElement | null = null
    const readFile = ({ multiple, types }: { multiple: boolean; types: string[] }) => {
      if (!fileInput) fileInput = document.createElement('input')
      fileInput.name = 'file'
      fileInput.type = 'file'
      fileInput.value = ''
      return new Promise((resolve, reject) => {
        if (fileInput == null) reject(null)
        else {
          fileInput.multiple = !!multiple
          if (types?.length && !types.includes('*')) fileInput.accept = `.${types.join(', .')}`
          fileInput.onchange = ({ target }) => {
            const { files } = target as HTMLInputElement
            resolve({ files, file: files?.[0], target: { files, file: files?.[0] } })
          }
          fileInput.click()
        }
      })
    }

    const reloadData = (data: Record<string, any>[]) => {
      computedDataSource.value = data
    }

    const reloadColumn = (columns: Crud.CustomTableColumnProps[]) => {
      props.columns.splice(0, props.columns.length, ...columns)
    }

    const resetColumnEditProp = (columns: Crud.CustomTableColumnProps[]) => {
      columns ||
        props.columns.forEach((column) => {
          delete column.isEdit
        })
    }
    const deleteRow = (index: number) => {
      computedDataSource.value.splice(index, 1)
    }

    const insert = (record: Record<string, any>) => {
      record.isInsert = true
      computedDataSource.value.unshift(record)
    }

    const insertAt = (record: Record<string, any>, index: number) => {
      record.isInsert = true
      computedDataSource.value.splice(index, 0, record)
    }

    const getRowById = (id: string) => {
      const key = computedRowKey.value
      return toRaw(computedDataSource.value).find((record: Record<string, any>) => {
        return key instanceof Function ? key(record) === id : record[key] === id
      })
    }

    const getData = (index: number | undefined) => {
      return Number.isInteger(index)
        ? computedDataSource.value[index as number]
        : computedDataSource.value
    }

    const computedAttrs = computed(() => {
      return { ...defaultProps, ...attrs, onChange }
    })

    onMounted(() => {
      if (props.scroll) {
        scrolls.value = props.scroll
      } else if (props.height) {
        scrolls.value = { x: '100%', y: isPx(props.height) ? props.height : props.height + 'px' }
      } else {
        //todo 高度计算
        nextTick(() => {
          const height = getTableScroll(aTableRef.value)
          scrolls.value = { x: '100%', y: height }
        })
      }
    })

    return {
      computedDataSource,
      computedColumns,
      computedLoading,
      computedPagination,
      computedRowKey,
      computedAttrs,
      customHeaderRow,
      commitProxy,
      getRowById,
      getCheckboxRecords,
      getUpdateRecords,
      validateEditFields,
      getInsertRecords,
      toggleCheckboxRow,
      insert,
      deleteRow,
      insertAt,
      readFile,
      reloadData,
      reloadColumn,
      getData,
      aTableRef,
      tableFormRef,
      scrolls
    }
  }
})
</script>

<style scoped lang="less">
.c-table :deep(.ant-select) {
  width: 100%;
}
:deep(.ant-table-wrapper) {
  .ant-table-container .ant-table-header {
    .ant-table-thead {
      tr {
        th.is-required {
          padding: 8px 8px 8px 14px;
          &::before {
            content: '*';
            position: absolute;
            left: 5px;
            color: red;
            font-size: 16px;
            line-height: 30px;
          }
        }
      }
    }
  }

  .ant-table-body {
    height: v-bind('scrolls.y');

    .ant-form-item {
      margin-bottom: 0px;
    }
  }
  .ant-empty {
    height: v-bind('scrolls.y');
    line-height: v-bind('scrolls.y');
    margin: -21px;
  }
  .ant-pagination.ant-pagination-mini .ant-pagination-options {
    min-width: 90px;
  }
}
</style>
