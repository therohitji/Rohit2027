import dots from "../../content/land-dots.json";
import { prefersReduced } from "../../lib/fx";
import React from "react";

const RAD = Math.PI / 180;
const ORIGIN = [25.32, 83.0];

function toXYZ(lat, lon) {
  const a = lat * RAD;
  const b = lon * RAD;
  return [Math.cos(a) * Math.sin(b), Math.sin(a), Math.cos(a) * Math.cos(b)];
}

const POINTS = (() => {
  const out = new Float32Array((dots.length / 2) * 3);
  for (let i = 0; i < dots.length / 2; i++) {
    const p = toXYZ(dots[i * 2] / 10, dots[i * 2 + 1] / 10);
    out[i * 3] = p[0];
    out[i * 3 + 1] = p[1];
    out[i * 3 + 2] = p[2];
  }
  return out;
})();

function slerp(a, b, t) {
  const d = Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])) || 1e-4;
  const s = Math.sin(d);
  const p = Math.sin((1 - t) * d) / s;
  const q = Math.sin(t * d) / s;
  const h = 1 + Math.sin(t * Math.PI) * d * 0.11;
  return [(a[0] * p + b[0] * q) * h, (a[1] * p + b[1] * q) * h, (a[2] * p + b[2] * q) * h];
}

export const GLOBE_HOLD = 3400;

