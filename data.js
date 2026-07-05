// data.js — todos los datos educativos de GranoZero

// ─── TUESTE ───────────────────────────────────────────────────────────────────
const TUESTES = [
  {
    id: "verde",
    nivel: 0,
    name: "Verde",
    italic: "sin tostar",
    temp: "ambiente",
    time: "—",
    color: "#7a8a3e",
    filter: "brightness(1.4) saturate(0.6) hue-rotate(40deg)",
    notas: ["Herbal", "Vegetal", "Heno"],
    desc: "El grano antes del tueste. Verde grisáceo, denso, sin aroma a café. Acá empieza todo."
  },
  {
    id: "claro",
    nivel: 1,
    name: "Claro",
    italic: "light roast",
    temp: "196–205°C",
    time: "8–9 min",
    color: "#9C6E3F",
    filter: "brightness(1.25) saturate(1.1) sepia(0.15)",
    notas: ["Floral", "Cítrico", "Frutal"],
    desc: "Tueste corto. El grano todavía guarda la acidez y los aromas del origen. Notas brillantes y delicadas."
  },
  {
    id: "medio",
    nivel: 2,
    name: "Medio",
    italic: "medium roast",
    temp: "210–219°C",
    time: "10–11 min",
    color: "#5C3A1F",
    filter: "brightness(1) saturate(1)",
    notas: ["Caramelo", "Nuez", "Manzana"],
    desc: "El punto de equilibrio. Acidez y cuerpo conviven. Es el tueste preferido para filtrados y especialidad."
  },
  {
    id: "medio-oscuro",
    nivel: 3,
    name: "Medio-Oscuro",
    italic: "full city",
    temp: "225–230°C",
    time: "12 min",
    color: "#3A2418",
    filter: "brightness(0.82) saturate(1.15) hue-rotate(-5deg)",
    notas: ["Chocolate", "Especias", "Almendra"],
    desc: "Aparece la primera oleosidad en la superficie. Sabor más redondo, dulzor pronunciado, menos acidez."
  },
  {
    id: "oscuro",
    nivel: 4,
    name: "Oscuro",
    italic: "italian roast",
    temp: "240°C+",
    time: "13–14 min",
    color: "#1F1410",
    filter: "brightness(0.55) saturate(1.3) contrast(1.1) hue-rotate(-10deg)",
    notas: ["Tabaco", "Cacao amargo", "Humo"],
    desc: "Aceitoso, oscuro, intenso. El café del espresso italiano clásico. El origen del grano queda atrás."
  }
];

// ─── ORÍGENES ────────────────────────────────────────────────────────────────
// Datos: cx, cy en coordenadas del viewBox 1000x500 (calibradas para world map estilizado)
const ORIGENES = [
  {
    id: "etiopia",
    name: "Etiopía",
    cont: "África oriental",
    cx: 575, cy: 260,
    altitud: "1500–2200 m",
    notas: ["Jazmín", "Bergamota", "Durazno"],
    desc: "La cuna del café. Aromas florales y cítricos, acidez vibrante. Yirgacheffe y Sidamo son los nombres más famosos."
  },
  {
    id: "kenia",
    name: "Kenia",
    cont: "África oriental",
    cx: 588, cy: 290,
    altitud: "1400–2100 m",
    notas: ["Grosella", "Tomate", "Vino"],
    desc: "Acidez brillante y compleja. El típico SL28/SL34 keniano es uno de los cafés más coleccionados del mundo."
  },
  {
    id: "yemen",
    name: "Yemen",
    cont: "Península Arábiga",
    cx: 615, cy: 240,
    altitud: "1500–2400 m",
    notas: ["Especias", "Pasas", "Chocolate"],
    desc: "Cultivado durante siglos. Café denso, salvaje, casi a vino. La palabra 'mocha' viene de su puerto."
  },
  {
    id: "colombia",
    name: "Colombia",
    cont: "Sudamérica",
    cx: 265, cy: 270,
    altitud: "1200–2000 m",
    notas: ["Caramelo", "Manzana roja", "Nuez"],
    desc: "El café 'redondo' por excelencia. Equilibrado, dulce, accesible. Cosecha dos veces al año."
  },
  {
    id: "brasil",
    name: "Brasil",
    cont: "Sudamérica",
    cx: 320, cy: 320,
    altitud: "600–1200 m",
    notas: ["Chocolate", "Maní", "Almendra"],
    desc: "El productor #1 del mundo. Acidez baja, dulzor pronunciado, base de muchos blends de espresso."
  },
  {
    id: "guatemala",
    name: "Guatemala",
    cont: "Centroamérica",
    cx: 210, cy: 240,
    altitud: "1300–2000 m",
    notas: ["Cacao", "Naranja", "Toffee"],
    desc: "Volcánico, intenso, equilibrado. Antigua y Huehuetenango son referencias mundiales del cuerpo cremoso."
  },
  {
    id: "vietnam",
    name: "Vietnam",
    cont: "Sudeste asiático",
    cx: 790, cy: 270,
    altitud: "500–1200 m",
    notas: ["Madera", "Cacao oscuro", "Tierra"],
    desc: "Productor #2 del mundo, principalmente Robusta. Cuerpo gigante, intenso, perfecto para cafés con leche."
  },
  {
    id: "indonesia",
    name: "Indonesia",
    cont: "Sudeste asiático",
    cx: 820, cy: 320,
    altitud: "900–1700 m",
    notas: ["Tierra", "Tabaco", "Hongo"],
    desc: "Sumatra y Java. Proceso húmedo único que da cuerpo enorme y notas terrosas, casi minerales."
  }
];

