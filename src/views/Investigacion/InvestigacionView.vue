<!-- GACETA_TIPO
    TIPO_EVENTO === GACETAeVENTO
    PUBLICACIONES_TIPO ==== RECURSOS
     -->

<template>
  <div id="investigacion">
    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="breadcrumb-inner">
              <h2 class="page-title" style="color: #fff !important;">
                INVESTIGACIÓN
              </h2>
              <ul class="page-list">
                <li>
                  <router-link to="/">INICIO</router-link>
                </li>
                <li>INVESTIGACIÓN</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main-blog-area pd-top-120 pd-bottom-120">
      <div class="container">

        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 col-md-10">
            <div class="search-wrapper">
              <div class="search-input-group">
                <i class="fa fa-search search-icon"></i>
                <input
                  type="text"
                  placeholder="Buscar en investigación..."
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
                <span>{{ filteredContent.length }} resultado(s) encontrado(s)</span>
                <button @click="clearSearch" class="btn-clear-search">
                  Mostrar todo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">

          <div class="col-lg-8 col-12">
            <div class="single-blog-inner mb-0">
              <div class="details">
                <h4 class="mb-0">
                  {{ institucion?.institucion_nombre || 'Carrera' }} - Investigación
                </h4>
              </div>
              <div class="blog-content-inner mt-4">
                <p v-if="!isSearching || contentMatches('comprometida')">
                  La carrera de {{ institucion?.institucion_nombre }} está comprometida con el desarrollo de 
                  investigación científica de calidad que contribuya al avance del conocimiento en áreas 
                  económicas, financieras y administrativas.
                </p>
                
                <h5 class="mt-4" v-if="!isSearching || contentMatches('Líneas')">Líneas de Investigación</h5>
                <ul v-if="!isSearching || contentMatches('Líneas')">
                  <li v-if="!isSearching || contentMatches('Economía')">Economía y Desarrollo Regional</li>
                  <li v-if="!isSearching || contentMatches('Finanzas')">Finanzas y Mercados</li>
                  <li v-if="!isSearching || contentMatches('Gestión')">Gestión Empresarial</li>
                  <li v-if="!isSearching || contentMatches('Contabilidad')">Contabilidad y Auditoría</li>
                  <li v-if="!isSearching || contentMatches('Comercio')">Comercio Internacional</li>
                </ul>

                <h5 class="mt-4" v-if="!isSearching || contentMatches('Proyectos')">Proyectos en Curso</h5>
                <p v-if="!isSearching || contentMatches('Próximamente')">
                  Próximamente se publicará información sobre los proyectos de investigación activos 
                  y las publicaciones de nuestros docentes investigadores.
                </p>

                <div class="alert alert-info mt-4" role="alert" v-if="!isSearching || contentMatches('Nota')">
                  <i class="fa fa-info-circle"></i> 
                  <strong>Nota:</strong> Esta sección está en construcción. 
                  Pronto estará disponible información detallada sobre investigaciones, 
                  publicaciones científicas y proyectos de la carrera.
                </div>

                <div v-if="isSearching && filteredContent.length === 0" class="text-center py-4">
                  <i class="fa fa-search text-muted" style="font-size: 3rem; opacity: 0.3;"></i>
                  <p class="mt-3 text-muted">No se encontraron resultados para "{{ searchQuery }}"</p>
                </div>
              </div>
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
#investigacion {
  padding: 0;
}

.page-title-area {
  background-image: url("@/assets/Fondo2.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.blog-content-inner {
  line-height: 1.8;
  font-size: 1.05rem;
  color: #333;
}

.blog-content-inner h5 {
  color: var(--main-color, #007bff);
  margin-bottom: 1rem;
  font-weight: 600;
}

.blog-content-inner ul {
  list-style-type: none;
  padding-left: 0;
}

.blog-content-inner ul li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.blog-content-inner ul li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--main-color, #007bff);
  font-weight: bold;
}

.alert-info {
  padding: 1rem;
  background: rgba(0, 123, 255, 0.1);
  border: 1px solid rgba(0, 123, 255, 0.3);
  border-radius: 4px;
  color: #004085;
}

.alert-info i {
  margin-right: 0.5rem;
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

@media screen and (max-width: 768px) {
  .blog-content-inner {
    font-size: 1rem;
  }
  
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
}
</style>

<script>
import { mapState } from "vuex";
import SidebarCustom from "@/components/SidebarCustom.vue";
import { config } from '@/config/env'

export default {
  name: "InvestigacionView",
  
  components: {
    SidebarCustom,
  },
  
  data() {
    return {
      idInstitucion: config.app.idInstitucion || '22',
      institucion: {},
      searchQuery: "",
      isSearching: false,
      loading: false,
      searchTimeout: null,
      searchableContent: [
        'comprometida con el desarrollo de investigación científica',
        'Economía y Desarrollo Regional',
        'Finanzas y Mercados',
        'Gestión Empresarial',
        'Contabilidad y Auditoría',
        'Comercio Internacional',
        'Proyectos en Curso',
        'publicaciones de nuestros docentes investigadores',
        'Esta sección está en construcción'
      ]
    };
  },
  
  computed: {
    ...mapState(["Institucion", "url_api"]),

    filteredContent() {
      if (!this.searchQuery.trim()) {
        return this.searchableContent;
      }
      
      const query = this.searchQuery.toLowerCase().trim();
      
      return this.searchableContent.filter(content => 
        content.toLowerCase().includes(query)
      );
    }
  },

  methods: {
    async getInstitucionData() {
      this.loading = true
      try {
        this.institucion = this.Institucion || {}
      } catch (error) {
        console.error('Error cargando datos:', error)
      } finally {
        this.loading = false
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

    contentMatches(keyword) {
      if (!this.isSearching) return true;
      return keyword.toLowerCase().includes(this.searchQuery.toLowerCase().trim());
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
    },

    clearSearch() {
      this.searchQuery = "";
      this.isSearching = false;
      
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
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
    this.getInstitucionData();
    this.applyDynamicColors();
  },

  mounted() {
    this.applyDynamicColors();
  },

  beforeUnmount() {
    this.institucion = {};
    
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }
};
</script>