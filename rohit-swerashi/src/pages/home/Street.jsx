import { WalkerSprites, Commuter } from "../../components/Commuter";
import { Reveal } from "../../components/ui";
import { STREET_AHEAD } from "../../content/site";
import { useMediaQuery } from "../../lib/motion";
import React from "react";

const R = 220;

const n = 132;

const js = 151;

const us = 0.84;

const qs = 1.5;

const os = 2568;

const es = 130;

const Ws = 1250;

function StreetBuilding({ i, on }) {
  const a = [64, 82, 56, 74, 68][i % 5];
  const r = [96, 124, 78, 110, 138][(i * 3) % 5];
  const l = ["flat", "step", "pitch"][i % 3];
  const c = [2, 2, 1, 2][i % 4];
  const f = Math.max(2, Math.floor((r - 26) / 17));
  const p = i * R + (R - a) / 2;
  const m = n - r;
  const w = (a - 20) / c;
  const g = i % 5;
  const h = [];
  for (let N = 0; N < f; N++)
    for (let k = 0; k < c; k++)
      h.push(
        <rect
          key={`${N}-${k}`}
          className="win"
          x={p + 10 + k * w}
          y={m + 14 + N * 17}
          width={w - 7}
          height={9}
          rx="1"
        />,
      );
  return (
    <g className={`bl ${on ? "is-on" : ""}`}>
      {l === "pitch" && (
        <path
          className={`roof rf${g}`}
          d={`M${p - 4} ${m} L${p + a / 2} ${m - 13} L${p + a + 4} ${m} z`}
        />
      )}
      {l === "step" && (
        <rect className={`roof rf${g}`} x={p + 12} y={m - 10} width={a - 24} height={10} />
      )}
      {l === "flat" && (
        <>
          <rect className={`roof rf${g}`} x={p - 4} y={m - 4} width={a + 8} height={4} />
          <g className="smoke">
            <path className="ln" d={`M${p + a - 15} ${m - 4} v-7`} />
            <circle cx={p + a - 15} cy={m - 15} r="2.6" />
            <circle cx={p + a - 11} cy={m - 20} r="1.8" />
          </g>
        </>
      )}
      <rect className={`face fc${g}`} x={p} y={m} width={a} height={r} rx="1.5" />
      <rect className="side" x={p + a - 9} y={m} width={9} height={r} />
      <rect className="shade" x={p} y={m} width={a} height={r} rx="1.5" />
      {h}
      <path className="ln" d={`M${p + a / 2 - 14} ${n} h28`} />
      <rect className="door" x={p + a / 2 - 8} y={n - 24} width={16} height={24} rx="1" />
      <path className={`awn aw${i % 3}`} d={`M${p + a / 2 - 13} ${n - 28} h26 l-4 6 h-18 z`} />
    </g>
  );
}

const Balloon = ({ x, y }) => (
  <g className="balloon" transform={`translate(${x} ${y})`}>
    <circle className="env" r="13" />
    <path className="env-band" d="M-13 1 a13 13 0 0 0 26 0 z" />
    <path className="ln" d="M-5.5 12 l1.4 6 M5.5 12 l-1.4 6" />
    <rect className="basket" x="-4.4" y="18" width="8.8" height="5.6" rx="1.4" />
  </g>
);

const Tree = ({ x }) => (
  <g className="prop">
    <path className="trunk" d={`M${x} ${n} V${n - 20}`} />
    <path
      className={`leaf g${Math.round(x / 40) % 2}`}
      d={`M${x} ${n - 46} q15 7 11.5 19 q-3.5 11 -11.5 11 q-8 0 -11.5 -11 q-3.5 -12 11.5 -19 z`}
    />
  </g>
);

const Lamp = ({ x }) => (
  <g className="prop lamp">
    <g className="lit">
      <path className="cone" d={`M${x + 7} ${n - 55} H${x + 17} L${x + 32} ${n} H${x - 8} z`} />
      <ellipse className="pool" cx={x + 12} cy={n} rx="20" ry="3" />
      <circle className="halo" cx={x + 12} cy={n - 58} r="12" />
    </g>
    <path className="ln" d={`M${x} ${n} V${n - 50} q0 -8 10 -8`} />
    <circle className="bulb" cx={x + 12} cy={n - 58} r="3.4" />
  </g>
);

