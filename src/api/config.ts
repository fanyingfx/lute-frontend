import axios from 'axios'
import ky from 'ky'

// process.env.NODE_ENV = 'production'
console.log('in axios config')
console.log('url', import.meta.env.VITE_API_URL)

const KyService = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

export default KyService
