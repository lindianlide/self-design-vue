vue 项目规范以 Vue 官方规范 https://v2.cn.vuejs.org/v2/style-guide 中的 A 规范为基础，在其上面进行项目开发，故所有代码均遵守该规范。

## 一、编码规范

### 1、组件规范

##### 1) 组件名为多个单词。

组件名应该始终是多个单词组成（大于等于 2），且命名规范为 KebabCase 格式。这样做可以避免跟现有的以及未来的 HTML 元素相冲突，因为所有的 HTML 元素名称都是单个单词的。

```javascript
export default {
  name: 'TodoItem'
  // ...
}
```

##### 2) 组件文件名为 PascalCase (驼峰式命名) 格式

```javascript
components/
|- MyComponent.vue
```

##### 3) 和父组件紧密耦合的子组件应该以父组件名作为前缀命名

```javascript
components/
|- TodoList.vue
```

##### 4) 在 Template 模版中使用组件，应使用 kebab-case 模式，并且使用自闭合组件。

```javascript
<my-component />
```

##### 5) 组件的 data 必须是一个函数

当在组件中使用 data 属性的时候 (除了 new Vue 外的任何地方)，它的值必须是返回一个对象的函数。因为如果直接是一个对象的话，子组件之间的属性值会互相影响。

```javascript
export default {
  data() {
    return {
      name: 'jack'
    }
  }
}
```

##### 6) Prop 定义应该尽量详细

必须使用 camelCase 驼峰命名
必须指定类型
必须加上注释，表明其含义
必须加上 required 或者 default，两者二选其一
如果有业务需要，必须加上 validator 验证

```javascript
props: {
  // 组件状态，用于控制组件的颜色
   status: {
	 type: String,
	 required: true,
	 validator: function (value) {
	   return [
		 'succ',
		 'info',
	   ].indexOf(value) !== -1
	 }
   }
}

```

##### 7) 为组件样式设置作用域

使用局部样式，使用 less，禁止通篇使用全局样式。

```javascript
<!-- 使用 `scoped` 特性 -->
<style scoped lang=“scss”>
  .btn-close {
	background-color: red;
  }
</style>

```

### 2. 模板中使用简单的表达式

组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。

### 3 指令都使用缩写形式

