import queryString, { ParsedQuery } from 'query-string'
import axios, { AxiosRequestConfig, AxiosHeaders } from 'axios'
import { getSession } from '@/utils/auth'


const baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`

const privateClient = axios.create({
  baseURL,
  paramsSerializer: (params: ParsedQuery<string>) =>
    queryString.stringify(params)
})

privateClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
  return {
    ...config,
    headers: new AxiosHeaders({
      'Content-Type': 'application/json'
    }),
  }
})

privateClient.interceptors.response.use(
  response => {
    if (response && response?.data) return response?.data
    if (response.status === 401 && response.request) {}
    return response?.data
  },
  err => {
    throw err.response.data
  }
)

export default privateClient
