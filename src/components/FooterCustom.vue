<template>
  <footer class="footer-area">
    
    <!-- Top del footer -->
    <div class="footer-top">
      <div class="container">
        <div class="row gy-4 gy-lg-0">
          
          <!-- Columna 1: Logo + Redes -->
          <div class="col-lg-4 col-md-6">
            <div class="footer-brand">
              <div class="brand-logo">
                <img 
                  :src="buildSafeImageUrl(Institucion.institucion_logo)" 
                  alt="Logo institucional"
                  loading="lazy"
                  @error="e => e.target.src = require('@/assets/upea.png')"
                />
              </div>
              <p class="brand-description">
                Formando profesionales competentes con excelencia académica y compromiso social.
              </p>
              
              <div class="social-block">
                <span class="social-title">Síguenos</span>
                <div class="social-icons">
                  <a 
                    v-if="Institucion.institucion_facebook"
                    :href="buildSafeUrl(Institucion.institucion_facebook)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-btn facebook"
                    aria-label="Facebook"
                  >
                    <i class="fa fa-facebook-f"></i>
                  </a>
                  <a 
                    v-if="Institucion.institucion_youtube"
                    :href="buildSafeUrl(Institucion.institucion_youtube)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-btn youtube"
                    aria-label="YouTube"
                  >
                    <i class="fa fa-youtube"></i>
                  </a>
                  <a 
                    v-if="isValidUrl(Institucion.institucion_twitter)"
                    :href="buildSafeUrl(Institucion.institucion_twitter)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-btn twitter"
                    aria-label="Twitter"
                  >
                    <i class="fa fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Columna 2: Enlaces Rápidos -->
          <div class="col-lg-2 col-md-6">
            <div class="footer-links">
              <h4 class="links-title">Enlaces</h4>
              <ul class="links-list">
                <li v-for="(link, index) of Links" :key="link.id_link || index">
                  <a 
                    :href="buildSafeUrl(link.url_link)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="link-item"
                  >
                    <i class="fa fa-external-link-alt"></i>
                    {{ sanitizeText(link.nombre) }}
                  </a>
                </li>
                <li>
                  <a href="https://utic.upea.bo/" target="_blank" rel="noopener" class="link-item">
                    <i class="fa fa-external-link-alt"></i>
                    UTIC UPEA
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Columna 3: Contacto -->
          <div class="col-lg-3 col-md-6">
            <div class="footer-contact">
              <h4 class="contact-title">Contacto</h4>
              <ul class="contact-list">
                <li class="contact-row">
                  <i class="fa fa-phone-alt"></i>
                  <div>
                    <span class="contact-label">Teléfono</span>
                    <a :href="`tel:+591${formatPhone(Institucion.institucion_celular1)}`" class="contact-value">
                      +591 {{ formatPhone(Institucion.institucion_celular1) }}
                    </a>
                  </div>
                </li>
                <li class="contact-row">
                  <i class="fa fa-envelope"></i>
                  <div>
                    <span class="contact-label">Email</span>
                    <a :href="buildMailTo(Institucion.institucion_correo1)" class="contact-value">
                      {{ sanitizeText(Institucion.institucion_correo1) }}
                    </a>
                  </div>
                </li>
                <li class="contact-row">
                  <i class="fa fa-map-marker-alt"></i>
                  <div>
                    <span class="contact-label">Dirección</span>
                    <span class="contact-value address">
                      {{ sanitizeText(Institucion.institucion_direccion) }}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Columna 4: Mapa/Info adicional (opcional) -->
          <div class="col-lg-3 col-md-6">
            <div class="footer-info">
              <h4 class="info-title">Ubicación</h4>
              <div class="map-preview">
                <iframe 
                  v-if="Institucion.institucion_api_google_map"
                  :src="Institucion.institucion_api_google_map"
                  width="100%"
                  height="120"
                  style="border:0; border-radius: 8px;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="Ubicación institucional"
                ></iframe>
              </div>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener"
                class="btn-map"
              >
                <i class="fa fa-location-arrow"></i> Ver en Google Maps
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    <!-- Bottom del footer -->
    <div class="footer-bottom">
      <div class="container">
        <div class="bottom-content">
          <div class="bottom-brand">
            <a href="https://utic.upea.bo/" target="_blank" rel="noopener" class="utic-brand">
              <img src="@/assets/utic.png" alt="UTIC UPEA" loading="lazy" class="utic-logo" />
              <span>Desarrollado por UTIC</span>
            </a>
          </div>
          <div class="bottom-copyright">
            <p>© {{ currentYear }} <strong>{{ sanitizeText(Institucion.institucion_nombre) }}</strong></p>
            <p class="copyright-sub">Todos los derechos reservados</p>
          </div>
          <div class="bottom-links">
            <a href="/privacidad" class="bottom-link">Privacidad</a>
            <a href="/terminos" class="bottom-link">Términos</a>
            <a href="/accesibilidad" class="bottom-link">Accesibilidad</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón WhatsApp Flotante -->
    <transition name="fade-up">
      <div class="whatsapp-float" v-if="Institucion.institucion_celular1">
        <a 
          :href="getWhatsAppLink(Institucion.institucion_celular1)"
          target="_blank"
          rel="noopener noreferrer"
          class="whatsapp-btn"
          aria-label="Contáctanos por WhatsApp"
          title="Chat en WhatsApp"
        >
          <i class="fa fa-whatsapp"></i>
          <span class="whatsapp-tooltip">¡Escríbenos!</span>
        </a>
      </div>
    </transition>
    
    <!-- Botón "Volver arriba" -->
    <transition name="fade-up">
      <button 
        v-show="showBackToTop"
        @click="scrollToTop"
        class="back-to-top"
        aria-label="Volver arriba"
      >
        <i class="fa fa-arrow-up"></i>
      </button>
    </transition>
    
  </footer>
