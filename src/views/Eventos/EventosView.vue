<template>
  <div>
    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-lg-7">
            <div class="breadcrumb-inner">
              <h2 class="page-title" style="color: #fff !important;">
                EVENTOS RECIENTES DE LA CARRERA
              </h2>
              <ul class="page-list">
                <li><router-link to="/">INICIO</router-link></li>
                <li>EVENTOS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main-team-area pd-top-120 pd-bottom-120">
      <div class="container">
  
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 col-md-10">
            <div class="search-wrapper">
              <div class="search-input-group">
                <i class="fa fa-search search-icon"></i>
                <input
                  type="text"
                  placeholder="Buscar eventos por título, descripción o lugar..."
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
                <span>{{ filteredEvents.length }} resultado(s) encontrado(s)</span>
                <button @click="clearSearch" class="btn-clear-search">
                  Mostrar todos
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-8 col-12">

            <div v-if="isSearching && filteredEvents.length === 0" class="pd-bottom-90">
              <div class="col-12 text-center py-5">
                <i class="fa fa-search text-muted" style="font-size: 4rem; opacity: 0.3;"></i>
                <h3 class="mt-4">No se encontraron eventos</h3>
                <p class="text-muted">
                  No hay eventos que coincidan con "{{ searchQuery }}"
                </p>
                <button @click="clearSearch" class="btn btn-base mt-3">
                  Mostrar todos los eventos
                </button>
              </div>
            </div>

            <div v-else class="row">

              <div v-if="!isSearching && eventos.length === 0" class="col-12 text-center py-5">
                <i class="fa fa-calendar text-muted" style="font-size: 4rem; opacity: 0.3;"></i>
                <h2 class="mt-4">No hay eventos disponibles</h2>
                <p class="text-muted">Pronto se agregarán nuevos eventos.</p>
              </div>

              <template v-else>
                <div
                  v-for="ev in displayEvents"
                  :key="ev.evento_id"
                  class="col-xl-6 col-lg-12 col-md-6 mb-4"
                >
                  <div class="single-event-inner">
                    <div class="media">
                      <div class="media-left">
                        <router-link :to="'/detalleEvento/' + ev.evento_id">
                          <img
                            :src="buildSafeImageUrl(ev.evento_imagen)"
                            :alt="ev.evento_titulo"
                            class="event-image"
                            loading="lazy"
                          />
                        </router-link>
                      </div>
                      <div class="details media-body align-self-center">
                        <div class="date">
                          <i class="fa fa-calendar"></i>
                          {{ formatearFecha(ev.evento_fecha) }}
                          <span v-if="ev.evento_hora" class="hora">
                            {{ ev.evento_hora }}
                          </span>
                        </div>
                        <p class="location">
                          <i class="fa fa-map-marker"></i> {{ ev.evento_lugar }}
                        </p>
                        <h5 class="event-title">
                          <router-link :to="'/detalleEvento/' + ev.evento_id">
                            {{ ev.evento_titulo }}
                          </router-link>
                        </h5>
                        <p v-if="ev.evento_descripcion" class="event-description">
                          {{ ev.evento_descripcion }}
                        </p>
                      </div>
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

.single-event-inner {
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

.single-event-inner:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  transform: translateY(-5px);
}

.single-event-inner .media {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  flex: 1;
}

.single-event-inner .media-left {
  flex-shrink: 0;
}

.event-image {
  width: 100%;
  max-width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.single-event-inner:hover .event-image {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.single-event-inner .details {
  flex: 1;
  min-width: 0;
}

.date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.date i {
  color: var(--main-color, #007bff);
}

.date .hora {
  background: rgba(0, 123, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  color: var(--main-color, #007bff);
}

.location {
  color: #666;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.location i {
  color: var(--main-color, #007bff);
}

.single-event-inner h5 {
  margin: 0.75rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
}

.event-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 3.2em;
}

.single-event-inner h5 a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.single-event-inner h5 a:hover {
  color: var(--main-color, #007bff);
}

.event-description {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
  margin: 0.75rem 0 0 0;
  
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  
  max-height: 4.5em;
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

@media (min-width: 1200px) {
  .col-xl-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media (max-width: 1199px) {
  .col-lg-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  
  .single-event-inner .media {
    flex-direction: column;
  }
  
  .event-image {
    max-width: 100%;
    height: 200px;
  }
}

@media (max-width: 991px) {
  .col-lg-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  
  .single-event-inner .media {
    flex-direction: column;
  }
  
  .event-image {
    max-width: 100%;
    height: 200px;
  }
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
  
  .event-description {
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
  
  .col-md-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (max-width: 576px) {
  .event-image {
    height: 180px;
  }
  
  .single-event-inner .media {
    padding: 1rem;
  }
  
  .event-title {
    font-size: 1rem;
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
</style>

<script>
import SidebarCustom from "@/components/SidebarCustom.vue";
import { mapState } from "vuex";
import api from '@/plugins/axios'
import { config } from '@/config/env'

export default {
  name: "EventosView",
  
  components: {
    SidebarCustom,
  },
  
  data() {
    return {
      idInstitucion: config.app.idInstitucion || '22',
      eventos: [],
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

    filteredEvents() {
      if (!this.searchQuery.trim()) {
        return this.eventos;
      }
      
      const query = this.searchQuery.toLowerCase().trim();
      
      return this.eventos.filter(ev => {
        const titulo = (ev.evento_titulo || '').toLowerCase();
        const descripcion = (ev.evento_descripcion || '').toLowerCase();
        const lugar = (ev.evento_lugar || '').toLowerCase();
        
        return titulo.includes(query) || 
               descripcion.includes(query) || 
               lugar.includes(query);
      });
    },

    displayEvents() {
      const start = (this.currentPage - 1) * this.NUM_RESULTS;
      const end = start + this.NUM_RESULTS;
      return this.filteredEvents.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredEvents.length / this.NUM_RESULTS);
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

  methods: {
    async getEventosAll() {
      this.loading = true;
      try {
        const institucionId = this.idInstitucion || config.app.idInstitucion;
        const res = await api.get(`/institucion/${institucionId}/gacetaEventos`);
        const data = res.data;

        this.eventos = (data.upea_evento || []).map(this._limpiarObjeto);

        this._actualizarPager();
        
      } catch (error) {
        console.error('Error cargando eventos:', error);
        this.eventos = [];
      } finally {
        this.loading = false;
        this.$store.commit("loading");
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
          const resultsSection = document.querySelector('.main-team-area');
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
          const eventsSection = document.querySelector('.main-team-area');
          if (eventsSection) {
            eventsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      const total = this.eventos?.length || 0;
      this.pager = Math.ceil(total / this.NUM_RESULTS);
      if (this.pag > this.pager && this.pager > 0) {
        this.pag = this.pager;
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
    }
  },

  watch: {
    Institucion: {
      handler() {
        this.applyDynamicColors();
      },
      deep: true,
      immediate: true
    }
  },

  created() {
    this.$store.commit("loadOn");
    this.getEventosAll();
    this.applyDynamicColors();
  },

  mounted() {
    this.applyDynamicColors();
  },

  beforeUnmount() {
    this.clearSearch();
    this.eventos = [];
    
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }
};
</script>