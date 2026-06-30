<template>
  <div class="navbar-area">
    <div class="navbar-top" :class="{ 'navbar-light': isLightMenu }">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-6 text-md-left">
            <ul class="topbar-list">
              <li class="d-none d-md-inline-block" v-if="isValidEmail(Institucion.institucion_correo1)">
                <a :href="buildMailTo(Institucion.institucion_correo1)" rel="noopener noreferrer" class="topbar-link">
                  <i class="fa fa-envelope-o icon-margin"></i>
                  {{ sanitizeText(Institucion.institucion_correo1) }}
                </a>
              </li>
            </ul>
          </div>
          <div class="col-6">
            <ul class="topbar-list text-right">
              <li class="d-lg-inline-block d-none" v-if="isValidPhone(Institucion.institucion_celular1)">
                <span class="topbar-link">
                  <i class="fa fa-phone icon-margin"></i>
                  +591 {{ formatPhone(Institucion.institucion_celular1) }}
                </span>
              </li>
              <li class="d-lg-inline-block d-none" v-if="isValidPhone(Institucion.institucion_telefono1)">
                <span class="topbar-link">
                  <i class="fa fa-phone icon-margin"></i>
                  +591 {{ formatPhone(Institucion.institucion_telefono1) }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div> 

    <nav
      class="navbar navbar-area-1 navbar-area navbar-expand-lg"
      :class="{
        'navbar-light-menu': isLightMenu,
        'menu-scroll': isLightMenu && scrolled
      }"
    >
      <div class="container nav-container">
        <div class="responsive-mobile-menu">
          <button class="menu toggle-btn d-block d-lg-none" :class="{ 'toggle-light': isLightMenu }" data-target="#edumint_main_menu" @click="openMenu()"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="icon-left"></span>
            <span class="icon-right"></span>
          </button>
        </div>
        
        <div class="d-none d-lg-block brand-logo">
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
            
            <li @mouseover="showSubMenu('m_inicio')">
              <router-link to="/" class="nav-link-custom">INICIO</router-link>
            </li>
            
            <li class="menu-item-has-children" @mouseover="showSubMenu('m_informacion')">
              <router-link to="/about" class="nav-link-custom">INFORMACIÓN</router-link>
              <ul class="sub-menu shadow-modern" :style="[m_informacion ? 'display:block' : 'display:none']">
                <li><router-link to="/about#nosotros" @click="handleInfoNav">SOBRE NOSOTROS</router-link></li>
                <li><router-link to="/about#mision" @click="handleInfoNav">MISIÓN Y VISIÓN</router-link></li>
                <li><router-link to="/about#autoridades" @click="handleInfoNav">AUTORIDADES</router-link></li>
                <li><router-link to="/about#contacto" @click="handleInfoNav">CONTACTO</router-link></li>
              </ul>
            </li>

            <li class="menu-item-has-children" @mouseover="showSubMenu('m_conv')">
              <a href="#" aria-haspopup="true" aria-expanded="false" class="nav-link-custom">COMUNICADOS</a>
              <ul class="sub-menu shadow-modern" :style="[m_conv ? 'display:block' : 'display:none']">
                <li v-for="mc of MenuConv" :key="mc.idtipo_conv_comun">
                  <router-link :to="'/convocatorias/' + mc.idtipo_conv_comun" @click="click_m()">
                    {{ sanitizeText(mc.tipo_conv_comun_titulo) }}
                  </router-link>
                </li>
              </ul>
            </li>

            <li class="menu-item-has-children" @mouseover="showSubMenu('m_mas')">
              <a href="#" aria-haspopup="true" aria-expanded="false" class="nav-link-custom">MÁS</a>
              <ul class="sub-menu shadow-modern" :style="[m_mas ? 'display:block' : 'display:none']">
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
            
            <li class="menu-item-has-children" @mouseover="showSubMenu('m_link')">
              <a href="#" aria-haspopup="true" aria-expanded="false" class="nav-link-custom">ENLACES</a>
              <ul class="sub-menu shadow-modern" :style="[m_link ? 'display:block' : 'display:none']">
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
                class="btn btn-action-login" 
                :href="loginUrl" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Iniciar sesión en el sistema administrativo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-login-2" width="20"
                  height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2"></path>
                  <path d="M3 12h13l-3 -3"></path>
                  <path d="M13 15l3 -3"></path>
                </svg> 
                <span>Iniciar Sesión</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
/* ==========================
   VARIABLES GLOBALES & UTILS
========================== */
.icon-margin {
  margin-right: 6px;
}

/* ==========================
   LOGO Y BRANDING
========================== */
.brand-logo {
  padding: 5px 0;
}

