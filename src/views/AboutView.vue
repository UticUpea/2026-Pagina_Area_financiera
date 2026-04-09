<template>
  <div id="about">

    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-lg-7">
            <div class="breadcrumb-inner">
              <h2 class="page-title">SOBRE NOSOTROS</h2>
              <p class="page-subtitle">Conoce nuestra trayectoria y compromiso</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section id="nosotros" class="section-elegant">
      <div class="about-area about-right-bg-half bg-gray pd-top-50 pd-bottom-90">
        <div class="container pd-top-60">
          <div class="section-header text-center mb-5">
            <span class="section-badge">Nuestra Historia</span>
            <h2 class="section-title-main">Sobre la carrera</h2>
            <div class="section-divider"></div>
          </div>
          
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="content-card">

                <div 
                  class="content-text content-text-about" 
                  :class="{ 'text-truncated': !showFullText }"
                  v-html="sanitizeHtml(institucion.institucion_sobre_ins)"
                ></div>
                <button 
                  v-if="isTextLong"
                  @click="toggleText" 
                  class="btn-read-more"
                >
                  {{ showFullText ? 'Ver menos' : 'Ver más' }}
                  <i :class="showFullText ? 'fa fa-chevron-up' : 'fa fa-chevron-down'"></i>
                </button>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="image-card">
                <img 
                  src="@/assets/perfil.jpg" 
                  alt="Imagen institucional" 
                  class="img-elegant"
                  loading="lazy"
                />
                <div class="image-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Historia -->
      <div class="container py-5">
        <div class="row align-items-center">
          <div class="col-lg-3">
            <div class="icon-box">
              <img 
                :src="buildSafeImageUrl(institucion.institucion_logo)" 
                alt="Logo institucional" 
                class="logo-elegant"
                loading="lazy"
              />
            </div>
          </div>
          <div class="col-lg-9">
            <div class="content-card">
              <h3 class="subsection-title">Historia de la institución</h3>
              <p class="content-text" v-html="sanitizeHtml(institucion.institucion_historia)"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section id="mision" class="section-elegant section-alt">
      <div class="bg-cover about-area pd-top-50 pd-bottom-90">
        <div class="container">
          <div class="section-header text-center mb-5">
            <span class="section-badge">Nuestros Pilares</span>
            <h2 class="section-title-main">{{ sanitizeText(institucion.institucion_nombre) }}</h2>
            <div class="section-divider"></div>
          </div>

          <div class="row">
            <!-- Misión -->
            <div class="col-lg-6">
              <div class="card-elegant card-mision">
                <div class="card-icon">
                  <i class="fa fa-bullseye"></i>
                </div>
                <h3 class="card-title">Misión</h3>
                <div class="card-divider"></div>
                <p class="card-text" v-html="sanitizeHtml(institucion.institucion_mision)"></p>
              </div>
            </div>

            <!-- Visión -->
            <div class="col-lg-6">
              <div class="card-elegant card-vision">
                <div class="card-icon">
                  <i class="fa fa-eye"></i>
                </div>
                <h3 class="card-title">Visión</h3>
                <div class="card-divider"></div>
                <p class="card-text" v-html="sanitizeHtml(institucion.institucion_vision)"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN: AUTORIDADES -->
    <section id="autoridades" class="section-elegant">
      <div class="team-area pd-top-115 pd-bottom-60">
        <div class="container">
          <div class="section-header text-center mb-5">
            <span class="section-badge">Liderazgo</span>
            <h2 class="section-title-main">Nuestras autoridades</h2>
            <div class="section-divider"></div>
          </div>
          
          <div class="row justify-content-center">
            <div 
              class="col-lg-4 col-md-6" 
              v-for="(autoridad, index) of autoridades" 
              :key="autoridad.id_autoridad || index"
              v-show="(pag - 1) * NUM_RESULTS <= index && pag * NUM_RESULTS > index"
            >
              <div class="team-card">
                <div class="team-image">
                  <img 
                    :src="buildSafeImageUrl(autoridad.foto_autoridad)" 
                    :alt="sanitizeText(autoridad.nombre_autoridad) || 'Autoridad'"
                    loading="lazy"
                  />
                  <div class="team-overlay">
                    <div class="team-social">
                      <a 
                        v-if="isValidPhone(autoridad.celular_autoridad)"
                        :href="buildWhatsAppLink(autoridad.celular_autoridad)" 
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-link whatsapp"
                        aria-label="WhatsApp"
                      >
                        <i class="fa fa-whatsapp"></i>
                      </a>
                      <a 
                        v-if="isValidUrl(autoridad.facebook_autoridad)"
                        :href="buildSafeUrl(autoridad.facebook_autoridad)" 
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-link facebook"
                        aria-label="Facebook"
                      >
                        <i class="fa fa-facebook"></i>
                      </a>
                      <a 
                        v-if="isValidUrl(autoridad.twiter_autoridad)"
                        :href="buildSafeUrl(autoridad.twiter_autoridad)" 
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-link twitter"
                        aria-label="Twitter"
                      >
                        <i class="fa fa-twitter"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="team-info">
                  <h4 class="team-name">{{ sanitizeText(autoridad.nombre_autoridad) }}</h4>
                  <span class="team-role">{{ sanitizeText(autoridad.cargo_autoridad) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Paginación elegante -->
          <nav class="col-12 td-page-navigation text-center mt-5" v-if="pager > 1">
            <ul class="pagination-elegant justify-content-center">
              <li class="page-item" :class="{ disabled: pag === 1 }">
                <a class="page-link" href="#" @click.prevent="changePage(pag - 1)">
                  <i class="fa fa-angle-left"></i>
                </a>
              </li>
              <li 
                v-for="page in visiblePages" 
                :key="page"
                class="page-item" 
                :class="{ active: page === pag }"
              >
                <a class="page-link" href="#" @click.prevent="changePage(page)">
                  {{ page }}
                </a>
              </li>
              <li class="page-item" :class="{ disabled: pag === pager }">
                <a class="page-link" href="#" @click.prevent="changePage(pag + 1)">
                  <i class="fa fa-angle-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
    
    <!-- SECCIÓN: CONTACTO -->
    <section id="contacto" class="section-elegant section-alt">
      <div class="contact-area pd-top-50 pd-bottom-90">
        <div class="container">
          <div class="section-header text-center mb-5">
            <span class="section-badge">Contáctanos</span>
            <h2 class="section-title-main">Contáctese con nosotros</h2>
            <div class="section-divider"></div>
          </div>
          
          <div class="row">
            <!-- Información de contacto -->
            <div class="col-lg-5">
              <div class="contact-card">
                <div class="contact-item">
                  <div class="contact-icon">
                    <i class="fa fa-phone"></i>
                  </div>
                  <div class="contact-details">
                    <h5>Celular</h5>
                    <p>{{ formatPhone(institucion.institucion_celular1) }}</p>
                  </div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">
                    <i class="fa fa-phone"></i>
                  </div>
                  <div class="contact-details">
                    <h5>Teléfono</h5>
                    <p>{{ formatPhone(institucion.institucion_telefono1) }}</p>
                  </div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">
                    <i class="fa fa-envelope"></i>
                  </div>
                  <div class="contact-details">
                    <h5>Correo</h5>
                    <a :href="buildMailTo(institucion.institucion_correo1)">
                      {{ sanitizeText(institucion.institucion_correo1) }}
                    </a>
                  </div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">
                    <i class="fa fa-facebook"></i>
                  </div>
                  <div class="contact-details">
                    <h5>Facebook</h5>
                    <a 
                      v-if="isValidUrl(institucion.institucion_facebook)"
                      :href="buildSafeUrl(institucion.institucion_facebook)" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {{ sanitizeText(extractDomain(institucion.institucion_facebook)) }}
                    </a>
                  </div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">
                    <i class="fa fa-youtube"></i>
                  </div>
                  <div class="contact-details">
                    <h5>YouTube</h5>
                    <a 
                      v-if="isValidUrl(institucion.institucion_youtube)"
                      :href="buildSafeUrl(institucion.institucion_youtube)" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {{ sanitizeText(extractDomain(institucion.institucion_youtube)) }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Mapa -->
            <div class="col-lg-7">
              <div class="map-card">
                <h4 class="map-title">
                  <i class="fa fa-map-marker"></i> {{ sanitizeText(institucion.institucion_direccion) }}
                </h4>
                <iframe 
                  v-if="isValidEmbedUrl(institucion.institucion_api_google_map)"
                  :src="buildSafeEmbedUrl(institucion.institucion_api_google_map)"
                  width="100%" 
                  height="400" 
                  style="border:0;" 
                  allowfullscreen="" 
                  loading="lazy"
                  title="Ubicación en mapa"
                  referrerpolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms">
                </iframe>
                <div v-else class="map-placeholder">
                  <i class="fa fa-map-marker"></i>
                  <p>Mapa no disponible</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.banner-img {
  background-image: url("@/assets/Fondo2.jpg") !important;
  background-repeat: no-repeat !important;
  background-attachment: fixed !important;
  background-size: cover !important;
  background-position: center center !important;
  position: relative;
  min-height: 300px;
  display: flex;
  align-items: center;
}

.bg-overlay {
  position: relative;
}

.bg-overlay::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%);
  z-index: 1;
}

.bg-overlay > * {
  position: relative;
  z-index: 2;
}

.breadcrumb-inner {
  padding: 80px 0;
  color: white;
}

.page-title {
  font-size: 5rem;
  font-weight: 700;
  color: white !important;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 0.6s ease;
}

.page-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  animation: fadeInUp 0.6s ease 0.2s both;
}

