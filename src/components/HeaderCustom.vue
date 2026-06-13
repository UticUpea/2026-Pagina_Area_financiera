<template>
  <div class="navbar-area">
    <div class="navbar-top" :class="{ 'navbar-light': isLightMenu }">
      <div class="container">
        <div class="row">
          <div class="col-6 text-md-left">
            <ul>
              <li class="d-none d-md-inline-block" v-if="isValidEmail(Institucion.institucion_correo1)">
                <p>
                  <i class="fa fa-envelope-o"></i>
                  <a :href="buildMailTo(Institucion.institucion_correo1)" rel="noopener noreferrer">
                    {{ sanitizeText(Institucion.institucion_correo1) }}
                  </a>
                </p>
              </li>
            </ul>
          </div>
          <div class="col-6">
            <ul class="text-right">
              <li class="d-lg-inline-block d-none" v-if="isValidPhone(Institucion.institucion_celular1)">
                <p>
                  <i class="fa fa-phone"></i>
                  +591 {{ formatPhone(Institucion.institucion_celular1) }}
                </p>
              </li>
              <li class="d-lg-inline-block d-none" v-if="isValidPhone(Institucion.institucion_telefono1)">
                <p>
                  <i class="fa fa-phone"></i>
                  +591 {{ formatPhone(Institucion.institucion_telefono1) }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div> 
    <nav class="navbar navbar-area-1 navbar-area navbar-expand-lg" :class="{ 'navbar-light-menu': isLightMenu }">
      <div class="container nav-container">
        <div class="responsive-mobile-menu">
          <button class="menu toggle-btn d-block d-lg-none" :class="{ 'toggle-light': isLightMenu }" data-target="#edumint_main_menu" @click="openMenu()"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="icon-left"></span>
            <span class="icon-right"></span>
          </button>
        </div>
        
<div class="d-none d-lg-block">
  <div v-if="idInstitucion === '24'">
    <router-link to="/">
      <div class="logo_carrera">
        <img 
          src="@/assets/logoComercio.png" 
          alt="Comercio Internacional" 
          width="274" 
          height="113" 
          class="logo-animado"
          loading="lazy"
        />
      </div>
    </router-link>
  </div>
  <div v-else class="logo">
    <router-link to="/">
      <div class="logo_carrera">
        <img 
          :src="buildSafeImageUrl(Institucion?.institucion_logo)" 
          :alt="sanitizeText(Institucion?.institucion_nombre) || 'Logo institucional'"
          width="100"
          height="auto"
          @error="e => e.target.src = require('@/assets/upea.png')"
          class="logo-animado"
          loading="lazy"
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
              <router-link to="/about">INFORMACIÓN</router-link>
              <ul class="sub-menu" :style="[m_informacion ? 'display:block' : 'display:none']">
                <li>
                  <router-link to="/about#nosotros" @click="handleInfoNav">
                    SOBRE NOSOTROS
                  </router-link>
                </li>
                <li>
                  <router-link to="/about#mision" @click="handleInfoNav">
                    MISIÓN Y VISIÓN
                  </router-link>
                </li>
                <li>
                  <router-link to="/about#autoridades" @click="handleInfoNav">
                    AUTORIDADES
                  </router-link>
                </li>
                <li>
                  <router-link to="/about#contacto" @click="handleInfoNav">
                    CONTACTO
                  </router-link>
                </li>
              </ul>
            </li>

            <li class="menu-item-has-children" @mouseover="showSubMenu('m_conv')">
              <a href="#" aria-haspopup="true" aria-expanded="false">COMUNICADOS</a>
              <ul class="sub-menu" :style="[m_conv ? 'display:block' : 'display:none']">
                <li v-for="mc of MenuConv" :key="mc.idtipo_conv_comun">
                  <router-link :to="'/convocatorias/' + mc.idtipo_conv_comun" @click="click_m()">
                    {{ sanitizeText(mc.tipo_conv_comun_titulo) }}
                  </router-link>
                </li>
              </ul>
            </li>

            <li class="menu-item-has-children" @mouseover="showSubMenu('m_mas')">
              <a href="#" aria-haspopup="true" aria-expanded="false">MÁS</a>
              <ul class="sub-menu" :style="[m_mas ? 'display:block' : 'display:none']">
                <li v-for="mc of MenuCur" :key="'curso-' + mc.idtipo_curso_otros">
                  <router-link :to="'/cursos/' + mc.idtipo_curso_otros" @click="click_m()">
                    {{ sanitizeText(mc.tipo_conv_curso_nombre) }}
                  </router-link>
                </li>

                <li><router-link to="/servicios" @click="click_m()">SERVICIOS</router-link></li>
                <li><router-link to="/ofertas" @click="click_m()">OFERTAS ACADÉMICAS</router-link></li>
                <li><router-link to="/publicaciones" @click="click_m()">PUBLICACIONES</router-link></li>
                <li><router-link to="/gaceta" @click="click_m()">GACETA</router-link></li>
                <li><router-link to="/eventos" @click="click_m()">EVENTOS</router-link></li>
                <li><router-link to="/videos" @click="click_m()">VIDEOS</router-link></li>
                <li v-if="idInstitucion === '13'">
                  <router-link to="/investigacion" @click="click_m()">INSTITUTO DE INVESTIGACIÓN</router-link>
                </li>
              </ul>
            </li>
            
            <!-- Enlaces -->
            <li class="menu-item-has-children" @mouseover="showSubMenu('m_link')">
              <a href="#" aria-haspopup="true" aria-expanded="false">ENLACES</a>
              <ul class="sub-menu" :style="[m_link ? 'display:block' : 'display:none']">
                <li v-for="link of Links" :key="link.id_link">
                  <a 
                    :href="buildSafeUrl(link.url_link)" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    :title="sanitizeText(link.tipo)"
                  >
                    {{ sanitizeText(link.nombre) }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        
        <div class="nav-right-part nav-right-part-desktop" :class="{ 'style-white': !isLightMenu, 'style-dark': isLightMenu }">
          <ul class="mb-0">
            <li class="ml-2">
              <a 
                class="btn btn-red" 
                :href="loginUrl" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Iniciar sesión en el sistema administrativo"
              >
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

.navbar-nav a:focus {
  outline: 2px solid var(--main-color, #007bff);
  outline-offset: 2px;
}

/* Navbar top - Dark version (default) */
.navbar-top {
  background: rgba(0, 0, 0, 0.956);
}

.navbar-top p,
.navbar-top a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: color 0.3s ease;
}

.navbar-top a:hover {
  color: white;
  text-decoration: underline;
}

/* Navbar top - Light version (for institution 22) */
.navbar-top.navbar-light {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.navbar-top.navbar-light p,
.navbar-top.navbar-light a {
  color: rgba(0, 0, 0, 0.9);
}

.navbar-top.navbar-light a:hover {
  color: var(--main-color, #007bff);
}

/* Mobile menu toggle - Light version */
.toggle-light .icon-left,
.toggle-light .icon-right {
  background: #333 !important;
}

/* Navbar light menu */
.navbar-light-menu .navbar-nav > li > a,
.navbar-light-menu .navbar-nav > li > router-link {
  color: #333 !important;
}

.navbar-light-menu .navbar-nav > li > a:hover,
.navbar-light-menu .navbar-nav > li > router-link:hover {
  color: var(--main-color, #007bff) !important;
}

/* Style dark for button (default) */
.style-white .btn-red {
  background: #dc3545;
  color: white;
}

/* Style dark button for light menu */
.style-dark .btn-red {
  background: var(--main-color, #007bff);
  color: white;
}
/* id 22*/
.navbar-light-menu .navbar-nav > li > a,
.navbar-light-menu .navbar-nav > li > router-link,
.navbar-light-menu .navbar-nav > .menu-item-has-children > a {
  color: #000000 !important;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
}

.navbar-light-menu .navbar-nav > li > a:hover,
.navbar-light-menu .navbar-nav > li > router-link:hover {
  color: var(--main-color, #007bff) !important;
}

/* Iconos del menú móvil en blanco */
.navbar-light-menu .toggle-light .icon-left,
.navbar-light-menu .toggle-light .icon-right {
  background: #3b3737 !important;
}

/* Submenús para institución 22 */
.navbar-light-menu .menu-item-has-children .sub-menu {
  background: rgba(75, 74, 74, 0.95) !important;
  box-shadow: 0 5px 20px rgba(0,0,0,0.3) !important;
  border-top: 3px solid var(--main-color, #007bff) !important;
}

.navbar-light-menu .menu-item-has-children .sub-menu li a,
.navbar-light-menu .menu-item-has-children .sub-menu li router-link {
  color: rgba(255, 255, 255, 0.9) !important;
  border-bottom: 1px solid rgba(255,255,255,0.1) !important;
}

.navbar-light-menu .menu-item-has-children .sub-menu li a:hover,
.navbar-light-menu .menu-item-has-children .sub-menu li router-link:hover {
  background: var(--main-color, #007bff) !important;
  color: white !important;
  padding-left: 25px !important;
}

/* Flechas de submenús en blanco */
.navbar-light-menu .menu-item-has-children > a::after,
.navbar-light-menu .menu-item-has-children > router-link::after {
  color: #fff;
}

</style>

<script>
import { mapState } from "vuex";
import { config } from '@/config/env'
import logger from '@/utils/logger';

export default {
  name: "HeaderCustom",
  
  data() {
    return {
      idInstitucion: config.app.idInstitucion || '22',
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

    loginUrl() {
      return 'https://servicioadministrador.upea.bo';
    },

    isLightMenu() {
      // Institution 22 uses white/light menu with dark text
      return this.idInstitucion === '22';
    }
  },

  methods: {
    buildSafeImageUrl(path) {
      if (!path) return require('@/assets/upea.png');
      const cleaned = String(path).trim();
      if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
        return cleaned.replace('http://', 'https://');
      }
      const base = config.uploads?.baseUrl?.replace(/\/+$/, '');
      if (!base) return require('@/assets/upea.png');
      const resource = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
      return `${base}${resource}`.replace(/\/+/g, '/');
    },

    buildSafeUrl(url) {
      if (!url) return '#';
      const cleaned = String(url).trim().toLowerCase();
     if (cleaned.startsWith('javascript:') || 
      cleaned.startsWith('vbscript:') ||
      cleaned.startsWith('data:')) {
    logger.warn('URL bloqueada por seguridad:', url);
    return '#';
  }
      if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
        return cleaned.replace('http://', 'https://');
      }
      return `https://${String(url).trim()}`;
    },

    buildMailTo(email) {
      if (!email) return '#';
      const cleaned = String(email).trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleaned)) return '#';
      return `mailto:${cleaned}`;
    },

    sanitizeText(text) {
      if (!text) return '';
      return String(text)
        .trim()
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]*>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    },

    isValidEmail(email) {
      if (!email) return false;
      const cleaned = String(email).trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(cleaned) && cleaned.length > 5;
    },

    isValidPhone(phone) {
      if (!phone) return false;
      const cleaned = String(phone).replace(/[^0-9]/g, '');
      return cleaned.length >= 7 && cleaned.length <= 15;
    },

    formatPhone(phone) {
      if (!phone) return '';
      return String(phone).replace(/[^0-9]/g, '');
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

    handleInfoNav() {

      if (this.sopen) {
        this.sopen = false;
      }

    },

    click_m() {
      this.$store.commit("clickLink");
      this.openMenu();
    },

    click_ma() {
      this.$store.commit("clickLink");
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
        const institucionId = this.idInstitucion || config.app.idInstitucion;
        const res = await this.$api.get(`/institucion/${institucionId}/recursos`);
        const data = res.data;
        
        const filterLinks = (data.linksExternoInterno || [])
          .filter(link => link.estado === "1" || link.estado === 1)
          .map(this._limpiarObjeto);
        
        this.$store.commit('setLinks', filterLinks);
      } catch (error) {
       logger.error('Error cargando Links:', error);
      }
    },
    isUpeaDomain(url) {
  const upeaDomains = [
    'upea.bo',
    'upea.edu.bo'
  ];
  
  const cleaned = String(url).trim().toLowerCase();
  return upeaDomains.some(domain => cleaned.includes(domain));
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
    MenuCur: {
      handler() {},
      deep: true,
      immediate: true
    },
    Institucion: {
      handler() {
        this.applyDynamicColors();
      },
      deep: true,
      immediate: true
    }
  },

  created() {
    this.applyDynamicColors();
    this.getLinks();
  },

  mounted() {
    this.applyDynamicColors();
    if (this.getter) {
      this.getLinks();
      this.$store.commit('setGetter', false);
    }
  }
};
</script>