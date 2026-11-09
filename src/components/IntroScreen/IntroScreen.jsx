import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import styles from "./IntroScreen.module.scss";
import { useUI } from "../../store";
import { site } from "../../content";

const IntroScreen = () => {
  const ready = useUI((s) => s.ready);
  const [shouldRender, setShouldRender] = useState(true);
  const introRef = useRef(null);

  useGSAP(() => {
    if (!ready) return;
    gsap
      .timeline({ onComplete: () => setShouldRender(false) })
      .to(`.${styles.bar}`, { width: "100%", duration: 0.6, ease: "power2.out" })
      .to(introRef.current, { opacity: 0, duration: 0.9, ease: "power2.out", delay: 0.9 });
  }, [ready]);

  if (!shouldRender) return null;

  return (
    <div ref={introRef} className={styles.introScreen}>
      <div className={styles.content}>
        <h1 className={styles.name}>{site.name}</h1>
        <p>{site.introHint}</p>
        <div className={styles.track}>
          <div className={styles.bar} />
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
