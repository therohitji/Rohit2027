import { dimLines } from "../../components/ui";
import { DeskScene } from "./DeskScene";
import React from "react";

export function AboutHero({ lead }) {
  const t = React.useRef(null);
  const c = React.useRef(null);
  const n = React.useRef(null);
  React.useEffect(() => {
    const o = t.current;
    const w = c.current;
    const i = n.current;
    if (!o || !w || !i) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      o.classList.add("is-flat");
      return;
    }
    const m = (N, f, x) => Math.min(x, Math.max(f, N));
    const p = (N) => N * N * N;
    let l = 0;
    const j = () => {
      l = 0;
      const N = window.innerHeight;
      const f = -o.getBoundingClientRect().top;
      const x = Math.max(1, o.offsetHeight - N);
      const u = m(f / x, 0, 1);
      const r = p(u);
      i.style.transform = `translateY(${(-r * 320).toFixed(1)}px)`;
      i.style.opacity = m(1 - Math.pow(u, 1.35) * 1.02, 0, 1).toFixed(3);
    };
    const d = () => {
      l || (l = requestAnimationFrame(j));
    };
    j();
    window.addEventListener("scroll", d, {
      passive: true,
    });
    window.addEventListener("resize", d);
    return () => {
      window.removeEventListener("scroll", d);
      window.removeEventListener("resize", d);
      l && cancelAnimationFrame(l);
    };
  }, []);
  return (
    <section className="sv-ab-hero" ref={t} id="top">
      <div className="sv-ab-hero-pin" ref={c}>
        <div className="sv-ab-hero-inner" ref={n}>
          <h1 className="rs-sr">Rohit Swerashi, founder of GeniOS</h1>
          <p className="lead">{dimLines([lead])}</p>
        </div>
        <DeskScene />
      </div>
    </section>
  );
}
