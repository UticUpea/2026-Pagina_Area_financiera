
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { config } from '@/config/env'
import api from './plugins/axios'
import vueAxios from 'vue-axios'

if (process.env.NODE_ENV === 'production') {
  if (!config.api.baseUrl || !config.uploads.baseUrl) {
    console.error(' ERROR CRÍTICO: Configuración incompleta')
    console.error('   La aplicación no puede iniciar sin variables de entorno válidas')

    document.body.innerHTML = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: #f44336;
        color: white;
        font-family: system-ui, -apple-system, sans-serif;
        text-align: center;
        padding: 2rem;
        line-height: 1.6;
      ">
        <div>
          <h1 style="margin: 0 0 1rem 0; font-size: 1.5rem;"> Error de Configuración</h1>
          <p style="margin: 0.5rem 0;">La aplicación no puede iniciar.</p>
          <p style="margin: 0.5rem 0; opacity: 0.9;">Contacta al administrador del sistema.</p>
        </div>
      </div>
    `
   
    throw new Error('Configuración crítica no definida - Aplicación detenida')
  }
}

const app = createApp(App)

app.use(store)
app.use(router)
app.use(vueAxios, api) 

app.config.globalProperties.$api = api

app.config.globalProperties.$filters = {
  
  /**
   * @param {string} path 
   * @returns {string} 
   */
  imageUrl: (path) => {

    if (!path) return ''

    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path.trim()
    }

    return config.getResourceUrl(path)
  },

  /**
   * @param {string} isoString 
   * @param {object} options 
   * @returns {string} 
   */
  formatDate: (isoString, options = {}) => {
    if (!isoString) return ''
    
    const defaultOptions = { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric',
      timeZone: 'America/La_Paz' 
    }
    
    const date = new Date(isoString)

    if (isNaN(date.getTime())) {
      console.warn(`Fecha inválida: ${isoString}`)
      return isoString
    }
    
    return date.toLocaleDateString('es-BO', { ...defaultOptions, ...options })
  }
}

app.mount('#app')
