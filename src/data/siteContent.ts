export interface StatItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  iconName: string;
}

export interface TimelineEvent {
  year: string;
  era: string;
  title: string;
  description: string;
  image: string;
  imageCaption: string;
  location: string;
  tag: string;
  metric: {
    value: string;
    label: string;
  };
  highlight?: boolean;
}

export interface NaturalColorItem {
  name: string;
  source: string;
  tone: string;
  hex: string;
  textColor: string;
  application: string;
}

export interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  badge: string;
  colorTheme: "green" | "amber" | "red" | "purple" | "cyan";
  highlights: string[];
  pillars: {
    title: string;
    description: string;
    points: string[];
  }[];
  applications?: string[];
  brandAssociations?: string[];
}

export interface BrandItem {
  name: string;
  claim: string;
  description: string;
  category: string;
  features: string[];
  tag: string;
  image: string;
}

export interface IndentIndustry {
  id: string;
  name: string;
  description: string;
  iconName: string;
  image: string;
  items: string[];
}

export interface CountryMirror {
  code: string;
  name: string;
  flag: string;
  tagline: string;
  presenceText: string;
  contactOffice: {
    address: string;
    phone: string;
    email: string;
    focus: string;
  };
}

export const COUNTRIES: CountryMirror[] = [
  {
    code: "MX",
    name: "México & Latinoamérica",
    flag: "MX",
    tagline: "Hub de operaciones técnicas, formulación local y centros cárnicos especializados",
    presenceText: "Sede central de Wenda Ingredients Latam en Guadalajara y Ciudad de México, con laboratorios de pruebas en corte, embutidos y panificación.",
    contactOffice: {
      address: "Parque Industrial Zapopan Norte, Jalisco, México",
      phone: "+52 (33) 3818 9000",
      email: "contacto@wendaingredients.com.mx",
      focus: "Formulación cárnica, Clean Label, importación directa y soporte técnico local"
    }
  },
  {
    code: "US",
    name: "United States & Canada",
    flag: "US",
    tagline: "North America Corporate & Applications Technology Center",
    presenceText: "Direct support for North American meat processors, functional bakeries, and sports nutraceutical brands.",
    contactOffice: {
      address: "Naperville / Chicago Tech Corridor, Illinois, USA",
      phone: "+1 (630) 456-7890",
      email: "usa@wendaingredients.com",
      focus: "Clean Label antimicrobials, protein binding systems & VICEL casing distributions"
    }
  },
  {
    code: "LATAM",
    name: "Cono Sur & Región Andina",
    flag: "CO",
    tagline: "Red de distribución y consultoría técnica en alimentos procesados",
    presenceText: "Conexión integral con plantas procesadoras de Colombia, Brasil, Chile y Perú con inventario garantizado.",
    contactOffice: {
      address: "Bogotá D.C. & São Paulo Regional Hubs",
      phone: "+57 (1) 745 2300",
      email: "latam@wendaingredients.com",
      focus: "Optimización de costos, rendimientos y soluciones a medida"
    }
  },
  {
    code: "EU",
    name: "Europe & Turkey",
    flag: "DE",
    tagline: "European Regulatory Compliance, Food Safety & Ribon Tech Integration",
    presenceText: "Alianzas estratégicas con procesadores europeos e integración de equipos de procesamiento Ribon.",
    contactOffice: {
      address: "Frankfurt am Main, Germany / Istanbul, Turkey",
      phone: "+49 69 9876 5432",
      email: "europe@wendaingredients.com",
      focus: "BRCGS Grade A compliance, halal certification & engineering lines"
    }
  },
  {
    code: "APAC",
    name: "Asia-Pacific & Global R&D",
    flag: "CN",
    tagline: "4 Centros de I+D Especializados y Plantas de Síntesis Biotecnológica",
    presenceText: "Centros de I+D en Dalian, Shanghai, Kunshan y Chengdu para el desarrollo de transglutaminasa y activos naturales.",
    contactOffice: {
      address: "Dalian High-Tech Industrial Zone, Liaoning, China",
      phone: "+86 411 8765 4321",
      email: "rd@wendaingredients.com",
      focus: "Investigación biomolecular, síntesis de ingredientes y certificación global"
    }
  }
];

