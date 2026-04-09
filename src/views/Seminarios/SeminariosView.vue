<template>
  <div>
    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="breadcrumb-inner">
              <h2 class="page-title" style="color: #fff !important;">
                SEMINARIOS ABIERTOS EN LA CARRERA
              </h2>
              <ul class="page-list">
                <li><router-link to="/">INICIO</router-link></li>
                <li>Seminarios</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="course-area pd-top-120 pd-bottom-120">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 col-md-10">
            <div class="search-wrapper">
              <div class="search-input-group">
                <i class="fa fa-search search-icon"></i>
                <input
                  type="text"
                  placeholder="Buscar seminarios por título o descripción..."
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
                <span>{{ filteredSeminars.length }} resultado(s) encontrado(s)</span>
                <button @click="clearSearch" class="btn-clear-search">
                  Mostrar todos
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-8 col-12">

            <div v-if="isSearching && filteredSeminars.length === 0" class="pd-bottom-90">
              <div class="col-12 text-center py-5">
                <i class="fa fa-search text-muted" style="font-size: 4rem; opacity: 0.3;"></i>
                <h3 class="mt-4">No se encontraron seminarios</h3>
                <p class="text-muted">
                  No hay seminarios que coincidan con "{{ searchQuery }}"
                </p>
                <button @click="clearSearch" class="btn btn-base mt-3">
                  Mostrar todos los seminarios
                </button>
              </div>
            </div>

            <div v-else class="row">

              <div v-if="!isSearching && seminarios.length === 0" class="col-12 text-center py-5">
                <i class="fa fa-graduation-cap text-muted" style="font-size: 4rem; opacity: 0.3;"></i>
                <h2 class="mt-4">Sin seminarios disponibles</h2>
                <p class="text-muted">Pronto se agregarán nuevos seminarios.</p>
              </div>

              <template v-else>
                <div
                  v-for="sem in displaySeminars"
                  :key="sem.iddetalle_cursos_academicos"
                  class="col-12 col-lg-6 mb-4"
                >
                  <div class="single-course-inner">
                    <div class="thumb">
                      <router-link :to="'/detalleSeminario/' + sem.iddetalle_cursos_academicos">
                        <img 
                          :src="buildSafeImageUrl(sem.det_img_portada)" 
                          :alt="sem.det_titulo" 
                          loading="lazy" 
                        />
                      </router-link>
                      <div class="cat-area">
                        <span class="cat bg-base-2">{{ sem.tipo_curso_otro?.tipo_conv_curso_nombre }}</span>
                      </div>
                    </div>
                    <div class="details">
                      <span class="price">{{ sem.det_costo }} Bs</span>
                      <p class="status">
                        <i class="fa fa-clock-o"></i> 
                        <b>{{ sem.det_carga_horaria }}</b> hrs académicas
                      </p>
                      <div class="details-inner">
                        <h5>
                          <router-link :to="'/detalleSeminario/' + sem.iddetalle_cursos_academicos">
                            {{ sem.det_titulo }}
                          </router-link>
                        </h5>
                        <p v-if="sem.det_descripcion" class="seminar-description">
                          {{ sem.det_descripcion }}
                        </p>
                      </div>
                      <div class="bottom-area">
                        <div class="row">
                          <div class="col-6 align-self-center">
                            <div class="rating-inner">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                            </div>
                          </div>
                          <div class="col-6 align-self-center text-right">
                            <router-link 
                              :to="'/detalleSeminario/' + sem.iddetalle_cursos_academicos" 
                              class="readmore-text"
                            >
                              Leer más
                            </router-link>
                          </div>
                        </div>
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

.single-course-inner {
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

.single-course-inner:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  transform: translateY(-5px);
}

.single-course-inner .thumb {
  position: relative;
  overflow: hidden;
}

.single-course-inner img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.single-course-inner:hover img {
  transform: scale(1.02);
}

.single-course-inner .cat-area {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
}

