import axios from 'axios'
import ky from 'ky'

// process.env.NODE_ENV = 'production'
console.log('in axios config')
console.log('url', import.meta.env.VITE_API_URL)

const Service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})
const KyService = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

Service.interceptors.request.use((request) => {
  console.log('request url', request.url)
  console.log('request baseURL', request.baseURL)

  return request
})

Service.interceptors.response.use((response) => {
  return response.data
})

export default Service
export { KyService }
