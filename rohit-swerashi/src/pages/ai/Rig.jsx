import { RobotSide } from "../../components/BoardWalk";
import React from "react";

const c = 250;

const N = 980;

const U = [
  {
    x: 62,
    w: 100,
    h: 74,
    key: "prompt",
    name: "Prompt",
    sub: "claude · daily",
  },
  {
    x: 218,
    w: 88,
    h: 92,
    key: "router",
    name: "Router",
    sub: "picks the agent",
  },
  {
    x: 606,
    w: 92,
    h: 96,
    key: "gate",
    name: "Gate",
    sub: "tests · review",
  },
  {
    x: 764,
    w: 112,
    h: 78,
    key: "ship",
    name: "Commit",
    sub: "git · deploy",
  },
];

const k = [
  {
    y: 96,
    name: "Build",
    out: "the feature · shipped",
  },
  {
    y: 152,
    name: "Audit",
    out: "tests · all green",
  },
  {
    y: 208,
    name: "Docs",
    out: "docs · updated",
  },
];

export const p = 344;

const b = 190;

const g = 40;

const X = 6200;

const J = 806;

const RigChip = ({ x, y }) => (
  <g className="rg-prop rg-chip">
    {[0, 1, 2, 3].map((r) => (
      <g key={r}>
        <path className="rg-pin" d={`M${x + 8 + r * 7} ${y} v-5`} />
        <path className="rg-pin" d={`M${x + 8 + r * 7} ${y + 34} v5`} />
        <path className="rg-pin" d={`M${x} ${y + 8 + r * 7} h-5`} />
        <path className="rg-pin" d={`M${x + 34} ${y + 8 + r * 7} h5`} />
      </g>
    ))}
    <path className="rg-chip-pkg" d={`M${x} ${y} h34 v34 h-34 z`} />
    <path className="rg-chip-die" d={`M${x + 10} ${y + 10} h14 v14 h-14 z`} />
  </g>
);

const RigDb = ({ x, y }) => (
  <g className="rg-prop rg-db">
    {[2, 1, 0].map((r) => (
      <g key={r}>
        <path className="rg-db-body" d={`M${x} ${y + r * 12} v8 a13 4.6 0 0 0 26 0 v-8 z`} />
        <ellipse className="rg-db-top" cx={x + 13} cy={y + r * 12} rx="13" ry="4.6" />
      </g>
    ))}
  </g>
);

const RigCloud = ({ x, y, label }) => (
  <g className="rg-prop rg-cloud">
    <path
      className="rg-cloud-body"
      d={`M${x + 9} ${y + 20} a9.5 9.5 0 0 1 2 -18 a12.5 12.5 0 0 1 23 -2.5 a8.5 8.5 0 0 1 7 20.5 z`}
    />
    <text className="rg-chip-t" x={x + 21} y={y + 32}>
      {label}
    </text>
  </g>
);

const as = [
  [0, 22, "kw"],
  [26, 30, "id"],
  [6, 16, "kw"],
  [26, 34, "st"],
  [6, 30, "id"],
  [0, 14, "kw"],
  [18, 26, "st"],
  [6, 20, "id"],
  [30, 18, "kw"],
];

const RigCode = ({ x: e, y, w = 84 }) => (
  <g className="rg-prop rg-code">
    <path className="rg-code-box" d={`M${e} ${y} h${w} v70 h-${w} z`} />
    <path className="rg-code-bar" d={`M${e} ${y} h${w} v11 h-${w} z`} />
    {[0, 1, 2].map((t) => (
      <circle key={t} className="rg-code-dot" cx={e + 8 + t * 7} cy={y + 5.5} r="1.8" />
    ))}
    {as.map(([t, l, d], x) => (
      <path
        key={x}
        className={`rg-code-ln k-${d}`}
        d={`M${e + 8 + t} ${y + 22 + x * 5.4} h${Math.min(l, w - 16 - t)}`}
      />
    ))}
  </g>
);

const z = 62;