// ─── GRANOS (ARÁBICA vs ROBUSTA) ─────────────────────────────────────────────
const GRANOS = [
  {
    id: "arabica",
    name: "Arábica",
    italic: "la fina",
    porcentaje: "60% del mundo",
    altitud: "900–2200 m",
    cafeina: "0.8–1.4%",
    forma: "Ovalado, surco curvo",
    perfil: ["Acidez alta", "Dulzor suave", "Aromas complejos"],
    desc: "El grano de café especialidad. Más delicado, más caro de cultivar, requiere altura. Casi todo lo que tomás en cafetería de especialidad es Arábica."
  },
  {
    id: "robusta",
    name: "Robusta",
    italic: "la fuerte",
    porcentaje: "40% del mundo",
    altitud: "0–800 m",
    cafeina: "1.7–4%",
    forma: "Redondo, surco recto",
    perfil: ["Cuerpo gigante", "Amargor pronunciado", "Notas a madera"],
    desc: "Más resistente, más cafeína, más cuerpo. Base de blends italianos para espresso porque da la crema gruesa característica."
  }
];

// ─── MOLIENDA ────────────────────────────────────────────────────────────────
const MOLIENDAS = [
  {
    id: "extra-gruesa",
    name: "Extra Gruesa",
    italic: "cold brew",
    size: "1100 μm",
    referencia: "Pimienta gruesa",
    metodo: "Cold brew, infusión 12h+",
    dots: { count: 8, size: 22 }
  },
  {
    id: "gruesa",
    name: "Gruesa",
    italic: "french press",
    size: "900 μm",
    referencia: "Sal marina",
    metodo: "Prensa francesa, percolador",
    dots: { count: 14, size: 17 }
  },
  {
    id: "media",
    name: "Media",
    italic: "drip",
    size: "650 μm",
    referencia: "Arena de playa",
    metodo: "Chemex, V60, goteo",
    dots: { count: 24, size: 12 }
  },
  {
    id: "media-fina",
    name: "Media-Fina",
    italic: "aeropress",
    size: "450 μm",
    referencia: "Azúcar fina",
    metodo: "AeroPress, sifón",
    dots: { count: 38, size: 9 }
  },
  {
    id: "fina",
    name: "Fina",
    italic: "espresso",
    size: "250 μm",
    referencia: "Sal fina de mesa",
    metodo: "Espresso, moka",
    dots: { count: 64, size: 6 }
  },
  {
    id: "extra-fina",
    name: "Extra Fina",
    italic: "turca",
    size: "100 μm",
    referencia: "Harina",
    metodo: "Café turco, ibrik",
    dots: { count: 110, size: 4 }
  }
];