export const STATS: StatItem[] = [
  {
    id: "founded",
    value: "1995",
    label: "Año de Fundación",
    sublabel: "Iniciada en Dalian, dedicada a la innovación y producción de ingredientes",
    iconName: "Calendar"
  },
  {
    id: "countries",
    value: "10+",
    label: "Países con Red Directa",
    sublabel: "Presencia en Norteamérica, Latam, Europa, Turquía y Asia",
    iconName: "Globe"
  },
  {
    id: "rd-centers",
    value: "4",
    label: "Centros de R&D",
    sublabel: "Dalian, Shanghai, Kunshan y Chengdu con tecnología de punta",
    iconName: "Microscope"
  },
  {
    id: "meat-labs",
    value: "6",
    label: "Laboratorios Cárnicos",
    sublabel: "Propios y en colaboración: Asia, Europa, EE. UU., México y Australia",
    iconName: "FlaskConical"
  },
  {
    id: "team",
    value: "400+",
    label: "Profesionales Globales",
    sublabel: "Científicos, ingenieros en alimentos y especialistas comerciales",
    iconName: "Users"
  },
  {
    id: "specialists",
    value: "75+",
    label: "Especialistas en I+D",
    sublabel: "Dedicados exclusivamente a formulación y soporte técnico",
    iconName: "Award"
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: "1995",
    era: "Génesis & Comercio Portuario",
    title: "Fundación en Dalian",
    description: "Nace Wenda Ingredients en el polo portuario e industrial de Dalian con la visión pionera de vincular la manufactura asiática de materias primas con los estándares de la industria alimentaria internacional.",
    image: "/images/timeline/1995-dalian-foundation.jpg",
    imageCaption: "Puerto y centro logístico de materias primas en Dalian, inicio del comercio exterior de aditivos.",
    location: "Dalian, China",
    tag: "Origen Industrial",
    metric: {
      value: "30+",
      label: "Años de trayectoria ininterrumpida"
    }
  },
  {
    year: "2000",
    era: "Biotecnología & Enzimas",
    title: "Desarrollo Enzimático y Transglutaminasa",
    description: "Desarrollo y puesta en marcha de reactores de fermentación para la producción de transglutaminasa y conectores proteicos de alta afinidad en sistemas cárnicos, surimi y análogos proteicos.",
    image: "/images/timeline/2000-enzymes-biotech.jpg",
    imageCaption: "Biocatálisis y purificación de transglutaminasa para la reticulación covalente de proteínas cárnicas.",
    location: "Dalian R&D Center",
    tag: "Biocatálisis Proteica",
    metric: {
      value: "TG-Meat",
      label: "Pioneros en formulación enzimática de alto enlace"
    }
  },
  {
    year: "2005",
    era: "Expansión Intercontinental",
    title: "Consolidación de Sedes Internacionales",
    description: "Apertura de filiales operativas directas y centros de distribución estratégica en Norteamérica, Europa y Asia-Pacífico, eliminando intermediarios en la cadena de frío y suministro.",
    image: "/images/timeline/2005-global-logistics.jpg",
    imageCaption: "Infraestructura logística multimodal y almacenamiento regulado en Norteamérica y Europa.",
    location: "Red Transcontinental",
    tag: "Cadena de Suministro Directa",
    metric: {
      value: "3",
      label: "Continentes con presencia operativa directa"
    }
  },
  {
    year: "2010",
    era: "Revolución Clean Label",
    title: "Vanguardia en Soluciones Clean Label",
    description: "Desarrollo y patente de las familias SafePlate® y FreshGuard®: conservadores botánicos, extractos de romero y fermentos naturales para sustituir fosfatos y nitritos sintéticos sin alterar el perfil sensorial.",
    image: "/images/nature/botanical-extract-herbs.jpg",
    imageCaption: "Extractos botánicos de romero y antioxidantes polifenólicos para reemplazo de aditivos sintéticos.",
    location: "Global R&D Lab",
    tag: "Etiqueta Limpia & Antioxidantes",
    metric: {
      value: "0%",
      label: "Aditivos químicos sintéticos en la línea SafePlate"
    }
  },
  {
    year: "2016",
    era: "Aterrizaje Técnico Regional",
    title: "Laboratorio de Aplicación México & Latam",
    description: "Inauguración de la planta piloto y centro técnico de pruebas cárnicas y panificación en México, permitiendo tropicalizar texturas, mermas de cocción y perfiles sensoriales para toda América Latina.",
    image: "/images/timeline/2016-latam-lab.jpg",
    imageCaption: "Planta piloto cárnica y laboratorio reológico para pruebas de rendimiento en tiempo real.",
    location: "Querétaro, México",
    tag: "Planta Piloto de Aplicación",
    metric: {
      value: "48h",
      label: "Tiempo de prototipado y validación de muestra técnica"
    }
  },
  {
    year: "2020",
    era: "Ciencia de la Masa & Panificación",
    title: "Líneas de Panificación y Nutrición",
    description: "Expansión hacia texturizantes enzimáticos, hidrocoloides y emulsiones para panificación industrial y pastelería, logrando retención de humedad prolongada, volumen óptimo y tolerancia en masa congelada.",
    image: "/images/timeline/2020-bakery-texture.jpg",
    imageCaption: "Optimización de la microestructura del alveolado y retención de humedad en masas industriales.",
    location: "División Bakery & Cereales",
    tag: "Retención de Humedad & Alveolado",
    metric: {
      value: "+30%",
      label: "Extensión de frescura en miga sin conservadores sintéticos"
    }
  },
  {
    year: "2023",
    era: "Automatización & Embutición",
    title: "Alianzas Estratégicas VICEL & RIBON",
    description: "Integración exclusiva de tripas de celulosa regenerada VICEL de alta velocidad y maquinaria alemana/asiática RIBON para embutición continua sin roturas en líneas automáticas.",
    image: "/images/timeline/2023-vicel-ribon.jpg",
    imageCaption: "Tripas celulósicas VICEL y envolvedoras mecánicas continuas de ultra-alta velocidad.",
    location: "División Maquinaria & Casing",
    tag: "Ingeniería de Procesamiento",
    metric: {
      value: "2,000+",
      label: "Piezas por minuto en líneas continuas de salchicha"
    }
  },
  {
    year: "2025-2026",
    era: "Biotecnología Celular & Red Indent",
    title: "Lanzamiento WNDA Science & Red Indent",
    description: "Consolidación de WNDA Science para suplementos, extractos bioactivos y péptidos funcionales, junto con la red Wenda Indent para cotización directa en origen y abastecimiento global transparente.",
    image: "/images/timeline/2025-wnda-science.jpg",
    imageCaption: "Péptidos bioactivos y estandarización analítica HPLC para nutracéuticos de grado farmacéutico.",
    location: "Plataforma Global Wenda",
    tag: "Nutracéutica & Trazabilidad",
    metric: {
      value: "100%",
      label: "Trazabilidad de origen y pureza certificada"
    },
    highlight: true
  }
];