</template>

<style scoped>
/* ========================================
   FOOTER INSTITUCIONAL - Colores Sólidos
   ======================================== */
.footer-area {
  --footer-bg: #001f3f; 
  --footer-bg-dark: #001529;  
  --footer-accent: var(--main-color-2, #FC0102);
  
  /* Colores de texto */
  --footer-text: rgba(255, 255, 255, 0.95);
  --footer-text-muted: rgba(255, 255, 255, 0.75);
  --footer-text-hover: #ffffff;
  
  /* Efectos */
  --footer-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  --footer-glass: rgba(255, 255, 255, 0.08);
  --footer-border: rgba(255, 255, 255, 0.15);
  
  /* Transiciones */
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bounce: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  /* Espaciados */
  --spacing-sm: 0.75rem;
  --spacing-md: 1.25rem;
  --spacing-lg: 1.75rem;
  --spacing-xl: 2.5rem;
  
  /* Bordes */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-circle: 50%;
}

/* ========================================
   Estructura Principal - FONDO SÓLIDO
   ======================================== */
.footer-area {
  background: var(--footer-bg);  /* Color sólido institucional */
  color: var(--footer-text);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  position: relative;
  overflow: hidden;
}

/* Línea decorativa superior */
.footer-area::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--footer-accent);  /* Línea roja institucional */
}

.footer-top {
  padding: var(--spacing-xl) 0 var(--spacing-lg);
  position: relative;
}

.footer-bottom {
  padding: var(--spacing-md) 0;
  background: var(--footer-bg-dark);  /* Azul más oscuro para el bottom */
  border-top: 1px solid var(--footer-border);
}

/* ========================================
   Columna: Brand + Logo + Redes
   ======================================== */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding-right: var(--spacing-lg);
}

.brand-logo {
  display: flex;
  align-items: center;
}

.brand-logo img {
  max-height: 110px;  /* Logo más grande */
  width: auto;
  object-fit: contain;
  transition: var(--transition-bounce);
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

.brand-logo img:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 6px 12px rgba(0,0,0,0.4));
}

