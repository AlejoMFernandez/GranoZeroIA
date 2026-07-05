# GranoZero ☕

> Una PWA educativa sobre café. Del origen al sorbo, sin vocabulario críptico.

GranoZero es un sitio web instalable (Progressive Web App) hecho con la idea de que aprender de café no debería intimidar. Te lleva por **10 secciones gráficas e interactivas** que te enseñan desde de dónde viene el grano hasta cómo se prepara cada bebida — y vas guardando tu progreso en un carnet personal de aprendiz.

## ✨ Características

- **10 secciones educativas** completamente gráficas, sin paredes de texto
- **Animaciones e ilustraciones SVG** propias para cada concepto
- **Sonidos sintetizados** con Web Audio (sin assets externos): clicks, burbujeo, molinillo, ambiente cafetería
- **Persistencia local** del progreso (localStorage) — sin cuentas ni servidores
- **Instalable como app** (PWA) en móvil y desktop
- **Funciona offline** (service worker con cache estratégico)
- **Responsive** — diseñada para mobile-first pero hermosa en desktop

## 📚 Las 10 secciones

| # | Sección | De qué se trata |
|---|---|---|
| **00** | Inicio | Hero con taza humeante CSS/SVG, granos respirando, marquee de cafés |
| **01** | Origen | Mapa del cinturón cafetero con 8 países productores, banda dorada del trópico, granos cayendo |
| **02** | El Grano | Arábica vs Robusta side-by-side + anatomía exploded del fruto al grano (6 ilustraciones SVG) |
| **03** | Tueste | Slider de 5 niveles — el grano cambia de color con CSS filters + notas dinámicas |
| **04** | Molienda | 6 cards con "campos de partículas" del más grueso al más fino |
| **05** | Métodos | 5 láminas técnicas estilo manual antiguo (Espresso, V60, AeroPress, French, Moka) con SVGs animados al click |
| **06** | Catálogo | 8 cafés con ilustraciones SVG únicas + sheet de detalle (intensidad, notas, receta) |
| **07** | Cata | Quiz de 4 preguntas → algoritmo de afinidad → resultado dramático con animación |
| **08** | Glosario | Diccionario editorial con 16 términos, búsqueda en vivo, índice A-Z |
| **09** | Diario | **Carnet de aprendiz** con ID único + sellos postales por cada café probado |

## 🏗️ Arquitectura

Es una PWA **sin build step**. React se carga vía CDN, los `.jsx` se transpilan en el browser con Babel inline. Pensada para que la puedas editar directamente en VS Code y refrescar el browser para ver cambios.

### Estructura de archivos

```
GranoZero/
├── index.html              # Entry point + tokens CSS + estilos del home/header/footer
├── sections.css            # Estilos de todas las secciones (Origen, Grano, Tueste, etc)
├── manifest.json           # PWA manifest (instalable)
├── sw.js                   # Service worker (offline + cache)
│
├── app.jsx                 # Root React app: splash, header, home, footer, Tweaks
├── sections.jsx            # 8 secciones nuevas (Origen, Grano, Tueste, Molienda, Métodos, Cata, Glosario, Diario)
├── dock.jsx                # Dock de navegación lateral con scroll-spy
├── cafe-svgs.jsx           # 8 ilustraciones SVG únicas por café
├── bean.jsx                # Componentes <Bean>, <IntensityBeans>, <Steam>
├── sounds.jsx              # Sistema de sonido (Web Audio sintetizado)
├── tweaks-panel.jsx        # Panel de tweaks (colores, audio, animación)
│
├── cafes.js                # Datos de los 8 cafés (intensidad, notas, recetas)
├── data.js                 # Datos del resto: tuestes, orígenes, granos, moliendas, métodos, glosario
│
├── assets/
│   ├── bean.png            # Logo del grano (extraído de la marca)
│   ├── logo-full.png       # Wordmark completo
│   ├── icon-*.png          # Iconos PWA (192, 512, maskable)
│   ├── favicon-32.png
│   ├── apple-touch-icon.png
│   └── cafes/
│       └── espresso.png    # (espacio para fotos de cafés)
│
├── PROMPTS-IMAGENES.md     # Prompts para generar fotos de los 8 cafés
└── README.md               # Este archivo
```

## 🚀 Cómo correrlo

Necesitás servir los archivos desde un servidor estático (los `import` y el service worker no funcionan abriendo el HTML como `file://`).

### Opción 1: Python (sin instalar nada en Mac/Linux)

```bash
cd GranoZero
python3 -m http.server 8000
```

Abrí http://localhost:8000