export function Globe({ stops, dark, onStop, jumpTo }) {
  const box = React.useRef(null);
  const cv = React.useRef(null);
  React.useEffect(() => {
    const canvas = cv.current;
    const g = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const ink = dark ? "245,241,234" : "11,11,12";
    const rim1 = dark ? "201,92,84" : "110,31,36";
    const rim2 = dark ? "70,112,214" : "22,35,63";
    const from = toXYZ(...ORIGIN);
    const targets = stops.map((s) => toXYZ(s.lat, s.lon));
    let W = 0;
    let H = 0;
    let R = 0;
    let cx = 0;
    let cy = 0;
    let rimCanvas = null;
    const size = () => {
      const r = box.current.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      R = Math.min(W, H) * 0.45;
      cx = W / 2;
      cy = H / 2;
      rimCanvas = document.createElement("canvas");
      rimCanvas.width = rimCanvas.height = (R + 90) * 2 * dpr;
      const c = rimCanvas.getContext("2d");
      c.scale(dpr, dpr);
      c.translate(R + 90, R + 90);
      for (const [at, col] of [
        [-Math.PI / 2 - 0.2, rim1],
        [Math.PI / 2 - 0.2, rim2],
      ]) {
        const sweep = c.createConicGradient(at - 1.5, 0, 0);
        sweep.addColorStop(0, `rgba(${col},0)`);
        sweep.addColorStop(0.24, `rgba(${col},0.95)`);
        sweep.addColorStop(0.48, `rgba(${col},0)`);
        sweep.addColorStop(1, `rgba(${col},0)`);
        c.shadowColor = `rgba(${col},0.75)`;
        c.shadowBlur = 38;
        c.strokeStyle = sweep;
        c.lineWidth = 2;
        c.beginPath();
        c.arc(0, 0, R, 0, 7);
        c.stroke();
      }
    };
    size();
    let lonNow = -ORIGIN[1] * RAD;
    let latNow = ORIGIN[0] * 0.5 * RAD;
    let raf = 0;
    let seen = true;
    let i = 0;
    let t0 = performance.now();
    const HOLD = GLOBE_HOLD;
    onStop(0);
    const project = (x, y, z, sl, cl, sp, cp) => {
      const x1 = x * cl + z * sl;
      const z1 = -x * sl + z * cl;
      const y2 = y * cp - z1 * sp;
      const z2 = y * sp + z1 * cp;
      return [x1, y2, z2];
    };
    const frame = (now) => {
      raf = 0;
      if (!seen) return;
      let elapsed = now - t0;
      if (elapsed > HOLD) {
        i = (i + 1) % stops.length;
        t0 = now;
        elapsed = 0;
        onStop(i);
      }
      const to = targets[i];
      const mid = [from[0] + to[0], from[1] + to[1], from[2] + to[2]];
      const lonWant = -Math.atan2(mid[0], mid[2]);
      const latWant = Math.atan2(mid[1], Math.hypot(mid[0], mid[2])) * 0.7;
      let dl = lonWant - lonNow;
      dl = Math.atan2(Math.sin(dl), Math.cos(dl));
      lonNow += dl * 0.025;
      latNow += (latWant - latNow) * 0.025;
      const sl = Math.sin(lonNow);
      const cl = Math.cos(lonNow);
      const sp = Math.sin(latNow);
      const cp = Math.cos(latNow);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, W, H);
      g.drawImage(rimCanvas, cx - R - 90, cy - R - 90, (R + 90) * 2, (R + 90) * 2);
      for (let k = 0; k < POINTS.length; k += 3) {
        const p = project(POINTS[k], POINTS[k + 1], POINTS[k + 2], sl, cl, sp, cp);
        if (p[2] <= 0.02) continue;
        g.fillStyle = `rgba(${ink},${(0.16 + p[2] * 0.74).toFixed(2)})`;
        g.fillRect(cx + p[0] * R, cy - p[1] * R, 1.25, 1.25);
      }
      const prog = Math.min(1, elapsed / 1500);
      const eased = 1 - Math.pow(1 - prog, 3);
      g.lineWidth = 1.6;
      g.strokeStyle = dark ? "#e0b896" : "#6e1f24";
      g.beginPath();
      let pen = false;
      const STEPS = 60;
      for (let s = 0; s <= STEPS * eased; s++) {
        const q = slerp(from, to, s / STEPS);
        const p = project(q[0], q[1], q[2], sl, cl, sp, cp);
        if (p[2] < -0.05) {
          pen = false;
          continue;
        }
        const X = cx + p[0] * R;
        const Y = cy - p[1] * R;
        if (pen) g.lineTo(X, Y);
        else g.moveTo(X, Y);
        pen = true;
      }
      g.stroke();
      for (const [pt, r0] of [
        [from, 3.5],
        [to, 3.5 + (prog >= 1 ? 1.5 : 0)],
      ]) {
        const p = project(pt[0], pt[1], pt[2], sl, cl, sp, cp);
        if (p[2] < 0) continue;
        g.fillStyle = dark ? "#f5e6d6" : "#6e1f24";
        g.beginPath();
        g.arc(cx + p[0] * R, cy - p[1] * R, r0, 0, 7);
        g.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    const still = () => {
      const to = targets[i];
      const mid = [from[0] + to[0], from[1] + to[1], from[2] + to[2]];
      lonNow = -Math.atan2(mid[0], mid[2]);
      latNow = Math.atan2(mid[1], Math.hypot(mid[0], mid[2])) * 0.7;
      t0 = performance.now() - 2000;
      seen = true;
      frame(performance.now());
      cancelAnimationFrame(raf);
      raf = 0;
      seen = false;
    };
    jumpTo.current = (k) => {
      i = k;
      t0 = performance.now();
      onStop(k);
      if (prefersReduced()) still();
    };
    if (prefersReduced()) still();
    else raf = requestAnimationFrame(frame);
    const io = new IntersectionObserver(([e]) => {
      const was = seen;
      seen = e.isIntersecting && !prefersReduced();
      if (seen && !was && !raf) raf = requestAnimationFrame(frame);
    });
    io.observe(box.current);
    window.addEventListener("resize", size);
    return () => {
      io.disconnect();
      seen = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
    };
  }, [stops, dark]);
  return (
    <div className="rs-globe" ref={box} aria-hidden="true">
      <canvas ref={cv} />
    </div>
  );
}
