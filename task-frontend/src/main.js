import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// ✅ VERY IMPORTANT: set baseURL BEFORE app is created
axios.defaults.baseURL = 'http://localhost:8001/api';

const app = createApp(App)

app.use(router)

app.mount('#app')
