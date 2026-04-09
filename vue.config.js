const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  
  configureWebpack: {
    resolve: {
      fallback: {
        crypto: false,
        util: require.resolve("util/"),
      },
    },
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
    optimization: {
      splitChunks: { chunks: 'all' },
    },
  },

  devServer: {
    headers: {
      'Content-Security-Policy': process.env.NODE_ENV === 'production' 
        ? [
            "default-src 'self';",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://code.jquery.com https://cdn.jsdelivr.net https://www.google.com https://apis.google.com;",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com;",
            "img-src 'self' data: https: blob:;",
            "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;",
            "connect-src 'self' https://apiadministrador.upea.bo https://api.upea.bo https://servicioadministrador.upea.bo https://www.youtube.com https://i.ytimg.com https://*.googleapis.com https://cdn.jsdelivr.net;",
            "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://vimeo.com https://drive.google.com https://www.facebook.com;",
            "media-src 'self' blob: https:;",
            "worker-src 'self' blob:;",
            "object-src 'none';",
            "base-uri 'self';",
            "form-action 'self';",
            "frame-ancestors 'self';",
            "upgrade-insecure-requests;"
          ].join(' ')
        : [
            "default-src 'self' * 'unsafe-inline' 'unsafe-eval' data: blob:;",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: *;",
            "style-src 'self' 'unsafe-inline' *;",
            "img-src 'self' data: https: blob: *;",
            "font-src 'self' https: *;",
            "connect-src 'self' ws: wss: http://localhost:* https://localhost:* http://192.168.1.203:* https://192.168.1.203:* https://apiadministrador.upea.bo https://api.upea.bo https://servicioadministrador.upea.bo https://www.youtube.com https://i.ytimg.com https://*.googleapis.com https://cdn.jsdelivr.net *;",
            "frame-src 'self' blob: https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://vimeo.com https://drive.google.com https://www.facebook.com *;",
            "media-src 'self' blob: https: *;",
            "worker-src 'self' blob: *;",
            "object-src 'none';",
            "base-uri 'self';",
            "form-action 'self';",
            "frame-ancestors 'self';"
          ].join(' '),
      
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=()',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': process.env.NODE_ENV === 'production' 
        ? 'max-age=31536000; includeSubDomains; preload' 
        : '',
    },
    
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    },
    
    // ✅ SIN PROXY - Como solicitaste
  },
  
  productionSourceMap: false,
});