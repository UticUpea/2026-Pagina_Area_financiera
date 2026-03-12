// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'
// import axios from 'axios'
// import vueAxios from 'vue-axios'

// import api from './plugins/axios'
// // import VueSweetalert2 from 'vue-sweetalert2';
// // import 'sweetalert2/dist/sweetalert2.min.css';
// // require("dotenv").config({ path: "../ids.env" });

// axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL || 'https://servicioadministrador.upea.bo/api/v2' 

// axios.defaults.headers = {
//   'Access-Control-Allow-Credentials': true,
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'application/json',
//   'Accept': 'application/json',
//   'content-type': 'application/json',
//   'Content-Security-Policy': 'frame-ancestors https://serviciopagina.upea.bo'
// }

// createApp(App).use(store).use(router).use(vueAxios, axios).mount('#app')


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import api from './plugins/axios'
import vueAxios from 'vue-axios'

import axios from 'axios'

const API_BASE = process.env.VUE_APP_API_BASE_URL || 'https://apiadministrador.upea.bo/api/v2'
const UPLOADS_URL = process.env.VUE_APP_UPLOADS_URL || 'https://apiadministrador.upea.bo'
const API_TOKEN = process.env.VUE_APP_API_TOKEN

axios.defaults.baseURL = API_BASE
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'

if (API_TOKEN) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${API_TOKEN}`
}

const app = createApp(App)

app.use(store)
app.use(router)
app.use(vueAxios, api) 

app.config.globalProperties.$api = api

app.config.globalProperties.$filters = {
  imageUrl: (path) => {
    if (!path) return '/placeholder.png' 
    if (path.startsWith('http')) return path
    return `${UPLOADS_URL}${path}`
  },

  formatDate: (isoString, options = {}) => {
    if (!isoString) return ''
    const defaultOptions = { day: '2-digit', month: 'long', year: 'numeric' }
    return new Date(isoString).toLocaleDateString('es-BO', { ...defaultOptions, ...options })
  }
}



app.mount('#app')