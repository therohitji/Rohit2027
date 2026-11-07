import { Lines, Reveal } from "../../components/ui";
import React from "react";

const us = ["Founder", "Product", "AI agents", "GTM", "Mentor", "Speaker"];

export function Credo({ title, meta, lead, tail }) {
  const o = React.useRef(null);
  const w = React.useRef(null);
  const i = lead.split(" ");
  React.useEffect(() => {
    const m = o.current;
    const p = w.current;
    if (!m || !p) return;
    const l = [...p.querySelectorAll(".w")];
    if (!l.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      l.forEach((x) => {
        x.style.opacity = "1";
        x.style.transform = "none";
        x.style.filter = "none";
      });
      return;
    }
    const j = (x, u, r) => Math.min(r, Math.max(u, x));
    let d = 0;
    const N = () => {
      d = 0;
      const x = window.innerHeight;
      const u = m.getBoundingClientRect();
      const r = (u.top + u.bottom) / 2;
      const $ = j((x * 0.9 - r) / (x * 0.5), 0, 1) * l.length;
      for (let g = 0; g < l.length; g++) {
        const b = Math.max(0, Math.min(1, $ - g));
        l[g].style.opacity = (0.14 + 0.86 * b).toFixed(3);
        l[g].style.transform = `translateY(${((1 - b) * 0.2).toFixed(3)}em)`;
        l[g].style.filter = b > 0.99 ? "none" : `blur(${((1 - b) * 3.5).toFixed(2)}px)`;
      }
    };
    const f = () => {
      d || (d = requestAnimationFrame(N));
    };
    N();
    window.addEventListener("scroll", f, {
      passive: true,
    });
    window.addEventListener("resize", f);
    return () => {
      window.removeEventListener("scroll", f);
      window.removeEventListener("resize", f);
      d && cancelAnimationFrame(d);
    };
  }, [lead]);
  return (
    <section className="sv-wrap sv-pad sv-credo" ref={o} id="credo" data-badge="How I work">
      <div className="sv-credo-grid">
        <aside className="aside">
          <Lines lines={title} />
          <Reveal as="span" className="meta">
            {meta}
          </Reveal>
        </aside>
        <div className="main">
          <p className="lead" ref={w}>
            {i.map((m, p) => (
              <span key={p} className="w">
                {m}{" "}
              </span>
            ))}
          </p>
          {tail && (
            <Reveal as="p" className="tail">
              {tail}
            </Reveal>
          )}
          <Reveal as="ul" className="tags">
            {us.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
