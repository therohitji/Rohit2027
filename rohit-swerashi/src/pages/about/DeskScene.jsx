import { Commuter } from "../../components/Commuter";
import { useMediaQuery } from "../../lib/motion";
import React from "react";

const e = 350;

const V = [
  ["rock", "paper"],
  ["scissors", "rock"],
  ["paper", "paper"],
];

const C = {
  x: -240,
  y: -10,
  w: 1820,
  h: 430,
};

const B = {
  x: 402,
  y: 66,
  w: 640,
  h: 356,
};

const I = {
  x: 696,
  y: 203,
};

const ts = 250;

const ls = 300;

const cs = 2400;

const rs = 1700;

function DeskBack() {
  return (
    <g className="back">
      <path className="ln floor" d={`M-60 ${e} H1340`} />
      <path className="ln skirt" d={`M-60 ${e - 12} H1340`} />
      <g className="window">
        <path className="light" d={`M96 262 L150 ${e} L392 ${e} L306 262 Z`} />
        <rect className="glass" x="96" y="92" width="210" height="168" rx="3" />
        <g clipPath="url(#sv-dk-win)">
          <defs>
            <clipPath id="sv-dk-win">
              <rect x="96" y="92" width="210" height="168" rx="3" />
            </clipPath>
          </defs>
          <rect className="sky" x="96" y="92" width="210" height="168" />
          <circle className="sun" cx="262" cy="128" r="17" />
          <path className="hill far" d="M96 206 q48 -36 96 -6 q42 26 114 -4 v64 H96 z" />
          <path className="hill" d="M96 222 q56 -28 108 -2 q46 22 102 -6 v46 H96 z" />
          <path className="ln out-trunk" d="M150 258 V214" />
          <circle className="out-crown" cx="150" cy="198" r="22" />
          <circle className="out-crown c2" cx="132" cy="210" r="14" />
          <circle className="out-crown c3" cx="168" cy="211" r="13" />
        </g>
        <path className="ln mullion" d="M201 92 V260 M96 176 H306" />
        <path className="ln sill" d="M84 262 H318" />
      </g>
      <path className="ln shelf" d="M470 144 H700" />
      {[0, 1, 2, 3, 4].map((a) => (
        <rect
          key={a}
          className={`book bk${a % 3}`}
          x={480 + a * 15}
          y={144 - [30, 38, 26, 34, 29][a]}
          width="11"
          height={[30, 38, 26, 34, 29][a]}
          rx="1.5"
        />
      ))}
      <path className="lean" d="M566 144 l2 -40 l34 4 l-2 36 z" />
      <g className="hi-pot">
        <path className="pot" d="M646 144 h30 l-5 -20 h-20 z" />
        <path className="ln vine" d="M661 124 q-18 14 -22 34 M661 124 q16 12 19 28" />
      </g>
      <g className="frames">
        <rect className="frame f1" x="962" y="96" width="104" height="82" rx="2" />
        <rect className="frame f2" x="1082" y="104" width="62" height="52" rx="2" />
        <rect className="frame" x="1082" y="168" width="62" height="46" rx="2" />
        <rect className="frame f3" x="1160" y="120" width="74" height="58" rx="2" />
      </g>
      <g className="pendant">
        <path className="ln flex" d="M500 -10 V96" />
        <path className="dome" d="M472 122 q0 -26 28 -26 q28 0 28 26 z" />
        <ellipse className="bulb" cx="500" cy="124" rx="8" ry="3.8" />
        <path className="glow pend-glow" d="M474 126 h52 l40 130 H434 z" />
      </g>
    </g>
  );
}

