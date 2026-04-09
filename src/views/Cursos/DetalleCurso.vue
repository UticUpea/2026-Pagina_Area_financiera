<template>
  <div>
    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="breadcrumb-inner">
              <h2 class="page-title" style="color: #fff !important;">
                {{ curso.det_titulo || 'Detalle de Curso' }}
              </h2>
              <ul class="page-list">
                <li>
                  <router-link to="/">INICIO</router-link>
                </li>
                <li>
                  <a style="cursor: pointer" @click="clickBack">
                    {{ curso.tipo_curso_otro?.tipo_conv_curso_nombre || 'CURSOS' }}
                  </a>
                </li>
                <li>{{ curso.det_titulo || 'Curso' }}</li>
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
              <h1>Curso inexistente</h1>
              <p>El curso que buscas no está disponible o fue eliminado.</p>
              <button class="btn btn-base mt-3" @click="clickBack">
                <i class="fa fa-arrow-left"></i> Volver a Cursos
              </button>
            </div>

            <div v-else-if="loading" class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Cargando...</span>
              </div>
              <p class="mt-3">Cargando información del curso...</p>
            </div>

            <div v-else-if="curso.iddetalle_cursos_academicos">
              <div class="course-detail-card">
                <div class="row align-items-stretch">
                  
                  <div class="col-md-6">
                    <div class="course-image-wrapper">
                      <img
                        :src="buildSafeImageUrl(curso.det_img_portada)"
                        :alt="curso.det_titulo"
                        class="course-main-image"
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
                    <div class="course-details">
                      <div class="course-meta">
                        <span class="badge-course">
                          {{ curso.tipo_curso_otro?.tipo_conv_curso_nombre || 'CURSO' }}
                        </span>
                      </div>
                      
                      <h2 class="course-title">{{ curso.det_titulo }}</h2>
                      
                      <div class="course-info-list">
                        <div class="info-item" v-if="curso.det_costo">
                          <i class="fa fa-money"></i>
                          <div>
                            <strong>Costo General:</strong>
                            <span>{{ curso.det_costo }} Bs</span>
                          </div>
                        </div>
                        
                        <div class="info-item" v-if="curso.det_costo_profe">
                          <i class="fa fa-briefcase"></i>
                          <div>
                            <strong>Costo Profesional:</strong>
                            <span>{{ curso.det_costo_profe }} Bs</span>
                          </div>
                        </div>
                        
                        <div class="info-item" v-if="curso.det_costo_ext">
                          <i class="fa fa-globe"></i>
                          <div>
                            <strong>Costo Exterior:</strong>
                            <span>{{ curso.det_costo_ext }} Bs</span>
                          </div>
                        </div>
                        
                        <div class="info-item" v-if="curso.det_fecha_ini">
                          <i class="fa fa-calendar"></i>
                          <div>
                            <strong>Fecha Inicio:</strong>
                            <span>{{ formatearFecha(curso.det_fecha_ini) }}</span>
                          </div>
                        </div>
                        
                        <div class="info-item" v-if="curso.det_fecha_fin">
                          <i class="fa fa-calendar-check-o"></i>
                          <div>
                            <strong>Fecha Fin:</strong>
                            <span>{{ formatearFecha(curso.det_fecha_fin) }}</span>
                          </div>
                        </div>
                        
                        <div class="info-item" v-if="curso.det_hora_ini">
                          <i class="fa fa-clock-o"></i>
                          <div>
                            <strong>Hora Inicio:</strong>
                            <span>{{ curso.det_hora_ini }}</span>
                          </div>
                        </div>
                        
                        <div class="info-item" v-if="curso.det_carga_horaria">
                          <i class="fa fa-hourglass"></i>
                          <div>
                            <strong>Carga Horaria:</strong>
                            <span>{{ curso.det_carga_horaria }} hrs</span>
                          </div>
                        </div>
                        
                        <div class="info-item" v-if="curso.det_cupo_max">
                          <i class="fa fa-users"></i>
                          <div>
                            <strong>Cupos:</strong>
                            <span>{{ curso.det_cupo_max }} disponibles</span>
                          </div>
                        </div>
                        
                        <div class="info-item" v-if="curso.det_modalidad">
                          <i class="fa fa-laptop"></i>
                          <div>
                            <strong>Modalidad:</strong>
                            <span>{{ curso.det_modalidad }}</span>
                          </div>
                        </div>
                        
                        <div class="info-item" v-if="curso.det_lugar_curso">
                          <i class="fa fa-map-marker"></i>
                          <div>
                            <strong>Lugar:</strong>
                            <span>{{ curso.det_lugar_curso }}</span>
                          </div>
                        </div>
                      </div>

                      <div class="course-description" v-if="curso.det_descripcion">
                        <h4>Descripción del Curso</h4>
                        <p v-html="curso.det_descripcion"></p>
                      </div>

                      <div v-if="curso.det_grupo_whatssap" class="mt-3">
                        <a 
                          :href="curso.det_grupo_whatssap" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          class="btn-whatsapp"
                        >
                          <i class="fa fa-whatsapp"></i> Unirse al grupo de WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="curso.facilitadores && curso.facilitadores.length > 0" class="facilitators-section">
                  <h3 class="section-title">
                    <i class="fa fa-graduation-cap"></i> Facilitadores del Curso
                  </h3>
                  <div class="row">
                    <div
                      class="col-md-6"
                      v-for="(fac, index) of curso.facilitadores"
                      :key="fac.facilitador_id || index"
                    >
                      <div class="single-team-inner">
                        <div class="thumb">
                          <img
                            :src="buildSafeImageUrl(fac.foto_facilitador)"
                            :alt="fac.nombre_facilitador"
                            loading="lazy"
                          />
                        </div>
                        <div class="details pt-3">
                          <ul class="team-social-media">
                            <li>
                              <a 
                                v-if="fac.facebook_facilitador && fac.facebook_facilitador !== '_'"
                                :href="fac.facebook_facilitador.trim()" 
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i class="fa fa-facebook" aria-hidden="true"></i>
                              </a>
                            </li>
                            <li>
                              <a 
                                v-if="fac.celular_facilitador"
                                :href="'https://wa.me/591' + fac.celular_facilitador.replace(/[^0-9]/g, '')" 
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i class="fa fa-whatsapp" aria-hidden="true"></i>
                              </a>
                            </li>
                          </ul>
                          <h5>
                            <a>{{ fac.nombre_facilitador }}</a>
                            <span v-if="fac.cargo_facilitador"> - {{ fac.cargo_facilitador }}</span>
                          </h5>
                          <div class="mt-2" v-if="fac.descripcion_facilitador">
                            {{ fac.descripcion_facilitador }}
                          </div>
                          <p v-if="fac.celular_facilitador" class="mt-2 mb-0">
                            <i class="fa fa-phone"></i>&nbsp; +{{ fac.celular_facilitador }}
                          </p>
                        </div>
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
            :src="buildSafeImageUrl(curso.det_img_portada)"
            :alt="curso.det_titulo"
            class="modal-image"
          />
        </div>
        
        <div class="modal-info">
          <p class="modal-title">{{ curso.det_titulo }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-overlay-img {
  background-image: url("@/assets/Fondo2.jpg");
}

.course-detail-card {
  background: white;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 0;
  width: 100%;
}

.course-image-wrapper {
  position: relative;
  border-radius: 12px 0 0 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  cursor: zoom-in;
  height: 100%;
  min-height: 600px;
}

.course-main-image {
  width: 100%;
  height: 100%;
  min-height: 600px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.course-image-wrapper:hover .course-main-image {
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

.course-image-wrapper:hover .zoom-indicator {
  opacity: 1;
}

.zoom-indicator i {
  font-size: 3rem;
}

.zoom-indicator span {
  font-size: 1rem;
  font-weight: 500;
}

.course-details {
  padding: 3rem 2.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.course-meta {
  margin-bottom: 2rem;
}

.badge-course {
  background: var(--main-color, #007bff);
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 30px;
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
}

.course-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 2.5rem;
  line-height: 1.2;
}

.course-info-list {
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

.course-description h4 {
  font-size: 1.8rem;
  color: var(--main-color, #007bff);
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.course-description p {
  line-height: 1.8;
  color: #555;
  font-size: 1.15rem;
  text-align: justify;
}

.btn-whatsapp {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: #25D366;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
}

.btn-whatsapp:hover {
  background: #128C7E;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(37, 211, 102, 0.4);
  color: white;
}

.facilitators-section {
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

.single-team-inner {
  margin-bottom: 2rem;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  text-align: center;
}

.single-team-inner:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  transform: translateY(-5px);
}

.single-team-inner .thumb {
  margin-bottom: 1.5rem;
}

.single-team-inner img {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0 auto;
  display: block;
  border: 4px solid var(--main-color, #007bff);
}

.team-social-media {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.team-social-media a {
  color: #666;
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.team-social-media a:hover {
  color: var(--main-color, #007bff);
}

.single-team-inner h5 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.single-team-inner h5 a {
  color: #333;
  text-decoration: none;
}

.single-team-inner h5 span {
  color: #666;
  font-weight: 500;
  font-size: 1rem;
}

.single-team-inner p {
  color: #666;
  font-size: 1rem;
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
  .course-image-wrapper {
    min-height: 500px;
    border-radius: 12px 12px 0 0;
  }
  
  .course-main-image {
    min-height: 500px;
  }
  
  .course-details {
    padding: 2rem 1.5rem;
  }
  
  .course-title {
    font-size: 2rem;
  }
  
  .facilitators-section {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .course-image-wrapper {
    min-height: 400px;
  }
  
  .course-main-image {
    min-height: 400px;
  }
  
  .course-details {
    padding: 1.5rem 1rem;
  }
  
  .course-title {
    font-size: 1.6rem;
  }
  
  .info-item {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .facilitators-section {
    padding: 1.5rem 1rem;
  }
  
  .single-team-inner img {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 576px) {
  .course-image-wrapper {
    min-height: 350px;
  }
  
  .course-main-image {
    min-height: 350px;
  }
  
  .course-title {
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
  name: "DetalleCurso",
  
  components: { 
    SidebarCustom 
  },
  
  data() {
    return {
      idInstitucion: config.app.idInstitucion || '22',
      curso: {},
      loading: false,
      errorGet: false,
      showModal: false,
    };
  },
  
  computed: {
    ...mapState(["url_api", "Institucion"]),
  },

  methods: {
    async getCursoOne() {
      this.loading = true
      this.errorGet = false
      
      try {
        const idCur = this.$route.params.idCur
        const institucionId = this.idInstitucion || config.app.idInstitucion
        
        const res = await api.get(`/institucion/${institucionId}/gacetaEventos`)
        const data = res.data

        const lista = data.cursos || []
        this.curso = lista.find(c => String(c.iddetalle_cursos_academicos) === String(idCur)) || {}

        if (!this.curso.iddetalle_cursos_academicos) {
          this.errorGet = true
          console.warn('Curso no encontrado con ID:', idCur)
          return
        }

        this.curso = this._limpiarObjeto(this.curso)
        
      } catch (error) {
        console.error('Error cargando curso:', error)
        this.errorGet = true

        if (error.response?.status === 404) {
          console.warn('Curso no encontrado (404)')
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
    this.getCursoOne()
  },

  mounted() {
    this.applyDynamicColors();
  },

  beforeUnmount() {
    this.curso = {}
    this.errorGet = false
    this.loading = false
    this.showModal = false
    window.removeEventListener('keydown', this.handleKeyPress);
    document.body.style.overflow = '';
  }
};
</script>