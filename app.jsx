// app.jsx — Grano Zero PWA
// Stages: splash → home → catalog (scroll) + detail sheet
// (las dependencias Bean, Steam, IntensityBeans, Sfx, CAFES viven en window)

const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const useSettled = (delay) => {
  const [done, setDone] = useState(false);
  useEffect(() => {const t = setTimeout(() => setDone(true), delay);return () => clearTimeout(t);}, [delay]);
  return done;
};

// ─── HEADER ──────────────────────────────────────────────────────────────────

function Header({ visible, soundOn, setSoundOn, ambientOn, setAmbientOn, onJumpCatalog, onOpenCata, currentSection }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`gz-header ${visible ? "is-visible" : ""} ${scrolled ? "is-scrolled" : ""}`}>
      <a className="gz-logo" href="#top" onClick={(e) => { e.preventDefault(); Sfx.click(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
        <img className="gz-logo-bean" src="assets/bean.png" alt="" aria-hidden="true" />
        <span className="gz-logo-text">
          <span className="gz-logo-text-grano">Grano</span><em>Zero</em>
        </span>
      </a>

      <div className="gz-controls">
        <button className="gz-header-cata-btn" onClick={() => { Sfx.bubble(); onOpenCata(); }}>
          <span>¿Qué café sos?</span>
        </button>
        <IconButton
          active={ambientOn}
          label={ambientOn ? "Apagar ambiente" : "Ambiente cafetería"}
          onClick={() => {
            const next = !ambientOn;
            setAmbientOn(next);
            if (next) Sfx.startAmbient();else Sfx.stopAmbient();
            Sfx.click();
          }}>
          {ambientOn ? <IconWaves /> : <IconWavesOff />}
        </IconButton>
        <IconButton
          active={soundOn}
          label={soundOn ? "Silenciar" : "Activar sonidos"}
          onClick={() => {
            const next = !soundOn;
            setSoundOn(next);
            Sfx.setMuted(!next);
            if (next) setTimeout(() => Sfx.click(), 50);
          }}>
          {soundOn ? <IconSound /> : <IconMute />}
        </IconButton>
      </div>
    </header>);
}

function IconButton({ children, onClick, label, active }) {
  return (
    <button className={`gz-icon-btn ${active ? "is-active" : ""}`} onClick={onClick} aria-label={label} title={label}>
      {children}
    </button>);

}
const IconSound = () =>
<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16 8a5 5 0 0 1 0 8" /><path d="M19 5a9 9 0 0 1 0 14" />
  </svg>;

const IconMute = () =>
<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M22 9l-6 6M16 9l6 6" />
  </svg>;

const IconWaves = () =>
<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 8c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
    <path d="M2 13c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
    <path d="M2 18c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
  </svg>;

const IconWavesOff = () =>
<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12h20" opacity="0.5" /><path d="M3 4l18 16" />
  </svg>;


// ─── SPLASH: café que se sirve y llena la pantalla ───────────────────────────

function Splash({ onDone }) {
  const [phase, setPhase] = useState(0);
  // 0: bean entra y respira → 1: wordmark aparece → 2: fade a home → 3: done

  useEffect(() => {
    Sfx.ensure();
    const tl = [
    [300, () => {Sfx.grinder(1.4, 0.08);}],
    [1100, () => setPhase(1)],
    [2200, () => setPhase(2)],
    [3000, () => {setPhase(3);onDone();}]];

    let acc = 0;const timers = [];
    tl.forEach(([d, fn]) => {acc += d;timers.push(setTimeout(fn, acc));});
    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase >= 3) return null;

  return (
    <div className={`gz-splash gz-splash-p${phase}`} aria-hidden={phase >= 2}>
      <div className="gz-splash-frame">
        <img className="gz-splash-bean" src="assets/bean.png" alt="" />
        <div className="gz-splash-wordmark">
          <span className="gz-splash-grano">Grano</span><em className="gz-splash-zero">Zero</em>
        </div>
        <div className="gz-splash-tagline">
          <span>una taza, ocho caminos</span>
        </div>
      </div>
      <div className="gz-curtain" />
    </div>);

}

// ─── HOME: hero con taza humeante ────────────────────────────────────────────

function Home({ onJumpCatalog }) {
  return (
    <section className="gz-home" id="top">
      <div className="gz-home-grid">
        <div className="gz-home-text">
          <h1 className="gz-headline">
            El café no debería <em>intimidarte.</em>
          </h1>
          <p className="gz-sub">
            Ocho preparaciones. Una taza. <br />
            Aprendé tomando — desde el grano hasta tu sorbo favorito.
          </p>
          <div className="gz-cta-row">
            <button className="gz-cta gz-cta-primary" onClick={() => {Sfx.bubble();onJumpCatalog();}}>
              Empezar el recorrido
              <span className="gz-cta-arrow">→</span>
            </button>
          </div>
        </div>

        <CenterpieceCup />
      </div>

      {/* Mesa de madera: apoyo visual de la taza y separador con Origen */}
      <div className="gz-hero-table" aria-hidden="true" />
    </section>);

}

function Stat({ n, label }) {
  return (
    <div className="gz-stat">
      <strong>{n}</strong>
      <span>{label}</span>
    </div>);

}

function CenterpieceCup() {
  return (
    <div className="gz-stage">
      <div className="gz-stage-cupwrap">
      <div className="gz-stage-steam" aria-hidden="true">
        <Steam count={4} height={70} color="rgba(241,234,216,.5)" delay={400} />
      </div>
      <svg className="gz-stage-cup" viewBox="0 0 320 280" style={{ width: "100%", height: "auto" }} aria-hidden="true">
        <defs>
          <radialGradient id="liquid" cx="50%" cy="35%">
            <stop offset="0" stopColor="#5C3A1F" />
            <stop offset="0.7" stopColor="#3A2418" />
            <stop offset="1" stopColor="#1F1410" />
          </radialGradient>
          <linearGradient id="cer" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#F8F2E4" />
            <stop offset="1" stopColor="#D8CDB3" />
          </linearGradient>
        </defs>
        {/* Plato */}
        <ellipse cx="160" cy="248" rx="140" ry="14" fill="#000" opacity=".22" />
        <ellipse cx="160" cy="242" rx="135" ry="16" fill="url(#cer)" stroke="#3a2418" strokeWidth="2" />
        <ellipse cx="160" cy="236" rx="110" ry="10" fill="#E6DABE" />
        {/* Asa */}
        <path d="M250 130 Q 300 140 290 180 Q 282 215 245 210" fill="none" stroke="url(#cer)" strokeWidth="14" strokeLinecap="round" />
        <path d="M250 130 Q 300 140 290 180 Q 282 215 245 210" fill="none" stroke="#3a2418" strokeWidth="2" strokeLinecap="round" />
        {/* Cuerpo taza */}
        <path d="M60 120 L260 120 Q 250 230 175 230 L145 230 Q 70 230 60 120 Z" fill="url(#cer)" stroke="#3a2418" strokeWidth="2.5" />
        {/* Café */}
        <ellipse cx="160" cy="120" rx="100" ry="14" fill="url(#liquid)" />
        <ellipse cx="160" cy="120" rx="100" ry="14" fill="none" stroke="#3a2418" strokeWidth="1.5" opacity=".5" />
        {/* Crema swirl */}
        <path className="gz-crema-swirl" d="M90 120 Q 120 112 160 120 Q 200 128 230 120"
          fill="none" stroke="#C8881F" strokeWidth="2" opacity=".7" />
        {/* Brillito */}
        <ellipse cx="120" cy="118" rx="14" ry="3" fill="#C8881F" opacity=".4" />
      </svg>
      </div>

      {/* Granos reales decorativos alrededor */}
      <div className="gz-stage-deco">
        {[
        { x: "4%", y: "16%", r: -22, s: 50, op: .5 },
        { x: "10%", y: "74%", r: 18, s: 40, op: .38 },
        { x: "86%", y: "72%", r: -10, s: 46, op: .45 },
        { x: "84%", y: "18%", r: 40, s: 42, op: .38 }].
        map((d, i) =>
        <img key={i} className="gz-stage-bean" src="assets/bean.png" alt="" aria-hidden="true" style={{
          width: `${d.s}px`,
          left: d.x, top: d.y,
          opacity: d.op,
          "--breathe-base": `rotate(${d.r}deg)`,
          animation: `gz-breathe ${3000 + i * 350}ms ease-in-out ${i * 200}ms infinite`
        }} />
        )}
      </div>
    </div>);

}

// (función _OldCenterpiece eliminada — ahora CenterpieceCup ES la versión CSS/SVG)
function _Unused() { return null; }

// ─── CATÁLOGO ────────────────────────────────────────────────────────────────

// ─── CATÁLOGO ──────────────────────────────────────────────────────────────────────────

function Catalog({ onOpen, refEl }) {
  return (
    <section className="gz-catalog" ref={refEl} id="catalogo">
      <header className="gz-shead">
        <div className="gz-section-num">03 — Catálogo</div>
        <h2 className="gz-shead-title">
          Ocho formas de <em>decir café</em>.
        </h2>
        <p className="gz-shead-sub">
          Cada café es una receta distinta sobre la misma idea: agua y grano. Tocá cualquier lámina para ver la receta completa.
        </p>
      </header>

      <div className="gz-catgrid">
        {CAFES.map((c, i) =>
          <CafeCard key={c.id} cafe={c} idx={i} onOpen={onOpen} />
        )}
      </div>
    </section>);
}

function CafeCard({ cafe, idx, onOpen }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      className="gz-catcard"
      style={{ "--cafe-color": cafe.color, animationDelay: `${idx * 60}ms` }}
      onMouseEnter={() => { setHover(true); Sfx.click(0.05); }}
      onMouseLeave={() => setHover(false)}
      onClick={() => { Sfx.bubble(); onOpen(cafe); }}>
      
      <div className="gz-catcard-art">
        <div className="gz-catcard-art-corner gz-catcard-art-corner-tl" />
        <div className="gz-catcard-art-corner gz-catcard-art-corner-tr" />
        <div className="gz-catcard-art-corner gz-catcard-art-corner-bl" />
        <div className="gz-catcard-art-corner gz-catcard-art-corner-br" />
        <div className="gz-catcard-fig">FIG. {String(idx + 1).padStart(2, "0")}</div>
        <CafeIlustracion id={cafe.id} running={hover} />
      </div>

      <div className="gz-catcard-meta">
        <h3 className="gz-catcard-title">
          {cafe.name} <em>{cafe.italic}</em>
        </h3>
        <p className="gz-catcard-tag">{cafe.tag}</p>
        <div className="gz-catcard-footer">
          <div className="gz-catcard-intensity">
            <span className="gz-catcard-intensity-label">Intensidad</span>
            <IntensityBeansImg intensity={cafe.intensity} />
          </div>
          <span className="gz-catcard-arrow">→</span>
        </div>
      </div>
    </button>);
}

// ─── DETALLE ─────────────────────────────────────────────────────────────────

function Detail({ cafe, onClose }) {
  useEffect(() => {
    if (!cafe) return;
    const onEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {window.removeEventListener("keydown", onEsc);document.body.style.overflow = "";};
  }, [cafe, onClose]);

  if (!cafe) return null;
  const idx = CAFES.findIndex(c => c.id === cafe.id);
  return (
    <div className="gz-sheet-wrap" onClick={(e) => {if (e.target === e.currentTarget) {Sfx.click();onClose();}}}>
      <div className="gz-sheet" style={{ "--cafe-color": cafe.color }}>
        <button className="gz-sheet-close" onClick={() => {Sfx.click();onClose();}} aria-label="Cerrar">×</button>

        <div className="gz-sheet-hero-art">
          <div className="gz-sheet-hero-corner gz-sheet-hero-corner-tl" />
          <div className="gz-sheet-hero-corner gz-sheet-hero-corner-tr" />
          <div className="gz-sheet-hero-corner gz-sheet-hero-corner-bl" />
          <div className="gz-sheet-hero-corner gz-sheet-hero-corner-br" />
          <div className="gz-sheet-fig">FIG. {String(idx + 1).padStart(2, "0")} · de {CAFES.length}</div>
          <CafeIlustracion id={cafe.id} running={true} />
        </div>

        <div className="gz-sheet-content">
          <div className="gz-section-num">Receta</div>
          <h2 className="gz-sheet-title">
            {cafe.name} <em>{cafe.italic}</em>
          </h2>
          <p className="gz-sheet-blurb">{cafe.blurb}</p>

          <div className="gz-sheet-body">
            <div className="gz-sheet-stats">
              <StatBar label="Intensidad" value={cafe.intensity} />
              <StatBar label="Cuerpo" value={cafe.body} />
              <StatBar label="Acidez" value={cafe.acidez} />
              <StatBar label="Dulzor" value={cafe.dulzor} />
            </div>

            <div className="gz-sheet-notes">
              <div className="gz-sheet-label">Notas</div>
              <div className="gz-chips">
                {cafe.notas.map((n) => <span key={n} className="gz-chip">{n}</span>)}
              </div>
            </div>

            <div className="gz-sheet-recipe">
              <div className="gz-sheet-label">Preparación</div>
              <ol>
                {cafe.receta.map((step, i) =>
                  <li key={i}><span className="gz-step-num">{i + 1}</span>{step}</li>
                )}
              </ol>
            </div>

            <div className="gz-sheet-data">
              <DataCell label="Ratio" value={cafe.ratio} />
              <DataCell label="Temp." value={cafe.temp} />
              <DataCell label="Tiempo" value={cafe.time} />
            </div>
          </div>
        </div>
      </div>
    </div>);
}

function StatBar({ label, value }) {
  return (
    <div className="gz-statbar">
      <div className="gz-statbar-head">
        <span>{label}</span>
        <span className="gz-statbar-val">{value}/5</span>
      </div>
      <IntensityBeans intensity={value} size={14} color="var(--gz-gold)" muted="rgba(241,234,216,.18)" />
    </div>);

}

function DataCell({ label, value }) {
  return (
    <div className="gz-datacell">
      <span className="gz-datacell-label">{label}</span>
      <strong className="gz-datacell-value">{value}</strong>
    </div>);

}

// ─── CATA MODAL ──────────────────────────────────────────────────────────────

function CataModal({ open, onClose, onOpenCafe }) {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onEsc); document.body.style.overflow = ""; };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="gz-cata-modal-wrap" onClick={(e) => { if (e.target === e.currentTarget) { Sfx.click(); onClose(); } }}>
      <div className="gz-cata-modal">
        <button className="gz-cata-modal-close" onClick={() => { Sfx.click(); onClose(); }} aria-label="Cerrar">×</button>
        <div className="gz-cata-modal-head">
          <div className="gz-section-num">¿Qué café sos?</div>
          <p>Cuatro preguntas honestas. Al final, te decimos cuál de los ocho es tu match. Spoiler: no hay respuestas equivocadas.</p>
        </div>
        <CataQuiz onOpenCafe={(cafe) => { onOpenCafe(cafe); onClose(); }} />
      </div>
    </div>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────────────────

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#1F1410", "#C8881F", "#F1EAD8"],
  "intro": "pour",
  "ambientOnStart": false,
  "soundOnStart": true,
  "breatheSpeed": 1
} /*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [stage, setStage] = useState("splash"); // splash | app
  const [selected, setSelected] = useState(null);
  const [cataOpen, setCataOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(t.soundOnStart);
  const [ambientOn, setAmbientOn] = useState(t.ambientOnStart);
  const catalogRef = useRef(null);

  useEffect(() => {Sfx.setMuted(!soundOn);}, [soundOn]);

  // Aplicar paleta
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--gz-ink", t.palette[0]);
    root.style.setProperty("--gz-gold", t.palette[1]);
    root.style.setProperty("--gz-paper", t.palette[2]);
    root.style.setProperty("--gz-breathe-speed", t.breatheSpeed);
  }, [t.palette, t.breatheSpeed]);

  const jumpCatalog = useCallback(() => {
    document.getElementById("origen")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <Splash onDone={() => {
        setStage("app");
        if (ambientOn) Sfx.startAmbient();
      }} />

      <Header
        visible={stage === "app"}
        soundOn={soundOn} setSoundOn={setSoundOn}
        ambientOn={ambientOn} setAmbientOn={setAmbientOn}
        onJumpCatalog={jumpCatalog}
        onOpenCata={() => { Sfx.click(); setCataOpen(true); }} />
      

      <main className={`gz-main ${stage === "app" ? "is-ready" : ""}`}>
        <Home onJumpCatalog={jumpCatalog} />
        <SectionOrigen />
        <SectionMetodos />
        <Catalog onOpen={setSelected} refEl={catalogRef} />
        <SectionGrano />
        <SectionTueste />
        <SectionMolienda />
        <Footer onOpenCata={() => setCataOpen(true)} />
      </main>

      <Dock visible={stage === "app"} />

      <Detail cafe={selected} onClose={() => setSelected(null)} />

      <CataModal open={cataOpen} onClose={() => setCataOpen(false)} onOpenCafe={setSelected} />

      <TweaksPanel>
        <TweakSection label="Paleta" />
        <TweakColor label="Tonos" value={t.palette}
        options={[
        ["#1F1410", "#C8881F", "#F1EAD8"],
        ["#0E0907", "#D69A3C", "#EDE2C8"],
        ["#2A1810", "#8B5E2B", "#F5EFE0"],
        ["#1A0F0A", "#B98B3A", "#FAF3DF"],
        ["#1F1410", "#7C4A20", "#F1EAD8"]]
        }
        onChange={(v) => setTweak("palette", v)} />

        <TweakSection label="Audio" />
        <TweakToggle label="Sonidos UI al cargar" value={t.soundOnStart}
        onChange={(v) => {setTweak("soundOnStart", v);setSoundOn(v);}} />
        <TweakToggle label="Ambiente cafetería al cargar" value={t.ambientOnStart}
        onChange={(v) => {setTweak("ambientOnStart", v);setAmbientOn(v);if (v) Sfx.startAmbient();else Sfx.stopAmbient();}} />
        <TweakButton label="Probar molinillo" onClick={() => Sfx.grinder()} />
        <TweakButton label="Probar burbujeo" onClick={() => Sfx.bubble()} />

        <TweakSection label="Animación" />
        <TweakSlider label="Velocidad respirado" value={t.breatheSpeed}
        min={0.5} max={2} step={0.1}
        onChange={(v) => setTweak("breatheSpeed", v)} />
        <TweakButton label="Volver a ver splash" onClick={() => {setStage("splash");setTimeout(() => location.reload(), 100);}} />
      </TweaksPanel>
    </>);

}

function Footer({ onOpenCata }) {
  const sections = [
    { id: "top",      n: "00", label: "Inicio" },
    { id: "origen",   n: "01", label: "Origen" },
    { id: "metodos",  n: "02", label: "Métodos" },
    { id: "catalogo", n: "03", label: "Catálogo" },
    { id: "grano",    n: "04", label: "El Grano" },
    { id: "tueste",   n: "05", label: "Tueste" },
    { id: "molienda", n: "06", label: "Molienda" },
  ];
  const jump = (id) => {
    Sfx.click();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <footer className="gz-footer">
      {/* Wordmark gigante de cierre */}
      <div className="gz-footer-wordmark" aria-hidden="true">
        <span>Grano</span><em>Zero</em>
      </div>

      <div className="gz-footer-grid">
        {/* Columna 1: brand */}
        <div className="gz-footer-col gz-footer-col-brand">
          <img src="assets/bean.png" alt="" className="gz-footer-bean" />
          <p className="gz-footer-tagline">
            Aprender café, <em>un sorbo a la vez.</em>
          </p>
          <p className="gz-footer-desc">
            Una PWA educativa hecha para que dejes de pedir “lo más suave que tengan”.
          </p>
        </div>

        {/* Columna 2: indice de secciones */}
        <div className="gz-footer-col">
          <span className="gz-footer-coltitle">Índice</span>
          <ul className="gz-footer-nav">
            {sections.map(s => (
              <li key={s.id}>
                <button onClick={() => jump(s.id)}>
                  <span className="gz-footer-nav-n">{s.n}</span>
                  <span>{s.label}</span>
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => { Sfx.click(); onOpenCata?.(); }}>
                <span className="gz-footer-nav-n">★</span>
                <span>¿Qué café sos?</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Columna 4: meta */}
        <div className="gz-footer-col gz-footer-col-meta">
          <span className="gz-footer-coltitle">Colofón</span>
          <p className="gz-footer-quote">
            <span className="gz-footer-mark">“</span>
            El café es lengua. Apréndelo, y probá el mundo en una taza.
          </p>
          <div className="gz-footer-meta-row">
            <span className="gz-footer-year">© {new Date().getFullYear()} · GranoZero</span>
          </div>
        </div>
      </div>

      {/* Linea final */}
      <div className="gz-footer-bottom">
        <span className="gz-footer-bottom-line" />
        <span>Hecho con café · desde el grano hasta tu pantalla</span>
        <span className="gz-footer-bottom-line" />
      </div>
    </footer>);
}

// Granos rellenos = bean.png; granos vacios = bean.png con baja opacidad
function IntensityBeansImg({ intensity = 3, total = 5 }) {
  return (
    <div className="gz-intensity-row">
      {Array.from({ length: total }).map((_, i) =>
      <img key={i} className={`gz-intensity-bean ${i < intensity ? "is-on" : ""}`} src="assets/bean.png" alt="" aria-hidden="true" />
      )}
    </div>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);