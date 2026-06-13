// src/utils/logger.js
const isDev = process.env.NODE_ENV === 'development'

const logger = {
  info: (...args) => isDev && console.log('[INFO]', ...args),
  warn: (...args) => isDev && console.warn('[WARN]', ...args),
  error: (...args) => console.error('[ERROR]', ...args),
  debug: (...args) => isDev && console.debug('[DEBUG]', ...args)
}

export default logger