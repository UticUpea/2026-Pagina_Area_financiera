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
        <div class="row justify-content-center">
          <div class="col-lg-8 col-12" v-if="errorGet">
            <div class="text-center">
              <h1>Servicio inexistente</h1>
              <p>El servicio que buscas no está disponible o fue eliminado.</p>
              <button class="btn btn-base mt-3" @click="clickBack">
                <i class="fa fa-arrow-left"></i> Volver a Servicios
              </button>
            </div>
          </div>
          <div class="col-lg-8 col-12" v-else-if="loading">
            <div class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Cargando...</span>
              </div>
              <p class="mt-3">Cargando información del servicio...</p>
            </div>
          </div>
          <div class="col-lg-8 col-12" v-else-if="servicio.serv_id">
            <div class="single-blog-inner mb-0">
              <div class="details">
                <div class="blog-meta border-0 mt-0 pt-0">
                  <ul>
                    <li class="comnt bg-base">Servicio</li>
                    <li class="author">
                      <i class="fa fa-phone"></i>
                      <span>{{ servicio.serv_nro_celular }}</span>
                    </li>
                    <li class="date">
                      <i class="fa fa-calendar"></i>
                      {{ formatearFecha(servicio.serv_registro) }}
                    </li>
                  </ul>
                </div>
                <h4 class="mb-0">{{ servicio.serv_nombre }}</h4>
              </div>
              <div class="thumb mt-4">
                <img
                  :src="imageUrl + servicio.serv_imagen"
                  :alt="servicio.serv_nombre"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div class="blog-content-inner">
              <h4>Descripción del servicio</h4>
              <p class="mt-0" v-html="servicio.serv_descripcion"></p>
              <div v-if="servicio.imagen && servicio.imagen.length > 0">
                <h4 class="mt-5">Galería de imágenes</h4>
                <div class="gallery-area pd-top-50 pd-bottom-50">
                  <div class="container">
                    <div class="row">
                      <div
                        class="col-md-4"
                        style="margin: auto"
                        v-for="(img, index) of servicio.imagen"
                        :key="img.serv_imagen || index"
                        v-show="
                          (pag - 1) * NUM_RESULTS <= index &&
                          pag * NUM_RESULTS > index
                        "
                      >
                        <a
                          :href="imageUrl + img.serv_imagen"
                          class="single-gallery"
                          target="_blank"
                        >
                          <img
                            :src="imageUrl + img.serv_imagen"
                            :alt="servicio.serv_nombre + ' - imagen ' + (index + 1)"
                            loading="lazy"
                          />
                        </a>
                      </div>
                      <nav
                        class="col-12 td-page-navigation text-center mb-5 mb-lg-0"
                        v-if="pager > 1"
                      >
                        <ul class="pagination">
                          <li class="pagination-arrow disable">
                            <a
                              href="#"
                              aria-label="Previous"
                              @click.prevent="pag > 1 ? pag-- : null"
                            >
                              <i class="fa fa-angle-double-left"></i>
                            </a>
                          </li>
                          <li v-for="(i, index) of pager" :key="index">
                            <a
                              href="#"
                              :class="[i === pag ? 'active' : '']"
                              @click.prevent="pag = i"
                            >
                              {{ i }}
                            </a>
                          </li>
                          <li class="pagination-arrow">
                            <a
                              href="#"
                              aria-label="Next"
                              @click.prevent="pag < pager ? pag++ : null"
                            >
                              <i class="fa fa-angle-double-right"></i>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <!-- Sidebar -->
        <div class="row justify-content-center mt-5">
          <div class="col-lg-4 col-12">
            <SidebarCustom></SidebarCustom>
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

.single-gallery {
  display: block;
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.single-gallery:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}

.single-gallery img {
  width: 100%;
  height: 250px;
  object-fit: cover;
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
</style>

<script>
import { mapState } from "vuex";
import SidebarCustom from "@/components/SidebarCustom.vue";
import api from '@/plugins/axios' 

export default {
  name: "DetalleServicio",
  
  components: {
    SidebarCustom,
  },
  
  data() {
    return {
      idInstitucion: process.env.VUE_APP_ID_INSTITUCION || '22',
      servicio: {},
      loading: false,
      errorGet: false,
      NUM_RESULTS: 3,
      pag: 1,
      pager: 0,
    };
  },
  
  computed: {
    ...mapState(["url_api", "Institucion"]),
    imageUrl() {
      return process.env.VUE_APP_UPLOADS_URL?.trim() || 'https://apiadministrador.upea.bo'
    }
  },

  methods: {
    async getServicioOne() {
      this.loading = true
      this.errorGet = false
      
      try {
        const idServ = this.$route.params.idServ
        const res = await api.get(`/institucion/${this.idInstitucion}/gacetaEventos`)
        const data = res.data
        
        const lista = data.serviciosCarrera || []
        this.servicio = lista.find(s => s.serv_id == idServ) || {}
        if (!this.servicio.serv_id) {
          this.errorGet = true
          console.warn('Servicio no encontrado con ID:', idServ)
          return
        }
        this.servicio = this._limpiarObjeto(this.servicio)
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
    _actualizarPager() {
      const total = this.servicio.imagen?.length || 0
      this.pager = Math.ceil(total / this.NUM_RESULTS)

      if (this.pag > this.pager && this.pager > 0) {
        this.pag = this.pager
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
    this.getServicioOne()
  },
  beforeUnmount() {
    this.servicio = {}
    this.errorGet = false
    this.pag = 1
  }
};
</script>