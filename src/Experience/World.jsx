import Cutout from "./paper/Cutout";
import Paper, { TILE_W } from "./paper/Paper";
import * as D from "./paper/drawings";

// One "tile" of the world, spanning x ∈ [-23, 43).
// The camera curve walks across it, then loops to the next copy.
// Everything here is a placeholder you can replace with Blender models
// (see README → "Swapping in Blender models").

const accountableLabel = D.sectionLabel("Accountable", "mobile app");
const threeDLabel = D.sectionLabel("3D & Blender", "renders + motion");

function Tile() {
  return (
    <group>
      <Paper />

      {/* ── 1 · hello ── */}
      <Cutout id="cloud-a" draw={D.cloud} w={420} h={260} height={1.1} position={[-20.5, 3.4, -3.8]} bob={0.12} />
      <Cutout id="title" draw={D.title} w={1400} h={440} height={2.0} position={[-15.6, 1.9, -3.4]} border={0} />
      <Cutout id="hint" draw={D.scrollHint} w={700} h={260} height={1.0} position={[-15.4, 0.7, -3.0]} border={0} />
      <Cutout id="about" draw={D.aboutNote} w={520} h={520} height={2.0} position={[-11.0, 1.1, -3.0]} rotation={[0, 0, 0.05]} panel="about" />
      <Cutout id="cloud-b" draw={D.cloud} w={420} h={260} height={0.9} position={[-12.6, 3.9, -3.9]} bob={0.1} speed={0.8} />
      <Cutout id="baobab" draw={D.baobab} w={700} h={760} height={3.6} position={[-6.8, 0, -3.4]} sway={0.01} />
      <Cutout id="grass-1" draw={D.grass} w={260} h={200} height={0.5} position={[-18.4, 0, -1.4]} sway={0.06} />
      <Cutout id="flower-1" draw={D.flower} w={220} h={320} height={0.7} position={[-13.2, 0, -1.8]} sway={0.05} />
      <Cutout id="grass-2" draw={D.grass} w={260} h={200} height={0.6} position={[-9.0, 0, 1.6]} sway={0.07} />

      {/* ── 2 · Willem ── */}
      <Cutout id="willem-label" draw={D.willemLabel} w={1200} h={380} height={1.9} position={[-0.4, 2.55, -3.6]} border={0} />
      <Cutout id="lamp" draw={D.lamp} w={360} h={520} height={1.6} position={[-1.8, 0, -2.6]} sway={0.02} />
      <Cutout id="monitor" draw={D.monitor} w={900} h={760} height={2.8} position={[2.6, 0, -2.8]} panel="willem" />
      <Cutout id="plant" draw={D.plant} w={360} h={420} height={1.3} position={[6.2, 0, -2.3]} sway={0.03} />
      <Cutout id="cloud-c" draw={D.cloud} w={420} h={260} height={1.0} position={[5.2, 4.1, -3.9]} bob={0.12} />
      <Cutout id="grass-3" draw={D.grass} w={260} h={200} height={0.5} position={[0.8, 0, 1.4]} sway={0.06} />
      <Cutout id="flower-2" draw={D.flower} w={220} h={320} height={0.6} position={[7.6, 0, -1.4]} sway={0.05} />

      {/* ── 3 · Accountable + BridgeAI ── */}
      <Cutout id="acc-label" draw={accountableLabel} w={1000} h={380} height={1.7} position={[10.2, 2.6, -3.6]} border={0} />
      <Cutout id="phone" draw={D.phone} w={460} h={820} height={2.8} position={[12.4, 0, -2.6]} rotation={[0, 0, -0.04]} panel="accountable" />
      <Cutout id="grass-4" draw={D.grass} w={260} h={200} height={0.55} position={[15.0, 0, -1.6]} sway={0.06} />
      <Cutout id="bulb" draw={D.bulb} w={560} h={720} height={3.0} position={[18.4, 0.15, -2.9]} panel="bridgeai" sway={0.015} />
      <Cutout id="cloud-d" draw={D.cloud} w={420} h={260} height={1.0} position={[15.6, 4.0, -3.9]} bob={0.1} />
      <Cutout id="ribbon" draw={D.ribbon} w={420} h={620} height={1.7} position={[22.6, 1.3, -3.0]} panel="rise" sway={0.04} />
      <Cutout id="flower-3" draw={D.flower} w={220} h={320} height={0.7} position={[20.8, 0, 1.2]} sway={0.05} />

      {/* ── 4 · 3D + contact ── */}
      <Cutout id="3d-label" draw={threeDLabel} w={1100} h={380} height={1.7} position={[28.4, 2.6, -3.6]} border={0} />
      <Cutout id="cube" draw={D.cube} w={520} h={560} height={1.8} position={[26.6, 0, -2.6]} panel="blender" rotation={[0, 0, 0.04]} />
      <Cutout id="donut" draw={D.donut} w={560} h={420} height={1.3} position={[29.8, 0.05, -2.2]} panel="blender" bob={0.06} />
      <Cutout id="plane" draw={D.plane} w={420} h={260} height={0.7} position={[32.6, 3.6, -3.2]} bob={0.18} speed={1.4} />
      <Cutout id="mailbox" draw={D.mailbox} w={520} h={620} height={2.3} position={[35.2, 0, -2.4]} panel="contact" />
      <Cutout id="grass-5" draw={D.grass} w={260} h={200} height={0.6} position={[33.0, 0, 1.4]} sway={0.06} />
      <Cutout id="outro" draw={D.outro} w={1100} h={360} height={1.6} position={[39.2, 2.2, -3.6]} border={0} />
      <Cutout id="cloud-e" draw={D.cloud} w={420} h={260} height={0.9} position={[41.0, 3.9, -3.9]} bob={0.1} />
    </group>
  );
}

// Three copies so the loop seam is never visible, whichever way you scroll.
export default function World() {
  return (
    <>
      <group position={[-TILE_W, 0, 0]}>
        <Tile />
      </group>
      <Tile />
      <group position={[TILE_W, 0, 0]}>
        <Tile />
      </group>
    </>
  );
}