.brand-description {
  font-size: 1.1rem;  /* TEXTO MÁS GRANDE */
  line-height: 1.7;
  color: var(--footer-text-muted);
  margin: 0;
  max-width: 300px;
}

/* Redes Sociales */
.social-block {
  margin-top: auto;
}

.social-title {
  display: block;
  font-size: 1rem;  /* TEXTO MÁS GRANDE */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--footer-text-hover);
  margin-bottom: var(--spacing-sm);
}

.social-icons {
  display: flex;
  gap: 12px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;  /* Iconos más grandes */
  height: 48px;
  border-radius: var(--radius-circle);
  background: var(--footer-glass);
  border: 2px solid var(--footer-border);
  color: var(--footer-text);
  text-decoration: none;
  font-size: 1.2rem;  /* Iconos más grandes */
  transition: var(--transition-bounce);
  position: relative;
  overflow: hidden;
}

.social-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--footer-accent);
  opacity: 0;
  transition: var(--transition-smooth);
  z-index: -1;
}

.social-btn:hover {
  transform: translateY(-3px);
  border-color: var(--footer-accent);
  color: white;
}

.social-btn:hover::before {
  opacity: 1;
}

.social-btn.facebook:hover::before { background: #1877F2; }
.social-btn.youtube:hover::before { background: #FF0000; }
.social-btn.twitter:hover::before { background: #1DA1F2; }

/* ========================================
   Columna: Enlaces
   ======================================== */
.footer-links {
  padding-left: var(--spacing-md);
}

.links-title,
.contact-title,
.info-title {
  font-size: 1.4rem;  /* TÍTULOS MÁS GRANDES */
  font-weight: 700;
  color: var(--footer-text-hover);
  margin: 0 0 var(--spacing-md) 0;
  padding-bottom: var(--spacing-sm);
  border-bottom: 3px solid var(--footer-accent);  /* Línea más gruesa */
  display: inline-block;
  position: relative;
}

.links-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.link-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  color: var(--footer-text);
  text-decoration: none;
  font-size: 1.05rem;  /* TEXTO MÁS GRANDE */
  transition: var(--transition-smooth);
  position: relative;
  padding-left: 20px;
  font-weight: 500;
}

.link-item::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--footer-accent);
  font-size: 0.9rem;
  opacity: 0;
  transition: var(--transition-smooth);
}

.link-item:hover {
  color: var(--footer-text-hover);
  padding-left: 26px;
}

.link-item:hover::before {
  opacity: 1;
}

.link-item i {
  font-size: 0.85rem;
  opacity: 0.7;
  transition: var(--transition-smooth);
}

.link-item:hover i {
  opacity: 1;
  transform: translateX(2px);
}

/* ========================================
   Columna: Contacto
   ======================================== */
.footer-contact {
  padding-left: var(--spacing-md);
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.contact-row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.contact-row i {
  width: 28px;  /* Iconos más grandes */
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--footer-accent);
  font-size: 1.2rem;  /* Iconos más grandes */
  flex-shrink: 0;
  margin-top: 3px;
}

.contact-row > div {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.contact-label {
  font-size: 0.9rem;  /* TEXTO MÁS GRANDE */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--footer-text-muted);
}

.contact-value {
  font-size: 1.05rem;  /* TEXTO MÁS GRANDE */
  color: var(--footer-text);
  text-decoration: none;
  transition: var(--transition-smooth);
  word-break: break-word;
  font-weight: 500;
}

.contact-value:hover {
  color: var(--footer-accent);
}

.contact-value.address {
  line-height: 1.5;
}

/* ========================================
   Columna: Mapa/Info
   ======================================== */
.footer-info {
  padding-left: var(--spacing-md);
}

.map-preview {
  margin-bottom: var(--spacing-sm);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 2px solid var(--footer-border);
  background: var(--footer-glass);
}

