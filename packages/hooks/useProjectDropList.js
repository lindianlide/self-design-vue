import { getProjects } from '@packages/api'

// 存储用户下拉数据
/**
 * @description: 封装公用 函数
 * @param {boolean} queryParams 接口查询参数
 * @param {boolean} isRefresh 是否再次用户下拉接口
 */
export function useProjectDropList(isRefresh = false) {
  //const loading = ref(true)
  let projectList
  const getProjectList = async (queryParams) => {
    if (projectList && !isRefresh && !queryParams) {
      return projectList
    } else {
      try {
        const res = await getProjects(queryParams)
        if (res.status == 200 && res.data) {
          projectList = res.data
          return projectList
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
  // await useRequest(getProjectList, {
  //   cacheKey: `_cache_key_project_${MD5(JSON.stringify(queryParams)).toString()}`
  // })
  // loading.value = false

  return {
    getProjectList
  }
}
