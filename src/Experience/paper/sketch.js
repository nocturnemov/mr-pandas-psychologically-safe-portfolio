// Tiny "hand-drawn on paper" canvas toolkit.
// Every placeholder cutout is drawn with these helpers, so swapping one
// for a Blender model / Krita drawing later only touches one file.

export const INK = "#3b3a36";
export const HAND = "Caveat, 'Comic Sans MS', cursive";

// deterministic randomness so cutouts look identical on every load
export function rng(seed = 1) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 10000) / 10000;
  };
}

function jitterPath(ctx, pts, r, amt, closed) {
  ctx.beginPath();
  pts.forEach(([x, y], i) => {
    const jx = x + (r() - 0.5) * amt;
    const jy = y + (r() - 0.5) * amt;
    if (i === 0) ctx.moveTo(jx, jy);
    else ctx.lineTo(jx, jy);
  });
  if (closed) ctx.closePath();
}

// sample a closed shape into many points so the wobble looks like a pen
function rectPts(x, y, w, h, n = 10) {
  const pts = [];
  for (let i = 0; i < n; i++) pts.push([x + (w * i) / n, y]);
  for (let i = 0; i < n; i++) pts.push([x + w, y + (h * i) / n]);
  for (let i = 0; i < n; i++) pts.push([x + w - (w * i) / n, y + h]);
  for (let i = 0; i < n; i++) pts.push([x, y + h - (h * i) / n]);
  return pts;
}

function ellipsePts(cx, cy, rx, ry, n = 40) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    pts.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
  }
  return pts;
}

export function shape(ctx, pts, { fill, stroke = INK, width = 6, seed = 1, wobble = 4 } = {}) {
  const r = rng(seed);
  if (fill) {
    ctx.fillStyle = fill;
    jitterPath(ctx, pts, r, wobble * 0.5, true);
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.lineJoin = ctx.lineCap = "round";
    jitterPath(ctx, pts, r, wobble, true);
    ctx.stroke();
    // second, lighter pass = sketchy double line
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = width * 0.6;
    jitterPath(ctx, pts, r, wobble * 1.6, true);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

export const rect = (ctx, x, y, w, h, o) => shape(ctx, rectPts(x, y, w, h), o);
export const ellipse = (ctx, cx, cy, rx, ry, o) => shape(ctx, ellipsePts(cx, cy, rx, ry), o);
export const poly = (ctx, pts, o) => shape(ctx, pts, o);

export function line(ctx, pts, { stroke = INK, width = 6, seed = 3, wobble = 3 } = {}) {
  const r = rng(seed);
  ctx.strokeStyle = stroke;
  ctx.lineWidth = width;
  ctx.lineJoin = ctx.lineCap = "round";
  // subdivide for wobble
  const dense = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i];
    const [bx, by] = pts[i + 1];
    for (let t = 0; t < 6; t++) dense.push([ax + ((bx - ax) * t) / 6, ay + ((by - ay) * t) / 6]);
  }
  dense.push(pts[pts.length - 1]);
  jitterPath(ctx, dense, r, wobble, false);
  ctx.stroke();
}

export function text(ctx, str, x, y, { size = 80, color = INK, align = "center", weight = 700, font = HAND, rotate = 0 } = {}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotate);
  ctx.font = `${weight} ${size}px ${font}`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(str, 0, 0);
  ctx.restore();
}

// faint pencil hatching inside a region (call after clipping if needed)
export function hatch(ctx, x, y, w, h, { color = INK, gap = 22, alpha = 0.12, seed = 9 } = {}) {
  const r = rng(seed);
  ctx.save();
  ctx.globalCompositeOperation = "source-atop"; // only shade what's already drawn
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  for (let i = -h; i < w; i += gap) {
    ctx.beginPath();
    ctx.moveTo(x + i + r() * 4, y + h);
    ctx.lineTo(x + i + h + r() * 4, y);
    ctx.stroke();
  }
  ctx.restore();
}

// paper grain over whatever is already drawn (only where alpha exists)
export function grain(ctx, w, h, seed = 7, amount = 0.06) {
  const r = rng(seed);
  ctx.save();
  ctx.globalCompositeOperation = "source-atop";
  for (let i = 0; i < (w * h) / 900; i++) {
    ctx.fillStyle = r() > 0.5 ? `rgba(0,0,0,${amount})` : `rgba(255,255,255,${amount * 1.5})`;
    ctx.fillRect(r() * w, r() * h, 2 + r() * 3, 2 + r() * 3);
  }
  ctx.restore();
}