function DeskSide() {
  return (
    <g className="side">
      <path className="case" d={`M-214 ${e} V104 h132 V${e} z`} />
      <path className="case-sh" d={`M-96 ${e} V104 h14 V${e} z`} />
      {[0, 1, 2, 3, 4].map((a) => (
        <path key={a} className="ln case-sh" d={`M-214 ${150 + a * 40} h132`} />
      ))}
      {[
        [-208, 7],
        [-166, 4],
        [-208, 5],
        [-160, 6],
        [-208, 8],
        [-152, 3],
        [-208, 4],
        [-176, 6],
      ].map(([a, t], c) => {
        const o = 150 + Math.floor(c / 2) * 40;
        return (
          <g key={c}>
            {Array.from(
              {
                length: t,
              },
              (w, i) => (
                <rect
                  key={i}
                  className={`book bk${(c + i) % 3}`}
                  x={a + i * 9}
                  y={o - [24, 28, 20, 26][(c + i) % 4]}
                  width="7"
                  height={[24, 28, 20, 26][(c + i) % 4]}
                  rx="1"
                />
              ),
            )}
          </g>
        );
      })}
      <path className="deck" d="M-196 104 h72 v-22 h-72 z" />
      <circle className="ln disc" cx="-166" cy="93" r="8" />
      <circle className="spindle" cx="-166" cy="93" r="1.6" />
      <path className="ln tone" d="M-136 88 l-14 6" />
      <ellipse className="cast-sh" cx="-148" cy={e} rx="80" ry="6" />
      <g className="guitar">
        <path
          className="gtr-body"
          d={`M-58 ${e - 6} q-26 -4 -26 -30 q0 -18 15 -22 q-9 -8 -9 -19 q0 -15 16 -17 q17 2 17 17 q0 11 -9 19 q15 4 15 22 q0 26 -19 30 z`}
        />
        <circle className="gtr-hole" cx="-53" cy={e - 40} r="7.5" />
        <path className="ln gtr-neck" d={`M-49 ${e - 94} l-16 -66`} />
        <path className="ln gtr-head" d={`M-65 ${e - 160} l-9 -16 l10 -5 l9 16 z`} />
        <path className="ln gtr-str" d={`M-52 ${e - 20} l-20 -140 M-47 ${e - 20} l-19 -139`} />
      </g>
      <g className="dog">
        <ellipse className="cast-sh" cx="34" cy={e + 2} rx="52" ry="7" />
        <path className="cushion" d={`M-16 ${e} q0 -16 22 -16 h58 q22 0 22 16 z`} />
        <ellipse className="fur d-body" cx="34" cy={e - 20} rx="44" ry="18" />
        <ellipse className="fur d-head" cx="-6" cy={e - 24} rx="18" ry="15" />
        <path className="fur d-ear" d={`M-16 ${e - 36} q-13 3 -11 20 q9 -6 15 -14 z`} />
        <path className="ln d-snout" d={`M-22 ${e - 20} q-8 2 -9 7`} />
        <ellipse className="nose" cx="-24" cy={e - 21} rx="2.6" ry="2" />
        <path className="ln d-eye" d={`M-11 ${e - 27} q4 3 8 0`} />
        <path className="ln d-tail" d={`M76 ${e - 24} q18 -4 12 -18`} />
        <ellipse className="d-breath" cx="34" cy={e - 20} rx="44" ry="18" />
      </g>
    </g>
  );
}

function DeskSideRug() {
  return (
    <g className="side">
      <path className="rug2" d={`M934 ${e} h330 l24 12 H910 z`} />
      <g className="sofa">
        <path
          className="couch-back"
          d={`M966 ${e - 14} V246 q0 -14 16 -14 h226 q16 0 16 14 v90 z`}
        />
        <path
          className="couch-seat"
          d={`M956 ${e - 14} h268 q12 0 12 12 v16 h-292 v-16 q0 -12 12 -12 z`}
        />
        <path className="ln mattress" d={`M962 ${e - 8} h286`} />
        <path className="cush" d="M986 280 h96 v46 h-96 z" />
        <path className="cush" d="M1090 280 h96 v46 h-96 z" />
        <path className="pillow p1" d="M974 268 h44 v40 h-44 z" />
        <path className="pillow p2" d="M1176 272 h40 v36 h-40 z" />
        <path className="throw" d={`M1120 ${e - 26} h84 l-10 30 h-74 z`} />
        <path className="ln couch-leg" d={`M970 ${e} v-10 M1240 ${e} v-10`} />
      </g>
      <ellipse className="cast-sh" cx="1104" cy={e} rx="152" ry="7" />
      <g className="cat">
        <ellipse className="fur" cx="1204" cy="266" rx="26" ry="11" />
        <circle className="fur" cx="1182" cy="259" r="10" />
        <path className="ln ears" d="M1175 252 l-3 -7 l7 3 M1187 251 l4 -7 l2 8" />
        <ellipse className="nose" cx="1173" cy="261" rx="1.6" ry="1.2" />
        <path className="ln tail" d="M1228 268 q15 4 9 -10" />
      </g>
      <g className="floor-lamp">
        <path className="ln arc" d={`M1286 ${e} V244 q0 -52 -64 -56`} />
        <path className="ln stand" d={`M1266 ${e} h40`} />
        <path className="shade2" d="M1196 176 h52 l-16 30 h-20 z" />
        <path className="glow lamp-glow" d="M1200 206 h44 l50 100 H1150 z" />
      </g>
      <path className="pot" d={`M896 ${e} h50 l-8 -52 h-34 z`} />
      {[-1, -0.3, 0.5].map((a, t) => (
        <g key={t}>
          <path className="ln frond" d={`M921 300 q${a * 24} -24 ${a * 32} -${52 + t * 12}`} />
          <ellipse
            className="leaf"
            cx={921 + a * 32}
            cy={300 - (52 + t * 12)}
            rx="14"
            ry="8.5"
            transform={`rotate(${a * 28} ${921 + a * 32} ${300 - (52 + t * 12)})`}
          />
        </g>
      ))}
    </g>
  );
}

