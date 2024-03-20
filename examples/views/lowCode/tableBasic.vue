<template>
  <div class="table-basic-container common-detail">
    <section class="detail-header">
      <span class="header-title">基本表格</span>
      <div class="header-operate">
        <a-button type="primary" @click="chooseOrigin"> 导入表 </a-button>
        <a-button type="primary" @click="generateCode"> 生成前端代码 </a-button>
      </div>
    </section>
    <br />

    <section class="detail-content">
      <a-descriptions title="按钮信息">
        <template #extra>
          <a-button type="primary" size="small" @click="openButtonModal">自定义按钮</a-button>
        </template>
        <a-descriptions-item>
          <a-checkbox-group
            v-model:value="templateState.tableButton"
            :options="tableButtonOptions"
          />
        </a-descriptions-item>
      </a-descriptions>

      <a-divider />

      <a-descriptions title="表格信息">
        <a-descriptions-item label="顶部查询条件">
          <a-radio-group
            v-model:value="templateState.tableCondition"
            :options="tableConditionOptions"
          />
        </a-descriptions-item>

        <a-descriptions-item label="勾选类型">
          <a-radio-group
            v-model:value="templateState.tableCheckedType"
            :options="tableCheckboxOptions"
          />
        </a-descriptions-item>
        <a-descriptions-item label="编辑类型">
          <a-radio-group v-model:value="templateState.tableEditType" :options="tableEditOptions" />
        </a-descriptions-item>
        <a-descriptions-item label="显示行序号">
          <a-radio-group v-model:value="templateState.tableSeq" :options="tableSeqOptions" />
        </a-descriptions-item>
        <a-descriptions-item label="是否分页">
          <a-radio-group v-model:value="templateState.tablePage" :options="tablePageOptions" />
        </a-descriptions-item>
        <!-- <a-descriptions-item label="表格布局">
          <a-radio-group v-model:value="templateState.tableLayout" :options="tableLayoutOptions" />
        </a-descriptions-item> -->
      </a-descriptions>

      <a-divider />

      <a-descriptions title="字段信息">
        <a-descriptions-item>
          <c-table
            class="table-scroll"
            :columns="tableColumns"
            :dataSource="templateState.tableColumns"
            :pagination="pagination"
            ref="tableRef"
          >
            <template #action="{}">
              <a-button type="link"> 操作 </a-button>
            </template>
            <template #isCondition="{ record }">
              <a-checkbox v-model:checked="record.condition"></a-checkbox>
            </template>
            <template #isSort="{ record }">
              <a-checkbox v-model:checked="record.sorter"></a-checkbox>
            </template>
            <template #editRequired="{ record }">
              <a-checkbox v-model:checked="record.editRequired"></a-checkbox>
            </template>
            <template #searchRequired="{ record }">
              <a-checkbox v-model:checked="record.searchRequired"></a-checkbox>
            </template>
            <template #isAdd="{ record }">
              <a-checkbox v-model:checked="record.isAdd"></a-checkbox>
            </template>
            <template #isEdit="{ record }">
              <a-checkbox v-model:checked="record.isEdit"></a-checkbox>
            </template>
            <template #isImport="{ record }">
              <a-checkbox v-model:checked="record.isImport"></a-checkbox>
            </template>
            <template #isExport="{ record }">
              <a-checkbox v-model:checked="record.isExport"></a-checkbox>
            </template>
          </c-table>
        </a-descriptions-item>
      </a-descriptions>
    </section>

    <c-modal v-model:open="pageState.buttonModal" title="新增自定义按钮" @ok="addButton">
      <a-form
        :model="pageState.buttonForm"
        name="buttonForm"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 10 }"
        ref="formButton"
      >
        <a-form-item
          label="按钮名称"
          name="name"
          :rules="[{ required: true, message: 'Please input your button name!' }]"
        >
          <a-input v-model:value="pageState.buttonForm.name" />
        </a-form-item>

        <a-form-item
          label="按钮code"
          name="code"
          :rules="[{ required: true, message: 'Please input your button code!' }]"
        >
          <a-input v-model:value="pageState.buttonForm.code" />
        </a-form-item>
      </a-form>
    </c-modal>
    <CopyFrontModal ref="copyFrontRef" :copyFrontState="copyFrontState" />
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { makeUpScript } from './components/generator/script'
import { makeUpVue } from './components/generator/tableBasic'

import { useTableConfig } from './hooks/useTableConfig'
import CopyFrontModal from './components/CopyFrontModal.vue'
import { Switch, CheckedType, EditType, FixType } from './utils/const'

const {
  tableButtonOptions,
  tableCheckboxOptions,
  tableEditOptions,
  tableSeqOptions,
  tablePageOptions,
  tableConditionOptions,
  tableColumns
} = useTableConfig()

const formButton = ref()

const templateState = reactive({
  //表格勾选的按钮
  tableButton: [],
  //表格按钮集合
  tableButtonOptions: tableButtonOptions,
  tableCheckedType: CheckedType.No,
  tableEditType: EditType.No,
  //表格序号
  tableSeq: Switch.Off,
  tableLayout: 'single',
  //表格是否分页
  tablePage: Switch.On,
  //表格顶部查询条件
  tableCondition: Switch.On,
  tableColumns: []
})

const pageState = reactive({
  buttonModal: false,
  buttonForm: {
    name: '',
    code: ''
  }
})
const pagination = ref({ pageSize: 20 })
const copyFrontRef = ref()
const copyFrontState = reactive({
  vueCode: '',
  jsCode: ''
})

const chooseOrigin = () => {
  const originList = [
    {
      dataIndex: 'name',
      title: '用户姓名'
    },
    {
      dataIndex: 'age',
      title: '年龄'
    },
    {
      dataIndex: 'sex',
      title: '性别'
    }
  ]
  const dataList = originList.map((item) => {
    return {
      ...item,
      width: item.title.length * 30,
      condition: false,
      sorter: true,
      fixed: FixType.No,
      required: false,
      searchRequired: false,
      type: '',
      isAdd: false,
      editable: false,
      tableLayout: 'single'
    }
  })
  templateState.tableColumns = dataList
}

const openButtonModal = () => {
  pageState.buttonModal = true
}

const addButton = () => {
  formButton.value.validateFields().then((values) => {
    tableButtonOptions.value.push({ label: values.name, value: values.code })
    templateState.tableButton.push(values.code)
    pageState.buttonModal = false
  })
}

const generateCode = () => {
  copyFrontState.vueCode = makeUpVue(templateState)
  copyFrontState.jsCode = makeUpScript(templateState)
  copyFrontRef.value.modalVisible = true
}
</script>
<style scoped lang="less">
.table-scroll {
  width: 100%;
}
</style>
