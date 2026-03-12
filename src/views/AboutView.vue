<template>
  <div id="about_d">
    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-lg-7">
            <div class="breadcrumb-inner">
              <h2 class="page-title" style="color: #fff !important;">SOBRE NOSOTROS</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section id="nosotros">
      <div class="about-area about-right-bg-half bg-gray pd-top-50 pd-bottom-90 banner-img">
        <div class="container pd-top-60">
          <h2 class="title">Sobre la carrera</h2>
          <div class="row">

            <div class="col-lg-6 bg-gray">
              <div class="section-title" style="overflow-y: auto; height: 40rem; border: 2px solid #fff;">
                <p style="padding: 2rem!important;" class="content" v-html="institucion.institucion_sobre_ins"></p>
              </div>
            </div>
            <div class="col-lg-6">
              <img src="@/assets/perfil.jpg" alt="fondo" />
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-lg-3" style="display: flex; align-items: center">
            <div class="section-title">
              <h2 class="title">
                Historia de la institución
                <img :src="imageUrl + institucion.institucion_logo" alt="logo" />
              </h2>
            </div>
          </div>
          <div class="col-lg-9 bg-gray">
            <div class="section-title">
              <p class="content" v-html="institucion.institucion_historia"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="mision">
      <br>
      <div class="bg-cover about-area pd-top-50 pd-bottom-90 bg-cover-img">
        <h5 class="sub-title">Sobre la carrera</h5>
        <h2 class="title">{{ institucion.institucion_nombre }}</h2>

        <div class="container">
          <div class="row">
            
            <!-- Misión -->
            <div class="col-lg-6 align-self-center mt-4 mt-lg-0">
              <div class="section-title style-bg mb-0" style="border: 2px solid #fff; padding: 2rem; border-radius: 20px; background-color: rgba(244, 244, 244, 0.8);">
                <div class="single-list-inner mt-4">
                  <ul>
                    <li>
                      <i class="fa fa-check"></i> Misión
                      <p v-html="institucion.institucion_mision"></p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-lg-6 align-self-center mt-4 mt-lg-0">
              <div class="section-title style-bg mb-0" style="border: 2px solid #fff; padding: 2rem; border-radius: 20px; background-color: rgba(244, 244, 244, 0.8);">
                <div class="single-list-inner mt-4">
                  <ul>
                    <li>
                      <i class="fa fa-check"></i> Visión
                      <p v-html="institucion.institucion_vision"></p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>

    <section id="autoridades">
      <br>
      <div class="team-area pd-top-115 pd-bottom-60">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="section-title text-center">
                <h6 class="sub-title">Autoridades</h6>
                <h2 class="title">Nuestras autoridades</h2>
              </div>
            </div>
          </div>
          
          <div class="row justify-content-center">
            <div 
              class="col-lg-4 col-md-6" 
              v-for="(autoridad, index) of autoridades" 
              :key="autoridad.id_autoridad || index"
              v-show="(pag - 1) * NUM_RESULTS <= index && pag * NUM_RESULTS > index"
            >
              <div class="single-team-inner">
                <div class="thumb thumb-img">
                  <img 
                    :src="imageUrl + autoridad.foto_autoridad" 
                    alt="img" 
                  />
                </div>
                <div class="details pt-5">
                  <h5>
                    <a>{{ autoridad.nombre_autoridad }}</a>
                    <br>
                    <span> - {{ autoridad.cargo_autoridad }}</span>
                  </h5>
                  <ul class="team-social-media">

                    <li>
                      <a 
                        v-if="autoridad.celular_autoridad"

                        :href="'https://wa.me/' + autoridad.celular_autoridad.replace(/[^0-9]/g, '')" 
                        target="_blank"
                      >
                        <i class="fa fa-whatsapp" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a 
                        v-if="autoridad.facebook_autoridad && autoridad.facebook_autoridad !== '_'"

                        :href="autoridad.facebook_autoridad?.trim()" 
                        target="_blank"
                      >
                        <i class="fa fa-facebook" aria-hidden="true"></i>
                      </a>
                    </li>

                    <li>
                      <a 
                        v-if="autoridad.twiter_autoridad && autoridad.twiter_autoridad !== '_'"
                        :href="autoridad.twiter_autoridad?.trim()" 
                        target="_blank"
                      >
                        <i class="fa fa-twitter" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <nav class="col-12 td-page-navigation text-center mb-5 mb-lg-0" v-if="pager > 1">
              <ul class="pagination">
                <li class="pagination-arrow disable">
                  <a href="#" aria-label="Previous" @click.prevent="pag > 1 ? pag-- : null">
                    <i class="fa fa-angle-double-left"></i>
                  </a>
                </li>
                <li v-for="(i, index) of pager" :key="index">
                  <a href="#" :class="[i === pag ? 'active' : '']" @click.prevent="pag = i">
                    {{ i }}
                  </a>
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
    </section>
    <section id="contacto">
      <div>
        <div class="bg-cover bg-cover-img">
          <div class="about-area about-right-bg-half bg-gray pd-top-50 pd-bottom-90">
            <div class="container">
              <div class="section-title">
                <h2 class="title">Contáctese con nosotros</h2>
              </div>
              <div class="">
                <div class="col-lg-4 bg-gray" style="text-align:center!important;"></div>
                <div class="marco-aut-1">
                  <div class="">
                    <p>
                      <b><i class="fa fa-phone"></i> Celular 1: </b>
                      {{ institucion.institucion_celular1 }}
                    </p>
                    <p>
                      <b><i class="fa fa-phone"></i> Teléfono 1: </b>
                      {{ institucion.institucion_telefono1 }}
                    </p>
                    <p>
                      <b><i class="fa fa-envelope"></i> Correo 1: </b>
                      {{ institucion.institucion_correo1?.trim() }}
                    </p>
                    <p>
                      <b><i class="fa fa-facebook"></i> Facebook: </b>
                      <a :href="institucion.institucion_facebook?.trim()" target="_blank">
                        {{ institucion.institucion_facebook?.trim() }}
                      </a>
                    </p>

                    <p>
                      <b><i class="fa fa-youtube"></i> Youtube: </b>
                      <a :href="institucion.institucion_youtube?.trim()" target="_blank">
                        {{ institucion.institucion_youtube?.trim() }}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-g-map">
          <h2>O visítenos</h2>
          <h4>
            <i class="fa fa-map-marker"></i> {{ institucion.institucion_direccion }}
          </h4>
          <iframe 
            :src="institucion.institucion_api_google_map?.trim()"
            width="100%" 
            height="400" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy">
          </iframe>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>

