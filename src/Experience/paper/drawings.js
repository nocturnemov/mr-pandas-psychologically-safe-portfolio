// Placeholder drawings. Each is (ctx, w, h) => void.
// Swap any of these for a real drawing later:
//   import an image, then `ctx.drawImage(img, 0, 0, w, h)`.
import { INK, HAND, rect, ellipse, poly, line, text, hatch } from "./sketch";
import { site } from "../../content";

const C = {
  sky: "#9fc6e8",
  leaf: "#7cbf6b",
  leafDark: "#4f9a4a",
  bark: "#a7774f",
  sun: "#f6c453",
  coral: "#ef7f6a",
  lilac: "#b7a6e0",
  note: "#fde68a",
  paper: "#fbfaf5",
  mint: "#9fe0c4",
  slate: "#6c7a96",
};

/* ───────────── scene 1: hello ───────────── */

export const title = (ctx, w, h) => {
  text(ctx, `Hi, I'm ${site.name}!`, w / 2, h * 0.36, { size: 170, rotate: -0.04 });
  line(ctx, [[w * 0.12, h * 0.62], [w * 0.5, h * 0.66], [w * 0.88, h * 0.6]], { stroke: C.coral, width: 10 });
  text(ctx, site.tagline, w / 2, h * 0.84, { size: 64, weight: 500, color: "#5b5a55" });
};

export const aboutNote = (ctx, w, h) => {
  rect(ctx, 20, 20, w - 40, h - 40, { fill: C.lilac, seed: 4 });
  hatch(ctx, 30, 30, w - 60, h - 60, { gap: 26, alpha: 0.08 });
  text(ctx, "ABOUT", w / 2, h * 0.38, { size: 120, color: C.coral, rotate: -0.05 });
  text(ctx, "me", w / 2, h * 0.62, { size: 110, color: "#4a6fa5", rotate: 0.04 });
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    line(ctx, [[w / 2 + Math.cos(a) * 170, h / 2 + Math.sin(a) * 150], [w / 2 + Math.cos(a) * 200, h / 2 + Math.sin(a) * 178]], { width: 5, seed: i });
  }
  // pin
  ellipse(ctx, w / 2, 48, 16, 16, { fill: C.coral, width: 4 });
};

export const cloud = (ctx, w, h) => {
  const bumps = [];
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    const r = 1 + 0.16 * Math.sin(a * 7);
    bumps.push([w / 2 + Math.cos(a) * (w * 0.44) * r, h / 2 + Math.sin(a) * (h * 0.36) * r]);
  }
  poly(ctx, bumps, { fill: C.paper, seed: 11 });
  ellipse(ctx, w * 0.4, h * 0.46, 7, 9, { fill: INK, width: 2 });
  ellipse(ctx, w * 0.6, h * 0.46, 7, 9, { fill: INK, width: 2 });
  line(ctx, [[w * 0.42, h * 0.58], [w * 0.5, h * 0.63], [w * 0.58, h * 0.58]], { width: 5 });
};

export const baobab = (ctx, w, h) => {
  // trunk
  poly(ctx, [[w * 0.36, h], [w * 0.4, h * 0.45], [w * 0.6, h * 0.45], [w * 0.66, h]], { fill: C.bark, seed: 21 });
  hatch(ctx, w * 0.38, h * 0.5, w * 0.26, h * 0.48, { gap: 18, alpha: 0.15 });
  // branches
  [[0.42, 0.47, 0.22, 0.28], [0.5, 0.46, 0.5, 0.22], [0.58, 0.47, 0.8, 0.28]].forEach(([a, b, c, d], i) =>
    line(ctx, [[w * a, h * b], [w * c, h * d]], { width: 16, stroke: "#7d5536", seed: i })
  );
  // canopy puffs
  [[0.2, 0.25], [0.38, 0.17], [0.55, 0.14], [0.72, 0.18], [0.84, 0.26]].forEach(([x, y], i) =>
    ellipse(ctx, w * x, h * y, w * 0.13, h * 0.09, { fill: i % 2 ? C.leaf : C.leafDark, seed: 30 + i })
  );
};

export const grass = (ctx, w, h) => {
  const blades = [[0.2, 0.15], [0.35, 0.0], [0.5, 0.08], [0.65, 0.02], [0.8, 0.2]];
  blades.forEach(([x, top], i) =>
    poly(ctx, [[w * (x - 0.08), h], [w * x, h * top], [w * (x + 0.08), h]], { fill: i % 2 ? C.leaf : C.leafDark, width: 4, seed: i + 50 })
  );
};

