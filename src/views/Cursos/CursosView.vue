<template>
  <div>
    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-xl-7 col-lg-8">
            <div class="breadcrumb-inner">
              <h2 class="page-title" style="color: #fff !important;">
                {{ tipo }} ABIERTOS EN LA CARRERA
              </h2>
              <ul class="page-list">
                <li><router-link to="/">INICIO</router-link></li>
                <li>{{ tipo }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="course-area pd-top-120 pd-bottom-120">
      <div class="container">
        
        <!-- ✅ BUSCADOR MEJORADO -->
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
                <span>{{ filteredCourses.length }} resultado(s) encontrado(s)</span>
                <button @click="clearSearch" class="btn-clear-search">
                  Mostrar todos
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-8 col-12">


            <div v-if="isSearching && filteredCourses.length === 0" class="pd-bottom-90">
              <div class="col-12 text-center py-5">
                <i class="fa fa-search text-muted" style="font-size: 4rem; opacity: 0.3;"></i>
                <h3 class="mt-4">No se encontraron {{ tipo.toLowerCase() }}</h3>
                <p class="text-muted">
                  No hay {{ tipo.toLowerCase() }} que coincidan con "{{ searchQuery }}"
                </p>
                <button @click="clearSearch" class="btn btn-base mt-3">
                  Mostrar todos los {{ tipo.toLowerCase() }}
                </button>
              </div>
            </div>

            <div v-else class="row">

              <div v-if="!isSearching && !loading && cursos.length === 0" class="col-12 text-center py-5">
                <i class="fa fa-graduation-cap text-muted" style="font-size: 4rem; opacity: 0.3;"></i>
                <h2 class="mt-4">Sin {{ tipo.toLowerCase() }} disponibles</h2>
                <p class="text-muted">Pronto se agregarán nuevos {{ tipo.toLowerCase() }}.</p>
              </div>

      
              <div v-if="loading" class="col-12 text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Cargando...</span>
                </div>
                <p class="mt-3">Cargando {{ tipo.toLowerCase() }}...</p>
              </div>

          
              <template v-else-if="!loading">
                <div
                  v-for="cur in displayCourses"
                  :key="cur.iddetalle_cursos_academicos"
                  class="col-12 col-lg-6 mb-4"
                >
                  <div class="single-course-inner" :class="getCourseTypeClass(cur)">
                    <div class="thumb">
                      <router-link :to="'/detalleCurso/' + cur.iddetalle_cursos_academicos" @click="$store.commit('clickLink')">
                        <img :src="buildSafeImageUrl(cur.det_img_portada)" :alt="cur.det_titulo" loading="lazy" />
                      </router-link>
                      <span class="price">{{ cur.det_costo }} Bs</span>
                      <div class="cat-area">
                        <span class="cat bg-base-2">{{ cur.tipo_curso_otro?.tipo_conv_curso_nombre }}</span>
                      </div>
                    </div>
                    <div class="details">
                      <p class="status">
                        <i class="fa fa-clock-o"></i> 
                        <b>{{ cur.det_carga_horaria }}</b> hrs académicas
                      </p>
                      <div class="details-inner">
                        <h5>
                          <router-link :to="'/detalleCurso/' + cur.iddetalle_cursos_academicos" @click="$store.commit('clickLink')">
                            {{ cur.det_titulo }}
                          </router-link>
                        </h5>
                        <p class="descripcion-curso" v-html="cur.det_descripcion"></p>
                        <template v-if="cur.facilitadores && cur.facilitadores.length > 0">
                          <template v-for="fac of cur.facilitadores" :key="fac.facilitador_id">
                            <div class="author media">
                              <div class="media-left">
                                <img :src="buildSafeImageUrl(fac.foto_facilitador)" :alt="fac.nombre_facilitador" />
                              </div>
                              <div class="media-body align-self-center">
                                <p>{{ fac.nombre_facilitador }}</p>
                              </div>
                            </div>
                          </template>
                        </template>
                      </div>
                      <div class="bottom-area">
                        <div class="row align-items-center">
                          <div class="col-6">
                            <div class="rating-inner">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                            </div>
                          </div>
                          <div class="col-6 text-right">
                            <router-link 
                              :to="'/detalleCurso/' + cur.iddetalle_cursos_academicos" 
                              @click="$store.commit('clickLink')" 
                              class="btn-leer-mas"
                            >
                              Leer más
                              <i class="fa fa-arrow-right"></i>
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
  border-radius: 8px;
  overflow: hidden;
  background: white;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.single-course-inner:hover {
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  transform: translateY(-3px);
}

.single-course-inner .thumb {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.single-course-inner .thumb img {
  width: 100%; 
  height: 100%; 
  object-fit: cover;
  transition: transform 0.3s ease;
}

.single-course-inner:hover .thumb img {
  transform: scale(1.05);
}

.single-course-inner .price {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--main-color, #007bff);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 2;
  width: 65px;
  height: 65px;
  font-size: 1.5rem;
}

.single-course-inner .cat-area {
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 2;
}

.single-course-inner .cat {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  background: #ffc107;
  color: #000;
}

.single-course-inner .details {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.single-course-inner .status {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.95rem;
}

.single-course-inner .status i {
  color: var(--main-color, #007bff);
  margin-right: 0.3rem;
}

.single-course-inner .details-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.single-course-inner .details-inner h5 {
  margin: 0.75rem 0;
  font-weight: 600;
  line-height: 1.4;
  font-size: 1.15rem;
}

.single-course-inner .details-inner h5 a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.single-course-inner .details-inner h5 a:hover {
  color: var(--main-color, #007bff);
}

.descripcion-curso {
  color: #666;
  margin: 0.75rem 0;
  line-height: 1.5;
  font-size: 0.95rem;
  
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.descripcion-curso p {
  margin: 0;
}

.single-course-inner .author.media {
  margin-top: 0.5rem;
  padding: 0.4rem;
  background: rgba(0,0,0,0.03);
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.single-course-inner .author.media img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.single-course-inner .author.media p {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
}

.single-course-inner .bottom-area {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.rating-inner {
  display: flex;
  gap: 4px;
  color: #ff9800;
  font-size: 1rem;
}

.btn-leer-mas {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
  color: #000;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.95rem;
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

.single-course-inner.curso-type {
  min-height: auto;
}

.single-course-inner.seminario-type {
  min-height: auto;
}

.col-lg-6 {
  min-width: 300px;
}

.text-center h2, .text-center h3 { 
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
  
  .col-lg-6 {
    min-width: 100%;
  }
  
  .single-course-inner {
    min-height: auto;
  }
  
  .single-course-inner .thumb {
    height: 180px;
  }
  
  .btn-leer-mas {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .single-course-inner .details-inner h5 {
    font-size: 1.05rem;
  }
  
  .descripcion-curso {
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
}

@media (max-width: 576px) {
  .single-course-inner .thumb {
    height: 160px;
  }
  
  .single-course-inner .price {
    width: 55px;
    height: 55px;
    font-size: 1.2rem;
  }
}
</style>

<script>
import SidebarCustom from "@/components/SidebarCustom.vue";
import { mapState } from "vuex";
import api from '@/plugins/axios'
import { config } from '@/config/env'

export default {
  name: "CursosView",
  components: { SidebarCustom },
  data() {
    return {
      idInstitucion: config.app.idInstitucion || '22',
      tipo: "CURSOS",
      cursos: [],
      tipoCursoId: null,
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

    filteredCourses() {
      if (!this.searchQuery.trim()) {
        return this.cursos;
      }
      
      const query = this.searchQuery.toLowerCase().trim();
      
      return this.cursos.filter(c => {
        const titulo = (c.det_titulo || '').toLowerCase();
        const descripcion = (c.det_descripcion || '').toLowerCase();
        
        return titulo.includes(query) || descripcion.includes(query);
      });
    },

    displayCourses() {
      const start = (this.currentPage - 1) * this.NUM_RESULTS;
      const end = start + this.NUM_RESULTS;
      return this.filteredCourses.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredCourses.length / this.NUM_RESULTS);
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
    '$route.params.tipo_cur': {
      immediate: true,
      handler(nuevoTipo) { 
        if (nuevoTipo) this.cargarDatos(nuevoTipo) 
      }
    },
    '$store.state.MenuCur': {
      immediate: true,
      handler(newVal) {
        if (newVal && newVal.length > 0 && this.$route.params.tipo_cur) {
          this.cargarDatos(this.$route.params.tipo_cur)
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
    getCourseTypeClass(cur) {
      const tipoNombre = cur.tipo_curso_otro?.tipo_conv_curso_nombre?.toUpperCase() || ''
      if (tipoNombre.includes('SEMINAR')) {
        return 'seminario-type'
      }
      return 'curso-type'
    },
    
    async cargarDatos(tipoCursoId) {
      this.loading = true
      try {
        const institucionId = this.idInstitucion || config.app.idInstitucion
        await this.getTipoCur(tipoCursoId, institucionId)
        await this.getCursos(institucionId)
      } catch (error) { 
        console.error('Error cargando datos:', error) 
      } finally { 
        this.loading = false
        this.$store.commit("loading") 
      }
    },
    
    async getTipoCur(tipo_cur, institucionId) {
      try {
        if (!tipo_cur) {
          this.tipo = "CURSOS"
          this.tipoCursoId = null
          return
        }
        
        const res = await api.get(`/institucion/${institucionId}/gacetaEventos`)
        const cursos = res.data.cursos || []
        
        const cursoEncontrado = cursos.find(c => {
          const tipoId = c.idtipo_curso_otros
          return String(tipoId) === String(tipo_cur)
        })
        
        if (cursoEncontrado && cursoEncontrado.tipo_curso_otro) {
          this.tipo = cursoEncontrado.tipo_curso_otro.tipo_conv_curso_nombre.toUpperCase()
          this.tipoCursoId = cursoEncontrado.idtipo_curso_otros
        } else {
          const porNombre = cursos.find(c => 
            c.tipo_curso_otro?.tipo_conv_curso_nombre?.toUpperCase() === String(tipo_cur).toUpperCase()
          )
          if (porNombre) {
            this.tipo = porNombre.tipo_curso_otro.tipo_conv_curso_nombre.toUpperCase()
            this.tipoCursoId = porNombre.idtipo_curso_otros
          } else {
            this.tipo = "CURSOS"
            this.tipoCursoId = tipo_cur
          }
        }
      } catch (e) { 
        console.error('Error en getTipoCur:', e)
        this.tipo = "CURSOS"
        this.tipoCursoId = tipo_cur
      }
    },
    
    async getCursos(institucionId) {
      try {
        const res = await api.get(`/institucion/${institucionId}/gacetaEventos`)
        const data = res.data
        const lista = data.cursos || []
        
        this.cursos = lista
          .filter(c => {
            const estadoActivo = (c.det_estado == "1" || c.det_estado == 1)
            if (!estadoActivo) return false
            if (!this.tipoCursoId && !this.tipo) return true
            
            const tipoObj = c.tipo_curso_otro || {}
            const cursoTipoId = tipoObj.idtipo_curso_otros
            const cursoTipoNombre = tipoObj.tipo_conv_curso_nombre?.toUpperCase()
            
            const coincidePorId = this.tipoCursoId && String(cursoTipoId) === String(this.tipoCursoId)
            const coincidePorNombre = this.tipo && cursoTipoNombre === this.tipo.toUpperCase()
            
            return coincidePorId || coincidePorNombre
          })
          .map(this._limpiarObjeto)
        
        this._actualizarPager()
      } catch (e) { 
        console.error('Error en getCursos:', e)
        this.cursos = [] 
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
        
        this.$nextTick(() => {
          const coursesSection = document.querySelector('.course-area');
          if (coursesSection) {
            coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      const t = this.cursos?.length || 0
      this.pager = Math.ceil(t / this.NUM_RESULTS)
      if (this.pag > this.pager && this.pager > 0) this.pag = this.pager
    },
    
    _limpiarObjeto(obj) {
      if (!obj || typeof obj !== 'object') return obj
      const c = {...obj}
      Object.keys(c).forEach(k => { 
        if (typeof c[k] === 'string') c[k] = c[k].trim()
        else if (c[k] && typeof c[k] === 'object' && !Array.isArray(c[k])) 
          c[k] = this._limpiarObjeto(c[k])
      })
      return c
    },
    
    clickBack() {
      this.$store.commit("clickLink")
      this.$router.go(-1)
    }
  },
  created() {
    this.$store.commit("loadOn")
    this.applyDynamicColors();
    if (this.$route.params.tipo_cur) {
      this.cargarDatos(this.$route.params.tipo_cur)
    } else {
      this.getCursos(this.idInstitucion || config.app.idInstitucion)
    }
  },
  mounted() {
    this.applyDynamicColors();
  },
  beforeUnmount() {
    this.clearSearch()
    this.cursos = []
    
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }
};
</script>