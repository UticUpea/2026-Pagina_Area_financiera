<template>
  <div>
    <footer class="bg-cover footer-area banner-area-4">
      <div class="footer-top pd-top-115">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-5">
              <div class="widget widget_contact pr-lg-3">
                <div class="widget-title">
                  <img 
                    :src="buildSafeImageUrl(Institucion.institucion_logo)" 
                    alt="Logo institucional" 
                    width="125" 
                    loading="lazy"
                  />
                </div>
                <ul class="social-media-2">
                  <li><strong>REDES SOCIALES:</strong></li>
                  <br>
                  <li>
                    <a 
                      :href="buildSafeUrl(Institucion.institucion_facebook)" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Facebook"
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
                    >
                      <i class="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          
            <div class="col-lg-3 col-md-3 widget widget_tags">
              <h4 class="widget-title">Enlaces Externos</h4>
              <div class="tagcloud">
                <a 
                  :href="buildSafeUrl(link.url_link)" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  v-for="(link, index) of Links" 
                  :key="link.id_link || index"
                  :title="sanitizeText(link.tipo)"
                >
                  {{ sanitizeText(link.nombre) }}
                </a>
                <a 
                  href="https://utic.upea.bo/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  UTIC UPEA
                </a>
              </div>
            </div>
            
            <div class="col-lg-5 col-md-4 col-sm-12 pl-lg-5 pr-5 pr-lg-0">
              <div class="widget widget_contact pr-lg-3">
                <h4 class="widget-title">Contacto</h4>
                <ul class="details style-icon">
                  <li>
                    <i class="fa fa-phone"></i> 
                    +{{ formatPhone(Institucion.institucion_celular1) }}
                  </li>
                  <li>
                    <i class="fa fa-envelope"></i>
                    <a 
                      :href="buildMailTo(Institucion.institucion_correo1)"
                      rel="noopener noreferrer"
                    >
                      {{ sanitizeText(Institucion.institucion_correo1) }}
                    </a>
                  </li>
                  <li>
                    <i class="fa fa-map-marker"></i>
                    {{ sanitizeText(Institucion.institucion_direccion) }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 text-center align-self-center mt-3">
              <a 
                href="https://utic.upea.bo/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visitar sitio de UTIC UPEA"
              >
                <img 
                  src="@/assets/utic.png" 
                  width="150" 
                  alt="UTIC UPEA" 
                  loading="lazy"
                />
              </a>
              <p class="mb-0">
                © Copyright {{ currentYear }} UTIC_UPEA | Support by FrehisyM 
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <div class="whatsapp">
      <a 
        class="btn_whatsapp" 
        :href="getWhatsAppLink(Institucion.institucion_celular1)"
        target="_blank" 
        title="Contáctanos por WhatsApp"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-whatsapp" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
          <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
        </svg>
      </a>
    </div>
  </div>
</template>

<style>
.footer-area {
  position: relative;
  background-image: url("@/assets/images/Conta_1.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
}

.footer-area p.copyright-text,
.footer-area .col-12.text-center p.mb-0 {
  margin: 0;
  font-size: 1.5rem !important;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-weight: 500;
}

.footer-area a img {
  display: block;
  margin: 0 auto 0.5rem auto;
}

.details.style-icon {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.details.style-icon li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  text-align: left;
  justify-content: flex-start;
}

.details.style-icon li:last-child {
  margin-bottom: 0;
}

.details.style-icon li i {
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.widget_contact.pr-lg-3 {
  text-align: center !important;
}

.widget_contact.pr-lg-3 ul {
  display: inline-block;
  text-align: left;
}

.widget_contact.pr-lg-3 ul li {
  justify-content: flex-start;
}

@media (max-width: 768px) {
  .footer-area p {
    font-size: 0.85rem;
    padding: 0 1rem;
  }
  
  .footer-area a img {
    width: 80px;
    height: auto;
  }
  
  .details.style-icon li {
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
  
  .details.style-icon li i {
    width: 18px;
  }
}

/* ✅ BOTÓN WHATSAPP */
.whatsapp {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

.btn_whatsapp {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn_whatsapp:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.btn_whatsapp svg {
  transition: transform 0.3s ease;
}

.btn_whatsapp:hover svg {
  transform: scale(1.05);
}

@media (max-width: 576px) {
  .whatsapp {
    bottom: 15px;
    right: 15px;
  }
  
  .btn_whatsapp {
    width: 50px;
    height: 50px;
  }
}
</style>

<script>
import { mapState } from "vuex";
import { config } from '@/config/env'

export default {
  name: "FooterCustom",
  
  computed: {
    ...mapState(["Institucion", "MenuConv", "MenuCur", "url_api", "Links"]),
    
    currentYear() {
      return new Date().getFullYear();
    }
  },
  
  methods: {
    /**
     * @param {string} path - Ruta o URL de la imagen
     * @returns {string} - URL segura con HTTPS
     */
    buildSafeImageUrl(path) {
      if (!path) return '';
      
      const cleaned = String(path).trim();
      
      if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
        return cleaned.replace('http://', 'https://');
      }
      
      const base = config.uploads?.baseUrl?.replace(/\/+$/, '');
      if (!base) return '';
      
      const resource = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
      return `${base}${resource}`.replace(/\/+/g, '/');
    },

    /**
     * Construye URL segura para enlaces externos
     * @param {string} url - URL a validar
     * @returns {string} - URL segura o '#' si es inválida
     */
    buildSafeUrl(url) {
      if (!url) return '#';
      
      const cleaned = String(url).trim().toLowerCase();

      if (cleaned.startsWith('javascript:') || cleaned.startsWith('data:')) {
        return '#';
      }
      
      if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
        return cleaned.replace('http://', 'https://');
      }
     
      return `https://${String(url).trim()}`;
    },

    /**
     * Valida si una URL es segura para mostrar
     * @param {string} url - URL a validar
     * @returns {boolean} - True si es válida
     */
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

    /**
     * Construye enlace mailto seguro
     * @param {string} email - Correo electrónico
     * @returns {string} - Enlace mailto o '#'
     */
    buildMailTo(email) {
      if (!email) return '#';
      
      const cleaned = String(email).trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleaned)) {
        return '#';
      }
      
      return `mailto:${cleaned}`;
    },

    /**
     * Sanitiza texto para prevenir XSS
     * @param {string} text - Texto a sanitizar
     * @returns {string} - Texto seguro
     */
    sanitizeText(text) {
      if (!text) return '';
      
      return String(text)
        .trim()
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]*>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '');
    },

    /**
     * Formatea número de teléfono
     * @param {string} phone - Número de teléfono
     * @returns {string} - Teléfono solo con números
     */
    formatPhone(phone) {
      if (!phone) return '';
      return String(phone).replace(/[^0-9]/g, '');
    },

    /**
     * @param {string} phone - Número de teléfono
     * @returns {string} - Enlace de WhatsApp
     */
    getWhatsAppLink(phone) {
      if (!phone) return '#';
      
      const cleanPhone = String(phone).replace(/[^0-9]/g, '');

      if (cleanPhone.length < 8) {
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