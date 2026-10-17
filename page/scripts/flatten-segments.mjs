// Se ejecuta después de `next build`. En la exportación estática, Next guarda los segmentos de las
// rutas dinámicas en carpetas (`__next.servicios/$d$slug/__PAGE__.txt`), pero el navegador los pide
// con el nombre unido por puntos (`__next.servicios.$d$slug.__PAGE__.txt`). Sin esta copia, el
// prefetch de las páginas de servicio responde 404.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

let copied = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (!statSync(path).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const file of files(path)) {
        const flat = join(dir, `${name}.${relative(path, file).split(sep).join(".")}`);
        if (!existsSync(flat)) {
          copyFileSync(file, flat);
          copied++;
        }
      }
    } else {
      walk(path);
    }
  }
}

walk(OUT);
console.log(`Segmentos de rutas dinámicas: ${copied} copiados con su nombre de prefetch.`);
