import { SIG_DOTS, SIG_INK, SIG_PEN, SIG_STROKES, SIG_TOTAL, SIG_VIEWBOX } from "../content/signature";
import React from "react";

// Rohit's signature. Once `play` is true it is written stroke by stroke, then the exact ink settles over it.
// With reduced motion it simply shows signed.
export function Signature({ play, speed = 1, className = "" }) {
  const id = `sig${React.useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const ink = `url(#${id})`;
  return (
    <svg
      className={`rs-sign${play ? " is-playing" : ""} ${className}`}
      viewBox={SIG_VIEWBOX}
      role="img"
      aria-label="Signature of Rohit Swerashi"
      style={{ "--sig-speed": speed, "--sig-total": SIG_TOTAL }}
    >
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1838" y2="0">
          <stop offset="0" className="s1" />
          <stop offset="0.5" className="s2" />
          <stop offset="1" className="s3" />
        </linearGradient>
      </defs>
      <g className="pen" fill="none" stroke={ink} strokeWidth={SIG_PEN} strokeLinecap="round" strokeLinejoin="round">
        {SIG_STROKES.map((s, i) => (
          <path key={i} d={s.d} strokeDasharray={s.len} strokeDashoffset={s.len} style={{ "--t": s.t, "--d": s.dur }} />
        ))}
      </g>
      <path className="ink" d={SIG_INK} fill={ink} fillRule="evenodd" />
      {SIG_DOTS.map((p, i) => (
        <circle key={i} className="dot" cx={p.cx} cy={p.cy} r={p.r} fill={ink} style={{ "--t": p.t }} />
      ))}
    </svg>
  );
}

// Signs once, the first time it scrolls into view.
export function SignOnView({ className = "" }) {
  const box = React.useRef(null);
  const [play, setPlay] = React.useState(false);
  React.useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setPlay(true);
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(box.current);
    return () => io.disconnect();
  }, []);
  return (
    <div className={className} ref={box}>
      <Signature play={play} />
    </div>
  );
}
