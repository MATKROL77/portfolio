import type { AssetKey } from "./assets.generated";

/**
 * Manifiesto de contenido del portfolio.
 *
 * Es la única fuente de verdad: los componentes no tienen texto ni rutas de
 * imagen hardcodeadas. Para cambiar una imagen alcanza con reemplazar el
 * archivo en public/assets/** (o el original y volver a correr `npm run assets`);
 * para agregar un proyecto, agregar una entrada a `projects`.
 *
 * Criterio de división:
 *   - BROTE y MESSA son SITIOS WEB. No llevan renders ni fotos de objetos.
 *   - La señalética física de BROTE vive en "Objetos y mobiliario", porque es
 *     fabricación, no producto digital.
 *   - Los renders de visualización tienen su propia sección.
 *   - KROL es la firma que Matías graba en sus piezas, no el nombre de un
 *     producto: el proyecto se llama "Parlante caracol".
 *
 * Voz: el sitio está escrito en PRIMERA PERSONA. Al editar o agregar texto,
 * mantener "diseñé", "fabrico", "aprendí". Nunca hablar de Matías en tercera.
 *
 * Ningún proyecto declara clientes, premios, métricas ni medidas que no estén
 * confirmados por el material de origen o por el CV.
 */

export type ProjectStatus = "real" | "concept";

export type GalleryItem = {
  image: AssetKey;
  /** texto alternativo real; describe la imagen, no repite el título */
  alt: string;
  caption?: string;
  /** las imágenes con fondo recortado se muestran sin recuadro */
  cutout?: boolean;
};

export type SpecRow = { label: string; value: string };

export type Project = {
  slug: string;
  /** número de archivo, se muestra en las tarjetas */
  index: string;
  title: string;
  category: string;
  status: ProjectStatus;
  /** una línea, para la tarjeta del hero */
  description: string;
  /** párrafo de entrada del caso */
  summary: string;
  role?: string;
  year?: string;
  tools: string[];
  materials?: string[];
  heroImage: AssetKey;
  /** si el hero del caso va sin recuadro (PNG recortado) */
  heroCutout?: boolean;
  gallery: GalleryItem[];
  tags: string[];
  featured?: boolean;
  problem: string;
  process: { title: string; body: string }[];
  result: string;
  reflection: string;
  specs?: SpecRow[];
  /** módulo interactivo que se inserta en la vista de caso */
  interactive?: "web-brote" | "web-messa";
  /** aclaración visible cuando algo es conceptual o está en curso */
  disclaimer?: string;
};

