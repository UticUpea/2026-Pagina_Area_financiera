<template>
  <div>

    <div v-if="idInstitucion === '13'">
      <div class="banner-area banner-bg-overlay banner-img">
        <div class="container">
          <div class="avatar">
            <img 
              :src="imageUrl + institucion.institucion_logo" 
              alt="logo" 
              style="background:none!important" 
            />
          </div>
          <div class="row">
            <div class="col-10">
              <div class="banner-inner style-white">
                <h1>
                  <span id="texto-maquina" class="title" style="text-transform: uppercase!important;"></span>
                  <span id="cursor" class="typed-cursor">|</span>
                </h1>
                <br />
                <div class="cont">
                  <router-link style="margin-left: 50px;" class="btn btn-base" to="/about">
                    SOBRE NOSOTROS
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div v-else-if="idInstitucion === '22' || idInstitucion === '10'">
      <div class="banner-area banner-area-1 banner-bg-overlay banner-img">
        <div class="container text-center">
          <div class="avatar">
            <img 
              :src="imageUrl + institucion.institucion_logo" 
              alt="logo" 
              style="background:none!important" 
            />
          </div>
          <h1 class="title_1" style="text-transform: uppercase!important;">
            BIENVENIDOS A {{ institucion.institucion_nombre }}
          </h1>
          <br /><br />
          <div>
            <router-link class="btn btn-base al-animate-4" to="/about">
              SOBRE NOSOTROS
            </router-link>
          </div>
        </div>
      </div>
    </div>

<div v-else-if="idInstitucion === '24'">
  <div class="banner-area banner-area-1 banner-bg-overlay banner-img">
    <div class="container">
      <div class="row">
        <div class="col-10">
          <div class="banner-inner style-white text-center text-lg-left">
            <div class="avatar api-logo">
              <img 
                v-if="institucion.institucion_logo"
                :src="imageUrl + institucion.institucion_logo" 
                :alt="institucion.institucion_nombre"
                style="background:none!important; max-height: 120px; object-fit: contain;"
                @error="e => e.target.style.display = 'none'"
              />
            </div>