.btn-map {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: var(--footer-glass);
  border: 2px solid var(--footer-border);
  border-radius: var(--radius-sm);
  color: var(--footer-text);
  text-decoration: none;
  font-size: 1rem;  /* TEXTO MÁS GRANDE */
  font-weight: 600;
  transition: var(--transition-bounce);
}

.btn-map:hover {
  background: var(--footer-accent);
  border-color: var(--footer-accent);
  transform: translateY(-2px);
  color: white;
}

/* ========================================
   Footer Bottom
   ======================================== */
.bottom-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) 0;
}

.bottom-brand {
  flex: 1;
  min-width: 200px;
}

.utic-brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--footer-text-muted);
  transition: var(--transition-smooth);
}

.utic-brand:hover {
  color: var(--footer-text-hover);
}

.utic-logo {
  height: 40px;  /* Logo más grande */
  width: auto;
  opacity: 0.9;
  transition: var(--transition-smooth);
}

.utic-brand:hover .utic-logo {
  opacity: 1;
  transform: scale(1.05);
}

.bottom-copyright {
  flex: 1;
  min-width: 200px;
  text-align: center;
}

.bottom-copyright p {
  margin: 0;
  font-size: 1.05rem;  /* TEXTO MÁS GRANDE */
  color: var(--footer-text-muted);
  font-weight: 500;
}

.bottom-copyright .copyright-sub {
  font-size: 0.9rem;  /* TEXTO MÁS GRANDE */
  opacity: 0.8;
  margin-top: 4px;
}

.bottom-links {
  flex: 1;
  min-width: 200px;
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-lg);
}

.bottom-link {
  font-size: 0.95rem;  /* TEXTO MÁS GRANDE */
  color: var(--footer-text-muted);
  text-decoration: none;
  transition: var(--transition-smooth);
  position: relative;
  padding: 4px 0;
  font-weight: 500;
}

.bottom-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--footer-accent);
  transition: var(--transition-smooth);
}

.bottom-link:hover {
  color: var(--footer-text-hover);
}

.bottom-link:hover::after {
  width: 100%;
}

/* ========================================
   Botón WhatsApp Flotante
   ======================================== */
.whatsapp-float {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 9999;
}

.whatsapp-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;  /* Botón más grande */
  height: 64px;
  background: #25D366;
  border-radius: var(--radius-circle);
  color: white;
  text-decoration: none;
  font-size: 2rem;  /* Icono más grande */
  box-shadow: 0 6px 24px rgba(37, 211, 102, 0.5);
  transition: var(--transition-bounce);
  position: relative;
}

.whatsapp-btn:hover {
  transform: scale(1.1) translateY(-3px);
  box-shadow: 0 10px 35px rgba(37, 211, 102, 0.7);
}

.whatsapp-btn:active {
  transform: scale(0.95);
}

