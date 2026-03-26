import { createStore } from 'vuex'
import { config } from '@/config/env'

export default createStore({
  state: {
    // ✅ Fallback minimalista: fail-fast en producción
    url_api: config.api.root || '',
    
    getter: true,
    MenuConv: [],
    MenuCur: [],
    Links: [],
    Institucion: {},
    statusImg: true,
  },
  
  getters: {
    apiUrl: (state) => state.url_api,
    isConfigLoaded: (state) => !!state.url_api
  },
  
  mutations: {
    loadOn() {
      const preloader = document.querySelector("#preloader")
      if (preloader) {
        preloader.style.visibility = "visible"
      }
      window.scrollTo(0, 0)
    },
    
    loading() {
      const preloader = document.querySelector("#preloader")
      if (preloader) {
        preloader.style.visibility = "hidden"
      }
    },
    
    loadOff() {
      const preloader = document.querySelector("#preloader")
      if (preloader) {
        preloader.style.visibility = "hidden"
      }
    },
    
    setInstitucion(state, data) {
      state.Institucion = data
    },
    
    setLinks(state, data) {
      state.Links = data
    },
    
    setGetter(state, value) {
      state.getter = value
    },
    
    clickLink(state) {
      window.scrollTo(0, 0)
      state.getter = true
    },
    
    idEncrypt() {
      console.log("hola")
    },
    
    setMenuConv(state, data) {
      state.MenuConv = data
    },
    
    setMenuCur(state, data) {
      state.MenuCur = data
    }
  },
  
  actions: {
    async refreshConfig() {
      console.log('🔄 Refreshing store config...')
    }
  },
  
  modules: {}
})