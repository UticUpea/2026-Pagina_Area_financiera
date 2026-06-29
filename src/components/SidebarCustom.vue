<template>
  <div>
    <div class="widget widget_catagory">
      <h4 class="widget-title" :style="{ borderBottomColor: safeColor }">
        Categorías
      </h4>
      <ul class="catagory-items">
        <li v-for="(conv, id_conv) of MenuConv" :key="id_conv">
          <router-link
            :to="'/convocatorias/' + conv.idtipo_conv_comun"
            @click="$store.commit('clickLink')"
          >
            <i class="fa fa-angle-right" :style="{ color: safeColor }"></i>
            {{ formatCategoryName(conv.tipo_conv_comun_titulo) }}
          </router-link>
        </li>
        
        <li>
          <router-link to="/servicios" @click="$store.commit('clickLink')">
            <i class="fa fa-angle-right" :style="{ color: safeColor }"></i> Servicios
          </router-link>
        </li>
        <li>
          <router-link to="/ofertas" @click="$store.commit('clickLink')">
            <i class="fa fa-angle-right" :style="{ color: safeColor }"></i> Ofertas académicas
          </router-link>
        </li>
        <li>
          <router-link to="/publicaciones" @click="$store.commit('clickLink')">
            <i class="fa fa-angle-right" :style="{ color: safeColor }"></i> Publicaciones
          </router-link>
        </li>
        <li>
          <router-link to="/gaceta" @click="$store.commit('clickLink')">
            <i class="fa fa-angle-right" :style="{ color: safeColor }"></i> Gaceta
          </router-link>
        </li>
        <li>
          <router-link to="/eventos" @click="$store.commit('clickLink')">
            <i class="fa fa-angle-right" :style="{ color: safeColor }"></i> Eventos
          </router-link>
        </li>
        <li>
          <router-link to="/videos" @click="$store.commit('clickLink')">
            <i class="fa fa-angle-right" :style="{ color: safeColor }"></i> Videos
          </router-link>
        </li>
      </ul>
    </div>
    <hr />
  </div>
</template>

<script>
import { mapState } from "vuex";
import logger from '@/utils/logger'

export default {
  name: "SidebarCustom",
  
  computed: {
    ...mapState(["MenuConv", "MenuCur", "Links", "Institucion"]),

    safeColor() {
      return this.validateColor(
        this.Institucion?.colorinstitucion?.[0]?.color_primario,
        '#DC0E10'
      );
    },
    
    safeSecondaryColor() {
      return this.validateColor(
        this.Institucion?.colorinstitucion?.[0]?.color_secundario,
        '#E9C202'
      );
    },
    
    safeTertiaryColor() {
      return this.validateColor(
        this.Institucion?.colorinstitucion?.[0]?.color_terciario,
        '#060705'
      );
    },

    gradientHover() {
      return `linear-gradient(135deg, ${this.safeColor} 0%, ${this.safeSecondaryColor} 100%)`;
    }
  },
  
  methods: {
    validateColor(color, fallback = '#000000') {
      if (!color || typeof color !== 'string') {
        return fallback;
      }
      
      const cleaned = color.trim().toLowerCase();
      
      const validPatterns = [
        /^#[0-9a-f]{6}$/,
        /^#[0-9a-f]{3}$/,
        /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/,
        /^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(,\s*[\d.]+\s*)?\)$/,
        /^[a-z]+$/
      ];
      
      if (validPatterns.some(pattern => pattern.test(cleaned))) {
        return cleaned;
      }
      
      logger.warn('Color inválido bloqueado:', color);
      return fallback;
    },

    formatCategoryName(text) {
      if (!text || typeof text !== 'string') {
        return '';
      }

      const sanitized = this.sanitizeText(text.trim());

      if (sanitized.length === 0) return '';
      return sanitized.charAt(0).toUpperCase() + sanitized.slice(1).toLowerCase();
    },

    sanitizeText(text) {
      if (!text) return '';
      
      return String(text)
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

    clickBack() {
      this.$store.commit("clickLink");
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.widget_catagory {
  background: #ffffff;
  border-radius: 20px;
  padding: 1.6rem;
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.04),
    0 12px 30px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.widget_catagory:hover {
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.05),
    0 18px 40px rgba(0, 0, 0, 0.08);
}

.widget-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.4rem;
  padding-bottom: 0.9rem;
  border-bottom: 3px solid;
  position: relative;
  transition: border-color 0.3s ease;
}

.widget-title::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--sidebar-color-primary, #DC0E10);
  border-radius: 10px;
}

.catagory-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.catagory-items li {
  margin: 0;
}

.catagory-items li a {
  display: flex;
  align-items: center;
  gap: 0.85rem;

  text-decoration: none;

  background: #ffffff;

  color: #374151;

  border-radius: 14px;

  padding: 0.95rem 1rem;

  font-size: 1rem;

  font-weight: 500;

  border: 1px solid #edf2f7;

  transition: all 0.25s ease;

  position: relative;
}

.catagory-items li a:hover {
  background: rgba(0, 0, 0, 0.02);

  transform: translateX(4px);

  border-left: 4px solid var(--sidebar-color-primary, #DC0E10);

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);

  color: #111827;
}

.catagory-items li a i {
  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: rgba(220, 14, 16, 0.08);

  font-size: 0.95rem;

  flex-shrink: 0;

  transition: all 0.25s ease;
}

.catagory-items li a:hover i {
  transform: none;
  color: inherit !important;
}

.catagory-items li a.router-link-active,
.catagory-items li a.router-link-exact-active {
  background: rgba(220, 14, 16, 0.08);

  border-left: 4px solid var(--sidebar-color-primary, #DC0E10);

  color: var(--sidebar-color-primary, #DC0E10);

  font-weight: 600;
}

.catagory-items li a.router-link-active i,
.catagory-items li a.router-link-exact-active i {
  background: rgba(220, 14, 16, 0.15);
}

.catagory-items li a:focus-visible {
  outline: 2px solid var(--sidebar-color-primary, #DC0E10);
  outline-offset: 2px;
}

hr {
  display: none;
}

@media (max-width: 768px) {
  .widget_catagory {
    padding: 1.25rem;
    border-radius: 16px;
  }

  .widget-title {
    font-size: 1.2rem;
  }

  .catagory-items li a {
    padding: 0.85rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .widget_catagory {
    padding: 1rem;
  }

  .widget-title {
    font-size: 1.1rem;
  }

  .catagory-items li a {
    padding: 0.8rem;
    font-size: 0.9rem;
  }

  .catagory-items li a i {
    width: 28px;
    height: 28px;
    font-size: 0.85rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .widget_catagory,
  .catagory-items li a,
  .catagory-items li a i {
    transition: none !important;
  }
}
</style>