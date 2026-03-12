<template>
  <div>
    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="breadcrumb-inner">
              <h2 class="page-title" style="color: #fff !important;">
                {{ seminario.det_titulo || 'Detalle de Seminario' }}
              </h2>
              <ul class="page-list">
                <li>
                  <router-link to="/">INICIO</router-link>
                </li>
                <li>
                  <a style="cursor: pointer" @click="clickBack">
                    {{ seminario.tipo_curso_otro?.tipo_conv_curso_nombre || 'SEMINARIOS' }}
                  </a>
                </li>
                <li>{{ seminario.det_titulo || 'Seminario' }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main-blog-area pd-top-120 pd-bottom-90">
      <div class="container">
        <div class="row justify-content-center">

          <div class="col-lg-8 col-12" v-if="errorGet">
            <div class="text-center">
              <h1>Seminario inexistente</h1>
              <p>El seminario que buscas no está disponible o fue eliminado.</p>
              <button class="btn btn-base mt-3" @click="clickBack">
                <i class="fa fa-arrow-left"></i> Volver a Seminarios
              </button>
            </div>
          </div>

          <div class="col-lg-8 col-12" v-else-if="loading">
            <div class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Cargando...</span>
              </div>
              <p class="mt-3">Cargando información del seminario...</p>
            </div>
          </div>

          <div class="col-lg-8 col-12" v-else-if="seminario.iddetalle_cursos_academicos">
            <div class="course-details-page">

              <div class="course-details-meta-list">
                <div class="row">
                  <div class="col-12 mt-4 mt-md-0">
                    <div class="row">
                      <div class="col-4 align-self-center">
                        <h6>{{ seminario.det_costo }} Bs</h6>
                        <span>Costo general</span>
                      </div>
                      <div class="col-4 align-self-center">
                        <h6>{{ seminario.det_costo_profe }} Bs</h6>
                        <span>Costo profesional</span>
                      </div>
                      <div class="col-4 align-self-center">
                        <h6>{{ seminario.det_costo_ext }} Bs</h6>
                        <span>Costo exterior</span>
                      </div>
                      <div class="col-4 align-self-center">
                        <h6>{{ formatearFecha(seminario.det_fecha_ini) }}</h6>
                        <span>Fecha inicio</span>
                      </div>
                      <div class="col-4 align-self-center">
                        <h6>{{ formatearFecha(seminario.det_fecha_fin) }}</h6>
                        <span>Fecha fin</span>
                      </div>
                      <div class="col-4 align-self-center">
                        <h6>{{ seminario.det_hora_ini }}</h6>
                        <span>Hora inicio</span>
                      </div>
                      <div class="col-4 align-self-center" v-if="seminario.det_carga_horaria">
                        <h6>{{ seminario.det_carga_horaria }} hrs</h6>
                        <span>Carga horaria</span>
                      </div>
                      <div class="col-4 align-self-center" v-if="seminario.det_cupo_max">
                        <h6>{{ seminario.det_cupo_max }} cupos</h6>
                        <span>Cupos disponibles</span>
                      </div>
                      <div class="col-4 align-self-center" v-if="seminario.det_modalidad">
                        <h6>{{ seminario.det_modalidad }}</h6>
                        <span>Modalidad</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="thumb">
                <a 
                  :href="imageUrl + seminario.det_img_portada" 
                  target="_blank"
                >

                  <img
                    :src="imageUrl + seminario.det_img_portada"
                    :alt="seminario.det_titulo"
                    style="cursor: zoom-in"
                    loading="lazy"
                  />
                </a>
              </div>
              <div class="course-details-nav-tab text-center">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="tab1-tab"
                      data-toggle="tab"
                      href="#tab1"
                      role="tab"
                      aria-controls="tab1"
                      aria-selected="true"
                    >
                      <i class="fa fa-book"></i> Descripción del seminario
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="tab3-tab"
                      data-toggle="tab"
                      href="#tab3"
                      role="tab"
                      aria-controls="tab3"
                      aria-selected="false"
                    >
                      <i class="fa fa-graduation-cap"></i> Facilitadores
                    </a>
                  </li>
                </ul>
              </div>
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="tab1"
                  role="tabpanel"
                  aria-labelledby="tab1-tab"
                >
                  <div class="course-details-content">
                    <h4 class="title">{{ seminario.det_titulo }}</h4>
                    <p v-html="seminario.det_descripcion"></p>
                    <div v-if="seminario.det_lugar_curso" class="mt-4">
                      <b><i class="fa fa-map-marker"></i> Lugar: </b>
                      {{ seminario.det_lugar_curso }}
                    </div>
                    <div v-if="seminario.det_grupo_whatssap" class="mt-2">
                      <b><i class="fa fa-whatsapp"></i> Grupo WhatsApp: </b>
                      <a :href="seminario.det_grupo_whatssap" target="_blank">
                        Unirse al grupo
                      </a>
                    </div>
                  </div>
                </div>

                <div
                  class="tab-pane fade"
                  id="tab3"
                  role="tabpanel"
                  aria-labelledby="tab3-tab"
                >
                  <div class="row">
                    <div
                      class="col-md-6"
                      v-for="(fac, index) of seminario.facilitadores"
                      :key="fac.facilitador_id || index"
                    >
                      <div class="single-team-inner">
                        <div class="thumb">

                          <img
                            :src="imageUrl + fac.foto_facilitador"
                            :alt="fac.nombre_facilitador"
                            loading="lazy"
                          />
                        </div>
                        <div class="details pt-5">
                          <ul class="team-social-media">
                            <!-- Facebook -->
                            <li>
                              <a 
                                v-if="fac.facebook_facilitador && fac.facebook_facilitador !== '_'"
                                :href="fac.facebook_facilitador?.trim()" 
                                target="_blank"
                              >
                                <i class="fa fa-facebook" aria-hidden="true"></i>
                              </a>
                            </li>
                            <li>
                              <a 
                                v-if="fac.celular_facilitador"
                                :href="'https://wa.me/' + fac.celular_facilitador?.toString().replace(/[^0-9]/g, '')" 
                                target="_blank"
                              >
                                <i class="fa fa-whatsapp" aria-hidden="true"></i>
                              </a>
                            </li>
                          </ul>
                          <h5>
                            <a>{{ fac.nombre_facilitador }}</a>
                            <span> - {{ fac.cargo_facilitador }}</span>
                          </h5>
                          <div class="mt-1" v-if="fac.descripcion_facilitador">
                            {{ fac.descripcion_facilitador }}
                          </div>
                          <p v-if="fac.celular_facilitador">
                            <i class="fa fa-user"></i>&nbsp; +{{ fac.celular_facilitador }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center mt-5">
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

.course-details-page .thumb img {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 4px;
  max-width: 100%;
  height: auto;
}

.course-details-page .thumb img:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.text-center h1 {
  color: #dc3545;
  margin-bottom: 1rem;
}

.text-center p {
  color: #666;
  font-size: 1.1rem;
}

.course-details-meta-list h6 {
  color: var(--main-color-1, #007bff);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.course-details-meta-list span {
  font-size: 0.85rem;
  color: #666;
}

.nav-tabs .nav-link {
  color: #333;
  border: none;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.nav-tabs .nav-link.active {
  color: var(--main-color-1, #007bff);
  border-bottom-color: var(--main-color-1, #007bff);
  background: transparent;
}

.nav-tabs .nav-link:hover {
  border-bottom-color: var(--main-color-1, #007bff);
}

.single-team-inner {
  margin-bottom: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  transition: box-shadow 0.3s ease;
}

.single-team-inner:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.single-team-inner img {
  width: 100%;
  max-width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0 auto;
  display: block;
}

.team-social-media {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.team-social-media a {
  color: #666;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.team-social-media a:hover {
  color: var(--main-color-1, #007bff);
}

.course-details-content {
  line-height: 1.8;
  color: #333;
}

.course-details-content b {
  color: var(--main-color-1, #007bff);
}
</style>

<script>
import { mapState } from "vuex";
import SidebarCustom from "@/components/SidebarCustom.vue";
import api from '@/plugins/axios'

export default {
  name: "DetalleSeminario",
  
  components: { 
    SidebarCustom 
  },
  
  data() {
    return {
      idInstitucion: process.env.VUE_APP_ID_INSTITUCION || '22',
      seminario: {},
      loading: false,
      errorGet: false,
    };
  },
  
  computed: {
    ...mapState(["url_api", "Institucion"]),

    imageUrl() {
      return process.env.VUE_APP_UPLOADS_URL?.trim() || 'https://apiadministrador.upea.bo'
    }
  },

  methods: {
    async getSeminarioOne() {
      this.loading = true
      this.errorGet = false
      
      try {
        const idSem = this.$route.params.idCur

        const res = await api.get(`/institucion/${this.idInstitucion}/gacetaEventos`)
        const data = res.data
        
        const lista = data.cursos || []
        this.seminario = lista.find(c => 
          c.iddetalle_cursos_academicos == idSem &&
          c.tipo_curso_otro?.tipo_conv_curso_nombre?.toUpperCase() === 'SEMINARIOS'
        ) || {}

        if (!this.seminario.iddetalle_cursos_academicos) {
          this.errorGet = true
          console.warn('Seminario no encontrado con ID:', idSem)
          return
        }

        this.seminario = this._limpiarObjeto(this.seminario)
        
      } catch (error) {
        console.error('Error cargando seminario:', error)
        this.errorGet = true

        if (error.response?.status === 404) {
          console.warn('Seminario no encontrado (404)')
        } else if (error.response?.status === 500) {
          console.error('Error del servidor (500)')
        }
      } finally {
        this.loading = false
        this.$store.commit("loading")
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
    this.getSeminarioOne()
  },

  beforeUnmount() {
    this.seminario = {}
    this.errorGet = false
    this.loading = false
  }
};
</script>