/**
 * Datos de demostración para las réplicas de backoffice.
 *
 * IMPORTANTE: nada de esto sale de los sistemas reales de BROTE ni de MESSA.
 * Son datos inventados con el único fin de mostrar la forma de la interfaz.
 * La réplica es de sólo lectura y no hace ninguna request a los sitios reales.
 */

export type DemoStatus = "ok" | "warn" | "muted";

export const broteDemo = {
  title: "Panel de administración",
  metrics: [
    { label: "Pedidos hoy", value: "18" },
    { label: "Ticket promedio", value: "$ 24.900" },
    { label: "Productos activos", value: "126" },
    { label: "Sin stock", value: "4", status: "warn" as DemoStatus },
  ],
  columns: ["Producto", "Categoría", "Precio", "Stock", "Estado"],
  rows: [
    ["Almendras tostadas 500 g", "Frutos secos", "$ 12.400", "38", "Publicado"],
    ["Mix energético 250 g", "Mezclas", "$ 8.900", "12", "Publicado"],
    ["Pistachos con sal 300 g", "Frutos secos", "$ 18.700", "0", "Sin stock"],
    ["Avena instantánea 1 kg", "Cereales", "$ 6.200", "54", "Publicado"],
    ["Combo desayuno", "Combos", "$ 29.500", "9", "Publicado"],
    ["Semillas de chía 500 g", "Semillas", "$ 7.800", "0", "Sin stock"],
  ],
  side: {
    title: "Últimos pedidos",
    items: [
      { primary: "#1042 · Retiro en local", secondary: "Hace 12 min · $ 31.200" },
      { primary: "#1041 · Envío coordinado", secondary: "Hace 48 min · $ 18.900" },
      { primary: "#1040 · Retiro en local", secondary: "Hoy 10:24 · $ 9.400" },
      { primary: "#1039 · Envío coordinado", secondary: "Hoy 09:51 · $ 46.300" },
    ],
  },
} as const;

export const messaDemo = {
  title: "Servicio en curso",
  metrics: [
    { label: "Mesas ocupadas", value: "11 / 16" },
    { label: "Pedidos abiertos", value: "7" },
    { label: "Demora cocina", value: "14 min" },
    { label: "Sin mozo asignado", value: "2", status: "warn" as DemoStatus },
  ],
  columns: ["Mesa", "Comensales", "Estado", "Abierta hace", "Total"],
  rows: [
    ["M-02", "4", "Pedido enviado", "38 min", "$ 74.500"],
    ["M-05", "2", "Esperando plato", "22 min", "$ 41.200"],
    ["M-07", "6", "Sirviendo", "51 min", "$ 128.900"],
    ["M-09", "2", "Cuenta pedida", "1 h 05", "$ 39.700"],
    ["M-11", "3", "Escaneó el QR", "4 min", "—"],
    ["M-14", "5", "Sin mozo asignado", "9 min", "—"],
  ],
  side: {
    title: "Cocina",
    items: [
      { primary: "Tagliatelle al funghi ×2", secondary: "M-05 · en preparación" },
      { primary: "Entrada del día ×4", secondary: "M-07 · listo para servir" },
      { primary: "Postre del chef ×1", secondary: "M-09 · en preparación" },
      { primary: "Menú vegetariano ×2", secondary: "M-02 · en cola" },
    ],
  },
} as const;

export type BackofficeDemo = typeof broteDemo | typeof messaDemo;
