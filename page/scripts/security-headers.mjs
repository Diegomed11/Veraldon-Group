// Se ejecuta después de `next build`. Genera los encabezados de seguridad del sitio:
//  - `out/_headers`: Cloudflare los aplica a los archivos estáticos.
//  - `worker/security.generated.ts`: el Worker aplica los mismos a las respuestas que genera él.
//
// La política de contenido (CSP) solo permite los scripts del propio sitio. Next deja unos pocos
// scripts en línea en cada página; en lugar de permitir cualquier script en línea, se calcula el
// hash SHA-256 de cada uno y solo esos quedan autorizados.
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const WORKER_FILE = new URL("../worker/security.generated.ts", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith(".html") ? [path] : [];
  });
}

const hashes = new Set();
for (const file of htmlFiles(OUT)) {
  const html = readFileSync(file, "utf8");
  for (const [, attrs, body] of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/type=["']application\/(ld\+)?json["']/.test(attrs) || !body) continue;
    hashes.add(`'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`);
  }
}

const csp = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].sort().join(" ")}`,
  // Las animaciones escriben estilos en línea; no se pueden autorizar por hash.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const headers = {
  "Content-Security-Policy": csp,
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
};

const lines = ["/*", ...Object.entries(headers).map(([name, value]) => `  ${name}: ${value}`)];
for (const line of lines) {
  if (line.length > 2000) throw new Error(`Encabezado demasiado largo para _headers (${line.length} caracteres): ${line.slice(0, 60)}`);
}
writeFileSync(join(OUT, "_headers"), `${lines.join("\n")}\n`);

writeFileSync(
  WORKER_FILE,
  `// Archivo generado por scripts/security-headers.mjs al compilar. No editar a mano.\nexport const PAGE_HEADERS: Record<string, string> = ${JSON.stringify(headers, null, 2)};\n`,
);

console.log(`Encabezados de seguridad: ${hashes.size} scripts en línea autorizados por hash.`);