export const projects: Project[] = [
  // -------------------------------------------------------------------------
  {
    slug: "mechanical-design",
    index: "01",
    title: "Diseño mecánico y CAD",
    category: "Ingeniería",
    status: "real",
    description:
      "Eje lineal motorizado modelado en CAD y láminas de dibujo técnico.",
    summary:
      "Acá junto dos cosas que para mí van de la mano: el modelado completo de un eje lineal accionado por husillo y motor paso a paso, y las láminas de dibujo técnico que hice durante la carrera. Son las dos caras del mismo oficio: definir una pieza en tres dimensiones y saber comunicarla en dos.",
    role: "Diseño y modelado",
    year: "2025",
    tools: ["Fusion 360", "Solid Edge", "Dibujo técnico normalizado"],
    materials: ["Aluminio perfilado", "Acero", "Husillo trapezoidal"],
    heroImage: "projects/mechanical-design/linear-axis-iso-alt",
    heroCutout: true,
    gallery: [
      {
        image: "projects/mechanical-design/linear-axis-iso",
        alt: "Vista isométrica del eje lineal con motor paso a paso y carro",
        caption: "Conjunto: guía, husillo, carro y motor.",
        cutout: true,
      },
      {
        image: "projects/mechanical-design/linear-axis-top",
        alt: "Vista superior del eje lineal mostrando el carro centrado",
        caption: "Vista superior.",
        cutout: true,
      },
      {
        image: "projects/mechanical-design/linear-axis-front",
        alt: "Vista frontal del eje lineal con el husillo a la vista",
        caption: "Vista frontal.",
        cutout: true,
      },
      {
        image: "projects/mechanical-design/linear-axis-side",
        alt: "Vista lateral del eje lineal con el acople al motor",
        caption: "Acople motor – husillo.",
        cutout: true,
      },
      {
        image: "projects/mechanical-design/linear-axis-section",
        alt: "Vista en corte del eje lineal mostrando la tuerca del husillo",
        caption: "Corte: la tuerca que convierte giro en desplazamiento.",
        cutout: true,
      },
      {
        image: "projects/mechanical-design/drawing-shaft",
        alt: "Lámina de dibujo técnico de un eje escalonado con acotaciones",
        caption: "Eje escalonado: vistas y acotación.",
      },
      {
        image: "projects/mechanical-design/drawing-section",
        alt: "Lámina de dibujo técnico con corte A-A de una pieza de revolución",
        caption: "Corte A-A sobre pieza de revolución.",
      },
      {
        image: "projects/mechanical-design/drawing-assembly",
        alt: "Plano de conjunto con varias vistas y cortes de un ensamble",
        caption: "Plano de conjunto.",
      },
      {
        image: "projects/mechanical-design/drawing-valve",
        alt: "Plano de una válvula en corte con lista de piezas",
        caption: "Corte de válvula con despiece.",
      },
      {
        image: "projects/mechanical-design/drawing-views-01",
        alt: "Lámina a mano alzada con sistemas de representación y cortes",
        caption: "Sistemas de representación.",
      },
      {
        image: "projects/mechanical-design/drawing-views-02",
        alt: "Lámina a mano con vistas acotadas de una pieza prismática",
      },
      {
        image: "projects/mechanical-design/drawing-views-03",
        alt: "Lámina a mano con vista en corte y rayado normalizado",
      },
      {
        image: "projects/mechanical-design/drawing-revolution",
        alt: "Lámina a mano de una pieza de revolución con eje de simetría",
      },
      {
        image: "projects/mechanical-design/drawing-joint",
        alt: "Plano técnico de una junta con circunferencias acotadas",
        caption: "Tolerancias y ajustes en un apoyo.",
      },
      {
        image: "projects/mechanical-design/part-metal-finish",
        alt: "Pieza impresa con acabado metálico apoyada sobre una superficie oscura",
        caption: "Del plano al objeto: pieza terminada.",
      },
    ],
    tags: ["CAD", "Dibujo técnico", "Transmisión"],
    featured: true,
    problem:
      "Necesitaba convertir un movimiento de giro en un desplazamiento lineal preciso y repetible, con una estructura que se pueda fabricar con perfilería y componentes estándar.",
    process: [
      {
        title: "Arranco por lo que ya existe",
        body: "Primero fijo los componentes que se compran hechos: motor paso a paso NEMA, husillo con su tuerca, rodamientos y guías. Si defino esas interfaces antes que la estructura, después no tengo que rehacer todo.",
      },
      {
        title: "Estructura y alineación",
        body: "Resolví la bancada con perfil y placas mecanizadas. El punto crítico es la alineación entre el eje del motor y el husillo: cualquier desalineación se paga en desgaste y en pérdida de precisión.",
      },
      {
        title: "Un carro que sirva para algo",
        body: "Le puse al carro un patrón de agujeros para montar herramientas o sensores encima. Así el eje no queda atado a una sola aplicación.",
      },
      {
        title: "Documentación",
        body: "Pasé el conjunto a vistas, cortes y acotaciones según norma. Esa es la parte que permite que otra persona lo fabrique sin tener que preguntarme nada.",
      },
    ],
    result:
      "Quedó un conjunto CAD completo, con vistas de conjunto, corte y despiece, listo para presupuestar y fabricar.",
    reflection:
      "Modelar es rápido; lo que me lleva tiempo es decidir qué compro hecho y qué fabrico. Cuanto antes defino esa frontera, más simple me queda el diseño.",
    specs: [
      { label: "Transmisión", value: "Husillo y tuerca" },
      { label: "Accionamiento", value: "Motor paso a paso" },
      { label: "Software", value: "Fusion 360 / Solid Edge" },
      { label: "Salida", value: "Conjunto, cortes y despiece" },
    ],
  },

  // -------------------------------------------------------------------------
  {
    slug: "parlante-caracol",
    index: "02",
    title: "Parlante caracol",
    category: "Producto",
    status: "real",
    description:
      "Parlante con carcasa orgánica impresa y electrónica montada a medida.",
    summary:
      "Un objeto mío que empieza como forma y termina como producto. La carcasa exterior es una geometría de caracol que modelé y después imprimí; adentro resolví el montaje de un parlante, una batería y su placa sobre bases impresas a medida, con imanes, puerto de carga e interruptor. Las piezas van firmadas KROL, que es la marca con la que firmo lo que fabrico.",
    role: "Proyecto propio: diseño, modelado, impresión y montaje",
    year: "2024 — presente",
    tools: ["Blender", "Fusion 360", "Impresión 3D FDM"],
    materials: ["PLA", "Imán de neodimio", "Batería LiPo"],
    heroImage: "projects/parlante-caracol/dock-with-phone",
    gallery: [
      {
        image: "projects/parlante-caracol/render-branded",
        alt: "Render de la carcasa de caracol con la firma KROL grabada en relieve",
        caption: "La firma KROL sale de la propia geometría, no de una etiqueta.",
      },
      {
        image: "projects/parlante-caracol/render-form-01",
        alt: "Render de la carcasa de caracol sobre fondo gris, vista tres cuartos",
      },
      {
        image: "projects/parlante-caracol/render-form-02",
        alt: "Render de la carcasa con la textura de las capas de impresión",
      },
      {
        image: "projects/parlante-caracol/render-detail",
        alt: "Detalle en primer plano de la superficie estriada de la carcasa",
        caption: "La textura sigue la dirección de impresión.",
      },
      {
        image: "projects/parlante-caracol/render-form-03",
        alt: "Render lateral de la carcasa de caracol",
      },
      {
        image: "projects/parlante-caracol/render-form-04",
        alt: "Render de la carcasa en posición vertical",
      },
      {
        image: "projects/parlante-caracol/render-form-05",
        alt: "Render frontal de la carcasa de caracol",
      },
      {
        image: "projects/parlante-caracol/render-form-06",
        alt: "Render de la carcasa apoyada, vista general",
      },
      {
        image: "projects/parlante-caracol/print-in-progress",
        alt: "La carcasa imprimiéndose sobre la cama de una impresora Bambu Lab",
        caption: "Del render a la máquina.",
      },
      {
        image: "projects/parlante-caracol/board-mounted",
        alt: "Placa electrónica y batería montadas sobre una base impresa",
        caption: "Base impresa a medida para la placa y la batería.",
      },
      {
        image: "projects/parlante-caracol/assembly-pcb",
        alt: "Detalle del cableado entre la placa y la batería sobre la base",
      },
      {
        image: "projects/parlante-caracol/assembly-speaker",
        alt: "Parlante y placa montados dentro de un marco impreso",
        caption: "El parlante queda sujeto por el propio marco.",
      },
      {
        image: "projects/parlante-caracol/assembly-full",
        alt: "Conjunto completo con parlante, batería y placa sobre la base impresa",
      },
      {
        image: "projects/parlante-caracol/plate-usb-magnets",
        alt: "Placa impresa con puerto de carga e imanes en las esquinas",
        caption: "Puerto de carga e imanes de cierre.",
      },
      {
        image: "projects/parlante-caracol/plate-switch",
        alt: "Placa impresa con la firma KROL grabada y un interruptor lateral",
      },
      {
        image: "projects/parlante-caracol/plate-engraved",
        alt: "Placa impresa con la firma KROL grabada en la superficie",
      },
      {
        image: "projects/parlante-caracol/enclosure-frame",
        alt: "Marco impreso vacío, visto en ángulo",
      },
      {
        image: "projects/parlante-caracol/plate-slots",
        alt: "Base impresa con ranuras de ventilación y agujeros de fijación",
      },
      {
        image: "projects/parlante-caracol/plate-slots-alt",
        alt: "Segunda base impresa con ranuras, vista cenital",
      },
    ],
    tags: ["Producto", "Electrónica", "Impresión 3D"],
    featured: true,
    problem:
      "Quería meter electrónica real dentro de una forma que no había pensado como caja. La geometría del caracol la definí por criterio visual, pero el parlante, la batería y el conector me pedían planos, apoyos y accesos concretos.",
    process: [
      {
        title: "La forma primero",
        body: "Modelé el volumen exterior buscando una silueta que funcionara como objeto, con una cavidad que además sirviera de apoyo para el teléfono.",
      },
      {
        title: "Bases a medida",
        body: "En vez de forzar la forma exterior, diseñé placas internas: cada componente tiene su alojamiento, sus ranuras de ventilación y sus puntos de fijación.",
      },
      {
        title: "Accesos y cierre",
        body: "Ubiqué el puerto de carga, el interruptor y los imanes de neodimio de modo que pueda abrir el objeto para mantenimiento sin dejar tornillos a la vista.",
      },
      {
        title: "Iterar sobre lo impreso",
        body: "Imprimí cada versión y probé el encastre real. Las tolerancias de FDM no las saco de una cuenta: las ajusto probando.",
      },
    ],
    result:
      "Quedó un objeto con identidad propia, firmado en la geometría, con la electrónica alojada en bases que diseñé específicamente para ella.",
    reflection:
      "Separar la forma exterior de las bases internas fue lo que me destrabó el proyecto: puedo iterar la electrónica sin volver a imprimir la pieza grande, que es la que me come todo el tiempo de máquina.",
    specs: [
      { label: "Proceso", value: "FDM" },
      { label: "Cierre", value: "Imanes de neodimio" },
      { label: "Alimentación", value: "Batería recargable" },
      { label: "Firma", value: "KROL, grabada en la pieza" },
    ],
  },

  // -------------------------------------------------------------------------
  {
    slug: "3d-printing",
    index: "03",
    title: "Impresión 3D y prototipado",
    category: "Fabricación",
    status: "real",
    description:
      "Servicio propio: piezas, réplicas, maquetas y estuches a medida.",
    summary:
      "Mi emprendimiento de impresión 3D y diseño personalizado. Hago piezas, carteles, réplicas y maquetas para clientes de arquitectura, negocios y uso general, y llevo el proceso completo: presupuesto, diseño CAD, producción, planificación de fabricación y comunicación con el cliente. Llegué a hacer modelos a escala real de hasta 1,20 m.",
    role: "Emprendimiento propio",
    year: "2024 — presente",
    tools: ["Fusion 360", "Blender", "Impresión 3D FDM", "Postprocesado"],
    materials: ["PLA", "Resina", "Pintura y masilla"],
    heroImage: "projects/3d-printing/nike-outdoor",
    gallery: [
      {
        image: "projects/3d-printing/nike-outdoor-alt",
        alt: "Réplica impresa de la Victoria de Samotracia sobre una columna, al aire libre",
        caption: "Réplica a escala, impresa por partes y postprocesada.",
      },
      {
        image: "projects/3d-printing/nike-red-base",
        alt: "Réplica impresa en color crema montada sobre una base roja, en interior",
        caption: "La misma pieza en otro acabado.",
      },
      {
        image: "projects/3d-printing/workshop-finishing",
        alt: "Mesa de trabajo con marcos dorados y una pieza blanca en proceso de masillado",
        caption: "Postprocesado: masilla, lijado y pintura.",
      },
      {
        image: "projects/3d-printing/shelf-decor",
        alt: "Estante con piezas decorativas impresas, círculos de cobre y flores secas",
        caption: "Piezas decorativas puestas en contexto.",
      },
      {
        image: "projects/3d-printing/caliper-case-open",
        alt: "Estuche impreso abierto con un calibre en su interior",
        caption: "Estuche a medida para un calibre.",
      },
      {
        image: "projects/3d-printing/arch-model-01",
        alt: "Maqueta blanca de una estructura de varios niveles vista en ángulo",
        caption: "Maquetas de arquitectura por piezas.",
      },
      {
        image: "projects/3d-printing/arch-model-02",
        alt: "Maqueta blanca de una estructura con losas y columnas",
      },
      {
        image: "projects/3d-printing/arch-model-03",
        alt: "Maqueta blanca de varios niveles sobre una mesa de taller",
      },
      {
        image: "projects/3d-printing/arch-model-04",
        alt: "Detalle cenital de la maqueta blanca mostrando losas y quiebres",
      },
    ],
    tags: ["Fabricación", "Postprocesado", "Cliente"],
    featured: true,
    problem:
      "Cada encargo me llega distinto: una réplica decorativa, un estuche a medida, una maqueta de arquitectura. Lo que se repite es el problema de fondo: llevar una idea o un archivo ajeno a una pieza física que cierre en tiempo, en costo y en terminación.",
    process: [
      {
        title: "Presupuesto y viabilidad",
        body: "Antes de imprimir necesito saber si entra en la máquina, cuánto material lleva y en cuántas partes conviene dividirlo. Esa cuenta me define el precio y el plazo.",
      },
      {
        title: "Preparación del modelo",
        body: "Reparo mallas, corto la pieza, reviso espesores mínimos y elijo la orientación. La orientación me decide dónde van a quedar las marcas de soporte y cuánto voy a tener que lijar después.",
      },
      {
        title: "Producción",
        body: "Planifico las tandas para aprovechar la cama y no dejar la máquina parada, y le hago seguimiento a cada trabajo.",
      },
      {
        title: "Terminación",
        body: "Masillo, lijo y pinto cuando el encargo lo pide. Es la etapa que separa una pieza impresa de un objeto terminado.",
      },
    ],
    result:
      "Entregué piezas para arquitectura, comercios y uso general, incluidos modelos a escala real de hasta 1,20 m resueltos por partes.",
    reflection:
      "La impresión es la parte fácil. El trabajo real está en decidir cómo parto una pieza grande, dónde van a quedar las uniones y cuánta terminación manual necesita para que el cliente vea un producto y no un print.",
    specs: [
      { label: "Tecnología", value: "FDM" },
      { label: "Escala máxima", value: "Hasta 1,20 m por partes" },
      { label: "Alcance", value: "Diseño, producción y terminación" },
      { label: "Desde", value: "2024" },
    ],
  },

  // -------------------------------------------------------------------------
  {
    slug: "furniture",
    index: "04",
    title: "Objetos y mobiliario",
    category: "Mobiliario",
    status: "real",
    description:
      "Escritorio en madera y hierro, módulo de cajones y señalética corpórea.",
    summary:
      "Diseño de objetos que llevé hasta la construcción. Un escritorio de 2400 x 700 x 800 mm en madera y estructura metálica, que resolví primero en CAD con sus medidas y después fabriqué; un módulo de cajones y un panel de divisiones; y la señalética corpórea de BROTE, que fabriqué y monté en pared, sobre concreto y en exterior.",
    role: "Diseño y fabricación",
    tools: ["Fusion 360", "Blender", "Fabricación digital"],
    materials: ["Madera", "Hierro", "Melamina"],
    heroImage: "projects/furniture/desk-render",
    gallery: [
      {
        image: "projects/furniture/desk-built",
        alt: "El escritorio ya construido, apoyado en una habitación con piso de madera",
        caption: "La pieza construida.",
      },
      {
        image: "projects/furniture/desk-render-dark",
        alt: "Render del escritorio sobre fondo oscuro mostrando el módulo de cajones",
        caption: "Render de presentación.",
      },
      {
        image: "projects/furniture/desk-dimensions",
        alt: "Modelo CAD del escritorio con cotas de 2400, 700 y 800 milímetros",
        caption: "2400 x 700 x 800 mm.",
      },
      {
        image: "projects/furniture/desk-dimensions-alt",
        alt: "Segunda vista acotada del escritorio con el módulo de cajones",
      },
      {
        image: "projects/furniture/drawer-unit-dimensions",
        alt: "Modelo CAD acotado de un módulo de tres cajones con ruedas",
        caption: "Módulo de cajones, 600 x 600 x 560 mm.",
      },
      {
        image: "projects/furniture/shelf-dimensions",
        alt: "Modelo CAD acotado de un panel con divisiones horizontales",
        caption: "Estudio de divisiones de un panel.",
      },
      {
        image: "projects/furniture/brote-sign-wall",
        alt: "Letras corpóreas de BROTE montadas en una pared blanca",
        caption: "Señalética de BROTE: letras corpóreas montadas en pared.",
      },
      {
        image: "projects/furniture/brote-sign-angle",
        alt: "Las letras de BROTE vistas en ángulo, con sombra sobre la pared",
        caption: "El relieve define la sombra.",
      },
      {
        image: "projects/furniture/brote-sign-concrete",
        alt: "Letras corpóreas de BROTE apoyadas sobre concreto bajo un techo de madera",
        caption: "Montaje en obra.",
      },
      {
        image: "projects/furniture/brote-sign-grass",
        alt: "Letras de BROTE en color claro apoyadas sobre césped",
      },
      {
        image: "projects/furniture/brote-sign-banner",
        alt: "Cartel de BROTE en una pared con un banderín de corazones debajo",
      },
      {
        image: "projects/furniture/brote-corners",
        alt: "Tres esquineros de madera con semillas y flores secas en el centro",
        caption: "Piezas de detalle.",
      },
      {
        image: "projects/furniture/brote-corners-alt",
        alt: "Variante de los esquineros con distintas semillas",
      },
      {
        image: "projects/furniture/brote-framed-piece",
        alt: "Cuadro enmarcado con semillas y frutos secos sobre una pared de madera",
      },
    ],
    tags: ["Mobiliario", "Madera", "Señalética"],
    featured: true,
    problem:
      "Un escritorio grande tiene que ser estable, entrar por una puerta y poder armarse en el lugar. Las tres cosas se deciden en el diseño, no en el taller. La señalética me planteó lo mismo en otra escala: una letra corpórea tiene que sostenerse, montarse derecha y leerse bien con la luz del lugar.",
    process: [
      {
        title: "Medidas de uso",
        body: "Arranco por la altura de trabajo y el ancho útil, y recién después defino la estructura que los sostiene.",
      },
      {
        title: "Estructura y unión",
        body: "Bastidor metálico con tablero de madera. La unión entre los dos materiales es donde se gana o se pierde la rigidez.",
      },
      {
        title: "Verificación en CAD",
        body: "Con el modelo acotado reviso encastres y voladizos antes de cortar material.",
      },
      {
        title: "Fabricación y montaje",
        body: "Corté, armé y terminé, ajustando en obra lo que el modelo no anticipa. En la señalética el montaje es parte del diseño: separación de la pared, sombra y alineación.",
      },
    ],
    result:
      "El escritorio quedó fabricado y en uso, con una familia de piezas complementarias resueltas en CAD, y la señalética de BROTE instalada.",
    reflection:
      "Ver la pieza construida al lado del render me deja clara la diferencia entre lo que el modelo promete y lo que el material permite. Anticipar esa distancia es lo que estoy aprendiendo.",
    specs: [
      { label: "Escritorio", value: "2400 x 700 x 800 mm" },
      { label: "Módulo cajones", value: "600 x 600 x 560 mm" },
      { label: "Materiales", value: "Madera y hierro" },
      { label: "Estado", value: "Fabricado" },
    ],
  },

  // -------------------------------------------------------------------------
  {
    slug: "renders",
    index: "05",
    title: "Renders",
    category: "Visualización",
    status: "real",
    description:
      "Estudios de asiento, iluminación y modelado orgánico resueltos como imagen.",
    summary:
      "Visualización 3D: escenas donde no busco fabricar sino entender y mostrar. Estudios de un sillón de estructura tubular, de una lámpara de anillos y de la sala que los contiene, más modelado orgánico de referencia anatómica. Acá la iluminación, los materiales y el encuadre son el trabajo, no el acompañamiento.",
    role: "Modelado y render",
    tools: ["Blender", "Fusion 360", "Render"],
    materials: ["Tapizado", "Acero tubular", "Madera"],
    heroImage: "projects/renders/armchair-lamp",
    gallery: [
      {
        image: "projects/renders/armchair-detail",
        alt: "Detalle del sillón mostrando la estructura tubular y el apoyabrazos",
        caption: "El tubo continuo define la estructura y el apoyabrazos.",
      },
      {
        image: "projects/renders/armchair-top",
        alt: "Vista superior del sillón con la mesa auxiliar y la lámpara",
      },
      {
        image: "projects/renders/armchair-iso",
        alt: "Vista isométrica del sillón con estructura tubular",
      },
      {
        image: "projects/renders/lamp-sidetable",
        alt: "Render de una lámpara junto a una mesa auxiliar oscura",
      },
      {
        image: "projects/renders/lamp-scene",
        alt: "Escena oscura con una lámpara de pie y un sillón al fondo",
        caption: "La luz como parte del objeto.",
      },
      {
        image: "projects/renders/lamp-detail",
        alt: "Detalle de la pantalla de la lámpara con anillos superpuestos",
      },
      {
        image: "projects/renders/lounge-scene",
        alt: "Escena de estar con sillón oscuro, mesa auxiliar y lámpara",
        caption: "La escena completa, con su clima de luz.",
      },
      {
        image: "projects/renders/anatomical-brain",
        alt: "Modelo tridimensional de un cerebro humano visto desde arriba",
        caption: "Modelado orgánico de referencia anatómica.",
      },
      {
        image: "projects/renders/anatomical-brain-detail",
        alt: "Detalle del modelo anatómico con una zona señalada en rojo",
      },
    ],
    tags: ["Render", "Iluminación", "Modelado"],
    featured: true,
    problem:
      "Una imagen tiene que explicar un objeto antes de que exista. No me alcanza con que se vea lindo: tiene que entenderse qué material es, cómo apoya y de dónde viene la luz.",
    process: [
      {
        title: "Modelar para la cámara",
        body: "Decido el nivel de detalle según lo que la cámara va a ver. Modelar todo por igual es tiempo perdido.",
      },
      {
        title: "Materiales por comportamiento",
        body: "Un tapizado, un tubo cromado y una madera no los defino por color sino por cómo devuelven la luz. Ahí se juega la credibilidad de la escena.",
      },
      {
        title: "Iluminación",
        body: "Pocas fuentes y bien puestas. En las escenas oscuras dejo que la lámpara del propio diseño defina el clima.",
      },
      {
        title: "Encuadre",
        body: "Vistas de conjunto para que se entienda la pieza, y detalles para contar cómo está resuelta.",
      },
    ],
    result:
      "Una serie de imágenes que muestran cada objeto tanto en conjunto como en el detalle constructivo.",
    reflection:
      "Renderizar me obliga a mirar el objeto como lo va a mirar otra persona. Muchas veces el render me deja en evidencia un problema de diseño antes de que llegue al taller.",
    specs: [
      { label: "Software", value: "Blender / Fusion 360" },
      { label: "Enfoque", value: "Producto y escena" },
      { label: "Salida", value: "Imagen fija" },
    ],
  },

  // -------------------------------------------------------------------------
  {
    slug: "brote",
    index: "06",
    title: "BROTE",
    category: "Sitio web",
    status: "real",
    description:
      "E-commerce de alimentos naturales, con tienda y panel de administración.",
    summary:
      "Colaboré en el producto digital de BROTE: una tienda en línea de productos naturales y orgánicos, con catálogo, club de clientes, recetas y carrito, más el backoffice desde el que el negocio gestiona todo eso sin tocar código.",
    role: "Colaborador / diseño y desarrollo del producto digital",
    tools: ["Diseño UI", "Desarrollo web", "Cloudflare Workers"],
    heroImage: "projects/brote/site-public",
    interactive: "web-brote",
    gallery: [],
    tags: ["Web", "E-commerce", "Backoffice"],
    featured: true,
    problem:
      "Una marca que existe en un local físico y necesitaba vender en línea, con un panel que la gente del negocio pudiera usar sin ayuda técnica.",
    process: [
      {
        title: "Tienda",
        body: "Armé catálogo, combos y carrito pensados para leerse rápido desde el teléfono, que es donde compra la mayoría.",
      },
      {
        title: "Club y recetas",
        body: "Sumé secciones de fidelización y contenido, para que el sitio tenga motivo de visita más allá de la compra puntual.",
      },
      {
        title: "Backoffice",
        body: "Un panel de administración para gestionar productos, precios y contenido del sitio.",
      },
    ],
    result:
      "La tienda quedó en producción y el panel en uso diario por el negocio.",
    reflection:
      "El panel es la parte que nadie ve y la que decide si el sitio se mantiene vivo. Si cargar un producto es incómodo, en dos semanas el catálogo está viejo.",
    specs: [
      { label: "Rol", value: "Colaborador" },
      { label: "Alcance", value: "Tienda y backoffice" },
      { label: "Estado", value: "En producción" },
    ],
  },

  // -------------------------------------------------------------------------
  {
    slug: "messa",
    index: "07",
    title: "MESSA",
    category: "Sitio web",
    status: "real",
    description:
      "Producto propio para restaurantes: carta digital, pedido por QR y panel.",
    summary:
      "Proyecto mío, de diseño y desarrollo integral. MESSA es la cara digital de un restaurante: presentación, carta, pedido desde la mesa escaneando un QR y cuenta de cliente, con un acceso de equipo para operar el servicio. Lo resolví entero, del modelo de datos a la interfaz.",
    role: "Proyecto propio / diseño y desarrollo integral",
    tools: ["Diseño UX/UI", "Desarrollo web", "Cloudflare Workers"],
    heroImage: "projects/messa/site-public",
    interactive: "web-messa",
    gallery: [],
    tags: ["Web", "Producto", "UX/UI"],
    featured: true,
    problem:
      "Un restaurante necesita que el pedido empiece antes de que llegue el mozo, sin obligar al comensal a instalar nada ni a crear una cuenta sólo para mirar la carta.",
    process: [
      {
        title: "Modelo del servicio",
        body: "Empecé por el modelo: qué es una mesa, qué es un pedido, qué estados puede tener y cómo pasa de uno a otro.",
      },
      {
        title: "Carta y pedido por QR",
        body: "El comensal escanea, ve la carta y pide desde la mesa. Prioricé la lectura rápida por sobre la densidad de información.",
      },
      {
        title: "Acceso del equipo",
        body: "Hice un panel aparte para que el salón vea y opere el servicio en curso.",
      },
    ],
    result: "Quedó en línea, con el sitio público y el backoffice funcionando.",
    reflection:
      "Hacerlo entero me obligó a decidir dónde poner la complejidad. Casi siempre conviene que la cargue el sistema y no la persona que lo usa a las nueve de la noche con el salón lleno.",
    specs: [
      { label: "Rol", value: "Diseño y desarrollo integral" },
      { label: "Alcance", value: "Producto completo" },
      { label: "Estado", value: "En línea" },
    ],
  },
];

