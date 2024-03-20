// @ts-ignore
import type { App, Plugin } from 'vue'

export const withInstall = <T>(comp: T) => {
  const c = comp as any
  c.install = function (app: App) {
    app.component(c.displayName || c.name, comp)
  }

  return comp as T & Plugin
}

export const random = (len = 18) => {
  const arr = [...new Array(62)].map((_, i) =>
    String.fromCharCode(i + (i < 10 ? 0 : i < 36 ? 7 : 13) + 6 * 8)
  )
  return [...new Array(len)].map(() => arr[Math.floor(Math.random() * arr.length)]).join('')
}

export const flatten = (array) =>
  array.reduce((result, item) => result.concat(item).concat(flatten(item.children || [])), [])

export const getParentKeys = (value, data, result = []) => {
  const item = data.find((x) => x.id == value)
  if (!item) return false
  result.unshift(item)
  if (item.parentId) getParentKeys(item.parentId, data, result)
}

export const operatorOptions = [
  { label: '等于', value: 'EQUALS', alias: '=' },
  { label: '小于', value: 'LESS_THAN', alias: '<' },
  { label: '大于', value: 'GREATER_THAN', alias: '>' },

  { label: '不等于', value: 'NOT', alias: 'not' },
  { label: '小于等于', value: 'LESS_THAN_EQUAL', alias: '<=' },
  { label: '大于等于', value: 'GREATER_THAN_EQUAL', alias: '>=' },

  { label: '包含', value: 'LIKE', alias: 'like' },
  { label: '不包含', value: 'NOT_LIKE', alias: 'not like' },

  { label: '属于', value: 'IN', alias: 'in' },
  { label: '不属于', value: 'NOT_IN', alias: 'not in' },

  { label: '区间', value: 'BETWEEN', alias: 'between' },

  { label: '空值', value: 'IS_NULL', alias: 'is null' },
  { label: '非空值', value: 'IS_NOT_NULL', alias: 'is not null' }
]

const defaultFieldNames = { value: 'value', label: 'label', children: 'children' }

const computedOption = (option, fieldNames) => {
  const {
    value = 'value',
    label = 'label',
    children = 'children'
  } = {
    ...defaultFieldNames,
    ...(typeof fieldNames === 'string' ? JSON.parse(fieldNames) : fieldNames)
  }
  return {
    ...option,
    value: option[value],
    label: option[label],
    children: option[children]
  }
}

export const getAsyncOptions = async ({ options, fieldNames, ajax, parameter = {} }) => {
  if (options && options.length) {
    return options
  }
  if (ajax) {
    const response = await (ajax instanceof Promise ? ajax : ajax(parameter)).then()
    const newOptions =
      response && response.data ? response.data.content || response.data : response || []
    return newOptions.map((option) => computedOption(option, fieldNames))
  }
  return []
}

//是否包含px单位
export const isPx = (val) => {
  return val && /^\d+(px)$/.test(val)
}

export const isScale = (val) => {
  return val && /^\d+%$/.test(val)
}
