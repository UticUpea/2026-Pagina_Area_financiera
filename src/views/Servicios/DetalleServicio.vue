<template>
  <div>
    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="breadcrumb-inner">
              <h2 class="page-title" style="color: #fff !important;">
                {{ servicio.serv_nombre || 'Detalle del Servicio' }}
              </h2>
              <ul class="page-list">
                <li>
                  <router-link to="/">INICIO</router-link>
                </li>
                <li>
                  <a style="cursor: pointer" @click="clickBack">SERVICIOS</a>
                </li>
                <li>{{ servicio.serv_nombre || 'Servicio' }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main-blog-area pd-top-120 pd-bottom-120">
      <div class="container">
        <div class="row">

          <div class="col-lg-8 col-12">
            <div v-if="errorGet" class="text-center">
              <h1>Servicio inexistente</h1>
              <p>El servicio que buscas no está disponible o fue eliminado.</p>
              <button class="btn btn-base mt-3" @click="clickBack">
                <i class="fa fa-arrow-left"></i> Volver a Servicios
              </button>
            </div>

            <div v-else-if="loading" class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Cargando...</span>
              </div>
              <p class="mt-3">Cargando información del servicio...</p>
            </div>

            <div v-else-if="servicio.serv_id">
              <div class="servicio-detail-card">
                <div class="row align-items-stretch">
  
                  <div class="col-md-6">
                    <div class="servicio-image-wrapper">
                      <img
                        :src="buildSafeImageUrl(servicio.serv_imagen)"
                        :alt="servicio.serv_nombre"
                        class="servicio-main-image"
                        @click="openModal"
                        loading="lazy"
                      />
                      <div class="zoom-indicator" @click="openModal">
                        <i class="fa fa-search-plus"></i>
                        <span>Click para ampliar</span>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="servicio-details">
                      <div class="servicio-meta">
                        <span class="badge-servicio">SERVICIO</span>
                      </div>
                      
                      <h2 class="servicio-title">{{ servicio.serv_nombre }}</h2>
                      
                      <div class="servicio-info-list">
                        <div class="info-item" v-if="servicio.serv_nro_celular">
                          <i class="fa fa-phone"></i>
                          <div>
                            <strong>Teléfono:</strong>
                            <span>{{ servicio.serv_nro_celular }}</span>
                          </div>
                        </div>
                        
                        <div class="info-item" v-if="servicio.serv_registro">
                          <i class="fa fa-calendar"></i>
                          <div>
                            <strong>Fecha de Registro:</strong>
                            <span>{{ formatearFecha(servicio.serv_registro) }}</span>
                          </div>
                        </div>
                      </div>

                      <div class="servicio-description" v-if="servicio.serv_descripcion">
                        <h4>Descripción del Servicio</h4>
                        <p v-html="servicio.serv_descripcion"></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="allImages && allImages.length > 0" class="gallery-section">
                  <h3 class="section-title">
                    <i class="fa fa-images"></i> Galería de Imágenes
                  </h3>
                  <div class="row">
                    <div
                      class="col-md-4 col-sm-6 mb-4"
                      v-for="(img, index) in displayedImages"
                      :key="index"
                    >
                      <div class="gallery-item" @click="openModal(index + 1)">
                        <img
                          :src="buildSafeImageUrl(img.serv_imagen)"
                          :alt="servicio.serv_nombre + ' - imagen ' + (index + 1)"
                          loading="lazy"
                        />
                        <div class="overlay">
                          <i class="fa fa-search-plus"></i>
                        </div>
                      </div>
                    </div>
                    
                    <nav
                      class="col-12 td-page-navigation text-center mb-5 mb-lg-0"
                      v-if="pager > 1"
                    >
                      <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: pag === 1 }">
                          <a class="page-link" href="#" @click.prevent="changePage(pag - 1)">
                            <i class="fa fa-angle-left"></i> Anterior
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
                            Siguiente <i class="fa fa-angle-right"></i>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-12">
            <div class="td-sidebar">
              <SidebarCustom></SidebarCustom>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    <div 
      v-if="showModal" 
      class="image-modal-overlay" 
      @click="closeModal"
      @keyup.esc="closeModal"
      tabindex="0"
    >
      <div class="image-modal-content" @click.stop>
        <button class="modal-close" @click="closeModal" aria-label="Cerrar modal">
          <i class="fa fa-times"></i>
        </button>
        
        <button 
          v-if="allImages.length > 1" 
          class="modal-nav modal-prev" 
          @click="previousImage"
          aria-label="Imagen anterior"
        >
          <i class="fa fa-chevron-left"></i>
        </button>
        
        <button 
          v-if="allImages.length > 1" 
          class="modal-nav modal-next" 
          @click="nextImage"
          aria-label="Imagen siguiente"
        >
          <i class="fa fa-chevron-right"></i>
        </button>
        
        <div class="modal-image-wrapper">
          <img
            :src="currentImageUrl"
            :alt="currentImageAlt"
            class="modal-image"
          />
        </div>
        
        <div class="modal-info">
          <p class="modal-title">{{ currentImageAlt }}</p>
          <p class="modal-counter" v-if="allImages.length > 1">
            {{ currentImageIndex + 1 }} de {{ allImages.length }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-overlay-img {
  background-image: url("@/assets/Fondo2.jpg");
}

.servicio-detail-card {
  background: white;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 0;
  width: 100%;
}

.servicio-image-wrapper {
  position: relative;
  border-radius: 12px 0 0 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  cursor: zoom-in;
  height: 100%;
  min-height: 600px;
}

.servicio-main-image {
  width: 100%;
  height: 100%;
  min-height: 600px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.servicio-image-wrapper:hover .servicio-main-image {
  transform: scale(1.05);
}

.zoom-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  padding: 2rem 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.servicio-image-wrapper:hover .zoom-indicator {
  opacity: 1;
}

.zoom-indicator i {
  font-size: 3rem;
}

.zoom-indicator span {
  font-size: 1rem;
  font-weight: 500;
}

.servicio-details {
  padding: 3rem 2.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.servicio-meta {
  margin-bottom: 2rem;
}

.badge-servicio {
  background: var(--main-color, #007bff);
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 30px;
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
}

.servicio-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 2.5rem;
  line-height: 1.2;
}

.servicio-info-list {
  margin-bottom: 2.5rem;
}

.info-item {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  margin-bottom: 1.2rem;
  padding: 1.2rem;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 5px solid var(--main-color, #007bff);
}

.info-item i {
  font-size: 1.8rem;
  color: var(--main-color, #007bff);
  margin-top: 0.2rem;
}

.info-item strong {
  display: block;
  color: #333;
  margin-bottom: 0.3rem;
  font-size: 1.1rem;
  font-weight: 700;
}

.info-item span {
  color: #666;
  font-size: 1.15rem;
  line-height: 1.5;
}

.servicio-description h4 {
  font-size: 1.8rem;
  color: var(--main-color, #007bff);
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.servicio-description p {
  line-height: 1.8;
  color: #555;
  font-size: 1.15rem;
  text-align: justify;
}

.gallery-section {
  padding: 3rem 2.5rem;
  border-top: 1px solid #e0e0e0;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2.5rem;
  text-align: center;
}

.section-title i {
  color: var(--main-color, #007bff);
  margin-right: 0.5rem;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  aspect-ratio: 4/3;
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.gallery-item .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .overlay {
  opacity: 1;
}

.gallery-item .overlay i {
  color: white;
  font-size: 2.5rem;
}

.pagination {
  margin: 0;
}

.page-item {
  margin: 0 0.25rem;
}

.page-link {
  padding: 0.5rem 1rem;
  color: #333;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.page-link:hover {
  background: var(--main-color, #007bff);
  color: white;
  border-color: var(--main-color, #007bff);
}

.page-item.active .page-link {
  background: var(--main-color, #007bff);
  color: white;
  border-color: var(--main-color, #007bff);
}

.page-item.disabled .page-link {
  opacity: 0.5;
  cursor: not-allowed;
}

.image-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
  outline: none;
}

.image-modal-content {
  position: relative;
  max-width: 95vw;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-close {
  position: absolute;
  top: -50px;
  right: 0;
  background: transparent;
  border: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-close:hover {
  color: var(--main-color, #007bff);
  transform: rotate(90deg);
}

.modal-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-nav:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-50%) scale(1.1);
}

.modal-prev {
  left: -80px;
}

.modal-next {
  right: -80px;
}

.modal-image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 90vw;
  max-height: 80vh;
}

.modal-image {
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
}

.modal-info {
  margin-top: 1.5rem;
  text-align: center;
  color: white;
}

.modal-title {
  font-size: 1.2rem;
  margin: 0;
  font-weight: 500;
}

.modal-counter {
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 991px) {
  .servicio-image-wrapper {
    min-height: 500px;
    border-radius: 12px 12px 0 0;
  }
  
  .servicio-main-image {
    min-height: 500px;
  }
  
  .servicio-details {
    padding: 2rem 1.5rem;
  }
  
  .servicio-title {
    font-size: 2rem;
  }
  
  .gallery-section {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .servicio-image-wrapper {
    min-height: 400px;
  }
  
  .servicio-main-image {
    min-height: 400px;
  }
  
  .servicio-details {
    padding: 1.5rem 1rem;
  }
  
  .servicio-title {
    font-size: 1.6rem;
  }
  
  .info-item {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .gallery-section {
    padding: 1.5rem 1rem;
  }
}

@media (max-width: 576px) {
  .servicio-image-wrapper {
    min-height: 350px;
  }
  
  .servicio-main-image {
    min-height: 350px;
  }
  
  .servicio-title {
    font-size: 1.4rem;
  }
  
  .zoom-indicator {
    padding: 1.5rem;
  }
  
  .zoom-indicator i {
    font-size: 2rem;
  }
  
  .modal-image {
    max-height: 60vh;
  }
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.text-center h1 {
  color: var(--main-color, #dc3545);
  margin-bottom: 1rem;
}

.btn-base {
  background: var(--main-color, #007bff);
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-base:hover {
  background: var(--main-color-2, #0056b3);
}
</style>

<script>
import { mapState } from "vuex";
import SidebarCustom from "@/components/SidebarCustom.vue";
import api from '@/plugins/axios'
import { config } from '@/config/env'

export default {
  name: "DetalleServicio",
  
  components: {
    SidebarCustom,
  },
  
  data() {
    return {
      idInstitucion: config.app.idInstitucion || '22',
      servicio: {},
      loading: false,
      errorGet: false,
      NUM_RESULTS: 3,
      pag: 1,
      pager: 0,
      showModal: false,
      currentImageIndex: 0,
      allImages: []
    };
  },
  
  computed: {
    ...mapState(["url_api", "Institucion"]),

    displayedImages() {
      if (!this.allImages || this.allImages.length === 0) {
        return [];
      }
      const start = (this.pag - 1) * this.NUM_RESULTS;
      const end = start + this.NUM_RESULTS;
      return this.allImages.slice(start, end);
    },

    currentImageUrl() {
      if (!this.allImages || !this.allImages[this.currentImageIndex]) {
        return '';
      }
      const img = this.allImages[this.currentImageIndex];
      return this.buildSafeImageUrl(img.serv_imagen);
    },

    currentImageAlt() {
      if (!this.servicio.serv_nombre) {
        return 'Imagen del servicio';
      }
      return this.servicio.serv_nombre + ' - Imagen ' + (this.currentImageIndex + 1);
    },

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
    async getServicioOne() {
      this.loading = true
      this.errorGet = false
      
      try {
        const idServ = this.$route.params.idServ
        const institucionId = this.idInstitucion || config.app.idInstitucion
        
        const res = await api.get(`/institucion/${institucionId}/gacetaEventos`)
        const data = res.data
        
        const lista = data.serviciosCarrera || []
        this.servicio = lista.find(s => s.serv_id == idServ) || {}
        
        if (!this.servicio.serv_id) {
          this.errorGet = true
          console.warn('Servicio no encontrado con ID:', idServ)
          return
        }
        
        this.servicio = this._limpiarObjeto(this.servicio)

        const galleryImages = Array.isArray(this.servicio.imagen) ? this.servicio.imagen : [];
        const mainImage = this.servicio.serv_imagen ? [{ serv_imagen: this.servicio.serv_imagen }] : [];
        this.allImages = [...mainImage, ...galleryImages];
        
        this._actualizarPager()
        
      } catch (error) {
        console.error('Error cargando servicio:', error)
        this.errorGet = true
        if (error.response?.status === 404) {
          console.warn('Servicio no encontrado (404)')
        } else if (error.response?.status === 500) {
          console.error('Error del servidor (500)')
        }
      } finally {
        this.loading = false
        this.$store.commit("loading")
      }
    },

    buildSafeImageUrl(path) {
      if (!path) return '';
      
      const cleaned = String(path).trim();
      
      if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
        return cleaned.replace('http://', 'https://');
      }
      
      const base = config.uploads.baseUrl?.replace(/\/+$/, '');
      const resource = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
      
      return `${base}${resource}`.replace(/\/+/g, '/');
    },

    _actualizarPager() {
      const total = this.allImages?.length || 0
      this.pager = Math.ceil(total / this.NUM_RESULTS)

      if (this.pag > this.pager && this.pager > 0) {
        this.pag = this.pager
      }
    },

    changePage(page) {
      if (page >= 1 && page <= this.pager && page !== this.pag) {
        this.pag = page;
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    },

    openModal(index, source) {
      let globalIndex = index || 0;
      
      if (source === 'gallery') {
        globalIndex = index + 1;
      }
      
      this.currentImageIndex = globalIndex;
      this.showModal = true;
      document.body.style.overflow = 'hidden';
      
      this.$nextTick(() => {
        const modal = document.querySelector('.image-modal-overlay');
        if (modal) {
          modal.focus();
        }
      });
    },

    closeModal() {
      this.showModal = false;
      document.body.style.overflow = '';
    },

    previousImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      } else {
        this.currentImageIndex = this.allImages.length - 1;
      }
    },

    nextImage() {
      if (this.currentImageIndex < this.allImages.length - 1) {
        this.currentImageIndex++;
      } else {
        this.currentImageIndex = 0;
      }
    },

    handleKeyPress(event) {
      if (!this.showModal) return;
      
      if (event.key === 'Escape') {
        this.closeModal();
      } else if (event.key === 'ArrowLeft') {
        this.previousImage();
      } else if (event.key === 'ArrowRight') {
        this.nextImage();
      }
    },

    formatearFecha(fecha) {
      if (!fecha) return ''
      
      if (typeof fecha === 'string' && fecha.includes('de')) return fecha
      
      const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
      ]
      
      let fechaObj
      if (fecha.includes('T')) {
        fechaObj = new Date(fecha)
      } else {
        const partes = fecha.substr(0, 10).split("-")
        fechaObj = new Date(partes[0], parseInt(partes[1]) - 1, partes[2])
      }
      
      if (isNaN(fechaObj.getTime())) return fecha
      
      return `${fechaObj.getDate()} de ${meses[fechaObj.getMonth()]} de ${fechaObj.getFullYear()}`
    },

    _limpiarObjeto(obj) {
      if (!obj || typeof obj !== 'object') return obj
      const cleaned = { ...obj }
      Object.keys(cleaned).forEach(key => {
        if (typeof cleaned[key] === 'string') {
          cleaned[key] = cleaned[key].trim();
        } else if (cleaned[key] && typeof cleaned[key] === 'object' && !Array.isArray(cleaned[key])) {
          cleaned[key] = this._limpiarObjeto(cleaned[key]);
        }
      })
      return cleaned
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
      this.$store.commit("clickLink")
      this.$router.go(-1)
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
    showModal(newVal) {
      if (newVal) {
        window.addEventListener('keydown', this.handleKeyPress);
      } else {
        window.removeEventListener('keydown', this.handleKeyPress);
      }
    }
  },

  created() {
    this.$store.commit("loadOn")
    this.applyDynamicColors();
    this.getServicioOne()
  },

  mounted() {
    this.applyDynamicColors();
  },

  beforeUnmount() {
    this.servicio = {}
    this.errorGet = false
    this.pag = 1
    this.allImages = []
    this.showModal = false
    window.removeEventListener('keydown', this.handleKeyPress);
    document.body.style.overflow = '';
  }
};
</script>