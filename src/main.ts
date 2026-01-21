import './assets/main.css'
// import '@formkit/themes/genesis'
import config from '../formkit.config.ts'
import { plugin, defaultConfig } from '@formkit/vue'
import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import InlineSvg from 'vue-inline-svg'
document.title = import.meta.env.VITE_APP_NAME || 'Web App'

const pinia = createPinia()
const app = createApp(App)

app.component('InlineSvg', InlineSvg)
app.use(pinia)
app.use(router)
pinia.use(piniaPersist)
app.use(plugin, defaultConfig(config))

app.mount('#app')
