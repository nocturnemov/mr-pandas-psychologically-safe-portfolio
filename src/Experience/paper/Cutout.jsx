import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { grain } from "./sketch";
import { useUI } from "../../store";

// ── texture cache: each drawing is rendered once, shared by every copy ──
const cache = new Map();

function buildTextures(id, draw, w, h, border) {
  if (cache.has(id)) return cache.get(id);
  const pad = border + 24;

  // 1. the drawing itself
  const art = document.createElement("canvas");
  art.width = w + pad * 2;
  art.height = h + pad * 2;
  const actx = art.getContext("2d");
  actx.translate(pad, pad);
  draw(actx, w, h);

  // 2. dilated white silhouette = scissor-cut paper edge
  const sil = document.createElement("canvas");
  sil.width = art.width;
  sil.height = art.height;
  const sctx = sil.getContext("2d");
  if (border > 0) {
    for (let a = 0; a < 16; a++) {
      const t = (a / 16) * Math.PI * 2;
      sctx.drawImage(art, Math.cos(t) * border, Math.sin(t) * border);
    }
  }
  sctx.drawImage(art, 0, 0);
  sctx.globalCompositeOperation = "source-in";
  sctx.fillStyle = "#fbfaf5";
  sctx.fillRect(0, 0, sil.width, sil.height);

  // 3. final = paper + art + grain
  const out = document.createElement("canvas");
  out.width = art.width;
  out.height = art.height;
  const octx = out.getContext("2d");
  octx.drawImage(sil, 0, 0);
  octx.drawImage(art, 0, 0);
  grain(octx, out.width, out.height, id.length * 31);

  // 4. soft shadow from the silhouette
  const sh = document.createElement("canvas");
  sh.width = art.width;
  sh.height = art.height;
  const hctx = sh.getContext("2d");
  hctx.filter = "blur(10px)";
  hctx.drawImage(sil, 0, 0);
  hctx.globalCompositeOperation = "source-in";
  hctx.filter = "none";
  hctx.fillStyle = "#2a2a3a";
  hctx.fillRect(0, 0, sh.width, sh.height);

  const mk = (c) => {
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  };
  const res = { map: mk(out), shadow: mk(sh), aspect: out.width / out.height, padRatio: pad / out.height };
  cache.set(id, res);
  return res;
}

/**
 * A flat paper cutout standing in the scene.
 *  id      – unique key (texture cache)
 *  draw    – (ctx, w, h) => void, canvas drawing
 *  w, h    – drawing size in px
 *  height  – height in world units
 *  panel   – optional key from content.panels; makes it clickable
 *  sway    – idle wobble (radians) around its base
 *  bob     – idle up/down float (world units)
 */
export default function Cutout({
  id,
  draw,
  w = 512,
  h = 512,
  height = 2,
  border = 10,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  panel,
  sway = 0,
  bob = 0,
  speed = 1,
  shadowOffset = [0.12, -0.1],
  renderOrder = 0,
}) {
  const tex = useMemo(() => buildTextures(id, draw, w, h, border), [id, draw, w, h, border]);
  const width = height * tex.aspect;
  const lift = useRef();
  const hovered = useRef(false);
  const phase = useMemo(() => (id.length * 1.7) % 6.28, [id]);
  const open = useUI((s) => s.open);

  // geometry pivots at bottom-centre so things stand on the ground
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(width, height);
    g.translate(0, height / 2 - tex.padRatio * height, 0);
    return g;
  }, [width, height, tex.padRatio]);

  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ map: tex.map, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide }),
    [tex]
  );
  const shadowMat = useMemo(
    () => new THREE.MeshBasicMaterial({ map: tex.shadow, transparent: true, opacity: 0.28, depthWrite: false }),
    [tex]
  );

  useFrame((state) => {
    if (!lift.current) return;
    const t = state.clock.elapsedTime * speed + phase;
    const g = lift.current;
    const target = hovered.current ? 0.7 : 0;
    g.position.z = THREE.MathUtils.lerp(g.position.z, target, 0.1);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, hovered.current ? -0.18 : 0, 0.1);
    g.rotation.z = Math.sin(t * 1.3) * sway;
    g.position.y = Math.sin(t) * bob;
  });

  const interactive = panel
    ? {
        onPointerEnter: (e) => {
          e.stopPropagation();
          hovered.current = true;
          document.body.style.cursor = "pointer";
        },
        onPointerLeave: () => {
          hovered.current = false;
          document.body.style.cursor = "";
        },
        onClick: (e) => {
          e.stopPropagation();
          if (e.delta > 6) return; // was a drag, not a click
          hovered.current = false;
          document.body.style.cursor = "";
          open(panel);
        },
      }
    : {};

  return (
    <group position={position} rotation={rotation}>
      <group ref={lift}>
        <mesh geometry={geom} material={mat} renderOrder={renderOrder} {...interactive} />
        <mesh
          geometry={geom}
          material={shadowMat}
          position={[shadowOffset[0], shadowOffset[1], -0.06]}
          renderOrder={-1}
          raycast={() => null}
        />
      </group>
    </group>
  );
}
