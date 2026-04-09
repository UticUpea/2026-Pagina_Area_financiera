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

        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 col-md-10">
            <div class="search-wrapper">
              <div class="search-input-group">
                <i class="fa fa-search search-icon"></i>
                <input
                  type="text"
                  placeholder="Buscar gacetas por título o tipo..."
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
                <span>{{ filteredGazettes.length }} resultado(s) encontrado(s)</span>
                <button @click="clearSearch" class="btn-clear-search">
                  Mostrar todas
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-8 col-12">

            <div v-if="isSearching && filteredGazettes.length === 0" class="pd-bottom-90">
              <div class="col-12 text-center py-5">
                <i class="fa fa-search text-muted" style="font-size: 4rem; opacity: 0.3;"></i>
                <h3 class="mt-4">No se encontraron gacetas</h3>
                <p class="text-muted">
                  No hay gacetas que coincidan con "{{ searchQuery }}"
                </p>
                <button @click="clearSearch" class="btn btn-base mt-3">
                  Mostrar todas las gacetas
                </button>
              </div>
            </div>

            <div v-else class="row">

              <div v-if="!isSearching && !loading && gacetas.length === 0" class="col-12 text-center py-5">
                <i class="fa fa-file-pdf-o text-muted" style="font-size: 4rem; opacity: 0.3;"></i>
                <h2 class="mt-4">Sin gacetas disponibles</h2>
                <p class="text-muted">Pronto se agregarán nuevas gacetas.</p>
              </div>

              <div v-if="loading" class="col-12 text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Cargando...</span>
                </div>
                <p class="mt-3">Cargando gacetas...</p>
              </div>

              <!-- Gacetas -->
              <template v-else-if="!loading">
                <div
                  v-for="gaceta in displayGazettes"
                  :key="gaceta.gaceta_id"
                  class="col-12 col-lg-6 mb-4"
                >
                  <div class="single-blog-inner">
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
  <router-link
    :to="'/detalleGaceta/' + gaceta.gaceta_id"
    @click="$store.commit('clickLink')"
    class="gaceta-title-link"
  >
    {{ gaceta.gaceta_titulo }}
  </router-link>
</h4>
<a
  :href="getPdfUrl(gaceta.gaceta_documento)"
  target="_blank"
  rel="noopener noreferrer"
  class="btn-descargar"
>
  <i class="fa fa-download"></i> Descargar PDF
</a>
                    </div>
                  </div>
                </div>

                <!-- Paginación -->
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

          <div class="col-lg-4 col-12">
            <div class="td-sidebar">
              
              <!-- Filtro por tipo -->
              <div class="widget widget_category">
                <h4 class="widget-title">Filtrar por tipo</h4>
                <ul class="cat-list">
                  <li 
                    v-for="tipo in tiposUnicos" 
                    :key="tipo"
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
  padding: 1.5rem;
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
  margin: 0 0 1rem 0;
  padding: 0;
  list-style: none;
}

.blog-meta li {
  font-size: 0.9rem;
  color: #666;
}

.blog-meta .date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
}