const RigBoard = () => {
  const e = N / z;
  return (
    <g className="rg-brd" aria-hidden="true">
      <path className="rg-brd-bus" d={`M0 ${c + 4} H${N}`} />
      <path className="rg-brd-bus" d={`M0 ${c + 11} H${N}`} />
      {Array.from(
        {
          length: z,
        },
        (n, r) => {
          const t = r * e + 3;
          const l = r % 7;
          return (
            <g key={r}>
              {r % 2 === 0 && <circle className="rg-brd-via" cx={t} cy={c + 4} r="1.1" />}
              {l === 0 && (
                <g className="rg-brd-pkg">
                  <path className="rg-brd-chip" d={`M${t - 3} ${c + 5.5} h9 v4 h-9 z`} />
                  {[0, 1, 2].map((d) => (
                    <path
                      key={d}
                      className="rg-brd-pin"
                      d={`M${t - 1.5 + d * 3} ${c + 5.5} v-1.6`}
                    />
                  ))}
                </g>
              )}
              {l === 2 && <path className="rg-brd-res" d={`M${t - 2} ${c + 6} h5 v3 h-5 z`} />}
              {l === 4 && <circle className="rg-brd-cap" cx={t} cy={c + 7.5} r="2" />}
              {l === 5 && <path className="rg-brd-trace" d={`M${t} ${c + 4} l3 3.5 H${t + 9}`} />}
              {l === 6 && <path className="rg-brd-silk" d={`M${t} ${c + 12.6} h4`} />}
            </g>
          );
        },
      )}
    </g>
  );
};

