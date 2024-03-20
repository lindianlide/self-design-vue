```vue demo
<template>
  <a-button type="primary" @click="open = true"> 打开弹框 </a-button>

  <c-modal title="设置" destroyOnClose v-model:open="open" okText="确认" cancelText="取消">
    <a-descriptions title="用户信息">
      <template #extra>
        <a-button type="primary" size="small">按钮</a-button>
      </template>
      <a-descriptions-item label="姓名"> *****</a-descriptions-item>
      <a-descriptions-item label="电话">1810000000</a-descriptions-item>
      <a-descriptions-item label="住址">烟台</a-descriptions-item>
      <a-descriptions-item label="备注">备注信息备注信息</a-descriptions-item>
      <a-descriptions-item label="详细地址"> 山东省烟台市********* </a-descriptions-item>
    </a-descriptions>

    <a-divider />

    <a-descriptions title="信息二">
      <template #extra>
        <a-button type="primary" size="small">按钮</a-button>
      </template>
      <a-descriptions-item label="姓名"> *****</a-descriptions-item>
      <a-descriptions-item label="电话">1810000000</a-descriptions-item>
      <a-descriptions-item label="住址">烟台</a-descriptions-item>
      <a-descriptions-item label="备注">备注信息备注信息</a-descriptions-item>
      <a-descriptions-item label="详细地址"> 山东省烟台市********* </a-descriptions-item>
    </a-descriptions>

    <a-divider />

    <a-descriptions title="信息三">
      <a-descriptions-item class="a-descriptions-table">
        <c-table
          :columns="columns"
          :proxy-config="proxyConfig"
          :pagination="pagination"
          :height="200"
          ref="tableRef"
        >
          <template #action="{ key, index, record, column }">
            <a-button type="link"> 操作 </a-button>
          </template>
        </c-table>
      </a-descriptions-item>
    </a-descriptions>
  </c-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getTableBasicList } from '@/api/index'

const open = ref(false)

const tableRef = ref(null)
const pagination = ref({ pageSize: 10 })
const proxyConfig = ref({
  autoLoad: true,
  ajax: {
    query: (pagination) => getTableBasicList({ ...pagination })
  }
})

const columns = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    //超长显示省略号
    ellipsis: true,
    condition: true,
    width: 200,
    //最大可拖动到的宽度
    maxWidth: 300,
    decorator: { rules: [{ required: true, message: '必填项！' }] }
  },
  {
    dataIndex: 'createDate',
    condition: true,
    width: 200,
    title: 'Date',
    type: 'date'
  },
  {
    dataIndex: 'createDate',
    condition: true,
    width: 200,
    title: 'Date',
    type: 'date'
  },
  {
    dataIndex: 'createDate',
    condition: true,
    width: 200,
    title: 'Date',
    type: 'date'
  },
  {
    dataIndex: 'createDate',
    condition: true,
    width: 200,
    title: 'Date',
    type: 'date'
  },
  {
    dataIndex: 'createDate',
    condition: true,
    title: 'Date',
    type: 'date'
  },
  {
    dataIndex: 'createDate',
    condition: true,
    title: 'Date',
    type: 'date'
  },
  {
    dataIndex: 'type',
    title: 'type',
    type: 'select',
    condition: true,
    options: {
      options: [
        { value: 1, label: '区域' },
        { value: 2, label: '系统' },
        { value: 3, label: '分段' }
      ]
    }
  },
  {
    dataIndex: 'project',
    title: 'project',
    type: 'project',
    customStyle: { width: '120px' },
    formatter: ({ row }) => row.projectName || row.project,
    options: {
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
])
</script>
<style scoped lang="less"></style>
```
