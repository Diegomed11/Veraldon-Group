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

El formulario de contacto abre el programa de correo del visitante con el mensaje preparado. Para recibir los mensajes directamente, conecta un servicio de formularios o correo en `src/components/ContactForm.tsx`.

## Despliegue

Se publica en Cloudflare Workers desde la rama `main`. El `wrangler.jsonc` de la raíz del repositorio instala y compila el sitio en `page/` y sube `page/out` como archivos estáticos.
