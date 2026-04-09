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
  
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 col-md-10">
            <div class="search-wrapper">
              <div class="search-input-group">
                <i class="fa fa-search search-icon"></i>
                <input
                  type="text"
                  :placeholder="'Buscar ' + tipo.toLowerCase().slice(0, -1) + ' por título o descripción...'"
                  v-model="searchQuery"
                  @input="onSearchInput"
                  @keyup.enter="performSearch"
                  class="search-input"
                />
                <button 
                  v-if="searchQuery" 
                  @click="clearSearch" 
                  class="search-clear"
                  title="Limpiar búsqueda"
                >
                  <i class="fa fa-times"></i>
                </button>
                <button @click="performSearch" class="search-btn" type="button">
                  Buscar
                </button>
              </div>
              <div v-if="isSearching" class="search-info">
                <span>{{ filteredCalls.length }} resultado(s) encontrado(s)</span>
                <button @click="clearSearch" class="btn-clear-search">
                  Mostrar todas
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-8 col-12">

            <div v-if="isSearching && filteredCalls.length === 0" class="pd-bottom-90">
              <div class="col-12 text-center py-5">
                <i class="fa fa-search text-muted" style="font-size: 4rem; opacity: 0.3;"></i>
                <h3 class="mt-4">No se encontraron {{ tipo.toLowerCase() }}</h3>
                <p class="text-muted">
                  No hay {{ tipo.toLowerCase() }} que coincidan con "{{ searchQuery }}"
                </p>
                <button @click="clearSearch" class="btn btn-base mt-3">
                  Mostrar todas las {{ tipo.toLowerCase() }}
                </button>
              </div>
            </div>

            <div v-else class="row">
    
              <div v-if="!isSearching && convocatorias.length === 0" class="col-12 text-center py-5">
                <i class="fa fa-bullhorn text-muted" style="font-size: 4rem; opacity: 0.3;"></i>
                <h2 class="mt-4">Sin {{ tipo.toLowerCase() }} disponibles</h2>
                <p class="text-muted">Pronto se agregarán nuevas {{ tipo.toLowerCase() }}.</p>
              </div>

              <template v-else>
                <div
                  v-for="conv in displayCalls"
                  :key="conv.idconvocatorias"
                  class="col-12 col-lg-6 mb-4"
                >
                  <div class="single-blog-inner">
                    <div class="thumb">
                      <router-link
                        :to="'/detalleConvocatoria/' + conv.idconvocatorias"
                        @click="$store.commit('clickLink')"
                      >
                        <img
                          :src="buildSafeImageUrl(conv.con_foto_portada)"
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
                </div>

                <nav v-if="totalPages > 1 && !isSearching" class="col-12 td-page-navigation text-center mb-5 mb-lg-0">
                  <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                      <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                        <i class="fa fa-angle-left"></i> Anterior
                      </a>
                    </li>
                    
                    <li 
                      v-for="page in visiblePages" 
                      :key="page"
                      class="page-item" 
                      :class="{ active: page === currentPage }"
                    >
                      <a class="page-link" href="#" @click.prevent="changePage(page)">
                        {{ page }}
                      </a>
                    </li>
                    
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                      <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                        Siguiente <i class="fa fa-angle-right"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </template>
            </div>
          </div>

          <!-- Sidebar -->
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

.search-wrapper {
  margin-bottom: 2rem;
}

