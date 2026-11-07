import { prefersReduced } from "../lib/fx";
import React from "react";

const N = 15;
const POINTS = (() => {
  const out = [];
  const v = (i) => (i / (N - 1)) * 2 - 1;
  for (let a = 0; a < N; a++)
    for (let b = 0; b < N; b++) {
      const edge = a === 0 || b === 0 || a === N - 1 || b === N - 1 ? 1 : 0;
      for (const s of [-1, 1]) {
        out.push([s, v(a), v(b), edge], [v(a), s, v(b), edge], [v(a), v(b), s, edge]);
      }
    }
  return out;
})();

export function DotCube() {
  const cv = React.useRef(null);
  React.useEffect(() => {
    const canvas = cv.current;
    const g = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let S = 0;
    const size = () => {
      S = canvas.clientWidth;
      canvas.width = canvas.height = S * dpr;
    };
    size();
    let raf = 0;
    let seen = true;
    let px = 0;
    let py = 0;
    let ax = 0.6;
    let ay = 0.7;
    const color = getComputedStyle(canvas).color;
    const draw = (t) => {
      raf = 0;
      ay = 0.7 + t * 0.00028 + px * 0.5;
      ax += (0.6 + py * 0.35 - ax) * 0.05;
      const sa = Math.sin(ay);
      const ca = Math.cos(ay);
      const sb = Math.sin(ax);
      const cb = Math.cos(ax);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, S, S);
      g.fillStyle = color;
      const R = S * 0.27;
      for (const [x, y, z, e] of POINTS) {
        const x1 = x * ca + z * sa;
        const z1 = -x * sa + z * ca;
        const y2 = y * cb - z1 * sb;
        const z2 = y * sb + z1 * cb;
        const f = 4.6 / (4.6 - z2);
        const near = (z2 + 1.8) / 3.6;
        g.globalAlpha = (e ? 0.45 : 0.12) + near * (e ? 0.55 : 0.34);
        const d = (e ? 2.6 : 1.7) * f;
        g.fillRect(S / 2 + x1 * R * f - d / 2, S / 2 + y2 * R * f - d / 2, d, d);
      }
      g.globalAlpha = 1;
      if (seen) raf = requestAnimationFrame(draw);
    };
    if (prefersReduced()) {
      seen = false;
      draw(0);
      return;
    }
    raf = requestAnimationFrame(draw);
    const io = new IntersectionObserver(([e]) => {
      seen = e.isIntersecting;
      if (seen && !raf) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    const move = (e) => {
      px = (e.clientX / window.innerWidth) * 2 - 1;
      py = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", size);
    return () => {
      seen = false;
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", size);
    };
  }, []);
  return <canvas className="rs-dotcube" ref={cv} aria-hidden="true" />;
}
