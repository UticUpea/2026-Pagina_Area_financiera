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
        <div class="row justify-content-center"> 
          <div class="col-lg-8 col-12" v-if="errorGet">
            <div class="text-center">
              <h1>Convocatoria inexistente</h1>
              <p>La convocatoria que buscas no está disponible o fue eliminada.</p>
              <button class="btn btn-base mt-3" @click="clickBack">
                <i class="fa fa-arrow-left"></i> Volver a Convocatorias
              </button>
            </div>
          </div>
          <div class="col-lg-8 col-12" v-else-if="loading">
            <div class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Cargando...</span>
              </div>
              <p class="mt-3">Cargando información de la convocatoria...</p>
            </div>
          </div>
          <div class="col-lg-8 col-12" v-else-if="convocatoria.idconvocatorias">
            <div class="single-blog-inner mb-0">
              <div class="thumb">
                <a
                  :href="imageUrl + convocatoria.con_foto_portada"
                  target="_blank"
                >
                  <img
                    :src="imageUrl + convocatoria.con_foto_portada"
                    :alt="convocatoria.con_titulo"
                    style="cursor: zoom-in"
                    loading="lazy"
                  />
                </a>
              </div>
              <div class="details">
                <div class="blog-meta border-0 mt-0 pt-0">
                  <ul>
                    <li class="comnt bg-base">
                      {{ convocatoria.tipo_conv_comun?.tipo_conv_comun_titulo }}
                    </li>
                    <li class="date">
                      <i class="fa fa-calendar"></i>
                      {{ formatearFecha(convocatoria.con_fecha_inicio) }} -
                      {{ formatearFecha(convocatoria.con_fecha_fin) }}
                    </li>
                  </ul>
                </div>
                <h4 class="mb-0">{{ convocatoria.con_titulo }}</h4>
              </div>
            </div>
            <div class="blog-content-inner">
              <p v-html="convocatoria.con_descripcion"></p>
              <div v-if="convocatoria.con_referencia" class="mt-4">
                <b><i class="fa fa-info-circle"></i> Referencia: </b>
                {{ convocatoria.con_referencia }}
              </div>
            </div>
          </div>
          
        </div>

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

.single-blog-inner .thumb img {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 4px;
  max-width: 100%;
  height: auto;
}

.single-blog-inner .thumb img:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
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
  flex-wrap: wrap;
}

.blog-content-inner {
  line-height: 1.8;
  font-size: 1.05rem;
  color: #333;
}

.blog-content-inner b {
  color: var(--main-color-1, #007bff);
}
</style>

<script>
import { mapState } from "vuex";
import SidebarCustom from "@/components/SidebarCustom.vue";
import api from '@/plugins/axios' 

export default {
  name: "DetalleConvocatoria",
  
  components: { 
    SidebarCustom 
  },
  
  data() {
    return {
      idInstitucion: process.env.VUE_APP_ID_INSTITUCION || '22',
      convocatoria: {},
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
    async getConvocatoriaOne() {
      this.loading = true
      this.errorGet = false
      
      try {
        const idConv = this.$route.params.idConv
        const res = await api.get(`/institucion/${this.idInstitucion}/gacetaEventos`)
        const data = res.data
        const lista = data.convocatorias || []
        this.convocatoria = lista.find(c => c.idconvocatorias == idConv) || {}

        if (!this.convocatoria.idconvocatorias) {
          this.errorGet = true
          console.warn('⚠️ Convocatoria no encontrada con ID:', idConv)
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
    this.getConvocatoriaOne()
  },

  beforeUnmount() {
    this.convocatoria = {}
    this.errorGet = false
    this.loading = false
  }
};
</script>