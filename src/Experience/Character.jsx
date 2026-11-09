import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import Cutout from "./paper/Cutout";
import { character } from "./paper/drawings";
import { useScrollCurve } from "./hooks/useScrollCurve";
import { initialCharacterPoints, CHARACTER_SHIFT_X_AMOUNT, characterCurve } from "./components/curve";

// Paper puppet on a stick that follows the scroll (replaces Mr. Panda).
export default function Character({ scrollProgress, cameraScrollCurve }) {
  const ref = useRef();
  const curve = useScrollCurve(characterCurve, initialCharacterPoints, CHARACTER_SHIFT_X_AMOUNT);
  const [wiggle] = useState({ t: 0, lastX: null });

  useFrame((_, delta) => {
    if (!ref.current) return;

    // keep this curve's loop state in sync with the camera's
    if (cameraScrollCurve.transitionCurveActive.current !== curve.transitionCurveActive.current) {
      curve.transitionCurveActive.current = cameraScrollCurve.transitionCurveActive.current;
      if (cameraScrollCurve.transitionCurveActive.current) {
        curve.loopCounter.current = cameraScrollCurve.loopCounter.current;
        curve.initiateTransitionCurve();
      } else {
        const dir = cameraScrollCurve.loopCounter.current > curve.loopCounter.current ? "forward" : "backward";
        curve.shiftCurvePoints(dir);
        curve.loopCounter.current = cameraScrollCurve.loopCounter.current;
      }
    }

    const p = curve.getCurrentPoint(scrollProgress.current);
    const g = ref.current;
    const prevX = g.position.x;
    g.position.x = THREE.MathUtils.lerp(g.position.x, p.x, 0.1);
    g.position.z = THREE.MathUtils.lerp(g.position.z, p.z, 0.1);

    // hop + lean while moving, gentle breathing when idle
    const speed = Math.min(Math.abs(g.position.x - prevX) * 20, 1);
    wiggle.t += delta * (2 + speed * 10);
    g.position.y = p.y + Math.abs(Math.sin(wiggle.t)) * 0.18 * speed + Math.sin(wiggle.t * 0.5) * 0.02;
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -Math.sign(g.position.x - prevX) * speed * 0.12, 0.1);
  });

  return (
    <group ref={ref} position={[initialCharacterPoints[0].x, initialCharacterPoints[0].y, 0.1]}>
      <Cutout id="character" draw={character} w={420} h={760} height={2.4} />
    </group>
  );
}
