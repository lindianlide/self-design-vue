import { axios, projectCommon, accountBase, projectBase } from '@packages/api/http.js'

export const getProjects = (params) => axios.get(`${projectCommon}/projects/dropList`, { params })

export const getAccounts = (params) => axios.get(`${accountBase}/accounts`, { params })

export const getOrganizations = (params) => axios.get(`${accountBase}/organizations`, { params })

export const getUser = (params) => axios.get(`${projectBase}/t/user/search`, { params })

export const getCompanys = (params) => axios.get(`${projectCommon}/t/company/dropList`, { params })

export const getBuildCases = (params) =>
  axios.get(`${projectCommon}/project/buildbase/dropList`, { params })