指令推荐都使用缩写形式，(用 : 表示 v-bind: 、用 @ 表示 v-on: 和用 # 表示 v-slot:)

```javascript
<input
@input="onInput"
@focus="onFocus"
>

```

### 4. 标签顺序保持一致

单文件组件应该总是让标签顺序保持为

```javascript
<template>...</template>

<script>...</script>
<style>...</style>
```

### 5. 必须为 v-for 设置键值 key

### 6. v-show 与 v-if 选择

如果运行时，需要非常频繁地切换，使用 v-show ；如果在运行时，条件很少改变，使用 v-if。

### 7. script 标签内部结构顺序

components > props > data > computed > watch > filter > 钩子函数（钩子函数按其执行顺序） > methods
元素 attribute 的顺序推荐
is>v-for>v-if>v-once>id>ref>key>v-model>其它 attribute >v-on>v-html

### 8. 页面跳转数据传递使用路由参数

页面跳转，例如 A 页面跳转到 B 页面，需要将 A 页面的数据传递到 B 页面，推荐使用 路由参数进行传参，而不是将需要传递的数据保存 vuex，然后在 B 页面取出 vuex 的数据，因为如果在 B 页面刷新会导致 vuex 数据丢失，导致 B 页面无法正常显示数据。

### 9. 没有在 v-if/v-else-if/v-else 中使用 key 谨慎使用

如果一组 v-if、 v-else 的元素类型相同，最好使用 key (比如两个 div 元素)。

```javascript

<div v-if="error" key="search-status">
{{ error }}
</div>
<div v-else  key="search-results">
{{ results }}
</div>
```

### 10. 隐性的父子组件通信谨慎使用

应该优先通过 prop 和事件进行父子组件之间的通信，而不是 this.$parent 或变更 prop。

### 11. 样式规范

1）避免书写全局样式
2）避免在模板里使用 style 写样式，推荐增加 class
3）推荐样式增加一定的父子嵌套关系
4）推荐使用预处理器 less、scss

## 二、 Vue 项目目录规范

### 1.目录说明

目录名,其中 components 组件用 PascalCase 帕斯卡命名法，其余除 components 组件目录外的所有目录均使用 camelCase 命名。
src 源码目录

```javascript
|-- api 所有 api 接口
|-- assets 静态资源，images, icons, styles 等
|-- components 公用组件
|-- config 配置信息
|-- constants 常量信息，项目所有 Enum, 全局常量等
|-- directives 自定义指令
|-- filters 过滤器，全局工具
|-- hooks 自定义 hooks
|-- lib 外部引用的插件存放及修改文件
|-- mock 模拟接口，临时存放
|-- plugins 插件，全局使用
|-- router 路由，统一管理
|-- store vuex, 统一管理
|-- themes 自定义样式主题
|-- pages 视图目录
| |-- role role 模块名
| |-- |-- roleList.vue role 列表页面
| |-- |-- roleAdd.vue role 新建页面
| |-- |-- roleUpdate.vue role 更新页面
| |-- |-- index.less role 模块样式
| |-- |-- components role 模块通用组件文件夹
| |-- employee employee 模块
```

#### 1) api 目录

若项目较大时，可以按照业务划分子目录。
api 中的方法名字要与后端 api url 尽量保持语义高度一致性。
对于 api 中的每个方法要添加注释。

```javascript
// 添加员工
addEmployee: (data) => {
return postAxios('/employee/add', data)
},
// 更新员工信息
updateEmployee: (data) => {
return postAxios('/employee/update', data)
},
// 删除员工
deleteEmployee: (employeeId) => {
return postAxios('/employee/delete/' + employeeId)
},
```

#### 2) assets 目录

assets 为静态资源，里面存放 images, styles, icons 等静态资源，静态资源命名格式为 kebab-case

```javascript
|assets
|-- icons
|-- images
| |-- background-color.png
| |-- upload-header.png
|-- styles
```

#### 3) components 目录

此目录应按照组件进行目录划分，目录命名为 PascalCase，组件命名规则也为 PascalCase

#### 4) constants 目录

此目录存放项目所有常量，目录结构：

```javascript
|constants
|-- index.js
|-- employee.js
例子： employee.js
export const EMPLOYEE_STATUS = {
NORMAL: {
value: 1,
desc: '正常'
},
DISABLED: {
value: 1,
desc: '禁用'
}
};
export default {
EMPLOYEE_STATUS,
};
```

#### 5) router 与 store 目录

这两个目录根据项目实际情况，要按业务进行拆分，不能放到一个 js 文件里。
router 尽量按照 views 中的结构保持一致
store 按照业务进行拆分不同的 js 文件

#### 6) pages 目录

```javascript
|-- pages 视图目录
| |-- role role 模块名
| | |-- roleList.vue role 列表页面
| | |-- roleAdd.vue role 新建页面
| | |-- roleUpdate.vue role 更新页面
| | |-- index.less role 模块样式
| | |-- components role 模块通用组件文件夹
| | | |-- RoleHeader.vue role 头部组件
| | | |-- RoleModal.vue role 弹出框组件
| |-- employee employee 模块
```

## 三、布局规范

```javascript
1、表格表头操作按钮超过 8 个，需放入下拉菜单中。
2、页面开发需保证浏览器缩放 20%，正常展示，保证笔记本分辨率正常展示（1280\*610）。
3、保存、取消按钮，统一放在表单下部。
4、按钮色彩使用规范，以蓝、白、红为主基调，禁止使用五颜六色的按钮配色。请参照https://ant.design/docs/spec/buttons-cn。
5、移动端请预留安全距离。
6、表格列宽，根据实际情况配置 minWidth,保证表头能够展示安全。
```

## 四、其他

```javascript
1、对于代码格式、lint 规范，项目中引入 ESLint、Prettier、pre-commit，不符合规范禁止提交。
vscode 安装 Prettier - Code formatter 插件，并设置为默认格式化工具。
2、色彩、设计规范可参照https://ant.design/docs/spec/icon-cn
3、常用名字推荐：
  1）布尔值命名：使用 is 或 has 作为前缀。isShow、hasOwner
  2）常量命名：全大写，若包含多个单词以下划线连接
  3）方法命名：以动词作为前缀，推荐 get、set、reset、fetch、remove、delete、compose、handle 等
  4）事件响应命名：以 on 或者 handle 作为前缀
  5）接口命名：get**List（不分页查询），get**Paged(分页查询), get**Info， get**Detail，update**，create**，delete**，export**
4、页面排序注意添加排序参数 this.$vtable.pagination(page, sort)
```