¡
            <h1 class="title_1-2" style="text-transform: uppercase!important;">
              {{ institucion.institucion_nombre || 'COMERCIO INTERNACIONAL' }}
            </h1>
            <div>
              <transition name="text-fade" mode="out-in">
                <p 
                  class="animated-text" 
                  style="color:#fff!important;" 
                  :class="{ 'fade-out': isFadingOut }"
                  @animationend="changeText"
                >
                  {{ currentText }}
                </p>
              </transition>
            </div>
            
            <br /><br />

            <div class="cont">
              <router-link style="text-align: center !important;" class="btn btn-base" to="/about">
                SOBRE NOSOTROS
              </router-link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    <div v-else>
      <div class="banner-area banner-area-1 banner-bg-overlay banner-img">
        <div class="container text-center">
          <div class="avatar">
            <img 
              :src="imageUrl + institucion.institucion_logo" 
              alt="logo" 
              style="background:none!important" 
            />
          </div>
          <h1 class="title_1">
            {{ institucion.institucion_nombre }}
          </h1>
          <br /><br />
          <div>
            <router-link class="btn btn-base al-animate-4" to="/about">
              SOBRE NOSOTROS
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div 
      v-if="idInstitucion === '22' || idInstitucion === '10'" 
      class="bg-cover pd-top-70 pd-bottom-70 team-area banner-area-1-2 bg-cover-img-inicio"
    >
      <div class="container">
        <div class="section-title-est">
          <h2 class="title plan" style="padding: 30px;">Enlaces Externos</h2>
        </div>
        <div class="row">
          <a 
            v-for="(link, index) of enlaces" 
            :key="link.id_link || index" 
            :href="link.url_link?.trim()" 
            target="_blank"
            class="col-md-4"
          >
            <div 
              class="single-block-inner single-block-inner-1" 
              :style="'background-image: url(' + imageUrl + link.imagen + '); object-fit:cover'"
            >
              <div class="cat">{{ link.tipo }}</div>
              <h4>{{ link.nombre }}</h4>
            </div>
          </a>
        </div>
      </div>
    </div>


    <div class="bg-cover about-area pd-top-50 pd-bottom-90 banner-area-1-2 bg-cover-img-inicio">
      <h2 class="titulo-1">{{ institucion.institucion_nombre }}</h2>
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="slider-container">
              <ul>
                <li><img class="slider-item" src="@/assets/fondo_upea.jpg" alt=""></li>
                <li><img class="slider-item" src="@/assets/images/fondo_ciencias_economicas.jpg" alt=""></li>
                <li><img class="slider-item" src="@/assets/images/Contaduria-Publica-UPEA.jpg" alt=""></li>
                <li><img class="slider-item" src="@/assets/images/adm.jpg" alt=""></li>
              </ul>
            </div>
          </div>
          <div 
            class="col-lg-6 align-self-center mt-4 mt-lg-0" 
            style="overflow-y: auto; height: 40rem; border: 2px solid #fff;"
          >
            <div class="section-title mb-0">
              <p 
                v-if="institucion.institucion_objetivos"
                style="padding: 2rem!important;" 
                class="content" 
                v-html="institucion.institucion_objetivos"
              ></p>
            </div>
          </div>
        </div>
      </div>
      <br><br>
    </div>

    <div class="bg-cover pd-bottom-100 banner-area-1-2 bg-cover-img">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-title-est">
              <h2 class="title plan" style="padding: 30px;">Plan de Estudios</h2>
            </div>
            <div class="conta">
              <a 
                :href="imageUrl + institucion.institucion_organigrama" 
                target="_blank" 
                class="btnDescarga"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="icon icon-tabler icon-tabler-download" 
                  width="24" height="24" 
                  viewBox="0 0 24 24" 
                  stroke-width="2" 
                  stroke="currentColor" 
                  fill="none" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                  <path d="M7 11l5 5l5 -5"></path>
                  <path d="M12 4l0 12"></path>
                </svg>
                Descarga la Malla Curricular
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="intro-area"></div>
    <div class="bg-cover intro-area pd-top-50 banner-area-1-2 bg-cover-img-inicio">
      <div class="container">
        <div class="section-title text-center">
          <h5 class="sub-title">Categorías</h5>
          <h2 class="title">Explorar contenido</h2>
        </div>
        <div class="row">
          <router-link 
            v-for="(conv, index) of MenuConv" 
            :key="conv.idtipo_conv_comun || index"
            class="col-lg-3 col-md-3 col-sm-6 card-intro"
            :to="'/convocatorias/' + conv.idtipo_conv_comun" 
            @click="$store.commit('clickLink')"
          >
            <div class="single-intro-inner bg-base style-two text-center">
              <div class="thumb cat-thumb">
                <img src="@/assets/img/intro/5.png" alt="img" />
              </div>
              <div class="details">
                <h5>
                  <span>{{ contarConv(conv.tipo_conv_comun_titulo) }}</span>
                  &nbsp;{{ conv.tipo_conv_comun_titulo }}
                </h5>
              </div>
            </div>
          </router-link>

          <router-link 
            v-for="(cur, index) of MenuCur" 
            :key="cur.idtipo_curso_otros || index"
            class="col-lg-3 col-md-3 col-sm-6 card-intro"
            :to="'/cursos/' + cur.idtipo_curso_otros" 
            @click="$store.commit('clickLink')"
          >
            <div class="single-intro-inner bg-base-2 style-two text-center">
              <div class="thumb cat-thumb">
                <img src="@/assets/img/intro/5.png" alt="img" />
              </div>
              <div class="details">
                <h5>
                  <span>{{ contarCur(cur.tipo_conv_curso_nombre) }}</span>
                  &nbsp;{{ cur.tipo_conv_curso_nombre }}
                </h5>
              </div>
            </div>
          </router-link>

          <router-link to="/servicios" class="col-lg-3 col-md-3 col-sm-6 card-intro">
            <div class="single-intro-inner bg-red style-two text-center">
              <div class="thumb cat-thumb">
                <img src="@/assets/img/intro/3.png" alt="img" />
              </div>
              <div class="details">
                <h5>
                  <span>{{ servicios.length }}</span>
                  &nbsp; SERVICIOS
                </h5>
              </div>
            </div>
          </router-link>

          <router-link to="/ofertas" class="col-lg-3 col-md-3 col-sm-6 card-intro">
            <div class="single-intro-inner bg-purple style-two text-center">
              <div class="thumb cat-thumb">
                <img src="@/assets/img/intro/4.png" alt="img" />
              </div>
              <div class="details">
                <h5>
                  <span>{{ ofertas.length }}</span>
                  &nbsp; OFERTAS ACADÉMICAS
                </h5>
              </div>
            </div>
          </router-link>

          <router-link to="/publicaciones" class="col-lg-3 col-md-3 col-sm-6 card-intro">
            <div class="single-intro-inner bg-pink style-two text-center">
              <div class="thumb cat-thumb">
                <img src="@/assets/img/intro/5.png" alt="img" />
              </div>
              <div class="details">
                <h5>
                  <span>{{ publicaciones.length }}</span>
                  &nbsp; PUBLICACIONES
                </h5>
              </div>
            </div>
          </router-link>

          <router-link to="/gaceta" class="col-lg-3 col-md-3 col-sm-6 card-intro">
            <div class="single-intro-inner bg-base style-two text-center">
              <div class="thumb cat-thumb">
                <img src="@/assets/img/intro/6.png" alt="img" />
              </div>
              <div class="details">
                <h5>
                  <span>{{ gacetas.length }}</span>
                  &nbsp; GACETA
                </h5>
              </div>
            </div>
          </router-link>

          <router-link to="/eventos" class="col-lg-3 col-md-3 col-sm-6 card-intro">
            <div class="single-intro-inner bg-base-2 style-two text-center">
              <div class="thumb cat-thumb">
                <img src="@/assets/img/intro/1.png" alt="img" />
              </div>
              <div class="details">
                <h5>
                  <span>{{ eventos.length }}</span>
                  &nbsp; EVENTOS
                </h5>
              </div>
            </div>
          </router-link>

          <router-link to="/videos" class="col-lg-3 col-md-3 col-sm-6 card-intro">
            <div class="single-intro-inner bg-base-3 style-two text-center">
              <div class="thumb cat-thumb">
                <img src="@/assets/img/intro/1.png" alt="img" />
              </div>
              <div class="details">
                <h5>
                  <span>{{ videos.length }}</span>
                  &nbsp; VIDEOS
                </h5>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="event-area pd-top-50 mg-bottom-120">
      <div class="container">
        <div class="section-title text-center">
          <h5 class="sub-title">Redes Sociales</h5>
          <h2 class="title">Facebook</h2>
        </div>
        <div class="row no-gutters">
          <div class="col-xl-7 col-lg-6 banner-area-3 bg-cover bg-cover-img-fb">
            <div class="event-section-title">
              <div class="section-title mb-0 pt-xl-5 style-white"></div>
            </div>
          </div>
          <div class="col-xl-5 col-lg-7 area-fb">
            <div class="event-area-inner bg-base-fb">
              <div class="facebook" id="facebook"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="team-area pd-bottom-80">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-title text-center">
              <h6 class="sub-title">
                Autoridades de la carrera de {{ institucion.institucion_nombre }}
              </h6>
              <h2 class="title">Nuestras autoridades</h2>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div 
            v-for="(autoridad, index) of autoridades" 
            :key="autoridad.id_autoridad || index"
            class="col-lg-4 pd-bottom-60 col-md-6"
            v-show="(pag - 1) * NUM_RESULTS <= index && pag * NUM_RESULTS > index"
          >
            <div class="single-team-inner marco-aut">
              <div class="thumb thumb-img">
                <img 
                  :src="imageUrl + autoridad.foto_autoridad" 
                  alt="img" 
                />
              </div>
              <div class="details str-team-img-text text-center str-team-text">
                <h5>
                  <a>{{ autoridad.nombre_autoridad }}</a>
                  <br>
                  <span>{{ autoridad.cargo_autoridad }}</span>
                </h5>
                <ul class="team-social-media">
                  <li>
                    <a 
                      v-if="autoridad.celular_autoridad"
                      :href="'https://wa.me/' + autoridad.celular_autoridad.replace(/[^0-9]/g, '')" 
                      target="_blank"
                    >
                      <i class="fa fa-whatsapp" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a 
                      v-if="autoridad.facebook_autoridad && autoridad.facebook_autoridad !== '_'"
                      :href="autoridad.facebook_autoridad?.trim()" 
                      target="_blank"
                    >
                      <i class="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a 
                      v-if="autoridad.twiter_autoridad && autoridad.twiter_autoridad !== '_'"
                      :href="autoridad.twiter_autoridad?.trim()" 
                      target="_blank"
                    >
                      <i class="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <nav 
            v-if="pager > 1" 
            class="col-12 td-page-navigation text-center mb-5 mb-lg-0"
          >
            <ul class="pagination">
              <li class="pagination-arrow disable">
                <a 
                  href="#" 
                  aria-label="Previous" 
                  @click.prevent="pag > 1 ? pag -= 1 : null"
                >
                  <i class="fa fa-angle-double-left"></i>
                </a>
              </li>
              <li v-for="(i, index) of pager" :key="index">
                <a 
                  href="#" 
                  :class="[i == pag ? 'active' : '']" 
                  @click.prevent="pag = i"
                >
                  {{ i }}
                </a>
              </li>
              <li class="pagination-arrow">
                <a 
                  href="#" 
                  aria-label="Next" 
                  @click.prevent="pag < pager ? pag += 1 : null"
                >
                  <i class="fa fa-angle-double-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <div class="blog-area pd-top-115">
      <div class="">
        <div class="row justify-content-center">
          <div class="col-xl-6 col-lg-7 col-md-11">
            <div class="section-title text-center">
              <h5 class="sub-title">Lo mas reciente</h5>
              <h2 class="title">Convocatorias, comunicados recientes</h2>
            </div>
          </div>
        </div>

        <div 
          v-if="latestConv.con_titulo || latestComun.con_titulo || latestAv.con_titulo" 
          class="row justify-content-center bg-cover banner-bg-overlay banner-area-1 bg-cover-img-log">

          <div v-if="latestConv.con_titulo" class="col-lg-4 col-md-6">
            <div class="single-blog-inner">
              <div class="thumb">
                <router-link :to="'/detalleConvocatoria/' + latestConv.idconvocatorias">
                  <img 
                    style="width:400px; height:400px" 
                    :src="imageUrl + latestConv.con_foto_portada" 
                    alt="img" 
                  />
                </router-link>
              </div>
              <div class="details">
                <div class="blog-meta">
                  <ul>
                    <router-link 
                      :to="'/convocatorias/' + latestConv.tipo_conv_comun?.idtipo_conv_comun"
                    >
                      <li class="comnt bg-base">
                        {{ latestConv.tipo_conv_comun?.tipo_conv_comun_titulo }}
                      </li>
                    </router-link>
                    &nbsp;
                    <li class="date">{{ formatearFecha(latestConv.con_fecha_inicio) }}</li>
                  </ul>
                </div>
                <h4 style="color: #fff!important;">
                  <router-link :to="'/detalleConvocatoria/' + latestConv.idconvocatorias">
                    {{ latestConv.con_titulo }}
                  </router-link>
                </h4>
                <router-link 
                  :to="'/detalleConvocatoria/' + latestConv.idconvocatorias" 
                  class="readmore-text"
                  style="color: #fff!important;"
                >
                  Leer mas
                </router-link>
              </div>
            </div>
          </div>

          <div v-if="latestComun.con_titulo" class="col-lg-4 col-md-6">
            <div class="single-blog-inner">
              <div class="thumb">
                <router-link :to="'/detalleConvocatoria/' + latestComun.idconvocatorias">
                  <img 
                    style="width:400px; height:400px" 
                    :src="imageUrl + latestComun.con_foto_portada" 
                    alt="img" 
                  />
                </router-link>
              </div>
              <div class="details">
                <div class="blog-meta">
                  <ul>
                    <router-link 
                      :to="'/convocatorias/' + latestComun.tipo_conv_comun?.idtipo_conv_comun"
                    >
                      <li class="comnt bg-base">
                        {{ latestComun.tipo_conv_comun?.tipo_conv_comun_titulo }}
                      </li>
                    </router-link>
                    &nbsp;
                    <li class="date">{{ formatearFecha(latestComun.con_fecha_inicio) }}</li>
                  </ul>
                </div>
                <h4 style="color: #fff!important;">
                  <router-link :to="'/detalleConvocatoria/' + latestComun.idconvocatorias">
                    {{ latestComun.con_titulo }}
                  </router-link>
                </h4>
                <router-link 
                  :to="'/detalleConvocatoria/' + latestComun.idconvocatorias" 
                  class="readmore-text"
                  style="color: #fff!important;"
                >
                  Leer mas
                </router-link>
              </div>
            </div>
          </div>

          <div v-if="latestAv.con_titulo" class="col-lg-4 col-md-6">
            <div class="single-blog-inner">
              <div class="thumb">
                <router-link :to="'/detalleConvocatoria/' + latestAv.idconvocatorias">
                  <img 
                    style="width:400px; height:400px" 
                    :src="imageUrl + latestAv.con_foto_portada" 
                    alt="img" 
                  />
                </router-link>
              </div>
              <div class="details">
                <div class="blog-meta">
                  <ul>
                    <router-link 
                      :to="'/convocatorias/' + latestAv.tipo_conv_comun?.idtipo_conv_comun"
                    >
                      <li class="comnt bg-base">
                        {{ latestAv.tipo_conv_comun?.tipo_conv_comun_titulo }}
                      </li>
                    </router-link>
                    &nbsp;
                    <li class="date">{{ formatearFecha(latestAv.con_fecha_inicio) }}</li>
                  </ul>
                </div>
                <h4 style="color: #fff!important;">
                  <router-link :to="'/detalleConvocatoria/' + latestAv.idconvocatorias">
                    {{ latestAv.con_titulo }}
                  </router-link>
                </h4>
                <router-link 
                  :to="'/detalleConvocatoria/' + latestAv.idconvocatorias" 
                  class="readmore-text"
                  style="color: #fff!important;"
                >
                  Leer mas
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.maquina-de-escribir {
  font-family: 'Courier New', monospace;
  overflow: hidden;
  white-space: nowrap;
  border-right: 5px solid #FFF;
  display: inline-block;
  vertical-align: middle;
}

