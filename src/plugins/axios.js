import axios from 'axios'
import { config as appConfig } from '@/config/env'


if (!appConfig.api.baseUrl) {
  const errorMsg = ' axios.js: No se puede inicializar sin API_BASE_URL válida'
  console.error(errorMsg)
  if (process.env.NODE_ENV === 'production') {
    throw new Error(errorMsg)
  }
}

const api = axios.create({
  baseURL: appConfig.api.baseUrl,
  timeout: 15000, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

api.interceptors.request.use(

  (requestConfig) => {
    if (appConfig.api.token) {
      requestConfig.headers.Authorization = `Bearer ${appConfig.api.token}`
    }

    if (process.env.VUE_APP_ENV !== 'production') {
      console.debug(`[API] ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`)
    }
    
    return requestConfig
  },
  (error) => {
    console.error('[API Request Error]', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    if (process.env.VUE_APP_ENV !== 'production') {
      console.debug(`[API OK] ${response.config.url} - ${response.status}`)
    }
    return response
  },
  (error) => {
    if (error.response) {
      const { status, config } = error.response
      
      switch (status) {
        case 401:
          console.error(' [API 401] Token inválido o expirado')
          console.error('   → Verifica VUE_APP_API_TOKEN en .env.local')
          break
          
        case 403:
          console.error(' [API 403] Acceso denegado - Permisos insuficientes')
          console.error('   → Endpoint:', config?.url)
          break
          
        case 404:
          console.warn(' [API 404] Endpoint no encontrado')
          console.warn('   → URL:', config?.url)
          break
          
        case 422:
          console.error('  [API 422] Error de validación de datos')
          console.error('   → Detalles:', error.response.data?.errors)
          break
          
        case 500:
        case 502:
        case 503:
          console.error(' [API 5xx] Error del servidor')
          console.error('   → Status:', status)
          console.error('   → URL:', config?.url)
          break
          
        default:
          console.error(` [API ${status}] Error HTTP no manejado`, {
            url: config?.url,
            method: config?.method,
            data: error.response.data
          })
      }
    } 
    else if (error.request) {
      console.error(' [API Network] Sin respuesta del servidor')
      console.error('   → Posibles causas: CORS, servidor caído, sin internet')
      console.error('   → URL:', error.config?.url)
    } 
    else {
      console.error('  [API Config] Error configurando la petición:', error.message)
    }
    
    return Promise.reject(error)
  }
)


api.uploadsUrl = appConfig.uploads.baseUrl

api.getResourceUrl = (path) => appConfig.getResourceUrl(path)

api.clean = (value) => {
  if (typeof value !== 'string') return value
  return value.trim().replace(/\s+/g, ' ')
}

export default api