function DeskTable() {
  return (
    <g className="side">
      <path className="table" d="M1332 268 h124 v9 h-124 z" />
      <path className="ln table-leg" d={`M1344 277 V${e} M1444 277 V${e}`} />
      <path className="ln table-sh" d={`M1344 ${e - 26} h100`} />
      <path className="shade2 t-shade" d="M1360 210 h44 l-13 26 h-18 z" />
      <path className="ln t-stem" d="M1382 236 V268" />
      <path className="glow t-glow" d="M1364 236 h36 l30 32 h-96 z" />
      <path className="cup2" d="M1418 268 h20 l-3 -15 h-14 z" />
      <ellipse className="cast-sh" cx="1394" cy={e} rx="78" ry="6" />
      <path className="pouffe" d={`M1478 ${e} q-4 -34 30 -34 q34 0 30 34 z`} />
      <path className="ln pouffe-ln" d={`M1482 ${e - 18} h52`} />
      <g className="board-lean">
        <path className="deck2" d={`M1550 ${e} l-22 -122 l16 -4 l22 122 z`} />
        <circle className="ln wheel" cx="1534" cy={e - 96} r="4.5" />
        <circle className="ln wheel" cx="1548" cy={e - 24} r="4.5" />
      </g>
      <path className="ln shelf2" d="M1330 150 H1500" />
      <path className="pot" d="M1348 150 h30 l-5 -22 h-20 z" />
      <path className="ln vine" d="M1363 128 q-18 13 -22 32 M1363 128 q16 11 19 27" />
      <path className="pot" d="M1414 150 h26 l-4 -18 h-18 z" />
      {[-1, 0.6].map((a, t) => (
        <ellipse
          key={t}
          className="leaf"
          cx={1427 + a * 16}
          cy={124 - t * 8}
          rx="12"
          ry="7"
          transform={`rotate(${a * 26} ${1427 + a * 16} ${124 - t * 8})`}
        />
      ))}
      <rect className="frame f2" x="1462" y="112" width="34" height="38" rx="2" />
    </g>
  );
}

function DeskMac({ frame }) {
  return (
    <g className="mac">
      <path className="lid" d="M612 250 h168 l14 12 H598 z" />
      <path className="ln lid-ln" d="M676 257 h40" />
      <rect className="bezel" x={616} y={156} width={160} height={94} rx="4" />
      <rect className="screen" x={622} y={162} width={148} height={82} rx="2" />
      <g className="ui-app">
        <rect className="bar" x={622} y={162} width={148} height="8" rx="2" />
        {[0, 1, 2].map((l) => (
          <circle key={l} className="dot" cx={628 + l * 5} cy={166} r="1.3" />
        ))}
        <rect className="rail" x={622} y={170} width="30" height={74} />
        {[0, 1, 2, 3, 4, 5].map((l) => (
          <rect
            key={l}
            className={`row ${l === 2 ? "is-sel" : ""}`}
            x={625}
            y={175 + l * 8}
            width={l === 2 ? 24 : 19 - (l % 3) * 4}
            height="4"
            rx="1"
          />
        ))}
        <rect className="canvas" x={652} y={170} width={118} height={74} />
        <rect className="frame-a" x={662} y={178} width="28" height="36" rx="1.5" />
        <rect className="frame-b" x={662} y={218} width="28" height="12" rx="1.5" />
        <rect className="sel" x={661} y={177} width="30" height="38" rx="1.5" />
        {[
          [661, 177],
          [691, 177],
          [661, 215],
          [691, 215],
        ].map(([l, j], d) => (
          <rect key={d} className="handle" x={l - 1.3} y={j - 1.3} width="2.6" height="2.6" />
        ))}
        <g className="note">
          <rect className="pad" x={700} y={178} width="60" height="44" rx="2" />
          <text className="hd" x={705} y={186}>
            TODO
          </text>
          <text className="ln1" x={705} y={194}>
            Ship the thing.
          </text>
          <text className="ln2" x={705} y={202}>
            Then make it
          </text>
          <text className="ln3" x={705} y={210}>
            worth keeping.
          </text>
          <text className="sig" x={705} y={219}>
            still going
          </text>
        </g>
        <g
          className="cursor"
          style={{
            opacity: frame === 1 ? 1 : 0.82,
          }}
        >
          <path
            className="ptr"
            d="M694 224 l0 9 l2.4 -2.4 l1.8 3.6 l1.8 -.9 l-1.8 -3.6 l3.3 -.3 z"
          />
          <rect className="tag" x={702} y={226} width="18" height="6" rx="1.5" />
        </g>
        <circle className="live" cx={764} cy={166} r="1.7" />
      </g>
    </g>
  );
}

