import { createRouter, createWebHashHistory } from 'vue-router'
import routesList from 'virtual:generated-pages'
import TableBasic from '@/views/table-basic.md'
import TableBasicTwo from '@/views/table-basic-two.md'
import TableBasicThree from '@/views/table-basic-three.md'
import FormModal from '@/views/form-modal.md'
import FormPage from '@/views/form-page.md'
import FormStep from '@/views/form-step.md'
import DetailPage from '@/views/detail-page.md'
import DetailModal from '@/views/detail-modal.md'
import ResultPage from '@/views/result-page.md'

import RuleComponent from '@/views/rule/rule-component.md'
import RuleVue from '@/views/rule/rule-vue.md'
import RuleJs from '@/views/rule/rule-js.md'
import RuleCss from '@/views/rule/rule-css.md'
import RuleApi from '@/views/rule/rule-api.md'

import CodeTableBasic from '@/views/lowCode/tableBasic.vue'

// console.log(routesList)
const expand: any = {
  mode: {
    title: '',
    group: 'mode'
  },
  component: {
    title: '',
    group: 'component'
  },
  lowcode: {
    title: '',
    group: 'lowCode'
  },
  rule: {
    title: '',
    group: 'rule'
  }
}
export const routes: any = [
  {
    name: '生成基本表格',
    path: '/lowCode/basicTable',
    meta: expand.lowcode,
    component: CodeTableBasic
  },
  {
    name: 'vue3 api',
    path: '/ruleApi',
    component: RuleApi,
    meta: expand.rule
  },
  {
    name: '组件封装规范',
    path: '/ruleComponent',
    component: RuleComponent,
    meta: expand.rule
  },
  {
    name: 'vue编码规范',
    path: '/ruleVue',
    component: RuleVue,
    meta: expand.rule
  },
  {
    name: 'js编码规范',
    path: '/ruleJs',
    component: RuleJs,
    meta: expand.rule
  },
  {
    name: 'css编码规范',
    path: '/ruleCss',
    component: RuleCss,
    meta: expand.rule
  },
  {
    name: '基本表格',
    path: '/tableBasic',
    component: TableBasic,
    meta: expand.mode
  },
  {
    name: '双列表格',
    path: '/tableBasicTwo',
    component: TableBasicTwo,
    meta: expand.mode
  },
  {
    name: '三列表格',
    path: '/tableBasicThree',
    component: TableBasicThree,
    meta: expand.mode
  },
  {
    name: '弹框表单',
    path: '/formModal',
    component: FormModal,
    meta: expand.mode
  },
  {
    name: '页面表单',
    path: '/formPage',
    component: FormPage,
    meta: expand.mode
  },
  {
    name: '分布表单',
    path: '/formStep',
    component: FormStep,
    meta: expand.mode
  },
  {
    name: '页面详情',
    path: '/detailPage',
    component: DetailPage,
    meta: expand.mode
  },
  {
    name: '弹框详情',
    path: '/detailModal',
    component: DetailModal,
    meta: expand.mode
  },
  {
    name: '错误页',
    path: '/resultPage',
    component: ResultPage,
    meta: expand.mode
  }
]
//console.log('routesList', routesList)
routesList.reverse().forEach((item: any) => {
  const name = item.name.replace('-README', '')
  const path = item.path === '/readme' ? '/' : item.path.replace('/readme', '')
  if (name.indexOf('Bak') === -1) {
    routes.push({
      name: name,
      path: path,
      component: item.component,
      meta: expand.component
    })
  }
})

const router = createRouter({
  // 返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
  // @ts-ignore
  scrollBehavior(to: any, from: any, savedPosition: any) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  // history: createWebHistory(), // 路由的history模式
  history: createWebHashHistory(),
  routes
})

export default router
