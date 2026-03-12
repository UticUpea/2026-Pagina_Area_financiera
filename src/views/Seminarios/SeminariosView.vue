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
                <template v-for="(sem, index) of searchValues" :key="sem.iddetalle_cursos_academicos || index">
                  <div class="col-12 col-lg-6">
                    <div class="single-course-inner">
                      <div class="thumb">
                        <router-link :to="'/detalleSeminario/' + sem.iddetalle_cursos_academicos">
                          <img :src="imageUrl + sem.det_img_portada" :alt="sem.det_titulo" loading="lazy" />
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
                              <router-link :to="'/detalleSeminario/' + sem.iddetalle_cursos_academicos" class="readmore-text">Leer más</router-link>
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
              <div v-if="seminarios.length === 0" class="col-12 text-center">
                <h2 class="aligncenter">Sin seminarios disponibles</h2>
                <p class="text-muted">Pronto se agregarán nuevos seminarios.</p>
              </div>
              <div v-else class="row justify-content-center">
                <template v-for="(sem, index) of seminarios" :key="sem.iddetalle_cursos_academicos || index">
                  <div class="col-12 col-lg-6" v-show="(pag - 1) * NUM_RESULTS <= index && pag * NUM_RESULTS > index">
                    <div class="single-course-inner">
                      <div class="thumb">
                        <router-link :to="'/detalleSeminario/' + sem.iddetalle_cursos_academicos">
                          <img :src="imageUrl + sem.det_img_portada" :alt="sem.det_titulo" loading="lazy" />
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
                              <router-link :to="'/detalleSeminario/' + sem.iddetalle_cursos_academicos" class="readmore-text">Leer más</router-link>
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
                  <input type="text" placeholder="Buscar seminario" v-model="search" @keyup.enter="buscar" />
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
.single-course-inner img { 
  width: 100%; 
  height: 200px; 
  object-fit: cover; 
  border-radius: 4px; 
}
.text-center h2, .text-center h3 { 
  color: #666; 
  padding: 2rem; 
}
.price { 
  font-size: 1.5rem; 
  font-weight: bold; 
  color: var(--main-color-1, #007bff); 
}
.author.media { 
  margin-top: 0.5rem; 
  padding: 0.5rem; 
  background: rgba(0,0,0,0.05); 
  border-radius: 4px; 
  display: flex; 
  align-items: center; 
  gap: 0.75rem; 
}
.author.media img { 
  width: 40px; 
  height: 40px; 
  border-radius: 50%; 
  object-fit: cover; 
}
</style>

<script>
import SidebarCustom from "@/components/SidebarCustom.vue";
import { mapState } from "vuex";
import api from '@/plugins/axios'

export default {
  name: "SeminariosView",
  components: { SidebarCustom },
  data() {
    return {
      idInstitucion: process.env.VUE_APP_ID_INSTITUCION || '22',
      tipo: "",
      tipoSeminarioId: null,
      seminarios: [],
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
  watch: {
    '$route.params.tipo_sem': {
      immediate: true,
      handler(nuevoTipo) { 
        if (nuevoTipo) this.cargarDatos(nuevoTipo) 
      }
    }
  },
  methods: {
    async cargarDatos(tipoSeminarioId) {
      this.loading = true
      try {
        await this.getTipoSem(tipoSeminarioId)
        await this.getSeminarios()
      } catch (error) { 
        console.error('Error:', error) 
      } finally { 
        this.loading = false
        this.$store.commit("loading") 
      }
    },

    async getTipoSem(tipo_sem) {
      try {
        if (!tipo_sem) {
          this.tipo = "SEMINARIOS"
          return
        }
        
        const res = await api.get(`/institucion/${this.idInstitucion}/gacetaEventos`)
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
    
    async getSeminarios() {
      this.loading = true
      try {
        const res = await api.get(`/institucion/${this.idInstitucion}/gacetaEventos`)
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

    _actualizarPager() {
      const t = this.seminarios?.length || 0
      this.pager = Math.ceil(t / this.NUM_RESULTS)
      if (this.pag > this.pager && this.pager > 0) this.pag = this.pager
    },
    buscar() {
      const q = this.search.trim().toUpperCase()
      if (q) {
        this.searchGet = true
        this.searchValues = this.seminarios.filter(s => 
          s.det_titulo?.toUpperCase().includes(q) || 
          s.det_descripcion?.toUpperCase().includes(q)
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
    if (this.$route.params.tipo_sem) {
      this.cargarDatos(this.$route.params.tipo_sem)
    } else {
      this.getSeminarios()
    }
  },
  beforeUnmount() {
    this.limpiarBusqueda()
    this.seminarios = []
  }
}
</script>