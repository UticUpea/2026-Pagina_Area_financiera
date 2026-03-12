<template>
  <div>
    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-xl-7 col-lg-8">
            <div class="breadcrumb-inner">
              <h2 class="page-title" style="color: #fff !important;">
                {{ tipo }} VIGENTES EN LA CARRERA
              </h2>
              <ul class="page-list">
                <li>
                  <router-link to="/">INICIO</router-link>
                </li>
                <li>{{ tipo }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="blog-area pd-top-120 pd-bottom-120">
      <div class="container">
        <div class="row">

          <div class="col-lg-8">
            <div v-if="searchGet">
              <h3 v-if="searchValues.length === 0" class="text-center">
                 No se encontraron resultados para "{{ search }}"
              </h3>

              <div v-else class="row justify-content-center">
                <div class="col-12">
                  <p>{{ searchValues.length }} resultado(s) encontrado(s)</p>
                  <hr />
                </div>
                
                <template v-for="(conv, index) of searchValues" :key="conv.idconvocatorias || index">
                  <div class="single-blog-inner col-12 col-lg-6 mb-4">
                    <div class="thumb">
                      <router-link
                        :to="'/detalleConvocatoria/' + conv.idconvocatorias"
                        @click="$store.commit('clickLink')"
                      >
                        <img
                          :src="imageUrl + conv.con_foto_portada"
                          :alt="conv.con_titulo"
                          loading="lazy"
                        />
                      </router-link>
                    </div>
                    <div class="details">
                      <div class="blog-meta">
                        <ul>
                          <li class="comnt bg-base">{{ tipo }}</li>
                          <li class="date">
                            <i class="fa fa-calendar"></i>
                            {{ formatearFecha(conv.con_fecha_inicio) }} -
                            {{ formatearFecha(conv.con_fecha_fin) }}
                          </li>
                        </ul>
                      </div>
                      <h4>
                        <router-link
                          :to="'/detalleConvocatoria/' + conv.idconvocatorias"
                          @click="$store.commit('clickLink')"
                        >
                          {{ conv.con_titulo }}
                        </router-link>
                      </h4>
                      <p class="descripcion-convocatoria" v-html="conv.con_descripcion"></p>
                      <router-link
                        :to="'/detalleConvocatoria/' + conv.idconvocatorias"
                        @click="$store.commit('clickLink')"
                        class="btn-leer-mas"
                      >
                        Leer más
                        <i class="fa fa-arrow-right"></i>
                      </router-link>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <div v-else class="row justify-content-center">

              <div v-if="convocatorias.length === 0" class="col-12 text-center">
                <h2>Sin {{ tipo.toLowerCase() }} disponibles</h2>
                <p class="text-muted">Pronto se agregarán nuevas {{ tipo.toLowerCase() }}.</p>
              </div>
              
              <div v-else class="col-12 row justify-content-center">
                
                <template v-for="(conv, index) of convocatorias" :key="conv.idconvocatorias || index">
                  <div
                    class="single-blog-inner col-12 col-lg-6 mb-4"
                    v-show="
                      (pag - 1) * NUM_RESULTS <= index &&
                      pag * NUM_RESULTS > index
                    "
                  >
                    <div class="thumb">
                      <router-link
                        :to="'/detalleConvocatoria/' + conv.idconvocatorias"
                        @click="$store.commit('clickLink')"
                      >
                        <img
                          :src="imageUrl + conv.con_foto_portada"
                          :alt="conv.con_titulo"
                          loading="lazy"
                        />
                      </router-link>
                    </div>
                    <div class="details">
                      <div class="blog-meta">
                        <ul>
                          <li class="comnt bg-base">{{ tipo }}</li>
                          <li class="date">
                            <i class="fa fa-calendar"></i>
                            {{ formatearFecha(conv.con_fecha_inicio) }} -
                            {{ formatearFecha(conv.con_fecha_fin) }}
                          </li>
                        </ul>
                      </div>
                      <h4>
                        <router-link
                          :to="'/detalleConvocatoria/' + conv.idconvocatorias"
                          @click="$store.commit('clickLink')"
                        >
                          {{ conv.con_titulo }}
                        </router-link>
                      </h4>
                      <p class="descripcion-convocatoria" v-html="conv.con_descripcion"></p>

                      <router-link
                        :to="'/detalleConvocatoria/' + conv.idconvocatorias"
                        @click="$store.commit('clickLink')"
                        class="btn-leer-mas"
                      >
                        Leer más
                        <i class="fa fa-arrow-right"></i>
                      </router-link>
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
            </div>
          </div>
          <div class="col-lg-4 col-12">
            <div class="td-sidebar">
              <div class="widget widget_search">
                <div class="search-form">
                  <div class="form-group">
                    <input
                      type="text"
                      :placeholder="'Buscar ' + tipo.toLowerCase().slice(0, -1)"
                      v-model="search"
                      @keyup.enter="buscar"
                    />
                  </div>
                  <button class="submit-btn" @click="buscar" type="button">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
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

.blog-meta .date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.single-blog-inner {
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  margin-bottom: 2rem;
}

.single-blog-inner:hover {
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  transform: translateY(-3px);
}

.single-blog-inner img {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 4px;
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.single-blog-inner img:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.single-blog-inner .details {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.single-blog-inner h4 {
  margin: 0.75rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
}

.single-blog-inner h4 a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
}

.single-blog-inner h4 a:hover {
  color: var(--main-color-1, #007bff);
}

.blog-meta ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.blog-meta li {
  font-size: 0.9rem;
  color: #666;
}

.blog-meta .comnt {
  padding: 0.3rem 0.75rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.85rem;
}
.descripcion-convocatoria {
  font-size: 0.95rem;
  color: #555;
  margin: 0.75rem 0 1rem 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.descripcion-convocatoria p {
  margin: 0;
}

.descripcion-convocatoria :deep(p) {
  margin: 0;
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
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(255, 193, 7, 0.3);
  border: 2px solid transparent;
  margin-top: 0.5rem;
  align-self: flex-start;
}

.btn-leer-mas:hover {
  background: linear-gradient(135deg, #ff9800 0%, #ffc107 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 193, 7, 0.4);
  color: #000;
}

.btn-leer-mas i {
  font-size: 0.9rem;
  transition: transform 0.3s ease;
}

.btn-leer-mas:hover i {
  transform: translateX(4px);
}
@media (max-width: 768px) {
  .single-blog-inner {
    margin-bottom: 1.5rem;
  }
  
  .btn-leer-mas {
    padding: 0.4rem 0.9rem;
    font-size: 0.85rem;
  }
  
  .single-blog-inner h4 {
    font-size: 1.15rem;
  }
  
  .descripcion-convocatoria {
    -webkit-line-clamp: 2;
    line-clamp: 2;
    font-size: 0.9rem;
  }
}
</style>

<script>
import SidebarCustom from "@/components/SidebarCustom.vue";
import { mapState } from "vuex";
import api from '@/plugins/axios' 

export default {
  name: "ConvocatoriasView",
  
  components: {
    SidebarCustom,
  },
  
  data() {
    return {
      idInstitucion: process.env.VUE_APP_ID_INSTITUCION || '22',
      tipo: "",
      convocatorias: [],
      tipoConvocatoriaId: null,
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
      return (process.env.VUE_APP_UPLOADS_URL || 'https://apiadministrador.upea.bo').trim()
    }
  },

  watch: {
    '$route.params.tipo_conv': {
      immediate: true,
      handler(nuevoTipo) {
        if (nuevoTipo) {
          this.cargarDatos(nuevoTipo)
        }
      }
    }
  },

  methods: {
    async cargarDatos(tipoConvId) {
      this.loading = true
      try {
        await this.getTipoConv(tipoConvId)
        await this.getConvocatorias()
      } catch (error) {
        console.error('Error cargando datos:', error)
      } finally {
        this.loading = false
        this.$store.commit("loading")
      }
    },

    async getTipoConv(tipo_conv) {
      try {
        const res = await api.get(`/institucion/${this.idInstitucion}/gacetaEventos`)
        const data = res.data

        const convocatorias = data.convocatorias || []
        const tiposUnicos = {}
        
        convocatorias.forEach(conv => {
          const tipo = conv.tipo_conv_comun?.tipo_conv_comun_titulo
          if (tipo && !tiposUnicos[tipo]) {
            tiposUnicos[tipo] = conv.tipo_conv_comun
          }
        })

        const tipoEncontrado = Object.values(tiposUnicos).find(
          t => String(t.idtipo_conv_comun) === String(tipo_conv) || t.tipo_conv_comun_titulo?.toUpperCase() === tipo_conv.toUpperCase()
        )
        
        if (tipoEncontrado) {
          this.tipo = tipoEncontrado.tipo_conv_comun_titulo
          this.tipoConvocatoriaId = tipo_conv
        } else {
          this.tipo = tipo_conv.toUpperCase()
          this.tipoConvocatoriaId = tipo_conv
        }
        
      } catch (error) {
        console.error('Error cargando tipo de convocatoria:', error)
        this.tipo = tipo_conv.toUpperCase()
      }
    },

    async getConvocatorias() {
      try {
        const res = await api.get(`/institucion/${this.idInstitucion}/gacetaEventos`)
        const data = res.data

        const lista = data.convocatorias || []

        this.convocatorias = lista
          .filter(conv => conv.con_estado === "1" || conv.con_estado === 1)
          .filter(conv => {
            if (this.tipoConvocatoriaId) {
              const tipoNombre = conv.tipo_conv_comun?.tipo_conv_comun_titulo
              const tipoId = conv.tipo_conv_comun?.idtipo_conv_comun
              return tipoNombre === this.tipo || String(tipoId) === String(this.tipoConvocatoriaId)
            }
            return true
          })
          .map(this._limpiarObjeto)

        this._actualizarPager()
        
      } catch (error) {
        console.error('Error cargando convocatorias:', error)
        this.convocatorias = []
      }
    },

    _actualizarPager() {
      const total = this.convocatorias?.length || 0
      this.pager = Math.ceil(total / this.NUM_RESULTS)

      if (this.pag > this.pager && this.pager > 0) {
        this.pag = this.pager
      }
    },

    buscar() {
      const query = this.search.trim().toUpperCase()
      
      if (query) {
        this.searchGet = true
        this.searchValues = this.convocatorias.filter(conv => 
          conv.con_titulo?.toUpperCase().includes(query) ||
          conv.con_descripcion?.toUpperCase().includes(query)
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
    },

    clickBack() {
      this.$store.commit("clickLink")
      this.$router.go(-1)
    }
  },

  created() {
    this.$store.commit("loadOn")
    if (this.$route.params.tipo_conv) {
      this.cargarDatos(this.$route.params.tipo_conv)
    }
  },
  beforeUnmount() {
    this.limpiarBusqueda()
    this.convocatorias = []
    this.tipo = ""
  }
};
</script>