function DeskFront({ throws }) {
  return (
    <g className="desk">
      <g className="lamp">
        <path className="glow desk-glow" d="M866 166 h30 l38 92 H828 z" />
        <path className="ln arm" d="M858 262 V160 q0 -16 18 -16 h20" />
        <path className="shade" d="M862 140 h38 l-12 26 h-16 z" />
      </g>
      <path className="top" d="M452 262 H892 v13 H452 z" />
      <path className="top-lit" d="M452 262 H892 v3 H452 z" />
      <path className="top-edge" d="M452 272 H892 v3 H452 z" />
      <ellipse className="cast-sh" cx="672" cy={e} rx="232" ry="7" />
      <path className="ln leg" d={`M466 275 V${e}`} />
      <path className="ln leg" d={`M878 275 V${e}`} />
      <rect className="draw" x="794" y="275" width="72" height="70" rx="2" />
      <path className="draw-sh" d="M854 275 h12 v70 h-12 z" />
      <path className="ln" d="M794 299 H866 M794 323 H866" />
      <path className="ln pull" d="M818 287 h26 M818 311 h26 M818 335 h26" />
      <g className="mug">
        <path className="cup" d="M466 238 h28 l-4 24 h-20 z" />
        <ellipse className="cup-top" cx="480" cy="238" rx="14" ry="4" />
        <path className="cup-sh" d="M486 239 h8 l-4 23 h-6 z" />
        <path className="ln handle" d="M494 245 q11 5 -2 13" />
        <g className="steam">
          {[0, 1, 2].map((t) => (
            <path
              key={t}
              className={`wisp w${t}`}
              d={`M${472 + t * 8} 232 q-6 -11 0 -20 q6 -9 0 -18`}
            />
          ))}
        </g>
      </g>
      <path className="note-pad" d="M508 254 h54 l4 8 h-62 z" />
      <path className="ln pen" d="M516 246 l32 -7" />
      <g className="jar">
        <path className="pot2" d="M806 262 h26 l-4 -26 h-18 z" />
        <path className="ln nib n1" d="M813 238 V218" />
        <path className="ln nib n2" d="M820 238 V212" />
        <path className="ln nib n3" d="M826 238 l6 -22" />
      </g>
      <g className="players">
        <g className="chair is-pushed">
          <path className="ln chair-back" d="M636 288 V196 q0 -10 10 -10 h6" />
          <path className="seat" d="M628 288 h84 v11 h-84 z" />
          <path className="seat-edge" d="M628 297 h84 v3 h-84 z" />
          <path className="ln post" d={`M670 300 V${e - 10}`} />
          <path className="ln base" d={`M644 ${e - 10} h52`} />
          <circle className="caster" cx="644" cy={e - 5} r="5" />
          <circle className="caster" cx="696" cy={e - 5} r="5" />
        </g>
        <g className="him" transform={`translate(390 ${e}) scale(2.9)`}>
          <Commuter uid="desk" />
        </g>
      </g>
    </g>
  );
}

function DeskFore() {
  return (
    <g className="fore">
      <path className="rug" d={`M352 ${e} h520 l34 16 H318 z`} />
      <path className="ln rug-ln" d={`M366 ${e + 8} h488`} />
      <g className="plant">
        <g className="fronds">
          {[-1, -0.45, 0.25, 1].map((a, t) => (
            <g key={t}>
              <path
                className={`ln frond f${t}`}
                d={`M232 ${e - 46} q${a * 28} -26 ${a * 39} -${56 + t * 9}`}
              />
              <ellipse
                className="leaf"
                cx={232 + a * 39}
                cy={e - 46 - (56 + t * 9)}
                rx="15"
                ry="9"
                transform={`rotate(${a * 30} ${232 + a * 39} ${e - 46 - (56 + t * 9)})`}
              />
            </g>
          ))}
        </g>
        <path className="pot" d={`M204 ${e + 6} h56 l-9 -46 h-38 z`} />
        <path className="ln pot-ln" d={`M208 ${e - 30} h48`} />
      </g>
      <g className="stack">
        <path className="bk-a" d={`M596 ${e} h60 v-11 h-60 z`} />
        <path className="bk-b" d={`M602 ${e - 11} h52 v-10 h-52 z`} />
        <path className="bk-c" d={`M600 ${e - 21} h56 v-9 h-56 z`} />
      </g>
      <g className="bag">
        <path className="bag-body" d={`M904 ${e + 2} v-56 q0 -14 15 -14 h32 q15 0 15 14 v56 z`} />
        <path className="ln flap" d="M904 300 h62" />
        <path className="ln strap" d="M919 282 q16 -21 33 0" />
      </g>
    </g>
  );
}