const Ns = ({ x }) => (
  <g className="prop">
    <path className="ln" d={`M${x - 12} ${n} v-7 M${x + 12} ${n} v-7`} />
    <path className="ln" d={`M${x - 16} ${n - 7} h32 M${x - 16} ${n - 12} h32`} />
    {Math.round(x / 40) % 2 === 0 && (
      <g className="cat">
        <path d={`M${x - 3} ${n - 12} q0 -6.5 5 -6.5 q5 0 5 6.5 z`} />
        <circle cx={x + 7.6} cy={n - 19} r="2.5" />
        <path
          d={`M${x + 6.1} ${n - 21} l-1.3 -2.6 l2.4 .7 z M${x + 9.1} ${n - 21} l1.3 -2.6 l-2.4 .7 z`}
        />
        <path className="tail" d={`M${x - 3} ${n - 12.5} q-4.5 -1 -4.5 -6`} />
      </g>
    )}
  </g>
);

const Gs = ({ x }) => (
  <g className="prop">
    <path className="ln" d={`M${x - 8} ${n} v-10 M${x} ${n} v-12 M${x + 8} ${n} v-10`} />
  </g>
);

const Xs = ({ x }) => (
  <g className="prop">
    <path className="pot" d={`M${x - 9} ${n - 10} h18 l-2.5 10 h-13 z`} />
    <path className="ln" d={`M${x} ${n - 10} v-8 M${x} ${n - 14} l-6 -5 M${x} ${n - 15} l6 -6`} />
    <circle className="fl f0" cx={x - 6.5} cy={n - 20.5} r="2" />
    <circle className="fl f1" cx={x} cy={n - 19.5} r="2.2" />
    <circle className="fl f2" cx={x + 6.5} cy={n - 22} r="2" />
  </g>
);

const Us = ({ x }) => (
  <g className="prop">
    <path className="ln" d={`M${x} ${n} V${n - 38}`} />
    <rect className="box" x={x - 1} y={n - 49} width={18} height={11} rx="1.5" />
  </g>
);

const Ks = ({ x }) => (
  <g className="prop">
    <path className="ln bin" d={`M${x - 6} ${n - 14} h12 l-1.5 14 h-9 z`} />
    <path className="ln" d={`M${x - 8} ${n - 14} h16`} />
  </g>
);

const StreetHome = ({ x, t }) => (
  <g className="home">
    <rect className={`face fc${t}`} x={x - 23} y={n - 30} width={46} height={30} />
    <path
      className={`roof rf${t}`}
      d={`M${x - 27} ${n - 30} L${x} ${n - 44} L${x + 27} ${n - 30} z`}
    />
    <rect className="win" x={x - 16} y={n - 22} width={12} height={9} rx="1" />
    <rect className="door" x={x + 4} y={n - 18} width={11} height={18} rx="1" />
  </g>
);

const StreetCar = ({ x, t }) => (
  <g className="car">
    <path className={`car-body cb${t}`} d={`M${x - 10} ${n - 8} l3.5 -6 h13 l3.5 6 z`} />
    <rect className={`car-body cb${t}`} x={x - 21} y={n - 9} width={42} height={7.6} rx="3" />
    <path className="car-win" d={`M${x - 7.2} ${n - 9.4} l2.5 -4 h9 l2.5 4 z`} />
    <circle className="car-wheel" cx={x - 11.5} cy={n - 2.8} r="3.3" />
    <circle className="car-wheel" cx={x + 12.5} cy={n - 2.8} r="3.3" />
    <circle className="car-hub" cx={x - 11.5} cy={n - 2.8} r="1.1" />
    <circle className="car-hub" cx={x + 12.5} cy={n - 2.8} r="1.1" />
  </g>
);

const Js = ({ x }) => (
  <g className="prop">
    <path className="ln" d={`M${x} ${n} V${n - 44}`} />
    <rect className="tl-box" x={x - 4.5} y={n - 62} width={9} height={19} rx="2.5" />
    <circle className="tl-r" cx={x} cy={n - 57} r="2" />
    <circle className="tl-a" cx={x} cy={n - 52.4} r="2" />
    <circle className="tl-g" cx={x} cy={n - 47.8} r="2" />
  </g>
);