export const flower = (ctx, w, h) => {
  line(ctx, [[w / 2, h], [w / 2, h * 0.4]], { stroke: C.leafDark, width: 8 });
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    ellipse(ctx, w / 2 + Math.cos(a) * 34, h * 0.3 + Math.sin(a) * 34, 24, 24, { fill: "#f6b5c7", width: 4, seed: i });
  }
  ellipse(ctx, w / 2, h * 0.3, 20, 20, { fill: C.sun, width: 4 });
};

export const scrollHint = (ctx, w, h) => {
  text(ctx, "keep scrolling", w * 0.42, h * 0.4, { size: 70, weight: 600, color: "#5b5a55", rotate: -0.03 });
  line(ctx, [[w * 0.1, h * 0.75], [w * 0.75, h * 0.72], [w * 0.88, h * 0.72]], { width: 8 });
  line(ctx, [[w * 0.78, h * 0.6], [w * 0.9, h * 0.72], [w * 0.78, h * 0.86]], { width: 8 });
};

/* ───────────── scene 2: Willem ───────────── */

export const willemLabel = (ctx, w, h) => {
  text(ctx, "Willem", w / 2, h * 0.38, { size: 150, rotate: -0.03 });
  text(ctx, "a desktop productivity companion", w / 2, h * 0.8, { size: 72, weight: 500, color: "#5b5a55" });
};

export const monitor = (ctx, w, h) => {
  // stand
  poly(ctx, [[w * 0.42, h * 0.72], [w * 0.58, h * 0.72], [w * 0.62, h * 0.94], [w * 0.38, h * 0.94]], { fill: "#c9c6bd", seed: 61 });
  rect(ctx, w * 0.26, h * 0.92, w * 0.48, h * 0.06, { fill: "#b5b2a8", seed: 62 });
  // screen
  rect(ctx, w * 0.04, h * 0.04, w * 0.92, h * 0.68, { fill: "#2f3542", seed: 63 });
  rect(ctx, w * 0.08, h * 0.09, w * 0.84, h * 0.58, { fill: "#f4f1e8", stroke: null, seed: 64 });
  // fake app UI
  rect(ctx, w * 0.1, h * 0.12, w * 0.2, h * 0.52, { fill: "#e6e1d3", width: 3, seed: 65 });
  for (let i = 0; i < 4; i++) line(ctx, [[w * 0.13, h * (0.2 + i * 0.1)], [w * 0.26, h * (0.2 + i * 0.1)]], { width: 6, stroke: "#9a968a", seed: i });
  text(ctx, "today", w * 0.38, h * 0.17, { size: 44, align: "left" });
  [[0.34, 0.26, C.mint], [0.34, 0.38, C.note], [0.34, 0.5, C.lilac]].forEach(([x, y, c], i) => {
    rect(ctx, w * x, h * y, w * 0.54, h * 0.09, { fill: c, width: 3, seed: 70 + i });
    ellipse(ctx, w * (x + 0.04), h * (y + 0.045), 12, 12, { fill: C.paper, width: 3, seed: 80 + i });
  });
  text(ctx, "click me", w * 0.78, h * 0.84, { size: 44, color: C.coral, rotate: -0.1 });
};

export const lamp = (ctx, w, h) => {
  rect(ctx, w * 0.25, h * 0.9, w * 0.5, h * 0.08, { fill: C.slate, seed: 91 });
  line(ctx, [[w * 0.5, h * 0.9], [w * 0.35, h * 0.5], [w * 0.62, h * 0.22]], { width: 12, stroke: C.slate });
  poly(ctx, [[w * 0.5, h * 0.12], [w * 0.92, h * 0.28], [w * 0.7, h * 0.42]], { fill: C.sun, seed: 92 });
};

export const plant = (ctx, w, h) => {
  [[0.5, 0.1], [0.3, 0.25], [0.7, 0.22], [0.2, 0.45], [0.8, 0.42]].forEach(([x, y], i) => {
    line(ctx, [[w * 0.5, h * 0.62], [w * x, h * y]], { stroke: C.leafDark, width: 6, seed: i });
    ellipse(ctx, w * x, h * y, 40, 22, { fill: i % 2 ? C.leaf : C.leafDark, seed: 100 + i, width: 4 });
  });
  poly(ctx, [[w * 0.25, h * 0.6], [w * 0.75, h * 0.6], [w * 0.66, h * 0.98], [w * 0.34, h * 0.98]], { fill: C.coral, seed: 109 });
};

