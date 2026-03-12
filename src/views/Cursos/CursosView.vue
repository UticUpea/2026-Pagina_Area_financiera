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
        <div class="row">
          <div class="col-lg-8 col-12">
            <div v-if="searchGet">
              <h3 v-if="searchValues.length === 0" class="text-center">
                 No se encontraron resultados para "{{ search }}"
              </h3>
              <div v-else class="row justify-content-center">
                <div class="col-12">
                  <p>{{ searchValues.length }} resultado(s) encontrado(s)</p>
                  <hr />
                </div>

                <template v-for="cur of searchValues" :key="cur.iddetalle_cursos_academicos">
                  <div class="col-12 col-lg-6 mb-4">
                    <div class="single-course-inner" :class="getCourseTypeClass(cur)">
                      <div class="thumb">
                        <router-link :to="'/detalleCurso/' + cur.iddetalle_cursos_academicos" @click="$store.commit('clickLink')">
                          <img :src="imageUrl + cur.det_img_portada" :alt="cur.det_titulo" loading="lazy" />
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
                                  <img :src="imageUrl + fac.foto_facilitador" :alt="fac.nombre_facilitador" />
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
                </template>
              </div>
            </div>
            <div v-else class="row">
              <div v-if="cursos.length === 0 && loading" class="col-12 text-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Cargando...</span>
                </div>
                <p class="mt-3">Cargando cursos...</p>
              </div>
              <div v-else-if="cursos.length === 0" class="col-12 text-center">
                <h2 class="aligncenter">Sin {{ tipo.toLowerCase() }} disponibles</h2>
                <p class="text-muted">Pronto se agregarán nuevos cursos.</p>
              </div>
              <div v-else class="row justify-content-center">

                <template v-for="cur of cursos" :key="cur.iddetalle_cursos_academicos">
                  <div class="col-12 col-lg-6 mb-4">
                    <div class="single-course-inner" :class="getCourseTypeClass(cur)">
                      <div class="thumb">
                        <router-link :to="'/detalleCurso/' + cur.iddetalle_cursos_academicos" @click="$store.commit('clickLink')">
                          <img :src="imageUrl + cur.det_img_portada" :alt="cur.det_titulo" loading="lazy" />
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
                                  <img :src="imageUrl + fac.foto_facilitador" :alt="fac.nombre_facilitador" />
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
                  <input type="text" :placeholder="'Buscar ' + tipo.toLowerCase().slice(0, -1)" v-model="search" @keyup.enter="buscar" />
                  <button class="submit-btn" @click="buscar" type="button"><i class="fa fa-search"></i></button>
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
}
.submit-btn { 
  padding: 0.75rem 1.5rem; 
  background: var(--main-color-1, #007bff); 
  color: white; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
}

.single-course-inner.curso-type {
  min-height: 0px;
}

.single-course-inner.curso-type .thumb {
  height: 200px;
}

.single-course-inner.curso-type .price {
  width: 70px;
  height: 70px;
  font-size: 1.70rem;
}

.single-course-inner.curso-type .details-inner h5 {
  font-size: 1.60rem;
}

.single-course-inner.curso-type .descripcion-curso {
  font-size: 1.50rem;
}

.single-course-inner.curso-type .status {
  font-size: 1.50rem;
}

.single-course-inner.seminario-type {
  min-height: 470px;
}

.single-course-inner.seminario-type .thumb {
  height: 200px;
}

.single-course-inner.seminario-type .price {
  width: 65px;
  height: 65px;
  font-size: 1.60rem;
}

.single-course-inner.seminario-type .details-inner h5 {
  font-size: 1.50rem;
}

.single-course-inner.seminario-type .descripcion-curso {
  font-size: 1.50rem;
}

.single-course-inner.seminario-type .status {
  font-size: 1.30rem;
}

/* Estilos base compartidos */
.col-lg-6 {
  min-width: 300px;
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
  color: var(--main-color-1, #007bff);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 2;
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
}

.descripcion-curso {
  color: #666;
  margin: 0.75rem 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
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
  font-size: 1.50rem;
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
  font-size: 1.00rem;
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

.text-center h2, .text-center h3 { 
  color: #666; 
  padding: 2rem; 
}

@media (max-width: 768px) {
  .col-lg-6 {
    min-width: 100%;
  }
  
  .single-course-inner {
    min-height: 440px;
  }
  
  .single-course-inner .thumb {
    height: 180px;
  }
  
  .btn-leer-mas {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>

<script>
import SidebarCustom from "@/components/SidebarCustom.vue";
import { mapState } from "vuex";
import api from '@/plugins/axios'

export default {
  name: "CursosView",
  components: { SidebarCustom },
  data() {
    return {
      idInstitucion: process.env.VUE_APP_ID_INSTITUCION || '22',
      tipo: "CURSOS",
      cursos: [],
      tipoCursoId: null,
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
        await this.getTipoCur(tipoCursoId)
        await this.getCursos()
      } catch (error) { 
        console.error('Error cargando datos:', error) 
      } finally { 
        this.loading = false
        this.$store.commit("loading") 
      }
    },
    
    async getTipoCur(tipo_cur) {
      try {
        if (!tipo_cur) {
          this.tipo = "CURSOS"
          this.tipoCursoId = null
          return
        }
        
        const res = await api.get(`/institucion/${this.idInstitucion}/gacetaEventos`)
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
    
    async getCursos() {
      try {
        const res = await api.get(`/institucion/${this.idInstitucion}/gacetaEventos`)
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
    
    _actualizarPager() {
      const t = this.cursos?.length || 0
      this.pager = Math.ceil(t / this.NUM_RESULTS)
      if (this.pag > this.pager && this.pager > 0) this.pag = this.pager
    },
    
    buscar() {
      const q = this.search.trim().toUpperCase()
      if (q) {
        this.searchGet = true
        this.searchValues = this.cursos.filter(c => 
          c.det_titulo?.toUpperCase().includes(q) || 
          c.det_descripcion?.toUpperCase().includes(q)
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
    if (this.$route.params.tipo_cur) {
      this.cargarDatos(this.$route.params.tipo_cur)
    }
  },
  beforeUnmount() {
    this.limpiarBusqueda()
    this.cursos = []
  }
};
</script>