<template>
  <div>
    <div class="banner-outer">
      <carousel 
        v-if="portadasList.length > 1" 
        :items-to-show="1" 
        :autoplay="5000" 
        :wrap-around="true"
        :transition="500"
        class="banner-carousel"
      >
        <slide v-for="(portada, index) of portadasList" :key="portada.portada_id || index">
          <div 
            class="banner-slide"
            :style="{
              backgroundImage: `url('${buildSafeImageUrl(portada.portada_imagen)}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%'
            }"
          ></div>
        </slide>
        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>

      <div 
        v-else-if="portadasList.length === 1"
        class="banner-static"
        :style="{
          backgroundImage: `url(${buildSafeImageUrl(portadasList[0].portada_imagen)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }"
      ></div>

      <div v-else class="banner-fallback"></div>

      <div class="banner-overlay"></div>
      <div class="banner-content">
        <div class="container h-100">
          <div class="row h-100 align-items-center justify-content-center">
            <div class="col-12 text-center">
              
              <div v-if="idInstitucion === '13'">
                <div class="avatar">
                  <img 
                    :src="buildSafeImageUrl(institucion.institucion_logo)" 
                    alt="logo" 
                    style="background:none!important" 
                    class="logo_13"
                  />
                </div>
                <div class="banner-inner style-white">
                  <h1>
                    <span id="texto-maquina" class="title" style="text-transform: uppercase!important;"></span>
                    <span id="cursor" class="typed-cursor">|</span>
                  </h1>
                  <br />
                  <div class="cont">
                    <router-link class="btn btn-base" to="/about">SOBRE NOSOTROS</router-link>
                  </div>
                </div>
              </div>

              <div v-else-if="idInstitucion === '22' || idInstitucion === '10'">
                <div class="avatar">
                  <img 
                    :src="buildSafeImageUrl(institucion.institucion_logo)" 
                    alt="logo" 
                    style="background:none!important" 
                    class="logo"
                  />
                </div>
                <h1 class="title_1" style="text-transform: uppercase!important; color: #fff !important;">
                  BIENVENIDOS A {{ institucion.institucion_nombre }}
                </h1>
                <br /><br />
                <div>
                  <router-link class="btn btn-base al-animate-4" to="/about">SOBRE NOSOTROS</router-link>
                </div>
              </div>

              <div v-else-if="idInstitucion === '23'">
                <div class="avatar api-logo">
                  <img 
                    v-if="institucion.institucion_logo"
                    :src="buildSafeImageUrl(institucion.institucion_logo)" 
                    :alt="institucion.institucion_nombre"
                    style="background:none!important; max-height: 250px; object-fit: contain;"
                    @error="e => e.target.style.display = 'none'"
                  />
                </div>
                <h1 class="title_1-2" style="text-transform: uppercase!important; color: #fff !important;">
                  {{ institucion.institucion_nombre }}
                </h1>
                <div>
                  <transition name="text-fade" mode="out-in">
               
                  </transition>
                </div>
                <br /><br />
<div class="cont">
<router-link class="btn-banner-outline" to="/about">
  <span class="btn-text">SOBRE NOSOTROS</span>
  <span class="btn-border"></span>
</router-link>
</div>
              </div>

              <div v-else>
                <div class="avatar">
                  <img 
                    :src="buildSafeImageUrl(institucion.institucion_logo)" 
                    alt="logo" 
                    style="background:none!important"
                    class="logo_23" 
                  />
                </div>
                <h1 class="title_1" style="color: #fff !important;">
                  {{ institucion.institucion_nombre }}
                </h1>
                <br /><br />
                <div>
                  <router-link class="btn btn-base al-animate-4" to="/about">SOBRE NOSOTROS</router-link>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enlaces Externos -->
    <section 
      v-if="idInstitucion === '22' || idInstitucion === '10'" 
      class="section-links-externos"
    >
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title-main">Enlaces Externos</h2>
          <div class="section-divider"></div>
        </div>
        <div class="row justify-content-center">
          <a 
            v-for="(link, index) of enlaces" 
            :key="link.id_link || index" 
            :href="link.url_link?.trim()" 
            target="_blank"
            rel="noopener noreferrer"
            class="col-md-4 mb-4"
          >
            <div class="link-card">
              <div class="link-card-image">
                <img 
                  :src="buildSafeImageUrl(link.imagen)" 
                  :alt="link.nombre"
                  class="link-card-img"
                  loading="lazy"
                />
                <div class="link-card-overlay"></div>
              </div>
              <div class="link-card-content">
                <span class="link-card-tag">{{ link.tipo }}</span>
                <h4 class="link-card-title">{{ link.nombre }}</h4>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Sobre Nosotros -->
<section class="section-about py-5">
  <div class="container">
    <div class="row align-items-center g-5">
      
      <!-- Columna Izquierda: Galería más amplia -->
      <div class="col-lg-6">
        <div class="about-image-wrapper">
          <Carousel :items-to-show="1" :autoplay="5000" :wrap-around="true">
            <Slide v-for="(img, index) in portadasList" :key="index">
              <img :src="buildSafeImageUrl(img.portada_imagen)" class="img-fluid rounded-4 shadow-lg" alt="Imagen Institucional">
            </Slide>
          </Carousel>
        </div>
      </div>

      <!-- Columna Derecha: Contenido con letra más grande -->
      <div class="col-lg-6">
        <div class="about-content-wrapper">
          <span class="badge-label">Institución</span>
          <h2 class="section-title-big">{{ institucion.institucion_nombre }}</h2>
          <div class="divider-line"></div>
          
          <div class="content-text-large" v-html="institucion.institucion_objetivos"></div>
          
        </div>
      </div>
      
    </div>
  </div>
</section>



    <div id="intro-area"></div>

    <!-- Categorías -->
    <section class="section-categories">
      <div class="container">
        <div class="section-title text-center">
          <span class="badge-label">CATEGORIAS</span>
          <h2 class="title-main">Explorar contenido</h2>
          <div class="section-divider"></div>
        </div>
        <div class="row justify-content-center">
          <router-link 
            v-for="(conv, index) of MenuConv" 
            :key="conv.idtipo_conv_comun || index"
            class="col-lg-3 col-md-3 col-sm-6 mb-4"
            :to="'/convocatorias/' + conv.idtipo_conv_comun" 
            @click="$store.commit('clickLink')"
          >
            <div class="category-card category-card-primary">
              <div class="category-card-icon">
                <img src="@/assets/img/intro/5.png" alt="icon" />
              </div>
              <div class="category-card-content">
                <h5>
                  <span class="category-count">{{ contarConv(conv.tipo_conv_comun_titulo) }}</span>
                  {{ conv.tipo_conv_comun_titulo }}
                </h5>
              </div>
            </div>
          </router-link>

          <router-link 
            v-for="(cur, index) of MenuCur" 
            :key="cur.idtipo_curso_otros || index"
            class="col-lg-3 col-md-3 col-sm-6 mb-4"
            :to="'/cursos/' + cur.idtipo_curso_otros" 
            @click="$store.commit('clickLink')"
          >
            <div class="category-card category-card-secondary">
              <div class="category-card-icon">
                <img src="@/assets/img/intro/5.png" alt="icon" />
              </div>
              <div class="category-card-content">
                <h5>
                  <span class="category-count">{{ contarCur(cur.tipo_conv_curso_nombre) }}</span>
                  {{ cur.tipo_conv_curso_nombre }}
                </h5>
              </div>
            </div>
          </router-link>

          <router-link to="/servicios" class="col-lg-3 col-md-3 col-sm-6 mb-4">
            <div class="category-card category-card-red">
              <div class="category-card-icon">
                <img src="@/assets/img/intro/3.png" alt="icon" />
              </div>
              <div class="category-card-content">
                <h5>
                  <span class="category-count">{{ servicios.length }}</span>
                  SERVICIOS
                </h5>
              </div>
            </div>
          </router-link>

          <router-link to="/ofertas" class="col-lg-3 col-md-3 col-sm-6 mb-4">
            <div class="category-card category-card-purple">
              <div class="category-card-icon">
                <img src="@/assets/img/intro/4.png" alt="icon" />
              </div>
              <div class="category-card-content">
                <h5>
                  <span class="category-count">{{ ofertas.length }}</span>
                  OFERTAS ACADÉMICAS
                </h5>
              </div>
            </div>
          </router-link>

          <router-link to="/publicaciones" class="col-lg-3 col-md-3 col-sm-6 mb-4">
            <div class="category-card category-card-pink">
              <div class="category-card-icon">
                <img src="@/assets/img/intro/5.png" alt="icon" />
              </div>
              <div class="category-card-content">
                <h5>
                  <span class="category-count">{{ publicaciones.length }}</span>
                  PUBLICACIONES
                </h5>
              </div>
            </div>
          </router-link>

          <router-link to="/gaceta" class="col-lg-3 col-md-3 col-sm-6 mb-4">
            <div class="category-card category-card-blue">
              <div class="category-card-icon">
                <img src="@/assets/img/intro/6.png" alt="icon" />
              </div>
              <div class="category-card-content">
                <h5>
                  <span class="category-count">{{ gacetas.length }}</span>
                  GACETA
                </h5>
              </div>
            </div>
          </router-link>

          <router-link to="/eventos" class="col-lg-3 col-md-3 col-sm-6 mb-4">
            <div class="category-card category-card-green">
              <div class="category-card-icon">
                <img src="@/assets/img/intro/1.png" alt="icon" />
              </div>
              <div class="category-card-content">
                <h5>
                  <span class="category-count">{{ eventos.length }}</span>
                  EVENTOS
                </h5>
              </div>
            </div>
          </router-link>

          <router-link to="/videos" class="col-lg-3 col-md-3 col-sm-6 mb-4">
            <div class="category-card category-card-orange">
              <div class="category-card-icon">
                <img src="@/assets/img/intro/1.png" alt="icon" />
              </div>
              <div class="category-card-content">
                <h5>
                  <span class="category-count">{{ videos.length }}</span>
                  VIDEOS
                </h5>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
        <section class="section-recent">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title-main">Convocatorias y comunicados recientes</h2>
          <div class="section-divider"></div>
        </div>

        <div 
          v-if="latestConv.con_titulo || latestComun.con_titulo || latestAv.con_titulo" 
          class="row justify-content-center"
        >
          <div v-if="latestConv.con_titulo" class="col-lg-4 col-md-6 mb-4">
            <article class="blog-card">
              <div class="blog-card-image">
                <router-link :to="'/detalleConvocatoria/' + latestConv.idconvocatorias">
                  <img 
                    :src="buildSafeImageUrl(latestConv.con_foto_portada)" 
                    :alt="latestConv.con_titulo"
                    class="blog-card-img"
                    loading="lazy"
                  />
                  <div class="blog-card-badge">
                    {{ latestConv.tipo_conv_comun?.tipo_conv_comun_titulo }}
                  </div>
                </router-link>
              </div>
              <div class="blog-card-content">
                <div class="blog-card-meta">
                  <span class="blog-card-date">
                    <i class="fa fa-calendar"></i> {{ formatearFecha(latestConv.con_fecha_inicio) }}
                  </span>
                </div>
                <h4 class="blog-card-title">
                  <router-link :to="'/detalleConvocatoria/' + latestConv.idconvocatorias">
                    {{ latestConv.con_titulo }}
                  </router-link>
                </h4>
                <router-link 
                  :to="'/detalleConvocatoria/' + latestConv.idconvocatorias" 
                  class="blog-card-link"
                >
                  Leer más <i class="fa fa-arrow-right"></i>
                </router-link>
              </div>
            </article>
          </div>

          <div v-if="latestComun.con_titulo" class="col-lg-4 col-md-6 mb-4">
            <article class="blog-card">
              <div class="blog-card-image">
                <router-link :to="'/detalleConvocatoria/' + latestComun.idconvocatorias">
                  <img 
                    :src="buildSafeImageUrl(latestComun.con_foto_portada)" 
                    :alt="latestComun.con_titulo"
                    class="blog-card-img"
                    loading="lazy"
                  />
                  <div class="blog-card-badge">
                    {{ latestComun.tipo_conv_comun?.tipo_conv_comun_titulo }}
                  </div>
                </router-link>
              </div>
              <div class="blog-card-content">
                <div class="blog-card-meta">
                  <span class="blog-card-date">
                    <i class="fa fa-calendar"></i> {{ formatearFecha(latestComun.con_fecha_inicio) }}
                  </span>
                </div>
                <h4 class="blog-card-title">
                  <router-link :to="'/detalleConvocatoria/' + latestComun.idconvocatorias">
                    {{ latestComun.con_titulo }}
                  </router-link>
                </h4>
                <router-link 
                  :to="'/detalleConvocatoria/' + latestComun.idconvocatorias" 
                  class="blog-card-link"
                >
                  Leer más <i class="fa fa-arrow-right"></i>
                </router-link>
              </div>
            </article>
          </div>

          <div v-if="latestAv.con_titulo" class="col-lg-4 col-md-6 mb-4">
            <article class="blog-card">
              <div class="blog-card-image">
                <router-link :to="'/detalleConvocatoria/' + latestAv.idconvocatorias">
                  <img 
                    :src="buildSafeImageUrl(latestAv.con_foto_portada)" 
                    :alt="latestAv.con_titulo"
                    class="blog-card-img"
                    loading="lazy"
                  />
                  <div class="blog-card-badge">
                    {{ latestAv.tipo_conv_comun?.tipo_conv_comun_titulo }}
                  </div>
                </router-link>
              </div>
              <div class="blog-card-content">
                <div class="blog-card-meta">
                  <span class="blog-card-date">
                    <i class="fa fa-calendar"></i> {{ formatearFecha(latestAv.con_fecha_inicio) }}
                  </span>
                </div>
                <h4 class="blog-card-title">
                  <router-link :to="'/detalleConvocatoria/' + latestAv.idconvocatorias">
                    {{ latestAv.con_titulo }}
                  </router-link>
                </h4>
                <router-link 
                  :to="'/detalleConvocatoria/' + latestAv.idconvocatorias" 
                  class="blog-card-link"
                >
                  Leer más <i class="fa fa-arrow-right"></i>
                </router-link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

<section class="section-facebook pd-top-50 mg-bottom-120">
  <div class="container">
    <div class="section-title text-center">
      <span class="badge-label">Redes Sociales</span>
      <h2 class="title-main">Síguenos en Facebook</h2>
      <div class="section-divider"></div>
    </div>
    
    <div class="row align-items-center justify-content-center">
      <div class="col-lg-10">
        <div class="facebook-card">
          <div class="row g-0">
            <div class="col-md-5 bg-cover-img-fb d-none d-md-block"></div>
            <div class="col-md-7 area-fb">
              <div class="facebook-wrapper">
                <div id="facebook"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section v-if="videos.length > 0" class="section-video">
  <div class="container">
    <div class="section-header text-center">
      <h2 class="section-title-main">Multimedia Destacada</h2>
      <div class="section-divider"></div>
    </div>
    
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="video-card">
          <div class="video-wrapper">
            <iframe 
              width="100%" 
              height="450" 
              :src="videos[0].video_enlace" 
              :title="videos[0].video_titulo"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
          <div class="video-content">
            <h4 class="video-title">{{ videos[0].video_titulo }}</h4>
            <div class="video-desc" v-html="videos[0].video_breve_descripcion"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



  </div>
</template>

<style scoped>
:root {
  --main-color: #007bff;
  --main-color-2: #0056b3;
  --card-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  --card-shadow-hover: 0 20px 60px rgba(0, 0, 0, 0.12);
  --transition: all 0.3s ease;
}
.about-image-frame {
  position: relative;
  padding: 20px;
}
/* Título con estilo tipográfico moderno y elegante */
.section-title-big {
  font-size: clamp(2.2rem, 5vw, 3.5rem); 
  font-weight: 800;
  color: #4d88fe; 
  line-height: 1.1;
  margin-bottom: 2rem;
  letter-spacing: -0.02em; 
  text-transform: capitalize;
}
.section-video { padding: 80px 0; background: #f8f9fa; }

.video-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(54, 98, 219, 0.1);
  transition: transform 0.3s ease;
}

.video-wrapper { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; }
.video-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }

