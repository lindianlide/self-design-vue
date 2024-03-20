<template>
  <a-select
    :mode="mode"
    allowClear
    :style="customStyle"
    show-search
    v-model:value="currentValue"
    placeholder="select user"
    label-in-value
    option-label-prop="label"
    :filter-option="false"
    :not-found-content="loading ? undefined : null"
    :dropdownMatchSelectWidth="false"
    @search="getUserList"
    @change="handleChange"
  >
    <template v-if="loading" #notFoundContent>
      <a-spin size="small" />
    </template>

    <a-select-option v-for="option in options" :key="option.value" :label="option.label">
      {{ option.content }}
    </a-select-option>
  </a-select>
</template>

<script>
import { ref, defineComponent, watch } from 'vue'
import { getUser } from '@packages/api'
import { debounce } from 'lodash-es'
//option-label-prop="children",select展示填充下拉的内容
export default defineComponent({
  name: 'CUserInput',
  props: {
    customStyle: {
      type: Object,
      default: () => ({ width: '150px' })
    },
    mode: {
      type: String,
      default: ''
    },
    value: {
      type: [Object, Array, String, Number]
    },
    //todo屏蔽fieldNames，防止冲突，与EmployeeCellRender.displayRender冲突,目前写死code
    fieldNames: {
      type: Object,
      default: () => ({
        value: 'code'
      })
    }
  },
  emits: ['update:value', 'change', 'select'],
  setup(props, { emit }) {
    const options = ref([])
    const currentValue = ref(props.value)
    const loading = ref(false)
    let originData = []
    //todo屏蔽fieldNames，防止冲突，目前写死code
    const fieldNames = {
      value: 'code'
    }

    watch(
      () => props.value,
      (newValue) => {
        currentValue.value = newValue
      },
      {
        immediate: true,
        deep: true
      }
    )

    const getUserList = debounce((value) => {
      options.value = []
      if (!value) return
      const param = {
        page: 0,
        size: 50,
        keyword: value
      }
      loading.value = true

      getUser(param)
        .then(({ data }) => {
          const { content } = data
          if (content.length) {
            options.value = convertOptions(content)

            const dataMap = content.map((x) => {
              const result = {
                id: x.id,
                deptName: x.deptName,
                deptCode: x.deptCode,
                employeeStatus: x.employeeStatus,
                gender: x.gender,
                servedBaseCode: x.servedBaseCode,
                servedBaseName: x.servedBaseName,
                nameCustom: `${x.name}(${x.code})`,
                name: x.name,
                code: x.code,
                activeStatus: x.activeStatus,
                laborType: x.laborType,
                posName: x.posName,
                mobileTel: x.mobileTel
              }
              return result
            })
            originData = Object.freeze(dataMap)
          }
          loading.value = false
        })
        .catch((error) => {
          console.error(error)
          loading.value = false
        })
    }, 300)

    const handleChange = (data) => {
      //options.value = []
      if (props.mode === 'multiple' || props.mode === 'tags') {
        //传入的初始值无法获取user其他属性
        // const originList = originData.concat(selectedOptions)
        // const selectedItems = []
        // data.forEach((select) => {
        //   const originItem = originList.find((origin) => origin[props.fieldNames.value] === select.value)
        //   originItem && selectedItems.push(originItem)
        // })
        // selectedOptions = selectedItems

        const res = data.map((item) => ({
          label: item.label,
          value: item.value
        }))

        const originItem = originData.filter((origin) => {
          return res.find((item) => item.value === origin[fieldNames.value])
        })
        emit('change', res)
        emit('select', originItem)
        emit('update:value', res)
      } else {
        const { value = '', label = '' } = data || {}
        const originItem = originData.find((origin) => origin[fieldNames.value] === value)
        emit('change', { label, value })
        emit('select', originItem)
        emit('update:value', { label, value })
      }
    }

    const convertOptions = (data) => {
      return data.map((item) => {
        const { code, name, laborType, companyName, deptName, servedBaseName, servedDeptName } =
          item
        let content = ''
        if (item.laborType === '本工') {
          content = `${name}(${code})-${laborType}-${companyName}-${deptName}`
        } else {
          content = `${name}(${code})-${laborType}-${servedBaseName}-${servedDeptName}`
        }
        return {
          value: item[fieldNames.value],
          label: name,
          content: content
        }
      })
    }
    return { getUserList, handleChange, currentValue, options, loading }
  }
})
</script>
<style scoped>
.ant-select {
  width: 100%;
}
</style>
