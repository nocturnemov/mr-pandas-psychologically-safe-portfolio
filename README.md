# Daniel's paper portfolio

A scroll-driven paper-craft world: the camera glides along a curve through four little scenes, a paper puppet on a stick walks with you, and clicking a cutout opens a note card. It loops forever.

Forked from [Mr. Panda's Psychologically Safe Portfolio](https://github.com/andrewwoan/mr-pandas-psychologically-safe-portfolio) by Andrew Woan (MIT, see `LICENSE.md`). The camera/loop engine is his. The scenes, character, panels and content are new placeholders.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

Deploys to Vercel as-is (`vercel.json` is included).

Controls: mouse wheel, click-and-drag, touch swipe, or arrow keys / Page Up / Page Down.

## Where things live

| What | File |
|---|---|
| All text: name, tagline, project panels, links | `src/content.js` |
| Scene layout: what sits where | `src/Experience/World.jsx` |
| Placeholder drawings (canvas, hand-drawn style) | `src/Experience/paper/drawings.js` |
| Paper cutout component (white edge, shadow, hover, click) | `src/Experience/paper/Cutout.jsx` |
| Notebook wall + ground | `src/Experience/paper/Paper.jsx` |
| Camera path, look angles, puppet path | `src/Experience/components/curve.jsx` |
| Puppet on a stick | `src/Experience/Character.jsx` |
| Scroll/drag/keyboard input | `src/Experience/Experience.jsx` |
| Loop logic (from the original) | `src/Experience/Scene.jsx`, `hooks/useScrollCurve.js` |
| Note-card overlay | `src/components/Panel/` |

### Add a clickable thing

1. Add a panel entry in `src/content.js`, e.g. `myproject: { title, kicker, body: [...], links: [...] }`.
2. Add a drawing function in `drawings.js` (or reuse one).
3. Drop it into `World.jsx`:
   ```jsx
   <Cutout id="myproject" draw={D.myDrawing} w={600} h={600} height={2} position={[x, 0, -2.6]} panel="myproject" />
   ```
   `x` must stay within the tile, between −23 and 43. `y = 0` is the ground. `z` around −2 to −3.5 sits in front of the wall.

### Use a real drawing instead of a canvas doodle

Draw it in Krita/Procreate, export a transparent PNG to `public/art/`, then:

```js
const img = new Image(); img.src = "/art/willem.png"; await img.decode();
export const willemArt = (ctx, w, h) => ctx.drawImage(img, 0, 0, w, h);
```

(Load images before the textures are built, the same way `App.jsx` waits for the font.)

### Swap in Blender models

The original site built each scene in Blender, baked the textures, and exported `.glb` files. To do the same:

1. Model the scene in Blender with paper-thin planes. Keep the same scale (1 unit ≈ 1 m, ground at y = 0).
2. Export as glTF Binary (`.glb`) into `public/models/`.
3. Run `npx gltfjsx public/models/scene.glb` to generate a component, then render it inside `<Tile>` in `World.jsx`.
4. To change the camera path, draw a curve in Blender and export it with `Blender File and Addon/curve_to_points.py`, then paste the points into `curve.jsx`.

**Keep the loop seamless:** the tile width (`TILE_W` in `Paper.jsx`) must equal `SHIFT_X_AMOUNT` in `curve.jsx` (66 right now).

## Credits

- Engine and concept: Andrew Woan, [Mr. Panda's Psychologically Safe Portfolio](https://github.com/andrewwoan/mr-pandas-psychologically-safe-portfolio) (MIT)
- Fonts: Plus Jakarta Sans and Caveat (Google Fonts, OFL)
