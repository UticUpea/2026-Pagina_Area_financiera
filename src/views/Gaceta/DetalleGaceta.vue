<template>
  <div>
    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-xl-7 col-lg-8">
            <div class="breadcrumb-inner">
              <h2 class="page-title" style="color: #fff !important;">
                {{ gaceta.gaceta_titulo || 'Detalle de Gaceta' }}
              </h2>
              <ul class="page-list">
                <li>
                  <router-link to="/">INICIO</router-link>
                </li>
                <li>
                  <a style="cursor: pointer" @click="clickBack">GACETA</a>
                </li>
                <li>{{ gaceta.gaceta_titulo || 'Documento' }}</li>
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
              <h1>Documento inexistente</h1>
              <p>El documento que buscas no está disponible o fue eliminado.</p>
              <button class="btn btn-base mt-3" @click="clickBack">
                <i class="fa fa-arrow-left"></i> Volver a Gaceta
              </button>
            </div>

            <div v-else-if="loading" class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Cargando...</span>
              </div>
              <p class="mt-3">Cargando documento...</p>
            </div>

            <div v-else-if="gaceta.gaceta_id">
              <div class="gaceta-detail-card">
                <div class="row align-items-stretch">

                  <div class="col-md-6">
                    <div class="pdf-viewer-wrapper">
                      <vue-pdf-embed
                        :source="getSafePdfUrl(gaceta.gaceta_documento)"
                        :disableTextLayer="true"
                        class="pdf-viewer"
                      />
                      <div class="pdf-actions">
                        <a
                          :href="getSafePdfUrl(gaceta.gaceta_documento)"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="btn-pdf-open"
                        >
                          <i class="fa fa-external-link"></i> Abrir en nueva pestaña
                        </a>
                        <a
                          :href="getSafePdfUrl(gaceta.gaceta_documento)"
                          download
                          class="btn-pdf-download"
                        >
                          <i class="fa fa-download"></i> Descargar PDF
                        </a>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="gaceta-details">
                      <div class="gaceta-meta">
                        <span class="badge-gaceta">GACETA UNIVERSITARIA</span>
                      </div>
                      
                      <h2 class="gaceta-title">{{ gaceta.gaceta_titulo }}</h2>
                      
                      <div class="gaceta-info-list">
                        <div class="info-item" v-if="gaceta.gaceta_fecha">
                          <i class="fa fa-calendar"></i>
                          <div>
                            <strong>Fecha de Publicación:</strong>
                            <span>{{ formatearFecha(gaceta.gaceta_fecha) }}</span>
                          </div>
                        </div>
                        
                        <div class="info-item" v-if="gaceta.gaceta_tipo">
                          <i class="fa fa-tag"></i>
                          <div>
                            <strong>Tipo:</strong>
                            <span>{{ gaceta.gaceta_tipo }}</span>
                          </div>
                        </div>
                      </div>

                      <div class="gaceta-description" v-if="gaceta.gaceta_descripcion">
                        <h4>Descripción del Documento</h4>
                        <p v-html="gaceta.gaceta_descripcion"></p>
                      </div>

                      <div class="pdf-info-box">
                        <i class="fa fa-info-circle"></i>
                        <p>
                          <strong>Nota:</strong> El documento se carga en el visor de la izquierda. 
                          Puedes abrirlo en una nueva pestaña o descargarlo para verlo en pantalla completa.
                        </p>
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
  </div>
</template>

<style scoped>
.bg-overlay-img {
  background-image: url("@/assets/Fondo2.jpg");
}

.gaceta-detail-card {
  background: white;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 0;
  width: 100%;
}