/* ───────────── scene 3: Accountable + BridgeAI ───────────── */

export const phone = (ctx, w, h) => {
  rect(ctx, w * 0.12, h * 0.02, w * 0.76, h * 0.96, { fill: "#2f3542", seed: 121 });
  rect(ctx, w * 0.17, h * 0.07, w * 0.66, h * 0.86, { fill: "#fff8ec", stroke: null, seed: 122 });
  text(ctx, "Accountable", w / 2, h * 0.15, { size: 52 });
  ellipse(ctx, w / 2, h * 0.38, w * 0.2, w * 0.2, { fill: C.mint, seed: 123 });
  text(ctx, "7", w / 2, h * 0.37, { size: 110 });
  text(ctx, "day streak", w / 2, h * 0.56, { size: 40, weight: 500 });
  [0.66, 0.76].forEach((y, i) => rect(ctx, w * 0.24, h * y, w * 0.52, h * 0.07, { fill: i ? C.note : C.lilac, width: 3, seed: 124 + i }));
};

export const bulb = (ctx, w, h) => {
  ellipse(ctx, w / 2, h * 0.36, w * 0.36, h * 0.3, { fill: C.sun, seed: 131 });
  rect(ctx, w * 0.36, h * 0.64, w * 0.28, h * 0.14, { fill: "#c9c6bd", seed: 132 });
  for (let i = 0; i < 3; i++) line(ctx, [[w * 0.36, h * (0.68 + i * 0.04)], [w * 0.64, h * (0.68 + i * 0.04)]], { width: 4, seed: i });
  // a little bridge inside the bulb
  line(ctx, [[w * 0.28, h * 0.44], [w * 0.4, h * 0.3], [w * 0.5, h * 0.27], [w * 0.6, h * 0.3], [w * 0.72, h * 0.44]], { width: 8, stroke: C.coral });
  line(ctx, [[w * 0.26, h * 0.45], [w * 0.74, h * 0.45]], { width: 8 });
  [0.38, 0.5, 0.62].forEach((x, i) => line(ctx, [[w * x, h * 0.32], [w * x, h * 0.45]], { width: 4, seed: i }));
  text(ctx, "BridgeAI", w / 2, h * 0.9, { size: 64 });
};

export const sectionLabel = (label, sub) => (ctx, w, h) => {
  text(ctx, label, w / 2, h * 0.38, { size: 130, rotate: -0.03 });
  if (sub) text(ctx, sub, w / 2, h * 0.8, { size: 72, weight: 500, color: "#5b5a55" });
};

export const ribbon = (ctx, w, h) => {
  poly(ctx, [[w * 0.36, h * 0.5], [w * 0.28, h * 0.98], [w * 0.4, h * 0.88], [w * 0.48, h * 0.98], [w * 0.5, h * 0.55]], { fill: C.coral, seed: 141 });
  poly(ctx, [[w * 0.5, h * 0.55], [w * 0.52, h * 0.98], [w * 0.6, h * 0.88], [w * 0.72, h * 0.98], [w * 0.64, h * 0.5]], { fill: C.coral, seed: 142 });
  ellipse(ctx, w / 2, h * 0.34, w * 0.3, w * 0.3, { fill: C.sun, seed: 143 });
  ellipse(ctx, w / 2, h * 0.34, w * 0.22, w * 0.22, { fill: "#f9d77e", seed: 144, width: 4 });
  line(ctx, [[w / 2, 0], [w / 2, h * 0.06]], { width: 4 });
  ellipse(ctx, w / 2, 14, 12, 12, { fill: C.coral, width: 3 });
  text(ctx, "Rise", w / 2, h * 0.29, { size: 56 });
  text(ctx, "2023", w / 2, h * 0.4, { size: 44 });
};

/* ───────────── scene 4: 3D + contact ───────────── */

export const cube = (ctx, w, h) => {
  const top = [[w * 0.5, h * 0.08], [w * 0.9, h * 0.28], [w * 0.5, h * 0.48], [w * 0.1, h * 0.28]];
  const left = [[w * 0.1, h * 0.28], [w * 0.5, h * 0.48], [w * 0.5, h * 0.94], [w * 0.1, h * 0.74]];
  const right = [[w * 0.5, h * 0.48], [w * 0.9, h * 0.28], [w * 0.9, h * 0.74], [w * 0.5, h * 0.94]];
  poly(ctx, top, { fill: "#f7a072", seed: 151 });
  poly(ctx, left, { fill: "#e07a5f", seed: 152 });
  poly(ctx, right, { fill: "#b85c48", seed: 153 });
  hatch(ctx, w * 0.5, h * 0.3, w * 0.4, h * 0.6, { alpha: 0.12, gap: 18 });
};

