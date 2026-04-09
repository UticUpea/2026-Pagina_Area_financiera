<template>
  <div>
    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-xl-7 col-lg-8">
            <div class="breadcrumb-inner">
              <h2 class="page-title" style="color: #fff !important;">
                {{ convocatoria.con_titulo || 'Detalle de Convocatoria' }}
              </h2>
              <ul class="page-list">
                <li>
                  <router-link to="/">INICIO</router-link>
                </li>
                <li>
                  <a style="cursor: pointer" @click="clickBack">
                    {{ convocatoria.tipo_conv_comun?.tipo_conv_comun_titulo || 'CONVOCATORIAS' }}
                  </a>
                </li>
                <li>{{ convocatoria.con_titulo || 'Convocatoria' }}</li>
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
              <h1>Convocatoria inexistente</h1>
              <p>La convocatoria que buscas no está disponible o fue eliminada.</p>
              <button class="btn btn-base mt-3" @click="clickBack">
                <i class="fa fa-arrow-left"></i> Volver a Convocatorias
              </button>
            </div>

            <div v-else-if="loading" class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Cargando...</span>
              </div>
              <p class="mt-3">Cargando información de la convocatoria...</p>
            </div>

            <div v-else-if="convocatoria.idconvocatorias">
              <div class="convocatoria-detail-card">
                <div class="row align-items-stretch">
          
                  <div class="col-md-6">
                    <div class="convocatoria-image-wrapper">
                      <img
                        :src="buildSafeImageUrl(convocatoria.con_foto_portada)"
                        :alt="convocatoria.con_titulo"
                        class="convocatoria-main-image"
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
                    <div class="convocatoria-details">
                      <div class="convocatoria-meta">
                        <span class="badge-convocatoria">
                          {{ convocatoria.tipo_conv_comun?.tipo_conv_comun_titulo || 'CONVOCATORIA' }}
                        </span>
                      </div>
                      
                      <h2 class="convocatoria-title">{{ convocatoria.con_titulo }}</h2>
                      
                      <div class="convocatoria-info-list">
                        <div class="info-item" v-if="convocatoria.con_fecha_inicio || convocatoria.con_fecha_fin">
                          <i class="fa fa-calendar"></i>
                          <div>
                            <strong>Vigencia:</strong>
                            <span>
                              {{ formatearFecha(convocatoria.con_fecha_inicio) }} - 
                              {{ formatearFecha(convocatoria.con_fecha_fin) }}
                            </span>
                          </div>
                        </div>
                        
                        <div class="info-item" v-if="convocatoria.con_referencia">
                          <i class="fa fa-info-circle"></i>
                          <div>
                            <strong>Referencia:</strong>
                            <span>{{ convocatoria.con_referencia }}</span>
                          </div>
                        </div>
                      </div>

                      <div class="convocatoria-description" v-if="convocatoria.con_descripcion">
                        <h4>Descripción de la Convocatoria</h4>
                        <p v-html="convocatoria.con_descripcion"></p>
                      </div>
                    </div>
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
        
        <div class="modal-image-wrapper">
          <img
            :src="buildSafeImageUrl(convocatoria.con_foto_portada)"
            :alt="convocatoria.con_titulo"
            class="modal-image"
          />
        </div>
        
        <div class="modal-info">
          <p class="modal-title">{{ convocatoria.con_titulo }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-overlay-img {
  background-image: url("@/assets/Fondo2.jpg");
}

.convocatoria-detail-card {
  background: white;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 0;
  width: 100%;
}

.convocatoria-image-wrapper {
  position: relative;
  border-radius: 12px 0 0 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  cursor: zoom-in;
  height: 100%;
  min-height: 600px;
}

.convocatoria-main-image {
  width: 100%;
  height: 100%;
  min-height: 600px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.convocatoria-image-wrapper:hover .convocatoria-main-image {
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

.convocatoria-image-wrapper:hover .zoom-indicator {
  opacity: 1;
}

.zoom-indicator i {
  font-size: 3rem;
}

.zoom-indicator span {
  font-size: 1rem;
  font-weight: 500;
}

.convocatoria-details {
  padding: 3rem 2.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.convocatoria-meta {
  margin-bottom: 2rem;
}

.badge-convocatoria {
  background: var(--main-color, #007bff);
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 30px;
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
}

.convocatoria-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 2.5rem;
  line-height: 1.2;
}

.convocatoria-info-list {
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

.convocatoria-description h4 {
  font-size: 1.8rem;
  color: var(--main-color, #007bff);
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.convocatoria-description p {
  line-height: 1.8;
  color: #555;
  font-size: 1.15rem;
  text-align: justify;
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 991px) {
  .convocatoria-image-wrapper {
    min-height: 500px;
    border-radius: 12px 12px 0 0;
  }
  
  .convocatoria-main-image {
    min-height: 500px;
  }
  
  .convocatoria-details {
    padding: 2rem 1.5rem;
  }
  
  .convocatoria-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .convocatoria-image-wrapper {
    min-height: 400px;
  }
  
  .convocatoria-main-image {
    min-height: 400px;
  }
  
  .convocatoria-details {
    padding: 1.5rem 1rem;
  }
  
  .convocatoria-title {
    font-size: 1.6rem;
  }
  
  .info-item {
    flex-direction: column;
    gap: 0.8rem;
  }
}

@media (max-width: 576px) {
  .convocatoria-image-wrapper {
    min-height: 350px;
  }
  
  .convocatoria-main-image {
    min-height: 350px;
  }
  
  .convocatoria-title {
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
  name: "DetalleConvocatoria",
  
  components: { 
    SidebarCustom 
  },
  
  data() {
    return {
      idInstitucion: config.app.idInstitucion || '22',
      convocatoria: {},
      loading: false,
      errorGet: false,
      showModal: false,
    };
  },
  
  computed: {
    ...mapState(["url_api", "Institucion"]),
  },

  methods: {
    async getConvocatoriaOne() {
      this.loading = true
      this.errorGet = false
      
      try {
        const idConv = this.$route.params.idConv
        const institucionId = this.idInstitucion || config.app.idInstitucion
        const res = await api.get(`/institucion/${institucionId}/gacetaEventos`)
        const data = res.data
        const lista = data.convocatorias || []
        this.convocatoria = lista.find(c => c.idconvocatorias == idConv) || {}

        if (!this.convocatoria.idconvocatorias) {
          this.errorGet = true
          console.warn('Convocatoria no encontrada con ID:', idConv)
          return
        }
        this.convocatoria = this._limpiarObjeto(this.convocatoria)
        
      } catch (error) {
        console.error('Error cargando convocatoria:', error)
        this.errorGet = true

        if (error.response?.status === 404) {
          console.warn('Convocatoria no encontrada (404)')
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

    openModal() {
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

    handleKeyPress(event) {
      if (!this.showModal) return;
      
      if (event.key === 'Escape') {
        this.closeModal();
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
    this.getConvocatoriaOne()
  },

  mounted() {
    this.applyDynamicColors();
  },

  beforeUnmount() {
    this.convocatoria = {}
    this.errorGet = false
    this.loading = false
    this.showModal = false
    window.removeEventListener('keydown', this.handleKeyPress);
    document.body.style.overflow = '';
  }
};
</script>