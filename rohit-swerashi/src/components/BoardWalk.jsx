import { Reveal } from "./ui";
import { useMediaQuery } from "../lib/motion";
import React from "react";

const b = 300;

const h = 168;

const K = 190;

const fe = 83;

const FAR_TILE = 1200;

const MID_TILE = 960;

const FAR = [
  [0, 70, 92, "flat"],
  [84, 46, 128, "ant"],
  [142, 88, 74, "dome"],
  [246, 58, 110, "step"],
  [318, 38, 142, "ant"],
  [372, 96, 84, "flat"],
  [482, 52, 120, "step"],
  [548, 76, 64, "dome"],
  [638, 44, 136, "ant"],
  [696, 84, 96, "flat"],
  [794, 54, 124, "step"],
  [862, 100, 70, "dome"],
  [976, 48, 146, "ant"],
  [1038, 72, 104, "flat"],
  [1124, 60, 82, "step"],
];

function FarTower({ x, w, t, kind }) {
  const top = h - t;
  const cols = Math.floor((w - 10) / 11);
  const rows = Math.floor((t - 14) / 13);
  const off = (w - cols * 11 + 6) / 2;
  let dim = "";
  let lit = "";
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const d = `M${x + off + c * 11} ${top + 10 + r * 13}h5v6h-5z`;
      if ((r * 7 + c * 13 + x) % 9 === 0) lit += d;
      else dim += d;
    }
  return (
    <g>
      {kind === "dome" && <path className="wk-b" d={`M${x + 8} ${top} a${w / 2 - 8} 15 0 0 1 ${w - 16} 0 z`} />}
      {kind === "step" && <rect className="wk-b" x={x + 10} y={top - 11} width={w - 20} height={11} />}
      {kind === "ant" && <path className="wk-a" d={`M${x + w / 2} ${top} v-16`} />}
      <rect className="wk-b" x={x} y={top} width={w} height={t} />
      <path className="wk-w" d={dim} />
      <path className="wk-l" d={lit} />
    </g>
  );
}

const Rack = ({ x, t, s }) => {
  const units = Math.floor((t - 10) / 14);
  return (
    <g>
      <rect className="wk-m" x={x} y={h - t} width={46} height={t} rx="2" />
      {Array.from({ length: units }, (u, f) => {
        const y = h - t + 7 + f * 14;
        return (
          <g key={f}>
            <rect className="wk-unit" x={x + 5} y={y} width={36} height={9} rx="1" />
            <circle className={`wk-led c${(f + s) % 3}`} cx={x + 10} cy={y + 4.5} r="1.5" style={{ animationDelay: `${-((f * 3 + s) % 7) * 0.31}s` }} />
            <path className="wk-a" d={`M${x + 18} ${y + 4.5} h18`} />
          </g>
        );
      })}
    </g>
  );
};

const Mast = ({ x, t }) => (
  <g>
    <path className="wk-a" d={`M${x - 13} ${h} L${x} ${h - t} L${x + 13} ${h} M${x - 9.75} ${h - t * 0.25} H${x + 9.75} M${x - 6.5} ${h - t * 0.5} H${x + 6.5} M${x - 3.25} ${h - t * 0.75} H${x + 3.25} M${x - 13} ${h} L${x + 6.5} ${h - t * 0.5} M${x + 13} ${h} L${x - 6.5} ${h - t * 0.5}`} />
    <circle className="wk-led c1" cx={x} cy={h - t - 2} r="2.6" />
  </g>
);

const Dish = ({ x }) => (
  <g>
    <path className="wk-a" d={`M${x} ${h} V${h - 36} M${x - 10} ${h} L${x} ${h - 16} L${x + 10} ${h}`} />
    <path className="wk-m" d={`M${x - 20} ${h - 52} A24 24 0 0 0 ${x + 14} ${h - 28} z`} />
    <path className="wk-a" d={`M${x - 3} ${h - 40} L${x + 8} ${h - 54}`} />
    <circle className="wk-led c0" cx={x + 9} cy={h - 56} r="2" />
    <path className="wk-wave" d={`M${x + 14} ${h - 66} a13 13 0 0 1 8 8`} />
    <path className="wk-wave is-2" d={`M${x + 16} ${h - 75} a23 23 0 0 1 15 15`} />
  </g>
);

