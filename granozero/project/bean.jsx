// bean.jsx — el grano de Grano Zero, en variantes
// Variantes: 'outline' | 'solid' | 'draw' (línea dorada que se traza sola) | 'breathe'

function Bean({
  size = 64,
  color = "currentColor",
  stroke = 2.4,
  variant = "outline",
  swirlColor,
  swirlOnly = false,
  className = "",
  style = {},
  ariaLabel = "Grano de café",
  duration = 1800
}) {
  // viewBox 100 x 140
  const ovalPath = "M50 6 C 78 6, 94 36, 94 70 C 94 104, 78 134, 50 134 C 22 134, 6 104, 6 70 C 6 36, 22 6, 50 6 Z";
  const swirlPath = "M32 28 C 56 44, 48 70, 60 84 C 72 98, 60 118, 36 116";

  if (variant === "draw") {
    return (
      <svg viewBox="0 0 100 140" width={size} height={size * 1.4} className={className} style={style} aria-label={ariaLabel}>
        <path d={ovalPath} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
        style={{ strokeDasharray: 600, strokeDashoffset: 600, animation: `gz-draw ${duration}ms cubic-bezier(.6,.1,.3,1) forwards` }} />
        <path d={swirlPath} fill="none" stroke={swirlColor || color} strokeWidth={stroke * 0.9} strokeLinecap="round"
        style={{ strokeDasharray: 280, strokeDashoffset: 280, animation: `gz-draw ${duration}ms cubic-bezier(.6,.1,.3,1) forwards ${duration * 0.4}ms` }} />
      </svg>);

  }

  return (
    <svg viewBox="0 0 100 140" width={size} height={size * 1.4} className={className}
    style={{ ...style, transformOrigin: "50% 50%", height: "40px" }} aria-label={ariaLabel}>
      {!swirlOnly && (
      variant === "solid" ?
      <path d={ovalPath} fill={color} /> :
      <path d={ovalPath} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />)
      }
      <path d={swirlPath} fill="none" stroke={swirlColor || (variant === "solid" ? "rgba(0,0,0,.35)" : color)}
      strokeWidth={stroke * 0.9} strokeLinecap="round" />
    </svg>);

}

// Medidor de intensidad: 5 granos (rellenos según intensity 1..5)
function IntensityBeans({ intensity = 3, total = 5, size = 16, color = "var(--gz-gold)", muted = "var(--gz-coffee-30)", gap = 5 }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap }}>
      {Array.from({ length: total }).map((_, i) =>
      <Bean key={i} size={size} variant={i < intensity ? "solid" : "outline"}
      color={i < intensity ? color : muted} stroke={2} />
      )}
    </div>);

}

// Pequeña nube de vapor SVG con CSS keyframes
function Steam({ count = 3, height = 80, color = "rgba(255,255,255,.55)", delay = 0 }) {
  return (
    <div className="gz-steam" aria-hidden="true" style={{ height, position: "relative" }}>
      {Array.from({ length: count }).map((_, i) =>
      <svg key={i} viewBox="0 0 60 200" width="40" height={height * 2}
      style={{
        position: "absolute", left: `${i * 22 - 22}px`, bottom: 0,
        opacity: 0, transformOrigin: "30px 200px",
        animation: `gz-steam ${3200 + i * 450}ms ease-in-out ${delay + i * 380}ms infinite`
      }}>
          <path d="M30 195 C 18 170 40 150 28 120 C 18 90 42 70 30 40 C 22 18 38 8 30 0"
        fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" />
        </svg>
      )}
    </div>);

}

Object.assign(window, { Bean, IntensityBeans, Steam });