<template>
  <div>
    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-xl-7 col-lg-8">
            <div class="breadcrumb-inner">
              <h2 class="page-title" style="color: #fff !important;">
                OFERTAS ACADÉMICAS QUE DISPONE ACTUALMENTE LA CARRERA
              </h2>
              <ul class="page-list">
                <li>
                  <router-link to="/">INICIO</router-link>
                </li>
                <li>OFERTAS ACADÉMICAS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main-team-area pd-top-120 pd-bottom-120">
      <div class="container">
        <div class="row justify-content-center">

          <div class="col-lg-8 col-12"></div>

          <!-- Barra de búsqueda -->
          <div class="col-lg-4 col-12">
            <div class="td-sidebar">
              <div class="widget widget_search">
                <div class="search-form">
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Buscar oferta académica"
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

          <div class="col-12 row" v-if="searchGet">

            <div class="col-12 text-center" v-if="searchValues.length === 0">
              <h3>No se encontraron resultados para "{{ search }}"</h3>
              <button class="btn btn-base mt-3" @click="limpiarBusqueda">
                Mostrar todas las ofertas
              </button>
            </div>

            <div v-else class="col-12 row justify-content-center">
              <div class="col-12">
                <p>{{ searchValues.length }} resultado(s) encontrado(s)</p>
                <hr />
              </div>
              <div
                class="col-lg-6 col-md-6 mb-4"
                v-for="(ofer, index) of searchValues"
                :key="ofer.ofertas_id || index"
              >
                <div class="single-event-inner">
                  <div class="media">
                    <div class="media-left">
                      <router-link
                        :to="'/detalleOferta/' + ofer.ofertas_id"
                        @click="$store.commit('clickLink')">

                        <img
                          :src="imageUrl + ofer.ofertas_imagen"
                          :alt="ofer.ofertas_titulo"
                          width="200"
                          loading="lazy"
                        />
                      </router-link>
                    </div>
                    <div class="details media-body align-self-center">
                      <div class="date">
                        <i class="fa fa-calendar"></i>
                        Inscripciones hasta el
                        {{ formatearFecha(ofer.ofertas_inscripciones_fin) }}
                      </div>
                      <h5>
                        <router-link
                          :to="'/detalleOferta/' + ofer.ofertas_id"
                          @click="$store.commit('clickLink')"
                        >
                          {{ ofer.ofertas_titulo }}
                        </router-link>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 row justify-content-center" v-else>
            <div v-if="ofertas.length === 0" class="col-12 text-center">
              <h1>No hay ofertas académicas disponibles</h1>
              <p class="text-muted">Pronto se agregarán nuevas ofertas.</p>
            </div>

            <template v-else>
              <div
                class="col-lg-6 col-md-6 mb-4"
                v-for="(ofer, index) of ofertas"
                :key="ofer.ofertas_id || index"
                v-show="
                  (pag - 1) * NUM_RESULTS <= index &&
                  pag * NUM_RESULTS > index
                "
              >
                <div class="single-event-inner">
                  <div class="media">
                    <div class="media-left">
                      <router-link
                        :to="'/detalleOferta/' + ofer.ofertas_id"
                        @click="$store.commit('clickLink')"
                      >

                        <img
                          :src="imageUrl + ofer.ofertas_imagen"
                          :alt="ofer.ofertas_titulo"
                          width="200"
                          loading="lazy"
                        />
                      </router-link>
                    </div>
                    <div class="details media-body align-self-center">
                      <div class="date">
                        <i class="fa fa-calendar"></i>
                        Inscripciones hasta el
                        {{ formatearFecha(ofer.ofertas_inscripciones_fin) }}
                      </div>
                      <h5>
                        <router-link
                          :to="'/detalleOferta/' + ofer.ofertas_id"
                          @click="$store.commit('clickLink')"
                        >
                          {{ ofer.ofertas_titulo }}
                        </router-link>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

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
            </template>
          </div>

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

.single-event-inner img {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 4px;
}

.single-event-inner img:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.text-center h1,
.text-center h3 {
  color: #666;
  padding: 2rem;
}

.text-muted {
  color: #999;
}
</style>

<script>
import SidebarCustom from "@/components/SidebarCustom.vue";
import { mapState } from "vuex";
import api from '@/plugins/axios' 

export default {
  name: "OfertasView",
  
  components: {
    SidebarCustom,
  },
  
  data() {
    return {

      idInstitucion: process.env.VUE_APP_ID_INSTITUCION || '22',

      ofertas: [],
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

    imageUrl() {
      return process.env.VUE_APP_UPLOADS_URL?.trim() || 'https://apiadministrador.upea.bo'
    }
  },

  methods: {
    async getOfertasAll() {
      this.loading = true
      try {
        const res = await api.get(`/institucion/${this.idInstitucion}/gacetaEventos`)
        const data = res.data

        this.ofertas = (data.ofertasAcademicas || [])
          .filter(ofer => ofer.ofertas_estado === 1 || ofer.ofertas_estado === "1")
          .map(this._limpiarObjeto)

        this._actualizarPager()
        
      } catch (error) {
        console.error('Error cargando ofertas:', error)
        this.ofertas = []
      } finally {
        this.loading = false
        this.$store.commit("loading")
      }
    },

    _actualizarPager() {
      const total = this.ofertas?.length || 0
      this.pager = Math.ceil(total / this.NUM_RESULTS)
      if (this.pag > this.pager && this.pager > 0) {
        this.pag = this.pager
      }
    },

    buscar() {
      const query = this.search.trim().toUpperCase()
      
      if (query) {
        this.searchGet = true
        this.searchValues = this.ofertas.filter(ofer => 
          ofer.ofertas_titulo?.toUpperCase().includes(query) ||
          ofer.ofertas_descripcion?.toUpperCase().includes(query)
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
    }
  },

  created() {
    this.$store.commit("loadOn")
    this.getOfertasAll()
  },

  beforeUnmount() {
    this.limpiarBusqueda()
  }
};
</script>