.typed-cursor {
  opacity: 1;
  animation: blink 0.7s infinite;
  color: #FFF;
  width: 6px;
}

#texto-maquina {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
  font-weight: bolder;
  font-family: Georgia, 'Times New Roman', Times, serif;
  position: relative;
  font-size: 65px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.banner-img {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url("@/assets/Fondo2.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover !important;
}

.avatar {
  width: 30%;
  margin: auto;
  display: block;
  margin-top: 100px;
  box-sizing: border-box;
  border-style: none;
  overflow: hidden;
  transform: translatey(0px);
  animation: float 3s ease-in-out infinite;
}

.avatar img {
  width: 100%;
  height: auto;
}

@keyframes float {
  0% { transform: translatey(0px); }
  50% { transform: translatey(-20px); }
  100% { transform: translatey(0px); }
}

.bg-cover-img {
  background-image: url("@/assets/images/fondo_4.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  object-fit: cover;
  background-size: 100%;
  padding-top: 30px;
  padding-bottom: 50px;
  position: relative;
  background-color: rgba(0, 0, 0, 0.7);
}

.bg-cover-img-inicio {
  background-image: url("@/assets/images/fondo_inicio2.jpg");
  background-repeat: no-repeat;
  object-fit: cover;
  background-size: 100%;
  padding-top: 3rem;
  padding-bottom: 2rem;
  position: relative;
}

.bg-cover-img-fb {
  background-image: url("@/assets/images/imagen-fb.png");
  background-repeat: no-repeat;
  background-color: #deb887;
  object-fit: cover;
  position: relative;
}
.event-area {
  text-align: center;
}

#facebook,
.facebook {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-left: 0px !important;
}

#facebook iframe,
.facebook iframe {
  margin: 0 auto !important;
  display: block !important;
}

.bg-cover-img-log {
  background-image: url("@/assets/images/fondo_footer.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100%;
  padding-top: 30px;
  padding-bottom: 50px;
  position: relative;
}

.card-intro:hover h5 {
  color: var(--main-color-1);
  user-select: none;
}

.animated-text {
  font-size: 24px;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.fade-out {
  opacity: 0;
}


@media screen and (max-width: 768px) {
  #texto-maquina {
    font-size: 5vw;
    padding: 0%;
    padding-bottom: 10px;
  }
  .avatar {
    width: 180px;
  }
}

@media screen and (min-width: 1281px) {
  .avatar {
    padding-top: 2rem;
    padding-bottom: 5rem;
    width: 350px;
  }
  #texto-maquina {
    margin-left: 20px;
  }
}

</style>

<script>
import { mapState } from "vuex";
import Typed from 'typed.js';
import api from '@/plugins/axios'

export default {
  name: "HomeCustom",
  
  data() {
    return {

      idInstitucion: process.env.VUE_APP_ID_INSTITUCION || '22',
      
      texts: [
        "Universidad Pública de El Alto", 
        "Formando profesionales competentes en economía, finanzas y comercio"
      ],
      currentIndex: 0,
      isFadingOut: false,
      institucion: {},
      convocatorias: [],
      cursos: [],
      eventos: [],
      servicios: [],
      ofertas: [],
      gacetas: [],
      publicaciones: [],
      videos: [],
      autoridades: [],
      enlaces: [],
      latestConv: {},
      latestComun: {},
      latestAv: {},
      NUM_RESULTS: 3,
      pag: 1,
      pager: 0,
      
    
      loading: {
        institucion: false,
        contenidos: false,
        contenido: false,
        recursos: false
      },
      
    
      typedInstance: null
    };
  },
  
  computed: {
    ...mapState(["url_api", "MenuConv", "MenuCur", "Institucion", "getter", "Links"]),
    
    currentText() {
      return this.texts[this.currentIndex];
    },
    
    imageUrl() {
      return process.env.VUE_APP_UPLOADS_URL?.trim() || 'https://apiadministrador.upea.bo'
    }
  },

  methods: {
    //  efecto Máquina de escribir - Solo institución 13
    iniciarMaquinaDeEscribir() {
      const options = {
        strings: ["Bienvenid@ a: ", "Contaduría Pública"],
        typeSpeed: 80,
        backSpeed: 35,
        backDelay: 2000,
        startDelay: 500,
        loop: false,
        showCursor: false,
      };
      if (this.typedInstance) this.typedInstance.destroy()
      this.typedInstance = new Typed("#texto-maquina", options);
    },
    
    // Animación de texto fade - Solo institución 24
    changeText() {
      this.isFadingOut = true;
      setTimeout(() => {
        this.isFadingOut = false;
        this.currentIndex = (this.currentIndex + 1) % this.texts.length;
        setTimeout(this.changeText, 5000);
      }, 500);
    },

    async getInstitucionData() {
      this.loading.institucion = true
      try {
        const res = await api.get(`/institucionesPrincipal/${this.idInstitucion}`)
        const data = res.data.Descripcion
        this.institucion = this._limpiarObjeto(data)

        this.$store.commit('setInstitucion', this.institucion)
        
        if (this.institucion.colorinstitucion?.[0]) {
          const colores = this.institucion.colorinstitucion[0]
          document.documentElement.style.setProperty('--color-primario', colores.color_primario)
          document.documentElement.style.setProperty('--color-secundario', colores.color_secundario)
        }
      } catch (error) {
        console.error('Error cargando institución:', error)
      } finally {
        this.loading.institucion = false
      }
    },

    async getContenidosAll() {
      this.loading.contenidos = true
      try {
        const res = await api.get(`/institucion/${this.idInstitucion}/gacetaEventos`)
        const data = res.data
        
        this.convocatorias = data.convocatorias?.map(this._limpiarObjeto) || []
        this.cursos = data.cursos?.map(this._limpiarObjeto) || []
        this.eventos = data.upea_evento?.map(this._limpiarObjeto) || []
        this.servicios = data.serviciosCarrera?.map(this._limpiarObjeto) || []
        this.ofertas = data.ofertasAcademicas?.map(this._limpiarObjeto) || []
        this.gacetas = data.upea_gaceta_universitaria?.map(this._limpiarObjeto) || []
        
        this._filtrarRecientes()
        this._actualizarPager()
      } catch (error) {
        console.error('Error cargando contenidos:', error)
      } finally {
        this.loading.contenidos = false
      }
    },

    async getContenidoExtra() {
      this.loading.contenido = true
      try {
        const res = await api.get(`/institucion/${this.idInstitucion}/contenido`)
        const data = res.data
        
        this.autoridades = data.autoridad?.map(this._limpiarObjeto) || []
        this.videos = data.upea_videos?.map(this._limpiarObjeto) || []
      } catch (error) {
        console.error('Error cargando contenido extra:', error)
      } finally {
        this.loading.contenido = false
      }
    },

    async getRecursos() {
      this.loading.recursos = true
      try {
        const res = await api.get(`/institucion/${this.idInstitucion}/recursos`)
        const data = res.data
        
        this.publicaciones = data.upea_publicaciones?.map(this._limpiarObjeto) || []
        this.enlaces = data.linksExternoInterno?.filter(l => l.estado === 1)?.map(this._limpiarObjeto) || []
      } catch (error) {
        console.error('Error cargando recursos:', error)
      } finally {
        this.loading.recursos = false
        this.$store.commit("loading")
      }
    },

    _filtrarRecientes() {
      this.latestConv = this.convocatorias.find(c => 
        c.tipo_conv_comun?.tipo_conv_comun_titulo === 'CONVOCATORIAS' && c.con_estado === '1') || {}
      this.latestComun = this.convocatorias.find(c => 
        c.tipo_conv_comun?.tipo_conv_comun_titulo === 'COMUNICADOS' && c.con_estado === '1') || {}
      this.latestAv = this.convocatorias.find(c => 
        c.tipo_conv_comun?.tipo_conv_comun_titulo === 'AVISOS' && c.con_estado === '1') || {}
    },

    _actualizarPager() {
      const total = this.autoridades?.length || 0
      this.pager = Math.ceil(total / this.NUM_RESULTS)
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

    formatearFecha(fechaISO) {
      if (!fechaISO) return ''
      const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
      ]
      const fecha = new Date(fechaISO)
      if (isNaN(fecha.getTime())) return fechaISO
      return `${fecha.getDate()} de ${meses[fecha.getMonth()]} de ${fecha.getFullYear()}`
    },

    contarConv(tipo) {
      if (!tipo || !this.convocatorias) return 0
      return this.convocatorias.filter(c => 
        c.tipo_conv_comun?.tipo_conv_comun_titulo === tipo && c.con_estado === '1'
      ).length
    },
    
    contarCur(tipo) {
      if (!tipo || !this.cursos) return 0
      return this.cursos.filter(c => 
        c.tipo_curso_otro?.tipo_conv_curso_nombre === tipo && c.det_estado === '1'
      ).length
    },

    _renderFacebookWidget() {
      const fbUrl = this.institucion?.institucion_facebook?.trim()
      if (!fbUrl || fbUrl === '_') return

      const container = document.getElementById("facebook")
      if (!container) return
      const fbSrc = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(fbUrl)}&tabs=timeline&width=500&height=700&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`

      container.innerHTML = `<iframe src="${fbSrc}" width="100%" height="700" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`
    }
  },

  created() {
    this.$store.commit("loadOn")
    
    Promise.all([
      this.getInstitucionData(),
      this.getContenidosAll(),
      this.getContenidoExtra(),
      this.getRecursos()
    ]).then(() => {
      this.$store.commit("loadOff")
    })
    
    this.changeText()
  },

  mounted() {
    if (this.idInstitucion === '13') {
      this.$nextTick(() => {
        this.iniciarMaquinaDeEscribir()
      })
    }

    this.$nextTick(() => {
      this._renderFacebookWidget()
    })
  },

  updated() {
    if (this.institucion?.institucion_facebook) {
      this._renderFacebookWidget()
    }
  },

  beforeUnmount() {
    if (this.typedInstance) {
      this.typedInstance.destroy()
    }
  }
};
</script>