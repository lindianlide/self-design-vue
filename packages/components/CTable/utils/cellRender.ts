import { Ref, unref } from 'vue'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import type { Crud } from '../crud'
import { getAsyncOptions } from '@packages/utils/util'

interface CustomParameter {
  text: string
  index: number
  column: Crud.CustomTableColumnProps
}

//add type  project  employeeDescription company buildCase user users
const useCellDisplayValue = (
  { text, index, column }: CustomParameter,
  dataSource: Record<string, any>[] | Ref<Record<string, any>[]>
) => {
  if (!column.dataIndex) return { defaultValue: text, displayValue: text }
  const defaultValue = unref(dataSource)[index][column.dataIndex as string] || text
  let displayValue = defaultValue
  if (defaultValue) {
    switch (column.type) {
      //根据options渲染表格列，或调用ajax自动查询options
      case 'select':
        if (column?.options?.options?.length > 0) {
          const currentOption = column.options.options.find(
            (option: { value: any }) => option.value === defaultValue
          )
          if (currentOption) displayValue = currentOption['label']
        } else if (column?.options?.ajax && !column.options.ajaxFlag) {
          getAsyncOptions(column.options).then((res) => {
            column.options.options = res
            //防止列配置ajax返回空，导致循环调用
            column.options.ajaxFlag = true
          })
        }
        break
      case 'date':
        displayValue = dayjs(defaultValue).format('YYYY-MM-DD')
        break
      case 'time':
        displayValue = dayjs(defaultValue).format('HH:mm:ss')
        break
      case 'datetime':
        displayValue = dayjs(defaultValue).format('YYYY-MM-DD HH:mm:ss')
        break
      case 'week':
        dayjs.extend(weekOfYear)
        displayValue = `${dayjs(defaultValue).format('YYYY')}-${dayjs(defaultValue).week()}周`
        break
      case 'month':
        displayValue = dayjs(defaultValue).format('YYYY-MM')
        break
      case 'quarter':
        //TODO:
        break
      case 'year':
        displayValue = dayjs(defaultValue).format('YYYY')
        break
      case 'range':
        //TODO:  picker="week","month","year" https://antdv.com/components/date-picker-cn
        displayValue = `${dayjs(defaultValue[0]).format('YYYY-MM-DD')} - ${dayjs(
          defaultValue[1]
        ).format('YYYY-MM-DD')}`
        break
      default:
        break
    }
  }

  return { defaultValue, displayValue }
}

export default useCellDisplayValue
