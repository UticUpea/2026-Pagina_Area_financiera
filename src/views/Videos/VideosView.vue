<template>
  <div>
    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-lg-7">
            <div class="breadcrumb-inner">
              <h2 class="page-title" style="color: #fff !important;">
                VIDEOS DE LA CARRERA
              </h2>
              <ul class="page-list">
                <li><router-link to="/">INICIO</router-link></li>
                <li>VIDEOS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="course-area pd-top-120 pd-bottom-120">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-12">
            <div class="td-sidebar">
              <div class="widget widget_search">
                <div class="search-form">
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Buscar video"
                      v-model="search"
                      @keyup.enter="buscar"
                    />
                  </div>
                  <button class="submit-btn" @click="buscar" type="button">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="row justify-content-center">

          <div class="col-12" v-if="searchGet">
            <div class="col-12 text-center" v-if="searchValues.length === 0">
              <h3>No se encontraron resultados para "{{ search }}"</h3>
              <button class="btn btn-base mt-3" @click="limpiarBusqueda">
                Mostrar todos los videos
              </button>
            </div>
            
            <div v-else class="col-12 row justify-content-center">
              <div class="col-12">
                <p>{{ searchValues.length }} resultado(s) encontrado(s)</p>
                <hr />
              </div>
              
              <template v-for="(vid, index) of searchValues" :key="vid.video_id || index">
                <div class="col-lg-4 col-md-6 mb-4">
                  <div class="single-course-inner">
                    <div class="thumb">
                      <iframe
                        :src="vid.video_enlace?.trim()"
                        frameborder="0"
                        style="border-radius: 5px"
                        allowfullscreen
                        loading="lazy"
                      />
                      <div class="cat-area">
                        <span class="cat bg-base">VIDEOS</span>
                      </div>
                    </div>
                    <div class="details">
                      <div class="details-inner">
                        <h5>
                          <router-link :to="'/detalleVideo/' + vid.video_id">
                            {{ vid.video_titulo }}
                          </router-link>
                        </h5>
                      </div>
                      <div class="bottom-area">
                        <div class="row">
                          <div class="col-12 text-right">
                            <router-link
                              :to="'/detalleVideo/' + vid.video_id"
                              class="btn-leer-mas"
                            >
                              Ver video
                              <i class="fa fa-play-circle"></i>
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div v-else class="col-12 row justify-content-center">
            
            <!-- Estado vacío -->
            <div class="col-12 text-center" v-if="videos.length === 0">
              <h2>Sin videos disponibles</h2>
              <p class="text-muted">Pronto se agregarán nuevos videos.</p>
            </div>

            <template v-else v-for="(vid, index) of videos" :key="vid.video_id || index">
              <div
                class="col-lg-4 col-md-6 mb-4"
                v-show="
                  (pag - 1) * NUM_RESULTS <= index &&
                  pag * NUM_RESULTS > index
                "
              >
                <div class="single-course-inner">
                  <div class="thumb">
                    <iframe
                      :src="vid.video_enlace?.trim()"
                      frameborder="0"
                      style="border-radius: 5px"
                      allowfullscreen
                      loading="lazy"
                    />
                    <div class="cat-area">
                      <span class="cat bg-base">VIDEOS</span>
                    </div>
                  </div>
                  <div class="details">
                    <div class="details-inner">
                      <h5>
                        <router-link :to="'/detalleVideo/' + vid.video_id">
                          {{ vid.video_titulo }}
                        </router-link>
                      </h5>
                    </div>
                    <div class="bottom-area">
                      <div class="row">
                        <div class="col-12 text-right">
                          <!-- ✅ BOTÓN LEER MÁS ESTILIZADO -->
                          <router-link
                            :to="'/detalleVideo/' + vid.video_id"
                            class="btn-leer-mas"
                          >
                            Ver video
                            <i class="fa fa-play-circle"></i>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            
            <!-- Paginación -->
            <nav class="col-12 td-page-navigation text-center mb-5 mb-lg-0" v-if="pager > 1">
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
          
          <!-- Sidebar -->
          <div class="col-12">
            <hr />
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

.search-form {
  display: flex;
  gap: 0.5rem;
}

