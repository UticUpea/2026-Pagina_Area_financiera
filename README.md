# Portal Web Multicarreras (Área Financiera) 2026

Proyecto web modular desarrollado con **Vue 3**, **JavaScript** y **Vue CLI** para la gestión, control y difusión de información institucional, convocatorias, gacetas y publicaciones de diversas carreras universitarias de la UPEA.

## Carreras asociadas

Este sistema está parametrizado mediante variables de entorno para dar soporte dinámico a:
- **Gestión Turística y Hotelera** (ID: 23)
- **Contaduría Pública** (ID: 13)
- **Economía** (ID: 22)

## Descripción

Esta aplicación centraliza y despliega de manera dinámica los comunicados oficiales, planes de estudio, gacetas, convocatorias y contenido multimedia de la carrera seleccionada. Consume datos directamente desde los servicios REST centralizados de la universidad. Cuenta con un diseño basado en componentes de Vue 3, persistencia/estado global en Vuex y estrictos mecanismos de control de seguridad perimetral en el cliente (CSP y optimización de Webpack).

## Estructura del proyecto

De acuerdo con el espacio de trabajo del repositorio, la arquitectura se distribuye de la siguiente manera:
- `/dist` — Archivos transpilados, minimizados y listos para distribución en servidores de producción.
- `/public` — Recursos estáticos globales (punto de entrada `index.html` y activos estáticos).
- `/src` — Código fuente del aplicativo (componentes modulares, vistas, enrutador y módulos de estado global).
- `vue.config.js` — Archivo central de configuración de Webpack, optimizaciones y políticas de red locales.
- `.browserslistrc` — Filtro de compatibilidad para navegadores de destino.

## Instalación

Para levantar el entorno local de desarrollo de forma limpia:

```bash
# Clona el repositorio
git clone <URL-del-repositorio>

# Instala las dependencias y paquetes de soporte de node_modules
npm install

# Copia y genera tu archivo de variables de entorno locales
cp .env.copy .env

##  Scripts principales
npm run serve — Inicia el servidor local de desarrollo (vue-cli-service serve) con soporte para Hot-Reload y configuraciones de depuración locales.

npm run build — Compila, optimiza y empaqueta la aplicación en la carpeta /dist purificando el código para producción.

npm run lint — Ejecuta el linter de ESLint para formatear, limpiar y asegurar las buenas prácticas del código fuente.

# Variables de entorno
Ajusta las variables de tu archivo .env según la carrera que vayas a compilar/desplegar en los servidores.


# Dependencias clave
El núcleo de la aplicación se apoya en los siguientes paquetes del archivo de manifiesto:

vue (^3.2.13) — Framework principal bajo la arquitectura de Vue 3.

vue-router (^4.0.3) & vuex (^4.0.0) — Ecosistema oficial para el manejo de rutas SPA y estado compartido centralizado.

axios (^1.15.0) & vue-axios — Cliente HTTP para el consumo de la infraestructura API de la UPEA.

vue-pdf-embed (^1.1.4) — Visor integrado para la lectura directa de gacetas y PDF institucionales.

dompurify (^3.4.10) & cryptr — Herramientas de desinfección contra ataques XSS en contenidos dinámicos y manejo seguro de strings.


# Arquitectura de Configuración y Seguridad (Vue Config)
El archivo vue.config.js implementa reglas rigurosas de optimización y políticas de protección:

1. Webpack y Optimizaciones
Pollyfills y Fallbacks: Se desactiva el módulo nativo de crypto en el cliente y se inyecta la resolución manual para util/ asegurando la estabilidad de librerías secundarias.

División de Código (SplitChunks): Configurado en chunks: 'all' para segmentar el código en paquetes más pequeños de carga diferida, mejorando drásticamente el rendimiento del portal.

Source Maps: Desactivados completamente en producción (productionSourceMap: false) para proteger la lógica del negocio del escrutinio público y reducir el peso del empaquetado.

2. Cabeceras de Seguridad y Content Security Policy (CSP)
El servidor de desarrollo y los entornos de red aplican cabeceras estrictas de protección que restringen el origen de los recursos en producción:

Content-Security-Policy (CSP): Restringe las conexiones (connect-src) estrictamente a dominios validados de la universidad (*.upea.bo) y servicios multimedia autorizados (youtube.com). Bloquea el uso de elementos incrustados no declarados (object-src 'none').

X-Frame-Options: SAMEORIGIN — Evita ataques de secuestro de clic (Clickjacking).

X-Content-Type-Options: nosniff — Fuerza al navegador a respetar estrictamente los tipos MIME enviados.

Permissions-Policy: Desactiva de forma nativa el uso no autorizado de hardware del cliente como la geolocation, microphone y camera.

HSTS (Strict-Transport-Security): En entornos productivos fuerza la navegación única bajo conexiones SSL/TLS seguras durante 1 año (max-age=31536000).


Desarrollado por el equipo UTIC — 2026.