### Opción 2: Node — `npx serve`

```bash
cd GranoZero
npx serve
```

### Opción 3: VS Code "Live Server"

Instalá la extensión **Live Server** y click derecho en `index.html` → "Open with Live Server".

## 🎨 Sistema de diseño

### Paleta

```css
--gz-ink:    #1F1410   /* fondo principal */
--gz-coffee: #3A2418   /* café oscuro */
--gz-gold:   #C8881F   /* acento dorado (marca) */
--gz-paper:  #F1EAD8   /* crema/papel */
```

### Tipografías

- **Cormorant Garamond** (`--brand`) — la voz de la marca. Medium para `Grano`, SemiBold Italic para `Zero`.
- **DM Sans** (`--sans`) — texto corrido en UI.
- **Space Mono** (`--mono`) — números, labels técnicos, fechas.
- **Instrument Serif** (`--serif`) — variantes editoriales puntuales.

### Vocabulario visual recurrente

- **Esquinas técnicas L doradas** alrededor de ilustraciones (las "láminas")
- **Texto en mono uppercase con letter-spacing alto** para labels y metadatos
- **Drop-caps gigantes** en italic (Diccionario, Carnet)
- **Líneas finas doradas con gradiente** como divisores
- **Bean PNG real** como elemento decorativo recurrente (loaders, granos cayendo, intensidades)

## 🛠️ Cómo modificar

### Agregar un café

Edita `cafes.js` siguiendo el formato existente. Luego, si querés que tenga su propia ilustración, agregá un nuevo `if (id === "tu-cafe")` en `cafe-svgs.jsx`.

### Agregar un origen / término del glosario / método

Todo vive en `data.js` — buscá la sección correspondiente y agregá una entrada nueva. El resto del sitio lo levanta automáticamente.

### Cambiar colores / tipografías

Editá las variables CSS en el bloque `:root{}` al inicio del `index.html`. Los tweaks del panel (clickea el botón "Tweaks" en el toolbar del editor) también permiten cambiar paletas en vivo.

### Modificar el splash

El componente `Splash` está al inicio de `app.jsx`. Es una máquina de estados con `phase`.

## 🔉 Sonidos

Todo es sintético, vive en `sounds.jsx`. Disponibles:

- `Sfx.click()` — tap UI
- `Sfx.bubble()` — burbujeo de café
- `Sfx.grinder(duration, vol)` — molinillo
- `Sfx.pour(duration, vol)` — vertido (no usado actualmente)
- `Sfx.startAmbient()` / `Sfx.stopAmbient()` — ruido suave de cafetería + tintineos

## 📦 PWA

- `manifest.json` define el nombre, iconos y comportamiento de la app
- `sw.js` precachea todos los archivos del proyecto al instalar, sirve cache-first cuando estás offline
- Para **actualizar** la app después de cambios, bumpea `CACHE_VERSION` en `sw.js`

### Instalación

- **iOS Safari:** botón compartir → "Agregar a inicio"
- **Android Chrome:** menú → "Instalar app" (aparece automático al rato)
- **Desktop Chrome:** botón de instalación en la barra de URL

## 🌱 Roadmap / Próximos pasos

- [ ] Reemplazar SVGs simples del Catálogo por **fotos reales** generadas (los prompts están en `PROMPTS-IMAGENES.md`)
- [ ] Sonido **real de "crack"** del café tostado en la sección Tueste
- [ ] Compartir café favorito como **imagen generada** (canvas → blob → share API)
- [ ] **Modo claro** opcional (toggle desde Tweaks)
- [ ] Idiomas: inglés / portugués

## 📝 Notas técnicas

- No hay bundler. Si querés agregar dependencias npm, vas a tener que migrar a Vite o similar.
- Los `.jsx` se transpilan en runtime por Babel — funciona perfecto en desarrollo pero en producción podrías querer precompilar.
- Las animaciones usan CSS keyframes; las interacciones complejas (quiz, carnet) usan React state.
- `localStorage` se usa para:
  - `gz-diario` — progreso por café
  - `gz-carnet-id` — ID random del usuario
  - `gz-carnet-since` — fecha de inicio
  - `gz-edit-mode` — estado del panel de Tweaks

## 🍃 Créditos

- Diseño y código original: tuyo + iteraciones con Claude
- Tipografías: Google Fonts (Cormorant Garamond, DM Sans, Space Mono, Instrument Serif)
- React 18.3.1 vía unpkg
- Babel Standalone 7.29.0

---

**Hecho con café · desde el grano hasta tu pantalla.**
