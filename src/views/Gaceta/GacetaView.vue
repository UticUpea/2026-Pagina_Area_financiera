<template>
  <div>
    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-xl-7 col-lg-8">
            <div class="breadcrumb-inner">
              <h2 class="page-title" style="color: #fff !important;">
                GACETA UNIVERSITARIA
              </h2>
              <ul class="page-list">
                <li><router-link to="/">INICIO</router-link></li>
                <li>GACETA</li>
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
                
                <template v-for="(gaceta, index) of searchValues" :key="gaceta.gaceta_id || index">
                  <div class="single-blog-inner col-12 col-lg-6 mb-4">
                    <div class="thumb pdf-thumb">
                      <div class="pdf-icon">
                        <i class="fa fa-file-pdf-o"></i>
                      </div>
                      <div class="cat-area">
                        <span class="cat bg-base">{{ gaceta.gaceta_tipo }}</span>
                      </div>
                    </div>
                    <div class="details">
                      <div class="blog-meta">
                        <ul>
                          <li class="date">
                            <i class="fa fa-calendar"></i>
                            {{ formatearFecha(gaceta.gaceta_fecha) }}
                          </li>
                        </ul>
                      </div>
                      <h4>
                        {{ gaceta.gaceta_titulo }}
                      </h4>
                      <a
                        :href="getPdfUrl(gaceta.gaceta_documento)"
                        target="_blank"
                        class="btn-descargar"
                      >
                        <i class="fa fa-download"></i> Descargar PDF
                      </a>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <div v-else class="row justify-content-center">

              <div v-if="gacetas.length === 0 && loading" class="col-12 text-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Cargando...</span>
                </div>
                <p class="mt-3">Cargando gacetas...</p>
              </div>

              <div v-else-if="gacetas.length === 0" class="col-12 text-center">
                <h2>Sin gacetas disponibles</h2>
                <p class="text-muted">Pronto se agregarán nuevas gacetas.</p>
              </div>
              
              <div v-else class="col-12 row justify-content-center">
                
                <template v-for="(gaceta, index) of gacetas" :key="gaceta.gaceta_id || index">
                  <div
                    class="single-blog-inner col-12 col-lg-6 mb-4"
                    v-show="
                      (pag - 1) * NUM_RESULTS <= index &&
                      pag * NUM_RESULTS > index
                    "
                  >
                    <div class="thumb pdf-thumb">
                      <div class="pdf-icon">
                        <i class="fa fa-file-pdf-o"></i>
                      </div>
                      <div class="cat-area">
                        <span class="cat bg-base">{{ gaceta.gaceta_tipo }}</span>
                      </div>
                    </div>
                    <div class="details">
                      <div class="blog-meta">
                        <ul>
                          <li class="date">
                            <i class="fa fa-calendar"></i>
                            {{ formatearFecha(gaceta.gaceta_fecha) }}
                          </li>
                        </ul>
                      </div>
                      <h4>
                        {{ gaceta.gaceta_titulo }}
                      </h4>
                      <a
                        :href="getPdfUrl(gaceta.gaceta_documento)"
                        target="_blank"
                        class="btn-descargar"
                      >
                        <i class="fa fa-download"></i> Descargar PDF
                      </a>
                    </div>
                  </div>
                </template>
                <nav class="col-12 td-page-navigation text-center mb-5 mb-lg-0" v-if="pager > 1">
                  <ul class="pagination">
                    <li class="pagination-arrow disable">
                      <a href="#" aria-label="Previous" @click.prevent="pag > 1 ? pag-- : null">
                        <i class="fa fa-angle-double-left"></i>
                      </a>
                    </li>
                    <li v-for="(i, index) of pager" :key="index">
                      <a href="#" :class="[i === pag ? 'active' : '']" @click.prevent="pag = i">{{ i }}</a>
                    </li>
                    <li class="pagination-arrow">
                      <a href="#" aria-label="Next" @click.prevent="pag < pager ? pag++ : null">
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
                  <input
                    type="text"
                    placeholder="Buscar gaceta"
                    v-model="search"
                    @keyup.enter="buscar"
                  />
                  <button class="submit-btn" @click="buscar" type="button">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
              
              <!-- Filtro por tipo -->
              <div class="widget widget_category">
                <h4 class="widget-title">Filtrar por tipo</h4>
                <ul class="cat-list">
                  <li 
                    v-for="(tipo, index) of tiposUnicos" 
                    :key="index"
                    :class="{ active: filtroTipo === tipo }"
                    @click="filtrarPorTipo(tipo)"
                  >
                    <a href="#">{{ tipo }}</a>
                    <span class="count">{{ contarPorTipo(tipo) }}</span>
                  </li>
                  <li :class="{ active: !filtroTipo }" @click="filtrarPorTipo(null)">
                    <a href="#">Todos</a>
                    <span class="count">{{ gacetas.length }}</span>
                  </li>
                </ul>
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