export const projectsBySlug = new Map(projects.map((p) => [p.slug, p]));

export function getProject(slug: string): Project | undefined {
  return projectsBySlug.get(slug);
}

export const featuredProjects = projects.filter((p) => p.featured);

/**
 * Enlaces de los productos web.
 *
 * `publicEmbeddable` dice si el sitio se puede mostrar en vivo dentro de un
 * iframe. Lo decide el propio sitio con sus cabeceras, no este portfolio:
 *   - broteonline.com no manda X-Frame-Options ni frame-ancestors -> embebe.
 *   - messa.matiascolimodio.workers.dev manda `X-Frame-Options: DENY` y
 *     `frame-ancestors 'none'` -> el navegador bloquea el iframe. Se muestra la
 *     captura real y el botón para abrirlo en una pestaña.
 * Para embeber MESSA hay que cambiar esas dos cabeceras en su propio Worker.
 *
 * Acá no se guardan credenciales de ningún tipo: todo lo que viva en el
 * frontend es público para cualquiera que abra el código de la página.
 */
export type WebProduct = {
  slug: "brote" | "messa";
  name: string;
  role: string;
  blurb: string;
  publicUrl: string;
  adminUrl: string;
  cover: AssetKey;
  accent: string;
  publicEmbeddable: boolean;
  /** si el panel de administración se deja mostrar dentro de un iframe */
  adminEmbeddable: boolean;
};

export const webProducts: WebProduct[] = [
  {
    slug: "brote",
    name: "BROTE",
    role: "Colaborador / diseño y desarrollo del producto digital",
    blurb: "Tienda en línea de productos naturales, con su panel de administración.",
    publicUrl: "https://broteonline.com/",
    adminUrl: "https://brote-admin.matiascolimodio.workers.dev/admin",
    cover: "projects/brote/site-public",
    accent: "#53614c",
    publicEmbeddable: true,
    adminEmbeddable: true,
  },
  {
    slug: "messa",
    name: "MESSA",
    role: "Proyecto propio / diseño y desarrollo integral",
    blurb: "Carta digital y pedido desde la mesa por QR, con acceso para el equipo.",
    publicUrl: "https://messa.matiascolimodio.workers.dev/",
    adminUrl: "https://messa.matiascolimodio.workers.dev/admin",
    cover: "projects/messa/site-public",
    accent: "#b58b5d",
    // MESSA sirve todo el dominio con `frame-ancestors 'none'`, panel incluido
    publicEmbeddable: false,
    adminEmbeddable: false,
  },
];
