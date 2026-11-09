import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Panel.module.scss";
import { useUI } from "../../store";
import { panels } from "../../content";

// Paper card that slides in when a clickable cutout is clicked.
export default function Panel() {
  const key = useUI((s) => s.openPanel);
  const close = useUI((s) => s.close);
  const cardRef = useRef(null);
  const data = key ? panels[key] : null;

  useEffect(() => {
    if (!data) return;
    gsap.fromTo(
      cardRef.current,
      { y: 40, rotate: -2, opacity: 0 },
      { y: 0, rotate: -0.6, opacity: 1, duration: 0.45, ease: "back.out(1.6)" }
    );
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [data, close]);

  if (!data) return null;

  return (
    <div className={styles.backdrop} onClick={close}>
      <article ref={cardRef} className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={close} aria-label="Close">
          ×
        </button>
        <span className={styles.kicker}>{data.kicker}</span>
        <h2>{data.title}</h2>
        {data.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {data.links?.length > 0 && (
          <ul className={styles.links}>
            {data.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </article>
    </div>
  );
}