const StreetProp1 = ({ x }) => (
  <g className="prop">
    <circle className="ln" cx={x - 10} cy={n - 6.5} r="6.5" />
    <circle className="ln" cx={x + 10} cy={n - 6.5} r="6.5" />
    <path
      className="ln"
      d={`M${x - 10} ${n - 6.5} l6 -11 h8 l6 11 M${x - 3.5} ${n - 17.5} h-5.5 M${x + 10} ${n - 6.5} v-12 h-4.5`}
    />
  </g>
);

const StreetHydrant = ({ x }) => (
  <g className="prop">
    <path className="hyd" d={`M${x - 4} ${n} v-8 q0 -4.5 4 -4.5 q4 0 4 4.5 v8 z`} />
    <path className="ln" d={`M${x - 6} ${n - 7.5} h12`} />
  </g>
);

const U = [Tree, Lamp, Ns, Tree, Gs, Xs, Tree, StreetHydrant, Ks, Tree, Us, Ns];

export function Street({ items, variant = "solid" }) {
  const [a, r] = React.useState(0);
  const [l, c] = React.useState(0);
  const f = React.useRef(null);
  const p = React.useRef(null);
  const m = React.useRef(null);
  const w = React.useRef(0);
  const g = useMediaQuery("(min-width: 761px)");
  const h = items.length;
  const N = h * R;
  const k = g ? 2320 : 600;
  const $ = g ? 300 : 190;
  const C = g ? 1.62 : 1.31;
  const F = ((WalkerSprites * C) / us) * qs;
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const v = f.current;
    const b = p.current;
    const j = m.current;
    if (!v || !b || !j) return;
    let d = 0;
    let x = performance.now();
    let y = 0;
    let E = -1;
    const T = (S) => {
      const L = Math.min(64, S - x);
      x = S;
      y = (y + (F * L) / 1e3) % N;
      b.style.transform = `translateX(${(-y).toFixed(2)}px)`;
      v.style.transform = `translateX(${(-((y * 0.35) % os)).toFixed(2)}px)`;
      j.style.transform = `translateX(${(-((y * 1.14) % es)).toFixed(2)}px)`;
      const B = Math.floor(((y + $) % N) / R) % h;
      B !== E && ((E = B), r(B));
      d = requestAnimationFrame(T);
    };
    d = requestAnimationFrame(T);
    return () => cancelAnimationFrame(d);
  }, [N, h, $, F]);
  const H = () => {
    c((v) => v + 1);
    window.clearTimeout(w.current);
    w.current = window.setTimeout(() => c(0), Ws);
  };
  React.useEffect(() => () => window.clearTimeout(w.current), []);
  const M = items[a];
  return (
    <Reveal
      className={`sv-street sv-street--${variant} ${l ? "is-hi" : ""}`}
      style={{
        "--wk": `${us}s`,
      }}
    >
      <div className="sv-street-read" aria-live="polite">
        <span className="ix">{String(a + 1).padStart(2, "0")}</span>
        <span key={a} className="say">
          <span className="name">{M?.name}</span>
          {M?.role && <span className="role">{M.role}</span>}
        </span>
        <span className="ahead" aria-hidden="true">
          {STREET_AHEAD}
        </span>
      </div>
      <div
        className="sv-street-view"
        style={{
          aspectRatio: `${k} / ${js}`,
        }}
        onClick={H}
        role="img"
        aria-label={`A walk past ${h} teams: ${items.map((v) => v.name).join(", ")}. Click and the walker says hi.`}
      >
        <svg viewBox={`0 0 ${k} ${js}`} preserveAspectRatio="xMidYMax meet" aria-hidden="true">
          <defs>
            <radialGradient id="sv-lamp-glow">
              <stop offset="0" stopColor="#F5E6D6" stopOpacity=".95" />
              <stop offset=".4" stopColor="#C99A76" stopOpacity=".42" />
              <stop offset="1" stopColor="#C99A76" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sv-lamp-cone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#D9B596" stopOpacity=".34" />
              <stop offset=".6" stopColor="#C99A76" stopOpacity=".12" />
              <stop offset="1" stopColor="#C99A76" stopOpacity="0" />
            </linearGradient>
          </defs>
          {variant === "solid" && (
            <defs>
              <linearGradient id="sv-fc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FFFFFF" stopOpacity=".55" />
                <stop offset="1" stopColor="#000000" stopOpacity=".07" />
              </linearGradient>
              <linearGradient id="sv-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#E6CDB5" stopOpacity=".95" />
                <stop offset="1" stopColor="#E6CDB5" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="sv-sun">
                <stop offset="0" stopColor="#D9B596" />
                <stop offset="1" stopColor="#C99A76" />
              </radialGradient>
            </defs>
          )}
          <g className="far" ref={f}>
            {[0, 1].map((v) => (
              <g key={v}>
                <circle className="sun-halo" cx={v * os + 560} cy={40} r="30" />
                <circle className="sun" cx={v * os + 560} cy={40} r="15" />
              </g>
            ))}
            {Array.from(
              {
                length: 26,
              },
              (v, b) => {
                const j = b % 12;
                const d = 52 + ((j * 37) % 46);
                return (
                  <rect
                    key={b}
                    x={b * 214 - 100}
                    y={n - d}
                    width={54 + ((j * 23) % 40)}
                    height={d}
                  />
                );
              },
            )}
            {Array.from(
              {
                length: 26,
              },
              (v, b) => {
                const j = (b * 5 + 3) % 12;
                const d = 30 + ((j * 29) % 34);
                return (
                  <rect
                    key={`b${b}`}
                    className="far2"
                    x={b * 214 + 8}
                    y={n - d}
                    width={40 + ((j * 17) % 36)}
                    height={d}
                  />
                );
              },
            )}
          </g>
          <g className="mid" ref={p}>
            {[0, 1].map((v) => (
              <g key={v} transform={`translate(${v * N} 0)`}>
                <Balloon x={R * 6 + 170} y={36} />
                {items.map((b, j) => {
                  const DTag = U[(j * 3) % U.length];
                  const XTag = U[(j * 3 + 1) % U.length];
                  const YTag = U[(j * 3 + 2) % U.length];
                  return (
                    <g key={j}>
                      <StreetBuilding i={j} on={j === a} />
                      {j % 3 === 0 ? (
                        <StreetCar x={j * R + 92} t={j % 3 === 0 ? (j / 3) % 3 : 0} />
                      ) : (
                        <StreetHome x={j * R + 92} t={(j * 2 + 1) % 5} />
                      )}
                      <DTag x={j * R + 34} />
                      <XTag x={j * R + R - 96} />
                      <YTag x={j * R + R - 34} />
                      {j % 2 === 0 ? <Js x={j * R + R} /> : <StreetProp1 x={j * R + R + 2} />}
                    </g>
                  );
                })}
                {items.map((b, j) => (
                  <ellipse
                    key={`c${j}`}
                    className="cast"
                    cx={j * R + R / 2}
                    cy={n + 1.5}
                    rx="46"
                    ry="3"
                  />
                ))}
                <path className="road" d={`M0 ${n} H${N}`} />
              </g>
            ))}
          </g>
          <Commuter x={$} y={n + 4} uid={variant} s={C} />
          <g className="sv-ahead" aria-hidden="true">
            <path className="ln drop" d={`M${k - 96} 16 V${n - 6}`} />
            <path
              className="pin"
              d={`M${k - 96} 6 m-7 0 a7 7 0 1 1 14 0 q0 6 -7 13 q-7 -7 -7 -13 z`}
            />
            <circle className="pin-eye" cx={k - 96} cy="6" r="2.6" />
          </g>
          <g className="near" ref={m}>
            <path className="kerb" d={`M-200 ${n + 11} H${k + 400}`} />
            {Array.from(
              {
                length: Math.ceil((k + 500) / es),
              },
              (v, b) => (
                <path key={b} className="dash" d={`M${b * es - es} ${n + 19} h40`} />
              ),
            )}
          </g>
        </svg>
        {l > 0 && (
          <span
            key={l}
            className="sv-street-hi"
            style={{
              left: `${($ / k) * 100}%`,
            }}
            aria-hidden="true"
          >
            Hi 👋
          </span>
        )}
      </div>
    </Reveal>
  );
}
