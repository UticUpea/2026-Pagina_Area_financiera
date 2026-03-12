<template>
  <div id="investigacion">
    <div class="page-title-area bg-overlay bg-overlay-img banner-img">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="breadcrumb-inner">
              <h2 class="page-title" style="color: #fff !important;">
                INVESTIGACIÓN
              </h2>
              <ul class="page-list">
                <li>
                  <router-link to="/">INICIO</router-link>
                </li>
                <li>INVESTIGACIÓN</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-blog-area pd-top-120 pd-bottom-120">
      <div class="container">
        <div class="row justify-content-center">

          <div class="col-lg-8 col-12">
            <div class="single-blog-inner mb-0">
              <div class="details">
                <h4 class="mb-0">
                  {{ institucion?.institucion_nombre || 'Carrera' }} - Investigación
                </h4>
              </div>
              <div class="blog-content-inner mt-4">
                <p>
                  La carrera de {{ institucion?.institucion_nombre }} está comprometida con el desarrollo de 
                  investigación científica de calidad que contribuya al avance del conocimiento en áreas 
                  económicas, financieras y administrativas.
                </p>
                
                <h5 class="mt-4">Líneas de Investigación</h5>
                <ul>
                  <li>Economía y Desarrollo Regional</li>
                  <li>Finanzas y Mercados</li>
                  <li>Gestión Empresarial</li>
                  <li>Contabilidad y Auditoría</li>
                  <li>Comercio Internacional</li>
                </ul>

                <h5 class="mt-4">Proyectos en Curso</h5>
                <p>
                  Próximamente se publicará información sobre los proyectos de investigación activos 
                  y las publicaciones de nuestros docentes investigadores.
                </p>

                <div class="alert alert-info mt-4" role="alert">
                  <i class="fa fa-info-circle"></i> 
                  <strong>Nota:</strong> Esta sección está en construcción. 
                  Pronto estará disponible información detallada sobre investigaciones, 
                  publicaciones científicas y proyectos de la carrera.
                </div>
              </div>
            </div>
          </div>
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

#investigacion {
  padding: 0;
}

.page-title-area {
  background-image: url("@/assets/Fondo2.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.blog-content-inner {
  line-height: 1.8;
  font-size: 1.05rem;
  color: #333;
}

.blog-content-inner h5 {
  color: var(--main-color-1, #007bff);
  margin-bottom: 1rem;
  font-weight: 600;
}

.blog-content-inner ul {
  list-style-type: none;
  padding-left: 0;
}

.blog-content-inner ul li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.blog-content-inner ul li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--main-color-1, #007bff);
  font-weight: bold;
}

.alert-info {
  padding: 1rem;
  background: rgba(0, 123, 255, 0.1);
  border: 1px solid rgba(0, 123, 255, 0.3);
  border-radius: 4px;
  color: #004085;
}

.alert-info i {
  margin-right: 0.5rem;
}

@media screen and (max-width: 768px) {
  .blog-content-inner {
    font-size: 1rem;
  }
}
</style>

<script>
import { mapState } from "vuex";
import SidebarCustom from "@/components/SidebarCustom.vue";

export default {
  name: "InvestigacionView",
  
  components: {
    SidebarCustom,
  },
  
  data() {
    return {
      idInstitucion: process.env.VUE_APP_ID_INSTITUCION || '22',

      institucion: {},
      loading: false
    };
  },
  
  computed: {
    ...mapState(["Institucion", "url_api"])
  },

  methods: {
    async getInstitucionData() {
      this.loading = true
      try {
        this.institucion = this.Institucion || {}
      } catch (error) {
        console.error('Error cargando datos:', error)
      } finally {
        this.loading = false
      }
    }
  },

  created() {
    this.getInstitucionData()
  },

  beforeUnmount() {
    this.institucion = {}
  }
};
</script>