.section-elegant {
  padding: 60px 0;
}

.section-alt {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

/* Header de sección */
.section-header {
  margin-bottom: 3rem;
}

.section-badge {
  display: inline-block;
  padding: 0.4rem 1.2rem;
  background: linear-gradient(135deg, var(--main-color, #007bff) 0%, var(--main-color-2, #0056b3) 100%);
  color: white;
  border-radius: 50px;
  font-size: 1.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

.section-title-main {
  font-size: 2.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.section-divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--main-color, #007bff), transparent);
  margin: 0 auto;
  border-radius: 2px;
}

.content-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.content-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
}

.content-text {
  font-size: 1.7rem;
  line-height: 1.8;
  color: #495057;
  text-align: justify;
}

.content-text :deep(p) {
  margin-bottom: 1rem;
}

.content-text :deep(p):last-child {
  margin-bottom: 0;
}

.content-text.text-truncated {
  max-height: 250px;
  overflow: hidden;
  position: relative;
}

.content-text.text-truncated::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, transparent, white);
}

.btn-read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding: 0.6rem 1.5rem;
  background: linear-gradient(135deg, var(--main-color, #007bff) 0%, var(--main-color-2, #0056b3) 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

.btn-read-more:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
}

.btn-read-more i {
  font-size: 0.9rem;
  transition: transform 0.3s ease;
}

.btn-read-more:hover i {
  transform: translateY(-2px);
}

.content-text-about,
.content-text-about :deep(p),
.content-text-about :deep(span),
.content-text-about :deep(div),
.content-text-about :deep(strong),
.content-text-about :deep(em),
.content-text-about :deep(ul),
.content-text-about :deep(ol),
.content-text-about :deep(li) {
  font-size: 1.5rem !important;  /* ← CAMBIA ESTE VALOR PARA AJUSTAR TAMAÑO */
  line-height: 1.8 !important;
}


@media (max-width: 768px) {
  .content-text-about,
  .content-text-about :deep(p),
  .content-text-about :deep(span),
  .content-text-about :deep(div) {
    font-size: 1.3rem !important;  /* ← Más pequeño en móvil */
  }
}

@media (max-width: 576px) {
  .content-text-about,
  .content-text-about :deep(p),
  .content-text-about :deep(span),
  .content-text-about :deep(div) {
    font-size: 1.2rem !important;  /* ← Aún más pequeño en móvil pequeño */
  }
}

/* Imagen elegante */
.image-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
}

.img-elegant {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.image-card:hover .img-elegant {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-card:hover .image-overlay {
  opacity: 1;
}


.icon-box {
  text-align: center;
  padding: 1rem;
}

.logo-elegant {
  max-width: 200px;
  height: auto;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;
}

.logo-elegant:hover {
  transform: scale(1.05);
}

.card-elegant {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.4s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-elegant:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
}

.card-mision {
  border-top: 4px solid var(--main-color, #007bff);
}

.card-vision {
  border-top: 4px solid var(--main-color-2, #0056b3);
}

.card-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, var(--main-color, #007bff) 0%, var(--main-color-2, #0056b3) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
}

.card-icon i {
  font-size: 1.8rem;
  color: white;
}

.card-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.card-divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--main-color, #007bff), transparent);
  margin: 0 auto 1.5rem;
  border-radius: 2px;
}

.card-text {
  font-size: 1.5rem;
  line-height: 1.8;
  color: #495057;
  text-align: center;
  flex: 1;
}

.team-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  transition: all 0.4s ease;
}

.team-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
}

.team-image {
  position: relative;
  overflow: hidden;
  height: 280px;
}

.team-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.team-card:hover .team-image img {
  transform: scale(1.1);
}

.team-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.team-card:hover .team-overlay {
  transform: translateY(0);
}

.team-social {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.social-link.whatsapp {
  background: #25D366;
}

.social-link.facebook {
  background: #1877F2;
}

.social-link.twitter {
  background: #1DA1F2;
}

.social-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.team-info {
  padding: 1.5rem;
  text-align: center;
}

.team-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.3rem;
}

.team-role {
  font-size: 0.95rem;
  color: var(--main-color, #007bff);
  font-weight: 500;
}

.pagination-elegant {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.pagination-elegant .page-link {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  color: #495057;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.pagination-elegant .page-link:hover {
  background: var(--main-color, #007bff);
  border-color: var(--main-color, #007bff);
  color: white;
  transform: translateY(-2px);
}

.pagination-elegant .page-item.active .page-link {
  background: var(--main-color, #007bff);
  border-color: var(--main-color, #007bff);
  color: white;
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.pagination-elegant .page-item.disabled .page-link {
  opacity: 0.5;
  cursor: not-allowed;
}


.contact-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.2rem 0;
  border-bottom: 1px solid #f1f3f4;
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--main-color, #007bff) 0%, var(--main-color-2, #0056b3) 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.contact-details h5 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.2rem;
}

.contact-details p,
.contact-details a {
  font-size: 1.2rem;
  color: #6c757d;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-details a:hover {
  color: var(--main-color, #007bff);
}

/* Mapa */
.map-card {
  background: white;
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.map-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.map-title i {
  color: var(--main-color, #007bff);
}

.map-card iframe {
  border-radius: 12px;
}

.map-placeholder {
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  background: #f8f9fa;
  border-radius: 12px;
}

.map-placeholder i {
  font-size: 3rem;
  opacity: 0.3;
  margin-bottom: 1rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

a:focus-visible,
button:focus-visible,
.page-link:focus-visible {
  outline: 2px solid var(--main-color, #007bff);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}

@media (max-width: 991px) {
  .page-title {
    font-size: 2.2rem;
  }
  
  .section-title-main {
    font-size: 1.8rem;
  }
  
  .card-elegant {
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .banner-img {
    background-attachment: scroll !important;
    min-height: 280px;
  }
  
  .breadcrumb-inner {
    padding: 60px 0;
    text-align: center;
  }
  
  .page-title {
    font-size: 1.8rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .section-title-main {
    font-size: 1.5rem;
  }
  
  .content-card,
  .card-elegant,
  .contact-card {
    padding: 1.5rem;
  }
  
  .team-image {
    height: 240px;
  }
  
  .content-text.text-truncated {
    max-height: 200px;
  }
}

@media (max-width: 576px) {
  .banner-img {
    min-height: 240px;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .section-title-main {
    font-size: 1.3rem;
  }
  
  .card-icon {
    width: 60px;
    height: 60px;
  }
  
  .card-icon i {
    font-size: 1.5rem;
  }
  
  .pagination-elegant .page-link {
    width: 40px;
    height: 40px;
    font-size: 0.9rem;
  }
  
  .content-text.text-truncated {
    max-height: 180px;
  }
  
  .btn-read-more {
    width: 100%;
    justify-content: center;
  }
}
</style>

<script>
import { mapState } from "vuex";
import api from '@/plugins/axios'
import { config } from '@/config/env'

export default {
  name: "AboutView",
  
  data() {
    return {
      idInstitucion: config.app.idInstitucion || '22',
      institucion: {},
      autoridades: [],
      NUM_RESULTS: 3,
      pag: 1,
      pager: 0,
      loading: {
        institucion: false,
        contenido: false
      },
      showFullText: false,
      isTextLong: false
    };
  },
  
  computed: {
    ...mapState(["Institucion", "url_api"]),

    visiblePages() {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, this.pag - Math.floor(maxVisible / 2));
      let end = Math.min(this.pager, start + maxVisible - 1);
      
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      return pages;
    }
  },

  methods: {
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

    toggleText() {
      this.showFullText = !this.showFullText;
      if (this.showFullText) {
        this.$nextTick(() => {
          const contentCard = this.$el.querySelector('.content-card');
          if (contentCard) {
            contentCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });
      }
    },

    checkTextLength() {
      if (this.institucion.institucion_sobre_ins) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.sanitizeHtml(this.institucion.institucion_sobre_ins);
        const textLength = tempDiv.textContent || tempDiv.innerText || '';
        this.isTextLong = textLength.length > 300;
      }
    },

    buildSafeImageUrl(path) {
      if (!path) return require('@/assets/upea.png');
      const cleaned = String(path).trim();
      if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
        return cleaned.replace('http://', 'https://');
      }
      const base = config.uploads?.baseUrl?.replace(/\/+$/, '');
      if (!base) return require('@/assets/upea.png');
      const resource = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
      return `${base}${resource}`.replace(/\/+/g, '/');
    },

    buildSafeUrl(url) {
      if (!url) return '#';
      const cleaned = String(url).trim().toLowerCase();
      if (cleaned.startsWith('javascript:') || 
          cleaned.startsWith('') || 
          cleaned.startsWith('vbscript:') ||
          cleaned.startsWith('')) {
        console.warn('URL bloqueada por seguridad:', url);
        return '#';
      }
      if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
        return cleaned.replace('http://', 'https://');
      }
      return `https://${String(url).trim()}`;
    },

    buildSafeEmbedUrl(url) {
      if (!url) return '';
      const cleaned = String(url).trim().toLowerCase();
      if (cleaned.includes('google.com/maps') || cleaned.includes('google.com/maps/embed')) {
        return cleaned.replace('http://', 'https://');
      }
      console.warn('Embed URL no permitido:', url);
      return '';
    },

    isValidEmbedUrl(url) {
      if (!url) return false;
      const cleaned = String(url).trim().toLowerCase();
      return cleaned.includes('google.com/maps') || cleaned.includes('google.com/maps/embed');
    },

    isValidUrl(url) {
      if (!url) return false;
      const cleaned = String(url).trim().toLowerCase();
      if (cleaned.startsWith('javascript:') || 
          cleaned.startsWith('') || 
          cleaned.startsWith('vbscript:')) {
        return false;
      }
      return cleaned.length > 0 && cleaned !== '_';
    },

    buildMailTo(email) {
      if (!email) return '#';
      const cleaned = String(email).trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleaned)) return '#';
      return `mailto:${cleaned}`;
    },

    buildWhatsAppLink(phone) {
      if (!phone) return '#';
      const cleanPhone = String(phone).replace(/[^0-9]/g, '');
      if (cleanPhone.length < 8) return '#';
      return `https://wa.me/591${cleanPhone}`;
    },

    isValidPhone(phone) {
      if (!phone) return false;
      const cleaned = String(phone).replace(/[^0-9]/g, '');
      return cleaned.length >= 7 && cleaned.length <= 15;
    },

    formatPhone(phone) {
      if (!phone) return '';
      return String(phone).replace(/[^0-9]/g, '');
    },

    extractDomain(url) {
      if (!url) return '';
      try {
        const cleaned = String(url).trim();
        if (cleaned.startsWith('http')) {
          const urlObj = new URL(cleaned);
          return urlObj.hostname.replace('www.', '');
        }
        return cleaned;
      } catch {
        return String(url).trim();
      }
    },

    sanitizeHtml(html) {
      if (!html) return '';
      const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'hr'];
      let sanitized = String(html)
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/\son\w+\s*=\s*[^\s>]+/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/<([^>]+)>/g, (match, tag) => {
          const tagName = tag.split(/\s/)[0].toLowerCase();
          return allowedTags.includes(tagName) ? match : '';
        });
      return sanitized;
    },

    sanitizeText(text) {
      if (!text) return '';
      return String(text).trim()
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]*>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    },

    async getInstitucionData() {
      this.loading.institucion = true;
      try {
        const institucionId = this.idInstitucion || config.app.idInstitucion;
        const res = await api.get(`/institucionesPrincipal/${institucionId}`);
        const data = res.data.Descripcion;
        this.institucion = this._limpiarObjeto(data);
        this.$store.commit('setInstitucion', this.institucion);
        this.$nextTick(() => {
          this.checkTextLength();
        });
      } catch (error) {
        console.error('Error cargando institución:', error);
      } finally {
        this.loading.institucion = false;
      }
    },

    async getAutoridades() {
      this.loading.contenido = true;
      try {
        const institucionId = this.idInstitucion || config.app.idInstitucion;
        const res = await api.get(`/institucion/${institucionId}/contenido`);
        const data = res.data;
        this.autoridades = data.autoridad?.map(this._limpiarObjeto) || [];
        this._actualizarPager();
      } catch (error) {
        console.error('Error cargando autoridades:', error);
      } finally {
        this.loading.contenido = false;
        this.$store.commit("loading");
      }
    },

    _actualizarPager() {
      const total = this.autoridades?.length || 0;
      this.pager = Math.ceil(total / this.NUM_RESULTS);
    },

    changePage(page) {
      if (page >= 1 && page <= this.pager && page !== this.pag) {
        this.pag = page;
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    },

    _limpiarObjeto(obj) {
      if (!obj || typeof obj !== 'object') return obj;
      const cleaned = { ...obj };
      Object.keys(cleaned).forEach(key => {
        if (typeof cleaned[key] === 'string') {
          cleaned[key] = cleaned[key].trim();
        } else if (cleaned[key] && typeof cleaned[key] === 'object' && !Array.isArray(cleaned[key])) {
          cleaned[key] = this._limpiarObjeto(cleaned[key]);
        }
      });
      return cleaned;
    }
  },

watch: {
  Institucion: {
    handler() {
      this.applyDynamicColors();
    },
    deep: true,
    immediate: true
  },
  

  '$route'(to, from) {

    if (to.path === from.path && to.hash && to.hash !== from.hash) {
      this.$nextTick(() => {
        setTimeout(() => {
          const element = document.getElementById(to.hash.replace('#', ''));
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 100, 
              behavior: 'smooth'
            });
          }
        }, 10);
      });
    }
  }
},

  created() {
    this.$store.commit("loadOn");
    this.applyDynamicColors();
    
    Promise.all([this.getInstitucionData(), this.getAutoridades()]).then(() => {
      this.$store.commit("loadOff");
    });
  },

  mounted() {

    if (this.$route.hash) {
      this.$nextTick(() => {
        const sectionId = this.$route.hash.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        }
      });
    }
  }
};
</script>