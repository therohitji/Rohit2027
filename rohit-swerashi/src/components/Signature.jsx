import { SIG_DOTS, SIG_INK, SIG_PEN, SIG_STROKES, SIG_TOTAL, SIG_VIEWBOX } from "../content/signature";
import React from "react";

// Rohit's signature. With `play` it is written stroke by stroke, then the exact ink settles over it.
export function Signature({ play = false, speed = 1, className = "" }) {
  const id = `sig${React.useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const ink = `url(#${id})`;
  const cls = ["rs-sign", play && "is-playing", className].filter(Boolean).join(" ");
  return (
    <svg className={cls} viewBox={SIG_VIEWBOX} aria-hidden="true" style={{ "--sig-speed": speed, "--sig-total": SIG_TOTAL }}>
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

// Signs once, after the page curtain has lifted, so the visitor sees the pen move.
export function SignWhenShown({ className = "" }) {
  const [play, setPlay] = React.useState(false);
  React.useEffect(() => {
    let wait = 0;
    const check = () => {
      if (document.querySelector(".sv-curtain.is-on")) wait = window.setTimeout(check, 120);
      else wait = window.setTimeout(() => setPlay(true), 350);
    };
    check();
    return () => window.clearTimeout(wait);
  }, []);
  return (
    <div className={className} role="img" aria-label="Signature of Rohit Swerashi">
      <Signature play={play} />
    </div>
  );
}
