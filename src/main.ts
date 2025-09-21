import './assets/main.css'
// import '@formkit/themes/genesis'
import config from '../formkit.config.ts'
import { plugin, defaultConfig } from '@formkit/vue'
import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
pinia.use(piniaPersist)
app.use(plugin, defaultConfig(config))

app.mount('#app')
