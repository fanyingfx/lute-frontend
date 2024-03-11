import ky from 'ky'

// process.env.NODE_ENV = 'production'
console.log('url', import.meta.env.VITE_API_URL)

const KyService = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL
  // headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

export default KyService