.blog-meta .date i {
  color: var(--main-color, #007bff);
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
  margin-top: auto;
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
  color: var(--main-color, #007bff);
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

@media (max-width: 576px) {
  .pdf-thumb {
    height: 140px;
  }
}

.text-center h2,
.text-center h3 {
  color: #666;
  padding: 2rem;
}

.text-muted {
  color: #999;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.gaceta-title-link {
  font-size: 2rem;
  color: #0d0d0d;
  text-decoration: none;
  transition: color 0.3s ease;
  display: block;
}

.gaceta-title-link:hover {
  color: var(--main-color, #007bff);
}

.gaceta-title-link:focus {
  outline: 2px solid var(--main-color, #007bff);
  outline-offset: 2px;
  border-radius: 4px;
}
</style>

<script>
import SidebarCustom from "@/components/SidebarCustom.vue";
import { mapState } from "vuex";
import api from '@/plugins/axios'
import { config } from '@/config/env'

export default {
  name: "GacetaView",
  
  components: {
    SidebarCustom,
  },
  
  data() {
    return {
      idInstitucion: config.app.idInstitucion || '22',
      gacetas: [],
      tiposUnicos: [],
      filtroTipo: null,
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

    filteredGazettes() {
      let result = this.gacetas;

      if (this.filtroTipo) {
        result = result.filter(g => g.gaceta_tipo === this.filtroTipo);
      }
      
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase().trim();
        result = result.filter(g => {
          const titulo = (g.gaceta_titulo || '').toLowerCase();
          const tipo = (g.gaceta_tipo || '').toLowerCase();
          return titulo.includes(query) || tipo.includes(query);
        });
      }
      
      return result;
    },

    displayGazettes() {
      const start = (this.currentPage - 1) * this.NUM_RESULTS;
      const end = start + this.NUM_RESULTS;
      return this.filteredGazettes.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredGazettes.length / this.NUM_RESULTS);
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
    filtroTipo() {
      this.currentPage = 1;
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

    async getGacetas() {
      this.loading = true;
      try {
        const institucionId = this.idInstitucion || config.app.idInstitucion;
        const res = await api.get(`/institucion/${institucionId}/gacetaEventos`);
        const data = res.data;
        const lista = data.upea_gaceta_universitaria || [];
        
        this.gacetas = lista
          .filter(g => g.gaceta_documento)
          .map(this._limpiarObjeto);
        
        this.tiposUnicos = [...new Set(
          this.gacetas.map(g => g.gaceta_tipo).filter(t => t)
        )];
        
      } catch (error) {
        console.error('Error cargando gacetas:', error);
        this.gacetas = [];
        this.tiposUnicos = [];
      } finally {
        this.loading = false;
        this.$store.commit("loading");
      }
    },

    getPdfUrl(nombreArchivo) {
      if (!nombreArchivo) return '#';
      
      const cleaned = String(nombreArchivo).trim();

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
      
      // Scroll a resultados
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
          const gazettesSection = document.querySelector('.blog-area');
          if (gazettesSection) {
            gazettesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
    },


    filtrarPorTipo(tipo) {
      this.filtroTipo = tipo;
      this.currentPage = 1;
    },


    contarPorTipo(tipo) {
      return this.gacetas.filter(g => g.gaceta_tipo === tipo).length;
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

    formatearFecha(fecha) {
      if (!fecha) return '';
      if (typeof fecha === 'string' && fecha.includes('de')) return fecha;
      
      const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
      ];
      
      let fechaObj;
      if (fecha.includes('T')) {
        fechaObj = new Date(fecha);
      } else {
        const partes = fecha.substr(0, 10).split("-");
        fechaObj = new Date(partes[0], parseInt(partes[1]) - 1, partes[2]);
      }
      
      if (isNaN(fechaObj.getTime())) return fecha;
      
      return `${fechaObj.getDate()} de ${meses[fechaObj.getMonth()]} de ${fechaObj.getFullYear()}`;
    },

 
    _limpiarObjeto(obj) {
      if (!obj || typeof obj !== 'object') return obj;
      const cleaned = { ...obj };
      Object.keys(cleaned).forEach(key => {
        if (typeof cleaned[key] === 'string') {
          cleaned[key] = cleaned[key].trim();
        } else if (cleaned[key] && typeof cleaned[key] === 'object' && !Array.isArray(cleaned[key])) {
          cleaned[key] = this._limpiarObjeto(cleaned[key]);
        }
      });
      return cleaned;
    },

    clickBack() {
      this.$store.commit("clickLink");
      this.$router.go(-1);
    }
  },

  created() {
    this.$store.commit("loadOn");
    this.getGacetas();
    this.applyDynamicColors();
  },

  mounted() {
    this.applyDynamicColors();
  },

  beforeUnmount() {
    this.clearSearch();
    this.gacetas = [];
    
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }
};
</script>