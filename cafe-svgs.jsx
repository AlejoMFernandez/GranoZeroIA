// cafe-svgs.jsx — ilustraciones únicas por café, estilo "lámina técnica" como Métodos.
// viewBox 300x300, líneas finas en var(--gz-paper), café en var(--gz-coffee), acentos en var(--gz-gold).

function CafeIlustracion({ id, running }) {
  const cls = `gz-cil ${running ? "is-running" : ""}`;

  // ─── 01 ESPRESSO ───────────────────────────────────────────────────────────
  if (id === "espresso") {
    return (
      <svg viewBox="0 0 300 300" className={cls}>
        <defs>
          <linearGradient id="esp-crema" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E0A95A" />
            <stop offset="1" stopColor="#C8881F" />
          </linearGradient>
        </defs>
        {/* Vapor */}
        <g className="gz-cil-steam-g">
          <path className="gz-cil-steam gz-st-1" d="M 130 70 Q 124 55 132 38" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".5" />
          <path className="gz-cil-steam gz-st-2" d="M 150 65 Q 156 48 148 32" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".5" />
          <path className="gz-cil-steam gz-st-3" d="M 170 70 Q 176 55 168 38" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".5" />
        </g>
        {/* Taza demitasse */}
        <ellipse cx="150" cy="100" rx="58" ry="8" fill="none" stroke="var(--gz-paper)" strokeWidth="1.6" />
        <path d="M 92 100 Q 96 178 150 178 Q 204 178 208 100" fill="none" stroke="var(--gz-paper)" strokeWidth="1.8" />
        {/* Café líquido + crema tiger-stripes */}
        <ellipse cx="150" cy="100" rx="55" ry="6" fill="var(--gz-coffee)" />
        <ellipse cx="150" cy="100" rx="55" ry="6" fill="url(#esp-crema)" opacity=".85" />
        <path d="M 105 100 Q 130 96 150 100 Q 170 104 195 100" fill="none" stroke="var(--gz-coffee)" strokeWidth="1.2" opacity=".7" />
        <path d="M 115 102 Q 135 99 155 102" fill="none" stroke="var(--gz-coffee)" strokeWidth="0.8" opacity=".5" />
        {/* Asa */}
        <path d="M 208 110 Q 240 116 238 148 Q 232 175 210 170" fill="none" stroke="var(--gz-paper)" strokeWidth="1.8" />
        {/* Plato cuadrado */}
        <rect x="78" y="194" width="144" height="12" rx="2" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" />
        <line x1="86" y1="200" x2="214" y2="200" stroke="var(--gz-paper)" strokeWidth="0.6" opacity=".5" />
        {/* Cucharita */}
        <path d="M 230 208 L 268 220" stroke="var(--gz-paper)" strokeWidth="1.2" opacity=".55" />
        <ellipse cx="232" cy="206" rx="5" ry="3" fill="var(--gz-paper)" opacity=".25" stroke="var(--gz-paper)" strokeWidth="1" />
        {/* Cota técnica */}
        <line x1="245" y1="100" x2="245" y2="178" stroke="var(--gz-gold)" strokeWidth="0.6" opacity=".5" />
        <line x1="241" y1="100" x2="249" y2="100" stroke="var(--gz-gold)" strokeWidth="0.6" opacity=".5" />
        <line x1="241" y1="178" x2="249" y2="178" stroke="var(--gz-gold)" strokeWidth="0.6" opacity=".5" />
        <text x="254" y="142" fill="var(--gz-gold)" fontSize="9" fontFamily="var(--mono)" opacity=".6">30ml</text>
        {/* Granos decorativos */}
        <g opacity=".3">
          <ellipse cx="48" cy="230" rx="7" ry="10" fill="var(--gz-paper)" transform="rotate(-25 48 230)" />
          <path d="M 44 225 Q 50 232 48 240" stroke="var(--gz-gold)" strokeWidth="0.8" fill="none" />
        </g>
      </svg>
    );
  }

  // ─── 02 RISTRETTO ──────────────────────────────────────────────────────────
  if (id === "ristretto") {
    return (
      <svg viewBox="0 0 300 300" className={cls}>
        <defs>
          <linearGradient id="ris-crema" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#D69A3C" />
            <stop offset="1" stopColor="#9C6E3F" />
          </linearGradient>
        </defs>
        {/* Vapor más sutil */}
        <path className="gz-cil-steam gz-st-1" d="M 140 95 Q 134 78 142 62" fill="none" stroke="var(--gz-paper)" strokeWidth="1.2" strokeLinecap="round" opacity=".4" />
        <path className="gz-cil-steam gz-st-2" d="M 160 95 Q 166 78 158 62" fill="none" stroke="var(--gz-paper)" strokeWidth="1.2" strokeLinecap="round" opacity=".4" />
        {/* Taza aún más pequeña, paredes gruesas */}
        <ellipse cx="150" cy="120" rx="44" ry="6" fill="none" stroke="var(--gz-paper)" strokeWidth="1.8" />
        <path d="M 106 120 Q 110 178 150 178 Q 190 178 194 120" fill="none" stroke="var(--gz-paper)" strokeWidth="2.2" />
        {/* Espesor de las paredes */}
        <path d="M 110 124 Q 113 175 150 175 Q 187 175 190 124" fill="none" stroke="var(--gz-paper)" strokeWidth="1" opacity=".5" />
        {/* Líquido — menos volumen, más denso */}
        <ellipse cx="150" cy="120" rx="40" ry="4" fill="var(--gz-ink)" />
        <ellipse cx="150" cy="120" rx="40" ry="4" fill="url(#ris-crema)" opacity=".95" />
        {/* Tiger stripes pronunciados */}
        <path d="M 118 120 Q 134 116 150 120 Q 166 124 182 120" fill="none" stroke="var(--gz-coffee)" strokeWidth="1.4" opacity=".8" />
        <path d="M 125 122 Q 140 119 155 122" fill="none" stroke="var(--gz-coffee)" strokeWidth="1" opacity=".6" />
        <path d="M 135 121 Q 145 119 155 121" fill="none" stroke="var(--gz-coffee)" strokeWidth="0.7" opacity=".5" />
        {/* Asa pequeña */}
        <path d="M 194 130 Q 220 134 218 158 Q 214 175 196 172" fill="none" stroke="var(--gz-paper)" strokeWidth="1.8" />
        {/* Plato */}
        <ellipse cx="150" cy="200" rx="78" ry="7" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" />
        <ellipse cx="150" cy="200" rx="68" ry="4" fill="none" stroke="var(--gz-paper)" strokeWidth="0.7" opacity=".5" />
        {/* Cota: 18ml */}
        <line x1="232" y1="120" x2="232" y2="178" stroke="var(--gz-gold)" strokeWidth="0.6" opacity=".5" />
        <line x1="228" y1="120" x2="236" y2="120" stroke="var(--gz-gold)" strokeWidth="0.6" opacity=".5" />
        <line x1="228" y1="178" x2="236" y2="178" stroke="var(--gz-gold)" strokeWidth="0.6" opacity=".5" />
        <text x="242" y="152" fill="var(--gz-gold)" fontSize="9" fontFamily="var(--mono)" opacity=".6">18ml</text>
        <text x="60" y="244" fill="var(--gz-paper)" fontSize="9" fontFamily="var(--brand)" fontStyle="italic" opacity=".4">il breve</text>
      </svg>
    );
  }

  // ─── 03 AMERICANO ──────────────────────────────────────────────────────────
  if (id === "americano") {
    return (
      <svg viewBox="0 0 300 300" className={cls}>
        {/* Vapor */}
        <path className="gz-cil-steam gz-st-1" d="M 138 50 Q 132 32 140 16" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".45" />
        <path className="gz-cil-steam gz-st-2" d="M 160 50 Q 166 32 158 16" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".45" />
        {/* Taza grande, recta */}
        <ellipse cx="150" cy="80" rx="62" ry="9" fill="none" stroke="var(--gz-paper)" strokeWidth="1.8" />
        <path d="M 88 80 Q 90 215 150 215 Q 210 215 212 80" fill="none" stroke="var(--gz-paper)" strokeWidth="1.8" />
        {/* Café — alto y diluido */}
        <ellipse cx="150" cy="80" rx="60" ry="7" fill="var(--gz-coffee-light, #5C3A1F)" opacity=".9" />
        <path d="M 90 82 Q 92 215 150 215 Q 208 215 210 82" fill="var(--gz-coffee-light, #5C3A1F)" opacity=".7" />
        {/* Cremita superior */}
        <ellipse cx="150" cy="80" rx="58" ry="5" fill="var(--gz-gold-soft, #D6A24A)" opacity=".4" />
        {/* Burbujas chiquitas en el borde */}
        <circle cx="105" cy="82" r="1.5" fill="var(--gz-paper)" opacity=".35" />
        <circle cx="112" cy="80" r="1" fill="var(--gz-paper)" opacity=".35" />
        <circle cx="190" cy="81" r="1.2" fill="var(--gz-paper)" opacity=".35" />
        {/* Asa grande */}
        <path d="M 212 100 Q 250 110 248 160 Q 240 200 214 195" fill="none" stroke="var(--gz-paper)" strokeWidth="1.8" />
        <path d="M 212 100 Q 250 110 248 160 Q 240 200 214 195" fill="none" stroke="var(--gz-paper)" strokeWidth="0.7" opacity=".5" />
        {/* Plato */}
        <ellipse cx="150" cy="232" rx="92" ry="8" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" />
        {/* Cota 150ml */}
        <line x1="240" y1="80" x2="240" y2="215" stroke="var(--gz-gold)" strokeWidth="0.6" opacity=".5" />
        <line x1="236" y1="80" x2="244" y2="80" stroke="var(--gz-gold)" strokeWidth="0.6" opacity=".5" />
        <line x1="236" y1="215" x2="244" y2="215" stroke="var(--gz-gold)" strokeWidth="0.6" opacity=".5" />
        <text x="250" y="152" fill="var(--gz-gold)" fontSize="9" fontFamily="var(--mono)" opacity=".6">150ml</text>
      </svg>
    );
  }

  // ─── 04 CORTADO ────────────────────────────────────────────────────────────
  if (id === "cortado") {
    return (
      <svg viewBox="0 0 300 300" className={cls}>
        {/* Vapor */}
        <path className="gz-cil-steam gz-st-1" d="M 140 80 Q 136 60 142 42" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".45" />
        <path className="gz-cil-steam gz-st-2" d="M 160 80 Q 164 60 158 42" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".45" />
        {/* Vaso gibraltar — paredes rectas, sin asa */}
        <ellipse cx="150" cy="105" rx="48" ry="7" fill="none" stroke="var(--gz-paper)" strokeWidth="1.6" />
        <path d="M 102 105 L 108 215 Q 110 222 150 222 Q 190 222 192 215 L 198 105" fill="none" stroke="var(--gz-paper)" strokeWidth="1.6" />
        {/* Capa superior — microespuma blanca delgada */}
        <ellipse cx="150" cy="105" rx="46" ry="6" fill="#F8F2E4" opacity=".82" />
        {/* Capa de café+leche debajo (caramelo) */}
        <path d="M 104 110 Q 105 130 113 130 L 187 130 Q 195 130 196 110 Z" fill="#9A6936" opacity=".88" />
        {/* Capa de espresso debajo */}
        <path d="M 113 130 L 118 215 Q 120 220 150 220 Q 180 220 182 215 L 187 130 Z" fill="var(--gz-coffee)" />
        {/* Línea curva swirl leche */}
        <path d="M 116 108 Q 130 102 150 108 Q 170 114 184 108" fill="none" stroke="#5C3A1F" strokeWidth="1" opacity=".4" />
        {/* Plato vacío */}
        <ellipse cx="150" cy="238" rx="68" ry="6" fill="none" stroke="var(--gz-paper)" strokeWidth="1.2" opacity=".7" />
        {/* Etiquetas */}
        <text x="220" y="118" fill="var(--gz-gold)" fontSize="8" fontFamily="var(--mono)" opacity=".55">espuma</text>
        <text x="220" y="155" fill="var(--gz-gold)" fontSize="8" fontFamily="var(--mono)" opacity=".55">leche</text>
        <text x="220" y="190" fill="var(--gz-gold)" fontSize="8" fontFamily="var(--mono)" opacity=".55">espresso</text>
        <line x1="200" y1="106" x2="216" y2="115" stroke="var(--gz-gold)" strokeWidth="0.5" opacity=".5" />
        <line x1="200" y1="128" x2="216" y2="152" stroke="var(--gz-gold)" strokeWidth="0.5" opacity=".5" />
        <line x1="200" y1="170" x2="216" y2="187" stroke="var(--gz-gold)" strokeWidth="0.5" opacity=".5" />
      </svg>
    );
  }

  // ─── 05 CAPPUCCINO ─────────────────────────────────────────────────────────
  if (id === "cappuccino") {
    return (
      <svg viewBox="0 0 300 300" className={cls}>
        {/* Vapor */}
        <path className="gz-cil-steam gz-st-1" d="M 130 60 Q 124 40 132 22" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".5" />
        <path className="gz-cil-steam gz-st-2" d="M 152 56 Q 158 36 150 18" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".5" />
        <path className="gz-cil-steam gz-st-3" d="M 174 60 Q 180 40 172 22" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".5" />
        {/* Taza ancha baja */}
        <ellipse cx="150" cy="100" rx="74" ry="10" fill="none" stroke="var(--gz-paper)" strokeWidth="1.8" />
        <path d="M 76 100 Q 80 200 150 200 Q 220 200 224 100" fill="none" stroke="var(--gz-paper)" strokeWidth="1.8" />
        {/* Domo de foam blanco */}
        <path d="M 80 100 Q 90 78 150 78 Q 210 78 220 100" fill="#F8F2E4" />
        <path d="M 80 100 Q 90 78 150 78 Q 210 78 220 100" fill="none" stroke="var(--gz-paper)" strokeWidth="0.8" opacity=".5" />
        {/* Líquido debajo del foam (visible por los laterales) */}
        <ellipse cx="150" cy="100" rx="70" ry="9" fill="var(--gz-coffee)" />
        <path d="M 80 100 Q 90 78 150 78 Q 210 78 220 100" fill="#F8F2E4" />
        {/* Polvo de cacao */}
        <circle cx="120" cy="86" r="1" fill="var(--gz-coffee)" opacity=".5" />
        <circle cx="135" cy="82" r="1.4" fill="var(--gz-coffee)" opacity=".55" />
        <circle cx="150" cy="80" r="1.2" fill="var(--gz-coffee)" opacity=".6" />
        <circle cx="165" cy="83" r="1" fill="var(--gz-coffee)" opacity=".5" />
        <circle cx="178" cy="87" r="1.3" fill="var(--gz-coffee)" opacity=".55" />
        <circle cx="142" cy="92" r="0.8" fill="var(--gz-coffee)" opacity=".4" />
        <circle cx="158" cy="90" r="1" fill="var(--gz-coffee)" opacity=".45" />
        <circle cx="125" cy="92" r="0.7" fill="var(--gz-coffee)" opacity=".4" />
        {/* Espolvoreado más */}
        <circle cx="170" cy="92" r="0.8" fill="var(--gz-coffee)" opacity=".4" />
        {/* Asa */}
        <path d="M 224 122 Q 264 130 262 168 Q 254 200 226 198" fill="none" stroke="var(--gz-paper)" strokeWidth="1.8" />
        {/* Plato */}
        <ellipse cx="150" cy="220" rx="104" ry="8" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" />
        <ellipse cx="150" cy="220" rx="90" ry="5" fill="none" stroke="var(--gz-paper)" strokeWidth="0.7" opacity=".5" />
        {/* Tres capas etiquetadas */}
        <text x="248" y="86" fill="var(--gz-gold)" fontSize="8" fontFamily="var(--mono)" opacity=".55">⅓ espuma</text>
        <text x="248" y="106" fill="var(--gz-gold)" fontSize="8" fontFamily="var(--mono)" opacity=".55">⅓ leche</text>
        <text x="248" y="148" fill="var(--gz-gold)" fontSize="8" fontFamily="var(--mono)" opacity=".55">⅓ espresso</text>
      </svg>
    );
  }

  // ─── 06 FLAT WHITE ─────────────────────────────────────────────────────────
  if (id === "flat-white") {
    return (
      <svg viewBox="0 0 300 300" className={cls}>
        {/* Vapor mínimo */}
        <path className="gz-cil-steam gz-st-1" d="M 140 78 Q 136 60 144 44" fill="none" stroke="var(--gz-paper)" strokeWidth="1.2" strokeLinecap="round" opacity=".35" />
        <path className="gz-cil-steam gz-st-2" d="M 160 78 Q 164 60 156 44" fill="none" stroke="var(--gz-paper)" strokeWidth="1.2" strokeLinecap="round" opacity=".35" />
        {/* Taza tulipán */}
        <ellipse cx="150" cy="100" rx="60" ry="8" fill="none" stroke="var(--gz-paper)" strokeWidth="1.8" />
        <path d="M 90 100 Q 92 132 110 150 Q 108 198 150 198 Q 192 198 190 150 Q 208 132 210 100" fill="none" stroke="var(--gz-paper)" strokeWidth="1.8" />
        {/* Superficie sedosa caramelo */}
        <ellipse cx="150" cy="100" rx="57" ry="6" fill="#C8985A" />
        {/* Latte art simple — rosetta */}
        <g stroke="#F8F2E4" strokeWidth="1.4" fill="none" opacity=".9">
          <path d="M 110 100 Q 130 90 150 100 Q 170 110 190 100" />
          <path d="M 116 96 Q 132 90 148 96" strokeWidth="1" />
          <path d="M 152 96 Q 168 90 184 96" strokeWidth="1" />
          <path d="M 110 104 Q 130 110 150 104 Q 170 98 190 104" strokeWidth="1" />
          {/* Tallo */}
          <path d="M 150 100 L 150 120" />
          <path d="M 142 108 L 158 108" strokeWidth="0.8" />
        </g>
        {/* Asa */}
        <path d="M 210 120 Q 244 128 242 156 Q 236 184 212 180" fill="none" stroke="var(--gz-paper)" strokeWidth="1.8" />
        {/* Plato */}
        <ellipse cx="150" cy="218" rx="92" ry="8" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" />
        <text x="38" y="244" fill="var(--gz-paper)" fontSize="9" fontFamily="var(--brand)" fontStyle="italic" opacity=".4">il moderno</text>
      </svg>
    );
  }

  // ─── 07 LATTE ──────────────────────────────────────────────────────────────
  if (id === "latte") {
    return (
      <svg viewBox="0 0 300 300" className={cls}>
        {/* Vapor */}
        <path className="gz-cil-steam gz-st-1" d="M 130 40 Q 124 22 132 4" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".5" />
        <path className="gz-cil-steam gz-st-2" d="M 150 36 Q 156 18 148 0" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".5" />
        <path className="gz-cil-steam gz-st-3" d="M 170 40 Q 176 22 168 4" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".5" />
        {/* Taza alta y angosta */}
        <ellipse cx="150" cy="68" rx="58" ry="8" fill="none" stroke="var(--gz-paper)" strokeWidth="1.8" />
        <path d="M 92 68 Q 96 218 150 218 Q 204 218 208 68" fill="none" stroke="var(--gz-paper)" strokeWidth="1.8" />
        {/* Superficie caramelo claro */}
        <ellipse cx="150" cy="68" rx="55" ry="6" fill="#D9B280" />
        {/* Latte art rosetta compleja */}
        <g stroke="#F8F2E4" strokeWidth="1.4" fill="none" opacity=".95">
          {/* Hojas */}
          <path d="M 105 68 Q 122 60 135 68 Q 122 76 105 68 Z" fill="#F8F2E4" strokeWidth="0.8" />
          <path d="M 115 65 Q 130 58 142 65 Q 130 72 115 65 Z" fill="#F8F2E4" strokeWidth="0.8" />
          <path d="M 125 62 Q 138 56 148 62 Q 138 68 125 62 Z" fill="#F8F2E4" strokeWidth="0.8" />
          {/* Espejo del otro lado */}
          <path d="M 195 68 Q 178 60 165 68 Q 178 76 195 68 Z" fill="#F8F2E4" strokeWidth="0.8" />
          <path d="M 185 65 Q 170 58 158 65 Q 170 72 185 65 Z" fill="#F8F2E4" strokeWidth="0.8" />
          <path d="M 175 62 Q 162 56 152 62 Q 162 68 175 62 Z" fill="#F8F2E4" strokeWidth="0.8" />
          {/* Tallo central */}
          <path d="M 150 60 L 150 82" />
        </g>
        {/* Asa */}
        <path d="M 208 90 Q 240 100 238 142 Q 232 180 210 175" fill="none" stroke="var(--gz-paper)" strokeWidth="1.8" />
        {/* Plato */}
        <ellipse cx="150" cy="238" rx="86" ry="8" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" />
        {/* Cota altura */}
        <line x1="232" y1="68" x2="232" y2="218" stroke="var(--gz-gold)" strokeWidth="0.6" opacity=".5" />
        <text x="240" y="148" fill="var(--gz-gold)" fontSize="9" fontFamily="var(--mono)" opacity=".55">200ml</text>
      </svg>
    );
  }

  // ─── 08 MOCHA ──────────────────────────────────────────────────────────────
  if (id === "mocha") {
    return (
      <svg viewBox="0 0 300 300" className={cls}>
        {/* Vapor */}
        <path className="gz-cil-steam gz-st-1" d="M 130 30 Q 124 14 132 -4" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".5" />
        <path className="gz-cil-steam gz-st-2" d="M 150 26 Q 156 8 148 -10" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".5" />
        <path className="gz-cil-steam gz-st-3" d="M 170 30 Q 176 14 168 -4" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" strokeLinecap="round" opacity=".5" />
        {/* Crema batida arriba */}
        <path d="M 100 70 Q 105 50 130 50 Q 130 35 150 38 Q 170 35 170 50 Q 195 50 200 70 Q 195 78 150 76 Q 105 78 100 70 Z"
          fill="#F8F2E4" stroke="var(--gz-paper)" strokeWidth="1.2" />
        {/* Polvo de cacao + drizzle */}
        <path d="M 110 56 Q 125 52 140 56" stroke="var(--gz-coffee)" strokeWidth="0.8" fill="none" opacity=".5" />
        <path d="M 155 50 Q 170 48 185 54" stroke="var(--gz-coffee)" strokeWidth="0.8" fill="none" opacity=".5" />
        <circle cx="125" cy="60" r="1" fill="var(--gz-coffee)" opacity=".5" />
        <circle cx="148" cy="56" r="1.2" fill="var(--gz-coffee)" opacity=".5" />
        <circle cx="172" cy="60" r="0.9" fill="var(--gz-coffee)" opacity=".5" />
        {/* Vaso de vidrio (líneas) */}
        <path d="M 95 80 Q 100 220 150 220 Q 200 220 205 80" fill="none" stroke="var(--gz-paper)" strokeWidth="1.6" />
        {/* Vidrio brillito */}
        <line x1="105" y1="100" x2="108" y2="200" stroke="var(--gz-paper)" strokeWidth="0.6" opacity=".4" />
        <line x1="195" y1="100" x2="192" y2="200" stroke="var(--gz-paper)" strokeWidth="0.6" opacity=".4" />
        {/* Capas internas */}
        {/* Café arriba */}
        <path d="M 97 80 Q 100 105 113 105 L 187 105 Q 200 105 203 80 Z" fill="var(--gz-coffee)" opacity=".75" />
        {/* Leche media */}
        <path d="M 113 105 Q 113 150 150 150 Q 187 150 187 105 Z" fill="#C8985A" opacity=".8" />
        {/* Chocolate abajo */}
        <path d="M 113 150 Q 116 215 150 218 Q 184 215 187 150 Z" fill="#3A2418" opacity=".9" />
        {/* Drizzle chocolate por dentro */}
        <path d="M 120 110 Q 122 130 118 145" stroke="#1F1410" strokeWidth="1" fill="none" opacity=".7" />
        <path d="M 180 115 Q 178 132 182 148" stroke="#1F1410" strokeWidth="1" fill="none" opacity=".7" />
        {/* Pajita */}
        <line x1="155" y1="34" x2="172" y2="80" stroke="var(--gz-gold)" strokeWidth="2.4" strokeLinecap="round" />
        {/* Plato */}
        <ellipse cx="150" cy="240" rx="86" ry="7" fill="none" stroke="var(--gz-paper)" strokeWidth="1.4" />
        <text x="220" y="115" fill="var(--gz-gold)" fontSize="8" fontFamily="var(--mono)" opacity=".55">café</text>
        <text x="220" y="148" fill="var(--gz-gold)" fontSize="8" fontFamily="var(--mono)" opacity=".55">leche</text>
        <text x="220" y="180" fill="var(--gz-gold)" fontSize="8" fontFamily="var(--mono)" opacity=".55">chocolate</text>
      </svg>
    );
  }

  return null;
}

window.CafeIlustracion = CafeIlustracion;
