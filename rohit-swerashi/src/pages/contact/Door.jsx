import { WalkerKnocking } from "../../components/Commuter";
import { Reveal } from "../../components/ui";
import { useMediaQuery } from "../../lib/motion";
import { P, Q, k, e, FarTree, FarBlock, House, FarStreet, NearStreet } from "./Neighbourhood";
import React from "react";

export function Door() {
  const a = useMediaQuery("(max-width: 760px)");
  const c = a
    ? {
        x: 150,
        y: 40,
        w: 760,
        h: 292,
      }
    : {
        x: -330,
        y: 46,
        w: 1800,
        h: 286,
      };
  const r = `${c.x} ${c.y} ${c.w} ${c.h}`;
  const [l, t] = React.useState(0);
  const o = React.useRef(0);
  const x = React.useRef(null);
  const d = React.useRef(null);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const i = window.setInterval(() => t((j) => j + 1), P);
    return () => window.clearInterval(i);
  }, []);
  React.useEffect(() => () => window.clearTimeout(o.current), []);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const i = x.current;
    const j = d.current;
    if (!i || !j) return;
    let p = 0;
    const y = () => {
      p = 0;
      const H = i.getBoundingClientRect();
      const b = window.innerHeight || 1;
      const z = b * 0.92;
      const A = b * 0.16;
      const N = Math.min(1, Math.max(0, (z - H.top) / (z - A)));
      const M = N < 0.5 ? 4 * N * N * N : 1 - Math.pow(-2 * N + 2, 3) / 2;
      const f = c.w + (c.w / Q - c.w) * M;
      const X = f * (c.h / c.w);
      const R = c.x + c.w / 2 + (k.x - (c.x + c.w / 2)) * M;
      const T = c.y + c.h / 2 + (k.y - (c.y + c.h / 2)) * M;
      j.setAttribute(
        "viewBox",
        `${(R - f / 2).toFixed(1)} ${(T - X / 2).toFixed(1)} ${f.toFixed(1)} ${X.toFixed(1)}`,
      );
    };
    const v = () => {
      p || (p = requestAnimationFrame(y));
    };
    y();
    window.addEventListener("scroll", v, {
      passive: true,
    });
    window.addEventListener("resize", v);
    return () => {
      window.removeEventListener("scroll", v);
      window.removeEventListener("resize", v);
      p && cancelAnimationFrame(p);
      j.setAttribute("viewBox", r);
    };
  }, [a, l]);
  return (
    <Reveal className="sv-door">
      <div
        className="sv-door-view"
        ref={x}
        onClick={() => t((i) => i + 1)}
        role="img"
        aria-label="A house on a quiet street, and someone on the step knocking. Click to knock again."
      >
        <svg key={l} viewBox={r} preserveAspectRatio="xMidYMax meet" ref={d} aria-hidden="true">
          <path className="ln ground" d={`M-760 ${e} H1900`} />
          <g className="far">
            <FarTree x={-690} s={0.78} />
            <FarBlock x={-748} w={132} h={92} v={0} />
            <FarBlock x={-560} w={124} h={106} v={1} />
            <FarTree x={-430} s={0.92} />
            <FarTree x={-286} s={0.86} />
            <FarBlock x={-344} w={140} h={88} v={2} />
            <FarBlock x={-150} w={128} h={104} v={3} />
            <FarTree x={-30} s={1.05} />
            <FarBlock x={40} w={158} h={116} v={1} />
            <FarTree x={186} s={1.05} />
            <FarBlock x={846} w={150} h={104} v={2} />
            <FarTree x={812} s={0.72} />
            <FarTree x={1044} s={0.9} />
            <FarBlock x={1130} w={146} h={92} v={3} />
            <FarBlock x={1330} w={132} h={108} v={0} />
            <FarTree x={1490} s={0.82} />
            <FarBlock x={1560} w={140} h={96} v={1} />
            <FarTree x={1730} s={0.88} />
            <FarBlock x={1780} w={126} h={104} v={2} />
          </g>
          <House />
          <g className="stand" transform={`translate(474 ${e - 9}) scale(1.02)`}>
            <WalkerKnocking uid="door" />
          </g>
          <FarStreet />
          <NearStreet />
        </svg>
      </div>
    </Reveal>
  );
}
