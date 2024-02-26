import './assets/index.css'

import { createApp } from 'vue'
import Service from '@/api/config'
import App from './App.vue'
// import router from './router'

const app = createApp(App)

// app.use(router)

app.mount('#app')