export function Rig() {
  const [e, n] = React.useState(0);
  const [r, t] = React.useState(null);
  const [l, d] = React.useState(false);
  const x = React.useRef(0);
  const $ = React.useRef(0);
  const v = React.useRef(0);
  const o = React.useRef(0);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      n(1);
      return;
    }
    o.current = performance.now();
    const a = (h) => {
      const j = (h - o.current) / X;
      n(Math.min(1, j));
      j < 1 && (v.current = requestAnimationFrame(a));
    };
    v.current = requestAnimationFrame(a);
    return () => cancelAnimationFrame(v.current);
  }, []);
  const i = e * J;
  const C = e >= 1 && !l;
  const f = C
    ? "ship"
    : i < 190
      ? "prompt"
      : i < 330
        ? "router"
        : i < 578
          ? "agents"
          : i < 726
            ? "gate"
            : "ship";
  const H = f === "gate" && i > 690;
  const D = r ?? f;
  const I = () => {
    l ||
      ((x.current = i),
      d(true),
      window.clearTimeout($.current),
      ($.current = window.setTimeout(() => {
        d(false);
        o.current = performance.now();
      }, 1500)));
  };
  return (
    <div className="sv-rig" onClick={I}>
      <svg viewBox={`0 0 ${N} 272`} preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <path className="rg-ground" d={`M0 ${c} H${N}`} />
        <RigBoard />
        <path className="rg-skirt" d={`M0 ${c + 15} H${N}`} />
        <path className="rg-drop" d={`M534 ${c - 137} H559`} />
        <path className="rg-drop" d={`M559 ${c - 137} V${c - 126}`} />
        <path className="rg-drop" d={`M559 ${c - 126} V${c - 74}`} />
        <path className="rg-drop" d={`M562 ${c - 45} V${c}`} />
        <g transform={`translate(548 ${c - 148}) scale(.66)`}>
          <RigChip x={0} y={0} />
        </g>
        <g transform={`translate(552 ${c - 74}) scale(.72)`}>
          <RigDb x={0} y={0} />
        </g>
        <RigCloud x={892} y={c - 128} label="API" />
        <RigCode x={888} y={c - 70} />
        <path className="rg-wire rg-tie" d={`M876 152 H930 V${c - 70}`} />
        <g className={`rg-store ${f === "agents" ? "is-on" : ""}`}>
          {k.map((a, h) => (
            <path key={h} className="rg-drop" d={`M${p + 40 + h * 56} ${a.y + g} V${c}`} />
          ))}
        </g>
        <path className="rg-rail" d="M110 152 H300 M534 152 H606 M690 152 H760" />
        {k.map((a, h) => (
          <g
            key={h}
            className={`rg-fan ${f === "agents" ? "is-on" : ""}`}
            style={{
              "--d": `${h * 0.1}s`,
            }}
          >
            <path
              className="rg-wire"
              d={`M300 152 C324 152 324 ${a.y + g / 2} ${p} ${a.y + g / 2}`}
            />
            <path
              className="rg-wire"
              d={`M${p + b} ${a.y + g / 2} C554 ${a.y + g / 2} 554 152 578 152`}
            />
          </g>
        ))}
        <path className={`rg-rail ${H ? "is-on" : ""} rg-back`} d={`M648 ${c - 4} H256 V196`} />
        {U.map((a) => (
          <g
            key={a.key}
            className={`rg-stn ${a.key} ${D === a.key ? "is-live" : ""}`}
            onPointerEnter={() => t(a.key)}
            onPointerLeave={() => t(null)}
          >
            <path className="rg-box" d={`M${a.x} ${c} V${c - a.h} h${a.w} V${c} z`} />
            <path className="rg-lip" d={`M${a.x} ${c - a.h} h${a.w} v7 h-${a.w} z`} />
            <text className="rg-nm" x={a.x + 11} y={c - a.h + 23}>
              {a.name}
            </text>
            <text className="rg-sb" x={a.x + 11} y={c - a.h + 36}>
              {a.sub}
            </text>
            {[0, 1].map((h) => {
              const j = c - 40 + h * 20;
              return (
                <g key={h}>
                  <path
                    className="rg-unit"
                    d={`M${a.x + 8} ${j} h${a.w - 16} v15 h-${a.w - 16} z`}
                  />
                  {[0, 1, 2, 3, 4].map((T) => (
                    <path key={T} className="rg-vent" d={`M${a.x + 26 + T * 5} ${j + 4} v7`} />
                  ))}
                  <circle className={`rg-led l${h}`} cx={a.x + 16} cy={j + 7.5} r="2.6" />
                  <path className="rg-slot" d={`M${a.x + a.w - 26} ${j + 7.5} h14`} />
                </g>
              );
            })}
            <path className="rg-feet" d={`M${a.x + 6} ${c} v-4 M${a.x + a.w - 6} ${c} v-4`} />
          </g>
        ))}
        {k.map((a, h) => (
          <g
            key={a.name}
            className={`rg-ag ${f === "agents" ? "is-on" : ""} ${r === "agents" ? "is-live" : ""}`}
            style={{
              "--d": `${h * 0.12}s`,
            }}
            onPointerEnter={() => t("agents")}
            onPointerLeave={() => t(null)}
          >
            <path className="rg-ag-box" d={`M${p} ${a.y} h${b} v${g} h-${b} z`} />
            <circle className="rg-ag-dot" cx={p + 15} cy={a.y + g / 2} r="5" />
            <text className="rg-ag-nm" x={p + 30} y={a.y + 18}>
              {a.name}
            </text>
            <text className="rg-ag-out" x={p + 30} y={a.y + 31}>
              {a.out}
            </text>
            <path className="rg-ag-run" d={`M${p + 1} ${a.y + g - 2} h${b - 2}`} />
          </g>
        ))}
        <g
          className={`rg-bot ${l ? "is-down" : ""} ${H ? "is-back" : ""} ${C ? "is-working" : ""}`}
          transform={`translate(${l ? x.current : i} ${c}) scale(.74)`}
        >
          <RobotSide x={0} y={0} />
          <g className="rg-think" aria-hidden="true">
            <text className="rg-think-t" x="-34" y="-147">
              Thinking
            </text>
            {[0, 1, 2].map((a) => (
              <circle
                key={a}
                className="rg-think-d"
                cx={18 + a * 7}
                cy="-150"
                r="1.9"
                style={{
                  "--d": `${a * 0.18}s`,
                }}
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
