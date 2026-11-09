import * as THREE from "three";

// Camera path through one world tile.
// Tip: draw this curve in Blender and export it with
// "Blender File and Addon/curve_to_points.py" instead of hand-editing.

const FIRST_X = -20;
const LAST_X = 40;
const LOOP_GAP = 6; // distance of the quick "jump" segment between loops
export const SHIFT_X_AMOUNT = LAST_X - FIRST_X + LOOP_GAP; // 66 — must match TILE_W

const cam = [
  // x,    y,    z
  [-20, 2.4, 8.2], // hello
  [-14, 2.5, 8.6],
  [-8, 2.6, 8.8],
  [-2, 2.5, 8.4], // Willem
  [4, 2.4, 8.0],
  [10, 2.5, 8.4], // Accountable
  [16, 2.6, 8.6], // BridgeAI
  [22, 2.5, 8.2], // Rise
  [28, 2.4, 8.0], // 3D
  [34, 2.4, 8.2], // contact
  [40, 2.5, 8.4], // outro
];

export const initialCameraPoints = cam.map(([x, y, z]) => new THREE.Vector3(x, y, z));
export const cameraCurve = new THREE.CatmullRomCurve3(initialCameraPoints);
cameraCurve.curveType = "centripetal";

// Camera look direction at points along the path (progress 0 → 1).
const e = (x, y) => new THREE.Euler(x, y, 0);
export const rotationTargets = [
  { progress: 0, rotation: e(-0.07, -0.12) },
  { progress: 0.2, rotation: e(-0.08, 0.02) },
  { progress: 0.4, rotation: e(-0.07, -0.04) },
  { progress: 0.6, rotation: e(-0.08, 0.05) },
  { progress: 0.8, rotation: e(-0.07, -0.03) },
  { progress: 1, rotation: e(-0.07, 0.0) },
];

// The character on a stick walks along the path, a little left of camera.
export const CHARACTER_SHIFT_X_AMOUNT = SHIFT_X_AMOUNT;
export const initialCharacterPoints = cam.map(
  ([x], i) => new THREE.Vector3(x - 3.3, -0.55 + Math.sin(i * 1.3) * 0.08, 0.1)
);
export const characterCurve = new THREE.CatmullRomCurve3(initialCharacterPoints);
