export const getProjects = () => {
  return new Promise((resolve) => {
    return resolve({
      data: [],
      status: 200
    })
  })
}

export const getAccounts = () => {
  return new Promise((resolve) => {
    return resolve({
      data: {
        content: [],
        page: 0,
        size: 10,
        totalPages: 1,
        totalElements: 1,
        first: true,
        last: true
      }
    })
  })
}

export const getOrganizations = () => {
  return new Promise((resolve) => {
    return resolve({
      data: []
    })
  })
}

export const getUser = () => {
  return new Promise((resolve) => {
    return resolve({
      data: {
        content: [],
        page: 0,
        size: 50,
        totalPages: 11,
        totalElements: 517,
        first: true,
        last: false
      }
    })
  })
}

export const getCompanys = () => {
  return new Promise((resolve) => {
    return resolve({
      data: [],
      status: 200
    })
  })
}

export const getBuildCases = () => {
  return new Promise((resolve) => {
    return resolve({
      data: [],
      status: 200
    })
  })
}
