<template>
  <div class="navbar-area">
    <div class="navbar-top">
      <div class="container">
        <div class="row">
          <div class="col-6 text-md-left">
            <ul>
              <li class="d-none d-md-inline-block" v-if="Institucion.institucion_correo1?.trim()">
                <p>
                  <i class="fa fa-envelope-o"></i>
                  {{ Institucion.institucion_correo1?.trim() }}
                </p>
              </li>
            </ul>
          </div>
          <div class="col-6">
            <ul class="text-right">
              <li class="d-lg-inline-block d-none" v-if="Institucion.institucion_celular1">
                <p>
                  <i class="fa fa-phone"></i>
                  +591 {{ Institucion.institucion_celular1 }}
                </p>
              </li>
              <li class="d-lg-inline-block d-none" v-if="Institucion.institucion_telefono1">
                <p>
                  <i class="fa fa-phone"></i>
                  +591 {{ Institucion.institucion_telefono1 }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <nav class="navbar navbar-area-1 navbar-area navbar-expand-lg">
      <div class="container nav-container">
        <div class="responsive-mobile-menu">
          <button class="menu toggle-btn d-block d-lg-none" data-target="#edumint_main_menu" @click="openMenu()"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="icon-left"></span>
            <span class="icon-right"></span>
          </button>
        </div>
        <div>
          <div v-if="idInstitucion === '24'">
            <router-link to="/">
              <div class="logo_carrera">
                <img src="@/assets/logoComercio.png" 
                alt="Comercio Internacional" 
                width="274" 
                height="113" 
                class="logo-animado"/>
              </div>
            </router-link>
          </div>
          <div v-else class="logo">
            <router-link to="/">
              <div class="logo_carrera">
                <img 
                  :src="imageUrl + Institucion?.institucion_logo" 
                  :alt="Institucion?.institucion_nombre || 'Logo'"
                  width="100"
                  height="auto"
                  @error="e => e.target.src = require('@/assets/upea.png')"
                  class="logo-animado"
                  />
              </div>
            </router-link>
          </div>
        </div>
        &nbsp;
        <div class="collapse navbar-collapse" :class="[sopen ? 'sopen' : '']" id="edumint_main_menu">
          <ul class="navbar-nav menu-open">
            
            <!-- Inicio -->
            <li @mouseover="showSubMenu('m_inicio')">
              <router-link to="/">INICIO</router-link>
            </li>
            <li class="menu-item-has-children" @mouseover="showSubMenu('m_informacion')">
              <router-link to="/about">INFORMACION</router-link>
              <ul class="sub-menu" :style="[m_informacion ? 'display:block' : 'display:none']">
                <li><a href="#abaut" @click="click_ma()">SOBRE NOSOTROS</a></li>
                <li><a href="#mision" @click="click_ma()">MISION Y VISION</a></li>
                <li><a href="#autoridades" @click="click_ma()">AUTORIDADES</a></li>
                <li><a href="#contacto" @click="click_ma()">CONTACTO</a></li>
              </ul>
            </li>
            <li class="menu-item-has-children" @mouseover="showSubMenu('m_conv')">
              <a href="#">COMUNICADOS</a>
              <ul class="sub-menu" :style="[m_conv ? 'display:block' : 'display:none']">
                <li v-for="mc of MenuConv" :key="mc.idtipo_conv_comun">
                  <router-link :to="'/convocatorias/' + mc.idtipo_conv_comun" @click="click_m()">
                    {{ mc.tipo_conv_comun_titulo }}
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="menu-item-has-children" @mouseover="showSubMenu('m_mas')">
              <a href="#">MAS</a>
              <ul class="sub-menu" :style="[m_mas ? 'display:block' : 'display:none']">
                <li v-for="mc of MenuCur" :key="'curso-' + mc.idtipo_curso_otros">
                  <router-link :to="'/cursos/' + mc.idtipo_curso_otros" @click="click_m()">
                    {{ mc.tipo_conv_curso_nombre }}
                  </router-link>
                </li>
                
                <!-- Enlaces fijos -->
                <li><router-link to="/servicios" @click="click_m()">SERVICIOS</router-link></li>
                <li><router-link to="/ofertas" @click="click_m()">OFERTAS ACADÉMICAS</router-link></li>
                <li><router-link to="/publicaciones" @click="click_m()">PUBLICACIONES</router-link></li>
                <li><router-link to="/gaceta" @click="click_m()">GACETA</router-link></li>
                <li><router-link to="/eventos" @click="click_m()">EVENTOS</router-link></li>
                <li><router-link to="/videos" @click="click_m()">VIDEOS</router-link></li>
                <li v-if="idInstitucion === '13'">
                  <router-link to="/investigacion" @click="click_m()">INSTITUTO DE INVESTIGACION</router-link>
                </li>
              </ul>
            </li>
            <li class="menu-item-has-children" @mouseover="showSubMenu('m_link')">
              <a href="#">ENLACES</a>
              <ul class="sub-menu" :style="[m_link ? 'display:block' : 'display:none']">
                <li v-for="link of Links" :key="link.id_link">
                  <a :href="formatUrl(link.url_link)" target="_blank" :title="link.tipo">
                    {{ link.nombre }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="nav-right-part nav-right-part-desktop style-white">
          <ul class="mb-0">
            <li class="ml-2">
              <a class="btn btn-red" href="https://servicioadministrador.upea.bo/sign-in" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-login-2" width="24"
                  height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2"></path>
                  <path d="M3 12h13l-3 -3"></path>
                  <path d="M13 15l3 -3"></path>
                </svg> Iniciar Sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>

.logo-animado {
  animation: flip-horizontal 5s ease-in-out infinite;
  transform-style: preserve-3d;
}

@keyframes flip-horizontal {
  0% {
    transform: perspective(400px) rotateY(0deg);
  }
  100% {
    transform: perspective(400px) rotateY(360deg);
  }
}
.logo-animado:hover {
  animation-play-state: paused;
}


.logo_carrera {
  display: flex;
  align-items: center;
}
.logo_carrera h3 {
  color: white;
  padding: 5px;
}
</style>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      idInstitucion: process.env.VUE_APP_ID_INSTITUCION || '22',
      sopen: false,
      m_inicio: false,
      m_informacion: false,
      m_conv: false,
      m_cur: false,
      m_mas: false,
      m_link: false,
    };
  },

  computed: {
    ...mapState(["url_api", "MenuConv", "MenuCur", "Institucion", "getter", "Links"]),

    imageUrl() {
      return (process.env.VUE_APP_UPLOADS_URL || 'https://apiadministrador.upea.bo').trim()
    }
  },

  methods: {
    formatUrl(value) {
      if (!value) return '#'
      const trimmed = String(value).trim()
      return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`
    },

    click_m() {
      this.$store.commit("clickLink");
      this.openMenu();
    },

    click_ma() {
      this.$store.commit("clickLink");
      this.$router.push("/about");
      this.openMenu();
    },

    showSubMenu(id) {
      this.m_inicio = false;
      this.m_informacion = false;
      this.m_conv = false;
      this.m_cur = false;
      this.m_mas = false;
      this.m_link = false;

      switch (id) {
        case "m_inicio": this.m_inicio = true; break;
        case "m_informacion": this.m_informacion = true; break;
        case "m_conv": this.m_conv = true; break;
        case "m_cur": this.m_cur = true; break;
        case "m_mas": this.m_mas = true; break;
        case "m_link": this.m_link = true; break;
      }
    },

    openMenu() {
      this.sopen = !this.sopen;
    },

    async getLinks() {
      try {
        const res = await this.$api.get(`/institucion/${this.idInstitucion}/recursos`)
        const data = res.data
        const filterLinks = (data.linksExternoInterno || [])
          .filter(link => link.estado === "1" || link.estado === 1)
          .map(this._limpiarObjeto)
        this.$store.commit('setLinks', filterLinks)
      } catch (error) {
        console.error('Error cargando Links:', error)
      }
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

  watch: {
    MenuCur: {
      handler() {
      },
      deep: true,
      immediate: true
    }
  },

  created() {
    this.getLinks();
  },

  mounted() {
    if (this.getter) {
      this.getLinks();
      this.$store.commit('setGetter', false);
    }
  }
};
</script>