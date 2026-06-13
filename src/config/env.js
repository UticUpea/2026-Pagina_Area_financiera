// src/config/env.js
import logger from '@/utils/logger'

/**
 * Obtiene variable de entorno requerida de forma segura
 * @param {string} key - Nombre de la variable
 * @param {string} description - Descripción para logs de desarrollo
 * @returns {string} Valor limpio o null en desarrollo si falla
 * @throws {Error} En producción si la variable es crítica y no existe
 */
export const getRequiredEnv = (key, description) => {
  const value = process.env[key]
  
  if (!value || value.trim() === '') {
    if (process.env.NODE_ENV !== 'production') {
      logger.error(`[Config] Variable requerida no definida: ${key}`)
      logger.debug(`  Descripción: ${description}`)
      logger.debug(`  Solución: Agregar ${key}=valor en .env.local`)
    }
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Error de configuración de la aplicación')
    }
    
    return null
  }
  
  return value.trim().replace(/\s+/g, '')
}

/**
 * Obtiene variable de entorno opcional con valor por defecto
 * @param {string} key - Nombre de la variable
 * @param {string} defaultValue - Valor si no está definida
 * @returns {string} Valor limpio o default
 */
export const getOptionalEnv = (key, defaultValue = '') => {
  const value = process.env[key]
  return value ? value.trim().replace(/\s+/g, '') : defaultValue
}

/**
 * Valida que una URL tenga formato correcto y protocolo seguro en producción
 * @param {string} url - URL a validar
 * @param {string} name - Nombre descriptivo para logs
 * @param {boolean} requireHttps - Si true, exige HTTPS en producción
 * @returns {boolean} True si es válida
 */
export const validateUrl = (url, name, requireHttps = true) => {
  if (!url) return false
  
  try {
    const parsed = new URL(url)
    
    if (requireHttps && process.env.NODE_ENV === 'production') {
      if (parsed.protocol !== 'https:') {
        logger.warn(`[Config] URL sin HTTPS en producción: ${name}`)
        return false
      }
    }
    
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      logger.warn(`[Config] URL inválida para ${name}`)
    }
    return false
  }
}

export const API_BASE_URL = getRequiredEnv(
  'VUE_APP_API_BASE_URL',
  'URL base de la API para todas las peticiones HTTP'
)

export const UPLOADS_URL = getRequiredEnv(
  'VUE_APP_UPLOADS_URL', 
  'URL base para acceder a archivos subidos (imágenes, PDFs, etc.)'
)

export const API_TOKEN = getOptionalEnv('VUE_APP_API_TOKEN', '')

if (process.env.NODE_ENV !== 'production') {
  if (API_BASE_URL && !validateUrl(API_BASE_URL, 'API_BASE_URL', false)) {
    logger.warn('[Config] API_BASE_URL tiene formato inválido')
  }
  if (UPLOADS_URL && !validateUrl(UPLOADS_URL, 'UPLOADS_URL', false)) {
    logger.warn('[Config] UPLOADS_URL tiene formato inválido')
  }
}

export const API_ROOT = getOptionalEnv('VUE_APP_API_ROOT', API_BASE_URL)
export const ID_INSTITUCION = getOptionalEnv('VUE_APP_ID_INSTITUCION', '22')
export const APP_ENV = getOptionalEnv('VUE_APP_ENV', 'development')
export const FACEBOOK_APP_ID = getOptionalEnv('VUE_APP_FACEBOOK_APP_ID', '')

export const config = {
  api: {
    baseUrl: API_BASE_URL,
    root: API_ROOT,
    token: API_TOKEN || undefined,
  },
  uploads: {
    baseUrl: UPLOADS_URL,
  },
  app: {
    idInstitucion: ID_INSTITUCION,
    env: APP_ENV,
    facebookAppId: FACEBOOK_APP_ID,
  },

  /**
   * Construye URL segura para recursos subidos
   * @param {string} path - Ruta relativa del recurso
   * @returns {string} URL completa y limpia
   */
  getResourceUrl: (path) => {
    if (!path || !UPLOADS_URL) return ''
    
    const cleanPath = String(path).trim().replace(/^\/+/, '')
    const cleanBase = UPLOADS_URL.replace(/\/+$/, '')
    
    if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
      logger.warn('[Config] Intento de inyección de URL en getResourceUrl')
      return ''
    }
    
    return `${cleanBase}/${cleanPath}`
  }
}

export default config