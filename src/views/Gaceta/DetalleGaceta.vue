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
        <div class="row justify-content-center">

          <div class="col-lg-8 col-12" v-if="errorGet">
            <div class="text-center">
              <h1>Documento inexistente</h1>
              <p>El documento que buscas no está disponible o fue eliminado.</p>
              <button class="btn btn-base mt-3" @click="clickBack">
                <i class="fa fa-arrow-left"></i> Volver a Gaceta
              </button>
            </div>
          </div>

          <div class="col-lg-8 col-12" v-else-if="loading">
            <div class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Cargando...</span>
              </div>
              <p class="mt-3">Cargando documento...</p>
            </div>
          </div>

          <div class="col-lg-8 col-12" v-else-if="gaceta.gaceta_id">
            <div class="single-blog-inner mb-0">
              <div class="thumb">
                <a 
                  :href="imageUrl + gaceta.gaceta_documento?.trim()" 
                  target="_blank"
                  class="pdf-link"
                >
                  <vue-pdf-embed
                    :source="imageUrl + gaceta.gaceta_documento?.trim()"
                    :disableTextLayer="true"
                    :height="700"
                  />
                  <span class="pdf-overlay">
                    <i class="fa fa-external-link"></i> Abrir en nueva pestaña
                  </span>
                </a>
              </div>
              <div class="details">
                <div class="blog-meta border-0 mt-0 pt-0">
                  <ul>
                    <li class="comnt bg-base">GACETA</li>
                    <li class="date">
                      <i class="fa fa-calendar"></i>
                      {{ formatearFecha(gaceta.gaceta_fecha) }}
                    </li>
                  </ul>
                </div>
                <h4 class="mb-0">{{ gaceta.gaceta_titulo }}</h4>
              </div>
            </div>
            <div class="blog-content-inner mt-4">
              <!-- ✅ Descripción con HTML -->
              <p v-if="gaceta.gaceta_descripcion" v-html="gaceta.gaceta_descripcion"></p>
            </div>
          </div>
          
        </div>

        <!-- Sidebar -->
        <div class="row justify-content-center mt-5">
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

.vue-pdf-embed {
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  transition: box-shadow 0.3s ease;
}

.vue-pdf-embed:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}

.pdf-link {
  position: relative;
  display: block;
}

.pdf-overlay {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 123, 255, 0.9);
  color: white;
  border-radius: 4px;
  font-size: 0.9rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pdf-link:hover .pdf-overlay {
  opacity: 1;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.text-center h1 {
  color: #dc3545;
  margin-bottom: 1rem;
}

.text-center p {
  color: #666;
  font-size: 1.1rem;
}

.blog-meta .date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.blog-content-inner {
  line-height: 1.8;
  color: #333;
}
</style>

<script>
import { mapState } from "vuex";
import SidebarCustom from "@/components/SidebarCustom.vue";
import VuePdfEmbed from "vue-pdf-embed";
import api from '@/plugins/axios' 

export default {
  name: "DetalleGaceta",
  
  components: { 
    SidebarCustom, 
    VuePdfEmbed 
  },
  
  data() {
    return {

      idInstitucion: process.env.VUE_APP_ID_INSTITUCION || '22',
      gaceta: {},
      loading: false,
      errorGet: false,
    };
  },
  
  computed: {
    ...mapState(["url_api", "Institucion"]),

    imageUrl() {
      return process.env.VUE_APP_UPLOADS_URL?.trim() || 'https://apiadministrador.upea.bo'
    }
  },

  methods: {
    async getGaceta() {
      this.loading = true
      this.errorGet = false
      
      try {
        const idGac = this.$route.params.idGac
        const res = await api.get(`/institucion/${this.idInstitucion}/gacetaEventos`)
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
          cleaned[key] = cleaned[key].trim()
        } else if (cleaned[key] && typeof cleaned[key] === 'object' && !Array.isArray(cleaned[key])) {
          cleaned[key] = this._limpiarObjeto(cleaned[key])
        }
      })
      return cleaned
    },

    clickBack() {
      this.$store.commit("clickLink")
      this.$router.go(-1)
    }
  },

  created() {
    this.$store.commit("loadOn")
    this.getGaceta()
  },

  beforeUnmount() {
    this.gaceta = {}
    this.errorGet = false
    this.loading = false
  }
};
</script>