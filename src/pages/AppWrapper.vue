<template>
  <div>
    <HeaderCustom />
    <router-view />
    <FooterCustom />
  </div>
</template>

<script>
import HeaderCustom from "@/components/HeaderCustom.vue";
import FooterCustom from "@/components/FooterCustom.vue";
import { mapState } from "vuex";
import api from '@/plugins/axios' 

export default {
  name: "appWrapper",
  
  components: {
    HeaderCustom,
    FooterCustom,
  },
  
  data() {
    return {
      idInstitucion: process.env.VUE_APP_ID_INSTITUCION || '22',
      imageUrl: (process.env.VUE_APP_UPLOADS_URL || 'https://apiadministrador.upea.bo').trim(),
      sliderInterval: null
    }
  },
  
  computed: {
    ...mapState([
      "url_api",
      "Institucion",
      "MenuConv",
      "MenuCur",
      "Colors",
      "getter",
      "statusImg",
    ]),
  },
  
  methods: {
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

    async getMenuConv() {
      try {
        const res = await api.get(`/institucion/${this.idInstitucion}/gacetaEventos`)
        const data = res.data.convocatorias || []
        const tiposUnicos = {}
        
        data.forEach(conv => {
          const tipoObj = conv.tipo_conv_comun
          if (!tipoObj) return
          
          const tipoNombre = tipoObj.tipo_conv_comun_titulo?.trim().toUpperCase()
          const estado = String(tipoObj.tipo_conv_comun_estado).trim()
          const estaActivo = estado === "1" || estado === 1 || estado === "true"
          
          if (tipoNombre && estaActivo && !tiposUnicos[tipoNombre]) {
            tiposUnicos[tipoNombre] = {
              idtipo_conv_comun: tipoObj.idtipo_conv_comun,
              tipo_conv_comun_titulo: tipoObj.tipo_conv_comun_titulo,
              tipo_conv_comun_estado: tipoObj.tipo_conv_comun_estado
            }
          }
        })
        
        this.$store.commit('setMenuConv', Object.values(tiposUnicos))
      } catch (error) {
        console.error('Error cargando MenuConv:', error)
        this.$store.commit('setMenuConv', [])
      }
    },

    async getMenuCur() {
      try {
        const res = await api.get(`/institucion/${this.idInstitucion}/gacetaEventos`)
        const data = res.data.cursos || []
        const tiposUnicos = {}
        
        data.forEach(cur => {
          const tipoObj = cur.tipo_curso_otro
          if (!tipoObj) return
          
          const tipoNombre = tipoObj.tipo_conv_curso_nombre?.trim().toUpperCase()
          const estado = String(tipoObj.tipo_conv_curso_estado).trim()
          const estaActivo = estado === "1" || estado === 1 || estado === "true"
          
          if (tipoNombre && estaActivo && !tiposUnicos[tipoNombre]) {
            tiposUnicos[tipoNombre] = {
              idtipo_curso_otros: cur.idtipo_curso_otros,
              tipo_conv_curso_nombre: tipoObj.tipo_conv_curso_nombre,
              tipo_conv_curso_estado: tipoObj.tipo_conv_curso_estado
            }
          }
        })
        
        this.$store.commit('setMenuCur', Object.values(tiposUnicos))
      } catch (error) {
        console.error('Error cargando MenuCur:', error)
        this.$store.commit('setMenuCur', [])
      }
    },

    async getLinks() {
      try {
        const res = await api.get(`/institucion/${this.idInstitucion}/recursos`)
        const data = res.data.linksExternoInterno || []
        
        const filterLinks = data
          .filter(link => link.estado === "1" || link.estado === 1)
          .map(this._limpiarObjeto)
        
        this.$store.commit('setLinks', filterLinks)
      } catch (error) {
        console.error('Error cargando Links:', error)
      }
    },

    async getInstitucion() {
      try {
        const res = await api.get(`/institucionesPrincipal/${this.idInstitucion}`)
        const data = this._limpiarObjeto(res.data.Descripcion)
        
        this.$store.commit('setInstitucion', data)

        const favicon = document.querySelector("#ico")
        if (favicon && data.institucion_logo) {
          favicon.setAttribute("href", this.imageUrl + data.institucion_logo)
        }
        
        const titlePage = document.querySelector("#title-page")
        if (titlePage && data.institucion_nombre) {
          titlePage.innerHTML = data.institucion_nombre
        }

        if (data.colorinstitucion?.[0]) {
          const colores = data.colorinstitucion[0]
          document.documentElement.style.setProperty("--main-color", colores.color_primario)
          document.documentElement.style.setProperty("--main-color-2", colores.color_secundario)
          document.documentElement.style.setProperty("--main-color-3", colores.color_terciario)
        }

        if (data.portada && data.portada.length > 0) {
          this.setImages(data.portada)
        }
        
      } catch (error) {
        console.error('Error cargando institución:', error)
        if (error.code === "ERR_NETWORK" || error.response?.status >= 500) {
          this.$router.push("/error_network")
        }
      }
    },

    setImages(images) {
      if (!images || images.length === 0) {
        const banner = document.querySelector(".banner-img")
        if (banner) {
          banner.style.backgroundImage = `url("@/assets/upea_fondo.jpg")`
        }
        this.$store.commit("loading")
        return
      }
      
      let count = images.length
      let i = 1
      let img = this.imageUrl + images[0].portada_imagen
      
      const banner = document.querySelector(".banner-img")
      if (banner) {
        banner.style.backgroundImage = `url("${img}")`
      }

      if (this.sliderInterval) {
        clearInterval(this.sliderInterval)
      }
      
      this.sliderInterval = setInterval(() => {
        if (i <= count) {
          img = this.imageUrl + images[i - 1].portada_imagen
          i++
        } else {
          i = 1
          img = this.imageUrl + images[0].portada_imagen
        }
        if (banner) {
          banner.style.backgroundImage = `url("${img}")`
        }
      }, 5000)
      
      this.$store.commit("loading")
    },

    async createdComponents() {
      await Promise.all([
        this.getInstitucion(),
        this.getMenuConv(),
        this.getMenuCur(),
        this.getLinks()
      ])
    },
  },
  
  created() {
    this.createdComponents()
  },
  
  beforeUnmount() {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval)
    }
  }
};
</script>