import axios from 'axios'
import { config as appConfig } from '@/config/env'
import logger from '@/utils/logger'


if (!appConfig.api.baseUrl) {
  const errorMsg = '[API] No se puede inicializar sin API_BASE_URL válida'
  logger.error(errorMsg)
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

//  Interceptor de Peticiones
api.interceptors.request.use(
  (requestConfig) => {
    if (appConfig.api.token) {
      requestConfig.headers.Authorization = `Bearer ${appConfig.api.token}`
    }

    if (process.env.NODE_ENV !== 'production') {
      logger.debug(`[API] ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`)
    }
    
    return requestConfig
  },
  (error) => {
    logger.error('[API Request Error]', error.message)
    return Promise.reject(error)
  }
)

//  Interceptor de Respuestas
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV !== 'production') {
      logger.debug(`[API OK] ${response.config.url} - ${response.status}`)
    }
    return response
  },
  (error) => {
    if (error.response) {
      const { status } = error.response
      
      switch (status) {
        case 401:
          logger.warn('[API 401] Token inválido o expirado')
          break
          
        case 403:
          logger.error('[API 403] Acceso denegado - Permisos insuficientes')
          break
          
        case 404:
          logger.warn('[API 404] Endpoint no encontrado')
          break
          
        case 422:
          logger.error('[API 422] Error de validación de datos')
          break
          
        case 500:
        case 502:
        case 503:
          logger.error(`[API ${status}] Error del servidor`)
          break
          
        default:
          logger.error(`[API ${status}] Error HTTP no manejado`)
      }
    } 
    else if (error.request) {
      logger.error('[API Network] Sin respuesta del servidor (CORS, servidor caído o sin internet)')
    } 
    else {
      logger.error('[API Config] Error configurando la petición:', error.message)
    }
    
    if (process.env.NODE_ENV !== 'production') {
      logger.debug('Detalles técnicos:', error.response?.data || error.message)
    }
    
    return Promise.reject(error)
  }
)

//  Utilidades
api.uploadsUrl = appConfig.uploads.baseUrl
api.getResourceUrl = (path) => appConfig.getResourceUrl(path)

api.clean = (value) => {
  if (typeof value !== 'string') return value
  return value.trim().replace(/\s+/g, ' ')
}

export default api