# portafolio

Portafolio de Wilinton Ascanio Toro, hecho con [Astro](https://astro.build). Español en `/`, inglés en `/en`.

## Comandos

```bash
npm install       # requiere Node 22.12 o superior
npm run dev       # servidor local
npm run build     # sitio estático en dist/
npm run preview   # sirve dist/
npm run check     # tipos (astro check, TypeScript 6)
npm test          # pruebas (Vitest)
```

## Dónde está cada cosa

- `src/data/projects.ts`: proyectos con su texto en los dos idiomas.
- `src/data/site.ts`: datos de contacto. Un canal en `null` no se muestra.
- `src/i18n/ui.ts`: textos de la interfaz.
- `src/components/ProjectCover.astro`: portada de cada proyecto. Las capturas están en `src/assets/projects/`.
- `src/scripts/`: animaciones (rutas, barras), vista previa y barra flotante.
- `docs/specs/`: decisiones de diseño.
