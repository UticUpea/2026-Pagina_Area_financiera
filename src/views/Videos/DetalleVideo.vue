<template>
  <div>
    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="breadcrumb-inner">
              <h2 class="page-title" style="color: #fff !important;">
                {{ video.video_titulo || 'Detalle de Video' }}
              </h2>
              <ul class="page-list">
                <li>
                  <router-link to="/">INICIO</router-link>
                </li>
                <li>
                  <router-link to="/videos">VIDEOS</router-link>
                </li>
                <li>{{ video.video_titulo || 'Video' }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main-blog-area pd-top-120 pd-bottom-120">
      <div class="container">
        <div class="row justify-content-center">
          
          <div class="col-lg-8 col-12" v-if="errorGet">
            <div class="text-center">
              <h1>Video inexistente</h1>
              <p>El video que buscas no está disponible o fue eliminado.</p>
              <button class="btn btn-base mt-3" @click="clickBack">
                <i class="fa fa-arrow-left"></i> Volver a Videos
              </button>
            </div>
          </div>

          <div class="col-lg-8 col-12" v-else-if="loading">
            <div class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Cargando...</span>
              </div>
              <p class="mt-3">Cargando información del video...</p>
            </div>
          </div>

          <div class="col-lg-8 col-12" v-else-if="video.video_id">
            <div class="single-blog-inner mb-0">
              <div class="thumb">
                <iframe
                  v-if="videoUrl"
                  :src="videoUrl"
                  style="width: 100%; aspect-ratio: 16/9; border-radius: 10px"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen="allowfullscreen"
                  loading="lazy"
                  referrerpolicy="strict-origin-when-cross-origin"
                  :title="video.video_titulo"
                />
                <div v-else class="text-center p-4">
                  <i class="fa fa-video-slash" style="font-size: 3rem; color: #999;"></i>
                  <p class="mt-3">URL de video no disponible</p>
                </div>
              </div>
              <div class="details">
                <div class="blog-meta border-0 mt-0 pt-0">
                  <ul>
                    <li class="comnt bg-base">VIDEOS</li>
                    <li class="date" v-if="video.video_tipo">
                      <i class="fa fa-tag"></i>
                      {{ video.video_tipo }}
                    </li>
                  </ul>
                </div>
                <h4 class="mb-0">{{ video.video_titulo }}</h4>
              </div>
            </div>
            <div class="blog-content-inner">
              <p v-html="video.video_breve_descripcion"></p>
            </div>
          </div>
          
        </div>

        <div class="row justify-content-center mt-5">
          <div class="col-lg-4 col-12">
            <div class="td-sidebar">
              <SidebarCustom></SidebarCustom>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-overlay-img {
  background-image: url("@/assets/Fondo2.jpg");
}

.single-blog-inner .thumb iframe {
  transition: box-shadow 0.3s ease;
  border-radius: 10px;
}

.single-blog-inner:hover .thumb iframe {
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.text-center h1 {
  color: var(--main-color, #dc3545);
  margin-bottom: 1rem;
}

.text-center p {
  color: #666;
  font-size: 1.1rem;
}

.blog-content-inner {
  line-height: 1.8;
  font-size: 1.7rem;
  color: #333;
}

.blog-meta .date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.blog-meta .date i {
  color: var(--main-color, #007bff);
}

.btn-base {
  background: var(--main-color, #007bff);
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-base:hover {
  background: var(--main-color-2, #0056b3);
}

@media (max-width: 768px) {
  .single-blog-inner .thumb iframe {
    aspect-ratio: 16/9;
    height: auto;
  }
}
</style>

<script>
import { mapState } from "vuex";
import SidebarCustom from "@/components/SidebarCustom.vue";
import api from '@/plugins/axios'
import { config } from '@/config/env'

export default {
  name: "DetalleVideo",
  
  components: { 
    SidebarCustom 
  },
  
  data() {
    return {
      idInstitucion: config.app.idInstitucion || '22',
      video: {},
      loading: false,
      errorGet: false,
    };
  },
  
  computed: {
    ...mapState(["url_api", "Institucion"]),

    videoUrl() {
      if (!this.video.video_enlace) return '';
      return this.getSafeVideoUrl(this.video.video_enlace);
    }
  },

  methods: {
    async getVideoOne() {
      this.loading = true
      this.errorGet = false
      
      try {
        const idVid = this.$route.params.idVid
        const institucionId = this.idInstitucion || config.app.idInstitucion

        const res = await api.get(`/institucion/${institucionId}/contenido`)
        const data = res.data
        
        const lista = data.upea_videos || []
        this.video = lista.find(v => v.video_id == idVid) || {}

        if (!this.video.video_id) {
          this.errorGet = true
          console.warn('Video no encontrado con ID:', idVid)
          return
        }
        
        this.video = this._limpiarObjeto(this.video)
        
      } catch (error) {
        console.error('Error cargando video:', error)
        this.errorGet = true

        if (error.response?.status === 404) {
          console.warn('Video no encontrado (404)')
        } else if (error.response?.status === 500) {
          console.error('Error del servidor (500)')
        }
      } finally {
        this.loading = false
        this.$store.commit("loading")
      }
    },

    getSafeVideoUrl(url) {
      if (!url) return '';
      
      const cleaned = String(url).trim();
      
      if (!cleaned) return '';
      
      try {
  
        if (cleaned.includes('youtube.com/watch?v=') || cleaned.includes('youtu.be/')) {
          const videoId = this.extractYouTubeId(cleaned);
          if (videoId) {

            return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`;
          }
        }

        if (cleaned.includes('youtube.com/embed/') || cleaned.includes('youtube-nocookie.com/embed/')) {
          return cleaned.replace('http://', 'https://');
        }

        if (cleaned.includes('vimeo.com')) {
          const videoId = cleaned.match(/vimeo\.com\/(\d+)/)?.[1];
          if (videoId) {
            return `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`;
          }
        }
        if (cleaned.startsWith('https://')) {
          return cleaned;
        }
   
        if (cleaned.startsWith('http://')) {
          return cleaned.replace('http://', 'https://');
        }
    
        const base = config.uploads.baseUrl?.replace(/\/+$/, '');
        const resource = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
        return `${base}${resource}`.replace(/\/+/g, '/');
        
      } catch (error) {
        console.error('Error procesando URL de video:', error);
        return '';
      }
    },

    extractYouTubeId(url) {
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\s?]+)/,
        /youtube\.com\/watch\?.*?v=([^&\s]+)/
      ];
      
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          return match[1];
        }
      }
      
      return null;
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

    clickBack() {
      this.$store.commit("clickLink")
      this.$router.go(-1)
    }
  },

  watch: {
    Institucion: {
      handler() {
        this.applyDynamicColors();
      },
      deep: true,
      immediate: true
    }
  },

  created() {
    this.$store.commit("loadOn")
    this.applyDynamicColors();
    this.getVideoOne()
  },

  mounted() {
    this.applyDynamicColors();
  },

  beforeUnmount() {
    this.video = {}
    this.errorGet = false
    this.loading = false
  }
};
</script>