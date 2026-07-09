# Prompts para imágenes de los 8 cafés

**Setup base (usar en todos):** top-down 3/4, taza de cerámica gres color crema claro, plato de cerámica a juego, fondo sólido **#F1EAD8** (cream), iluminación cálida lateral suave, vignette dorado tenue desde abajo-izquierda, sombras suaves, sin texto, sin marcas, formato vertical 4:5, foto editorial, grano fílmico mínimo.

---

### 01 · Espresso
> Top-down 3/4 view of a single espresso in a small white ceramic demitasse cup on a matching saucer. Rich dark crema with golden tiger-stripe pattern on top. Clean cream solid background **#F1EAD8**, warm side light, soft shadow, no text, editorial coffee photography, vertical 4:5.

### 02 · Ristretto
> Top-down 3/4 of a tiny ristretto in a thick-walled espresso cup, only 15ml of dark dense coffee, very thick caramel-toned crema almost overflowing. Cream background **#F1EAD8**, dramatic moody side light, editorial macro, vertical 4:5.

### 03 · Americano
> Top-down 3/4 of an Americano in a large ceramic cup, clear black coffee with a thin layer of pale crema floating on top, slight bubbles around the rim. Cream background **#F1EAD8**, soft golden window light, calm and minimal, editorial, vertical 4:5.

### 04 · Cortado
> Top-down 3/4 of a cortado in a small clear gibraltar / cortado glass, equal parts espresso and steamed milk, smooth caramel-brown color with thin white microfoam ring. Cream background **#F1EAD8**, warm side light, editorial coffee photography, vertical 4:5.

### 05 · Cappuccino
> Top-down 3/4 of a classic cappuccino in a wide ceramic cup, distinct three layers: dark espresso ring, milk, and a thick dome of velvety milk foam dusted with cocoa powder. Cream background **#F1EAD8**, warm side light, editorial, vertical 4:5.

### 06 · Flat White
> Top-down 3/4 of a flat white in a small tulip ceramic cup, glossy silky surface with a subtle leaf latte-art pattern, no foam dome, very smooth. Cream background **#F1EAD8**, warm side light, editorial photography, vertical 4:5.

### 07 · Latte
> Top-down 3/4 of a latte in a tall ceramic mug, mostly steamed milk with a fine layer of microfoam, delicate rosetta latte-art on top. Cream background **#F1EAD8**, soft side light, editorial, vertical 4:5.

### 08 · Mocha
> Top-down 3/4 of a mocha in a glass mug, espresso + chocolate + steamed milk, a generous swirl of whipped cream and a dusting of cocoa powder on top, glossy chocolate drizzle. Cream background **#F1EAD8**, warm side light, editorial dessert photography, vertical 4:5.

---

## Notas de uso
- **Tamaño sugerido:** 800×1000 px o más (proporción 4:5).
- **Formato:** PNG o JPG. Si pueden ser PNG con fondo transparente, mejor — pero el color sólido **#F1EAD8** funciona perfecto y permite usar `mix-blend-mode: multiply` para integrar.
- **Guardar como:** `assets/cafes/espresso.jpg`, `ristretto.jpg`, etc. (un archivo por café, mismo nombre que el `id` en `cafes.js`).
- Después agregamos `image: "assets/cafes/espresso.jpg"` a cada entrada de `CAFES` y mostramos la foto en la card y en el sheet de detalle.

## Tip de prompt
Si tu generador permite negative prompts: agregá `no text, no logo, no watermark, no hands, no people, no spoon`.

---

# Prompts para los 5 niveles de tueste (sección 03)

**Setup base (usar en todos):** macro photography de un puñado de granos de café sobre fondo oscuro **#1F1410**, iluminación cálida lateral dramática, enfoque nítido en los granos del centro, sombras profundas, sin texto, sin manos, formato cuadrado 1:1, foto editorial.

> La sección detecta automáticamente los archivos: guardá cada imagen como `assets/tueste/<id>.png` (PNG o renombrado a .png). Si el archivo no existe, se muestra el grano ilustrado como hasta ahora.

### 01 · Verde — `assets/tueste/verde.png`
> Macro photo of raw green unroasted coffee beans, pale olive-green color, matte dry surface, visible center crease, small pile on dark brown background #1F1410, warm dramatic side light, editorial, square 1:1.

### 02 · Claro — `assets/tueste/claro.png`
> Macro photo of light roast coffee beans, pale cinnamon-tan color, dry matte surface, no oil sheen, small pile on dark brown background #1F1410, warm side light, editorial coffee photography, square 1:1.

### 03 · Medio — `assets/tueste/medio.png`
> Macro photo of medium roast coffee beans, rich chestnut-brown color, barely satin surface, small pile on dark brown background #1F1410, warm dramatic side light, editorial, square 1:1.

### 04 · Medio-Oscuro — `assets/tueste/medio-oscuro.png`
> Macro photo of medium-dark roast coffee beans, deep brown color with first hints of oil sheen on the surface, small pile on dark brown background #1F1410, moody warm light, editorial, square 1:1.

### 05 · Oscuro — `assets/tueste/oscuro.png`
> Macro photo of dark roast coffee beans, nearly black glossy beans with visible oily shine, faint wisps of smoke rising, small pile on dark brown background #1F1410, dramatic low-key lighting, editorial, square 1:1.
