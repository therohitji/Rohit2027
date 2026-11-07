import { Button, dimLines, Lines } from "../../components/ui";
import { prefersReduced } from "../../lib/fx";
import React from "react";

export function Ribbon({ title, sub, cta, ctaHref, images }) {
  const box = React.useRef(null);
  React.useEffect(() => {
    const el = box.current;
    const tiles = Array.from(el.querySelectorAll("img"));
    let seen = false;
    let raf = 0;
    const SP = 172;
    const span = tiles.length * SP;
    const paint = (now) => {
      raf = 0;
      const w = el.clientWidth;
      const h = el.clientHeight;
      const off = now * 0.018 + window.scrollY * 0.32;
      tiles.forEach((t, i) => {
        const x = ((i * SP + off) % span) - 160;
        const u = x / Math.max(w, 1);
        const y = h * 0.52 + Math.sin(u * Math.PI * 2.1 + 0.4) * h * 0.26;
        const slope = Math.cos(u * Math.PI * 2.1 + 0.4);
        t.style.transform = `translate3d(${x}px,${y - 80}px,0) rotateZ(${(slope * -15).toFixed(1)}deg) rotateY(${(slope * 26).toFixed(1)}deg)`;
      });
      if (seen) raf = requestAnimationFrame(paint);
    };
    paint(0);
    if (prefersReduced()) return;
    const io = new IntersectionObserver(([e]) => {
      seen = e.isIntersecting;
      if (seen && !raf) raf = requestAnimationFrame(paint);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      seen = false;
      cancelAnimationFrame(raf);
    };
  }, [images.length]);
  return (
    <section className="rs-rib" id="talk">
      <div className="sv-wrap rs-rib-copy">
        <Lines as="h2" lines={dimLines(title)} />
        <p>{sub}</p>
        <Button href={ctaHref}>{cta}</Button>
      </div>
      <div className="rs-rib-tiles" ref={box} aria-hidden="true">
        {images.map((s, i) => (
          <img key={i} src={s} alt="Rohit Swerashi" loading="lazy" decoding="async" />
        ))}
      </div>
    </section>
  );
}
