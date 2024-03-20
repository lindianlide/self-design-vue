```vue demo
<template>
  <a-button type="link" @click="layout = 'horizontal'"> 单列左右表单 </a-button>
  <a-button type="link" @click="layout = 'vertical'"> 单列上下表单 </a-button>
  <c-form
    :columns="columns"
    :layout="layout"
    @submit="submitModal"
    :saveButton="true"
    ref="formHorizontal"
  >
  </c-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const formHorizontal = ref()
const layout = ref('horizontal')

const columns = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    invisible: false,
    decorator: { rules: [{ required: true, message: '必填项！' }] }
  },
  {
    dataIndex: 'createDate',
    width: 120,
    title: 'Date',
    type: 'date'
  },
  {
    dataIndex: 'createDate',
    width: 120,
    title: 'Date',
    type: 'date'
  },
  {
    dataIndex: 'createDate',
    width: 120,
    title: 'Date',
    type: 'date'
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
    },
    editable: true
  },
  {
    dataIndex: 'project',
    title: 'project',
    type: 'project',
    customStyle: { width: '120px' },
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

const submitModal = (record) => {
  console.log('record', record)
}
</script>
```
