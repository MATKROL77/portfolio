/**
 * Acceso de demostración a los backoffices reales.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  LEER ANTES DE TOCAR ESTE ARCHIVO
 * ─────────────────────────────────────────────────────────────────────────────
 * Lo que se escriba acá queda PÚBLICO. El sitio es estático: cualquiera puede
 * abrir el código de la página y leer estos valores. Esa es justamente la
 * intención —  que quien visita el portfolio pueda entrar a mirar el panel —
 * pero implica dos condiciones que hay que sostener del lado del servidor:
 *
 *   1. La cuenta tiene que ser de SOLO LECTURA de verdad, verificado en el
 *      backend. No alcanza con esconder los botones en la interfaz: si el rol
 *      no está chequeado en el servidor, cualquiera puede modificar datos
 *      reales llamando a la API a mano.
 *   2. Los datos visibles no deberían incluir información personal de clientes
 *      (nombres, teléfonos, direcciones, correos). Si el panel los muestra,
 *      conviene que la cuenta de demo vea datos de prueba, no los reales.
 *
 * Si alguna de las dos no se cumple, es preferible dejar `enabled: false` y
 * mostrar la réplica local, que no toca nada.
 *
 * La contraseña no viene escrita en el repositorio: la carga el dueño del
 * sistema, en un solo paso y sin que quede en el historial de la terminal:
 *
 *     npm run set-access          → la pide y la carga en los dos sitios
 *     npm run set-access -- brote → sólo BROTE
 *     npm run set-access -- --clear → la borra y vuelve a la réplica local
 *
 * Después: `npm run deploy`. A partir de ahí queda visible en el sitio, con su
 * botón de copiar, para cualquiera que entre.
 */

export type DemoAccess = {
  /** si es false, se muestra la réplica local en vez del panel real */
  enabled: boolean;
  /**
   * Cómo entra el visitante al panel:
   *  - "credentials": se le muestran usuario y contraseña para que los copie.
   *  - "auto": la ruta embebida ya trae la sesión de invitado abierta y no hay
   *    nada que copiar. Es la opción preferible: no expone ninguna credencial.
   */
  mode: "credentials" | "auto";
  email: string;
  password: string;
  /** nota corta que se muestra junto al acceso */
  note?: string;
  /** minutos que dura la sesión de invitado, si el sitio la limita */
  sessionMinutes?: number;
};

export const demoAccess: Record<"brote" | "messa", DemoAccess> = {
  brote: {
    enabled: true,
    mode: "credentials",
    email: "portfolio@gmail.com",
    // Se carga con `npm run set-access`. No editar a mano.
    password: "",
  },
  messa: {
    // MESSA resuelve el acceso del lado del servidor: la ruta `/demo` entra
    // con una sesión de invitado de solo lectura, con su propia cookie
    // `SameSite=None; Secure` para que sobreviva dentro del iframe. No hace
    // falta publicar ninguna credencial.
    enabled: true,
    mode: "auto",
    email: "",
    password: "",
    sessionMinutes: 120,
  },
};

/**
 * Si se muestra el panel real (con su pantalla de login) o la réplica local.
 * No depende de que la contraseña esté cargada: ver el login verdadero ya es
 * más honesto que una maqueta, y la barra de acceso aparece igual con lo que
 * haya configurado.
 */
export function showsRealBackoffice(access: DemoAccess): boolean {
  return access.enabled;
}

/** true cuando hay contraseña cargada y se puede mostrar el acceso completo. */
export function hasCredentials(access: DemoAccess): boolean {
  return access.enabled && access.email.length > 0 && access.password.length > 0;
}
