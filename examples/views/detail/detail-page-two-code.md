```vue demo
<template>
  <div class="common-detail">
    <section class="detail-header">
      <span class="header-title">标题</span>
      <div class="header-operate">
        <a-button type="primary"> 按钮一 </a-button>
        <a-button type="primary"> 按钮二 </a-button>
      </div>

      <a-descriptions>
        <a-descriptions-item label="姓名"> *****</a-descriptions-item>
        <a-descriptions-item label="电话">1810000000</a-descriptions-item>
        <a-descriptions-item label="住址">烟台</a-descriptions-item>
        <a-descriptions-item label="备注">备注信息备注信息</a-descriptions-item>
        <a-descriptions-item label="详细地址"> 山东省烟台市********* </a-descriptions-item>
      </a-descriptions>
    </section>

    <section class="detail-content">
      <a-tabs>
        <a-tab-pane key="1" tab="标签一">
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
        </a-tab-pane>
        <a-tab-pane key="2" tab="标签二">
          <a-collapse v-model:activeKey="activeKey" collapsible="icon">
            <a-collapse-panel key="1" header="分类一" :show-arrow="false">
              <a-descriptions title="信息一">
                <a-descriptions-item label="姓名"> *****</a-descriptions-item>
                <a-descriptions-item label="电话">1810000000</a-descriptions-item>
                <a-descriptions-item label="住址">烟台</a-descriptions-item>
                <a-descriptions-item label="备注">备注信息备注信息</a-descriptions-item>
                <a-descriptions-item label="详细地址"> 山东省烟台市********* </a-descriptions-item>
              </a-descriptions>
            </a-collapse-panel>
            <a-collapse-panel key="1" header="分类二" :show-arrow="false">
              <a-descriptions title="信息二">
                <a-descriptions-item label="姓名"> *****</a-descriptions-item>
                <a-descriptions-item label="电话">1810000000</a-descriptions-item>
                <a-descriptions-item label="住址">烟台</a-descriptions-item>
                <a-descriptions-item label="备注">备注信息备注信息</a-descriptions-item>
                <a-descriptions-item label="详细地址"> 山东省烟台市********* </a-descriptions-item>
              </a-descriptions>
            </a-collapse-panel>
          </a-collapse>

          <a-divider />

          <a-descriptions title="信息三">
            <a-descriptions-item>
              <c-table
                :scroll="{ y: 300 }"
                :columns="columns"
                :proxy-config="proxyConfig"
                :pagination="pagination"
                ref="tableRef"
              >
                <template>
                  <a-button type="link"> 操作 </a-button>
                </template>
              </c-table>
            </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
      </a-tabs>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { getTableBasicList } from '@/api/index'

const activeKey = ref(1)
const tableRef = ref(null)
const pagination = ref({ pageSize: 20 })
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
    width: 200,
    //最大可拖动到的宽度
    maxWidth: 300,
    condition: true,
    decorator: { rules: [{ required: true, message: '必填项！' }] }
  },
  {
    dataIndex: 'createDate',
    condition: true,
    width: 120,
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
    }
  },
  {
    dataIndex: 'project',
    title: 'project',
    type: 'project',
    width: 150,
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
    formInvisible: true
  }
])
</script>
```
