/**
 * Carga la contraseña del acceso de invitado en src/data/demo-access.ts.
 *
 * Existe para que ese valor lo escriba el dueño del sistema y no quede dando
 * vueltas en el historial de la terminal: el script lo lee por entrada estándar.
 *
 * Uso:
 *   npm run set-access                 -> la pide y la carga en los dos sitios
 *   npm run set-access -- brote        -> sólo BROTE
 *   npm run set-access -- messa        -> sólo MESSA
 *   npm run set-access -- --clear      -> la borra y vuelve a la réplica local
 *
 * Después: npm run deploy
 */

import { readFile, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const FILE = path.join(ROOT, "src", "data", "demo-access.ts");

const args = process.argv.slice(2);
const clear = args.includes("--clear");
const sites = args.filter((a) => a === "brote" || a === "messa");
const targets = sites.length > 0 ? sites : ["brote", "messa"];

/** Lee una línea sin dejarla en el historial del shell. */
function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

/**
 * Reemplaza el `password` del bloque de un sitio.
 * Se busca el bloque por su clave para no depender del orden del archivo.
 */
function setPassword(source, site, value) {
  const block = new RegExp(`(${site}:\\s*\\{[\\s\\S]*?password:\\s*)"[^"]*"`);
  if (!block.test(source)) {
    throw new Error(`No se encontró el bloque "${site}" en demo-access.ts`);
  }
  return source.replace(block, `$1${JSON.stringify(value)}`);
}

const password = clear ? "" : await ask("Contraseña del acceso de invitado: ");

if (!clear && password.length === 0) {
  console.log("No se ingresó nada, no se cambió el archivo.");
  process.exit(0);
}

let source = await readFile(FILE, "utf8");
for (const site of targets) {
  source = setPassword(source, site, password);
}
await writeFile(FILE, source, "utf8");

if (clear) {
  console.log(`Contraseña borrada en: ${targets.join(", ")}.`);
  console.log("El sitio vuelve a mostrar la réplica local de demostración.");
} else {
  console.log(`Contraseña cargada en: ${targets.join(", ")}.`);
  console.log("");
  console.log("Recordá que a partir de ahora es pública: cualquiera que abra el");
  console.log("sitio la va a ver. Que la cuenta no pueda escribir tiene que estar");
  console.log("verificado en el servidor, no sólo en la interfaz.");
}
console.log("");
console.log("Para publicarlo:  npm run deploy");
