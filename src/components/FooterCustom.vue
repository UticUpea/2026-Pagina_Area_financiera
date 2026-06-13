<template>
  <footer class="footer-area">
    <!-- Top del footer -->
    <div class="footer-top">
      <div class="container">
        <div class="row gy-4">
          
          <!-- Logo y Redes -->
          <div class="col-lg-4 col-md-5">
            <div class="footer-widget widget-contact">
              <div class="widget-logo">
                <img 
                  :src="buildSafeImageUrl(Institucion.institucion_logo)" 
                  alt="Logo institucional" 
                  width="150"
                  height="auto"
                  loading="lazy"
                  @error="e => e.target.src = require('@/assets/upea.png')"
                />
              </div>
              <div class="social-section">
                <span class="social-label">REDES SOCIALES:</span>
                <ul class="social-links">
                  <li>
                    <a 
                      :href="buildSafeUrl(Institucion.institucion_facebook)" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      class="social-icon"
                    >
                      <i class="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a 
                      :href="buildSafeUrl(Institucion.institucion_youtube)" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      class="social-icon"
                    >
                      <i class="fa fa-youtube" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li v-if="isValidUrl(Institucion.institucion_twitter)">
                    <a 
                      :href="buildSafeUrl(Institucion.institucion_twitter)" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                      class="social-icon"
                    >
                      <i class="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        
          <!-- Enlaces Externos -->
          <div class="col-lg-3 col-md-3">
            <div class="footer-widget widget-links">
              <h4 class="widget-title">Enlaces</h4>
              <div class="link-cloud">
                <a 
                  :href="buildSafeUrl(link.url_link)" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  v-for="(link, index) of Links" 
                  :key="link.id_link || index"
                  :title="sanitizeText(link.tipo)"
                  class="link-tag"
                >
                  {{ sanitizeText(link.nombre) }}
                </a>
                <a 
                  href="https://utic.upea.bo/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="link-tag"
                >
                  UTIC UPEA
                </a>
              </div>
            </div>
          </div>
          
          <!-- Contacto -->
          <div class="col-lg-5 col-md-4">
            <div class="footer-widget widget-contact">
              <h4 class="widget-title">Contacto</h4>
              <ul class="contact-list">
                <li class="contact-item">
                  <i class="fa fa-phone contact-icon"></i> 
                  <span>+{{ formatPhone(Institucion.institucion_celular1) }}</span>
                </li>
                <li class="contact-item">
                  <i class="fa fa-envelope contact-icon"></i>
                  <a 
                    :href="buildMailTo(Institucion.institucion_correo1)"
                    rel="noopener noreferrer"
                    class="contact-link"
                  >
                    {{ sanitizeText(Institucion.institucion_correo1) }}
                  </a>
                </li>
                <li class="contact-item">
                  <i class="fa fa-map-marker contact-icon"></i>
                  <span class="contact-address">{{ sanitizeText(Institucion.institucion_direccion) }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom del footer -->
    <div class="footer-bottom">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 text-center">
            <a 
              href="https://utic.upea.bo/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visitar sitio de UTIC UPEA"
              class="utic-link"
            >
              <img 
                src="@/assets/utic.png" 
                width="150" 
                alt="UTIC UPEA" 
                loading="lazy"
                class="utic-logo"
              />
            </a>
            <p class="copyright">
              © {{ currentYear }} UTIC_UPEA
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón WhatsApp -->
    <div class="whatsapp-float">
      <a 
        class="btn-whatsapp" 
        :href="getWhatsAppLink(Institucion.institucion_celular1)"
        target="_blank" 
        title="Contáctanos por WhatsApp"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="icon-whatsapp" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
          <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
        </svg>
      </a>
    </div>
  </footer>
</template>

<style scoped>
/* ===== VARIABLES - Usan colores dinámicos de la API ===== */
.footer-area {
  --footer-bg: rgba(10, 15, 30, 0.98);
  --footer-text: rgba(255, 255, 255, 0.9);
  --footer-text-muted: rgba(255, 255, 255, 0.75);
  --footer-accent: var(--main-color, #04246C);        /* Color primario de API */
  --footer-accent-2: var(--main-color-2, #FC0102);    /* Color secundario de API */
  --footer-accent-3: var(--main-color-3, #020733);    /* Color terciario de API */
  --footer-hover: #ffffff;
  --transition: all 0.3s ease;
  --radius: 8px;
}

/* ===== ESTRUCTURA PRINCIPAL - Tamaño intermedio ===== */
.footer-area {
  background: var(--footer-bg);
  color: var(--footer-text);
  font-size: 1.25rem;
  line-height: 1.6;
}

.footer-top {
  padding: 40px 0 30px 0;  /* Tamaño intermedio */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom {
  padding: 20px 0;
  background: rgba(0, 0, 0, 0.25);
}

/* ===== WIDGETS ===== */
.footer-widget {
  padding: 0 15px;
}

.widget-logo {
  margin-bottom: 18px;
  display: flex;
  justify-content: center;
}

.widget-logo img {
  max-height: 100px;  /* Tamaño intermedio */
  width: auto;
  object-fit: contain;
  transition: var(--transition);
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

.widget-logo img:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

.widget-title {
  font-size: 1.5rem; 
  font-weight: 600;
  color: var(--footer-hover);
  margin: 0 0 16px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--footer-accent-2);  /* Color secundario API */
  display: inline-block;
}

/* ===== REDES SOCIALES ===== */
.social-section {
  text-align: center;
}

.social-label {
  display: block;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--footer-text-muted);
  margin-bottom: 14px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 14px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  color: var(--footer-text);
  text-decoration: none;
  transition: var(--transition);
  font-size: 1.3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.social-icon:hover {
  background: var(--footer-accent-2);  /* Color secundario API */
  color: white;
  transform: translateY(-3px);
  border-color: var(--footer-accent-2);
}

/* ===== ENLACES ===== */
.link-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.link-tag {
  display: inline-block;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--footer-text);
  text-decoration: none;
  font-size: 1.25rem;
  border-radius: var(--radius);
  transition: var(--transition);
  border: 1px solid transparent;
}

.link-tag:hover {
  background: rgba(4, 36, 108, 0.5);  /* Color primario API con transparencia */
  border-color: var(--footer-accent);  /* Color primario API */
  color: var(--footer-hover);
  transform: translateY(-2px);
}

/* ===== CONTACTO ===== */
.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 14px;
  font-size: 1.1rem;
}

.contact-item:last-child {
  margin-bottom: 0;
}

.contact-icon {
  color: var(--footer-accent-2);  /* Color secundario API */
  font-size: 1.50rem;
  width: 40px;
  text-align: center;
  flex-shrink: 0;
  margin-top: 3px;
}

.contact-link {
  color: var(--footer-text);
  text-decoration: none;
  transition: var(--transition);
  word-break: break-all;
}

.contact-link:hover {
  color: var(--footer-hover);
  text-decoration: underline;
}

.contact-address {
  line-height: 1.5;
}

/* ===== FOOTER BOTTOM ===== */
.copyright {
  margin: 10px 0 0 0;
  font-size: 1rem;
  color: var(--footer-text-muted);
}

.utic-logo {
  opacity: 0.9;
  transition: var(--transition);
  margin-bottom: 5px;
}

.utic-logo:hover {
  opacity: 1;
  transform: scale(1.05);
}

/* ===== WHATSAPP FLOTANTE ===== */
.whatsapp-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

.btn-whatsapp {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: var(--transition);
  text-decoration: none;
}

.btn-whatsapp:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}

.icon-whatsapp {
  width: 32px;
  height: 32px;
  transition: transform 0.3s ease;
}

.btn-whatsapp:hover .icon-whatsapp {
  transform: scale(1.05);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 991px) {
  .footer-top {
    padding: 35px 0 25px 0;
  }
  
  .footer-widget {
    text-align: center;
    padding: 0;
    margin-bottom: 20px;
  }
  
  .contact-list {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  
  .contact-item {
    justify-content: center;
    white-space: normal; 
  }
    .contact-address {
    max-width: 100%;        
  }
}

@media (max-width: 768px) {
     .contact-list {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  .contact-item {
    justify-content: center;
  }

  .footer-area {
    font-size: 1.25rem;
  }
  
  .footer-top {
    padding: 30px 0 20px 0;
  }
  
  .footer-bottom {
    padding: 16px 0;
  }
  
  .widget-logo img {
    max-height: 100px;
  }
  
  .widget-title {
    font-size: 1.25rem;
    margin-bottom: 14px;
  }
  
  .social-icon {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
  
  .link-tag {
    padding: 5px 10px;
    font-size: 0.8rem;
  }
  
  .contact-icon {
    width: 60px;
    font-size: 1.25rem;
  }
  
  .copyright {
    font-size: 1.50rem;
  }
  
  .utic-logo {
    width: 100px;
  }

}

@media (max-width: 576px) {
  .footer-top {
    padding: 25px 0 18px 0;
  }
  
  .widget-logo img {
    max-height: 100px;
  }
  
  .social-links {
    gap: 12px;
  }
  
  .social-icon {
    width: 32px;
    height: 32px;
    font-size: 0.85rem;
  }
  
  .contact-item {
    gap: 10px;
    margin-bottom: 12px;
  }
  
  .contact-icon {
    width: 30px;
  }
  
  .btn-whatsapp {
    width: 50px;
    height: 50px;
  }
  
  .icon-whatsapp {
    width: 28px;
    height: 28px;
  }
  
  .whatsapp-float {
    bottom: 15px;
    right: 15px;
  }
  
  .utic-logo {
    width: 70px;
  }
}

/* ===== ACCESIBILIDAD ===== */
.social-icon:focus,
.link-tag:focus,
.contact-link:focus,
.btn-whatsapp:focus {
  outline: 2px solid var(--footer-accent-2);
  outline-offset: 2px;
}

/* ===== UTILIDADES ===== */
.gy-4 { row-gap: 1.5rem; }
.text-center { text-align: center !important; }
.mb-0 { margin-bottom: 0 !important; }
</style>

<script>
import { mapState } from "vuex";
import logger from '@/utils/logger'

export default {
  name: "FooterCustom",
  
  computed: {
    ...mapState(["Institucion", "MenuConv", "MenuCur", "url_api", "Links"]),
    
    currentYear() {
      return new Date().getFullYear();
    }
  },
  
  methods: {
buildSafeImageUrl(path) {
  if (!path) return require('@/assets/upea.png');
  
  const cleaned = String(path).trim();
  const MINIO_BASE = 'https://archivosminio.upea.bo/archivospaginasnode';
  
  // ✅ CASO 1: Ya es URL completa de MinIO → solo asegurar HTTPS
  if (cleaned.includes('archivosminio.upea.bo')) {
    return cleaned.replace(/^http:\/\//, 'https://');
  }
  
  // ✅ CASO 2: Es nombre de archivo o ruta relativa → construir con base de MinIO

  const lower = cleaned.toLowerCase();
  let folder = '/imagenes/'; 
  
  if (lower.endsWith('.pdf')) {
    folder = '/documentos/';
  } else if (lower.includes('institucion_logo')) {
    folder = '/imagenes/instituciones/';
  } else if (lower.includes('portada_imagen')) {
    folder = '/imagenes/portadas/';
  } else if (lower.includes('serv_imagen')) {
    folder = '/imagenes/servicios/';
  } else if (lower.includes('con_foto_portada')) {
    folder = '/imagenes/convocatorias/';
  }
  
  const resource = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  return `${MINIO_BASE}${folder}${resource}`.replace(/\/+/g, '/');
},

    buildSafeUrl(url) {
      if (!url) return '#';
      const cleaned = String(url).trim().toLowerCase();
      if (cleaned.startsWith('javascript:') || 
      cleaned.startsWith('vbscript:') ||
      cleaned.startsWith('data:')) {
    logger.warn('URL bloqueada por seguridad:', url);
    return '#';
  }
      if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
        return cleaned.replace('http://', 'https://');
      }
      return `https://${String(url).trim()}`;
    },

    isValidUrl(url) {
      if (!url) return false;
      const cleaned = String(url).trim().toLowerCase();
      if (cleaned.startsWith('javascript:') || 
          cleaned.startsWith('data:') || 
          cleaned.startsWith('vbscript:')) {
        return false;
      }
      return cleaned.length > 0;
    },

    buildMailTo(email) {
      if (!email) return '#';
      const cleaned = String(email).trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleaned)) {
        logger.warn('Email inválido:', email);
        return '#';
      }
      return `mailto:${cleaned}`;
    },

    sanitizeText(text) {
      if (!text) return '';
      return String(text)
        .trim()
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]*>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '');
    },

    formatPhone(phone) {
      if (!phone) return '';
      return String(phone).replace(/[^0-9]/g, '');
    },

    getWhatsAppLink(phone) {
      if (!phone) return '#';
      const cleanPhone = String(phone).replace(/[^0-9]/g, '');
      if (cleanPhone.length < 8) {
        logger.warn('Número de WhatsApp inválido:', phone);
        return '#';
      }
      return `https://wa.me/591${cleanPhone}`;
    },

    applyDynamicColors() {
      const colors = this.Institucion?.colorinstitucion;
      if (colors && colors.length > 0) {
        const colorSet = colors[0];
        if (colorSet.color_primario) {
          document.documentElement.style.setProperty('--main-color', colorSet.color_primario);
        }
        if (colorSet.color_secundario) {
          document.documentElement.style.setProperty('--main-color-2', colorSet.color_secundario);
        }
        if (colorSet.color_terciario) {
          document.documentElement.style.setProperty('--main-color-3', colorSet.color_terciario);
        }
      }
    },

    clickBack() {
      this.$store.commit("clickLink");
      this.$router.go(-1);
    },
  },

  watch: {
    Institucion: {
      handler() {
        this.applyDynamicColors();
      },
      deep: true,
      immediate: true
    }
  },

  mounted() {
    this.applyDynamicColors();
  },

  beforeUnmount() {
    // Limpieza si es necesaria
  },
};
</script>