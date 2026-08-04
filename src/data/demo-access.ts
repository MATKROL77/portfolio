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
 * La contraseña NO está escrita en el repositorio a propósito: completala vos
 * en `password` cuando confirmes las dos condiciones de arriba.
 */

export type DemoAccess = {
  /** si es false, se muestra la réplica local en vez del panel real */
  enabled: boolean;
  email: string;
  password: string;
  /** nota corta que se muestra junto a las credenciales */
  note?: string;
};

export const demoAccess: Record<"brote" | "messa", DemoAccess> = {
  brote: {
    enabled: true,
    email: "portfolio@gmail.com",
    // ← completar con la contraseña de la cuenta de solo lectura
    password: "",
  },
  messa: {
    enabled: true,
    email: "portfolio@gmail.com",
    // ← completar con la contraseña de la cuenta de solo lectura
    password: "",
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
