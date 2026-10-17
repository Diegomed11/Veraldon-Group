// Tipos mínimos del entorno de Cloudflare Workers que usa `worker/index.ts`.
// El Worker se compila con Wrangler, no con Next; por eso vive fuera del tsconfig del sitio.

declare module "cloudflare:email" {
  export class EmailMessage {
    constructor(from: string, to: string, raw: string | ReadableStream);
    readonly from: string;
    readonly to: string;
  }
}

interface SendEmail {
  send(message: import("cloudflare:email").EmailMessage): Promise<void>;
}

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  CONTACTO: SendEmail;
  // Secreto configurado en el panel de Cloudflare: buzón verificado que recibe el formulario.
  CONTACT_TO?: string;
}

interface ExportedHandler<E> {
  fetch?(request: Request, env: E): Response | Promise<Response>;
}