// ─── MÉTODOS DE EXTRACCIÓN ───────────────────────────────────────────────────
const METODOS = [
  {
    id: "espresso",
    name: "Espresso",
    italic: "máquina italiana",
    time: "25–30 s",
    ratio: "1:2",
    presion: "9 bar",
    temp: "92–94°C",
    grind: "Fina",
    yield: "Cuerpo + crema",
    desc: "Agua caliente forzada bajo presión a través de café molido fino. La extracción más intensa y más rápida.",
    icono: "espresso"
  },
  {
    id: "v60",
    name: "V60",
    italic: "el clásico",
    time: "3 min",
    ratio: "1:16",
    presion: "—",
    temp: "92–96°C",
    grind: "Media",
    yield: "Claridad + acidez",
    desc: "El método japonés. Filtrado por gravedad sobre cono de papel. Resalta la complejidad y los matices del origen.",
    icono: "v60"
  },
  {
    id: "aeropress",
    name: "AeroPress",
    italic: "la versátil",
    time: "1–2 min",
    ratio: "1:13",
    presion: "Manual suave",
    temp: "85–92°C",
    grind: "Media-fina",
    yield: "Limpio + dulce",
    desc: "Pistón que empuja agua a través del café. Rápida, perdona errores, y se exprimen sabores limpios y dulces.",
    icono: "aeropress"
  },
  {
    id: "french-press",
    name: "Prensa Francesa",
    italic: "la robusta",
    time: "4 min",
    ratio: "1:15",
    presion: "—",
    temp: "92–96°C",
    grind: "Gruesa",
    yield: "Cuerpo + textura",
    desc: "Inmersión total. El café se infusiona en agua caliente y se separa con un filtro de malla. Conserva todos los aceites.",
    icono: "french"
  },
  {
    id: "moka",
    name: "Moka",
    italic: "la nona",
    time: "5 min",
    ratio: "1:7",
    presion: "1.5 bar",
    temp: "100°C+",
    grind: "Fina",
    yield: "Concentrado + nostálgico",
    desc: "Cafetera italiana clásica. Agua que sube por presión de vapor desde la cámara inferior. Café denso, casi espresso.",
    icono: "moka"
  }
];

// ─── GLOSARIO ────────────────────────────────────────────────────────────────
const GLOSARIO = [
  { letra: "A", term: "Acidez", def: "Sensación vibrante en el paladar. No es ácido como un limón, es brillo. Indica frescura y origen." },
  { letra: "B", term: "Body / Cuerpo", def: "El peso del café en la boca. Va de acuoso (té) a denso (chocolate caliente)." },
  { letra: "B", term: "Blend", def: "Mezcla de granos de distintos orígenes. Busca consistencia y equilibrio." },
  { letra: "C", term: "Crema", def: "Capa dorada y espumosa arriba del espresso. Hecha de aceites emulsionados, dura 2 minutos." },
  { letra: "C", term: "Cupping", def: "Cata profesional: probás 5+ muestras del mismo origen para evaluar acidez, cuerpo, aroma." },
  { letra: "D", term: "Dosis", def: "Cantidad de café molido para una preparación. En espresso, 18 g es estándar." },
  { letra: "E", term: "Extracción", def: "Acto de transferir aromas, sabores y aceites del grano al agua. Sobre-extraído = amargo, sub = ácido." },
  { letra: "F", term: "Filtro", def: "Papel, metal o tela que separa el café del agua. Cada uno tiene textura y aceites diferentes." },
  { letra: "M", term: "Microespuma", def: "Espuma de leche con burbujas microscópicas. Brilla, fluye como pintura. Necesaria para latte art." },
  { letra: "M", term: "Molienda", def: "Tamaño de las partículas de café. Cada método pide una molienda distinta." },
  { letra: "O", term: "Origen único", def: "Café de una sola región/finca. Opuesto al blend. Resalta la personalidad del lugar." },
  { letra: "P", term: "Proceso", def: "Cómo se separa el grano de la cereza. Lavado, natural, honey — cada uno cambia el sabor final." },
  { letra: "R", term: "Ratio", def: "Proporción café:agua. Espresso 1:2, V60 1:16. Cambia intensidad y carácter." },
  { letra: "T", term: "Tueste", def: "Calentar el grano verde hasta liberar aromas. Más tueste = más amargor, menos acidez." },
  { letra: "T", term: "TDS", def: "Total Dissolved Solids. Concentración real del café extraído. Medible con refractómetro." },
  { letra: "V", term: "Vaporizar", def: "Calentar leche con vapor a presión, creando microespuma sedosa." }
];

// ─── DIARIO (los 8 cafés se reusan; archivamos progreso aparte) ──────────────

window.TUESTES = TUESTES;
window.ORIGENES = ORIGENES;
window.GRANOS = GRANOS;
window.MOLIENDAS = MOLIENDAS;
window.METODOS = METODOS;
window.GLOSARIO = GLOSARIO;
