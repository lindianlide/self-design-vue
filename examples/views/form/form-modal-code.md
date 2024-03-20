```vue demo
<template>
  <a-button type="link" @click="showHorizontalModal"> 查看弹框(单列左右) </a-button>
  <a-button type="link" @click="showVerticalModal"> 查看弹框(单列上下) </a-button>
  <a-button type="link" @click="showMutiModal"> 查看弹框(多列) </a-button>

  <c-form-modal
    :columns="columns"
    layout="horizontal"
    @save="submitModal"
    ref="formHorizontalModal"
  >
  </c-form-modal>
  <c-form-modal :columns="columns" layout="vertical" @save="submitModal" ref="formVerticalModal">
  </c-form-modal>
  <c-form-modal :columns="columns" @save="submitModal" ref="formMutiModal"> </c-form-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const formHorizontalModal = ref()
const formVerticalModal = ref()
const formMutiModal = ref()

const columns = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    invisible: false,
    decorator: { rules: [{ required: true, message: '必填项！' }] }
  },
  {
    dataIndex: 'createDate',
    title: 'Date',
    type: 'date'
  },
  {
    dataIndex: 'createDate',
    title: 'Date',
    type: 'date'
  },
  {
    dataIndex: 'createDate',
    title: 'Date',
    type: 'date'
  },
  {
    dataIndex: 'type',
    title: 'type',
    type: 'select',
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

const showVerticalModal = () => {
  formVerticalModal.value.show()
}
const showHorizontalModal = () => {
  formHorizontalModal.value.show()
}
const showMutiModal = () => {
  formMutiModal.value.show()
}

const submitModal = (record) => {
  console.log('record', record)
}
</script>
```