export const donut = (ctx, w, h) => {
  ellipse(ctx, w / 2, h * 0.55, w * 0.44, h * 0.34, { fill: "#e9b872", seed: 161 });
  ellipse(ctx, w / 2, h * 0.5, w * 0.4, h * 0.28, { fill: "#f4a6c0", seed: 162 });
  ellipse(ctx, w / 2, h * 0.5, w * 0.12, h * 0.08, { fill: C.paper, seed: 163 });
  const r = (i) => ((i * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < 14; i++) {
    const a = r(i) * Math.PI * 2;
    const d = 0.2 + r(i + 40) * 0.13;
    const x = w / 2 + Math.cos(a) * w * d;
    const y = h * 0.5 + Math.sin(a) * h * d * 0.7;
    line(ctx, [[x, y], [x + 14, y + 8]], { width: 7, stroke: ["#4a6fa5", C.sun, C.mint][i % 3], seed: i });
  }
};

export const mailbox = (ctx, w, h) => {
  rect(ctx, w * 0.45, h * 0.5, w * 0.1, h * 0.5, { fill: C.bark, seed: 171 });
  poly(ctx, [[w * 0.12, h * 0.5], [w * 0.12, h * 0.22], [w * 0.3, h * 0.08], [w * 0.88, h * 0.08], [w * 0.88, h * 0.5]], { fill: "#4a6fa5", seed: 172 });
  line(ctx, [[w * 0.3, h * 0.08], [w * 0.3, h * 0.5]], { width: 5 });
  rect(ctx, w * 0.82, h * 0.0, w * 0.04, h * 0.2, { fill: C.coral, width: 4, seed: 173 });
  text(ctx, "say hi!", w * 0.6, h * 0.3, { size: 70, color: C.paper });
};

export const outro = (ctx, w, h) => {
  text(ctx, "thanks for scrolling", w / 2, h * 0.35, { size: 90, rotate: -0.02 });
  text(ctx, "it loops forever ↻", w / 2, h * 0.75, { size: 60, weight: 500, color: "#5b5a55" });
};

export const plane = (ctx, w, h) => {
  poly(ctx, [[w * 0.05, h * 0.5], [w * 0.95, h * 0.2], [w * 0.45, h * 0.62]], { fill: C.paper, seed: 181 });
  poly(ctx, [[w * 0.45, h * 0.62], [w * 0.95, h * 0.2], [w * 0.5, h * 0.9]], { fill: "#e8e4d8", seed: 182 });
};

/* ───────────── the character on a stick ───────────── */

export const character = (ctx, w, h) => {
  // stick
  rect(ctx, w * 0.47, h * 0.62, w * 0.06, h * 0.38, { fill: "#d08a4a", width: 4, seed: 191 });
  // body (hoodie)
  poly(ctx, [[w * 0.26, h * 0.66], [w * 0.3, h * 0.38], [w * 0.7, h * 0.38], [w * 0.74, h * 0.66]], { fill: "#4a6fa5", seed: 192 });
  // laptop under arm
  rect(ctx, w * 0.56, h * 0.48, w * 0.3, h * 0.12, { fill: "#c9c6bd", seed: 193 });
  // head
  ellipse(ctx, w / 2, h * 0.22, w * 0.2, h * 0.15, { fill: C.paper, seed: 194 });
  // hair scribble
  poly(ctx, [[w * 0.31, h * 0.18], [w * 0.36, h * 0.08], [w * 0.5, h * 0.05], [w * 0.64, h * 0.08], [w * 0.69, h * 0.18], [w * 0.5, h * 0.12]], { fill: INK, seed: 195, width: 4 });
  ellipse(ctx, w * 0.43, h * 0.23, 7, 9, { fill: INK, width: 2 });
  ellipse(ctx, w * 0.57, h * 0.23, 7, 9, { fill: INK, width: 2 });
  line(ctx, [[w * 0.44, h * 0.29], [w * 0.5, h * 0.31], [w * 0.56, h * 0.29]], { width: 5 });
};

export const HAND_FONT = HAND;