.cat {
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-size: 1.8rem;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.single-course-inner .details {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--main-color, #007bff);
  margin-bottom: 0.5rem;
}

.status {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.status i {
  margin-right: 0.3rem;
  color: var(--main-color, #007bff);
}

.single-course-inner h5 {
  margin: 0.75rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
}

.single-course-inner h5 a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.single-course-inner h5 a:hover {
  color: var(--main-color, #007bff);
}

.seminar-description {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
  margin: 0.75rem 0 0 0;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 3em;
}

.rating-inner {
  color: #ffc107;
}

.rating-inner i {
  margin-right: 0.1rem;
}

.readmore-text {
  color: var(--main-color, #007bff);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.readmore-text:hover {
  color: var(--main-color-2, #0056b3);
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
  
  .seminar-description {
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }
  
  .single-course-inner img {
    height: 200px;
  }
}

@media (max-width: 576px) {
  .single-course-inner img {
    height: 180px;
  }
  
  .price {
    font-size: 1.3rem;
  }
}

.text-center h2, .text-center h3 { 
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
  name: "SeminariosView",
  components: { SidebarCustom },
  data() {
    return {
      idInstitucion: config.app.idInstitucion || '22',
      tipo: "",
      tipoSeminarioId: null,
      seminarios: [],
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


    filteredSeminars() {
      if (!this.searchQuery.trim()) {
        return this.seminarios;
      }
      
      const query = this.searchQuery.toLowerCase().trim();
      
      return this.seminarios.filter(sem => {
        const titulo = (sem.det_titulo || '').toLowerCase();
        const descripcion = (sem.det_descripcion || '').toLowerCase();
        
        return titulo.includes(query) || descripcion.includes(query);
      });
    },

    displaySeminars() {
      const start = (this.currentPage - 1) * this.NUM_RESULTS;
      const end = start + this.NUM_RESULTS;
      return this.filteredSeminars.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredSeminars.length / this.NUM_RESULTS);
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
    '$route.params.tipo_sem': {
      immediate: true,
      handler(nuevoTipo) { 
        if (nuevoTipo) this.cargarDatos(nuevoTipo) 
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
    async cargarDatos(tipoSeminarioId) {
      this.loading = true
      try {
        const institucionId = this.idInstitucion || config.app.idInstitucion
        await this.getTipoSem(tipoSeminarioId, institucionId)
        await this.getSeminarios(institucionId)
      } catch (error) { 
        console.error('Error:', error) 
      } finally { 
        this.loading = false
        this.$store.commit("loading") 
      }
    },

    async getTipoSem(tipo_sem, institucionId) {
      try {
        if (!tipo_sem) {
          this.tipo = "SEMINARIOS"
          return
        }
        
        const res = await api.get(`/institucion/${institucionId}/gacetaEventos`)
        const cursos = res.data.cursos || []
        const tipos = {}
        
        cursos.forEach(c => { 
          const t = c.tipo_curso_otro?.tipo_conv_curso_nombre
          if (t && !tipos[t]) tipos[t] = c.tipo_curso_otro 
        })
        
        const encontrado = Object.values(tipos).find(t => 
          t.idtipo_curso_otros == tipo_sem || 
          t.tipo_conv_curso_nombre?.toUpperCase() === tipo_sem.toUpperCase()
        )
        
        this.tipo = encontrado?.tipo_conv_curso_nombre || tipo_sem?.toUpperCase() || "SEMINARIOS"
        this.tipoSeminarioId = tipo_sem
        
      } catch (e) { 
        console.error(e)
        this.tipo = tipo_sem?.toUpperCase() || "SEMINARIOS"
      }
    },
    
    async getSeminarios(institucionId) {
      this.loading = true
      try {
        const res = await api.get(`/institucion/${institucionId}/gacetaEventos`)
        const data = res.data
        
        this.seminarios = data.cursos?.filter(c => {
          const esSeminario = c.tipo_curso_otro?.tipo_conv_curso_nombre?.toUpperCase() === 'SEMINARIOS'
          const estadoActivo = (c.det_estado == "1" || c.det_estado == 1)
          
          if (this.tipoSeminarioId) {
            return esSeminario && estadoActivo && (
              c.tipo_curso_otro?.idtipo_curso_otros == this.tipoSeminarioId ||
              c.tipo_curso_otro?.tipo_conv_curso_nombre === this.tipo
            )
          }
          return esSeminario && estadoActivo
        }).map(this._limpiarObjeto) || []
        
        this._actualizarPager()
      } catch (e) { 
        console.error(e)
        this.seminarios = [] 
      } finally {
        this.loading = false
        this.$store.commit("loading")
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
      
      // Scroll a resultados
      if (this.isSearching) {
        this.$nextTick(() => {
          const resultsSection = document.querySelector('.course-area');
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
        
        // Scroll suave al inicio de los seminarios
        this.$nextTick(() => {
          const seminarsSection = document.querySelector('.course-area');
          if (seminarsSection) {
            seminarsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      const t = this.seminarios?.length || 0
      this.pager = Math.ceil(t / this.NUM_RESULTS)
      if (this.pag > this.pager && this.pager > 0) this.pag = this.pager
    },

    _limpiarObjeto(obj) {
      if (!obj || typeof obj !== 'object') return obj
      const c = { ...obj }
      Object.keys(c).forEach(k => {
        if (typeof c[k] === 'string') c[k] = c[k].trim()
        else if (c[k] && typeof c[k] === 'object' && !Array.isArray(c[k])) 
          c[k] = this._limpiarObjeto(c[k])
      })
      return c
    }
  },
  created() { 
    this.$store.commit("loadOn")
    this.applyDynamicColors();
    if (this.$route.params.tipo_sem) {
      this.cargarDatos(this.$route.params.tipo_sem)
    } else {
      this.getSeminarios(this.idInstitucion || config.app.idInstitucion)
    }
  },
  mounted() {
    this.applyDynamicColors();
  },
  beforeUnmount() {
    this.clearSearch()
    this.seminarios = []
    
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }
}
</script>