import { ref } from 'vue'
import { Switch, CheckedType, EditType, FixType } from '../utils/const'

// 存储用户下拉数据
/**
 * @description: 封装公用 函数
 * @param {boolean} queryParams 接口查询参数
 * @param {boolean} isRefresh 是否再次用户下拉接口
 */
export function useTableConfig() {
  const tableButtonOptions = ref([
    { label: '新增', value: 'addRecord' },
    { label: '删除', value: 'deleteRecord' },
    { label: '导入', value: 'importRecord' },
    { label: '导出', value: 'exportRecord' },
    { label: '下载导入模板', value: 'downloadTemplate' }
  ])
  const tableCheckboxOptions = ref([
    { label: '多选', value: CheckedType.Checkbox },
    { label: '单选', value: CheckedType.Radio },
    { label: '无', value: CheckedType.No }
  ])
  const tableEditOptions = ref([
    { label: '弹框编辑', value: EditType.Modal },
    { label: '行内编辑', value: EditType.Inline },
    { label: '无', value: EditType.No }
  ])
  const tableSeqOptions = ref([
    { label: '是', value: Switch.On },
    { label: '否', value: Switch.Off }
  ])
  const tablePageOptions = ref([
    { label: '是', value: Switch.On },
    { label: '否', value: Switch.Off }
  ])
  const tableConditionOptions = ref([
    { label: '是', value: Switch.On },
    { label: '否', value: Switch.Off }
  ])

  const tableLayoutOptions = ref([
    { label: '单表', value: 'single' },
    { label: '左4右6', value: 'l4r6' },
    { label: '左5右5', value: 'l5r5' },
    { label: '左6右4', value: 'l6r4' }
  ])

  const tableColumns = ref([
    {
      title: '列key',
      dataIndex: 'dataIndex'
    },
    {
      title: '列名',
      dataIndex: 'title'
    },
    {
      title: '列宽',
      dataIndex: 'width',
      editable: true,
      //配置编辑状态的控件宽度
      customStyle: { width: '80px' }
    },
    {
      title: '查询条件',
      dataIndex: 'condition',
      editable: true,
      scopedSlots: { customRender: 'isCondition' }
    },
    {
      title: '排序',
      dataIndex: 'sorter',
      editable: true,
      width: 70,
      scopedSlots: { customRender: 'isSort' }
    },
    {
      title: '冻结方式',
      dataIndex: 'fixed',
      editable: true,
      type: 'select',
      options: {
        options: [
          { label: '无', value: FixType.No },
          { label: '左', value: FixType.Left },
          { label: '右', value: FixType.Right }
        ]
      },
      width: 80
    },
    {
      title: '编辑必填字段',
      dataIndex: 'required',
      editable: true,
      width: 105,
      scopedSlots: { customRender: 'editRequired' }
    },
    {
      title: '查询必填字段',
      dataIndex: 'searchRequired',
      editable: true,
      width: 105,
      scopedSlots: { customRender: 'searchRequired' }
    },
    {
      title: '编辑显示类型',
      dataIndex: 'type',
      type: 'select',
      editable: true,
      width: 105,
      options: {
        options: [
          { label: '无', value: '' },
          { label: 'input', value: 'input' },
          { label: 'inputNumber', value: 'inputNumber' },
          { label: 'select', value: 'select' },
          { label: 'textarea', value: 'textarea' },
          { label: 'date', value: 'date' },
          { label: 'time', value: 'time' },
          { label: 'week', value: 'week' },
          { label: 'month', value: 'month' },
          { label: 'quarter', value: 'quarter' },
          { label: 'year', value: 'year' },
          { label: 'range', value: 'range' },
          { label: 'switch', value: 'switch' },
          { label: 'checkBox', value: 'checkBox' },
          { label: 'project', value: 'project' },
          { label: 'employeeDescription', value: 'employeeDescription' },
          { label: 'company', value: 'company' },
          { label: 'buildCase', value: 'buildCase' },
          { label: 'user', value: 'user' },
          { label: 'users', value: 'users' }
        ]
      }
    },
    //todoldl
    // {
    //   title: '新增字段',
    //   dataIndex: 'isAdd',
    //   editable: true,
    //   scopedSlots: { customRender: 'isAdd' }
    // },
    {
      title: '编辑字段',
      dataIndex: 'editable',
      editable: true,
      width: 80,
      scopedSlots: { customRender: 'isEdit' }
    }
    //todoldl
    // {
    //   title: '导入',
    //   dataIndex: 'isImport',
    //   editable: true,
    //   width: 70,
    //   scopedSlots: { customRender: 'isImport' }
    // },
    // {
    //   title: '导出',
    //   dataIndex: 'isExport',
    //   editable: true,
    //   width: 70,
    //   scopedSlots: { customRender: 'isExport' }
    // }
  ])

  return {
    tableButtonOptions,
    tableCheckboxOptions,
    tableEditOptions,
    tableSeqOptions,
    tablePageOptions,
    tableConditionOptions,
    tableLayoutOptions,
    tableColumns
  }
}
