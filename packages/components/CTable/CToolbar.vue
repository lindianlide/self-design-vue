<template>
  <div class="c-toolbar">
    <a-space class="toolbar-left">
      <div></div>
      <template v-for="(item, index) in toolbar.buttons?.slice(0, limit)" :key="item.code || index">
        <a-button
          v-if="item.visible !== false"
          :disabled="item.disabled"
          :danger="item.status == 'danger'"
          :type="item.status == 'primary' ? 'primary' : 'default'"
          @click="onToolbarClick(item)"
        >
          {{ item.name }}
          <template #icon v-if="item.type === 'upload'">
            <UploadOutlined />
          </template>
          <template #icon v-else-if="item.icon">
            <a-icon :icon="item.icon" />
          </template>
        </a-button>
      </template>

      <a-dropdown
        v-if="toolbar.buttons?.slice(limit, -1).length > 0"
        placement="bottomRight"
        :trigger="['click']"
      >
        <a-button>
          <EllipsisOutlined />
        </a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item
              v-for="(itemDrop, index) in toolbar.buttons.slice(limit, -1)"
              :key="itemDrop.code || index"
            >
              <a href="javascript:;" @click="onToolbarClick(itemDrop)">
                {{ itemDrop.name }}
              </a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-space>
    <a-space class="toolbar-right">
      <template v-if="zoom">
        <c-zoom :dom="proxy.$parent.$el" :style="{ color: 'rgba(0,0,0,0.8)' }" />
      </template>
      <template v-if="columns.length > 0 && custom">
        <c-column-select />
      </template>
    </a-space>
  </div>
</template>
<script lang="ts" setup>
import { inject, getCurrentInstance } from 'vue'
import { EllipsisOutlined } from '@ant-design/icons-vue'
import CColumnSelect from './CColumnSelect.vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import type { Crud } from './crud'
const emit = defineEmits(['toolbar-button-click'])

const { proxy } = getCurrentInstance()

const props = defineProps({
  toolbar: {
    type: [Object, Boolean],
    default: () => ({})
  }
})

const columns: Crud.CustomTableColumnProps[] = inject('__crud_columns') || []
const {
  limit = 8,
  //showFilter = true,
  //预留
  // refresh = false,
  zoom = true,
  custom = true
} = props.toolbar || {}

const onToolbarClick = (value) => {
  emit('toolbar-button-click', value)
}
</script>

<style scoped lang="less">
.c-toolbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  min-height: 10px;

  .toolbar-left {
    margin: 8px 0;
  }
  .toolbar-right {
    margin: 8px 0;
    height: 28px;
  }
  :deep(.ant-space-item) {
    .ant-btn {
      padding: 3px 8px;
    }
    .ant-btn-primary {
      border-color: #1677ff;
      color: #1677ff;
      background: #ffffff;
    }
  }
}
</style>