.bg-cover-img {
  background-image: url("@/assets/fondo_upea.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  object-fit: cover;
  background-size: 100%;
  padding-top: 30px;
  padding-bottom: 50px;
  position: relative;
}

.section-title p {
  line-height: 1.6;
}

.team-social-media li {
  display: inline-block;
  margin: 0 5px;
}

.team-social-media a {
  color: inherit;
  transition: color 0.3s ease;
}

.team-social-media a:hover {
  color: var(--main-color-1, #007bff);
}

iframe {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>

<script>
import { mapState } from "vuex";
import api from '@/plugins/axios' 

export default {
  name: "AboutView",
  
  data() {
    return {
      idInstitucion: process.env.VUE_APP_ID_INSTITUCION || '22',

      institucion: {},
      autoridades: [],
      NUM_RESULTS: 3,
      pag: 1,
      pager: 0,

      loading: {
        institucion: false,
        contenido: false
      }
    };
  },
  
  computed: {
    ...mapState(["Institucion", "url_api"]),

    imageUrl() {
      return process.env.VUE_APP_UPLOADS_URL?.trim() || 'https://apiadministrador.upea.bo'
    }
  },

  methods: {
    async getInstitucionData() {
      this.loading.institucion = true
      try {
        const res = await api.get(`/institucionesPrincipal/${this.idInstitucion}`)
        const data = res.data.Descripcion
        this.institucion = this._limpiarObjeto(data)

        this.$store.commit('setInstitucion', this.institucion)
        
      } catch (error) {
        console.error('Error cargando institución:', error)
      } finally {
        this.loading.institucion = false
      }
    },

    async getAutoridades() {
      this.loading.contenido = true
      try {
        const res = await api.get(`/institucion/${this.idInstitucion}/contenido`)
        const data = res.data
        
        this.autoridades = data.autoridad?.map(this._limpiarObjeto) || []
        
        this._actualizarPager()
        
      } catch (error) {
        console.error('Error cargando autoridades:', error)
      } finally {
        this.loading.contenido = false
        this.$store.commit("loading") 
      }
    },
    _actualizarPager() {
      const total = this.autoridades?.length || 0
      this.pager = Math.ceil(total / this.NUM_RESULTS)
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
    }
  },
  created() {
    this.$store.commit("loadOn")

    Promise.all([
      this.getInstitucionData(),
      this.getAutoridades()
    ]).then(() => {
      this.$store.commit("loadOff")
    })
  }
};
</script>