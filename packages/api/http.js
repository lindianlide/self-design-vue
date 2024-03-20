import axios from 'axios'
//request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

//response interceptor
axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    return Promise.reject(error)
  }
)
export { axios }

//request url
const base = import.meta.env.VITE_BASEURL || '/api'
const accountBase = `${base}/account`
const projectCommon = `${base}/common`
const projectBase = `${base}/project`

export { base, accountBase, projectCommon, projectBase }