.search-input-group {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-icon {
  position: absolute;
  left: 15px;
  color: #999;
  font-size: 1.1rem;
  pointer-events: none;
}

.search-input {
  flex: 1;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e0e0e0;
  border-radius: 50px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--main-color, #007bff);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.search-clear {
  position: absolute;
  right: 85px;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.2rem;
  transition: color 0.2s;
}

.search-clear:hover {
  color: #dc3545;
}

.search-btn {
  padding: 0.75rem 2rem;
  background: var(--main-color, #007bff);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.search-btn:hover {
  background: var(--main-color-2, #0056b3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.search-btn:active {
  transform: translateY(0);
}

.search-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 0.9rem;
}

.btn-clear-search {
  background: none;
  border: none;
  color: var(--main-color, #007bff);
  cursor: pointer;
  font-weight: 600;
  transition: color 0.2s;
}

.btn-clear-search:hover {
  color: var(--main-color-2, #0056b3);
  text-decoration: underline;
}

.single-blog-inner {
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  transition: all 0.3s ease;
  height: 100%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.single-blog-inner:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  transform: translateY(-5px);
}

.single-blog-inner .thumb {
  position: relative;
  overflow: hidden;
}

.single-blog-inner img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.single-blog-inner:hover img {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.single-blog-inner .details {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.single-blog-inner h4 {
  margin: 0.75rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.4;
}

.single-blog-inner h4 a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.single-blog-inner h4 a:hover {
  color: var(--main-color, #007bff);
}

.blog-meta ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 0 0 1rem 0;
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

.blog-meta .date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.blog-meta .date i {
  color: var(--main-color, #007bff);
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
  margin-top: auto;
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

.pagination {
  margin: 0;
}

.page-item {
  margin: 0 0.25rem;
}

.page-link {
  padding: 0.5rem 1rem;
  color: #333;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.page-link:hover {
  background: var(--main-color, #007bff);
  color: white;
  border-color: var(--main-color, #007bff);
}

.page-item.active .page-link {
  background: var(--main-color, #007bff);
  color: white;
  border-color: var(--main-color, #007bff);
}

.page-item.disabled .page-link {
  opacity: 0.5;
  cursor: not-allowed;
}

.text-center h2,
.text-center h3 {
  color: #666;
  padding: 2rem;
}

.text-muted {
  color: #999;
}

@media (max-width: 768px) {
  .search-input-group {
    flex-direction: column;
  }
  
  .search-input {
    width: 100%;
  }
  
  .search-btn {
    width: 100%;
  }
  
  .search-clear {
    right: 10px;
  }
  
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
  
  .single-blog-inner img {
    height: 220px;
  }
}

@media (max-width: 576px) {
  .single-blog-inner img {
    height: 200px;
  }
}
</style>

<script>
import SidebarCustom from "@/components/SidebarCustom.vue";
import { mapState } from "vuex";
import api from '@/plugins/axios'
import { config } from '@/config/env'

export default {
  name: "ConvocatoriasView",
  
  components: {
    SidebarCustom,
  },
  
  data() {
    return {
      idInstitucion: config.app.idInstitucion || '22',
      tipo: "",
      convocatorias: [],
      tipoConvocatoriaId: null,
      searchQuery: "",
      isSearching: false,
      currentPage: 1,
      NUM_RESULTS: 4,
      loading: false,
      searchTimeout: null
    };
  },
  
  computed: {
    ...mapState(["url_api", "Institucion"]),

    filteredCalls() {
      if (!this.searchQuery.trim()) {
        return this.convocatorias;
      }
      
      const query = this.searchQuery.toLowerCase().trim();
      
      return this.convocatorias.filter(conv => {
        const titulo = (conv.con_titulo || '').toLowerCase();
        const descripcion = (conv.con_descripcion || '').toLowerCase();
        
        return titulo.includes(query) || descripcion.includes(query);
      });
    },

    displayCalls() {
      const start = (this.currentPage - 1) * this.NUM_RESULTS;
      const end = start + this.NUM_RESULTS;
      return this.filteredCalls.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredCalls.length / this.NUM_RESULTS);
    },

    visiblePages() {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(this.totalPages, start + maxVisible - 1);
      
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      return pages;
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
    },
    Institucion: {
      handler() {
        this.applyDynamicColors();
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    async cargarDatos(tipoConvId) {
      this.loading = true
      try {
        const institucionId = this.idInstitucion || config.app.idInstitucion
        await this.getTipoConv(tipoConvId, institucionId)
        await this.getConvocatorias(institucionId)
      } catch (error) {
        console.error('Error cargando datos:', error)
      } finally {
        this.loading = false
        this.$store.commit("loading")
      }
    },

    async getTipoConv(tipo_conv, institucionId) {
      try {
        const res = await api.get(`/institucion/${institucionId}/gacetaEventos`)
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

    async getConvocatorias(institucionId) {
      try {
        const res = await api.get(`/institucion/${institucionId}/gacetaEventos`)
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

    buildSafeImageUrl(path) {
      if (!path) return '';
      
      const cleaned = String(path).trim();
      
      if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
        return cleaned.replace('http://', 'https://');
      }
      
      const base = config.uploads.baseUrl?.replace(/\/+$/, '');
      const resource = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
      
      return `${base}${resource}`.replace(/\/+/g, '/');
    },

    onSearchInput() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      
      this.searchTimeout = setTimeout(() => {
        this.performSearch();
      }, 300);
    },

    performSearch() {
      this.isSearching = this.searchQuery.trim().length > 0;
      this.currentPage = 1;
      
      if (this.isSearching) {
        this.$nextTick(() => {
          const resultsSection = document.querySelector('.blog-area');
          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
    },

    clearSearch() {
      this.searchQuery = "";
      this.isSearching = false;
      this.currentPage = 1;
      
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
    },

    changePage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.currentPage = page;
        
        this.$nextTick(() => {
          const callsSection = document.querySelector('.blog-area');
          if (callsSection) {
            callsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
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

    _actualizarPager() {
      const total = this.convocatorias?.length || 0
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
      
      return `${fechaObj.getDate()} de ${meses[fechaObj.getMonth()]} de ${fechaObj.getFullYear()}`;
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
    this.applyDynamicColors();
    if (this.$route.params.tipo_conv) {
      this.cargarDatos(this.$route.params.tipo_conv)
    } else {
      this.getConvocatorias(this.idInstitucion || config.app.idInstitucion)
    }
  },

  mounted() {
    this.applyDynamicColors();
  },

  beforeUnmount() {
    this.clearSearch()
    this.convocatorias = []
    this.tipo = ""
    
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }
};
</script>