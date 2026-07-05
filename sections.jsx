// sections.jsx — TODAS las secciones nuevas de GranoZero
// Origen, El Grano, Tueste, Molienda, Métodos, Cata, Glosario, Diario

const { useState: useS, useEffect: useE, useMemo: useM, useRef: useR } = React;

// ════════════════════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════════════════════

function SectionHead({ num, kicker, title, children }) {
  return (
    <header className="gz-shead">
      <div className="gz-section-num">{num} — {kicker}</div>
      <h2 className="gz-shead-title">{title}</h2>
      {children && <p className="gz-shead-sub">{children}</p>}
    </header>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 01 · ORIGEN — mapa del cinturón cafetero (rediseñado)
// ════════════════════════════════════════════════════════════════════════════

// Continentes en proyección equirectangular simplificada (viewBox 1000x500)
const CONTINENT_PATHS = {
  // Norteamérica
  na: "M 80 80 L 200 70 L 240 85 L 260 130 L 240 170 L 200 200 L 230 210 L 220 235 L 180 245 L 160 230 L 130 235 L 110 200 L 90 170 L 70 130 Z",
  // Centroamérica
  ca: "M 180 245 L 215 250 L 225 270 L 200 275 L 175 265 Z",
  // Sudamérica
  sa: "M 240 270 L 290 275 L 310 295 L 330 340 L 320 400 L 290 450 L 275 460 L 260 425 L 250 380 L 235 330 Z",
  // Europa
  eu: "M 470 100 L 540 95 L 580 105 L 570 145 L 530 175 L 485 170 L 460 145 Z",
  // África
  af: "M 500 195 L 580 180 L 615 210 L 615 270 L 595 320 L 565 360 L 530 380 L 505 350 L 490 290 L 485 235 Z",
  // Asia
  asia: "M 580 95 L 720 80 L 820 95 L 900 110 L 920 145 L 880 180 L 820 200 L 770 215 L 715 220 L 670 200 L 625 195 L 600 175 L 580 140 Z",
  // Sudeste asiático + Indonesia
  se: "M 770 240 L 815 245 L 840 270 L 870 290 L 855 320 L 820 335 L 795 320 L 780 295 L 770 270 Z",
  // Oceanía
  oce: "M 850 360 L 920 355 L 945 380 L 940 410 L 905 425 L 870 415 L 855 395 Z"
};

function SectionOrigen() {
  const [active, setActive] = useS(ORIGENES[0]);

  return (
    <section className="gz-section gz-section-origen" id="origen">
      <SectionHead num="01" kicker="Origen" title={<>Todo café <em>viene de algún lugar.</em></>}>
        Antes de ser tu cortado, el grano vivió a 1.500 metros sobre un volcán, fue cosechado a mano y cruzó un océano.
        Estos son los lugares donde el café decide quién es.
      </SectionHead>

      <div className="gz-origen-grid">
        <div className="gz-origen-mapwrap">
          <div className="gz-origen-meridians">
            <span className="gz-meridian" style={{ top: "30%" }}><em>23°N · Trópico de Cáncer</em></span>
            <span className="gz-meridian gz-meridian-eq" style={{ top: "50%" }}><em>0° · Ecuador</em></span>
            <span className="gz-meridian" style={{ top: "70%" }}><em>23°S · Trópico de Capricornio</em></span>
          </div>

          {/* Cinturón cafetero — banda dorada glow */}
          <div className="gz-origen-belt" />

          <svg viewBox="0 0 1000 500" className="gz-origen-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="originPulse" cx="50%" cy="50%">
                <stop offset="0%" stopColor="var(--gz-gold)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="var(--gz-gold)" stopOpacity="0" />
              </radialGradient>
              <filter id="originGlow">
                <feGaussianBlur stdDeviation="3" />
              </filter>
            </defs>

            {/* Continentes */}
            <g className="gz-origen-continents">
              {Object.entries(CONTINENT_PATHS).map(([k, d]) => (
                <path key={k} d={d}
                  fill="rgba(241,234,216,.05)"
                  stroke="rgba(241,234,216,.22)"
                  strokeWidth="1.2"
                  strokeLinejoin="round" />
              ))}
            </g>

            {/* Líneas de latitud (sutiles) */}
            <g className="gz-origen-lats">
              <line x1="0" y1="150" x2="1000" y2="150" stroke="rgba(241,234,216,.06)" strokeDasharray="4 6" />
              <line x1="0" y1="350" x2="1000" y2="350" stroke="rgba(241,234,216,.06)" strokeDasharray="4 6" />
              {/* Trópicos */}
              <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(200,136,31,.5)" strokeDasharray="2 4" strokeWidth="1.4" />
              <line x1="0" y1="350" x2="1000" y2="350" stroke="rgba(200,136,31,.5)" strokeDasharray="2 4" strokeWidth="1.4" />
            </g>

            {/* Marcadores de origen */}
            {ORIGENES.map((o) => {
              const isActive = active.id === o.id;
              return (
                <g key={o.id}
                  className={`gz-origen-marker ${isActive ? "is-active" : ""}`}
                  onClick={() => { Sfx.click(); setActive(o); }}>
                  {/* Pulso amplio si está activo */}
                  {isActive && (
                    <>
                      <circle cx={o.cx} cy={o.cy} r="30" fill="url(#originPulse)">
                        <animate attributeName="r" values="22;38;22" dur="2.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.7;0;0.7" dur="2.6s" repeatCount="indefinite" />
                      </circle>
                      <circle cx={o.cx} cy={o.cy} r="20" fill="none" stroke="var(--gz-gold)" strokeWidth="1" opacity="0.5">
                        <animate attributeName="r" values="14;26;14" dur="2.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;0;0.6" dur="2.6s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                  {/* Círculo base */}
                  <circle cx={o.cx} cy={o.cy} r="10"
                    fill={isActive ? "var(--gz-gold)" : "var(--gz-paper)"}
                    stroke="var(--gz-ink)" strokeWidth="2"
                    className="gz-origen-marker-circle" />
                  {/* Etiqueta */}
                  <text x={o.cx} y={o.cy - 16}
                    textAnchor="middle"
                    className="gz-origen-marker-text"
                    fill={isActive ? "var(--gz-gold)" : "rgba(241,234,216,.85)"}>
                    {o.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Granos cayendo decorativos (background) */}
          <div className="gz-origen-floating-beans" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <img key={i} src="assets/bean.png" alt=""
                style={{
                  left: `${(i * 11 + 7) % 100}%`,
                  width: `${10 + (i % 4) * 4}px`,
                  opacity: 0.15,
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${12 + (i % 3) * 4}s`,
                }} />
            ))}
          </div>

          <div className="gz-origen-mapcaption">
            <span className="gz-origen-mapcaption-line" />
            <span>el cinturón cafetero — 25° N a 30° S del ecuador</span>
          </div>
        </div>

        <div className="gz-origen-detail" key={active.id}>
          <div className="gz-origen-detail-num">0{ORIGENES.indexOf(active) + 1} / {ORIGENES.length}</div>
          <div className="gz-origen-detail-cont">{active.cont}</div>
          <h3 className="gz-origen-detail-name">{active.name}</h3>
          <p className="gz-origen-detail-desc">{active.desc}</p>
          <div className="gz-origen-detail-data">
            <div>
              <span className="gz-mini-label">Altitud</span>
              <strong>{active.altitud}</strong>
            </div>
            <div>
              <span className="gz-mini-label">Notas típicas</span>
              <div className="gz-chips">
                {active.notas.map((n) => <span key={n} className="gz-chip gz-chip-sm">{n}</span>)}
              </div>
            </div>
          </div>

          {/* Mini-navegador entre orígenes */}
          <div className="gz-origen-nav">
            <button className="gz-origen-nav-btn" onClick={() => {
              Sfx.click();
              const i = ORIGENES.indexOf(active);
              setActive(ORIGENES[(i - 1 + ORIGENES.length) % ORIGENES.length]);
            }}>← Anterior</button>
            <button className="gz-origen-nav-btn" onClick={() => {
              Sfx.click();
              const i = ORIGENES.indexOf(active);
              setActive(ORIGENES[(i + 1) % ORIGENES.length]);
            }}>Siguiente →</button>
          </div>
        </div>
      </div>

      {/* Lista horizontal scrolleable de todos los orígenes */}
      <div className="gz-origen-strip">
        {ORIGENES.map((o) => (
          <button key={o.id}
            className={`gz-origen-strip-item ${active.id === o.id ? "is-active" : ""}`}
            onClick={() => { Sfx.click(); setActive(o); }}>
            <img src="assets/bean.png" alt="" />
            <strong>{o.name}</strong>
            <em>{o.cont}</em>
          </button>
        ))}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 02 · EL GRANO — Arábica vs Robusta + anatomía
// ════════════════════════════════════════════════════════════════════════════

function SectionGrano() {
  return (
    <section className="gz-section gz-section-grano" id="grano">
      <SectionHead num="02" kicker="El Grano" title={<>Dos granos, <em>dos mundos.</em></>}>
        El 99% del café del planeta es Arábica o Robusta. Saber distinguirlos te cambia para siempre cómo tomás café.
      </SectionHead>

      <div className="gz-grano-versus">
        {GRANOS.map((g, i) => (
          <article key={g.id} className={`gz-grano-card gz-grano-card-${g.id}`}>
            <div className="gz-grano-card-art">
              <img src="assets/bean.png" alt={g.name}
                style={{
                  width: g.id === "arabica" ? "62%" : "70%",
                  transform: g.id === "arabica" ? "rotate(-12deg)" : "rotate(8deg) scaleY(1.05)",
                  filter: g.id === "robusta" ? "brightness(.7) saturate(1.2)" : "none"
                }} />
              <span className="gz-grano-art-label">{i === 0 ? "60%" : "40%"} del<br />mundo</span>
            </div>
            <div className="gz-grano-card-body">
              <div className="gz-grano-card-head">
                <h3>{g.name}</h3>
                <em>{g.italic}</em>
              </div>
              <p className="gz-grano-desc">{g.desc}</p>
              <dl className="gz-grano-dl">
                <div><dt>Altitud</dt><dd>{g.altitud}</dd></div>
                <div><dt>Cafeína</dt><dd>{g.cafeina}</dd></div>
                <div><dt>Forma</dt><dd>{g.forma}</dd></div>
              </dl>
              <div className="gz-grano-perfil">
                {g.perfil.map((p) => <span key={p} className="gz-chip gz-chip-sm">{p}</span>)}
              </div>
            </div>
          </article>
        ))}

        <div className="gz-grano-versus-vs" aria-hidden="true">
          <span>vs</span>
        </div>
      </div>

      {/* Anatomía exploded */}
      <div className="gz-grano-anatomia">
        <div className="gz-anatomia-head">
          <span className="gz-mini-label">Anatomía · 6 etapas</span>
          <h3>Del fruto rojo al <em>grano tostado.</em></h3>
          <p className="gz-anatomia-intro">
            El café no nace como grano. Empieza como una cereza roja en una rama. Cada capa que se le saca es una transformación.
          </p>
        </div>
        <div className="gz-anatomia-flow">
          {[
            { id: "cereza",    n: 1, name: "Cereza",    desc: "El fruto rojo del cafeto" },
            { id: "pulpa",     n: 2, name: "Pulpa",     desc: "La capa carnosa exterior" },
            { id: "mucilago",  n: 3, name: "Mucílago",  desc: "La capa pegajosa dulce" },
            { id: "pergamino", n: 4, name: "Pergamino", desc: "La cáscara dura, papel" },
            { id: "verde",     n: 5, name: "Verde",     desc: "El grano sin tostar" },
            { id: "tostado",   n: 6, name: "Tostado",   desc: "Lo que llega a tu taza" },
          ].map((step, i) => (
            <div key={step.id} className="gz-anatomia-step" style={{ animationDelay: `${i * 90}ms` }}>
              <div className="gz-anatomia-step-art">
                <AnatomiaArt id={step.id} />
                <span className="gz-anatomia-step-num">{step.n}</span>
              </div>
              <strong>{step.name}</strong>
              <em>{step.desc}</em>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// SVGs ilustrativos de cada etapa de la anatomía (viewBox 100x100)
function AnatomiaArt({ id }) {
  if (id === "cereza") {
    return (
      <svg viewBox="0 0 100 100">
        {/* Rama */}
        <path d="M 78 12 Q 70 18 60 22" stroke="#6F4220" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Hoja */}
        <path d="M 72 14 Q 88 10 92 24 Q 86 32 72 14 Z" fill="#3A6E2A" />
        <path d="M 76 18 L 86 22" stroke="#1F4214" strokeWidth="0.6" fill="none" />
        {/* Cereza grande */}
        <circle cx="50" cy="58" r="26" fill="#A82E1F" />
        <circle cx="50" cy="58" r="26" fill="none" stroke="#6E1A12" strokeWidth="0.8" opacity=".5" />
        {/* Brillito */}
        <ellipse cx="40" cy="48" rx="8" ry="5" fill="#D04A2A" opacity=".8" />
        <ellipse cx="38" cy="46" rx="3" ry="2" fill="#F8D8C8" opacity=".7" />
        {/* Cabito en el tope */}
        <path d="M 50 32 Q 52 26 60 24" stroke="#6F4220" strokeWidth="1.5" fill="none" />
        {/* Indentación inferior */}
        <ellipse cx="50" cy="80" rx="3" ry="2" fill="#6E1A12" opacity=".5" />
      </svg>
    );
  }
  if (id === "pulpa") {
    return (
      <svg viewBox="0 0 100 100">
        {/* Cereza en sección — mitad izquierda */}
        <path d="M 50 18 A 32 32 0 0 0 50 86 Z" fill="#A82E1F" />
        <path d="M 50 18 A 28 28 0 0 0 50 82 Z" fill="#D04A2A" opacity=".85" />
        {/* Capa pulpa visible (más clara hacia adentro) */}
        <path d="M 50 24 A 22 22 0 0 0 50 78 Z" fill="#E66B3F" opacity=".75" />
        {/* Mucílago amarillo */}
        <path d="M 50 30 A 16 16 0 0 0 50 72 Z" fill="#E0A95A" opacity=".9" />
        {/* Mitad derecha — perfil completo */}
        <path d="M 50 18 A 32 32 0 0 1 50 86" fill="none" stroke="#6E1A12" strokeWidth="1.5" />
        {/* Dos granos en el centro */}
        <ellipse cx="44" cy="52" rx="8" ry="14" fill="#D8C99A" />
        <ellipse cx="56" cy="52" rx="8" ry="14" fill="#D8C99A" />
        <line x1="44" y1="42" x2="44" y2="62" stroke="#9C8F6C" strokeWidth="1" />
        <line x1="56" y1="42" x2="56" y2="62" stroke="#9C8F6C" strokeWidth="1" />
        {/* Etiqueta de capas indicada */}
        <line x1="22" y1="50" x2="14" y2="50" stroke="#C8881F" strokeWidth="0.6" opacity=".6" />
        <circle cx="14" cy="50" r="1.2" fill="#C8881F" opacity=".7" />
      </svg>
    );
  }
  if (id === "mucilago") {
    return (
      <svg viewBox="0 0 100 100">
        <defs>
          <radialGradient id="muc" cx="50%" cy="40%">
            <stop offset="0" stopColor="#FFE6A8" />
            <stop offset="0.7" stopColor="#E0A95A" />
            <stop offset="1" stopColor="#B98835" />
          </radialGradient>
        </defs>
        {/* Drip pegajoso saliendo del grano */}
        <path d="M 30 70 Q 28 80 32 88 Q 34 92 32 96" fill="none" stroke="#E0A95A" strokeWidth="2" strokeLinecap="round" opacity=".7" />
        <path d="M 68 72 Q 70 82 66 90" fill="none" stroke="#E0A95A" strokeWidth="2" strokeLinecap="round" opacity=".7" />
        {/* Grano cubierto */}
        <ellipse cx="50" cy="50" rx="22" ry="30" fill="url(#muc)" />
        {/* Mucílago en superficie — reflejo */}
        <ellipse cx="42" cy="38" rx="8" ry="14" fill="#FFE6A8" opacity=".55" />
        <ellipse cx="40" cy="34" rx="3" ry="6" fill="#FFFFFF" opacity=".5" />
        {/* Surco */}
        <path d="M 50 24 Q 47 50 52 76" stroke="#9C7028" strokeWidth="1.4" fill="none" opacity=".55" />
        {/* Gota colgando abajo */}
        <ellipse cx="50" cy="82" rx="3.5" ry="5" fill="#E0A95A" opacity=".8" />
      </svg>
    );
  }
  if (id === "pergamino") {
    return (
      <svg viewBox="0 0 100 100">
        {/* Sombra textura */}
        <ellipse cx="50" cy="84" rx="20" ry="3" fill="#000" opacity=".15" />
        {/* Pergamino (cáscara) — color papel */}
        <ellipse cx="50" cy="50" rx="24" ry="32" fill="#E8D8B0" stroke="#9C8F6C" strokeWidth="1.2" />
        {/* Textura papel arrugado */}
        <path d="M 32 30 Q 50 28 68 32" stroke="#9C8F6C" strokeWidth="0.6" fill="none" opacity=".5" />
        <path d="M 28 50 Q 50 48 72 52" stroke="#9C8F6C" strokeWidth="0.6" fill="none" opacity=".4" />
        <path d="M 32 70 Q 50 72 68 68" stroke="#9C8F6C" strokeWidth="0.6" fill="none" opacity=".5" />
        {/* Crack vertical (línea de quiebre) */}
        <path d="M 50 22 Q 47 50 52 78" stroke="#9C8F6C" strokeWidth="1.2" fill="none" />
        {/* Pliegues laterales */}
        <path d="M 30 40 Q 26 50 30 60" stroke="#9C8F6C" strokeWidth="0.5" fill="none" opacity=".4" />
        <path d="M 70 40 Q 74 50 70 60" stroke="#9C8F6C" strokeWidth="0.5" fill="none" opacity=".4" />
        {/* Marca tipo silver skin pelando */}
        <path d="M 36 26 Q 32 22 30 28" fill="#FAF3DF" opacity=".8" stroke="#9C8F6C" strokeWidth="0.4" />
      </svg>
    );
  }
  if (id === "verde") {
    return (
      <svg viewBox="0 0 100 100">
        <defs>
          <radialGradient id="verde-g" cx="50%" cy="40%">
            <stop offset="0" stopColor="#A8B568" />
            <stop offset="0.7" stopColor="#8A954A" />
            <stop offset="1" stopColor="#5C6A2E" />
          </radialGradient>
        </defs>
        {/* Sombra */}
        <ellipse cx="50" cy="84" rx="20" ry="3" fill="#000" opacity=".18" />
        {/* Grano verde */}
        <ellipse cx="50" cy="50" rx="24" ry="32" fill="url(#verde-g)" stroke="#5C6A2E" strokeWidth="0.8" />
        {/* Reflejo */}
        <ellipse cx="42" cy="38" rx="6" ry="12" fill="#A8B568" opacity=".7" />
        {/* Surco característico — bien marcado */}
        <path d="M 50 22 Q 47 50 52 78" stroke="#4A5A26" strokeWidth="2.2" fill="none" />
        <path d="M 50 22 Q 47 50 52 78" stroke="#7A8838" strokeWidth="0.6" fill="none" opacity=".6" />
        {/* Detalles laterales */}
        <path d="M 30 36 Q 28 50 30 64" stroke="#5C6A2E" strokeWidth="0.5" fill="none" opacity=".5" />
        <path d="M 70 36 Q 72 50 70 64" stroke="#5C6A2E" strokeWidth="0.5" fill="none" opacity=".5" />
      </svg>
    );
  }
  if (id === "tostado") {
    return (
      <svg viewBox="0 0 100 100">
        <defs>
          <radialGradient id="tos-g" cx="50%" cy="40%">
            <stop offset="0" stopColor="#7C4A20" />
            <stop offset="0.7" stopColor="#5C3A1F" />
            <stop offset="1" stopColor="#2A1810" />
          </radialGradient>
        </defs>
        {/* Sombra fuerte */}
        <ellipse cx="50" cy="84" rx="22" ry="4" fill="#000" opacity=".35" />
        {/* Glow dorado */}
        <ellipse cx="50" cy="50" rx="30" ry="38" fill="#C8881F" opacity=".15" />
        {/* Grano tostado */}
        <ellipse cx="50" cy="50" rx="24" ry="32" fill="url(#tos-g)" stroke="#1F1410" strokeWidth="1" />
        {/* Brillito oleoso */}
        <ellipse cx="42" cy="36" rx="6" ry="12" fill="#A86C32" opacity=".6" />
        <ellipse cx="40" cy="32" rx="2" ry="5" fill="#E0A95A" opacity=".55" />
        {/* Swirl dorado (como el logo) */}
        <path d="M 38 24 Q 56 40 48 56 Q 40 70 56 84" stroke="#C8881F" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M 38 24 Q 56 40 48 56" stroke="#E0A95A" strokeWidth="1" fill="none" opacity=".6" />
        {/* Brillo extra */}
        <circle cx="46" cy="40" r="1.5" fill="#FFE6A8" opacity=".7" />
      </svg>
    );
  }
  return null;
}

// ════════════════════════════════════════════════════════════════════════════
// 03 · TUESTE — slider con grano que cambia de color
// ════════════════════════════════════════════════════════════════════════════

function SectionTueste() {
  const [idx, setIdx] = useS(2); // medio por defecto
  const t = TUESTES[idx];

  return (
    <section className="gz-section gz-section-tueste" id="tueste"
      style={{ "--tueste-tint": t.color }}>
      <SectionHead num="03" kicker="Tueste" title={<>Verde, claro, <em>oscuro</em>.</>}>
        Tostar es transformar. El mismo grano, según los minutos que pase en la tostadora, va a ser ácido y floral, o redondo y achocolatado, o amargo y ahumado.
      </SectionHead>

      <div className="gz-tueste-stage">
        <div className="gz-tueste-bean-wrap">
          {/* Vapor que sale del grano cuando es tueste oscuro */}
          {idx >= 3 && (
            <div className="gz-tueste-steam">
              <Steam count={3} height={120} color="rgba(241,234,216,.5)" />
            </div>
          )}
          <img src="assets/bean.png" alt={`Grano ${t.name}`} className="gz-tueste-bean"
            style={{ filter: t.filter }} />
          <div className="gz-tueste-glow" style={{ background: `radial-gradient(circle, ${t.color}66 0%, transparent 70%)` }} />
        </div>

        <div className="gz-tueste-info" key={t.id}>
          <div className="gz-mini-label">Nivel {idx} de {TUESTES.length - 1}</div>
          <h3 className="gz-tueste-name">
            {t.name} <em>{t.italic}</em>
          </h3>
          <p className="gz-tueste-desc">{t.desc}</p>
          <div className="gz-tueste-meta">
            <div>
              <span className="gz-mini-label">Temperatura</span>
              <strong>{t.temp}</strong>
            </div>
            <div>
              <span className="gz-mini-label">Tiempo</span>
              <strong>{t.time}</strong>
            </div>
          </div>
          <div className="gz-tueste-notas">
            <span className="gz-mini-label">Notas dominantes</span>
            <div className="gz-chips">
              {t.notas.map((n) => <span key={n} className="gz-chip gz-chip-sm">{n}</span>)}
            </div>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="gz-tueste-slider">
        <div className="gz-tueste-track">
          <div className="gz-tueste-track-line"
            style={{ background: `linear-gradient(90deg, ${TUESTES.map(x => x.color).join(", ")})` }} />
          {TUESTES.map((tt, i) => (
            <button key={tt.id}
              className={`gz-tueste-stop ${i === idx ? "is-active" : ""}`}
              onClick={() => { Sfx.click(); setIdx(i); }}
              style={{ left: `${(i / (TUESTES.length - 1)) * 100}%` }}
              aria-label={`Tueste ${tt.name}`}>
              <span className="gz-tueste-stop-dot" style={{ background: tt.color }} />
              <span className="gz-tueste-stop-label">{tt.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 04 · MOLIENDA — grueso a fino
// ════════════════════════════════════════════════════════════════════════════

function SectionMolienda() {
  const [sel, setSel] = useS(MOLIENDAS[2]);

  return (
    <section className="gz-section gz-section-molienda" id="molienda">
      <SectionHead num="04" kicker="Molienda" title={<>Cada método pide su <em>grano partido</em>.</>}>
        El tamaño de las partículas decide cuánto se extrae el café. Demasiado fino: amargo. Demasiado grueso: agua sucia. La molienda correcta es la diferencia entre un buen café y uno mediocre.
      </SectionHead>

      <div className="gz-molienda-grid">
        {MOLIENDAS.map((m) => (
          <button key={m.id}
            className={`gz-molienda-card ${sel.id === m.id ? "is-active" : ""}`}
            onClick={() => { Sfx.click(); setSel(m); }}>
            <div className="gz-molienda-vis">
              <ParticleField count={m.dots.count} size={m.dots.size} />
            </div>
            <strong className="gz-molienda-name">{m.name}</strong>
            <em className="gz-molienda-italic">{m.italic}</em>
            <span className="gz-molienda-size">{m.size}</span>
          </button>
        ))}
      </div>

      <div className="gz-molienda-detail">
        <div>
          <span className="gz-mini-label">Te sirve para</span>
          <h3>{sel.metodo}</h3>
        </div>
        <div>
          <span className="gz-mini-label">Como se siente</span>
          <strong>{sel.referencia}</strong>
        </div>
        <div>
          <span className="gz-mini-label">Tamaño</span>
          <strong>{sel.size}</strong>
        </div>
      </div>
    </section>
  );
}

// Campo de "partículas" pseudo-random pero determinístico por count
function ParticleField({ count, size }) {
  const seeds = useM(() => {
    // Genera posiciones determinísticas para que no salten en re-render
    const r = (n) => {
      let x = Math.sin(n * 9973) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: count }, (_, i) => ({
      x: r(i + 1) * 100,
      y: r(i + 31) * 100,
      rot: r(i + 71) * 360,
      sc: 0.7 + r(i + 113) * 0.6
    }));
  }, [count]);
  return (
    <div className="gz-particles">
      {seeds.map((p, i) => (
        <span key={i} className="gz-particle"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: `${size * p.sc}px`, height: `${size * p.sc}px`,
            transform: `translate(-50%, -50%) rotate(${p.rot}deg)`,
          }} />
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 05 · MÉTODOS — V60, AeroPress, French press, Moka, Espresso
// ════════════════════════════════════════════════════════════════════════════

function SectionMetodos() {
  const [active, setActive] = useS(METODOS[0]);
  return (
    <section className="gz-section gz-section-metodos" id="metodos">
      <SectionHead num="05" kicker="Métodos" title={<>Cinco caminos al <em>mismo grano</em>.</>}>
        Misma materia prima, distinta máquina, café totalmente diferente. Cada método es una receta hecha aparato. Hacé click en cualquier ilustración para verla en acción.
      </SectionHead>

      {/* Selector de método + lámina activa */}
      <div className="gz-metodos-stage">
        <div className="gz-metodos-tabs">
          {METODOS.map((m, i) => (
            <button key={m.id}
              className={`gz-metodos-tab ${active.id === m.id ? "is-active" : ""}`}
              onClick={() => { Sfx.click(); setActive(m); }}>
              <span className="gz-metodos-tab-num">FIG. 0{i + 1}</span>
              <strong>{m.name}</strong>
              <em>{m.italic}</em>
            </button>
          ))}
        </div>

        <MetodoLamina m={active} idx={METODOS.indexOf(active)} key={active.id} />
      </div>
    </section>
  );
}

function MetodoLamina({ m, idx }) {
  const [running, setRunning] = useS(false);
  return (
    <article className="gz-lamina">
      <div className="gz-lamina-art"
        onClick={() => { Sfx.bubble(); setRunning(true); setTimeout(() => setRunning(false), 5000); }}>
        <div className="gz-lamina-art-header">
          <span className="gz-lamina-fig">FIG. 0{idx + 1}</span>
          <span className="gz-lamina-art-hint">
            <span className="gz-lamina-hint-dot" />
            {running ? "en preparación..." : "tocar para preparar"}
          </span>
        </div>
        <MetodoIlustracion type={m.icono} running={running} />
        <div className="gz-lamina-art-corner-tl" />
        <div className="gz-lamina-art-corner-tr" />
        <div className="gz-lamina-art-corner-bl" />
        <div className="gz-lamina-art-corner-br" />
      </div>

      <div className="gz-lamina-info">
        <div className="gz-lamina-num">{String(idx + 1).padStart(2, "0")} de {METODOS.length}</div>
        <h3 className="gz-lamina-title">
          {m.name} <em>{m.italic}</em>
        </h3>
        <p className="gz-lamina-desc">{m.desc}</p>

        <div className="gz-lamina-specs">
          <SpecRow label="Molienda"     value={m.grind} />
          <SpecRow label="Tiempo total"  value={m.time} />
          <SpecRow label="Ratio café:agua" value={m.ratio} />
          <SpecRow label="Temperatura"  value={m.temp} />
          {m.presion !== "—" && <SpecRow label="Presión" value={m.presion} />}
        </div>

        <div className="gz-lamina-yield">
          <span className="gz-mini-label">El café que esperás</span>
          <strong>{m.yield}</strong>
        </div>
      </div>
    </article>
  );
}

function SpecRow({ label, value }) {
  return (
    <div className="gz-spec-row">
      <span className="gz-spec-label">{label}</span>
      <span className="gz-spec-dots" aria-hidden="true" />
      <span className="gz-spec-value">{value}</span>
    </div>
  );
}

// SVGs ilustrativos al estilo "lámina de manual antiguo". Índices ilustrados,
// cotas con flechas, líneas finas. La animación al click corre la preparación.
function MetodoIlustracion({ type, running }) {
  const props = { className: `gz-mil ${running ? "is-running" : ""}` };

  if (type === "espresso") {
    return (
      <svg viewBox="0 0 300 300" {...props}>
        <defs>
          <linearGradient id="mil-crema" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E0A95A" />
            <stop offset="1" stopColor="#C8881F" />
          </linearGradient>
        </defs>
        {/* Cabeza del grupo (group head) */}
        <rect x="110" y="30" width="80" height="50" rx="4" fill="none" stroke="var(--gz-paper)" strokeWidth="1.6" />
        <rect x="118" y="38" width="64" height="6" fill="var(--gz-paper)" opacity=".35" />
        <circle cx="150" cy="66" r="4" fill="var(--gz-gold)" opacity=".7" />
        {/* Portafiltro */}
        <rect x="100" y="80" width="100" height="14" rx="3" fill="var(--gz-paper)" opacity=".15" stroke="var(--gz-paper)" strokeWidth="1.4" />
        <rect x="118" y="94" width="64" height="42" rx="2" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" />
        {/* Café molido prensado */}
        <rect x="122" y="100" width="56" height="30" fill="var(--gz-coffee)" />
        <path d="M 122 102 Q 150 105 178 102" fill="none" stroke="var(--gz-coffee-light, #5C3A1F)" strokeWidth="0.6" opacity=".7" />
        {/* Mango lateral */}
        <rect x="200" y="80" width="40" height="10" rx="3" fill="var(--gz-paper)" opacity=".2" stroke="var(--gz-paper)" strokeWidth="1.2" />
        <rect x="235" y="78" width="6" height="14" rx="1" fill="var(--gz-paper)" opacity=".4" />
        {/* Doble pico */}
        <path d="M 130 136 L 128 152 L 134 152 L 136 136 Z" fill="var(--gz-paper)" opacity=".3" />
        <path d="M 164 136 L 162 152 L 168 152 L 170 136 Z" fill="var(--gz-paper)" opacity=".3" />
        {/* Doble chorro de espresso */}
        <line className="gz-mil-pour-left" x1="131" y1="154" x2="131" y2="210"
          stroke="var(--gz-coffee-light, #5C3A1F)" strokeWidth="2" strokeLinecap="round"
          strokeDasharray="56" strokeDashoffset="56" />
        <line className="gz-mil-pour-right" x1="165" y1="154" x2="165" y2="210"
          stroke="var(--gz-coffee-light, #5C3A1F)" strokeWidth="2" strokeLinecap="round"
          strokeDasharray="56" strokeDashoffset="56" />
        {/* Taza espresso pequeña */}
        <ellipse cx="148" cy="212" rx="42" ry="5" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" />
        <path d="M 106 212 Q 110 254 148 254 Q 186 254 190 212" fill="none" stroke="var(--gz-paper)" strokeWidth="1.6" />
        {/* Asa */}
        <path d="M 190 222 Q 210 226 208 244 Q 204 256 190 250" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" />
        {/* Café + crema dentro */}
        <ellipse cx="148" cy="212" rx="40" ry="4" fill="var(--gz-coffee)" />
        <ellipse className="gz-mil-crema" cx="148" cy="212" rx="40" ry="4" fill="url(#mil-crema)" opacity="0" />
        {/* Plato */}
        <ellipse cx="148" cy="272" rx="68" ry="5" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" />
        <ellipse cx="148" cy="272" rx="60" ry="3" fill="none" stroke="var(--gz-paper)" strokeWidth="0.8" opacity=".6" />

        {/* Cota técnica: 30ml */}
        <line x1="232" y1="212" x2="232" y2="254" stroke="var(--gz-gold)" strokeWidth="0.8" opacity=".7" />
        <line x1="228" y1="212" x2="236" y2="212" stroke="var(--gz-gold)" strokeWidth="0.8" opacity=".7" />
        <line x1="228" y1="254" x2="236" y2="254" stroke="var(--gz-gold)" strokeWidth="0.8" opacity=".7" />
        <text x="244" y="236" fill="var(--gz-gold)" fontSize="10" fontFamily="var(--mono)" opacity=".8">30 ml</text>
      </svg>
    );
  }

  if (type === "v60") {
    return (
      <svg viewBox="0 0 300 300" {...props}>
        {/* Filtro de papel (asoma) */}
        <path d="M 90 70 L 210 70 L 200 80 L 100 80 Z" fill="var(--gz-paper)" opacity=".2" stroke="var(--gz-paper)" strokeWidth="1.2" />
        {/* Cono V60 */}
        <path d="M 90 80 L 210 80 L 156 175 L 144 175 Z"
          fill="none" stroke="var(--gz-paper)" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M 90 80 L 210 80" stroke="var(--gz-gold)" strokeWidth="2" />
        {/* Líneas espirales características */}
        <path d="M 100 86 L 158 175" stroke="var(--gz-paper)" strokeWidth="0.6" opacity=".5" />
        <path d="M 116 86 L 154 175" stroke="var(--gz-paper)" strokeWidth="0.6" opacity=".5" />
        <path d="M 132 86 L 152 175" stroke="var(--gz-paper)" strokeWidth="0.6" opacity=".5" />
        <path d="M 168 86 L 148 175" stroke="var(--gz-paper)" strokeWidth="0.6" opacity=".5" />
        <path d="M 184 86 L 146 175" stroke="var(--gz-paper)" strokeWidth="0.6" opacity=".5" />
        <path d="M 200 86 L 142 175" stroke="var(--gz-paper)" strokeWidth="0.6" opacity=".5" />
        {/* Café molido (lecho) */}
        <path d="M 110 92 L 190 92 L 168 122 L 132 122 Z" fill="var(--gz-coffee)" opacity=".55" />
        {/* Agua/café que se vierte arriba */}
        <path className="gz-mil-pour-stream" d="M 150 50 L 150 78"
          stroke="var(--gz-paper)" strokeWidth="1.8" opacity=".55" strokeDasharray="28" strokeDashoffset="28" />
        {/* Mango lateral V60 */}
        <path d="M 210 100 Q 230 105 226 130 Q 220 150 200 140" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" />
        {/* Gotas continuas */}
        <circle className="gz-mil-drop gz-mil-drop-1" cx="150" cy="178" r="2.2" fill="var(--gz-coffee-light, #5C3A1F)" />
        <circle className="gz-mil-drop gz-mil-drop-2" cx="150" cy="178" r="1.6" fill="var(--gz-coffee-light, #5C3A1F)" />
        <circle className="gz-mil-drop gz-mil-drop-3" cx="150" cy="178" r="2" fill="var(--gz-coffee-light, #5C3A1F)" />
        {/* Servidor abajo */}
        <path d="M 105 200 L 195 200 L 188 250 L 112 250 Z" fill="none" stroke="var(--gz-paper)" strokeWidth="1.6" />
        <ellipse cx="150" cy="200" rx="45" ry="3" fill="none" stroke="var(--gz-paper)" strokeWidth="0.8" opacity=".6" />
        <rect className="gz-mil-fill" x="110" y="248" width="80" height="2" fill="var(--gz-coffee)" />
        {/* Letra V */}
        <text x="150" y="145" textAnchor="middle" fill="var(--gz-gold)" fontSize="22" fontFamily="var(--brand)" fontWeight="500" fontStyle="italic" opacity=".22">V60</text>
      </svg>
    );
  }

  if (type === "aeropress") {
    return (
      <svg viewBox="0 0 300 300" {...props}>
        {/* Tapa con perilla del pistón */}
        <rect className="gz-mil-piston" x="118" y="32" width="64" height="14" rx="3" fill="var(--gz-paper)" opacity=".25" stroke="var(--gz-paper)" strokeWidth="1.4" />
        <line className="gz-mil-piston" x1="150" y1="46" x2="150" y2="58" stroke="var(--gz-paper)" strokeWidth="2" />
        {/* Sello de goma */}
        <rect className="gz-mil-piston-seal" x="122" y="58" width="56" height="10" rx="2" fill="var(--gz-gold)" opacity=".55" stroke="var(--gz-paper)" strokeWidth="1" />
        {/* Cilindro */}
        <rect x="118" y="68" width="64" height="150" rx="3" fill="none" stroke="var(--gz-paper)" strokeWidth="1.6" />
        {/* Marcas de medida en el cilindro */}
        {[88, 110, 132, 154, 176, 198].map((y, i) => (
          <g key={i}>
            <line x1="118" y1={y} x2="126" y2={y} stroke="var(--gz-paper)" strokeWidth="0.8" opacity=".7" />
            <text x="108" y={y + 3} textAnchor="end" fill="var(--gz-paper)" fontSize="7" fontFamily="var(--mono)" opacity=".55">{i + 1}</text>
          </g>
        ))}
        {/* Café + agua dentro */}
        <rect x="120" y="120" width="60" height="96" fill="var(--gz-coffee)" opacity=".7" />
        {/* Burbujas */}
        <circle className="gz-mil-bubble gz-mil-b1" cx="138" cy="180" r="2" fill="var(--gz-paper)" opacity=".4" />
        <circle className="gz-mil-bubble gz-mil-b2" cx="160" cy="195" r="1.5" fill="var(--gz-paper)" opacity=".4" />
        <circle className="gz-mil-bubble gz-mil-b3" cx="152" cy="205" r="1.8" fill="var(--gz-paper)" opacity=".4" />
        {/* Cápsula del filtro */}
        <path d="M 116 218 L 184 218 L 178 232 L 122 232 Z" fill="var(--gz-paper)" opacity=".18" stroke="var(--gz-paper)" strokeWidth="1.4" />
        <circle cx="150" cy="225" r="4" fill="var(--gz-gold)" opacity=".5" />
        {/* Goteo */}
        <line className="gz-mil-drip" x1="150" y1="232" x2="150" y2="248" stroke="var(--gz-coffee-light, #5C3A1F)" strokeWidth="1.8" strokeLinecap="round" />
        {/* Taza/jarra abajo */}
        <path d="M 110 250 L 190 250 L 184 282 L 116 282 Z" fill="none" stroke="var(--gz-paper)" strokeWidth="1.6" />
        <ellipse cx="150" cy="250" rx="40" ry="3" fill="none" stroke="var(--gz-paper)" strokeWidth="0.8" opacity=".6" />
        <rect className="gz-mil-fill" x="114" y="280" width="72" height="2" fill="var(--gz-coffee)" />
      </svg>
    );
  }

  if (type === "french") {
    return (
      <svg viewBox="0 0 300 300" {...props}>
        {/* Carafe principal */}
        <rect x="95" y="70" width="110" height="180" rx="6" fill="none" stroke="var(--gz-paper)" strokeWidth="1.8" />
        {/* Marco superior metálico */}
        <rect x="90" y="62" width="120" height="12" rx="3" fill="var(--gz-paper)" opacity=".18" stroke="var(--gz-paper)" strokeWidth="1.4" />
        {/* Pico vertedor */}
        <path d="M 90 68 L 78 64 L 78 72 L 90 76" fill="var(--gz-paper)" opacity=".25" stroke="var(--gz-paper)" strokeWidth="1.2" />
        {/* Asa */}
        <path d="M 205 100 Q 245 110 240 160 Q 232 200 205 195" fill="none" stroke="var(--gz-paper)" strokeWidth="3" strokeLinecap="round" />
        <path d="M 205 100 Q 245 110 240 160 Q 232 200 205 195" fill="none" stroke="var(--gz-coffee-light, #5C3A1F)" strokeWidth="1" strokeLinecap="round" opacity=".5" />
        {/* Café dentro */}
        <rect x="96" y="120" width="108" height="128" fill="var(--gz-coffee)" opacity=".7" />
        {/* Émbolo: varilla + disco */}
        <line className="gz-mil-plunger-rod" x1="150" y1="20" x2="150" y2="118" stroke="var(--gz-paper)" strokeWidth="2" />
        <circle className="gz-mil-plunger-rod" cx="150" cy="18" r="7" fill="var(--gz-gold)" opacity=".7" />
        <rect className="gz-mil-plunger-disc" x="100" y="114" width="100" height="8" rx="2" fill="var(--gz-paper)" opacity=".4" stroke="var(--gz-paper)" strokeWidth="1.2" />
        <rect className="gz-mil-plunger-mesh" x="104" y="118" width="92" height="3" fill="none" stroke="var(--gz-paper)" strokeWidth="0.6" strokeDasharray="2 1" opacity=".6" />
        {/* Granos en suspensión */}
        <circle className="gz-mil-particle gz-mil-p1" cx="125" cy="160" r="2.5" fill="var(--gz-paper)" opacity=".55" />
        <circle className="gz-mil-particle gz-mil-p2" cx="175" cy="180" r="2" fill="var(--gz-paper)" opacity=".55" />
        <circle className="gz-mil-particle gz-mil-p3" cx="148" cy="200" r="2.2" fill="var(--gz-paper)" opacity=".55" />
        <circle className="gz-mil-particle gz-mil-p4" cx="168" cy="230" r="1.8" fill="var(--gz-paper)" opacity=".55" />
        {/* Base */}
        <rect x="86" y="250" width="128" height="14" rx="3" fill="var(--gz-paper)" opacity=".15" stroke="var(--gz-paper)" strokeWidth="1.4" />
      </svg>
    );
  }

  if (type === "moka") {
    return (
      <svg viewBox="0 0 300 300" {...props}>
        {/* Vapor */}
        <g className="gz-mil-vapor-g">
          <path className="gz-mil-vapor gz-mil-v1" d="M 138 28 Q 134 14 142 4" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".6" />
          <path className="gz-mil-vapor gz-mil-v2" d="M 152 22 Q 156 8 150 -2" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".6" />
          <path className="gz-mil-vapor gz-mil-v3" d="M 166 28 Q 170 14 162 4" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".6" />
        </g>
        {/* Tapa */}
        <path d="M 110 40 L 190 40 L 192 50 L 108 50 Z" fill="var(--gz-paper)" opacity=".2" stroke="var(--gz-paper)" strokeWidth="1.4" />
        <rect x="144" y="30" width="12" height="12" rx="2" fill="var(--gz-paper)" opacity=".3" stroke="var(--gz-paper)" strokeWidth="1.2" />
        {/* Cámara superior (octogonal) */}
        <path d="M 88 50 L 212 50 L 212 70 L 200 130 L 100 130 L 88 70 Z"
          fill="none" stroke="var(--gz-paper)" strokeWidth="1.6" strokeLinejoin="round" />
        {/* Facetas octogonales */}
        <line x1="112" y1="50" x2="112" y2="130" stroke="var(--gz-paper)" strokeWidth="0.6" opacity=".4" />
        <line x1="150" y1="50" x2="150" y2="130" stroke="var(--gz-paper)" strokeWidth="0.6" opacity=".4" />
        <line x1="188" y1="50" x2="188" y2="130" stroke="var(--gz-paper)" strokeWidth="0.6" opacity=".4" />
        {/* Café que sube */}
        <rect className="gz-mil-rise" x="104" y="110" width="92" height="20" fill="var(--gz-coffee)" opacity=".75" />
        {/* Mango lateral */}
        <path d="M 212 80 Q 248 90 250 130 Q 248 165 220 165" fill="none" stroke="var(--gz-coffee-light, #5C3A1F)" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 212 80 Q 248 90 250 130 Q 248 165 220 165" fill="none" stroke="var(--gz-paper)" strokeWidth="1.2" strokeLinecap="round" opacity=".6" />
        {/* Cuello */}
        <rect x="108" y="130" width="84" height="12" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" />
        {/* Cámara inferior (más ancha, octogonal) */}
        <path d="M 80 142 L 220 142 L 220 165 L 208 215 L 92 215 L 80 165 Z"
          fill="none" stroke="var(--gz-paper)" strokeWidth="1.6" strokeLinejoin="round" />
        {/* Facetas inferior */}
        <line x1="110" y1="142" x2="110" y2="215" stroke="var(--gz-paper)" strokeWidth="0.6" opacity=".4" />
        <line x1="150" y1="142" x2="150" y2="215" stroke="var(--gz-paper)" strokeWidth="0.6" opacity=".4" />
        <line x1="190" y1="142" x2="190" y2="215" stroke="var(--gz-paper)" strokeWidth="0.6" opacity=".4" />
        {/* Base */}
        <rect x="76" y="215" width="148" height="8" rx="2" fill="var(--gz-paper)" opacity=".18" stroke="var(--gz-paper)" strokeWidth="1.2" />
        {/* Indicador de presión */}
        <circle cx="150" cy="180" r="3" fill="var(--gz-gold)" opacity=".5" />
        <line x1="150" y1="177" x2="154" y2="172" stroke="var(--gz-gold)" strokeWidth="1" opacity=".7" />
      </svg>
    );
  }

  return null;
}

// ════════════════════════════════════════════════════════════════════════════
// 06 · CATA — quiz "¿qué café sos?"
// ════════════════════════════════════════════════════════════════════════════

const PREGUNTAS = [
  {
    id: "leche",
    q: "¿Con leche o sin leche?",
    opts: [
      { label: "Sin leche, café puro", value: { sin_leche: 3 } },
      { label: "Cualquiera, depende del día", value: { sin_leche: 1, leche: 1 } },
      { label: "Con leche, siempre", value: { leche: 3 } },
    ]
  },
  {
    id: "tamano",
    q: "¿Qué tan grande lo tomás?",
    opts: [
      { label: "Mini, un shot", value: { chico: 3 } },
      { label: "Mediano, taza normal", value: { medio: 2 } },
      { label: "Grande, vaso largo", value: { grande: 3 } },
    ]
  },
  {
    id: "intensidad",
    q: "¿Qué tan fuerte lo querés?",
    opts: [
      { label: "Que pegue", value: { intenso: 3 } },
      { label: "Equilibrado", value: { medio: 2 } },
      { label: "Suave, casi postre", value: { suave: 3, leche: 1 } },
    ]
  },
  {
    id: "momento",
    q: "¿Cuándo lo tomás?",
    opts: [
      { label: "Recién levantado, primer café", value: { intenso: 1, sin_leche: 1 } },
      { label: "Media mañana, segunda taza", value: { medio: 1 } },
      { label: "Después de comer", value: { intenso: 2, chico: 1 } },
      { label: "Tarde, como dulce", value: { suave: 2, leche: 1, grande: 1 } },
    ]
  },
];

// Algoritmo simple: cada café tiene "afinidades" con tags. Suma puntos.
const AFINIDADES = {
  espresso:    { intenso: 3, sin_leche: 3, chico: 3 },
  ristretto:   { intenso: 3, sin_leche: 3, chico: 3 },
  americano:   { medio: 2, sin_leche: 2, grande: 2 },
  cortado:     { medio: 2, leche: 2, chico: 2 },
  cappuccino:  { medio: 2, leche: 3, medio: 2 },
  "flat-white":{ medio: 2, leche: 2, medio: 2 },
  latte:       { suave: 2, leche: 3, grande: 2 },
  mocha:       { suave: 3, leche: 2, grande: 2 },
};

function SectionCata({ onOpenCafe }) {
  const [step, setStep] = useS(0); // 0..n-1, n = result, -1 = calculating
  const [tags, setTags] = useS({});
  const [saved, setSaved] = useS(false);
  const [calculating, setCalculating] = useS(false);

  const reset = () => {
    Sfx.click();
    setStep(0); setTags({}); setSaved(false); setCalculating(false);
  };

  const responder = (opt) => {
    Sfx.click();
    const next = { ...tags };
    for (const [k, v] of Object.entries(opt.value)) {
      next[k] = (next[k] || 0) + v;
    }
    setTags(next);
    if (step < PREGUNTAS.length - 1) setStep(step + 1);
    else {
      // Última pregunta: mostrar "Calculando" antes del resultado
      setCalculating(true);
      Sfx.grinder(1.6, 0.07);
      setTimeout(() => {
        setCalculating(false);
        setStep(PREGUNTAS.length);
        Sfx.bubble();
      }, 1800);
    }
  };

  const winner = useM(() => {
    if (step < PREGUNTAS.length) return null;
    let best = null, bestScore = -1;
    for (const cafe of CAFES) {
      const af = AFINIDADES[cafe.id] || {};
      let score = 0;
      for (const [k, v] of Object.entries(tags)) {
        score += (af[k] || 0) * v;
      }
      if (score > bestScore) { bestScore = score; best = cafe; }
    }
    return best;
  }, [step, tags]);

  const saveAsFav = () => {
    if (!winner) return;
    Sfx.bubble();
    try {
      const cur = JSON.parse(localStorage.getItem("gz-diario") || "{}");
      cur[winner.id] = { state: "fav", date: new Date().toISOString().slice(0, 10) };
      localStorage.setItem("gz-diario", JSON.stringify(cur));
      setSaved(true);
    } catch (e) {}
  };

  // Granos cayendo (memoizados para no re-render en cada tick)
  const fallingBeans = useM(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      left: (i * 13 + 5) % 100,
      size: 14 + (i % 4) * 6,
      delay: (i * 0.18) % 3.2,
      duration: 3.2 + (i % 5) * 0.45,
      rotate: (i * 47) % 360,
    }));
  }, []);

  return (
    <section className="gz-section gz-section-cata" id="cata">
      <SectionHead num="07" kicker="Cata" title={<>¿Qué café <em>sos</em>?</>}>
        Cuatro preguntas honestas. Al final, te decimos cuál de los ocho es tu match. Spoiler: no hay respuestas equivocadas.
      </SectionHead>

      <div className={`gz-cata-stage ${step >= PREGUNTAS.length ? "is-result" : ""}`}>
        {/* Granos cayendo de fondo solo en pantalla de resultado */}
        {step >= PREGUNTAS.length && (
          <div className="gz-cata-falling" aria-hidden="true">
            {fallingBeans.map((b, i) => (
              <img key={i} src="assets/bean.png" alt="" style={{
                left: `${b.left}%`,
                width: `${b.size}px`,
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.duration}s`,
                "--gz-bean-rot": `${b.rotate}deg`,
              }} />
            ))}
          </div>
        )}

        {calculating ? (
          <div className="gz-cata-calc" key="calc">
            <div className="gz-cata-calc-bean">
              <img src="assets/bean.png" alt="" />
            </div>
            <p className="gz-cata-calc-text">
              <span className="gz-cata-calc-pulse" />
              <em>Buscando tu match...</em>
            </p>
            <p className="gz-cata-calc-sub">moliendo respuestas · pesando notas · revisando intensidad</p>
          </div>
        ) : step < PREGUNTAS.length ? (
          <div className="gz-cata-q" key={step}>
            <div className="gz-cata-progress">
              {PREGUNTAS.map((_, i) => (
                <span key={i} className={`gz-cata-progress-dot ${i <= step ? "is-on" : ""}`} />
              ))}
              <span className="gz-cata-progress-text">
                Pregunta {step + 1} de {PREGUNTAS.length}
              </span>
            </div>
            <h3 className="gz-cata-question">{PREGUNTAS[step].q}</h3>
            <div className="gz-cata-opts">
              {PREGUNTAS[step].opts.map((opt, i) => (
                <button key={i} className="gz-cata-opt" onClick={() => responder(opt)}>
                  <span className="gz-cata-opt-letter">{String.fromCharCode(65 + i)}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="gz-cata-result" key="result">
            <div className="gz-cata-result-eyebrow">
              <span className="gz-cata-result-line" />
              <span>tu café</span>
              <span className="gz-cata-result-line" />
            </div>

            <h3 className="gz-cata-result-name">
              {winner?.name}
              <em>{winner?.italic}</em>
            </h3>

            {/* Ilustración SVG grande del café ganador */}
            <div className="gz-cata-result-art">
              <div className="gz-cata-result-art-glow" />
              <CafeIlustracion id={winner?.id} running={true} />
            </div>

            <p className="gz-cata-result-blurb">{winner?.blurb}</p>

            <div className="gz-cata-result-tags">
              {winner?.notas?.map((n) => <span key={n} className="gz-chip gz-chip-sm">{n}</span>)}
            </div>

            <div className="gz-cata-result-actions">
              <button className={`gz-cata-act gz-cata-act-primary ${saved ? "is-saved" : ""}`}
                onClick={saveAsFav} disabled={saved}>
                {saved ? "★ Guardado en tu diario" : "★ Guardar como favorito"}
              </button>
              <button className="gz-cata-act" onClick={() => { Sfx.click(); onOpenCafe?.(winner); }}>
                Ver receta completa →
              </button>
              <button className="gz-cata-act gz-cata-act-ghost" onClick={reset}>
                Hacer la cata otra vez
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 07 · GLOSARIO
// ════════════════════════════════════════════════════════════════════════════

function SectionGlosario() {
  const [q, setQ] = useS("");

  const filtered = useM(() => {
    const s = q.trim().toLowerCase();
    if (!s) return GLOSARIO;
    return GLOSARIO.filter(g => g.term.toLowerCase().includes(s) || g.def.toLowerCase().includes(s));
  }, [q]);

  // Agrupar por letra inicial
  const groups = useM(() => {
    const map = new Map();
    for (const g of filtered) {
      if (!map.has(g.letra)) map.set(g.letra, []);
      map.get(g.letra).push(g);
    }
    return [...map.entries()];
  }, [filtered]);

  const allLetters = useM(() => {
    const m = new Map();
    for (const g of GLOSARIO) m.set(g.letra, true);
    return [...m.keys()];
  }, []);

  const jumpToLetter = (letra) => {
    Sfx.click();
    const el = document.querySelector(`[data-glos-letter="${letra}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="gz-section gz-section-glosario" id="glosario">
      <SectionHead num="08" kicker="Glosario" title={<>El idioma <em>del café</em>.</>}>
        Diccionario abierto de términos que vas a escuchar en cualquier cafetería de especialidad. Buscalos, recórrelos por letra, o leelos como una página de revista.
      </SectionHead>

      <div className="gz-glos-toolbar">
        <div className="gz-glos-search">
          <span className="gz-glos-search-icon" aria-hidden="true">⌕</span>
          <input type="text"
            placeholder="Buscar un término…"
            value={q}
            onChange={(e) => setQ(e.target.value)} />
          {q && (
            <button className="gz-glos-search-clear" onClick={() => setQ("")} aria-label="Limpiar">×</button>
          )}
        </div>
        <div className="gz-glos-count">
          <strong>{filtered.length}</strong>
          <em>de {GLOSARIO.length} términos</em>
        </div>
      </div>

      {/* Mapa horizontal de letras disponibles */}
      <div className="gz-glos-letters" role="navigation" aria-label="Saltar a letra">
        {allLetters.map((letra) => {
          const has = groups.some(([l]) => l === letra);
          return (
            <button key={letra}
              className={`gz-glos-letter-btn ${has ? "is-active" : ""}`}
              onClick={() => has && jumpToLetter(letra)}
              disabled={!has}>
              {letra}
            </button>
          );
        })}
      </div>

      {/* Cuerpo del diccionario */}
      <div className="gz-glos-body">
        {groups.length === 0 ? (
          <div className="gz-glos-empty">
            <Bean size={60} variant="draw" color="var(--gz-paper)" swirlColor="var(--gz-gold)" duration={1400} />
            <p>No encontramos términos que coincidan con <em>"{q}"</em>.</p>
          </div>
        ) : groups.map(([letra, items]) => (
          <article key={letra} className="gz-glos-section" data-glos-letter={letra}>
            <aside className="gz-glos-sidemark">
              <span className="gz-glos-bigletter">{letra}</span>
              <span className="gz-glos-sidemark-meta">
                <em>{items.length}</em>
                {items.length === 1 ? "término" : "términos"}
              </span>
            </aside>
            <div className="gz-glos-entries">
              {items.map((g, i) => (
                <div key={g.term} className="gz-glos-entry"
                  style={{ animationDelay: `${i * 40}ms` }}>
                  <div className="gz-glos-entry-head">
                    <span className="gz-glos-entry-num">
                      {String(GLOSARIO.indexOf(g) + 1).padStart(2, "0")}
                    </span>
                    <h3 className="gz-glos-term">{g.term}</h3>
                    <span className="gz-glos-entry-pron">
                      <em>{letra.toLowerCase()}.</em>
                    </span>
                  </div>
                  <p className="gz-glos-def">{g.def}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 09 · DIARIO — passport del aprendiz cafetero
// ════════════════════════════════════════════════════════════════════════════

const NIVELES = [
  { min: 0, name: "Recién llegado",   italic: "novato sin sello", color: "#7C7060" },
  { min: 1, name: "Principiante",     italic: "primer sorbo",     color: "#9C8055" },
  { min: 3, name: "Curioso",          italic: "ya pide solo",     color: "#B9883D" },
  { min: 5, name: "Conocedor",        italic: "elige por origen", color: "#C8881F" },
  { min: 7, name: "Cafetero",         italic: "casi barista",     color: "#D69A3C" },
  { min: 8, name: "Maestro Cafetero", italic: "il maestro",       color: "#E0A95A" },
];

// Lee state como string ("probado"/"fav") o como object {state, date} (formato nuevo)
const readState = (v) => {
  if (!v) return null;
  if (typeof v === "string") return { state: v, date: null };
  return v;
};

// Genera un ID de carnet random pero estable por usuario
const getCarnetId = () => {
  let id = localStorage.getItem("gz-carnet-id");
  if (!id) {
    id = String(Math.floor(10000 + Math.random() * 89999));
    localStorage.setItem("gz-carnet-id", id);
  }
  return id;
};

const getCarnetSince = () => {
  let d = localStorage.getItem("gz-carnet-since");
  if (!d) {
    d = new Date().toISOString().slice(0, 10);
    localStorage.setItem("gz-carnet-since", d);
  }
  return d;
};

const fmtDate = (iso) => {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${parseInt(d)} ${meses[parseInt(m) - 1]}`;
};

function SectionDiario() {
  const [progress, setProgress] = useS(() => {
    try { return JSON.parse(localStorage.getItem("gz-diario") || "{}"); }
    catch (e) { return {}; }
  });
  const [carnetId] = useS(getCarnetId);
  const [since] = useS(getCarnetSince);

  useE(() => {
    localStorage.setItem("gz-diario", JSON.stringify(progress));
  }, [progress]);

  const toggle = (id, newState) => {
    Sfx.bubble();
    setProgress(p => {
      const current = readState(p[id]);
      const next = { ...p };
      if (current && current.state === newState) {
        // toggle off
        next[id] = null;
      } else {
        // set new state with date
        next[id] = { state: newState, date: new Date().toISOString().slice(0, 10) };
      }
      return next;
    });
  };

  const totals = useM(() => {
    const total = CAFES.length;
    let probados = 0, favs = 0;
    for (const c of CAFES) {
      const s = readState(progress[c.id]);
      if (s && (s.state === "probado" || s.state === "fav")) probados++;
      if (s && s.state === "fav") favs++;
    }
    const pct = Math.round((probados / total) * 100);
    const nivel = [...NIVELES].reverse().find(n => probados >= n.min) || NIVELES[0];
    return { total, probados, favs, pct, nivel };
  }, [progress]);

  const reset = () => {
    if (confirm("¿Borrar todos los sellos de tu diario? Esta acción no se puede deshacer.")) {
      Sfx.click();
      setProgress({});
    }
  };

  return (
    <section className="gz-section gz-section-diario" id="diario">
      <SectionHead num="09" kicker="Diario" title={<>Tu carnet <em>de aprendiz.</em></>}>
        Cada café que probás queda sellado en tu diario, junto con la fecha. Tu progreso se guarda solo, en tu dispositivo — sin cuentas, sin contraseñas.
      </SectionHead>

      {/* CARNET HERO */}
      <div className="gz-carnet" style={{ "--carnet-color": totals.nivel.color }}>
        <div className="gz-carnet-corner gz-carnet-corner-tl" />
        <div className="gz-carnet-corner gz-carnet-corner-tr" />
        <div className="gz-carnet-corner gz-carnet-corner-bl" />
        <div className="gz-carnet-corner gz-carnet-corner-br" />

        <div className="gz-carnet-head">
          <span className="gz-carnet-brand">GranoZero</span>
          <span className="gz-carnet-type">CARNET DE APRENDIZ</span>
          <span className="gz-carnet-num">N° {carnetId}</span>
        </div>

        <div className="gz-carnet-body">
          <div className="gz-carnet-photo">
            <div className="gz-carnet-photo-glow" />
            <img src="assets/bean.png" alt="" />
            <span className="gz-carnet-photo-corner gz-carnet-photo-corner-tl" />
            <span className="gz-carnet-photo-corner gz-carnet-photo-corner-tr" />
            <span className="gz-carnet-photo-corner gz-carnet-photo-corner-bl" />
            <span className="gz-carnet-photo-corner gz-carnet-photo-corner-br" />
          </div>

          <div className="gz-carnet-data">
            <div className="gz-carnet-field gz-carnet-field-name">
              <span className="gz-carnet-label">Nivel</span>
              <strong className="gz-carnet-value">
                {totals.nivel.name}
                <em>{totals.nivel.italic}</em>
              </strong>
            </div>
            <div className="gz-carnet-fields-row">
              <div className="gz-carnet-field">
                <span className="gz-carnet-label">Probados</span>
                <strong>{totals.probados}<small>/{totals.total}</small></strong>
              </div>
              <div className="gz-carnet-field">
                <span className="gz-carnet-label">Favoritos</span>
                <strong>{totals.favs}</strong>
              </div>
              <div className="gz-carnet-field">
                <span className="gz-carnet-label">Desde</span>
                <strong className="gz-carnet-since">{fmtDate(since)}</strong>
              </div>
            </div>
            <div className="gz-carnet-bar">
              <div className="gz-carnet-bar-fill" style={{ width: `${totals.pct}%` }} />
              <span className="gz-carnet-bar-text">{totals.pct}% del recorrido</span>
            </div>
          </div>
        </div>

        <div className="gz-carnet-foot">
          <div className="gz-carnet-foot-bars" aria-hidden="true">
            {Array.from({ length: 26 }).map((_, i) => (
              <span key={i} style={{ width: `${1 + (i % 3)}px`, opacity: 0.4 + (i % 4) * 0.15 }} />
            ))}
          </div>
          <span className="gz-carnet-foot-issued">EMITIDO POR GRANOZERO · vigente sin fecha</span>
        </div>
      </div>

      {/* GALERÍA DE SELLOS */}
      <div className="gz-stamps-head">
        <span className="gz-mini-label">Colección de sellos</span>
        <h3 className="gz-stamps-title">Tu galería <em>de cafés.</em></h3>
        <p className="gz-stamps-sub">
          Tocá un café para sellarlo. Tocalo otra vez para marcarlo como <em>favorito</em>. Una tercera vez lo borra.
        </p>
      </div>

      <div className="gz-stamps-grid">
        {CAFES.map((c, idx) => {
          const s = readState(progress[c.id]) || { state: null, date: null };
          return <StampCard key={c.id} cafe={c} state={s.state} date={s.date} idx={idx}
            onToggle={(next) => toggle(c.id, next)} />;
        })}
      </div>

      <div className="gz-diario-actions-bottom">
        <button className="gz-diario-reset" onClick={reset}>
          ↺ Borrar mi diario
        </button>
      </div>
    </section>
  );
}

function StampCard({ cafe, state, date, idx, onToggle }) {
  // El click hace ciclo: vacío → probado → fav → vacío
  const cycle = () => {
    if (!state) onToggle("probado");
    else if (state === "probado") onToggle("fav");
    else onToggle("fav"); // ya es fav → toggle off
  };

  const rotation = (idx * 7 - 12) % 9;
  return (
    <button
      className={`gz-stamp gz-stamp-${state || "empty"}`}
      style={{ "--stamp-rot": `${rotation}deg`, animationDelay: `${idx * 60}ms` }}
      onClick={cycle}>
      <svg viewBox="0 0 200 200" className="gz-stamp-svg" aria-hidden="true">
        <defs>
          <path id={`gz-stamp-circle-${cafe.id}-top`} d="M 100 100 m -68 0 a 68 68 0 0 1 136 0" />
          <path id={`gz-stamp-circle-${cafe.id}-bot`} d="M 100 100 m -68 0 a 68 68 0 0 0 136 0" />
        </defs>

        {/* Notches del sello postal (perforaciones) */}
        {Array.from({ length: 36 }).map((_, i) => {
          const angle = (i / 36) * Math.PI * 2;
          const x = 100 + Math.cos(angle) * 92;
          const y = 100 + Math.sin(angle) * 92;
          return <circle key={i} cx={x} cy={y} r="3.5" fill="var(--gz-ink)" />;
        })}

        {/* Círculo exterior */}
        <circle cx="100" cy="100" r="88" fill="none"
          stroke={state === "fav" ? "var(--gz-gold)" : state === "probado" ? "var(--gz-paper)" : "rgba(241,234,216,.2)"}
          strokeWidth="3" strokeDasharray={state ? "0" : "4 4"} />
        <circle cx="100" cy="100" r="78" fill="none"
          stroke={state === "fav" ? "var(--gz-gold)" : state === "probado" ? "var(--gz-paper)" : "rgba(241,234,216,.15)"}
          strokeWidth="1.2" />

        {/* Textos curvos */}
        <text className="gz-stamp-text-top" fill={state === "fav" ? "var(--gz-gold)" : state === "probado" ? "var(--gz-paper)" : "rgba(241,234,216,.4)"}>
          <textPath href={`#gz-stamp-circle-${cafe.id}-top`} startOffset="50%" textAnchor="middle">
            ★ {state === "fav" ? "FAVORITO" : state === "probado" ? "PROBADO" : "POR DESCUBRIR"} ★
          </textPath>
        </text>
        <text className="gz-stamp-text-bot" fill={state === "fav" ? "var(--gz-gold)" : state === "probado" ? "var(--gz-paper)" : "rgba(241,234,216,.4)"}>
          <textPath href={`#gz-stamp-circle-${cafe.id}-bot`} startOffset="50%" textAnchor="middle">
            {date ? fmtDate(date) : "—"} · GRANOZERO · 0{idx + 1}/0{CAFES.length}
          </textPath>
        </text>

        {/* Centro: ilustración del café simplificada (la primera mitad del CafeIlustracion sería demasiado grande, usamos un símbolo) */}
        <g transform="translate(100 100)">
          {/* Mini taza estilizada */}
          <ellipse cx="0" cy="-8" rx="32" ry="4" fill={state ? cafe.color : "rgba(241,234,216,.1)"} />
          <path d="M -32 -8 Q -28 30 -2 30 L 2 30 Q 28 30 32 -8" fill="none"
            stroke={state === "fav" ? "var(--gz-gold)" : state === "probado" ? "var(--gz-paper)" : "rgba(241,234,216,.3)"}
            strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M 32 -2 Q 46 0 44 14 Q 42 24 32 22" fill="none"
            stroke={state === "fav" ? "var(--gz-gold)" : state === "probado" ? "var(--gz-paper)" : "rgba(241,234,216,.3)"}
            strokeWidth="2" />
          {/* Estrella si es favorito */}
          {state === "fav" && (
            <path d="M 0 -28 L 4 -20 L 12 -19 L 6 -13 L 8 -5 L 0 -9 L -8 -5 L -6 -13 L -12 -19 L -4 -20 Z"
              fill="var(--gz-gold)" />
          )}
        </g>

        {/* Marca/firma del sello, levemente offset */}
        <text x="100" y="180" textAnchor="middle"
          fill={state === "fav" ? "var(--gz-gold)" : state === "probado" ? "rgba(241,234,216,.8)" : "rgba(241,234,216,.4)"}
          className="gz-stamp-name">
          {cafe.name}
        </text>
      </svg>

      {/* Etiqueta inferior */}
      <div className="gz-stamp-caption">
        <strong>{cafe.name}</strong>
        <em>{cafe.italic}</em>
      </div>
    </button>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// EXPORT
// ════════════════════════════════════════════════════════════════════════════

Object.assign(window, {
  SectionOrigen, SectionGrano, SectionTueste,
  SectionMolienda, SectionMetodos, SectionCata,
  SectionGlosario, SectionDiario
});