.pdf-thumb {
  position: relative;
  height: 180px;
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pdf-icon {
  font-size: 4rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.cat-area {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
}

.cat {
  padding: 0.3rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  background: rgba(255,255,255,0.9);
  color: #333;
}

.single-blog-inner .details {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.single-blog-inner h4 {
  margin: 0.75rem 0;
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.4;
  color: #333;
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

.btn-descargar {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
  border: 2px solid transparent;
  margin-top: 0.75rem;
  align-self: flex-start;
}

.btn-descargar:hover {
  background: linear-gradient(135deg, #c82333 0%, #dc3545 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
  color: white;
}

.btn-descargar i {
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.btn-descargar:hover i {
  transform: translateY(-2px);
}

.widget_category .cat-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.widget_category .cat-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color 0.3s ease;
}

.widget_category .cat-list li:hover,
.widget_category .cat-list li.active {
  color: var(--main-color-1, #007bff);
}

.widget_category .cat-list li a {
  color: inherit;
  text-decoration: none;
  font-size: 0.95rem;
}

.widget_category .cat-list .count {
  background: #eee;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-size: 0.8rem;
  color: #666;
}
@media (max-width: 768px) {
  .single-blog-inner {
    margin-bottom: 1.5rem;
  }
  
  .pdf-thumb {
    height: 150px;
  }
  
  .pdf-icon {
    font-size: 3rem;
  }
  
  .btn-descargar {
    padding: 0.4rem 0.9rem;
    font-size: 0.85rem;
  }
  
  .single-blog-inner h4 {
    font-size: 1.05rem;
  }
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>

<script>
import SidebarCustom from "@/components/SidebarCustom.vue";
import { mapState } from "vuex";
import api from '@/plugins/axios' 

export default {
  name: "GacetaView",
  
  components: {
    SidebarCustom,
  },
  
  data() {
    return {
      idInstitucion: process.env.VUE_APP_ID_INSTITUCION || '22',
      gacetas: [],
      tiposUnicos: [],
      filtroTipo: null,
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
    filtroTipo() {
      this.aplicarFiltros()
    }
  },

  methods: {
    async getGacetas() {
      this.loading = true
      try {
        const res = await api.get(`/institucion/${this.idInstitucion}/gacetaEventos`)
        const data = res.data
        const lista = data.upea_gaceta_universitaria || []
        
       // console.log('📦 Gacetas cargadas:', lista.length)
        
        this.gacetas = lista
          .filter(g => g.gaceta_documento)  
          .map(this._limpiarObjeto)
        this.tiposUnicos = [...new Set(
          this.gacetas.map(g => g.gaceta_tipo).filter(t => t)
        )]
        
        this.aplicarFiltros()
        this._actualizarPager()
        
      } catch (error) {
        console.error('❌ Error cargando gacetas:', error)
        this.gacetas = []
        this.tiposUnicos = []
      } finally {
        this.loading = false
        this.$store.commit("loading")
      }
    },
    aplicarFiltros() {
      let filtradas = this.gacetas
      if (this.filtroTipo) {
        filtradas = filtradas.filter(g => g.gaceta_tipo === this.filtroTipo)
      }
      if (this.searchGet && this.search.trim()) {
        const query = this.search.trim().toUpperCase()
        filtradas = filtradas.filter(g => 
          g.gaceta_titulo?.toUpperCase().includes(query) ||
          g.gaceta_tipo?.toUpperCase().includes(query)
        )
      }
      
      this.searchValues = filtradas
      this.pag = 1
      this._actualizarPager()
    },
    filtrarPorTipo(tipo) {
      this.filtroTipo = tipo
      this.searchGet = false
    },

    contarPorTipo(tipo) {
      return this.gacetas.filter(g => g.gaceta_tipo === tipo).length
    },
    getPdfUrl(nombreArchivo) {
      if (!nombreArchivo) return '#'
      if (nombreArchivo.startsWith('http')) return nombreArchivo
      const base = this.imageUrl.endsWith('/') ? this.imageUrl : `${this.imageUrl}/`
      return `${base}${nombreArchivo.trim()}`
    },

    _actualizarPager() {
      const lista = this.searchGet ? this.searchValues : this.gacetas
      const total = lista?.length || 0
      this.pager = Math.ceil(total / this.NUM_RESULTS)
      if (this.pag > this.pager && this.pager > 0) {
        this.pag = this.pager
      }
    },

    buscar() {
      const query = this.search.trim().toUpperCase()
      
      if (query) {
        this.searchGet = true
        this.aplicarFiltros()
      } else {
        this.limpiarBusqueda()
      }
    },

    limpiarBusqueda() {
      this.search = ""
      this.searchGet = false
      this.aplicarFiltros()
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
    this.getGacetas()
  },

  beforeUnmount() {
    this.limpiarBusqueda()
    this.gacetas = []
  }
};
</script>