import type { ContentBundle } from "./content.types";

/** Tradução para português do Brasil. O que faltar cai para o espanhol. */
export const contentPt: ContentBundle = {
  projects: {
    "mechanical-design": {
      title: "Projeto mecânico e CAD",
      category: "Engenharia",
      description: "Eixo linear motorizado modelado em CAD e pranchas de desenho técnico.",
      summary:
        "Trabalho de projeto mecânico e escritório técnico: a modelagem completa de um eixo linear acionado por fuso e motor de passo, junto com o conjunto de pranchas de desenho técnico feitas durante a faculdade. Duas faces do mesmo ofício: definir uma peça em três dimensões e saber comunicá-la em duas.",
      role: "Projeto e modelagem",
      problem:
        "Converter um movimento de rotação em deslocamento linear preciso e repetível, com uma estrutura que possa ser fabricada com perfis e componentes de prateleira.",
      result:
        "Um conjunto CAD completo, com vistas de conjunto, cortes e vista explodida, pronto para orçar e fabricar.",
      reflection:
        "Modelar é rápido; o que leva tempo é decidir o que dá para comprar pronto e o que precisa ser fabricado. Quanto antes essa fronteira é definida, mais simples o projeto fica.",
      tools: ["Fusion 360", "Solid Edge", "Desenho técnico normalizado"],
      materials: ["Alumínio perfilado", "Aço", "Fuso trapezoidal"],
      tags: ["CAD", "Desenho técnico", "Transmissão"],
      process: [
        {
          title: "Componentes de prateleira primeiro",
          body: "O projeto começa pelo que já existe: motor de passo NEMA, fuso com sua castanha, rolamentos e guias. Definir essas interfaces antes da estrutura evita refazer tudo depois.",
        },
        {
          title: "Estrutura e alinhamento",
          body: "A base é resolvida com perfil e chapas usinadas. O ponto crítico é o alinhamento entre o eixo do motor e o fuso: qualquer desalinhamento vira desgaste e perda de precisão.",
        },
        {
          title: "Carro e montagem útil",
          body: "O carro tem um padrão de furos para montar ferramentas ou sensores em cima, de modo que o eixo sirva para mais de uma aplicação.",
        },
        {
          title: "Documentação",
          body: "O conjunto é traduzido em vistas, cortes e cotas seguindo norma, que é a parte que permite outra pessoa fabricar sem precisar perguntar.",
        },
      ],
      specs: [
        { label: "Transmissão", value: "Fuso e castanha" },
        { label: "Acionamento", value: "Motor de passo" },
        { label: "Software", value: "Fusion 360 / Solid Edge" },
        { label: "Saída", value: "Conjunto, cortes e explodida" },
      ],
      gallery: {
        "projects/mechanical-design/linear-axis-iso": {
          alt: "Vista isométrica do eixo linear com motor de passo e carro",
          caption: "O conjunto: guia, fuso, carro e motor.",
        },
        "projects/mechanical-design/linear-axis-top": {
          alt: "Vista superior do eixo linear com o carro centralizado",
          caption: "Vista superior.",
        },
        "projects/mechanical-design/linear-axis-front": {
          alt: "Vista frontal do eixo linear com o fuso à mostra",
          caption: "Vista frontal.",
        },
        "projects/mechanical-design/linear-axis-side": {
          alt: "Vista lateral do eixo linear com o acoplamento ao motor",
          caption: "Acoplamento motor – fuso.",
        },
        "projects/mechanical-design/linear-axis-section": {
          alt: "Vista em corte do eixo linear mostrando a castanha do fuso",
          caption: "Corte: a castanha que converte giro em deslocamento.",
        },
        "projects/mechanical-design/drawing-shaft": {
          alt: "Prancha de desenho técnico de um eixo escalonado com cotas",
          caption: "Eixo escalonado: vistas e cotagem.",
        },
        "projects/mechanical-design/drawing-section": {
          alt: "Prancha de desenho técnico com corte A-A de uma peça de revolução",
          caption: "Corte A-A em peça de revolução.",
        },
        "projects/mechanical-design/drawing-assembly": {
          alt: "Desenho de conjunto com várias vistas e cortes",
          caption: "Desenho de conjunto.",
        },
        "projects/mechanical-design/drawing-valve": {
          alt: "Desenho de uma válvula em corte com lista de peças",
          caption: "Corte de válvula com lista de peças.",
        },
        "projects/mechanical-design/drawing-views-01": {
          alt: "Prancha à mão livre com sistemas de representação e cortes",
          caption: "Sistemas de representação.",
        },
        "projects/mechanical-design/drawing-views-02": {
          alt: "Prancha à mão com vistas cotadas de uma peça prismática",
        },
        "projects/mechanical-design/drawing-views-03": {
          alt: "Prancha à mão com vista em corte e hachura normalizada",
        },
        "projects/mechanical-design/drawing-revolution": {
          alt: "Prancha à mão de uma peça de revolução com eixo de simetria",
        },
        "projects/mechanical-design/drawing-joint": {
          alt: "Desenho técnico de uma junta com circunferências cotadas",
          caption: "Tolerâncias e ajustes em um apoio.",
        },
        "projects/mechanical-design/part-metal-finish": {
          alt: "Peça impressa com acabamento metálico sobre uma superfície escura",
          caption: "Do desenho ao objeto: peça pronta.",
        },
      },
    },

    "parlante-caracol": {
      title: "Caixa de som caracol",
      category: "Produto",
      description: "Caixa de som com carcaça orgânica impressa e eletrônica montada sob medida.",
      summary:
        "Um objeto próprio que começa como forma e termina como produto. A carcaça externa é uma geometria de caracol modelada e depois impressa; dentro, um alto-falante, uma bateria e sua placa ficam sobre bases impressas sob medida, com ímãs, porta de carga e interruptor. As peças são assinadas KROL, a marca com que Matías assina o que fabrica.",
      role: "Projeto próprio: design, modelagem, impressão e montagem",
      year: "2024 — presente",
      problem:
        "Colocar eletrônica real dentro de uma forma que não foi pensada como caixa. A geometria de caracol se define por critério visual, mas o alto-falante, a bateria e o conector precisam de apoios planos e acessos concretos.",
      result:
        "Um objeto com identidade própria, assinado na geometria e com a eletrônica alojada em bases desenhadas especificamente para ela.",
      reflection:
        "Separar a forma externa das bases internas foi a decisão que destravou o projeto: permite iterar a eletrônica sem reimprimir a peça grande, que é a que mais consome tempo de máquina.",
      tools: ["Blender", "Fusion 360", "Impressão 3D FDM"],
      materials: ["PLA", "Ímã de neodímio", "Bateria LiPo"],
      tags: ["Produto", "Eletrônica", "Impressão 3D"],
      process: [
        {
          title: "A forma primeiro",
          body: "O volume externo é modelado buscando uma silhueta que funcione como objeto, com uma cavidade que também serve de apoio para o celular.",
        },
        {
          title: "Bases sob medida",
          body: "Em vez de forçar a forma externa, são desenhadas placas internas: cada componente tem seu alojamento, suas aberturas de ventilação e seus pontos de fixação.",
        },
        {
          title: "Acessos e fechamento",
          body: "Porta de carga, interruptor e ímãs de neodímio ficam posicionados de modo que o objeto abra para manutenção sem parafusos à vista.",
        },
        {
          title: "Iteração sobre o impresso",
          body: "Cada versão é impressa e o encaixe real é testado. As tolerâncias de FDM não se calculam de uma vez: ajustam-se testando.",
        },
      ],
      specs: [
        { label: "Processo", value: "FDM" },
        { label: "Fechamento", value: "Ímãs de neodímio" },
        { label: "Alimentação", value: "Bateria recarregável" },
        { label: "Assinatura", value: "KROL, gravada na peça" },
      ],
      gallery: {
        "projects/parlante-caracol/render-branded": {
          alt: "Render da carcaça com a assinatura KROL em relevo",
          caption: "A assinatura KROL sai da própria geometria, não de uma etiqueta.",
        },
        "projects/parlante-caracol/render-form-01": {
          alt: "Render da carcaça sobre fundo cinza, vista três quartos",
        },
        "projects/parlante-caracol/render-form-02": {
          alt: "Render da carcaça com a textura das camadas de impressão",
        },
        "projects/parlante-caracol/render-detail": {
          alt: "Primeiro plano da superfície estriada da carcaça",
          caption: "A textura acompanha a direção de impressão.",
        },
        "projects/parlante-caracol/render-form-03": { alt: "Render lateral da carcaça" },
        "projects/parlante-caracol/render-form-04": { alt: "Render da carcaça na vertical" },
        "projects/parlante-caracol/render-form-05": { alt: "Render frontal da carcaça" },
        "projects/parlante-caracol/render-form-06": { alt: "Render geral da carcaça apoiada" },
        "projects/parlante-caracol/print-in-progress": {
          alt: "A carcaça sendo impressa na mesa de uma impressora Bambu Lab",
          caption: "Do render à máquina.",
        },
        "projects/parlante-caracol/board-mounted": {
          alt: "Placa eletrônica e bateria montadas sobre uma base impressa",
          caption: "Base impressa sob medida para a placa e a bateria.",
        },
        "projects/parlante-caracol/assembly-pcb": {
          alt: "Detalhe da fiação entre a placa e a bateria sobre a base",
        },
        "projects/parlante-caracol/assembly-speaker": {
          alt: "Alto-falante e placa montados dentro de um quadro impresso",
          caption: "O próprio quadro segura o alto-falante.",
        },
        "projects/parlante-caracol/assembly-full": {
          alt: "Conjunto completo com alto-falante, bateria e placa sobre a base impressa",
        },
        "projects/parlante-caracol/plate-usb-magnets": {
          alt: "Placa impressa com porta de carga e ímãs nos cantos",
          caption: "Porta de carga e ímãs de fechamento.",
        },
        "projects/parlante-caracol/plate-switch": {
          alt: "Placa impressa com a assinatura KROL gravada e um interruptor lateral",
        },
        "projects/parlante-caracol/plate-engraved": {
          alt: "Placa impressa com a assinatura KROL gravada na superfície",
        },
        "projects/parlante-caracol/enclosure-frame": {
          alt: "Quadro impresso vazio, visto em ângulo",
        },
        "projects/parlante-caracol/plate-slots": {
          alt: "Base impressa com aberturas de ventilação e furos de fixação",
        },
        "projects/parlante-caracol/plate-slots-alt": {
          alt: "Segunda base impressa com aberturas, vista de cima",
        },
      },
    },

    "3d-printing": {
      title: "Impressão 3D e prototipagem",
      category: "Fabricação",
      description: "Serviço próprio: peças, réplicas, maquetes e estojos sob medida.",
      summary:
        "Negócio próprio de impressão 3D e design personalizado. Peças, placas, réplicas e maquetes para clientes de arquitetura, comércios e uso geral, cuidando de todo o processo: orçamento, projeto CAD, produção, planejamento de fabricação e comunicação com o cliente. Modelos em escala real de até 1,20 m.",
      role: "Negócio próprio",
      year: "2024 — presente",
      problem:
        "Cada pedido chega diferente: uma réplica decorativa, um estojo sob medida, uma maquete de arquitetura. O que se repete é o problema de fundo: levar uma ideia ou um arquivo alheio a uma peça física que feche em prazo, custo e acabamento.",
      result:
        "Peças entregues para arquitetura, comércios e uso geral, incluindo modelos em escala real de até 1,20 m resolvidos em partes.",
      reflection:
        "A impressão é a parte fácil. O trabalho real está em decidir como dividir uma peça grande, onde ficarão as emendas e quanto acabamento manual ela precisa para o cliente ver um produto e não um print.",
      tools: ["Fusion 360", "Blender", "Impressão 3D FDM", "Pós-processamento"],
      materials: ["PLA", "Resina", "Massa e tinta"],
      tags: ["Fabricação", "Pós-processamento", "Cliente"],
      process: [
        {
          title: "Orçamento e viabilidade",
          body: "Antes de imprimir é preciso saber se cabe na máquina, quanto material leva e em quantas partes vale dividir. Essa conta define preço e prazo.",
        },
        {
          title: "Preparação do modelo",
          body: "Reparo de malhas, corte em peças, espessuras mínimas e orientação. A orientação decide onde ficarão as marcas de suporte e quanto lixamento será necessário depois.",
        },
        {
          title: "Produção",
          body: "Planejamento de lotes para aproveitar a mesa e não deixar a máquina parada, com acompanhamento de cada trabalho.",
        },
        {
          title: "Acabamento",
          body: "Massa, lixa e pintura quando o pedido pede. É a etapa que separa uma peça impressa de um objeto pronto.",
        },
      ],
      specs: [
        { label: "Tecnologia", value: "FDM" },
        { label: "Escala máxima", value: "Até 1,20 m em partes" },
        { label: "Escopo", value: "Projeto, produção e acabamento" },
        { label: "Desde", value: "2024" },
      ],
      gallery: {
        "projects/3d-printing/nike-outdoor-alt": {
          alt: "Réplica impressa da Vitória de Samotrácia sobre uma coluna, ao ar livre",
          caption: "Réplica em escala, impressa em partes e pós-processada.",
        },
        "projects/3d-printing/nike-red-base": {
          alt: "Réplica impressa em creme montada sobre uma base vermelha, em ambiente interno",
          caption: "A mesma peça em outro acabamento.",
        },
        "projects/3d-printing/workshop-finishing": {
          alt: "Mesa de trabalho com molduras douradas e uma peça branca em masseamento",
          caption: "Pós-processamento: massa, lixa e pintura.",
        },
        "projects/3d-printing/shelf-decor": {
          alt: "Prateleira com peças decorativas impressas, círculos de cobre e flores secas",
          caption: "Peças decorativas em contexto.",
        },
        "projects/3d-printing/caliper-case-open": {
          alt: "Estojo impresso aberto com um paquímetro dentro",
          caption: "Estojo sob medida para um paquímetro.",
        },
        "projects/3d-printing/arch-model-01": {
          alt: "Maquete branca de uma estrutura de vários níveis vista em ângulo",
          caption: "Maquetes de arquitetura feitas em partes.",
        },
        "projects/3d-printing/arch-model-02": {
          alt: "Maquete branca de uma estrutura com lajes e pilares",
        },
        "projects/3d-printing/arch-model-03": {
          alt: "Maquete branca de vários níveis sobre uma mesa de oficina",
        },
        "projects/3d-printing/arch-model-04": {
          alt: "Detalhe superior da maquete branca mostrando lajes e recortes",
        },
      },
    },

    furniture: {
      title: "Objetos e mobiliário",
      category: "Mobiliário",
      description: "Escrivaninha em madeira e ferro, gaveteiro e letras caixa.",
      summary:
        "Design de objetos levado até a construção. Uma escrivaninha de 2400 x 700 x 800 mm em madeira com estrutura metálica, resolvida primeiro em CAD com suas medidas e depois fabricada; um gaveteiro e um painel dividido; e a sinalização em letras caixa da BROTE, fabricada e instalada em parede, sobre concreto e ao ar livre.",
      role: "Projeto e fabricação",
      problem:
        "Uma escrivaninha grande precisa ser estável, passar por uma porta e poder ser montada no local. As três coisas se decidem no projeto, não na oficina. A sinalização coloca a mesma questão em outra escala: uma letra caixa precisa se sustentar, ser montada no prumo e ler bem com a luz do lugar.",
      result:
        "A escrivaninha fabricada e em uso, uma família de peças complementares resolvidas em CAD e a sinalização da BROTE instalada.",
      reflection:
        "Ver a peça construída ao lado do render deixa clara a diferença entre o que o modelo promete e o que o material permite. Aprender a antecipar essa distância é o trabalho.",
      tools: ["Fusion 360", "Blender", "Fabricação digital"],
      materials: ["Madeira", "Ferro", "Melamina"],
      tags: ["Mobiliário", "Madeira", "Sinalização"],
      process: [
        {
          title: "Medidas de uso",
          body: "Parte-se da altura de trabalho e da largura útil, e só então se define a estrutura que as sustenta.",
        },
        {
          title: "Estrutura e união",
          body: "Estrutura metálica com tampo de madeira. A união entre os dois materiais é onde a rigidez se ganha ou se perde.",
        },
        {
          title: "Verificação em CAD",
          body: "O modelo cotado permite revisar encaixes e balanços antes de cortar material.",
        },
        {
          title: "Fabricação e montagem",
          body: "Corte, montagem e acabamento, ajustando no local o que o modelo não antecipa. Na sinalização, a montagem é parte do projeto: afastamento da parede, sombra e alinhamento.",
        },
      ],
      specs: [
        { label: "Escrivaninha", value: "2400 x 700 x 800 mm" },
        { label: "Gaveteiro", value: "600 x 600 x 560 mm" },
        { label: "Materiais", value: "Madeira e ferro" },
        { label: "Estado", value: "Fabricado" },
      ],
      gallery: {
        "projects/furniture/desk-built": {
          alt: "A escrivaninha pronta, em um quarto com piso de madeira",
          caption: "A peça construída.",
        },
        "projects/furniture/desk-render-dark": {
          alt: "Render da escrivaninha sobre fundo escuro mostrando o gaveteiro",
          caption: "Render de apresentação.",
        },
        "projects/furniture/desk-dimensions": {
          alt: "Modelo CAD da escrivaninha cotado em 2400, 700 e 800 milímetros",
          caption: "2400 x 700 x 800 mm.",
        },
        "projects/furniture/desk-dimensions-alt": {
          alt: "Segunda vista cotada da escrivaninha com o gaveteiro",
        },
        "projects/furniture/drawer-unit-dimensions": {
          alt: "Modelo CAD cotado de um gaveteiro de três gavetas com rodízios",
          caption: "Gaveteiro, 600 x 600 x 560 mm.",
        },
        "projects/furniture/shelf-dimensions": {
          alt: "Modelo CAD cotado de um painel com divisões horizontais",
          caption: "Estudo de divisões de um painel.",
        },
        "projects/furniture/brote-sign-wall": {
          alt: "Letras caixa da BROTE montadas em uma parede branca",
          caption: "Sinalização da BROTE: letras caixa montadas em parede.",
        },
        "projects/furniture/brote-sign-angle": {
          alt: "As letras da BROTE vistas em ângulo, com sombra na parede",
          caption: "O relevo define a sombra.",
        },
        "projects/furniture/brote-sign-concrete": {
          alt: "Letras caixa da BROTE apoiadas sobre concreto sob um telhado de madeira",
          caption: "Montagem na obra.",
        },
        "projects/furniture/brote-sign-grass": {
          alt: "Letras da BROTE em cor clara apoiadas sobre a grama",
        },
        "projects/furniture/brote-sign-banner": {
          alt: "Placa da BROTE em uma parede com uma bandeirola de corações embaixo",
        },
        "projects/furniture/brote-corners": {
          alt: "Três cantoneiras de madeira com sementes e flores secas no centro",
          caption: "Peças de detalhe.",
        },
        "projects/furniture/brote-corners-alt": {
          alt: "Variante das cantoneiras com sementes diferentes",
        },
        "projects/furniture/brote-framed-piece": {
          alt: "Quadro emoldurado com sementes e castanhas sobre uma parede de madeira",
        },
      },
    },

    renders: {
      title: "Renders",
      category: "Visualização",
      description: "Estudos de assento, iluminação e modelagem orgânica resolvidos como imagem.",
      summary:
        "Trabalho de visualização 3D: cenas em que o objetivo não é fabricar, e sim entender e mostrar. Estudos de uma poltrona de estrutura tubular, de uma luminária de anéis e da sala que os contém, além de modelagem orgânica de referência anatômica. Aqui iluminação, materiais e enquadramento são o trabalho, não o acompanhamento.",
      role: "Modelagem e render",
      problem:
        "Uma imagem precisa explicar um objeto antes de ele existir. O problema não é ficar bonito, e sim ser entendido: que material é, como apoia, de onde vem a luz.",
      result:
        "Uma série de imagens que apresentam cada objeto tanto no conjunto quanto no detalhe construtivo.",
      reflection:
        "Renderizar obriga a olhar o objeto como outra pessoa vai olhar. Muitas vezes o render revela um problema de projeto antes de ele chegar à oficina.",
      tools: ["Blender", "Fusion 360", "Render"],
      materials: ["Estofado", "Aço tubular", "Madeira"],
      tags: ["Render", "Iluminação", "Modelagem"],
      process: [
        {
          title: "Modelar para a câmera",
          body: "O nível de detalhe se decide pelo que a câmera vai ver. Modelar tudo por igual é tempo perdido.",
        },
        {
          title: "Materiais por comportamento",
          body: "Um estofado, um tubo cromado e uma madeira não se definem por cor, e sim por como devolvem a luz. É aí que se ganha a credibilidade da cena.",
        },
        {
          title: "Iluminação",
          body: "Poucas fontes e bem colocadas. Nas cenas escuras, a luminária do próprio projeto é quem define o clima.",
        },
        {
          title: "Enquadramento",
          body: "Vistas de conjunto para entender a peça e detalhes para contar como ela é resolvida.",
        },
      ],
      specs: [
        { label: "Software", value: "Blender / Fusion 360" },
        { label: "Foco", value: "Produto e cena" },
        { label: "Saída", value: "Imagem estática" },
      ],
      gallery: {
        "projects/renders/armchair-detail": {
          alt: "Detalhe da poltrona mostrando a estrutura tubular e o braço",
          caption: "O tubo contínuo define estrutura e braço.",
        },
        "projects/renders/armchair-top": {
          alt: "Vista superior da poltrona com a mesa lateral e a luminária",
        },
        "projects/renders/armchair-iso": {
          alt: "Vista isométrica da poltrona com estrutura tubular",
        },
        "projects/renders/lamp-sidetable": {
          alt: "Render de uma luminária ao lado de uma mesa lateral escura",
        },
        "projects/renders/lamp-scene": {
          alt: "Cena escura com uma luminária de piso e uma poltrona ao fundo",
          caption: "A luz como parte do objeto.",
        },
        "projects/renders/lamp-detail": {
          alt: "Detalhe da cúpula da luminária com anéis sobrepostos",
        },
        "projects/renders/lounge-scene": {
          alt: "Cena de sala com poltrona escura, mesa lateral e luminária",
          caption: "A cena completa, com seu clima de luz.",
        },
        "projects/renders/anatomical-brain": {
          alt: "Modelo tridimensional de um cérebro humano visto de cima",
          caption: "Modelagem orgânica de referência anatômica.",
        },
        "projects/renders/anatomical-brain-detail": {
          alt: "Detalhe do modelo anatômico com uma região marcada em vermelho",
        },
      },
    },

    brote: {
      title: "BROTE",
      category: "Site",
      description: "E-commerce de alimentos naturais, com loja e painel de administração.",
      summary:
        "Colaboração no produto digital da BROTE: uma loja on-line de produtos naturais e orgânicos, com catálogo, clube de clientes, receitas e carrinho, além do backoffice com que o negócio gerencia tudo isso sem mexer em código.",
      role: "Colaborador / design e desenvolvimento do produto digital",
      problem:
        "Uma marca que existe em uma loja física e precisa vender on-line, com um painel que as pessoas do negócio consigam usar sem ajuda técnica.",
      result: "Loja em produção e painel de administração em uso pelo negócio.",
      reflection:
        "O painel é a parte que ninguém vê e a que decide se o site continua vivo. Se cadastrar um produto é incômodo, o catálogo fica velho em duas semanas.",
      tools: ["Design de UI", "Desenvolvimento web", "Cloudflare Workers"],
      tags: ["Web", "E-commerce", "Backoffice"],
      process: [
        {
          title: "Loja",
          body: "Catálogo, combos e carrinho, pensados para leitura rápida no celular, que é onde a maioria compra.",
        },
        {
          title: "Clube e receitas",
          body: "Seções de fidelização e conteúdo, para o site ter motivo de visita além da compra pontual.",
        },
        {
          title: "Backoffice",
          body: "Painel de administração para gerenciar produtos, preços e conteúdo do site.",
        },
      ],
      specs: [
        { label: "Função", value: "Colaborador" },
        { label: "Escopo", value: "Loja e backoffice" },
        { label: "Estado", value: "Em produção" },
      ],
    },

    messa: {
      title: "MESSA",
      category: "Site",
      description: "Produto próprio para restaurantes: cardápio digital, pedido por QR e painel.",
      summary:
        "Projeto próprio de design e desenvolvimento integral. MESSA é a cara digital de um restaurante: apresentação, cardápio, pedido na mesa pelo QR code e conta de cliente, com um acesso de equipe para operar o serviço. Todo o produto, do modelo de dados à interface, está resolvido de ponta a ponta.",
      role: "Projeto próprio / design e desenvolvimento integral",
      problem:
        "Um restaurante precisa que o pedido comece antes do garçom chegar, sem obrigar o cliente a instalar nada nem criar conta só para ver o cardápio.",
      result: "Produto próprio no ar, com site público e backoffice funcionando.",
      reflection:
        "Fazer tudo obriga a decidir onde colocar a complexidade. Quase sempre é melhor que o sistema a carregue, e não a pessoa que usa às nove da noite com o salão cheio.",
      tools: ["Design UX/UI", "Desenvolvimento web", "Cloudflare Workers"],
      tags: ["Web", "Produto", "UX/UI"],
      process: [
        {
          title: "Modelo do serviço",
          body: "Primeiro o modelo: o que é uma mesa, o que é um pedido, que estados pode ter e como passa de um para outro.",
        },
        {
          title: "Cardápio e pedido por QR",
          body: "O cliente escaneia, vê o cardápio e pede da mesa. A interface prioriza leitura rápida sobre densidade de informação.",
        },
        {
          title: "Acesso da equipe",
          body: "Um painel à parte para o salão ver e operar o serviço em andamento.",
        },
      ],
      specs: [
        { label: "Função", value: "Design e desenvolvimento integral" },
        { label: "Escopo", value: "Produto completo" },
        { label: "Estado", value: "No ar" },
      ],
    },
  },

  webProducts: {
    brote: {
      role: "Colaborador / design e desenvolvimento do produto digital",
      blurb: "Loja on-line de produtos naturais, com seu painel de administração.",
    },
    messa: {
      role: "Projeto próprio / design e desenvolvimento integral",
      blurb: "Cardápio digital e pedido na mesa por QR, com acesso para a equipe.",
    },
  },

  cv: {
    profile: {
      headline: "Engenharia, design e fabricação de ideias que dá para tocar.",
      summary:
        "Estudante de Engenharia Mecânica na UTN, Faculdade Regional General Pacheco, com formação secundária bilíngue e inglês C1. Aprende rápido, trabalha com autonomia e se adapta a diferentes ambientes, combinando tarefas técnicas, design, análise de dados, comunicação com fornecedores, coordenação e suporte de projetos.",
    },
    profileParagraphs: [
      "Sou estudante de Engenharia Mecânica na UTN Faculdade Regional General Pacheco, com ensino médio bilíngue e inglês C1. Trabalho na faixa onde a engenharia encontra o design: modelo em CAD, fabrico, monto e, quando o projeto pede, também levo para a tela.",
      "Isso aparece no que há neste arquivo. Um eixo linear resolvido em CAD junto às pranchas de desenho técnico que o sustentam. Uma caixa de som própria com carcaça de caracol que termina alojando alto-falante, bateria e placa sobre bases desenhadas sob medida, assinada KROL. Uma escrivaninha de 2400 mm que existe primeiro cotada e depois construída, e a sinalização em letras caixa da BROTE montada em parede. Réplicas, maquetes e estojos saídos de um negócio próprio de impressão 3D em que cuido de orçamento, projeto, produção e cliente. E dois sites no ar, BROTE e MESSA, com seus backoffices.",
      "O fio condutor é bem simples: me interessa a parte do problema em que é preciso decidir. O que se compra pronto e o que se fabrica, onde dividir uma peça grande, quanta tolerância um encaixe aguenta, quanta complexidade o sistema carrega para que a pessoa que o usa não precise carregar.",
    ],
    facts: {
      "Ing. Mecánica — UTN FRGP": "Eng. Mecânica — UTN FRGP",
      "2025, estudiante activo": "2025, cursando",
      "Impresión 3D, desde 2024": "Impressão 3D, desde 2024",
      "2.º puesto, robótica U. Austral": "2.º lugar, robótica U. Austral",
    },
    capabilities: {
      "Ingeniería mecánica": {
        title: "Engenharia mecânica",
        body: "Projeto de peças e mecanismos funcionais, pensando fabricação, normas e critérios de montagem desde o início.",
      },
      "CAD y oficina técnica": {
        title: "CAD e escritório técnico",
        body: "Modelagem em Fusion 360 e Solid Edge, desenhos normalizados, cortes, cotagem e metrologia básica.",
      },
      "Fabricación digital": {
        title: "Fabricação digital",
        body: "Impressão 3D de ponta a ponta: preparação do modelo, produção em lotes e pós-processamento até o acabamento final.",
      },
      "Diseño de producto y objeto": {
        title: "Design de produto e objeto",
        body: "Da forma à montagem real: carcaças, mobiliário e peças em que a geometria precisa alojar componentes concretos.",
      },
      "Electrónica embebida": {
        title: "Eletrônica embarcada",
        body: "Montagem de placas, baterias e atuadores sobre suportes desenhados sob medida. Noções de Arduino.",
      },
      "Producto digital": {
        title: "Produto digital",
        body: "Design e desenvolvimento de sites e backoffices, do modelo de dados à interface que o negócio usa todos os dias.",
      },
    },
    education: {
      "UTN, Facultad Regional General Pacheco": {
        detail: "Engenharia Mecânica",
        period: "2025 — presente",
        note: "Cursando",
      },
      "Brick Towers College": {
        detail: "Ensino médio bilíngue com ênfase em Economia",
      },
      "Cambridge IGCSE": {
        detail: "With Merit",
        note: "Participação em Olimpíadas de Matemática e debates tipo Model United Nations.",
      },
    },
    experience: {
      "Servicio de impresión 3D y diseño personalizado": {
        title: "Serviço de impressão 3D e design personalizado",
        org: "Negócio próprio",
        period: "2024 — presente",
        body: "Projeto e fabricação de peças, placas e maquetes para clientes de arquitetura, comércios e uso geral.",
        bullets: [
          "Orçamento",
          "Projeto CAD",
          "Produção",
          "Comunicação com o cliente",
          "Planejamento de fabricação",
          "Resolução de problemas técnicos",
        ],
        outcome: "Modelos em escala real de até 1,20 m.",
      },
      "Competencia de robótica": {
        title: "Competição de robótica",
        org: "Universidad Austral",
        body: "Projeto em equipe: apresentação de um carrinho seguidor de linha, coordenação de tarefas e adaptação sob prazos apertados.",
        outcome: "Segundo lugar.",
      },
      "Proyectos técnicos personales en CAD": {
        title: "Projetos técnicos pessoais em CAD",
        org: "Trabalho próprio",
        body: "Projeto de peças mecânicas funcionais considerando fabricação, normas e critérios de montagem.",
        outcome: "Iteração de projetos para melhorar a função e reduzir a complexidade.",
      },
    },
    skills: {
      "Diseño técnico": {
        area: "Projeto técnico",
        items: [
          "Fusion 360",
          "Solid Edge",
          "Blender",
          "Modelagem 3D",
          "Montagens",
          "Prototipagem com impressão 3D",
        ],
      },
      "Análisis y datos": {
        area: "Análise e dados",
        items: ["Excel intermediário/avançado", "Organização", "Tabelas", "Análise básica de dados"],
      },
      Programación: {
        area: "Programação",
        items: ["HTML", "CSS", "JavaScript", "Digital House"],
      },
      Electrónica: {
        area: "Eletrônica",
        items: ["Arduino", "Noções de eletrônica"],
      },
      "Oficina técnica": {
        area: "Escritório técnico",
        items: [
          "Leitura de desenhos 2D/3D",
          "Metrologia básica",
          "Acompanhamento de trabalhos e fornecedores",
        ],
      },
      Idiomas: {
        area: "Idiomas",
        items: ["Espanhol nativo", "Inglês avançado (C1)"],
      },
    },
    process: {
      "01": { title: "Observe", body: "Entender o problema e o contexto." },
      "02": { title: "Define", body: "Converter necessidades em critérios concretos." },
      "03": { title: "Design", body: "Desenvolver ideias, desenhos e alternativas." },
      "04": { title: "Build", body: "Prototipar, fabricar e testar." },
      "05": { title: "Refine", body: "Iterar até chegar a uma solução mais clara e funcional." },
    },
  },
};
