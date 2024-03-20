import { getCompanys } from '@packages/api'

// 存储公司下拉数据
/**
 * @description: 封装公用 函数
 * @param {boolean} queryParams 接口查询参数
 * @param {boolean} isRefresh 是否再次请求用户下拉接口
 */
export function useCompanyDropList(isRefresh = false) {
  let companyList
  const getCompanyList = async (queryParams) => {
    if (companyList && !isRefresh && !queryParams) {
      return companyList
    } else {
      try {
        const res = await getCompanys(queryParams)
        if (res.status == 200 && res.data) {
          companyList = res.data
          return companyList
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
  return {
    getCompanyList
  }
}
