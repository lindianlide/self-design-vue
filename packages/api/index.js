import {
  getProjects as getProjectsCore,
  getAccounts as getAccountsCore,
  getOrganizations as getOrganizationsCore,
  getUser as getUserCore,
  getCompanys as getCompanysCore,
  getBuildCases as getBuildCasesCore
} from '@packages/api/core/index'

import {
  getProjects as getProjectsMock,
  getAccounts as getAccountsMock,
  getOrganizations as getOrganizationsMock,
  getUser as getUserMock,
  getCompanys as getCompanysMock,
  getBuildCases as getBuildCasesMock
} from '@packages/api/mock/index'

//production线上演示环境，用mock演示
const mode = import.meta.env.MODE

export const getProjects = (params) => {
  if (mode === 'production') {
    return getProjectsMock(params)
  } else {
    return getProjectsCore(params)
  }
}

export const getAccounts = (params) => {
  if (mode === 'production') {
    return getAccountsMock(params)
  } else {
    return getAccountsCore(params)
  }
}
export const getOrganizations = (params) => {
  if (mode === 'production') {
    return getOrganizationsMock(params)
  } else {
    return getOrganizationsCore(params)
  }
}

export const getUser = (params) => {
  if (mode === 'production') {
    return getUserMock(params)
  } else {
    return getUserCore(params)
  }
}

export const getCompanys = (params) => {
  if (mode === 'production') {
    return getCompanysMock(params)
  } else {
    return getCompanysCore(params)
  }
}

export const getBuildCases = (params) => {
  if (mode === 'production') {
    return getBuildCasesMock(params)
  } else {
    return getBuildCasesCore(params)
  }
}