.whatsapp-tooltip {
  position: absolute;
  right: 75px;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px 14px;
  background: var(--footer-bg-dark);
  color: white;
  font-size: 0.95rem;  /* TEXTO MÁS GRANDE */
  font-weight: 600;
  border-radius: var(--radius-sm);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: var(--transition-smooth);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.whatsapp-btn:hover .whatsapp-tooltip {
  opacity: 1;
  right: 80px;
}

/* ========================================
   Botón Volver Arriba
   ======================================== */
.back-to-top {
  position: fixed;
  bottom: 100px;
  right: 28px;
  width: 50px;  /* Botón más grande */
  height: 50px;
  background: var(--footer-glass);
  border: 2px solid var(--footer-border);
  border-radius: var(--radius-circle);
  color: var(--footer-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: var(--transition-bounce);
  z-index: 9998;
}

.back-to-top:hover {
  background: var(--footer-accent);
  border-color: var(--footer-accent);
  transform: translateY(-3px);
  color: white;
}

/* Animación fade-up */
.fade-up-enter-active,
.fade-up-leave-active {
  transition: var(--transition-smooth);
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* ========================================
   Responsive
   ======================================== */
@media (max-width: 991px) {
  .footer-brand,
  .footer-links,
  .footer-contact,
  .footer-info {
    padding: 0;
    text-align: center;
  }
  
  .brand-logo {
    justify-content: center;
  }
  
  .brand-description {
    margin: 0 auto;
    max-width: 100%;
  }
  
  .social-icons {
    justify-content: center;
  }
  
  .links-list,
  .contact-list {
    align-items: center;
  }
  
  .link-item {
    justify-content: center;
    padding-left: 0;
  }
  
  .link-item::before {
    display: none;
  }
  
  .contact-row {
    justify-content: center;
  }
  
  .bottom-content {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-md);
  }
  
  .bottom-links {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .footer-top {
    padding: var(--spacing-lg) 0 var(--spacing-md);
  }
  
  .brand-logo img {
    max-height: 90px;
  }
  
  .brand-description {
    font-size: 1rem;
  }
  
  .links-title,
  .contact-title,
  .info-title {
    font-size: 1.25rem;
  }
  
  .link-item,
  .contact-value {
    font-size: 1rem;
  }
  
  .social-btn {
    width: 44px;
    height: 44px;
    font-size: 1.1rem;
  }
  
  .contact-row i {
    font-size: 1.1rem;
    width: 26px;
    height: 26px;
  }
  
  .contact-label {
    font-size: 0.85rem;
  }
  
  .whatsapp-btn {
    width: 58px;
    height: 58px;
    font-size: 1.8rem;
  }
  
  .whatsapp-tooltip {
    display: none;
  }
  
  .back-to-top {
    bottom: 80px;
    width: 46px;
    height: 46px;
    font-size: 1.1rem;
  }
  
  .bottom-copyright p {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .footer-top {
    padding: var(--spacing-md) 0 var(--spacing-sm);
  }
  
  .brand-logo img {
    max-height: 80px;
  }
  
  .brand-description {
    font-size: 0.95rem;
  }
  
  .links-title,
  .contact-title,
  .info-title {
    font-size: 1.15rem;
  }
  
  .social-icons {
    gap: 10px;
  }
  
  .social-btn {
    width: 42px;
    height: 42px;
    font-size: 1rem;
  }
  
  .link-item,
  .contact-value {
    font-size: 0.95rem;
  }
  
  .contact-row {
    gap: 12px;
  }
  
  .contact-row i {
    width: 24px;
    height: 24px;
    font-size: 1rem;
  }
  
  .contact-label {
    font-size: 0.8rem;
  }
  
  .whatsapp-btn {
    width: 54px;
    height: 54px;
    font-size: 1.6rem;
  }
  
  .back-to-top {
    bottom: 75px;
    width: 44px;
    height: 44px;
    font-size: 1rem;
  }
  
  .utic-logo {
    height: 35px;
  }
  
  .bottom-link {
    font-size: 0.9rem;
  }
}

/* ========================================
   Accesibilidad
   ======================================== */
.social-btn:focus-visible,
.link-item:focus-visible,
.contact-value:focus-visible,
.btn-map:focus-visible,
.whatsapp-btn:focus-visible,
.back-to-top:focus-visible {
  outline: 3px solid var(--footer-accent);
  outline-offset: 3px;
}

/* ========================================
   Utilidades
   ======================================== */
.gy-4 { row-gap: 2rem !important; }
.gy-lg-0 { row-gap: 0 !important; }

@media (min-width: 992px) {
  .gy-lg-0 { row-gap: 0 !important; }
}
</style>

<script>
import { mapState } from "vuex";
import logger from '@/utils/logger'

export default {
  name: "FooterCustom",
    data() {
    return {
      showBackToTop: false
    }
  },
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

        scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    
    handleScroll() {
      this.showBackToTop = window.scrollY > 400
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
    this.applyDynamicColors()
    window.addEventListener('scroll', this.handleScroll)
  },
  
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
};
</script>