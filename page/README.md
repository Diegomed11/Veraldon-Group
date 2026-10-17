# Sitio web de Veraldon Group

Sitio en línea: https://veraldon.com (también en https://veraldon-group.diegomad473.workers.dev)

Next.js 16 (App Router), TypeScript y Tailwind CSS 4. Animaciones con `motion` y desplazamiento suave con `lenis`.

## Ver en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Dónde cambiar el contenido

Todo el texto está en `src/content/site.ts`: nombre, contacto, servicios, formas de empezar, normas, proceso y preguntas frecuentes. El texto sale del catálogo de servicios; los precios no se publican.

Pendientes: el número de WhatsApp y el perfil de LinkedIn (`phone` y `linkedin` en `site`). Mientras estén vacíos no se muestran.

El formulario de contacto envía los mensajes a `POST /api/contacto`, que atiende el Worker en `worker/index.ts`. El Worker los reenvía por correo con Cloudflare Email Routing, desde `formulario@veraldon.com` hacia el buzón guardado en el secreto `CONTACT_TO`, con el correo del visitante como dirección de respuesta. Para probarlo en local: `npm run build`, crear `.dev.vars` en la raíz del repositorio con `CONTACT_TO=alguien@ejemplo.com` y correr `npx --prefix page wrangler dev` desde la raíz; los correos quedan como archivos `.eml` en `.wrangler/tmp/email`.

## Despliegue

Se publica en Cloudflare Workers desde la rama `main`. El `wrangler.jsonc` de la raíz del repositorio instala y compila el sitio en `page/` y sube `page/out` como archivos estáticos.

## Seguridad

- `npm run build` corre dos pasos después de `next build`: `scripts/flatten-segments.mjs` (corrige los nombres de prefetch de las páginas de servicio) y `scripts/security-headers.mjs`, que genera `out/_headers` con la política de contenido (CSP, con hash de cada script en línea), HSTS y los demás encabezados, y `worker/security.generated.ts` para las respuestas del Worker.
- El formulario acepta solo envíos desde el propio sitio, en JSON y de hasta 16 KB; descarta bots con un campo trampa y un tiempo mínimo de llenado; y limita los envíos a 3 por minuto por visitante y 20 por minuto en total.
- `/.well-known/security.txt` publica el contacto para reportar vulnerabilidades.