export const CATEGORIES: CategoryItem[] = [
  {
    id: "meat-poultry",
    title: "Meat & Poultry",
    subtitle: "Funcionalidad que se traduce en rendimiento",
    tagline: "Más rendimiento en el proceso. Más satisfacción en cada bocado.",
    image: "/images/meat/roasted-meat.jpg",
    badge: "Especialidad Histórica",
    colorTheme: "red",
    highlights: [
      "Mejor textura, mordida y cohesión estructural",
      "Mayor jugosidad y retención de humedad sin purga",
      "Ablandadores y marinadores funcionales de alta penetración",
      "Emulsiones más estables y homogéneas",
      "Reducción directa de mermas y optimización de costos"
    ],
    pillars: [
      {
        title: "Rendimiento que impulsa la rentabilidad",
        description: "Ayudamos a aprovechar mejor cada materia prima mediante sistemas funcionales que incrementan el rendimiento y favorecen un proceso más eficiente.",
        points: [
          "Mayor rendimiento volumétrico durante la producción",
          "Reducción comprobada de mermas por cocción",
          "Menor pérdida de líquidos y exudado en empaque al vacío",
          "Mejor retención de agua en formulaciones exigentes",
          "Mayor consistencia lote a lote"
        ]
      },
      {
        title: "Estabilidad que protege el producto",
        description: "Nuestras soluciones ayudan a conservar la estructura, funcionalidad y calidad durante el almacenamiento, distribución y comercialización.",
        points: [
          "Sistemas ligantes avanzados para matrices proteicas",
          "Emulsificantes de alto desempeño",
          "Mayor estabilidad de emulsión en cocción y congelación",
          "Mejor cohesión y rebanabilidad en piezas frías",
          "Menor separación de fases grasas y acuosas"
        ]
      },
      {
        title: "Protección & Conservación de Lote",
        description: "Sistemas antimicrobianos y antioxidantes que protegen la frescura, el color, el sabor y la calidad microbiológica.",
        points: [
          "Extensión tangible de vida útil en anaquel",
          "Protección activa frente al deterioro microbiano",
          "Control de oxidación lipídica y cambio de color",
          "Apariencia fresca y natural durante la exhibición"
        ]
      },
      {
        title: "Clean Label & Reemplazadores de Carne",
        description: "Alternativas de origen natural para etiquetas claras y sistemas que permiten ajustar el contenido cárnico conservando mordida y sabor.",
        points: [
          "Formulaciones con ingredientes de origen vegetal identificable",
          "Sistemas sustitutos o extensores de carne para balance de costos",
          "Ligantes para matrices complejas de pollo, cerdo y res"
        ]
      }
    ],
    applications: [
      "Salchichas y embutidos emulsionados",
      "Jamones cocidos y curados",
      "Nuggets y productos apanados de pollo",
      "Hamburguesas y carnes formadas",
      "Marinación e inyección de cortes frescos"
    ],
    brandAssociations: ["WBS", "Wenda Phos", "WMR", "Safe Plate", "NatureBinde", "Koolgel", "FreshGuard"]
  },
  {
    id: "bakery",
    title: "Bakery & Panificación",
    subtitle: "Ciencia para más volumen - más frescura - valor en cada horneado",
    tagline: "Ingredientes y soluciones funcionales diseñados para optimizar textura, volumen, suavidad, frescura y vida útil.",
    image: "/images/bakery/artisan-bread-crumb.jpg",
    badge: "Alto Crecimiento",
    colorTheme: "amber",
    highlights: [
      "Migas más suaves, uniformes y aireadas",
      "Mayor volumen y retención prolongada de humedad",
      "Mayor tolerancia de masa ante fluctuaciones de fermentación",
      "Desempeño confiable bajo congelación (bake-off)",
      "Panificados enriquecidos con proteína sin perder sabor"
    ],
    pillars: [
      {
        title: "Texturas diseñadas para conquistar",
        description: "Desarrollo de la textura adecuada para cada formato de panificación, conservando esponjosidad durante toda la vida comercial.",
        points: [
          "Estructura alveolar óptima y migas resilientes",
          "Suavidad prolongada que evita el endurecimiento prematuro",
          "Experiencias sensoriales adaptadas a cada consumidor"
        ]
      },
      {
        title: "Protección con extensión de vida útil",
        description: "Tecnologías para controlar el crecimiento de mohos y levaduras sin alterar el perfil de aroma y sabor tradicional.",
        points: [
          "Sistemas naturales y ácido sórbico encapsulado",
          "Protección frente al envejecimiento retrogradante del almidón",
          "Menor merma en punto de venta y distribución a larga distancia"
        ]
      },
      {
        title: "Desempeño confiable bajo congelación",
        description: "Sistemas para proteger la estructura, la fermentación y la calidad final de masas congeladas y bake-off.",
        points: [
          "Protección de las levaduras ante estrés térmico",
          "Mayor estabilidad durante ciclos de descongelación",
          "Excelente salto de horno tras meses de almacenamiento congelado"
        ]
      },
      {
        title: "Colorantes y Enriquecimiento Nutricional",
        description: "Colores naturales vivos resistentes al horneado y sistemas para aportar proteína vegetal manteniendo la masticabilidad.",
        points: [
          "Dosificación eficiente y reproducción uniforme lote a lote",
          "Mayor aporte proteico sin textura arenosa",
          "Formulaciones Clean Label sin conservadores sintéticos"
        ]
      }
    ],
    applications: [
      "Pan de caja y molde",
      "Bollería y pan dulce",
      "Galletas y crackers",
      "Tortillas de trigo y productos planos",
      "Masas congeladas y productos bake-off",
      "Líneas libres de gluten y proteicas"
    ]
  },
  {
    id: "supplements",
    title: "Suplementos & Bienestar",
    subtitle: "Innovación que potencia el bienestar integral",
    tagline: "Pureza que puede demostrarse - Desempeño que puede formularse.",
    image: "/images/supplements/nutraceutical-capsules.jpg",
    badge: "Nutrición Funcional",
    colorTheme: "green",
    highlights: [
      "Aminoácidos instantizados de alta solubilidad",
      "Vitaminas y carotenoides dispersables en agua",
      "Extractos botánicos estandarizados y nutracéuticos de precisión",
      "Excelente homogeneidad en polvos para batidos y sticks",
      "Control estricto de metales pesados y microbiología"
    ],
    pillars: [
      {
        title: "Una buena fórmula comienza con ingredientes confiables",
        description: "Materias primas consistentes con especificaciones claras para responder a los requisitos técnicos y regulatorios de cada proyecto.",
        points: [
          "Pureza documentada con Certificado de Análisis (CoA)",
          "Estabilidad química y microbiológica en vida de anaquel",
          "Trazabilidad completa desde el origen",
          "Versatilidad para tabletas, cápsulas y bebidas en polvo"
        ]
      },
      {
        title: "Activos Funcionales y Nutracéuticos",
        description: "Propuestas diferenciadas alrededor de las tendencias actuales de salud, longevidad y nutrición deportiva.",
        points: [
          "Rendimiento físico y recuperación muscular",
          "Salud articular y ósea",
          "Belleza desde la nutrición (antioxidantes y péptidos)",
          "Energía celular y metabolismo activo"
        ]
      },
      {
        title: "Tecnologías de Dispersión Avanzada",
        description: "Microencapsulación y tratamientos de superficie para solubilidad inmediata en agua fría.",
        points: [
          "Humectación instantánea sin grumos ni sedimentación",
          "Sistemas adaptados a sachets, gominolas y polvos listos para mezclar",
          "Sabor neutro que facilita el perfilado organoléptico"
        ]
      }
    ],
    applications: [
      "Proteínas en polvo y blends deportivos",
      "Bebidas funcionales y pre-entrenos",
      "Cápsulas y comprimidos nutracéuticos",
      "Gummies funcionales y shots energéticos"
    ]
  },
  {
    id: "from-nature",
    title: "From Nature - Colores Naturales",
    subtitle: "La paleta cromática de la naturaleza para alimentos vibrantes",
    tagline: "Tonos amarillos, naranjas, rojos, rosas, morados, verdes y azules con máxima estabilidad.",
    image: "/images/nature/spices-vibrant-colors.jpg",
    badge: "Clean Label Color",
    colorTheme: "purple",
    highlights: [
      "Concentrados 100% de origen vegetal identificable",
      "Alta resistencia a tratamientos térmicos, horneado y luz UV",
      "Formatos microfinos y dispersables en agua o lípidos",
      "Reemplazo total de colorantes artificiales (FD&C)",
      "Poder tintóreo controlado y reproducible entre lotes"
    ],
    pillars: [
      {
        title: "Alto Desempeño y Tolerancia Térmica",
        description: "Pigmentos microfinos formulados para soportar pasteurización, horneado y extrusión sin perder tonalidad.",
        points: [
          "Sistemas dispersables en fases acuosas y matrices secas",
          "Estrategias antioxidantes para evitar la degradación por luz",
          "Selección ajustada al pH final del alimento"
        ]
      },
      {
        title: "Dispersión Adaptada a Cada Matriz",
        description: "Soluciones a medida para evitar la migración de color en embutidos, glaseados, bebidas o botanas.",
        points: [
          "Dosificación controlada y costo por uso competitivo",
          "Compatibilidad con etiquetas limpias y sellos de advertencia reducidos",
          "Suministro garantizado de fuentes agrícolas seleccionadas"
        ]
      }
    ],
    applications: [
      "Cárnicos y embutidos con curado natural",
      "Panadería, galletas y coberturas dulces",
      "Bebidas saborizadas y jugos",
      "Confitería, gomitas y postres lácteos"
    ]
  },
  {
    id: "tecnologia",
    title: "Tecnología Cárnica: VICEL & RIBON",
    subtitle: "Casings de celulosa de alta velocidad y maquinaria industrial",
    tagline: "Integramos insumos de empaque de alta velocidad y tecnología especializada para procesos más rentables y automatizados.",
    image: "/images/tech/automation-line.jpg",
    badge: "Ingeniería de Procesos",
    colorTheme: "cyan",
    highlights: [
      "Tripas de celulosa VICEL: calibre uniforme y pelado ultra rápido",
      "Maquinaria RIBON: hornos, tumblers, inyectores y líneas de sacrificio",
      "Permeabilidad perfecta al humo y aroma",
      "Compatibilidad total con embutidoras de alta velocidad",
      "Soporte de ingeniería y servicio técnico en planta"
    ],
    pillars: [
      {
        title: "VICEL - Tripas de Celulosa para Alta Velocidad",
        description: "Wenda Ingredients es socio comercial de VICEL, ofreciendo tripas biodegradables fabricadas con celulosa natural de madera y línter de algodón.",
        points: [
          "Espesor uniforme y alta resistencia a la abrasión",
          "Permeabilidad al aire y vapor de agua para ahumado perfecto",
          "Fácil pelado sin mermas de carne adherida",
          "Uso directo desde el empaque sin necesidad de remojo previo",
          "Variantes: transparente, tonos ahumados, cereza, naranja, con franjas de identificación e impresión personalizada"
        ]
      },
      {
        title: "RIBON - Maquinaria para Plantas Procesadoras",
        description: "Equipos individuales o líneas completas adaptadas a la capacidad productiva de cada planta cárnica.",
        points: [
          "Hornos de cocción y ahumado industrial con generadores de humo",
          "Tumblers de masaje al vacío e inyectores continuos de salmuera",
          "Líneas de sacrificio, corte y deshuese automatizado",
          "Equipos de higiene, esterilización y lavadoras de cajas industriales"
        ]
      }
    ],
    applications: [
      "Salchichas tipo Viena y Hot Dogs",
      "Salchichas de ave y vegetarianas",
      "Embutidos de pequeño calibre sin piel",
      "Plantas industriales de cocción y empaque continuo"
    ]
  }
];

