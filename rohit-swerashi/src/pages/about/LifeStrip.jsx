import { assetUrl } from "../../lib/asset";
import React from "react";

export function LifeStrip({ shots }) {
  const t = React.useRef(null);
  const c = React.useRef(null);
  React.useEffect(() => {
    const n = t.current;
    const o = c.current;
    if (!n || !o || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const w = (l, j, d) => Math.min(d, Math.max(j, l));
    let i = 0;
    const m = () => {
      i = 0;
      const l = window.innerHeight;
      const j = n.getBoundingClientRect();
      const d = w((l - j.top) / (l + j.height), 0, 1);
      const N = Math.max(0, o.scrollWidth - n.clientWidth + 80);
      const f = Math.min(N, 0.45 * (l + j.height));
      o.style.transform = `translate3d(${(-d * f).toFixed(1)}px,0,0)`;
    };
    const p = () => {
      i || (i = requestAnimationFrame(m));
    };
    m();
    window.addEventListener("scroll", p, {
      passive: true,
    });
    window.addEventListener("resize", p);
    return () => {
      window.removeEventListener("scroll", p);
      window.removeEventListener("resize", p);
      i && cancelAnimationFrame(i);
    };
  }, [shots.length]);
  return (
    <div className="sv-lf" ref={t}>
      <div className="sv-lf-track" ref={c}>
        {shots.map((n) => (
          <figure key={n} className="sv-lf-card">
            <img src={assetUrl(n)} alt="Rohit Swerashi" loading="lazy" decoding="async" draggable={false} />
          </figure>
        ))}
      </div>
    </div>
  );
}
