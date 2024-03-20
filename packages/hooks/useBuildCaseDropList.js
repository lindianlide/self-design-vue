import { getBuildCases } from '@packages/api'

// 存储公司下拉数据
/**
 * @description: 封装公用 函数
 * @param {boolean} queryParams 接口查询参数
 * @param {boolean} isRefresh 是否再次请求用户下拉接口
 */
export function useBuildCaseDropList(isRefresh = false) {
  let buildCaseList
  const getBuildCaseList = async (queryParams) => {
    if (buildCaseList && !isRefresh && !queryParams) {
      return buildCaseList
    } else {
      try {
        const res = await getBuildCases(queryParams)
        if (res.status == 200 && res.data) {
          buildCaseList = res.data
          return buildCaseList
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
  return {
    getBuildCaseList
  }
}