export const NATURAL_COLORS: NaturalColorItem[] = [
  {
    name: "Polvo de remolacha roja",
    source: "Remolacha roja",
    tone: "Rojo rubí / Magenta",
    hex: "#9F1239",
    textColor: "#ffffff",
    application: "Cárnicos curados, yogures, coberturas"
  },
  {
    name: "Extracto de hibisco",
    source: "Flor de hibisco",
    tone: "Rosa brillante / Borgoña",
    hex: "#BE123C",
    textColor: "#ffffff",
    application: "Bebidas, gomitas, jaleas"
  },
  {
    name: "Polvo de rábano rojo",
    source: "Rábano rojo",
    tone: "Rojo escarlata intenso",
    hex: "#DC2626",
    textColor: "#ffffff",
    application: "Embutidos, salsas, panificados"
  },
  {
    name: "Extracto de rosa",
    source: "Pétalos de rosa",
    tone: "Rosa pastel elegante",
    hex: "#FB7185",
    textColor: "#0f172a",
    application: "Repostería fina, helados, bebidas"
  },
  {
    name: "Camote morado",
    source: "Camote morado",
    tone: "Púrpura profundo / Violeta",
    hex: "#7E22CE",
    textColor: "#ffffff",
    application: "Snacks, galletas, rellenos de panadería"
  },
  {
    name: "Azul de gardenia",
    source: "Gardenia jasminoides Ellis",
    tone: "Azul cielo vibrante",
    hex: "#0284C7",
    textColor: "#ffffff",
    application: "Bebidas isotónicas, confitería, heladería"
  },
  {
    name: "Polvo de espirulina (Estándar & Superfino)",
    source: "Alga Arthrospira platensis",
    tone: "Azul zafiro & Verde océano",
    hex: "#0F766E",
    textColor: "#ffffff",
    application: "Suplementos en polvo, batidos, coberturas"
  },
  {
    name: "Amarillo de gardenia",
    source: "Gardenia jasminoides Ellis",
    tone: "Amarillo luminoso limpio",
    hex: "#EAB308",
    textColor: "#0f172a",
    application: "Fideos, productos horneados, cremas"
  },
  {
    name: "Cúrcuma concentrada",
    source: "Curcuma longa",
    tone: "Amarillo dorado cálido",
    hex: "#CA8A04",
    textColor: "#ffffff",
    application: "Mostazas, aderezos, pan de hamburguesa"
  },
  {
    name: "Extracto de espino amarillo",
    source: "Fruto de espino amarillo",
    tone: "Naranja mandarino cálido",
    hex: "#EA580C",
    textColor: "#ffffff",
    application: "Jugos cítricos, confitería, cereales"
  },
  {
    name: "Betacaroteno natural",
    source: "Frutas y vegetales seleccionados",
    tone: "Naranja radiante / Dorado",
    hex: "#F97316",
    textColor: "#ffffff",
    application: "Margarinas, pastas, bebidas refrescantes"
  }
];