const FanBlock = ({ x }) => (
  <g>
    <rect className="wk-m" x={x} y={h - 62} width={104} height={62} rx="2" />
    {[26, 78].map((c) => (
      <g key={c} transform={`translate(${x + c} ${h - 31})`}>
        <circle className="wk-unit" r="19" />
        <g className="wk-fan">
          <path className="wk-a" d="M0 -15 V15 M-15 0 H15 M-10.6 -10.6 L10.6 10.6 M-10.6 10.6 L10.6 -10.6" />
        </g>
        <circle className="wk-led c2" r="2.2" />
      </g>
    ))}
  </g>
);

const CABLES = [
  [`M63 ${h - 96} Q126 ${h - 58} 190 ${h - 118}`, "3.4s"],
  [`M190 ${h - 118} Q300 ${h - 44} 470 ${h - 76}`, "4.6s"],
  [`M568 ${h - 104} Q700 ${h - 52} 830 ${h - 112}`, "4s"],
];

function MidTile() {
  return (
    <g>
      {CABLES.map(([d, dur]) => (
        <g key={d}>
          <path className="wk-cable" d={d} />
          <circle className="wk-packet" r="2.4">
            <animateMotion dur={dur} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}
      <Rack x={40} t={96} s={0} />
      <Mast x={190} t={116} />
      <Dish x={340} />
      <Rack x={470} t={76} s={1} />
      <Rack x={522} t={104} s={2} />
      <FanBlock x={640} />
      <Mast x={830} t={110} />
      <Dish x={916} />
    </g>
  );
}

const Drone = ({ p }) => (
  <g className="wk-drone">
    <animateMotion dur="26s" repeatCount="indefinite" path={`M${p + 40} 34 C${p * 0.7} 16 ${p * 0.4} 52 -40 28`} />
    <path className="wk-a" d="M-13 0 H13 M-13 -3 v3 M13 -3 v3" />
    <path className="wk-a wk-rotor" d="M-19 -3.5 H-7" />
    <path className="wk-a wk-rotor" d="M7 -3.5 H19" />
    <rect className="wk-m" x="-6" y="-2.5" width="12" height="6" rx="2.5" />
    <circle className="wk-led c0" cx="0" cy="6" r="1.6" />
  </g>
);

function BoardChip({ i: s, label, on, wide }) {
  const n = Math.max(104, Math.round(label.length * (wide ? 9.6 : 12.4)) + 40);
  const r = [56, 66, 50, 60][(s * 3) % 4];
  const l = s * b + (b - n) / 2;
  const o = h - r;
  const i = Math.max(3, Math.round(n / 18));
  return (
    <g className={`chip ${on ? "is-on" : ""}`}>
      {Array.from(
        {
          length: i,
        },
        (u, f) => {
          const c = l + 12 + f * ((n - 24) / (i - 1));
          return <path key={f} className="pin" d={`M${c} ${o + r} v6`} />;
        },
      )}
      <rect className="chip-body" x={l} y={o} width={n} height={r} rx="5" />
      <text className="chip-label" x={l + n / 2} y={o + r / 2} dominantBaseline="central" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

const PartCap = ({ x }) => (
  <g className="part">
    <rect className="cap" x={x - 6} y={h - 22} width={12} height={22} rx="5" />
    <path className="cap-band" d={`M${x - 6} ${h - 16} h12`} />
  </g>
);

const PartLed = ({ x }) => (
  <g className="part">
    <circle className="led-halo" cx={x} cy={h - 9} r="9" />
    <circle className="led" cx={x} cy={h - 9} r="4.4" />
    <path className="pin" d={`M${x - 3} ${h - 5} v5 M${x + 3} ${h - 5} v5`} />
  </g>
);

const BotLeg = ({ side }) => (
  <g transform={`translate(${side === "far" ? -1.6 : 1.6} -22)`}>
    <g className={`bot-thigh is-${side}`}>
      <rect className="bot-limb" x="-3.4" y="0" width="6.8" height="12" rx="3.4" />
      <g transform="translate(0 10.5)">
        <g className={`bot-knee is-${side}`}>
          <rect className="bot-limb" x="-3" y="0" width="6" height="9" rx="3" />
          <rect className="bot-boot" x="-3.7" y="7.5" width="10.6" height="4" rx="2" />
        </g>
      </g>
    </g>
  </g>
);

const BotArm = ({ side }) => (
  <g transform={`translate(${side === "far" ? 1.5 : -1.5} -41)`}>
    <g className={`bot-shoulder is-${side}`}>
      <rect className="bot-limb" x="-2.6" y="0" width="5.2" height="10" rx="2.6" />
      <g transform="translate(0 8.5)">
        <g className="bot-elbow">
          <rect className="bot-limb" x="-2.4" y="0" width="4.8" height="9" rx="2.4" />
          <circle className="bot-hand" cx="0" cy="9.5" r="3" />
        </g>
      </g>
    </g>
  </g>
);

function Bot({ x, y }) {
  return (
    <g className="bot" transform={`translate(${x} ${y}) scale(1.4)`}>
      <ellipse className="bot-shadow" cx="1" cy="1" rx="15" ry="2.3" />
      <g className="bot-bob">
        <BotLeg side="far" />
        <BotArm side="far" />
        <rect className="bot-pack" x="-14" y="-42" width="6" height="15" rx="2.6" />
        <rect className="bot-limb" x="-3" y="-49" width="6" height="5" />
        <rect className="bot-shell" x="-10" y="-45.5" width="20" height="25" rx="8" />
        <rect className="bot-plate" x="0.6" y="-40.5" width="7.6" height="10" rx="2.4" />
        <circle className="bot-core" cx="4.4" cy="-35.5" r="2" />
        <path className="bot-ant" d="M-2.5 -69 q-.6 -4.4 -3.6 -6.4" />
        <circle className="bot-led" cx="-6.6" cy="-76.4" r="2.3" />
        <rect className="bot-shell" x="-12" y="-69.5" width="25" height="22.5" rx="10" />
        <rect className="bot-visor" x="-1.6" y="-65" width="14.6" height="12" rx="6" />
        <g className="bot-eyes">
          <ellipse className="bot-eye" cx="3.6" cy="-59" rx="1.5" ry="2.3" />
          <ellipse className="bot-eye" cx="8.6" cy="-59" rx="1.5" ry="2.3" />
        </g>
        <circle className="bot-ear" cx="-5.6" cy="-58" r="3.5" />
        <BotLeg side="near" />
        <BotArm side="near" />
      </g>
    </g>
  );
}

const RobotLeg = ({ side }) => (
  <g className={`leg leg-${side}`} transform="translate(1.5 -26)">
    <g className="thigh">
      <rect className="limb" x="-3.2" y="0" width="6.4" height="11" rx="2" />
      <circle className="joint" cx="0" cy="11.5" r="2.8" />
      <g transform="translate(0 12)">
        <g className="knee">
          <rect className="limb" x="-2.8" y="0" width="5.6" height="10" rx="2" />
          <rect className="foot" x="-4.6" y="9.4" width="9.6" height="4" rx="1.2" />
        </g>
      </g>
    </g>
  </g>
);

const RobotArm = ({ side }) => (
  <g className={`arm arm-${side}`} transform="translate(1.2 -44)">
    <g className="shoulder">
      <rect className="limb" x="-2.6" y="0" width="5.2" height="9" rx="2" />
      <circle className="joint" cx="0" cy="9.4" r="2.4" />
      <g transform="translate(0 10)">
        <g className="elbow">
          <rect className="limb" x="-2.4" y="0" width="4.8" height="8" rx="2" />
          <rect className="grip" x="-3" y="7.4" width="6" height="4.4" rx="1.6" />
        </g>
      </g>
    </g>
  </g>
);

function RobotFront() {
  return (
    <g className="front" aria-hidden="true">
      <ellipse className="shadow" cx="0" cy="1.5" rx="14" ry="2.6" />
      <rect className="limb" x="-8.4" y="-24" width="6.4" height="20" rx="2" />
      <rect className="limb" x="2" y="-24" width="6.4" height="20" rx="2" />
      <rect className="foot" x="-10" y="-5" width="9.6" height="4" rx="1.2" />
      <rect className="foot" x="0.4" y="-5" width="9.6" height="4" rx="1.2" />
      <rect className="body" x="-11" y="-46" width="22" height="23" rx="4.5" />
      <rect className="vent" x="-6" y="-41" width="12" height="1.8" rx=".9" />
      <rect className="vent" x="-6" y="-37.4" width="12" height="1.8" rx=".9" />
      <circle className="core" cx="0" cy="-31" r="4" />
      <rect className="limb" x="-15.5" y="-44" width="5" height="17" rx="2" />
      <g className="wave">
        <rect className="limb" x="10.5" y="-45" width="5" height="16" rx="2" />
        <rect className="grip" x="10" y="-48.5" width="6" height="5" rx="1.8" />
      </g>
      <rect className="neck" x="-2.4" y="-50" width="4.8" height="4.6" />
      <rect className="head" x="-11" y="-64" width="22" height="14.5" rx="4.5" />
      <rect className="visor" x="-7.4" y="-60.4" width="14.8" height="6.4" rx="2.6" />
      <circle className="eye" cx="-3.4" cy="-57.2" r="1.5" />
      <circle className="eye" cx="3.4" cy="-57.2" r="1.5" />
      <path className="ant" d="M0 -64 v-7" />
      <circle className="ant-led" cx="0" cy="-72.5" r="2.4" />
    </g>
  );
}

export function RobotSide({ x, y }) {
  return (
    <g className="robot" transform={`translate(${x} ${y})`}>
      <RobotFront />
      <g className="side">
        <ellipse className="shadow" cx="1" cy="1.5" rx="13" ry="2.4" />
        <g className="jump">
          <g className="hull">
            <RobotLeg side="b" />
            <RobotArm side="b" />
            <rect className="body" x="-8" y="-46" width="18.5" height="21" rx="4" />
            <rect className="vent" x="-4.6" y="-41" width="11.5" height="1.8" rx=".9" />
            <rect className="vent" x="-4.6" y="-37.4" width="11.5" height="1.8" rx=".9" />
            <circle className="core" cx="1.2" cy="-31" r="3.4" />
            <RobotLeg side="a" />
            <RobotArm side="a" />
            <rect className="neck" x="-1" y="-50" width="4.6" height="4.6" />
            <rect className="head" x="-7.5" y="-63" width="18" height="13.5" rx="4" />
            <rect className="visor" x="-3.4" y="-59.6" width="12" height="5.6" rx="2.4" />
            <path className="ant" d="M6.5 -63 v-7" />
            <circle className="ant-led" cx="6.5" cy="-71.5" r="2.4" />
          </g>
        </g>
      </g>
    </g>
  );
}

export function BoardWalk({ chips, lead }) {
  const [a, n] = React.useState(0);
  const [r, l] = React.useState(false);
  const o = React.useRef(null);
  const farRef = React.useRef(null);
  const midRef = React.useRef(null);
  const u = useMediaQuery("(min-width: 761px)");
  const f = chips.length;
  const c = f * b;
  const p = u ? 1560 : 480;
  const y = u ? 300 : 150;
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const N = o.current;
    if (!N) return;
    let d = 0;
    let M = performance.now();
    let j = 0;
    let $ = -1;
    const w = (E) => {
      const A = Math.min(64, E - M);
      M = E;
      j = (j + (fe * A) / 1e3) % c;
      N.style.transform = `translateX(${(-j).toFixed(2)}px)`;
      if (farRef.current) farRef.current.style.transform = `translateX(${(-((j * 0.18) % FAR_TILE)).toFixed(2)}px)`;
      if (midRef.current) midRef.current.style.transform = `translateX(${(-((j * 0.5) % MID_TILE)).toFixed(2)}px)`;
      const k = Math.floor(((j + y) % c) / b) % f;
      k !== $ && (($ = k), n(k));
      d = requestAnimationFrame(w);
    };
    d = requestAnimationFrame(w);
    return () => cancelAnimationFrame(d);
  }, [c, f, y]);
  const C = React.useRef(0);
  const m = () => {
    l(true);
    window.clearTimeout(C.current);
    C.current = window.setTimeout(() => l(false), 1700);
  };
  React.useEffect(() => () => window.clearTimeout(C.current), []);
  const v = chips[a];
  return (
    <Reveal className={`sv-board-walk ${r ? "is-met" : ""}`}>
      <div className="sv-board-stage" onClick={m}>
        {lead && <div className="sv-board-lead">{lead}</div>}
        <div className="sv-board-read" aria-live="polite">
          <span className="ix">{String(a + 1).padStart(2, "0")}</span>
          <span key={a} className="say">
            <span className="name">{v?.name}</span>
            {v?.role && <span className="role">{v.role}</span>}
          </span>
        </div>
        <div
          className="sv-board-view"
          style={{
            aspectRatio: `${p} / ${K}`,
          }}
          role="img"
          aria-label={`A walk across the board: ${chips.map((N) => N.name).join(", ")}`}
        >
          <svg viewBox={`0 0 ${p} ${K}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <defs>
              <linearGradient id="rs-bot-shell" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FBF3EA" />
                <stop offset="1" stopColor="#E0B896" />
              </linearGradient>
              <linearGradient id="rs-chip-on" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#6E1F24" />
                <stop offset=".55" stopColor="#0B0B0C" />
                <stop offset="1" stopColor="#16233F" />
              </linearGradient>
            </defs>
            <g className="cam">
              <g className="wk-far" ref={farRef}>
                {Array.from({ length: Math.ceil(p / FAR_TILE) + 1 }, (t, f) => (
                  <g key={f} transform={`translate(${f * FAR_TILE} 0)`}>
                    {FAR.map(([x, w, ht, kind]) => (
                      <FarTower key={x} x={x} w={w} t={ht} kind={kind} />
                    ))}
                  </g>
                ))}
              </g>
              <Drone p={p} />
              <g className="wk-mid" ref={midRef}>
                {Array.from({ length: Math.ceil(p / MID_TILE) + 1 }, (t, f) => (
                  <g key={f} transform={`translate(${f * MID_TILE} 0)`}>
                    <MidTile />
                  </g>
                ))}
              </g>
              <g className="world" ref={o}>
                {[0, 1, 2].map((N) => (
                  <g key={N} transform={`translate(${N * c} 0)`}>
                    {chips.map((g, d) => {
                      const M = d % 2 ? PartCap : PartLed;
                      return (
                        <g key={d}>
                          <BoardChip i={d} label={g.name} on={d === a} wide={u} />
                          <M x={d * b + b} />
                        </g>
                      );
                    })}
                    <path className="trace" d={`M0 ${h} H${c}`} />
                  </g>
                ))}
              </g>
              <Bot x={y} y={h + 1} />
            </g>
          </svg>
          {r && (
            <span
              className="sv-board-hi"
              aria-hidden="true"
              style={{
                left: `${((y + 34) / p) * 100}%`,
              }}
            >
              Hi 👋
            </span>
          )}
        </div>
      </div>
    </Reveal>
  );
}
