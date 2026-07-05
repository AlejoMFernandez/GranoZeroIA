// dock.jsx — navegación lateral con scroll-spy

const SECTIONS = [
  { id: "top",       label: "Inicio",    short: "00" },
  { id: "origen",    label: "Origen",    short: "01" },
  { id: "grano",     label: "El Grano",  short: "02" },
  { id: "tueste",    label: "Tueste",    short: "03" },
  { id: "molienda",  label: "Molienda",  short: "04" },
  { id: "metodos",   label: "Métodos",   short: "05" },
  { id: "catalogo",  label: "Catálogo",  short: "06" },
  { id: "cata",      label: "Cata",      short: "07" },
  { id: "glosario",  label: "Glosario",  short: "08" },
  { id: "diario",    label: "Diario",    short: "09" },
];

function Dock({ visible }) {
  const [active, setActive] = React.useState("top");
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    if (!visible) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY + window.innerHeight * 0.35;
        let current = "top";
        for (const s of SECTIONS) {
          const el = document.getElementById(s.id);
          if (el && el.offsetTop <= y) current = s.id;
        }
        setActive(current);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [visible]);

  const jump = (id) => {
    Sfx.click();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!visible) return null;

  return (
    <nav
      className={`gz-dock ${expanded ? "is-expanded" : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      aria-label="Navegación de secciones">
      <ul className="gz-dock-list">
        {SECTIONS.map((s) => (
          <li key={s.id} className={`gz-dock-item ${active === s.id ? "is-active" : ""}`}>
            <button onClick={() => jump(s.id)}>
              <span className="gz-dock-num">{s.short}</span>
              <span className="gz-dock-line" />
              <span className="gz-dock-label">{s.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

window.Dock = Dock;