export function DeskScene() {
  const a = useMediaQuery("(max-width: 760px)");
  const t = a ? B : C;
  const [c, n] = React.useState(0);
  const [o, w] = React.useState(0);
  const [i, m] = React.useState(false);
  const [p, l] = React.useState(false);
  const j = React.useRef(0);
  const d = React.useRef(null);
  const N = React.useRef(null);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = window.setInterval(() => n((r) => (r + 1) % 3), cs);
    const u = window.setInterval(() => w((r) => (r + 1) % V.length), 3600);
    return () => {
      window.clearInterval(x);
      window.clearInterval(u);
    };
  }, []);
  const f = () => {
    m(true);
    window.clearTimeout(j.current);
    j.current = window.setTimeout(() => m(false), rs);
  };
  React.useEffect(() => () => window.clearTimeout(j.current), []);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = d.current;
    const u = N.current;
    if (!x || !u) return;
    const r = a ? B : C;
    const F = a ? ls : ts;
    let $ = 0;
    let g = false;
    const b = () => {
      $ = 0;
      let y;
      if (a) {
        const M = x.getBoundingClientRect();
        const z = window.innerHeight || 1;
        const q = z * 0.86;
        const W = z * 0.34;
        y = Math.min(1, Math.max(0, (q - M.top) / (q - W)));
      } else {
        const M = x.closest(".sv-ab-hero");
        const z = M == null ? undefined : M.querySelector(".sv-ab-hero-pin");
        if (!M || !z) return;
        const q = M.offsetHeight - z.offsetHeight;
        y =
          q > 0
            ? Math.min(
                1,
                Math.max(0, (z.getBoundingClientRect().top - M.getBoundingClientRect().top) / q),
              )
            : 0;
      }
      const E = y < 0.5 ? 4 * y * y * y : 1 - Math.pow(-2 * y + 2, 3) / 2;
      const L = r.w + (F - r.w) * E;
      const T = L * (r.h / r.w);
      const O = r.x + r.w / 2 + (I.x - (r.x + r.w / 2)) * E;
      const P = r.y + r.h / 2 + (I.y - (r.y + r.h / 2)) * E;
      u.setAttribute(
        "viewBox",
        `${(O - L / 2).toFixed(1)} ${(P - T / 2).toFixed(1)} ${L.toFixed(1)} ${T.toFixed(1)}`,
      );
      const S = y > 0.72;
      S !== g && ((g = S), l(S));
    };
    const H = () => {
      $ || ($ = requestAnimationFrame(b));
    };
    b();
    window.addEventListener("scroll", H, {
      passive: true,
    });
    window.addEventListener("resize", H);
    return () => {
      window.removeEventListener("scroll", H);
      window.removeEventListener("resize", H);
      $ && cancelAnimationFrame($);
      u.setAttribute("viewBox", `${r.x} ${r.y} ${r.w} ${r.h}`);
    };
  }, [a]);
  return (
    <div className={`sv-desk-wrap ${p ? "is-met" : ""}`}>
      <div
        className={`sv-desk-view ${i || p ? "is-hi" : ""} ${p ? "is-met" : ""}`}
        ref={d}
        onClick={f}
        style={{
          aspectRatio: `${t.w} / ${t.h}`,
        }}
        role="img"
        aria-label="A corner of a room: a desk under a window, a laptop, somebody working at it, a sofa bed and a cat. Click and they turn round and wave."
      >
        <svg
          ref={N}
          viewBox={`${t.x} ${t.y} ${t.w} ${t.h}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <DeskBack />
          <DeskSide />
          <DeskSideRug />
          <DeskTable />
          <DeskFront throws={V[o]} />
          <DeskMac frame={c} />
          <DeskFore />
        </svg>
      </div>
    </div>
  );
}