.search-form input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.search-form input:focus {
  outline: none;
  border-color: var(--main-color-1, #007bff);
}

.submit-btn {
  padding: 0.75rem 1.5rem;
  background: var(--main-color-1, #007bff);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: var(--main-color-2, #0056b3);
}

.text-center h2,
.text-center h3 {
  color: #666;
  padding: 2rem;
}

.text-muted {
  color: #999;
}

.cat {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
}

.single-course-inner {
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  height: 100%;
}

.single-course-inner:hover {
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  transform: translateY(-3px);
}

.single-course-inner .thumb {
  position: relative;
  overflow: hidden;
}

.single-course-inner iframe {
  width: 100%;
  height: 200px;
  border-radius: 5px;
  transition: box-shadow 0.3s ease;
}

.single-course-inner:hover iframe {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.single-course-inner .cat-area {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
}

.single-course-inner .details {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.single-course-inner .details-inner {
  flex: 1;
}

.single-course-inner h5 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.4;
}

.single-course-inner h5 a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
}

.single-course-inner h5 a:hover {
  color: var(--main-color-1, #007bff);
}

.single-course-inner .bottom-area {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.btn-leer-mas {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
  color: #000;
  text-decoration: none;
  border-radius: 20px;
  font-weight: 600;
  font-size: 1.30rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(255, 193, 7, 0.3);
  border: 2px solid transparent;
}

.btn-leer-mas:hover {
  background: linear-gradient(135deg, #ff9800 0%, #ffc107 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 193, 7, 0.4);
  color: #000;
}

.btn-leer-mas i {
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.btn-leer-mas:hover i {
  transform: translateX(3px);
}

@media (max-width: 768px) {
  .single-course-inner iframe {
    height: 180px;
  }
  
  .btn-leer-mas {
    padding: 0.4rem 0.9rem;
    font-size: 0.85rem;
  }
  
  .single-course-inner h5 {
    font-size: 1.05rem;
  }
}
</style>

<script>
import SidebarCustom from "@/components/SidebarCustom.vue";
import { mapState } from "vuex";
import api from '@/plugins/axios' 

export default {
  name: "VideosView",
  
  components: {
    SidebarCustom,
  },
  
  data() {
    return {
      idInstitucion: process.env.VUE_APP_ID_INSTITUCION || '22',
      videos: [],
      search: "",
      searchGet: false,
      searchValues: [],
      NUM_RESULTS: 4, 
      pag: 1,
      pager: 0,
      loading: false
    };
  },
  
  computed: {
    ...mapState(["url_api", "Institucion"]),

    resourceUrl() {
      return (process.env.VUE_APP_UPLOADS_URL || 'https://apiadministrador.upea.bo/uploads/').trim()
    }
  },

  methods: {
    async getVideosAll() {
      this.loading = true
      try {
        const res = await api.get(`/institucion/${this.idInstitucion}/contenido`)
        const data = res.data
        const lista = data.upea_videos || []

        this.videos = lista
          .filter(vid => vid.video_estado === "1" || vid.video_estado === 1)
          .map(this._limpiarObjeto)
    
        this._actualizarPager()
        
      } catch (error) {
        console.error('Error cargando videos:', error)
        this.videos = []
      } finally {
        this.loading = false
        this.$store.commit("loading")
      }
    },

    _actualizarPager() {
      const total = this.videos?.length || 0
      this.pager = Math.ceil(total / this.NUM_RESULTS)
      if (this.pag > this.pager && this.pager > 0) {
        this.pag = this.pager
      }
    },

    buscar() {
      const query = this.search.trim().toUpperCase()
      
      if (query) {
        this.searchGet = true
        this.searchValues = this.videos.filter(vid => 
          vid.video_titulo?.toUpperCase().includes(query) ||
          vid.video_breve_descripcion?.toUpperCase().includes(query) ||
          vid.video_tipo?.toUpperCase().includes(query)
        )
        this.pag = 1
      } else {
        this.limpiarBusqueda()
      }
    },

    limpiarBusqueda() {
      this.search = ""
      this.searchGet = false
      this.searchValues = []
      this.pag = 1
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
    }
  },

  created() {
    this.$store.commit("loadOn")
    this.getVideosAll()
  },

  beforeUnmount() {
    this.limpiarBusqueda()
    this.videos = []
  }
};
</script>