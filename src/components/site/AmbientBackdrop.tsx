/**
 * Capas de fondo del sitio.
 *
 * En vez de un color plano, el fondo se arma por capas como un set real:
 * madera de nogal abajo, luz cálida entrando de un lado, rebote de verde del
 * otro, sombras de plantas proyectadas y un grano finísimo que une todo.
 *
 * Es puramente decorativo (`aria-hidden`), no intercepta el puntero y no pesa:
 * las tres texturas son procedurales y suman menos de 300 kB.
 */
export function AmbientBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* 1. base: espresso arriba, tinta abajo */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_-10%,#33241c_0%,#241a15_38%,#15120f_72%,#100f0d_100%)]" />

      {/* 2. madera: cubre todo, más presente en la mitad inferior */}
      <div
        className="absolute inset-0 opacity-[0.30] mix-blend-soft-light"
        style={{
          backgroundImage: "url(/assets/textures/walnut.webp)",
          backgroundSize: "900px auto",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.25) 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      {/* 3. veta más marcada abajo, como una mesa en primer plano */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45vh] opacity-[0.22] mix-blend-overlay"
        style={{
          backgroundImage: "url(/assets/textures/walnut.webp)",
          backgroundSize: "1500px auto",
          backgroundPosition: "center bottom",
          maskImage: "linear-gradient(to top, #000 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, #000 0%, transparent 100%)",
        }}
      />

      {/* 4. arena cálida: el haz de luz que entra desde arriba a la izquierda */}
      <div className="absolute -left-[12%] -top-[25%] h-[85vh] w-[75vw] rounded-full bg-[radial-gradient(closest-side,rgba(203,187,165,0.13),transparent)] blur-3xl" />
      <div className="absolute left-[6%] top-[-10%] h-[55vh] w-[40vw] rounded-full bg-[radial-gradient(closest-side,rgba(181,139,93,0.14),transparent)] blur-3xl" />

      {/* 5. rebote de vegetación a la derecha */}
      <div className="absolute -right-[18%] top-[18%] h-[85vh] w-[65vw] rounded-full bg-[radial-gradient(closest-side,rgba(83,97,76,0.20),transparent)] blur-3xl" />
      <div className="absolute -right-[10%] bottom-[-15%] h-[60vh] w-[50vw] rounded-full bg-[radial-gradient(closest-side,rgba(48,56,45,0.30),transparent)] blur-3xl" />

      {/* 6. sombras de plantas proyectadas sobre la pared */}
      <div
        className="absolute inset-0 opacity-[0.42] mix-blend-multiply"
        style={{
          backgroundImage: "url(/assets/textures/leaves.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "invert(1)",
        }}
      />

      {/* 7. una segunda pasada de hojas, más chica y desplazada, da profundidad */}
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage: "url(/assets/textures/leaves.webp)",
          backgroundSize: "150% auto",
          backgroundPosition: "30% -20%",
          transform: "scaleX(-1)",
          filter: "invert(1) blur(3px)",
        }}
      />

      {/* 8. viñeta suave, para que el contenido gane el centro */}
      <div className="absolute inset-0 bg-[radial-gradient(115%_85%_at_50%_38%,transparent_48%,rgba(0,0,0,0.42)_100%)]" />

      {/* 9. grano de película */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage: "url(/assets/textures/grain.webp)",
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}
