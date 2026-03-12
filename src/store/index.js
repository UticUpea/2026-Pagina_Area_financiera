import { createStore } from 'vuex'

export default createStore({
  state: {
    url_api: process.env.VUE_APP_API_ROOT || 'https://apiadministrador.upea.bo',
    getter: true,
    MenuConv: [],
    MenuCur: [],
    Links: [],
    Institucion: {},
    statusImg: true,
  },
  
  getters: {},
  
  mutations: {
    loadOn() {
      document.querySelector("#preloader").style.visibility = "visible";
      window.scrollTo(0, 0);
    },
    
    loading() {
      document.querySelector("#preloader").style.visibility = "hidden";
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
      window.scrollTo(0, 0);
      state.getter = true
    },
    
    idEncrypt() {
      console.log("hola")
    },
     setMenuConv(state, data) {
    state.MenuConv = data
  },

  loadOff() {
    document.querySelector("#preloader").style.visibility = "hidden";
  },
  
  setMenuCur(state, data) {
    state.MenuCur = data
  }

  },
  
  actions: {},
  modules: {}
})