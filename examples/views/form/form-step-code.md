```vue demo
<template>
  <a-button type="primary" @click="open = true"> 打开弹框 </a-button>
  <c-modal title="设置" destroyOnClose v-model:open="open">
    <a-steps class="modal-step-box" :current="currentStep" :items="stepItems"> </a-steps>
    <section>
      <c-form
        v-show="currentStep === 0"
        :columns="columnsOne"
        labelWidth="large"
        layout="horizontal"
        ref="stepFormOneRef"
      ></c-form>
      <c-form v-show="currentStep === 1" :columns="columnsTwo" ref="stepFormTwoRef"></c-form>
      <c-form
        v-show="currentStep === 2"
        :columns="columnsThree"
        layout="vertical"
        ref="stepFormThreeRef"
      ></c-form>
    </section>

    <template #footer>
      <a-button @click="open = false">取消</a-button>
      <a-button v-if="currentStep > 0" @click="previous"> 上一步 </a-button>
      <a-button v-if="currentStep < stepItems.length - 1" type="primary" @click="next">
        下一步
      </a-button>
      <a-button v-if="currentStep === stepItems.length - 1" type="primary" @click="confirm"
        >完成</a-button
      >
    </template>
  </c-modal>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)

const currentStep = ref(0)
const stepItems = ref([
  {
    title: '第一步',
    description: '第一步描述'
  },
  {
    title: '第二步',
    subTitle: '副标题',
    description: '第二步描述'
  },
  {
    title: '第三步',
    description: '第三步描述'
  }
])
const stepFormOneRef = ref()
const stepFormTwoRef = ref()
const stepFormThreeRef = ref()

const formData = ref({})

const columnsOne = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    decorator: { rules: [{ required: true, message: '必填项！' }] }
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
    }
  },
  {
    dataIndex: 'project',
    title: 'project',
    type: 'project',
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
const columnsTwo = ref([
  {
    title: 'Name',
    dataIndex: 'name'
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
    }
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
const columnsThree = ref([
  {
    title: 'Name',
    dataIndex: 'name'
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
    }
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

const previous = () => {
  currentStep.value--
}
const next = () => {
  const formRefList = [stepFormOneRef, stepFormTwoRef, stepFormThreeRef]
  formRefList[currentStep.value].value
    .validateFields()
    .then((res) => {
      console.log('form data=', res)
      formData.value = Object.assign(formData.value, res)
      currentStep.value++
    })
    .catch((err) => {
      console.log('err=', err)
    })
}

const confirm = () => {
  console.log(formData.value)
}
</script>

<style scoped lang="less">
.modal-step-box {
  margin-top: 15px;
}
</style>
```
