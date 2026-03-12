<template>
  <div>
    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-xl-7 col-lg-8">
            <div class="breadcrumb-inner">
              <h2 class="page-title" style="color: #fff !important;">
                {{ publicacion.publicaciones_titulo || 'Detalle de Publicación' }}
              </h2>
              <ul class="page-list">
                <li>
                  <router-link to="/">INICIO</router-link>
                </li>
                <li>
                  <router-link to="/publicaciones">PUBLICACIONES</router-link>
                </li>
                <li>{{ publicacion.publicaciones_titulo || 'Publicación' }}</li>
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
              <h1>Publicación inexistente</h1>
              <p>La publicación que buscas no está disponible o fue eliminada.</p>
              <button class="btn btn-base mt-3" @click="clickBack">
                <i class="fa fa-arrow-left"></i> Volver a Publicaciones
              </button>
            </div>
          </div>

          <div class="col-lg-8 col-12" v-else-if="loading">
            <div class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Cargando...</span>
              </div>
              <p class="mt-3">Cargando información de la publicación...</p>
            </div>
          </div>

          <div class="col-lg-8 col-12" v-else-if="publicacion.publicaciones_id">
            <div class="single-blog-inner mb-0">
              <div class="thumb">
                <a
                  :href="imageUrl + publicacion.publicaciones_imagen"
                  target="_blank"
                >

                  <img
                    :src="imageUrl + publicacion.publicaciones_imagen"
                    :alt="publicacion.publicaciones_titulo"
                    style="cursor: zoom-in"
                    loading="lazy"
                  />
                </a>
              </div>
              <div class="details">
                <div class="blog-meta border-0 mt-0 pt-0">
                  <ul>
                    <li class="comnt bg-base">PUBLICACIONES</li>
                    <li class="author">
                      Por <span>{{ publicacion.publicaciones_autor }}</span>
                    </li>
                    <li class="date">
                      <i class="fa fa-calendar"></i>
                      {{ formatearFecha(publicacion.publicaciones_fecha) }}
                    </li>
                  </ul>
                </div>
                <h4 class="mb-0">{{ publicacion.publicaciones_titulo }}</h4>
              </div>
            </div>
            <div class="blog-content-inner">

              <p v-html="publicacion.publicaciones_descripcion"></p>
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
}

.blog-content-inner p {
  line-height: 1.8;
  font-size: 1.05rem;
  color: #333;
}
</style>

<script>
import { mapState } from "vuex";
import SidebarCustom from "@/components/SidebarCustom.vue";
import api from '@/plugins/axios' 

export default {
  name: "DetallePublicacion",
  
  components: { 
    SidebarCustom 
  },
  
  data() {
    return {

      idInstitucion: process.env.VUE_APP_ID_INSTITUCION || '22',

      publicacion: {},
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

    async getPublicacion() {
      this.loading = true
      this.errorGet = false
      
      try {
        const idPub = this.$route.params.idPub

        const res = await api.get(`/institucion/${this.idInstitucion}/recursos`)
        const data = res.data

        const lista = data.upea_publicaciones || []
        this.publicacion = lista.find(p => p.publicaciones_id == idPub) || {}

        if (!this.publicacion.publicaciones_id) {
          this.errorGet = true
          console.warn('Publicación no encontrada con ID:', idPub)
          return
        }

        this.publicacion = this._limpiarObjeto(this.publicacion)
        
      } catch (error) {
        console.error('Error cargando publicación:', error)
        this.errorGet = true

        if (error.response?.status === 404) {
          console.warn('Publicación no encontrada (404)')
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
    this.getPublicacion()
  },

  beforeUnmount() {
    this.publicacion = {}
    this.errorGet = false
    this.loading = false
  }
};
</script>