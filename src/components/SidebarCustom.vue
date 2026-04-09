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
    /**
     * Valida que un color sea seguro para CSS
     * @param {string} color - Color a validar
     * @param {string} fallback - Color por defecto si es inválido
     * @returns {string} - Color seguro o fallback
     */
    validateColor(color, fallback = '#000000') {
      if (!color || typeof color !== 'string') {
        return fallback;
      }
      
      const cleaned = color.trim().toLowerCase();
      
      // Permitir solo formatos seguros de color CSS
      const validPatterns = [
        /^#[0-9a-f]{6}$/,           // Hex #RRGGBB
        /^#[0-9a-f]{3}$/,           // Hex #RGB
        /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/,  // rgb/rgba
        /^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(,\s*[\d.]+\s*)?\)$/, // hsl/hsla
        /^[a-z]+$/                  // Named colors (red, blue, etc.)
      ];
      
      if (validPatterns.some(pattern => pattern.test(cleaned))) {
        return cleaned;
      }
      
      console.warn('Color inválido bloqueado:', color);
      return fallback;
    },

    /**
     * Formatea y sanitiza nombre de categoría
     * @param {string} text - Texto a formatear
     * @returns {string} - Texto seguro formateado
     */
    formatCategoryName(text) {
      if (!text || typeof text !== 'string') {
        return '';
      }

      const sanitized = this.sanitizeText(text.trim());

      if (sanitized.length === 0) return '';
      return sanitized.charAt(0).toUpperCase() + sanitized.slice(1).toLowerCase();
    },

    /**
     * Sanitiza texto para prevenir XSS
     * @param {string} text - Texto a sanitizar
     * @returns {string} - Texto seguro
     */
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
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.widget_catagory:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.widget-title {
  font-size: 1.7rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  transition: border-color 0.3s ease;
}

.widget-title::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: var(--sidebar-color-primary, #DC0E10);
  border-radius: 2px;
  transition: background 0.3s ease;
}

.catagory-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
}

.catagory-items li {
  margin: 0;
  transition: all 0.3s ease;
}

.catagory-items li a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  color: #555;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.catagory-items li a:hover {
  background: var(--sidebar-gradient-hover, linear-gradient(135deg, #DC0E10 0%, #E9C202 100%));
  color: #fff;
  transform: translateX(8px);
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.catagory-items li a i {
  font-size: 1.4rem;
  transition: transform 0.3s ease;
  color: var(--sidebar-color-primary, #DC0E10);
}

.catagory-items li a:hover i {
  transform: translateX(4px);
  color: #fff;
}

hr {
  border: none;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  margin: 1.5rem 0;
}

@media (max-width: 768px) {
  .widget_catagory {
    padding: 1.25rem;
    border-radius: 10px;
  }
  
  .widget-title {
    font-size: 1.2rem;
    margin-bottom: 1.25rem;
  }
  
  .catagory-items li a {
    padding: 0.65rem 0.9rem;
    font-size: 0.9rem;
  }
  
  .catagory-items li a:hover {
    transform: translateX(5px);
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
    padding: 0.6rem 0.8rem;
    font-size: 0.85rem;
    gap: 0.6rem;
  }
  
  .catagory-items li a i {
    font-size: 0.8rem;
  }
}

.catagory-items li a:focus-visible {
  outline: 2px solid var(--sidebar-color-primary, #DC0E10);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}

.widget_catagory .widget-title {
  font-size: 1.3rem;
}

.widget_catagory .catagory-items li a {
  font-size: 1.3rem;
  padding: 1rem 1.4rem;
}

.widget_catagory .catagory-items li a i {
  font-size: 1.5rem;
}
</style>