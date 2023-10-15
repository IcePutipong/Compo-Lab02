import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'
import '@/services/AxiosInterceptorSetup'

import './assets/style.css'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// let x = 'helxysx'
// console.log(x)
