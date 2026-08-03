import type { ContentBundle } from "./content.types";

/** Traducción al inglés del contenido. Lo que falte cae al español. */
export const contentEn: ContentBundle = {
  projects: {
    "mechanical-design": {
      title: "Mechanical design & CAD",
      category: "Engineering",
      description: "A motorised linear axis modelled in CAD, plus technical drawing plates.",
      summary:
        "Mechanical design and drawing-office work: the full model of a linear axis driven by a lead screw and a stepper motor, together with the technical drawing plates made during the degree. Two sides of the same craft: defining a part in three dimensions and knowing how to communicate it in two.",
      role: "Design and modelling",
      problem:
        "Turning rotation into precise, repeatable linear travel, with a structure that can be built from extrusion and off-the-shelf components.",
      result:
        "A complete CAD assembly, with general views, sections and an exploded view, ready to quote and manufacture.",
      reflection:
        "Modelling is fast; what takes time is deciding what can be bought ready-made and what has to be manufactured. The sooner that line is drawn, the simpler the design stays.",
      tools: ["Fusion 360", "Solid Edge", "Standard technical drawing"],
      materials: ["Extruded aluminium", "Steel", "Trapezoidal lead screw"],
      tags: ["CAD", "Technical drawing", "Transmission"],
      process: [
        {
          title: "Off-the-shelf parts first",
          body: "The design starts from what already exists: a NEMA stepper, a lead screw and its nut, bearings and rails. Fixing those interfaces before the structure avoids redoing everything later.",
        },
        {
          title: "Structure and alignment",
          body: "The frame is built from extrusion and machined plates. The critical point is the alignment between the motor shaft and the lead screw: any misalignment turns into wear and lost precision.",
        },
        {
          title: "A carriage that is actually useful",
          body: "The carriage carries a hole pattern so tools or sensors can be mounted on top, which lets the axis serve more than one application.",
        },
        {
          title: "Documentation",
          body: "The assembly is translated into views, sections and dimensions following the standard, which is the part that lets someone else build it without having to ask.",
        },
      ],
      specs: [
        { label: "Transmission", value: "Lead screw and nut" },
        { label: "Drive", value: "Stepper motor" },
        { label: "Software", value: "Fusion 360 / Solid Edge" },
        { label: "Output", value: "Assembly, sections and exploded view" },
      ],
      gallery: {
        "projects/mechanical-design/linear-axis-iso": {
          alt: "Isometric view of the linear axis with stepper motor and carriage",
          caption: "The assembly: rail, lead screw, carriage and motor.",
        },
        "projects/mechanical-design/linear-axis-top": {
          alt: "Top view of the linear axis with the carriage centred",
          caption: "Top view.",
        },
        "projects/mechanical-design/linear-axis-front": {
          alt: "Front view of the linear axis with the lead screw exposed",
          caption: "Front view.",
        },
        "projects/mechanical-design/linear-axis-side": {
          alt: "Side view of the linear axis with the motor coupling",
          caption: "Motor – lead screw coupling.",
        },
        "projects/mechanical-design/linear-axis-section": {
          alt: "Section view of the linear axis showing the lead screw nut",
          caption: "Section: the nut that turns rotation into travel.",
        },
        "projects/mechanical-design/drawing-shaft": {
          alt: "Technical drawing plate of a stepped shaft with dimensions",
          caption: "Stepped shaft: views and dimensioning.",
        },
        "projects/mechanical-design/drawing-section": {
          alt: "Technical drawing plate with an A-A section of a revolved part",
          caption: "A-A section through a revolved part.",
        },
        "projects/mechanical-design/drawing-assembly": {
          alt: "Assembly drawing with several views and sections",
          caption: "Assembly drawing.",
        },
        "projects/mechanical-design/drawing-valve": {
          alt: "Drawing of a valve in section with a parts list",
          caption: "Valve section with parts list.",
        },
        "projects/mechanical-design/drawing-views-01": {
          alt: "Freehand plate with projection systems and sections",
          caption: "Projection systems.",
        },
        "projects/mechanical-design/drawing-views-02": {
          alt: "Freehand plate with dimensioned views of a prismatic part",
        },
        "projects/mechanical-design/drawing-views-03": {
          alt: "Freehand plate with a section view and standard hatching",
        },
        "projects/mechanical-design/drawing-revolution": {
          alt: "Freehand plate of a revolved part with its axis of symmetry",
        },
        "projects/mechanical-design/drawing-joint": {
          alt: "Technical drawing of a joint with dimensioned circles",
          caption: "Tolerances and fits on a bearing seat.",
        },
        "projects/mechanical-design/part-metal-finish": {
          alt: "Printed part with a metallic finish resting on a dark surface",
          caption: "From drawing to object: the finished part.",
        },
      },
    },

    "parlante-caracol": {
      title: "Shell speaker",
      category: "Product",
      description: "A speaker with a printed organic shell and electronics mounted on custom bases.",
      summary:
        "A project of my own that starts as a shape and ends as a product. The outer shell is a snail-shell geometry, modelled and then printed; inside, a speaker, a battery and its board sit on custom-printed bases, with magnets, a charging port and a switch. The parts are signed KROL, the mark Matías puts on what he makes.",
      role: "Own project: design, modelling, printing and assembly",
      year: "2024 — present",
      problem:
        "Fitting real electronics inside a shape that was never conceived as a box. The shell geometry is driven by visual judgement, but the speaker, the battery and the connector need flat seats, supports and concrete access.",
      result:
        "An object with an identity of its own, signed into the geometry, with the electronics housed on bases designed specifically for them.",
      reflection:
        "Separating the outer shell from the internal bases was the decision that unblocked the project: it lets the electronics be iterated without reprinting the large part, which is the one that eats the machine time.",
      tools: ["Blender", "Fusion 360", "FDM 3D printing"],
      materials: ["PLA", "Neodymium magnet", "LiPo battery"],
      tags: ["Product", "Electronics", "3D printing"],
      process: [
        {
          title: "Shape first",
          body: "The outer volume is modelled looking for a silhouette that works as an object, with a cavity that also holds a phone.",
        },
        {
          title: "Custom bases",
          body: "Rather than forcing the outer shape, internal plates are designed: every component gets its seat, its vents and its fixing points.",
        },
        {
          title: "Access and closing",
          body: "Charging port, switch and neodymium magnets are placed so the object can be opened for maintenance with no visible screws.",
        },
        {
          title: "Iterating on the print",
          body: "Every version is printed and the real fit is tested. FDM tolerances are not calculated in one go: they are adjusted by trying.",
        },
      ],
      specs: [
        { label: "Process", value: "FDM" },
        { label: "Closing", value: "Neodymium magnets" },
        { label: "Power", value: "Rechargeable battery" },
        { label: "Signature", value: "KROL, engraved into the part" },
      ],
      gallery: {
        "projects/parlante-caracol/render-branded": {
          alt: "Render of the shell with the KROL signature raised on the surface",
          caption: "The KROL signature comes out of the geometry, not off a label.",
        },
        "projects/parlante-caracol/render-form-01": {
          alt: "Render of the shell on a grey background, three-quarter view",
        },
        "projects/parlante-caracol/render-form-02": {
          alt: "Render of the shell showing the texture of the print layers",
        },
        "projects/parlante-caracol/render-detail": {
          alt: "Close-up of the ridged surface of the shell",
          caption: "The texture follows the print direction.",
        },
        "projects/parlante-caracol/render-form-03": { alt: "Side render of the shell" },
        "projects/parlante-caracol/render-form-04": { alt: "Render of the shell standing upright" },
        "projects/parlante-caracol/render-form-05": { alt: "Front render of the shell" },
        "projects/parlante-caracol/render-form-06": { alt: "General render of the shell at rest" },
        "projects/parlante-caracol/print-in-progress": {
          alt: "The shell printing on the bed of a Bambu Lab printer",
          caption: "From render to machine.",
        },
        "projects/parlante-caracol/board-mounted": {
          alt: "Electronic board and battery mounted on a printed base",
          caption: "A base printed to fit the board and the battery.",
        },
        "projects/parlante-caracol/assembly-pcb": {
          alt: "Close-up of the wiring between the board and the battery on the base",
        },
        "projects/parlante-caracol/assembly-speaker": {
          alt: "Speaker and board mounted inside a printed frame",
          caption: "The frame itself holds the speaker in place.",
        },
        "projects/parlante-caracol/assembly-full": {
          alt: "Full assembly with speaker, battery and board on the printed base",
        },
        "projects/parlante-caracol/plate-usb-magnets": {
          alt: "Printed plate with a charging port and magnets in the corners",
          caption: "Charging port and closing magnets.",
        },
        "projects/parlante-caracol/plate-switch": {
          alt: "Printed plate with the KROL signature engraved and a side switch",
        },
        "projects/parlante-caracol/plate-engraved": {
          alt: "Printed plate with the KROL signature engraved on the surface",
        },
        "projects/parlante-caracol/enclosure-frame": {
          alt: "Empty printed frame seen at an angle",
        },
        "projects/parlante-caracol/plate-slots": {
          alt: "Printed base with vent slots and fixing holes",
        },
        "projects/parlante-caracol/plate-slots-alt": {
          alt: "A second printed base with slots, seen from above",
        },
      },
    },

    "3d-printing": {
      title: "3D printing & prototyping",
      category: "Fabrication",
      description: "My own service: parts, replicas, scale models and custom cases.",
      summary:
        "My own 3D printing and custom design venture. Parts, signage, replicas and scale models for architecture clients, businesses and general use, running the whole process: quoting, CAD design, production, manufacturing planning and client communication. Full-scale models up to 1.20 m.",
      role: "Own venture",
      year: "2024 — present",
      problem:
        "Every job arrives different: a decorative replica, a custom case, an architectural model. What repeats is the underlying problem: taking an idea or someone else's file to a physical part that works out on time, on cost and on finish.",
      result:
        "Parts delivered for architecture, shops and general use, including full-scale models up to 1.20 m solved in sections.",
      reflection:
        "Printing is the easy part. The real work is deciding how to split a large piece, where the joints will land and how much hand finishing it needs so the client sees a product and not a print.",
      tools: ["Fusion 360", "Blender", "FDM 3D printing", "Post-processing"],
      materials: ["PLA", "Resin", "Filler and paint"],
      tags: ["Fabrication", "Post-processing", "Client work"],
      process: [
        {
          title: "Quote and feasibility",
          body: "Before printing you need to know whether it fits the machine, how much material it takes and how many pieces it is worth splitting into. That calculation sets the price and the lead time.",
        },
        {
          title: "Preparing the model",
          body: "Mesh repair, splitting, minimum wall thickness and orientation. Orientation decides where the support marks will land and how much sanding will be needed later.",
        },
        {
          title: "Production",
          body: "Batches planned to fill the bed and keep the machine running, with each job tracked.",
        },
        {
          title: "Finishing",
          body: "Filling, sanding and painting when the job calls for it. This is the stage that separates a printed part from a finished object.",
        },
      ],
      specs: [
        { label: "Technology", value: "FDM" },
        { label: "Maximum scale", value: "Up to 1.20 m in sections" },
        { label: "Scope", value: "Design, production and finishing" },
        { label: "Since", value: "2024" },
      ],
      gallery: {
        "projects/3d-printing/nike-outdoor-alt": {
          alt: "Printed replica of the Winged Victory of Samothrace on a column, outdoors",
          caption: "A scale replica, printed in sections and post-processed.",
        },
        "projects/3d-printing/nike-red-base": {
          alt: "Printed replica in cream mounted on a red base, indoors",
          caption: "The same piece in a different finish.",
        },
        "projects/3d-printing/workshop-finishing": {
          alt: "Work table with gold frames and a white piece being filled",
          caption: "Post-processing: filler, sanding and paint.",
        },
        "projects/3d-printing/shelf-decor": {
          alt: "Shelf with printed decorative pieces, copper circles and dried flowers",
          caption: "Decorative pieces in context.",
        },
        "projects/3d-printing/caliper-case-open": {
          alt: "Open printed case with a caliper inside",
          caption: "A case printed to fit a caliper.",
        },
        "projects/3d-printing/arch-model-01": {
          alt: "White scale model of a multi-level structure seen at an angle",
          caption: "Architectural models built in sections.",
        },
        "projects/3d-printing/arch-model-02": {
          alt: "White scale model of a structure with slabs and columns",
        },
        "projects/3d-printing/arch-model-03": {
          alt: "White multi-level scale model on a workshop table",
        },
        "projects/3d-printing/arch-model-04": {
          alt: "Top-down detail of the white model showing slabs and steps",
        },
      },
    },

    furniture: {
      title: "Objects & furniture",
      category: "Furniture",
      description: "A desk in wood and steel, a drawer unit and dimensional signage.",
      summary:
        "Object design taken through to construction. A 2400 x 700 x 800 mm desk in wood with a steel structure, first resolved in CAD with its dimensions and then built; a drawer unit and a divided panel; and BROTE's dimensional signage, made and installed on a wall, on concrete and outdoors.",
      role: "Design and fabrication",
      problem:
        "A large desk has to be stable, fit through a door and be assembled on site. All three are decided in the design, not in the workshop. Signage poses the same question at a different scale: a dimensional letter has to hold itself up, mount straight and read well under the light of the place.",
      result:
        "The desk built and in use, a family of complementary pieces resolved in CAD, and BROTE's signage installed.",
      reflection:
        "Seeing the built piece next to the render makes the difference plain between what the model promises and what the material allows. Learning to anticipate that gap is the job.",
      tools: ["Fusion 360", "Blender", "Digital fabrication"],
      materials: ["Wood", "Steel", "Melamine"],
      tags: ["Furniture", "Wood", "Signage"],
      process: [
        {
          title: "Dimensions from use",
          body: "It starts from working height and usable width, and only then does the structure that holds them get defined.",
        },
        {
          title: "Structure and joint",
          body: "A steel frame with a wooden top. The joint between the two materials is where the rigidity is won or lost.",
        },
        {
          title: "Checking in CAD",
          body: "The dimensioned model makes it possible to review fits and overhangs before cutting any material.",
        },
        {
          title: "Fabrication and installation",
          body: "Cutting, assembly and finishing, adjusting on site whatever the model did not anticipate. In signage, mounting is part of the design: standoff from the wall, shadow and alignment.",
        },
      ],
      specs: [
        { label: "Desk", value: "2400 x 700 x 800 mm" },
        { label: "Drawer unit", value: "600 x 600 x 560 mm" },
        { label: "Materials", value: "Wood and steel" },
        { label: "Status", value: "Built" },
      ],
      gallery: {
        "projects/furniture/desk-built": {
          alt: "The finished desk in a room with a wooden floor",
          caption: "The built piece.",
        },
        "projects/furniture/desk-render-dark": {
          alt: "Render of the desk on a dark background showing the drawer unit",
          caption: "Presentation render.",
        },
        "projects/furniture/desk-dimensions": {
          alt: "CAD model of the desk dimensioned at 2400, 700 and 800 millimetres",
          caption: "2400 x 700 x 800 mm.",
        },
        "projects/furniture/desk-dimensions-alt": {
          alt: "Second dimensioned view of the desk with the drawer unit",
        },
        "projects/furniture/drawer-unit-dimensions": {
          alt: "Dimensioned CAD model of a three-drawer unit on castors",
          caption: "Drawer unit, 600 x 600 x 560 mm.",
        },
        "projects/furniture/shelf-dimensions": {
          alt: "Dimensioned CAD model of a panel with horizontal divisions",
          caption: "A study of how to divide a panel.",
        },
        "projects/furniture/brote-sign-wall": {
          alt: "BROTE dimensional letters mounted on a white wall",
          caption: "BROTE signage: dimensional letters mounted on a wall.",
        },
        "projects/furniture/brote-sign-angle": {
          alt: "The BROTE letters seen at an angle, casting a shadow on the wall",
          caption: "The relief defines the shadow.",
        },
        "projects/furniture/brote-sign-concrete": {
          alt: "BROTE dimensional letters resting on concrete under a wooden roof",
          caption: "Installation on site.",
        },
        "projects/furniture/brote-sign-grass": {
          alt: "Light-coloured BROTE letters resting on grass",
        },
        "projects/furniture/brote-sign-banner": {
          alt: "BROTE sign on a wall with a bunting of hearts underneath",
        },
        "projects/furniture/brote-corners": {
          alt: "Three wooden corner pieces with seeds and dried flowers in the centre",
          caption: "Detail pieces.",
        },
        "projects/furniture/brote-corners-alt": {
          alt: "A variant of the corner pieces with different seeds",
        },
        "projects/furniture/brote-framed-piece": {
          alt: "Framed picture with seeds and nuts on a wooden wall",
        },
      },
    },

    renders: {
      title: "Renders",
      category: "Visualisation",
      description: "Seating, lighting and organic modelling studies resolved as images.",
      summary:
        "Visualisation work: scenes where the goal is not to manufacture but to understand and to show. Studies of a tubular-frame armchair, of a stacked-ring lamp and of the living room that holds them, plus organic modelling for anatomical reference. Here lighting, materials and framing are the work, not the accompaniment.",
      role: "Modelling and rendering",
      problem:
        "An image has to explain an object before it exists. The problem is not that it looks nice, but that it reads: what material it is, how it rests, where the light comes from.",
      result:
        "A series of images that present each object both as a whole and in the detail of how it is resolved.",
      reflection:
        "Rendering forces you to look at the object the way someone else will. Often the render exposes a design problem before it ever reaches the workshop.",
      tools: ["Blender", "Fusion 360", "Rendering"],
      materials: ["Upholstery", "Tubular steel", "Wood"],
      tags: ["Render", "Lighting", "Modelling"],
      process: [
        {
          title: "Model for the camera",
          body: "The level of detail is decided by what the camera will actually see. Modelling everything equally is wasted time.",
        },
        {
          title: "Materials by behaviour",
          body: "Upholstery, chromed tube and wood are not defined by colour but by how they return light. That is where the credibility of the scene is won.",
        },
        {
          title: "Lighting",
          body: "Few sources, well placed. In the dark scenes, the lamp from the design itself is what sets the mood.",
        },
        {
          title: "Framing",
          body: "Overall views to understand the piece, and details to tell how it is put together.",
        },
      ],
      specs: [
        { label: "Software", value: "Blender / Fusion 360" },
        { label: "Focus", value: "Product and scene" },
        { label: "Output", value: "Still image" },
      ],
      gallery: {
        "projects/renders/armchair-detail": {
          alt: "Detail of the armchair showing the tubular frame and the armrest",
          caption: "A continuous tube defines both frame and armrest.",
        },
        "projects/renders/armchair-top": {
          alt: "Top view of the armchair with the side table and the lamp",
        },
        "projects/renders/armchair-iso": {
          alt: "Isometric view of the armchair with its tubular frame",
        },
        "projects/renders/lamp-sidetable": {
          alt: "Render of a lamp beside a dark side table",
        },
        "projects/renders/lamp-scene": {
          alt: "Dark scene with a floor lamp and an armchair behind it",
          caption: "Light as part of the object.",
        },
        "projects/renders/lamp-detail": {
          alt: "Detail of the lamp shade with its stacked rings",
        },
        "projects/renders/lounge-scene": {
          alt: "Living room scene with a dark armchair, side table and lamp",
          caption: "The full scene, with its lighting mood.",
        },
        "projects/renders/anatomical-brain": {
          alt: "Three-dimensional model of a human brain seen from above",
          caption: "Organic modelling for anatomical reference.",
        },
        "projects/renders/anatomical-brain-detail": {
          alt: "Detail of the anatomical model with an area marked in red",
        },
      },
    },

    brote: {
      title: "BROTE",
      category: "Website",
      description: "A natural food e-commerce, with a storefront and an admin panel.",
      summary:
        "Collaboration on BROTE's digital product: an online shop for natural and organic products, with a catalogue, a customer club, recipes and a cart, plus the backoffice the business uses to manage all of it without touching code.",
      role: "Collaborator / design and development of the digital product",
      problem:
        "A brand that exists in a physical shop and needs to sell online, with a panel the people running the business can use without technical help.",
      result: "Storefront in production and an admin panel in daily use by the business.",
      reflection:
        "The panel is the part nobody sees and the one that decides whether the site stays alive. If adding a product is awkward, the catalogue goes stale in two weeks.",
      tools: ["UI design", "Web development", "Cloudflare Workers"],
      tags: ["Web", "E-commerce", "Backoffice"],
      process: [
        {
          title: "Storefront",
          body: "Catalogue, bundles and cart, built to be read quickly on a phone, which is where most people buy.",
        },
        {
          title: "Club and recipes",
          body: "Loyalty and content sections, so the site has a reason to be visited beyond a one-off purchase.",
        },
        {
          title: "Backoffice",
          body: "An admin panel to manage products, prices and site content.",
        },
      ],
      specs: [
        { label: "Role", value: "Collaborator" },
        { label: "Scope", value: "Storefront and backoffice" },
        { label: "Status", value: "In production" },
      ],
    },

    messa: {
      title: "MESSA",
      category: "Website",
      description: "My own product for restaurants: digital menu, QR ordering and panel.",
      summary:
        "My own end-to-end design and development project. MESSA is a restaurant's digital face: presentation, menu, ordering from the table by scanning a QR code, and a customer account, with a team login to run the service. The whole product, from the data model to the interface, is resolved end to end.",
      role: "Own project / end-to-end design and development",
      problem:
        "A restaurant needs the order to start before the waiter arrives, without making the guest install anything or create an account just to look at the menu.",
      result: "My own product online, with both the public site and the backoffice running.",
      reflection:
        "Building the whole thing forces you to decide where the complexity goes. It is almost always better for the system to carry it, rather than the person using it at nine at night with a full room.",
      tools: ["UX/UI design", "Web development", "Cloudflare Workers"],
      tags: ["Web", "Product", "UX/UI"],
      process: [
        {
          title: "Modelling the service",
          body: "The model comes first: what a table is, what an order is, what states it can be in and how it moves between them.",
        },
        {
          title: "Menu and QR ordering",
          body: "The guest scans, sees the menu and orders from the table. The interface favours quick reading over information density.",
        },
        {
          title: "Team access",
          body: "A separate panel so the floor can see and run the service in progress.",
        },
      ],
      specs: [
        { label: "Role", value: "End-to-end design and development" },
        { label: "Scope", value: "Complete product" },
        { label: "Status", value: "Online" },
      ],
    },
  },

  webProducts: {
    brote: {
      role: "Collaborator / design and development of the digital product",
      blurb: "An online shop for natural products, with its admin panel.",
    },
    messa: {
      role: "Own project / end-to-end design and development",
      blurb: "Digital menu and ordering from the table by QR, with a team login.",
    },
  },

  cv: {
    profile: {
      headline: "Engineering, design and fabrication of ideas you can touch.",
      summary:
        "Mechanical Engineering student at UTN, Facultad Regional General Pacheco, with a bilingual secondary education and C1 English. He learns quickly, works independently and adapts to different environments, combining technical work, design, data analysis, supplier communication, coordination and project support.",
    },
    profileParagraphs: [
      "I am a Mechanical Engineering student at UTN Facultad Regional General Pacheco, with a bilingual secondary education and C1 English. I work in the band where engineering meets design: I model in CAD, I fabricate, I assemble and, when the project calls for it, I take it to the screen as well.",
      "You can see that in what this archive holds. A linear axis resolved in CAD alongside the technical drawing plates that back it. A speaker of my own with a shell-shaped body that ends up housing a driver, a battery and a board on custom-designed bases, signed KROL. A 2400 mm desk that exists first as dimensions and then as a built object, and BROTE's dimensional signage mounted on a wall. Replicas, scale models and cases out of my own 3D printing venture, where I handle quoting, design, production and the client. And two websites online, BROTE and MESSA, with their backoffices.",
      "The common thread is fairly simple: I am interested in the part of the problem where decisions have to be made. What gets bought ready-made and what gets fabricated, where a large piece should be split, how much tolerance a fit can take, how much complexity the system should carry so the person using it does not have to.",
    ],
    facts: {
      "Ing. Mecánica — UTN FRGP": "Mechanical Eng. — UTN FRGP",
      "2025, estudiante activo": "2025, currently enrolled",
      "Impresión 3D, desde 2024": "3D printing, since 2024",
      "2.º puesto, robótica U. Austral": "2nd place, robotics, U. Austral",
    },
    capabilities: {
      "Ingeniería mecánica": {
        title: "Mechanical engineering",
        body: "Design of functional parts and mechanisms, thinking about manufacturing, standards and assembly criteria from the start.",
      },
      "CAD y oficina técnica": {
        title: "CAD and drawing office",
        body: "Modelling in Fusion 360 and Solid Edge, standard drawings, sections, dimensioning and basic metrology.",
      },
      "Fabricación digital": {
        title: "Digital fabrication",
        body: "3D printing end to end: preparing the model, batch production and post-processing through to the final finish.",
      },
      "Diseño de producto y objeto": {
        title: "Product and object design",
        body: "From shape to real assembly: enclosures, furniture and parts where the geometry has to house concrete components.",
      },
      "Electrónica embebida": {
        title: "Embedded electronics",
        body: "Mounting boards, batteries and actuators on custom-designed supports. Working knowledge of Arduino.",
      },
      "Producto digital": {
        title: "Digital product",
        body: "Design and development of sites and backoffices, from the data model to the interface the business uses every day.",
      },
    },
    education: {
      "UTN, Facultad Regional General Pacheco": {
        detail: "Mechanical Engineering",
        period: "2025 — present",
        note: "Currently enrolled",
      },
      "Brick Towers College": {
        detail: "Bilingual secondary school with an Economics focus",
      },
      "Cambridge IGCSE": {
        detail: "With Merit",
        note: "Took part in Mathematics Olympiads and Model United Nations debates.",
      },
    },
    experience: {
      "Servicio de impresión 3D y diseño personalizado": {
        title: "3D printing and custom design service",
        org: "Own venture",
        period: "2024 — present",
        body: "Design and fabrication of parts, signage and scale models for architecture clients, businesses and general use.",
        bullets: [
          "Quoting",
          "CAD design",
          "Production",
          "Client communication",
          "Manufacturing planning",
          "Technical problem solving",
        ],
        outcome: "Full-scale models up to 1.20 m.",
      },
      "Competencia de robótica": {
        title: "Robotics competition",
        org: "Universidad Austral",
        body: "Team project: presenting a line-following car, coordinating tasks and adapting under tight deadlines.",
        outcome: "Second place.",
      },
      "Proyectos técnicos personales en CAD": {
        title: "Personal technical projects in CAD",
        org: "Own work",
        body: "Design of functional mechanical parts considering manufacturing, standards and assembly criteria.",
        outcome: "Iterating designs to improve function and reduce complexity.",
      },
    },
    skills: {
      "Diseño técnico": {
        area: "Technical design",
        items: [
          "Fusion 360",
          "Solid Edge",
          "Blender",
          "3D modelling",
          "Assemblies",
          "Prototyping with 3D printing",
        ],
      },
      "Análisis y datos": {
        area: "Analysis and data",
        items: ["Intermediate/advanced Excel", "Organisation", "Tables", "Basic data analysis"],
      },
      Programación: {
        area: "Programming",
        items: ["HTML", "CSS", "JavaScript", "Digital House"],
      },
      Electrónica: {
        area: "Electronics",
        items: ["Arduino", "Working knowledge of electronics"],
      },
      "Oficina técnica": {
        area: "Drawing office",
        items: [
          "Reading 2D/3D drawings",
          "Basic metrology",
          "Following up jobs and suppliers",
        ],
      },
      Idiomas: {
        area: "Languages",
        items: ["Native Spanish", "Advanced English (C1)"],
      },
    },
    process: {
      "01": { title: "Observe", body: "Understand the problem and its context." },
      "02": { title: "Define", body: "Turn needs into concrete criteria." },
      "03": { title: "Design", body: "Develop ideas, drawings and alternatives." },
      "04": { title: "Build", body: "Prototype, fabricate and test." },
      "05": { title: "Refine", body: "Iterate towards a clearer, more functional solution." },
    },
  },
};
