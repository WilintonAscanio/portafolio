# Rediseño del portafolio

Fecha: 12-nov-2026. Maqueta aprobada: https://claude.ai/artifact/NjKDZ3kRcbqZ2aLqvondsX

## Contexto

El portafolio actual (Create React App, 2023) se ve simple y muestra proyectos de práctica (Pizza App, Space App) con imágenes de Pexels. Hoy hay trabajo real que mostrar: Caelum (5 restaurantes), Yavi y Despachao (en construcción), los reportes con IA en Prolibu, Calculadoras Colombia y trading-lab. Create React App ya no tiene mantenimiento.

Público: empresas que contratan y dueños de negocios que podrían usar los productos. Al final, cada uno tiene su camino de contacto.

## Decisión

- Una página de inicio y una vista previa por proyecto. Más adelante, un caso completo por proyecto.
- Dirección visual: blanca y clara. Títulos en Bricolage Grotesque y texto en Geist. Amarillo solo para resaltar.
- **Sin foto del autor.** La identidad va en el monograma «W», la ficha de datos y el trabajo real.
- Proyectos en tarjetas grandes con portada (estilo Awwwards). Al hacer clic se abre la vista previa.
- Interacción con sentido: el hero de «rutas de despacho» y la tarjeta de Prolibu con los «datos que se arman». Nada de partículas genéricas.

## Cómo funciona

**Inicio**, en orden:

1. **Hero:** título, bajada, «Ver proyectos» y «Descargar hoja de vida», y el lienzo de rutas. Se puede tocar una tienda para despachar.
2. **Cifras:** 5 restaurantes con Caelum, 3 productos y «Web + app». Los números suben al aparecer en pantalla.
3. **Proyectos:** seis tarjetas, en 3, 2 o 1 columna según el ancho. Cada una lleva portada de color con la captura real, logo, nombre, rol y estado.
4. **Sobre mí:** la ficha (nombre, rol, ahora, construyo, uso, desde, base) y dos párrafos.
5. **Hablemos:** dos caminos. «¿Buscas un desarrollador?» lleva a la hoja de vida y LinkedIn. «¿Tienes una distribuidora, flota o restaurante?» lleva a WhatsApp y correo.
6. **Pie de página** y **barra flotante** (W, Proyectos, Sobre mí, Contacto, Hoja de vida) que marca la sección actual.

**Vista previa de un proyecto:** un diálogo modal con su propio enlace (`#yavi`) que se cierra con ✕, con Esc o tocando afuera. Lleva título, portada grande, el problema, qué hace, mi parte, galería, decisiones técnicas, stack y botones.

**Español e inglés:** la versión en inglés queda bajo `/en`.

## Archivos y recursos que toca

- Reemplaza la app de Create React App por **Astro**, como calculators-co. Las páginas son estáticas y solo el hero, la tarjeta de Prolibu y el diálogo cargan JavaScript.
- Capturas reales:
  - Caelum: `caelum-media/public/tables.png`. La de cocina es anterior al rediseño del 7-nov; hay que tomarla de nuevo.
  - Yavi: `yavi/apps/web/public/landing/{asset-desktop,home-phone}.png`.
  - Despachao: no tiene capturas; hay que levantar su web y tomarlas.
  - Calculadoras: hay que tomarlas del sitio.
- Logos:
  - Caelum: `caelum-web/public/brand/favicon.svg` (la constelación completa).
  - Yavi: `yavi/docs/marca/yavi-icono.svg`.
  - Despachao: `despachao/apps/web/app/icon.svg`.
- Hosting: Cloudflare Pages o Vercel, gratis.

## Fuera de alcance

Blog, modo oscuro, formulario propio (bastan WhatsApp y correo), estadísticas de visitas, gráfico de contribuciones de GitHub (la cuenta personal tiene poca actividad pública) y efectos 3D fuera del hero.

## Riesgos y supuestos

- **Pendiente del usuario:** LinkedIn, hoja de vida actualizada y si el WhatsApp va público. El correo de la maqueta es de ejemplo.
- **Caelum es un producto conjunto:** se presenta como «Front-end» y «el back lo hace mi socio». Confirmar el texto.
- **Cifras reales:** no se publica ninguna cifra que no sea real. Si cambian los «5 restaurantes», se actualizan.
- **Casos completos:** «Ver caso completo» necesita esas páginas. El primero es Despachao, con la estructura de la maqueta del 12-nov.

## Validación

- Revisar a 1440, 1024, 768 y 390 px, en claro.
- Recorrer en el navegador los clics de tarjetas, el diálogo (Esc, foco, enlace directo) y la barra flotante.
- Con «reducir movimiento» activado, todo queda quieto y visible.
- Lighthouse y peso de la página: las capturas en WebP y con tamaño fijo para que nada salte.
