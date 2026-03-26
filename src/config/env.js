/**
 * @param {string} key 
 * @param {string} description 
 * @returns {string} 
 * @throws {Error} 
 */
export const getRequiredEnv = (key, description) => {
  const value = process.env[key]
  
  if (!value || value.trim() === '') {
    const errorMsg = `

    ERROR CRÍTICO DE CONFIGURACIÓN
================================
Variable requerida no definida: ${key}
Descripción: ${description}

Solución:
1. Abre tu archivo .env.local
2. Agrega: ${key}=valor_correspondiente
3. Reinicia el servidor de desarrollo

Ejemplo para ${key}:
${key}=https://apiadministrador.upea.bo/api/v2
================================
    `.trim()
    
    console.error(errorMsg)
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Variable de entorno crítica no definida: ${key}`)
    }
    
    return null
  }
  
  return value.trim().replace(/\s+/g, '')
}

/**
 * @param {string} key 
 * @param {string} defaultValue 
 * @returns {string} 
 */
export const getOptionalEnv = (key, defaultValue = '') => {
  const value = process.env[key]
  return value ? value.trim().replace(/\s+/g, '') : defaultValue
}

/**
 * @param {string} url 
 * @param {string} name 
 * @returns {boolean} 
**/
export const validateUrl = (url, name) => {
  if (!url) return false
  
  try {
    new URL(url)
    return true
  } catch (error) {
    console.warn(`  URL inválida para ${name}: "${url}"`)
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

export const API_TOKEN = getRequiredEnv(
  'VUE_APP_API_TOKEN',
  'Token de autenticación para la API administrativa'
)

export const API_ROOT = getOptionalEnv('VUE_APP_API_ROOT', API_BASE_URL)
export const ID_INSTITUCION = getOptionalEnv('VUE_APP_ID_INSTITUCION', '22')
export const APP_ENV = getOptionalEnv('VUE_APP_ENV', 'development')
export const FACEBOOK_APP_ID = getOptionalEnv('VUE_APP_FACEBOOK_APP_ID', '')

export const config = {
  api: {
    baseUrl: API_BASE_URL,
    root: API_ROOT,
    token: API_TOKEN,
  },
  uploads: {
    baseUrl: UPLOADS_URL,
  },
  app: {
    idInstitucion: ID_INSTITUCION,
    env: APP_ENV,
    facebookAppId: FACEBOOK_APP_ID,
  },

  getResourceUrl: (path) => {
    if (!path) return ''
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    const cleanBase = UPLOADS_URL.endsWith('/') ? UPLOADS_URL.slice(0, -1) : UPLOADS_URL
    return `${cleanBase}/${cleanPath}`
  }
}

export default config