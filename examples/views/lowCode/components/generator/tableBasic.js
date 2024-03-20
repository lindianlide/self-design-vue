import { makeUpTemplate } from './template'
import { makeUpScript } from './script'
/**
 * 组装html代码。【入口函数】
 */
export function makeUpVue(config) {
  return `${makeUpTemplate(config)}
    ${makeUpScript(config)}
  `
}
