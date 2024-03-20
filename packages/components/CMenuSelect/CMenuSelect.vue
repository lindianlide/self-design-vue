<template>
  <section>
    <a-cascader
      v-bind="selectOptions"
      :value="selectedValues"
      expandTrigger="hover"
      @change="onChange"
      changeOnSelect
    >
    </a-cascader>
  </section>
</template>

<script>
import { flatten, getParentKeys } from '@packages/utils/util'

export default {
  props: {
    value: {
      type: String
    },
    selectOptions: {
      type: Object,
      default: () => ({
        options: []
      })
    }
  },
  data() {
    return {
      selectedValues: []
    }
  },
  watch: {
    value: {
      handler(val = '') {
        const parentKeys = []
        getParentKeys(val, this.flattenOptions, parentKeys)
        this.selectedValues = val ? parentKeys.map((x) => x.id) : []
      },
      immediate: true
    }
  },
  computed: {
    options() {
      return this.selectOptions.options
    },
    flattenOptions() {
      return flatten(this.options)
    }
  },
  methods: {
    triggerChange(changedValue) {
      // Should provide an event to pass value to Form.
      // this.$emit('change', Object.assign({}, this.$data, changedValue));
      this.$emit('change', changedValue)
    },

    onChange(value) {
      this.selectedValues = value
      this.triggerChange(value[value.length - 1])
    }
  },
  mounted() {}
}
</script>

<style scoped></style>
