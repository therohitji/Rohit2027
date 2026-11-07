import { prefersReduced } from "../lib/fx";
import { LOGO_STROKE } from "./Logo";
import { SWERASHI_AT, WORDS_BOX, WORD_ROHIT, WORD_SWERASHI } from "./LogoWords";
import React from "react";

const RAMP = ".:-=+*#%@";

// The logo typed out in characters on a field of 0s and 1s, so it sits inside the footer
// instead of on top of it. It types in from the left once, then a band of colour keeps crossing it.
export function SignatureAscii() {
  const cv = React.useRef(null);
  React.useEffect(() => {
    const canvas = cv.current;
    const g = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const [vx, vy, vw, vh] = WORDS_BOX;
    const still = prefersReduced();
    let W = 0;
    let H = 0;
    let font = "";
    let accent = "";
    let cells = [];
    let dust = [];
    let base = null;
    let raf = 0;
    let seen = false;
    let born = 0;
    let last = 0;
    let mx = -9999;
    let my = -9999;
    const build = () => {
      const css = getComputedStyle(canvas);
      W = canvas.clientWidth;
      if (!W) return false;
      H = W < 600 ? W / 3.1 : Math.min(W / 5.2, 330);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.height = `${H}px`;
      accent = css.getPropertyValue("--sv-accent-2").trim();
      const fs = W < 600 ? 2.7 : Math.max(3.6, Math.min(5.4, W / 250));
      font = `${fs}px ${css.fontFamily}`;
      const off = document.createElement("canvas");
      off.width = Math.ceil(W);
      off.height = Math.ceil(H);
      const c = off.getContext("2d", { willReadFrequently: true });
      const sx = W / vw;
      const sy = H / vh;
      c.lineWidth = LOGO_STROKE * (W < 600 ? 1.5 : 2.2);
      c.lineJoin = "round";
      for (const [d, at] of [
        [WORD_ROHIT, 0],
        [WORD_SWERASHI, SWERASHI_AT],
      ]) {
        c.setTransform(sx, 0, 0, sy, (at - vx) * sx, -vy * sy);
        const path = new Path2D(d);
        c.fill(path);
        c.stroke(path);
      }
      const data = c.getImageData(0, 0, off.width, off.height).data;
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.font = font;
      const cw = c.measureText("@").width;
      const ch = fs;
      cells = [];
      dust = [];
      for (let y = 0; y + ch <= H; y += ch) {
        for (let x = 0; x + cw <= W; x += cw) {
          let on = 0;
          let all = 0;
          for (let j = 0; j < ch; j += 1) {
            for (let i = 0; i < cw; i += 1) {
              all++;
              if (data[(Math.floor(y + j) * off.width + Math.floor(x + i)) * 4 + 3] > 120) on++;
            }
          }
          const cover = on / all;
          if (cover > 0.12) {
            cells.push({ x, y, t: RAMP[Math.min(RAMP.length - 1, Math.floor(cover * RAMP.length))] });
          } else if (W >= 600 && Math.random() < 0.03) {
            const edge = Math.min(x, W - x, y, H - y) / (H * 0.3);
            dust.push({ x, y, t: Math.random() < 0.5 ? "0" : "1", a: 0.3 * Math.min(1, edge) });
          }
        }
      }
      base = document.createElement("canvas");
      base.width = canvas.width;
      base.height = canvas.height;
      const b = base.getContext("2d");
      b.scale(dpr, dpr);
      b.font = font;
      b.textBaseline = "top";
      b.fillStyle = css.color;
      for (const d of dust) {
        b.globalAlpha = d.a;
        b.fillText(d.t, d.x, d.y);
      }
      b.globalAlpha = 1;
      for (const k of cells) b.fillText(k.t, k.x, k.y);
      return true;
    };
    const draw = (now) => {
      if (!base) return;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, W, H);
      const typed = still ? 1 : Math.min(1, (now - born) / 1300);
      g.save();
      g.beginPath();
      g.rect(0, 0, W * typed, H);
      g.clip();
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.drawImage(base, 0, 0);
      g.restore();
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.font = font;
      g.textBaseline = "top";
      g.fillStyle = accent;
      if (still) return;
      const band = ((now * 0.00011) % 1.3) * W - W * 0.15;
      const reach = W * 0.07;
      for (const k of cells) {
        if (k.x > W * typed) continue;
        const far = Math.abs(k.x - band) / reach;
        const near = Math.hypot(k.x - mx, k.y - my) / 90;
        const a = Math.max(1 - far, 1 - near);
        if (a <= 0) continue;
        g.globalAlpha = a;
        g.fillText(k.t, k.x, k.y);
      }
      g.globalAlpha = 0.8;
      for (let n = 0; n < 24 && dust.length; n++) {
        const d = dust[Math.floor(Math.random() * dust.length)];
        if (d.x <= W * typed && d.a > 0.12) g.fillText(d.t === "0" ? "1" : "0", d.x, d.y);
      }
      g.globalAlpha = 1;
    };
    const loop = (now) => {
      raf = 0;
      if (!seen) return;
      if (now - last > 70) {
        last = now;
        draw(now);
      }
      raf = requestAnimationFrame(loop);
    };
    build();
    if (still) draw(0);
    const io = new IntersectionObserver(
      ([e]) => {
        seen = e.isIntersecting && !still;
        if (seen && !born) born = performance.now();
        if (seen && !raf) raf = requestAnimationFrame(loop);
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);
    const sized = new ResizeObserver(() => {
      if (canvas.clientWidth && canvas.clientWidth !== W) redo();
    });
    sized.observe(canvas);
    const move = (e) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const leave = () => {
      mx = my = -9999;
    };
    const redo = () => {
      if (build()) draw(still ? 0 : performance.now());
    };
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    window.addEventListener("resize", redo);
    const theme = new MutationObserver(redo);
    theme.observe(canvas.closest(".site-root"), { attributes: true, attributeFilter: ["class"] });
    document.fonts?.ready.then(redo);
    return () => {
      io.disconnect();
      sized.disconnect();
      theme.disconnect();
      seen = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", redo);
    };
  }, []);
  return (
    <div className="rs-sig">
      <canvas ref={cv} role="img" aria-label="Rohit Swerashi" />
    </div>
  );
}