.logo-animado {
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.1));
}

.logo-animado:hover {
  transform: scale(1.08) rotate(-1deg);
}

.logo_carrera {
  display: flex;
  align-items: center;
}

/* ==========================
   TOP BAR (Barra Superior)
========================== */
.navbar-top {
  background: var(--main-color-3, #020733); /* Utiliza el terciario para contraste */
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.topbar-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.topbar-link {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
  display: inline-flex;
  align-items: center;
}

.topbar-link:hover {
  color: #ffffff;
}

.navbar-top.navbar-light {
  background: #f8f9fa;
  border-bottom: 1px solid #e5e7eb;
}

.navbar-top.navbar-light .topbar-link {
  color: #4b5563;
}

.navbar-top.navbar-light .topbar-link:hover {
  color: var(--main-color);
}

/* ==========================
   NAVEGACIÓN PRINCIPAL
========================== */

.navbar-area-1 {
  background: rgba(0, 0, 0, 0.36) !important; 
  backdrop-filter: blur(10px); 
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.3);
  padding: 0rem 0;
  transition: all 0.3s ease;
}

.navbar-nav.menu-open > li {
  position: relative;
  margin: 0 8px;
}

.nav-link-custom {
  position: relative;
  font-size: 1.5rem; 
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 10px 15px !important;
  color: #ffffff !important; 
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link-custom::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 0;
  height: 3px;
  border-radius: 3px;
  background: var(--main-color, #04246C);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link-custom:hover::after,
.router-link-exact-active::after {
  width: 70%;
}

/* Ajuste para el efecto hover (cuando pasas el mouse) */
.nav-link-custom:hover {
  color: #ffcccc !important; 
  background: rgba(255, 255, 255, 0.1); 
}

/* ==========================
   SUBMENÚS MODERNOS
========================== */
.shadow-modern {
  min-width: 260px;
  background: #ffffff; /* Mantiene el fondo blanco */
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 12px;
  padding: 12px;
  margin-top: 15px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
  z-index: 999; /* Asegura que esté encima de todo */
}

.menu-item-has-children .sub-menu li {
  margin-bottom: 4px;
}

.menu-item-has-children .sub-menu li:last-child {
  margin-bottom: 0;
}

.menu-item-has-children .sub-menu li a {
  display: block;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.95rem; /* Aumentado ligeramente para mejor lectura */
  font-weight: 600;
  color: #1f2937 !important; /* CAMBIO: Color más oscuro para asegurar que sea visible sobre fondo blanco */
  transition: all 0.25s ease;
}

/* Efecto al pasar el mouse por el submenú */
.menu-item-has-children .sub-menu li a:hover {
  background: rgba(4, 36, 108, 0.1); 
  color: var(--main-color, #04246C) !important;
}

/* ==========================
   BOTÓN DE ACCIÓN (LOGIN)
========================== */
.btn-action-login {
  background-color: var(--main-color-3, #FC0102); /* Color secundario */
  color: #520505;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 10px 20px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(252, 1, 2, 0.3);
  border: 2px solid transparent;
}

.btn-action-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(252, 1, 2, 0.4);
  color: #ffffff;
}

.style-dark .btn-action-login {
  background-color: var(--main-color-3);
  box-shadow: 0 4px 14px rgba(2, 7, 51, 0.3);
}

/* ==========================
   MÓVIL / RESPONSIVE
========================== */
.toggle-btn {
  background: transparent;
  border: none;
}
.toggle-btn .icon-left,
.toggle-btn .icon-right {
  background: var(--main-color-3) !important;
  height: 3px;
  border-radius: 3px;
}
@media (max-width: 991px) {
  
  .mobile-menu-container, 
  .navbar-collapse {
    background-color: #ffffffe3 !important;
  }

  .mobile-menu-container a,
  .navbar-collapse a {
    color: #ffffff !important; 
    font-size: 16px !important;
    font-weight: 700 !important;
  }

  .mobile-menu-container .sub-menu li a,
  .navbar-collapse .sub-menu li a {
    color: #e4e6e8 !important;
  }
  .navbar-collapse {
    position: absolute; 
    top: 60px; 
    left: 0;
    width: 100%;
    background: #000000e5 !important; 
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.704);
  }
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
      scrolled: false,
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
handleScroll() {
  if (this.idInstitucion === '22') {
    this.scrolled = window.scrollY > 300;
  }
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
beforeUnmount() {
  window.removeEventListener('scroll', this.handleScroll);
},

  mounted() {
    this.applyDynamicColors();
     window.addEventListener('scroll', this.handleScroll);
    if (this.getter) {
      this.getLinks();
      this.$store.commit('setGetter', false);
    }
  }
};
</script>