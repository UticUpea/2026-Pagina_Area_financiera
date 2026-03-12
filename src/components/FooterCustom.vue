<template>
  <div>
    <footer class="bg-cover footer-area banner-area-4">
      <div class="footer-top pd-top-115">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-5">
              <div class="widget widget_contact pr-lg-3">
                <div class="widget-title">
                  <img :src="imageUrl + Institucion.institucion_logo" alt="img" width="125" />
                </div>
                <ul class="social-media-2">
                  <li><strong>REDES SOCIALES:</strong></li>
                  <br>
                  <li>
                    <a :href="formatUrl(Institucion.institucion_facebook)" target="_blank">
                      <i class="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a :href="formatUrl(Institucion.institucion_youtube)" target="_blank">
                      <i class="fa fa-youtube" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li v-if="Institucion.institucion_twitter?.trim()">
                    <a :href="formatUrl(Institucion.institucion_twitter)" target="_blank" rel="noopener noreferrer">
                      <i class="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          
            <div class="col-lg-3 col-md-3 widget widget_tags">
              <h4 class="widget-title">Enlaces Externos</h4>
              <div class="tagcloud">
                <a 
                  :href="formatUrl(link.url_link)" 
                  target="_blank" 
                  v-for="(link, index) of Links" 
                  :key="link.id_link || index"
                  :title="link.tipo"
                >
                  {{ link.nombre }}
                </a>
                <a href="https://.upea.bo/" target="_blank">UTIC UPEA</a>
              </div>
            </div>
            <div class="col-lg-5 col-md-4 col-sm-12 pl-lg-5 pr-5 pr-lg-0">
              <div class="widget widget_contact pr-lg-3">
                <h4 class="widget-title">Contacto</h4>
                <ul class="details style-icon">
                  <li>
                    <i class="fa fa-phone"></i> 
                    +{{ formatPhone(Institucion.institucion_celular1) }}
                  </li>
                  <li>
                    <i class="fa fa-envelope"></i>
                    {{ formatText(Institucion.institucion_correo1) }}
                  </li>
                  <li>
                    <i class="fa fa-map-marker"></i>
                    {{ formatText(Institucion.institucion_direccion) }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="">
        <div class="container">
          <div class="row">
            <div class="col-md-7 text-md-right align-self-center mt-lg-0 mt-3">
              <a href="https://utic.upea.bo/" target="_blank">
                <img src="@/assets/utic.png" width="100" alt="sie" />
              </a>
              <p>© Copyright {{ currentYear }} UTIC_UPEA&nbsp;</p>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <div class="whatsapp">
      <a 
        class="btn_whatsapp" 
        :href="getWhatsAppLink(Institucion.institucion_celular1)"
        target="_blank" 
        title="Contactanos por Whatsapp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-whatsapp" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
          <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
        </svg>
      </a>
    </div>
  </div>
</template>

<style>
.footer-area {
  position: relative;
  background-image: url("@/assets/images/Conta_1.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
}
</style>

<script>
import { mapState } from "vuex";

export default {
  name: "FooterCustom",
  
  computed: {
    ...mapState(["Institucion", "MenuConv", "MenuCur", "url_api", "Links"]),
    
    imageUrl() {
      return (process.env.VUE_APP_UPLOADS_URL || 'https://apiadministrador.upea.bo').trim()
    },

        currentYear() {
      return new Date().getFullYear();
    }

  },
  
  
  methods: {
    formatUrl(value) {
      if (!value) return '#'
      const trimmed = String(value).trim()
      return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`
    },
    
    formatText(value) {
      if (!value) return ''
      return String(value).trim()
    },
    formatPhone(value) {
      if (!value) return ''
      return String(value).replace(/[^0-9]/g, '')
    },
    getWhatsAppLink(phone) {
      if (!phone) return '#'
      const cleanPhone = String(phone).replace(/[^0-9]/g, '')
      return `https://api.whatsapp.com/send?phone=591${cleanPhone}`
    },
    
    clickBack() {
      this.$store.commit("clickLink");
      this.$router.go(-1);
    },
  },
};
</script>