export const BRANDS: BrandItem[] = [
  {
    name: "WBS",
    claim: "Conectores de proteínas de transglutaminasa libre de alérgenos",
    description: "Sistema enzimático diseñado como alternativa para reducir o sustituir fosfatos, favoreciendo la retención de humedad, la jugosidad y la estabilidad de la emulsión.",
    category: "Cárnicos & Proteínas",
    tag: "Clean Label",
    image: "/images/meat/charcuterie-board.jpg",
    features: ["Libre de alérgenos", "Reduce fosfatos", "Mayor retención hídrica"]
  },
  {
    name: "Wenda Phos",
    claim: "Mezclas de fosfatos y tripolifosfatos de alta pureza",
    description: "Diseñadas para jamones, embutidos, salmueras de inyección y productos emulsionados. Gran solubilidad y tolerancia a la sal con estabilización óptima del pH.",
    category: "Funcionales Esenciales",
    tag: "Alta Pureza",
    image: "/images/meat/fresh-cuts.jpg",
    features: ["Alta solubilidad en frío", "Control de sinéresis", "Excelente firmeza al corte"]
  },
  {
    name: "WMR",
    claim: "Sistemas funcionales a base de proteína para sustitución cárnica",
    description: "Permiten optimizar el contenido cárnico manteniendo mordida, textura y jugosidad, favoreciendo la emulsificación de grasa y retención de líquidos.",
    category: "Optimización de Costos",
    tag: "Rendimiento",
    image: "/images/meat/roasted-meat.jpg",
    features: ["Sustitución controlada", "Mejora de masticabilidad", "Estabilidad térmica"]
  },
  {
    name: "Safe Plate",
    claim: "Conservadores y antioxidantes de origen natural",
    description: "Soluciones Clean Label formuladas con vinagre tamponado, vitamina C y extracto de romero desodorizado para extender vida útil sin notas ácidas indeseadas.",
    category: "Bioprotección Natural",
    tag: "Etiqueta Limpia",
    image: "/images/nature/botanical-extract-herbs.jpg",
    features: ["Vinagre tamponado", "Extracto de romero", "Cero sabores residuales"]
  },
  {
    name: "SoyPura",
    claim: "Proteínas de soya versátiles (70% - 90%)",
    description: "Concentrados y aislados proteicos de alta solubilidad que favorecen la emulsificación, retención de humedad y estructuración de matrices cárnicas y panaderas.",
    category: "Proteínas Vegetales",
    tag: "Nutrición",
    image: "/images/supplements/protein-powder.jpg",
    features: ["Concentraciones 70%-90%", "Gran capacidad de gel", "Estabilidad en congelación"]
  },
  {
    name: "NatureBinde",
    claim: "Solución natural alternativa a fosfatos",
    description: "Mejora el rendimiento, la jugosidad y suavidad manteniendo la estructura natural de la carne, con alta capacidad amortiguadora para brindar máxima estabilidad al proceso.",
    category: "Fosfato Alternativo",
    tag: "100% Natural",
    image: "/images/nature/colorful-vegetables.jpg",
    features: ["Alternativa a fosfatos", "Potenciador de humedad", "Alta capacidad buffer"]
  },
  {
    name: "Koolgel",
    claim: "Sistemas hidrocoloides y carragenina kappa de alta capacidad",
    description: "Formulado con fibras vegetales y carrageninas de grado alimentario para optimizar la elasticidad, rebanabilidad y resistencia en ciclos de congelación/descongelación.",
    category: "Hidrocoloides",
    tag: "Elasticidad",
    image: "/images/meat/sausages-charcuterie.jpg",
    features: ["Carragenina kappa purificada", "Cero purga al corte", "Resistente a descongelado"]
  },
  {
    name: "FreshGuard",
    claim: "Sistemas de bioprotección contra microorganismos patógenos",
    description: "Control de Listeria y flora alterante que prolonga la frescura comercial y preserva el color, jugosidad y textura en aplicaciones directas o de superficie.",
    category: "Inocuidad Alimentaria",
    tag: "Seguridad",
    image: "/images/supplements/clean-science-research.jpg",
    features: ["Control de Listeria monocytogenes", "Prolonga vida de anaquel", "Protege color fresco"]
  }
];

