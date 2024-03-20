<template>
  <div class="sidebar">
    <div class="logo">selfDesignVue Docs</div>
    <ul>
      <template v-for="item in groupList" :key="item.group">
        <h3 @click="item.isExpand = !item.isExpand">
          <span>{{ item.title }}</span>
        </h3>
        <div v-show="item.isExpand">
          <li v-for="child in item.children" :key="child.name">
            <router-link :to="child.path">
              {{ getName(child.name) }}<span>{{ child.meta?.title }}</span>
            </router-link>
          </li>
        </div>
      </template>
    </ul>
  </div>
  <div class="main-">
    <a-config-provider
      componentSize="middle"
      :theme="{
        token: {
          fontSize: 12,
          controlHeight: 28
        }
      }"
    >
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </a-config-provider>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import { routes } from './router'

const getName = (name: string) => {
  return name.substring(0, 1).toUpperCase() + name.substring(1)
}
const routesListFilter = routes.filter((item: any) => !['README', 'test'].includes(item.name))

const groupList = ref([
  {
    group: 'mode',
    title: '模式',
    isExpand: true,
    children: []
  },
  {
    group: 'component',
    title: '组件',
    isExpand: true,
    children: []
  },
  {
    group: 'lowCode',
    title: '生成代码',
    isExpand: true,
    children: []
  },
  {
    group: 'rule',
    title: '规范',
    isExpand: true,
    children: []
  }
])
groupList.value.forEach((item) => {
  item.children = routesListFilter.filter((fi: any) => fi.meta?.group === item.group)
})

/*

  const sortBy = (sortValue: string) => {
    // 添加排序
    return function (a: any, b: any) {
      let val1 = a.meta[sortValue]
      let val2 = b.meta[sortValue]
      if (val1 < val2) {
        return -1 // 顺序，倒序1
      } else if (val1 > val2) {
        return 1
      }
    }
  }

  routesListFilter.sort(sortBy('group'))*/
</script>
