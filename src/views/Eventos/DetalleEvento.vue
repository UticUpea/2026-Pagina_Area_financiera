<template>
  <div>
    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="breadcrumb-inner">
              <h2 class="page-title" style="color: #fff !important;">
                {{ evento.evento_titulo || 'Detalle de Evento' }}
              </h2>
              <ul class="page-list">
                <li>
                  <router-link to="/">INICIO</router-link>
                </li>
                <li>
                  <router-link to="/eventos">EVENTOS</router-link>
                </li>
                <li>{{ evento.evento_titulo || 'Evento' }}</li>
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
              <h1>Evento inexistente</h1>
              <p>El evento que buscas no está disponible o fue eliminado.</p>
              <button class="btn btn-base mt-3" @click="clickBack">
                <i class="fa fa-arrow-left"></i> Volver a Eventos
              </button>
            </div>
          </div>
          <div class="col-lg-8 col-12" v-else-if="loading">
            <div class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Cargando...</span>
              </div>
              <p class="mt-3">Cargando información del evento...</p>
            </div>
          </div>
          <div class="col-lg-8 col-12" v-else-if="evento.evento_id">
            <div class="single-blog-inner mb-0">
              <div class="details">
                <div class="blog-meta border-0 mt-0 pt-0">
                  <ul>
                    <li class="comnt bg-base">EVENTOS</li>
                    <li class="author">
                      <i class="fa fa-tag"></i>
                      <span>{{ evento.evento_tipo }}</span>
                    </li>
                    <li class="date">
                      <i class="fa fa-calendar"></i>
                      {{ formatearFecha(evento.evento_fecha) }}
                      <span v-if="evento.evento_hora" class="hora">
                        {{ evento.evento_hora }}
                      </span>
                    </li>
                  </ul>
                </div>
                <h4 class="mb-0">{{ evento.evento_titulo }}</h4>
              </div>
              <div class="thumb mt-4">
                <a
                  :href="imageUrl + evento.evento_imagen"
                  target="_blank"
                >
                  <img
                    :src="imageUrl + evento.evento_imagen"
                    :alt="evento.evento_titulo"
                    style="cursor: zoom-in"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
            <div class="blog-content-inner">
              <h4>Descripción del Evento</h4>
              <p class="mt-0" v-html="evento.evento_descripcion"></p>

              <div v-if="evento.evento_lugar" class="mt-4">
                <b>
                  <i class="fa fa-map-marker"></i> 
                  Lugar: 
                </b>
                {{ evento.evento_lugar }}
              </div>

              <div v-if="evento.galeria && evento.galeria.length > 0">
                <h4 class="mt-5">Galería de imágenes</h4>
                <div class="gallery-area pd-top-50 pd-bottom-50">
                  <div class="container">
                    <div class="row">
                      <div
                        class="col-md-4"
                        style="margin: auto"
                        v-for="(eg, index) of evento.galeria"
                        :key="eg.galeria_id || index"
                        v-show="
                          (pag - 1) * NUM_RESULTS <= index &&
                          pag * NUM_RESULTS > index
                        "
                      >
                        <a
                          :href="imageUrl + eg.galeria_imagen"
                          class="single-gallery"
                          target="_blank"
                        >
                          <img
                            :src="imageUrl + eg.galeria_imagen"
                            :alt="evento.evento_titulo + ' - galería ' + (index + 1)"
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

.blog-meta .date .hora {
  background: rgba(0, 123, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: var(--main-color-1, #007bff);
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
  height: 200px;
  object-fit: cover;
}

.blog-content-inner p {
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
  name: "DetalleEvento",
  
  components: { 
    SidebarCustom 
  },
  
  data() {
    return {
      idInstitucion: process.env.VUE_APP_ID_INSTITUCION || '22',
      evento: {},
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
    async getEventoOne() {
      this.loading = true
      this.errorGet = false
      
      try {
        const idEv = this.$route.params.idEv
        const res = await api.get(`/institucion/${this.idInstitucion}/gacetaEventos`)
        const data = res.data

        const lista = data.upea_evento || []
        this.evento = lista.find(e => e.evento_id == idEv) || {}
        if (!this.evento.evento_id) {
          this.errorGet = true
          console.warn('Evento no encontrado con ID:', idEv)
          return
        }

        this.evento = this._limpiarObjeto(this.evento)
        this._actualizarPager()
        
      } catch (error) {
        console.error('Error cargando evento:', error)
        this.errorGet = true
        if (error.response?.status === 404) {
          console.warn('Evento no encontrado (404)')
        } else if (error.response?.status === 500) {
          console.error('Error del servidor (500)')
        }
      } finally {
        this.loading = false
        this.$store.commit("loading")
      }
    },
    _actualizarPager() {
      const total = this.evento.galeria?.length || 0
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
    this.getEventoOne()
  },

  beforeUnmount() {
    this.evento = {}
    this.errorGet = false
    this.loading = false
    this.pag = 1
  }
};
</script>