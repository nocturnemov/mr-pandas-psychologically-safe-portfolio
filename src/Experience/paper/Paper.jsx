import { useMemo } from "react";
import * as THREE from "three";
import { rng } from "./sketch";

export const TILE_W = 66; // must equal SHIFT_X_AMOUNT in curve.jsx

function canvasTex(w, h, draw, repeat) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(...repeat);
  t.anisotropy = 8;
  return t;
}

// lined notebook paper: one texture tile = 11 x 11 world units
function notebook(ctx, w, h) {
  ctx.fillStyle = "#f7f6f1";
  ctx.fillRect(0, 0, w, h);
  const r = rng(5);
  for (let i = 0; i < 4000; i++) {
    ctx.fillStyle = `rgba(0,0,0,${r() * 0.035})`;
    ctx.fillRect(r() * w, r() * h, 2, 2);
  }
  ctx.strokeStyle = "rgba(96,140,200,0.55)";
  ctx.lineWidth = 2;
  for (let y = 18; y < h; y += 38) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(225,90,90,0.6)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w * 0.62, 0);
  ctx.lineTo(w * 0.62, h);
  ctx.stroke();
}

// grass top with a tan paper path running along it
function groundTop(ctx, w, h) {
  ctx.fillStyle = "#a9d39a";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#e9c9a6";
  ctx.fillRect(0, h * 0.5, w, h * 0.16);
  ctx.strokeStyle = "rgba(150,100,70,0.35)";
  ctx.lineWidth = 3;
  for (let x = 0; x < w; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, h * 0.5);
    ctx.lineTo(x, h * 0.66);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(60,110,60,0.25)";
  for (let y = 10; y < h; y += 26) {
    if (y > h * 0.48 && y < h * 0.68) continue;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
}

function groundFront(ctx, w, h) {
  ctx.fillStyle = "#93c286";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(50,100,50,0.3)";
  ctx.lineWidth = 3;
  for (let x = 0; x < w; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
}

export default function Paper() {
  const { wall, top, front } = useMemo(
    () => ({
      wall: canvasTex(1024, 1024, notebook, [TILE_W / 11, 16 / 11]),
      top: canvasTex(512, 256, groundTop, [TILE_W / 6, 1]),
      front: canvasTex(256, 128, groundFront, [TILE_W / 3, 1]),
    }),
    []
  );
  const cx = -23 + TILE_W / 2; // tile spans x ∈ [-23, 43)

  return (
    <group>
      {/* notebook wall */}
      <mesh position={[cx, 6, -4.5]}>
        <planeGeometry args={[TILE_W, 16]} />
        <meshBasicMaterial map={wall} />
      </mesh>
      {/* ground top: z from -4.5 to 3 */}
      <mesh position={[cx, 0, -0.75]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[TILE_W, 7.5]} />
        <meshBasicMaterial map={top} />
      </mesh>
      {/* ground front lip */}
      <mesh position={[cx, -1.5, 3]}>
        <planeGeometry args={[TILE_W, 3]} />
        <meshBasicMaterial map={front} />
      </mesh>
    </group>
  );
}