.video-content { padding: 2rem; text-align: center; }
.video-title { font-weight: 700; color: #53a1f0; margin-bottom: 1rem; }
.video-desc { color: #6c757d; line-height: 1.6; }

/* Cuerpo de texto con mejor legibilidad */
.content-text-large {
  font-size: 2,5rem; 
  line-height: 1.75;
  color: #4a5568;
  text-align: justify;
  max-width: 800px; 
  margin: 0 auto;  
}

/* Espaciado limpio para los párrafos dentro del contenedor */
.content-text-large :deep(p) {
  margin-bottom: 1.8rem;
  transition: color 0.3s ease;
}

/* Opcional: Mejora el color al pasar el cursor o selección */
.content-text-large :deep(p):hover {
  color: #658dd2;
}

/* Decoración elegante */
.badge-label {
  display: inline-block;
  background: var(--main-color-2);
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.divider-line {
  width: 80px;
  height: 6px;
  background: var(--main-color-2);
  margin-bottom: 2rem;
  border-radius: 3px;
}

/* Botón personalizado */
.btn-primary-custom {
  background: linear-gradient(135deg, var(--main-color), var(--main-color-2));
  color: white;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.btn-primary-custom:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.image-wrapper {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  transform: rotate(-2deg);
  transition: transform 0.5s ease;
}

.image-wrapper:hover {
  transform: rotate(0deg);
}

.accent-box {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 150px;
  height: 150px;
  background: var(--main-color);
  opacity: 0.1;
  border-radius: 20px;
  z-index: -1;
  transform: translate(20px, 20px);
}

.section-divider-left {
  width: 60px;
  height: 4px;
  background: var(--main-color);
  border-radius: 2px;
}

.content-card-scroll {
  background: #ffffff;
  padding: 0; /* Quitamos padding excesivo para dejar el scroll limpio */
  border: none;
  box-shadow: none;
}

.content-text {
  font-size: 1.05rem;
  color: #555;
  line-height: 1.9;
}

.btn-more {
  background: transparent;
  border: 2px solid var(--main-color);
  color: var(--main-color);
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-more:hover {
  background: var(--main-color);
  color: white;
}
/* Banner - SIN MODIFICAR */
.banner-outer {
  width: 100%;
  height: 100vh;
  margin: 0 !important;
  padding: 0 !important;
  position: relative;
  overflow: hidden;
  background: none !important;
  background-image: none !important;
}

.banner-carousel {
  width: 100%;
  height: 100vh !important;
  margin: 0 !important;
  padding: 0 !important;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.banner-carousel :deep(.carousel__slide) {
  width: 100%;
  height: 100vh !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
}

.banner-slide {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}

/* ========================================
   ESTILOS PARA TÍTULOS DENTRO DEL CONTENIDO
   ======================================== */

/* Títulos h2 dentro del contenido de objetivos */
.content-text-large :deep(h2) {
  font-size: clamp(2rem, 4vw, 2.8rem) !important;
  font-weight: 800 !important;
  color: #04246C !important; /* Azul institucional */
  text-align: center !important;
  margin: 2.5rem 0 1.5rem 0 !important;
  text-transform: uppercase !important;
  letter-spacing: 1px !important;
  position: relative !important;
  padding-bottom: 1rem !important;
}

/* Línea decorativa debajo de los h2 */
.content-text-large :deep(h2)::after {
  content: '' !important;
  position: absolute !important;
  bottom: 0 !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 100px !important;
  height: 4px !important;
  background: linear-gradient(90deg, #04246C, #FC0102) !important;
  border-radius: 2px !important;
}

/* Strong dentro de h2 */
.content-text-large :deep(h2 strong) {
  font-weight: 800 !important;
  color: inherit !important;
}

/* Primer h2 (Objetivo General) - Color diferente opcional */
.content-text-large :deep(h2:first-of-type) {
  color: #04246C !important;
  margin-top: 1rem !important;
}

/* Segundo h2 (Objetivos Específicos) */
.content-text-large :deep(h2:nth-of-type(2)) {
  color: #04246C !important;
}

/* Párrafos después de los h2 */
.content-text-large :deep(h2 + p) {
  margin-top: 1.5rem !important;
  text-align: justify !important;
}

/* Listas dentro del contenido */
.content-text-large :deep(ul),
.content-text-large :deep(ol) {
  padding-left: 2rem !important;
  margin: 1.5rem 0 !important;
}

.content-text-large :deep(li) {
  margin-bottom: 1rem !important;
  line-height: 1.8 !important;
  color: #495057 !important;
}

/* Responsive para móviles */
@media (max-width: 768px) {
  .content-text-large :deep(h2) {
    font-size: 1.8rem !important;
    margin: 2rem 0 1rem 0 !important;
  }
  
  .content-text-large :deep(h2)::after {
    width: 80px !important;
    height: 3px !important;
  }
}

@media (max-width: 576px) {
  .content-text-large :deep(h2) {
    font-size: 1.5rem !important;
  }
}

.banner-static,
.banner-fallback {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh !important;
  margin: 0 !important;
  padding: 0 !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  z-index: 1;
}

.banner-fallback {
  background-image: none !important;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.banner-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.h-100 { height: 100%; }

@media (max-width: 992px) {
  .banner-outer,
  .banner-carousel,
  .banner-carousel :deep(.carousel__slide),
  .banner-static,
  .banner-fallback {
    height: 100vh !important;
    min-height: 600px;
  }
}

@media (max-width: 768px) {
  .banner-outer,
  .banner-carousel,
  .banner-carousel :deep(.carousel__slide),
  .banner-static,
  .banner-fallback {
    height: 100vh !important;
    min-height: 500px;
  }
  .banner-content { padding: 20px; }
  .avatar { width: 200px !important; }
}

@media (max-width: 480px) {
  .banner-outer,
  .banner-carousel,
  .banner-carousel :deep(.carousel__slide),
  .banner-static,
  .banner-fallback {
    height: 100vh !important;
    min-height: 450px;
  }
  .avatar { width: 150px !important; }
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

.avatar img { width: 100%; height: auto; }

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
  background-image: url("@/assets/upea_fondo.jpg");
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

.event-area { text-align: center; }

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

.fade-out { opacity: 0; }

@media screen and (max-width: 768px) {
  #texto-maquina {
    font-size: 5vw;
    padding: 0%;
    padding-bottom: 10px;
  }
  .avatar { width: 180px; }
}

@media screen and (min-width: 1281px) {
  .avatar {
    padding-top: 2rem;
    padding-bottom: 5rem;
    width: 350px;
  }
  #texto-maquina { margin-left: 20px; }
}

.logo {
  max-width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: contain;
  display: block;
  margin: 10px auto 0 auto;
}

.logo_13 {
  max-width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: contain;
  display: block;
  margin: 130px auto 0 auto;
}

.logo_23 {
  max-width: 100%;
  height: auto;
  max-height: 200px; 
  object-fit: contain;
  display: block;
  margin: 0 auto; 
  position: relative;
  z-index: 10;
}

.banner-carousel :deep(.carousel__prev),
.banner-carousel :deep(.carousel__next) {
  background: rgba(255, 255, 255, 0.3) !important;
  color: #fff !important;
  width: 50px !important;
  height: 50px !important;
  border-radius: 50% !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  z-index: 10;
}

.banner-carousel :deep(.carousel__prev):hover,
.banner-carousel :deep(.carousel__next):hover {
  background: rgba(255, 255, 255, 0.6) !important;
}

.banner-carousel :deep(.carousel__pagination) {
  bottom: 20px !important;
}

.banner-carousel :deep(.carousel__pagination-button) {
  background: rgba(255, 255, 255, 0.5) !important;
  width: 12px !important;
  height: 12px !important;
  margin: 0 6px !important;
  border-radius: 50% !important;
}
/* ========================================
   FORZAR ESTILOS PARA H2 EN OBJETIVOS
   ======================================== */

/* Selector más específico y directo */
.section-about .content-text-large h2,
.content-text-large h2 {
  font-size: 2.5rem !important;
  font-weight: 800 !important;
  color: #04246C !important;
  text-align: center !important;
  text-transform: uppercase !important;
  margin: 2.5rem 0 1.5rem 0 !important;
  padding: 0 0 1rem 0 !important;
  position: relative !important;
  display: block !important;
  width: 100% !important;
}

/* Línea decorativa después de h2 */
.section-about .content-text-large h2::after,
.content-text-large h2::after {
  content: '' !important;
  position: absolute !important;
  bottom: 0 !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 100px !important;
  height: 4px !important;
  background: linear-gradient(90deg, #04246C, #FC0102) !important;
  border-radius: 2px !important;
  display: block !important;
}

/* Strong dentro de h2 */
.content-text-large h2 strong {
  font-weight: 800 !important;
  color: inherit !important;
}

/* Primer h2 */
.content-text-large h2:first-of-type {
  margin-top: 1rem !important;
}

/* Responsive */
@media (max-width: 768px) {
  .content-text-large h2 {
    font-size: 1.8rem !important;
  }
  
  .content-text-large h2::after {
    width: 80px !important;
    height: 3px !important;
  }
}

@media (max-width: 576px) {
  .content-text-large h2 {
    font-size: 1.5rem !important;
  }
}

.banner-carousel :deep(.carousel__pagination-button--active) {
  background: #fff !important;
  transform: scale(1.2) !important;
}

.section-links-externos,
.section-about,
.section-plan,
.section-categories,
.section-authorities,
.section-recent {
  padding: 60px 0;
}

.section-plan,
.section-recent {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.section-header {
  margin-bottom: 3rem;
}

.section-title-main {
  font-size: clamp(2.3rem, 4vw, 2.2rem);
  font-weight: 700;
  color: #6a9fd3;
  margin-bottom: 1rem;
}

.section-divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--main-color-1, #007bff), transparent);
  margin: 0 auto;
  border-radius: 2px;
}

.link-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.link-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--card-shadow-hover);
}

.link-card-image {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.link-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.link-card:hover .link-card-img {
  transform: scale(1.1);
}

.link-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.link-card:hover .link-card-overlay {
  opacity: 1;
}

.link-card-content {
  padding: 1.5rem;
  text-align: center;
}

.link-card-tag {
  display: inline-block;
  padding: 0.3rem 1rem;
  background: rgba(0, 123, 255, 0.1);
  color: var(--main-color, #007bff);
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.link-card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  line-height: 1.4;
}


.image-slider-wrapper {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
}
.slider-container {
  position: relative;
  height: 400px;
  overflow: hidden;
}

.slider-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
}

.slider-container li {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

/* Solo el primero visible */
.slider-container li:first-child {
  opacity: 1;
  z-index: 1;
}

.slider-item {
  /* width: 100%; */
  height: 100%;
  object-fit: cover;
}

.content-card-scroll {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: var(--card-shadow);
  border: 1px solid rgba(0, 0, 0, 0.05);
  height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--main-color, #007bff) #f1f1f1;
}

.content-card-scroll::-webkit-scrollbar {
  width: 6px;
}

.content-card-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.content-card-scroll::-webkit-scrollbar-thumb {
  background: var(--main-color, #007bff);
  border-radius: 3px;
}

.content-text {
  line-height: 1.8;
  color: #495057;
  text-align: justify;
}

.content-text :deep(p) {
  margin-bottom: 1rem;
}

.content-text :deep(p):last-child {
  margin-bottom: 0;
}

.plan-card {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: var(--card-shadow);
  text-align: center;
  transition: var(--transition);
}

.plan-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--card-shadow-hover);
}

.plan-card-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--main-color, #007bff) 0%, var(--main-color-2, #0056b3) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
}

.plan-card-icon i {
  font-size: 2rem;
  color: white;
}

.plan-card-text {
  font-size: 1.1rem;
  color: #6c757d;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.btn-download {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2rem;
  background: linear-gradient(135deg, var(--main-color, #007bff) 0%, var(--main-color-2, #0056b3) 100%);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: var(--transition);
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

.btn-download:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.5);
  color: white;
}

/* Categorías */
/* Contenedor de la sección */
.section-categories {
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
                    url("@/assets/upea_fondo.jpg") !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-position: center !important;
  position: relative;
  padding: 80px 0;
}

/* Tarjeta Estilo Glassmorphism */
.category-card {
  background: rgba(255, 255, 255, 0.1); /* Transparencia base */
  backdrop-filter: blur(12px); /* Efecto cristal */
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2.5rem 1.5rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  color: white; /* Texto blanco para el fondo oscuro */
}

.category-card:hover {
  transform: translateY(-12px);
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Icono elegante */
.category-card-icon {
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px; /* Bordes redondeados modernos */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.category-card:hover .category-card-icon {
  background: var(--card-accent);
  transform: rotate(5deg) scale(1.1);
}

.category-card-icon img {
  width: 35px;
  height: 35px;
  transition: filter 0.3s ease;
}

/* Tipografía y Contador */
.category-card-content h5 {
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  margin-top: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.category-count {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--card-accent); /* El número resalta con el color de acento */
}

/* Variables de acento (mantienen tu lógica actual) */
.category-card-primary { --card-accent: #3498db; }
.category-card-secondary { --card-accent: #95a5a6; }
.category-card-red { --card-accent: #e74c3c; }
.category-card-purple { --card-accent: #9b59b6; }
.category-card-pink { --card-accent: #ff6b6b; }
.category-card-blue { --card-accent: #00d2d3; }
.category-card-green { --card-accent: #2ecc71; }
.category-card-orange { --card-accent: #f39c12; }

/* Autoridades */
.authority-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
}
/* ========================================
   SECCIÓN FACEBOOK - Fondo estático
   ======================================== */
.section-facebook {
  position: relative;
  padding: 80px 0;
  background-image: url('@/assets/upea_fondo.jpg') !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-attachment: fixed !important;
}

/* Overlay oscuro MÁS INTENSO */
.section-facebook::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: rgba(0, 0, 0, 0.75) !important; /* 75% oscuro - MÁS INTENSO */
  z-index: 0 !important;
}

/* Contenido por encima del overlay */
.section-facebook > .container {
  position: relative !important;
  z-index: 1 !important;
}

/* Badge label - MÁS VISIBLE */
.section-facebook .section-title .badge-label {
  background: rgba(255, 255, 255, 0.25) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.4) !important;
  color: #ffffff !important;
  padding: 0.4rem 1.2rem !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 1px !important;
  display: inline-block !important;
  margin-bottom: 1rem !important;
}

/* Título principal - BLANCO PURO Y GRANDE */
.section-facebook .section-title .title-main,
.section-facebook .section-title-main {
  color: #ffffff !important;
  font-size: 3rem !important;
  font-weight: 800 !important;
  text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.8) !important;
  margin-bottom: 1rem !important;
  letter-spacing: 0.5px !important;
}

/* Divider blanco */
.section-facebook .section-divider {
  background: linear-gradient(90deg, #ffffff, transparent) !important;
  width: 100px !important;
  height: 5px !important;
  margin: 1.5rem auto !important;
  border-radius: 3px !important;
}

/* Tarjeta de Facebook */
.section-facebook .facebook-card {
  background: rgba(255, 255, 255, 0.98) !important;
  border-radius: 20px !important;
  overflow: hidden !important;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(15px) !important;
  border: 2px solid rgba(255, 255, 255, 0.5) !important;
  transition: transform 0.3s ease !important;
}

.section-facebook .facebook-card:hover {
  transform: translateY(-5px) !important;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.6) !important;
}

/* Imagen lateral */
.section-facebook .bg-cover-img-fb {
  background-image: url("@/assets/images/imagen-fb.png") !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-position: center !important;
  min-height: 500px !important;
}

/* Área del widget */
.section-facebook .area-fb {
  padding: 25px !important;
  background: #ffffff !important;
}

.section-facebook .facebook-wrapper {
  border-radius: 12px !important;
  overflow: hidden !important;
}

/* Responsive */
@media (max-width: 768px) {
  .section-facebook {
    background-attachment: scroll !important;
    padding: 50px 0 !important;
  }
  
  .section-facebook .section-title-main {
    font-size: 2.5rem !important;
  }
  
  .section-facebook .facebook-card {
    border-radius: 15px !important;
  }
  
  .section-facebook .bg-cover-img-fb {
    min-height: 300px !important;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .section-facebook {
    background-attachment: scroll; /* Mejor rendimiento en móvil */
    padding: 50px 0;
  }
  
  .section-facebook .facebook-card {
    border-radius: 15px;
  }
}
.authority-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--card-shadow-hover);
}

.authority-card-image {
  position: relative;
  height: 280px;
  overflow: hidden;
}

.authority-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.authority-card:hover .authority-card-img {
  transform: scale(1.1);
}

.authority-card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.authority-card:hover .authority-card-overlay {
  transform: translateY(0);
}

.authority-card-social {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1rem;
  transition: var(--transition);
}

.social-link.whatsapp { background: #25D366; }
.social-link.facebook { background: #1877F2; }
.social-link.twitter { background: #1DA1F2; }

.social-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.authority-card-content {
  padding: 1.5rem;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.authority-card-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.3rem;
}

.authority-card-role {
  font-size: 1rem;
  color: var(--main-color, #007bff);
  font-weight: 500;
}

/* Paginación */
.pagination-elegant {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.pagination-elegant .page-link {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  color: #495057;
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition);
}

.pagination-elegant .page-link:hover {
  background: var(--main-color, #007bff);
  border-color: var(--main-color, #007bff);
  color: white;
  transform: translateY(-2px);
}

.pagination-elegant .page-item.active .page-link {
  background: var(--main-color, #007bff);
  border-color: var(--main-color, #007bff);
  color: white;
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.pagination-elegant .page-item.disabled .page-link {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Convocatorias Recientes */
.blog-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--card-shadow-hover);
}

.blog-card-image {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.blog-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-card:hover .blog-card-img {
  transform: scale(1.05);
}

.blog-card-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.4rem 1rem;
  background: var(--main-color, #007bff);
  color: white;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.blog-card-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blog-card-meta {
  margin-bottom: 0.8rem;
}

.blog-card-date {
  font-size: 0.9rem;
  color: #6c757d;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.blog-card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
  line-height: 1.4;
  flex: 1;
}

.blog-card-title a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
}

.blog-card-title a:hover {
  color: var(--main-color, #007bff);
}

.blog-card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--main-color, #007bff);
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition);
}

.blog-card-link:hover {
  gap: 0.8rem;
}

/* Accesibilidad */
a:focus-visible,
button:focus-visible,
.page-link:focus-visible {
  outline: 2px solid var(--main-color, #007bff);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}

/* Responsive */
@media (max-width: 991px) {
  .section-title-main { font-size: 2.5rem; }
  .plan-card { padding: 2rem; }
}

@media (max-width: 768px) {
  .section-links-externos,
  .section-about,
  .section-plan,
  .section-categories,
  .section-authorities,
  .section-recent {
    padding: 40px 0;
  }
  
  .content-card-scroll {
    height: auto;
    max-height: 350px;
  }
}

@media (max-width: 576px) {
  .category-card { padding: 1.5rem 1rem; }
  .category-card-content h5 { font-size: 1rem; }
}

/* ========================================
   BOTÓN BANNER - Mejorado con colores API
   ======================================== */
/* Botón Outline Elegante */
.btn-banner-outline {
  position: relative;
  display: inline-block;
  padding: 1.2rem 3rem;
  color: white !important;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 2px solid rgb(255, 255, 255);
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.4s ease;
  background:  rgba(11, 11, 11, 0.288);
  z-index: 1;
}

.btn-banner-outline .btn-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background: linear-gradient(
    135deg,
    var(--main-color, #007bff) 0%,
    var(--main-color-2, #0056b3) 100%
  );
  transition: width 0.4s ease;
  z-index: -1;
}

.btn-banner-outline:hover .btn-border {
  width: 100%;
}

.btn-banner-outline:hover {
  border-color: var(--main-color, #007bff);
  box-shadow: 0 10px 30px rgba(0, 123, 255, 0.4);
  transform: translateY(-3px);
}
</style>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { mapState } from "vuex";
import Typed from 'typed.js';
import { config } from '@/config/env'
import api from '@/plugins/axios'
import logger from '@/utils/logger' 

export default {
  name: "HomeCustom",
  
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  
data() {
    return {
      idInstitucion: config.app.idInstitucion || '22',
      
      texts: [
        "Universidad Pública de El Alto", 
        "Formando profesionales competentes en economía, finanzas y comercio"
      ],
      currentIndex: 0,
      isFadingOut: false,
      institucion: {},
      portadas: [],
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
      return config.uploads.baseUrl || ''
    },
    
    portadasList() {
      const vuexPortadas = this.Institucion?.portada || this.Institucion?.Portada;
      if (vuexPortadas?.length) return vuexPortadas;
      return this.portadas?.length ? this.portadas : [];
    },
  },

  methods: {
    applyDynamicColors() {
  const colors = this.Institucion?.colorinstitucion;
  if (colors && colors.length > 0) {
    const colorSet = colors[0];
    
    // Colores principales
    if (colorSet.color_primario) {
      document.documentElement.style.setProperty('--main-color', colorSet.color_primario);
    }
    if (colorSet.color_secundario) {
      document.documentElement.style.setProperty('--main-color-2', colorSet.color_secundario);
    }
    if (colorSet.color_terciario) {
      document.documentElement.style.setProperty('--main-color-3', colorSet.color_terciario);
    }
    
    // ✅ Variables adicionales para el botón del banner
    if (colorSet.color_primario) {
      document.documentElement.style.setProperty('--btn-banner-bg-start', colorSet.color_primario);
    }
    if (colorSet.color_secundario) {
      document.documentElement.style.setProperty('--btn-banner-bg-end', colorSet.color_secundario);
    }
    if (colorSet.color_terciario) {
      document.documentElement.style.setProperty('--btn-banner-shadow', colorSet.color_terciario);
    }
  }
},
buildSafeImageUrl(path) {
  if (!path) return require('@/assets/upea.png');
  
  const cleaned = String(path).trim();
  const MINIO_BASE = 'https://archivosminio.upea.bo/archivospaginasnode';
  
  // ✅ CASO 1: Ya es URL completa de MinIO → solo asegurar HTTPS
  if (cleaned.includes('archivosminio.upea.bo')) {
    return cleaned.replace(/^http:\/\//, 'https://');
  }
  
  // ✅ CASO 2: Es nombre de archivo o ruta relativa → construir con base de MinIO

  const lower = cleaned.toLowerCase();
  let folder = '/imagenes/'; 
  
  if (lower.endsWith('.pdf')) {
    folder = '/documentos/';
  } else if (lower.includes('institucion_logo')) {
    folder = '/imagenes/instituciones/';
  } else if (lower.includes('portada_imagen')) {
    folder = '/imagenes/portadas/';
  } else if (lower.includes('serv_imagen')) {
    folder = '/imagenes/servicios/';
  } else if (lower.includes('con_foto_portada')) {
    folder = '/imagenes/convocatorias/';
  }
  
  const resource = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;

  return `${MINIO_BASE}${folder}${resource}`.replace(/\/+/g, '/');
},
    
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
        const institucionId = this.idInstitucion || config.app.idInstitucion
        const res = await api.get(`/institucionesPrincipal/${institucionId}`)
        const data = res.data.Descripcion
        this.institucion = this._limpiarObjeto(data)

        this.$store.commit('setInstitucion', this.  institucion)
        
        if (this.institucion.colorinstitucion?.[0]) {
          const colores = this.institucion.colorinstitucion[0]
          document.documentElement.style.setProperty('--color-primario', colores.color_primario)
          document.documentElement.style.setProperty('--color-secundario', colores.color_secundario)
        }
      } catch (error) {
        logger.error('Error cargando institución:', error)  
      } finally {
        this.loading.institucion = false
      }
    },

    async getContenidosAll() {
      this.loading.contenidos = true
      try {
        const institucionId = this.idInstitucion || config.app.idInstitucion
        const res = await api.get(`/institucion/${institucionId}/gacetaEventos`)
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
        logger.error('Error cargando contenidos:', error)  
      } finally {
        this.loading.contenidos = false
      }
    },

    async getContenidoExtra() {
      this.loading.contenido = true
      try {
        const institucionId = this.idInstitucion || config.app.idInstitucion
        const res = await api.get(`/institucion/${institucionId}/contenido`)
        const data = res.data
        this.videos = data.upea_videos?.map(this._limpiarObjeto) || []
        this.portadas = data.portada?.map(this._limpiarObjeto) || []
        
        if (this.portadas.length > 0) {
          this.$store.commit('setInstitucion', {
            ...this.Institucion,
            portada: this.portadas
          });
        }
        
        this.autoridades = data.autoridad?.map(this._limpiarObjeto) || []
        this.videos = data.upea_videos?.map(this._limpiarObjeto) || []
      } catch (error) {
        logger.error('Error cargando contenido extra:', error)  
      } finally {
        this.loading.contenido = false
      }
    },

    async getRecursos() {
      this.loading.recursos = true
      try {
        const institucionId = this.idInstitucion || config.app.idInstitucion
        const res = await api.get(`/institucion/${institucionId}/recursos`)
        const data = res.data
        
        this.publicaciones = data.upea_publicaciones?.map(this._limpiarObjeto) || []
        this.enlaces = data.linksExternoInterno?.filter(l => l.estado === 1)?.map(this._limpiarObjeto) || []
      } catch (error) {
        logger.error('Error cargando recursos:', error)  
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

      const container = document.getElementById('facebook')
      if (!container) {
        setTimeout(() => this._renderFacebookWidget(), 500)
        return
      }

      if (!fbUrl || fbUrl === '_' || !fbUrl.includes('facebook.com')) {
        container.innerHTML = '<p class="text-center text-white">Página de Facebook no configurada</p>'
        return
      }

      try {
        const fbSrc = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(fbUrl)}&tabs=timeline&width=500&height=700&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true`

        container.innerHTML = `
          <iframe 
            src="${fbSrc}" 
            width="100%" 
            height="700" 
            style="border:none;overflow:hidden" 
            scrolling="no" 
            frameborder="0" 
            allowfullscreen="true" 
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
          ></iframe>
        `
      } catch (error) {
        container.innerHTML = '<p class="text-center text-white">Error cargando Facebook</p>'
      }
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