export const INDENT_INDUSTRIES: IndentIndustry[] = [
  {
    id: "carnicos",
    name: "Cárnicos",
    description: "Ingredientes y soluciones para formulación, conservación, textura, rendimiento y procesamiento cárnico.",
    iconName: "Beef",
    image: "/images/meat/meat-texture.jpg",
    items: [
      "Antioxidantes y conservadores naturales",
      "Proteínas de soya, chícharo y arroz",
      "Estabilizantes y espesantes funcionales",
      "Fosfatos simples y complejos",
      "Potenciadores de sabor y notas umami",
      "Fibras dietéticas solubles e insolubles",
      "Reguladores de color y curado",
      "Dextrosas y maltodextrinas de precisión",
      "Tripas de celulosa VICEL"
    ]
  },
  {
    id: "panificacion",
    name: "Panificación",
    description: "Ingredientes para conservación, fermentación, textura, fortificación y desarrollo de productos horneados.",
    iconName: "Wheat",
    image: "/images/bakery/croissants-pastry.jpg",
    items: [
      "Conservadores y ácido sórbico encapsulado",
      "Sistemas naturales para control de mohos y levaduras",
      "Fosfatos para leudado químico balanceado",
      "Estabilizantes y acondicionadores de masa",
      "Fibras de avena, trigo y manzana",
      "Acidulantes y reguladores de pH",
      "Edulcorantes de alta intensidad",
      "Emulsificantes (SSL, DATEM, lecitinas)",
      "Vitaminas y minerales para fortificación",
      "Sabores y colores termoestables"
    ]
  },
  {
    id: "bebidas",
    name: "Bebidas",
    description: "Ingredientes para ajustar sabor, acidez, estabilidad coloidal, contenido nutricional y vida útil en bebidas.",
    iconName: "GlassWater",
    image: "/images/hero/biotech-research.jpg",
    items: [
      "Edulcorantes naturales y no calóricos",
      "Acidulantes (ácido cítrico, málico, fumárico)",
      "Fibras prebióticas transparentes",
      "Antioxidantes hidrosolubles y conservadores",
      "Fosfatos para isotónicas y leches saborizadas",
      "Proteínas claras dispersables en frío",
      "Estabilizantes y agentes de turbidez",
      "Colores naturales con brillo cristalino",
      "Ingredientes de carga y soporte"
    ]
  },
  {
    id: "lacteos",
    name: "Lácteos",
    description: "Soluciones para emulsión, gelificación, estabilización, conservación y formulación de quesos, yogures y cremas.",
    iconName: "Milk",
    image: "/images/supplements/protein-powder.jpg",
    items: [
      "Emulsificantes para quesos análogos y fundidos",
      "Edulcorantes y moduladores de dulzor",
      "Acidulantes lácticos y cítricos",
      "Fosfatos emulsionantes para derivados lácteos",
      "Estabilizantes para yogur batido y griego",
      "Antioxidantes y conservadores antifúngicos",
      "Proteínas de suero (WPC, WPI) y caseínas",
      "Fibras para textura cremosa baja en grasa",
      "Sabores y colorantes lácteos naturales"
    ]
  },
  {
    id: "nutraceuticos",
    name: "Nutracéuticos & Suplementos",
    description: "Ingredientes para suplementos alimenticios, bebidas funcionales y productos de nutrición deportiva especializada.",
    iconName: "Pill",
    image: "/images/supplements/nutraceutical-capsules.jpg",
    items: [
      "Aminoácidos puros (BCAA, glutamina, creatina)",
      "Vitaminas hidrosolubles y liposolubles",
      "Minerales quelados de alta biodisponibilidad",
      "Extractos botánicos estandarizados por HPLC",
      "Ingredientes nutracéuticos para longevidad",
      "Aceites en polvo microencapsulados (MCT, Omega-3)",
      "Carotenoides antioxidantes (astaxantina, luteína)",
      "Proteínas de chícharo, arroz y cáñamo"
    ]
  },
  {
    id: "soluciones-industriales",
    name: "Soluciones Industriales",
    description: "Materias primas y químicos especializados para procesos industriales de alta exigencia técnica.",
    iconName: "Factory",
    image: "/images/tech/industrial-facility.jpg",
    items: [
      "Tratamiento de agua: desinfectantes, biocidas, floculantes y coagulantes",
      "Industria de ceras: parafinas, ceras microcristalinas y Fischer-Tropsch",
      "Construcción: aditivos para concreto, reductores de agua y lignosulfonatos",
      "Adhesivos y recubrimientos: alcohol polivinílico (PVA) y resinas",
      "Minería: reactivos de flotación y modificadores de tensión superficial",
      "Cosméticos y detergentes: tensoactivos suaves y modificadores reológicos",
      "Empaque: películas de celulosa compostables y biodegradables"
    ]
  }
];

export const INDENT_PROCESS_STEPS = [
  {
    step: "01",
    title: "Entendemos tu necesidad",
    description: "Analizamos tu formulación, restricciones de costo, perfil sensorial y objetivos comerciales específicos."
  },
  {
    step: "02",
    title: "Identificamos la solución",
    description: "Seleccionamos la mejor alternativa entre nuestra red internacional de plantas y centros de I+D."
  },
  {
    step: "03",
    title: "Validamos producto y proveedor",
    description: "Auditoría documental estricta, certificados de análisis (CoA), pruebas piloto y confirmación de estándares internacionales."
  },
  {
    step: "04",
    title: "Coordinamos los suministros",
    description: "Gestión aduanal, logística multimodal y almacenamiento seguro para garantizar entregas puntuales."
  },
  {
    step: "05",
    title: "Damos seguimiento continuo",
    description: "Acompañamiento en el escalamiento industrial en tu planta con soporte de nuestros ingenieros especialistas."
  }
];
