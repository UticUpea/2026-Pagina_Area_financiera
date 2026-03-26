import { createRouter, createWebHistory } from 'vue-router'
import { config } from '@/config/env'

const routes = [
  {
    path: '/',
    name: 'appWrapper',
    component: () => import('@/pages/AppWrapper.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeCustom.vue')
      },
      {
        path: '/convocatorias/:tipo_conv',
        name: 'convocatorias',
        component: () => import('@/views/Convocatorias/ConvocatoriasView.vue')
      },
      {
        path: '/detalleConvocatoria/:idConv',
        name: 'detalleConvocatoria',
        component: () => import('@/views/Convocatorias/DetalleConvocatoria.vue')
      },
      {
        path: '/cursos/:tipo_cur',
        name: 'cursos',
        component: () => import('@/views/Cursos/CursosView.vue')
      },
      {
        path: '/detalleCurso/:idCur',
        name: 'detalleCurso',
        component: () => import('@/views/Cursos/DetalleCurso.vue')
      },
      {
        path: '/servicios',
        name: 'servicios',
        component: () => import('@/views/Servicios/ServiciosView.vue')
      },
      {
        path: '/detalleServicio/:idServ',
        name: 'detalleServicio',
        component: () => import('@/views/Servicios/DetalleServicio.vue')
      },
      {
        path: '/ofertas',
        name: 'ofertas',
        component: () => import('@/views/Ofertas/OfertasView.vue')
      },
      {
        path: '/detalleOferta/:idOfer',
        name: 'detalleOferta',
        component: () => import('@/views/Ofertas/DetalleOferta.vue')
      },
      {
        path: '/publicaciones',
        name: 'publicaciones',
        component: () => import('@/views/Publicaciones/PublicacionesView.vue')
      },
      {
        path: '/detallePublicacion/:idPub',
        name: 'detallePublicacion',
        component: () => import('@/views/Publicaciones/DetallePublicacion.vue')
      },
      {
        path: '/gaceta',
        name: 'gaceta',
        component: () => import('@/views/Gaceta/GacetaView.vue')
      },
      {
        path: '/detalleGaceta/:idGac',
        name: 'detalleGaceta',
        component: () => import('@/views/Gaceta/DetalleGaceta.vue')
      },
      {
        path: '/eventos',
        name: 'eventos',
        component: () => import('@/views/Eventos/EventosView.vue')
      },
      {
        path: '/detalleEvento/:idEv',
        name: 'detalleEvento',
        component: () => import('@/views/Eventos/DetalleEvento.vue')
      },
      {
        path: '/videos',
        name: 'videos',
        component: () => import('@/views/Videos/VideosView.vue')
      },
      {
        path: '/detalleVideo/:idVid',
        name: 'detalleVideo',
        component: () => import('@/views/Videos/DetalleVideo.vue')
      },
      {
        path: '/seminarios/:tipo_sem',
        name: 'seminarios',
        component: () => import('@/views/Seminarios/SeminariosView.vue')
      },
      {
        path: '/detalleSeminario/:idSem',
        name: 'detalleSeminario',
        component: () => import('@/views/Seminarios/DetalleSeminario.vue')
      },
      {
        path: '/investigacion',
        name: 'investigacion',
        component: () => import('@/views/Investigacion/InvestigacionView.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/AboutView.vue')
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/pages/404Page.vue')
  },
  {
    path: '/error_network',
    name: 'networkError',
    component: () => import('@/pages/ErrorNetwork.vue')
  }
]

const router = createRouter({
  history: createWebHistory(config.app.baseUrl || process.env.BASE_URL || '/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

export default router