.pdf-viewer-wrapper {
  position: relative;
  border-radius: 12px 0 0 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  height: 100%;
  min-height: 600px;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.pdf-viewer {
  flex: 1;
  width: 100%;
  min-height: 500px;
}

.pdf-viewer :deep(canvas) {
  max-width: 100%;
  height: auto !important;
  display: block;
  margin: 0 auto;
}

.pdf-actions {
  padding: 1rem;
  background: white;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-pdf-open,
.btn-pdf-download {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-pdf-open {
  background: var(--main-color, #007bff);
  color: white;
}

.btn-pdf-open:hover {
  background: var(--main-color-2, #0056b3);
  transform: translateY(-2px);
}

.btn-pdf-download {
  background: #28a745;
  color: white;
}

.btn-pdf-download:hover {
  background: #218838;
  transform: translateY(-2px);
}

.gaceta-details {
  padding: 3rem 2.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.gaceta-meta {
  margin-bottom: 2rem;
}

.badge-gaceta {
  background: var(--main-color, #007bff);
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 30px;
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
}

.gaceta-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 2.5rem;
  line-height: 1.2;
}

.gaceta-info-list {
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

.gaceta-description h4 {
  font-size: 1.8rem;
  color: var(--main-color, #007bff);
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.gaceta-description p {
  line-height: 1.8;
  color: #555;
  font-size: 1.15rem;
  text-align: justify;
}

.pdf-info-box {
  margin-top: 2rem;
  padding: 1.2rem;
  background: rgba(0, 123, 255, 0.1);
  border-radius: 8px;
  border-left: 4px solid var(--main-color, #007bff);
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.pdf-info-box i {
  font-size: 1.5rem;
  color: var(--main-color, #007bff);
  margin-top: 0.2rem;
}

.pdf-info-box p {
  margin: 0;
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
}

@media (max-width: 991px) {
  .pdf-viewer-wrapper {
    min-height: 500px;
    border-radius: 12px 12px 0 0;
  }
  
  .pdf-viewer {
    min-height: 400px;
  }
  
  .gaceta-details {
    padding: 2rem 1.5rem;
  }
  
  .gaceta-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .pdf-viewer-wrapper {
    min-height: 400px;
  }
  
  .pdf-viewer {
    min-height: 350px;
  }
  
  .gaceta-details {
    padding: 1.5rem 1rem;
  }
  
  .gaceta-title {
    font-size: 1.6rem;
  }
  
  .info-item {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .pdf-actions {
    flex-direction: column;
  }
  
  .btn-pdf-open,
  .btn-pdf-download {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .pdf-viewer-wrapper {
    min-height: 350px;
  }
  
  .pdf-viewer {
    min-height: 300px;
  }
  
  .gaceta-title {
    font-size: 1.4rem;
  }
  
  .pdf-info-box {
    flex-direction: column;
    gap: 0.5rem;
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
import VuePdfEmbed from "vue-pdf-embed";
import api from '@/plugins/axios'
import { config } from '@/config/env'

export default {
  name: "DetalleGaceta",
  
  components: { 
    SidebarCustom, 
    VuePdfEmbed 
  },
  
  data() {
    return {
      idInstitucion: config.app.idInstitucion || '22',
      gaceta: {},
      loading: false,
      errorGet: false,
    };
  },
  
  computed: {
    ...mapState(["url_api", "Institucion"]),
  },

  methods: {
    getSafePdfUrl(path) {
      if (!path) return '#';
      
      const cleaned = String(path).trim();
      
      if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
        return cleaned.replace('http://', 'https://');
      }
      
      const base = config.uploads.baseUrl?.replace(/\/+$/, '');
      const resource = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
      
      return `${base}${resource}`.replace(/\/+/g, '/');
    },

    async getGaceta() {
      this.loading = true
      this.errorGet = false
      
      try {
        const idGac = this.$route.params.idGac
        const institucionId = this.idInstitucion || config.app.idInstitucion
        
        const res = await api.get(`/institucion/${institucionId}/gacetaEventos`)
        const data = res.data

        const lista = data.upea_gaceta_universitaria || []
        this.gaceta = lista.find(g => g.gaceta_id == idGac) || {}

        if (!this.gaceta.gaceta_id) {
          this.errorGet = true
          console.warn('Gaceta no encontrada con ID:', idGac)
          return
        }

        this.gaceta = this._limpiarObjeto(this.gaceta)
        
      } catch (error) {
        console.error('Error cargando gaceta:', error)
        this.errorGet = true

        if (error.response?.status === 404) {
          console.warn('Gaceta no encontrada (404)')
        } else if (error.response?.status === 500) {
          console.error('Error del servidor (500)')
        }
      } finally {
        this.loading = false
        this.$store.commit("loading")
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
    }
  },

  created() {
    this.$store.commit("loadOn")
    this.applyDynamicColors();
    this.getGaceta()
  },

  mounted() {
    this.applyDynamicColors();
  },

  beforeUnmount() {
    this.gaceta = {}
    this.errorGet = false
    this.loading = false
  }
};
</script>