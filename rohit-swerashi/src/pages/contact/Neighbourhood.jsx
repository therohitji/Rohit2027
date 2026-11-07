import { Daughter } from "../../components/Daughter";

export const e = 300;

export const P = 4200;

export const Q = 6;

export const k = {
  x: 486,
  y: 250,
};

export const FarBlock = ({ x: a, w, h, v = 0 }) => {
  const t = e - h;
  const o = v % 3;
  const x = h > 100 ? 2 : 1;
  return (
    <g className={`nb t${v % 4}`}>
      <path className="body" d={`M${a} ${e} V${t} h${w} V${e} z`} />
      {o === 0 && (
        <path
          className="roof"
          d={`M${a - 10} ${t} L${a + w / 2} ${t - 30} L${a + w + 10} ${t} z`}
        />
      )}
      {o === 1 && (
        <path
          className="roof"
          d={`M${a - 10} ${t} L${a + w * 0.3} ${t - 26} L${a + w * 0.7} ${t - 26} L${a + w + 10} ${t} z`}
        />
      )}
      {o === 2 && (
        <path className="roof" d={`M${a - 8} ${t} L${a + w + 8} ${t - 22} L${a + w + 8} ${t} z`} />
      )}
      {v % 2 === 0 && <path className="chim" d={`M${a + w - 26} ${t - 12} v-22 h13 v22 z`} />}
      {v % 4 === 1 && (
        <>
          <path className="porch" d={`M${a + w / 2 - 22} ${e} v-26 h44 v26`} />
          <path className="ln porch-ln" d={`M${a + w / 2 - 22} ${e - 26} h44`} />
        </>
      )}
      {v % 4 === 3 && <path className="dorm" d={`M${a + w / 2 - 11} ${t - 4} v-16 h22 v16 z`} />}
      {Array.from(
        {
          length: x,
        },
        (d, i) => (
          <g key={i}>
            <rect className="win" x={a + 12} y={t + 20 + i * 30} width="20" height="24" rx="2" />
            <rect
              className="win"
              x={a + w - 32}
              y={t + 20 + i * 30}
              width="20"
              height="24"
              rx="2"
            />
          </g>
        ),
      )}
      <path className="nb-door" d={`M${a + w / 2 - 8} ${e} v-30 h16 v30 z`} />
    </g>
  );
};

export const FarTree = ({ x, s: c = 1 }) => (
  <g className="far-tree">
    <path className="trunk" d={`M${x} ${e} V${e - 54 * c}`} />
    <circle className="crown" cx={x} cy={e - 72 * c} r={30 * c} />
    <circle className="crown c2" cx={x - 20 * c} cy={e - 58 * c} r={20 * c} />
    <circle className="crown c3" cx={x + 21 * c} cy={e - 60 * c} r={18 * c} />
  </g>
);

export function House() {
  const l = e - 176;
  return (
    <g className="house">
      <path className="walls" d={`M300 ${e} V${l} h470 V${e} z`} />
      <path className="roof" d={`M278 ${l} L${300 + 470 / 2} ${l - 78} L792 ${l} z`} />
      <path className="ln eave" d={`M278 ${l} h514`} />
      <path className="ln batten" d={`M${300 + 470 / 2} ${l - 78} L${300 + 470 / 2} ${l}`} />
      <path className="chimney" d={`M630 ${l - 33} v-46 h26 v62 z`} />
      <g className="smoke">
        {[0, 1, 2].map((t) => (
          <path key={t} className={`puff p${t}`} d={`M643 ${l - 82} q-8 -14 0 -25 q8 -11 0 -21`} />
        ))}
      </g>
      {[342, 650].map((t, o) => (
        <g key={o} className="win">
          <rect className="glass" x={t} y={l + 34} width="84" height="66" rx="3" />
          <path className="ln" d={`M${t + 42} ${l + 34} v66 M${t} ${l + 67} h84`} />
          <path className="ln ledge" d={`M${t - 7} ${l + 102} h98`} />
          {o === 1 && (
            <rect className="curtain" x={t + 2} y={l + 36} width="38" height="62" rx="2" />
          )}
        </g>
      ))}
      <rect className="inside" x={490} y={e - 112} width="72" height="112" rx="2" />
      <g className="door">
        <rect className="leaf" x={490} y={e - 112} width="72" height="112" rx="2" />
        <rect className="panel" x={502} y={e - 100} width="48" height="42" rx="2" />
        <rect className="panel" x={502} y={e - 50} width="48" height="34" rx="2" />
        <circle className="knob" cx={553} cy={e - 58} r="3.4" />
      </g>
      <path className="ln jamb" d={`M484 ${e} V${e - 118} h84 V${e}`} />
      <path className="step" d={`M458 ${e} h112 v9 h-112 z`} />
      <rect className="plate" x={578} y={e - 104} width="16" height="20" rx="2" />
      <text className="numb" x={586} y={e - 90} textAnchor="middle">
        1
      </text>
      <g className="porch">
        <path className="beam" d={`M514 ${e - 126} h24 l40 126 h-104 z`} />
        <path className="lamp" d={`M514 ${e - 126} h24 l-5 -16 h-14 z`} />
        <path className="ln bracket" d={`M526 ${e - 142} v-10`} />
      </g>
    </g>
  );
}

const Car = ({ x, flip = false }) => (
  <g className="car" transform={flip ? `translate(${2 * x} 0) scale(-1 1)` : undefined}>
    <path
      className="body"
      d={`M${x - 62} ${e - 12} q0 -26 26 -28 l16 -20 q24 -6 48 0 l14 20 q26 3 26 28 z`}
    />
    <path className="glass" d={`M${x - 18} ${e - 42} l10 -14 q18 -4 34 0 l8 14 z`} />
    <path className="ln split" d={`M${x + 6} ${e - 56} v14`} />
    <circle className="tyre" cx={x - 34} cy={e - 10} r="12" />
    <circle className="tyre" cx={x + 40} cy={e - 10} r="12" />
    <circle className="hub" cx={x - 34} cy={e - 10} r="4.5" />
    <circle className="hub" cx={x + 40} cy={e - 10} r="4.5" />
  </g>
);

const StreetLamp = ({ x }) => (
  <g className="street-lamp">
    <path className="beam2" d={`M${x + 30} ${e - 148} h24 l40 148 h-104 z`} />
    <ellipse className="pool" cx={x + 42} cy={e} rx="56" ry="7" />
    <path className="ln stem" d={`M${x} ${e} V${e - 148} q0 -16 18 -16 h20`} />
    <path className="head" d={`M${x + 30} ${e - 164} h24 l-6 14 h-12 z`} />
    <ellipse className="bulb2" cx={x + 42} cy={e - 150} rx="9" ry="4" />
    <path className="ln foot" d={`M${x - 8} ${e} h16`} />
  </g>
);

const Bike = ({ x }) => (
  <g className="bike">
    <circle className="wheel" cx={x - 22} cy={e - 18} r="18" />
    <circle className="wheel" cx={x + 22} cy={e - 18} r="18" />
    <path
      className="ln frame"
      d={`M${x - 22} ${e - 18} L${x - 4} ${e - 46} L${x + 22} ${e - 18} M${x - 4} ${e - 46} L${x + 8} ${e - 18} L${x - 22} ${e - 18}`}
    />
    <path className="ln bar" d={`M${x + 14} ${e - 50} h14 M${x - 4} ${e - 46} l-6 -8 h-10`} />
  </g>
);

const ParkBench = ({ x }) => (
  <g className="bench">
    <path className="slat" d={`M${x - 34} ${e - 26} h68 v6 h-68 z`} />
    <path className="slat" d={`M${x - 34} ${e - 38} h68 v6 h-68 z`} />
    <path className="ln leg" d={`M${x - 26} ${e} v-26 M${x + 26} ${e} v-26`} />
  </g>
);

const Sign = ({ x }) => (
  <g className="sign">
    <path className="ln stem" d={`M${x} ${e} v-62`} />
    <path className="plate" d={`M${x - 4} ${e - 76} h38 v16 h-38 z`} />
  </g>
);

const Hydrant = ({ x }) => (
  <g className="hyd">
    <path className="body" d={`M${x - 7} ${e} v-20 q0 -9 7 -9 q7 0 7 9 v20 z`} />
    <path className="ln arms" d={`M${x - 11} ${e - 19} h22`} />
  </g>
);

const Hedge = ({ x, w }) => (
  <g className="hedge">
    <path className="body" d={`M${x} ${e} v-26 q0 -9 11 -9 h${w - 22} q11 0 11 9 v26 z`} />
    <path className="ln top" d={`M${x + 6} ${e - 30} h${w - 12}`} />
  </g>
);

const Playmate = ({ x }) => (
  <g className="playmate" transform={`translate(${x} ${e})`}>
    <g className="hop">
      <Daughter
        uid="doorkid"
        arms={{
          near: -112,
          far: 94,
        }}
      />
    </g>
    <circle className="ball" cx="-19" cy="-6" r="6" />
    <path className="ball-ln" d="M-24.4 -8.4 q5.4 3 10.8 0" />
  </g>
);

const Grass = ({ x, v }) =>
  v === 2 ? (
    <g className="green grass">
      {[-26, -16, -6, 4, 14, 24].map((r, l) => (
        <path
          key={l}
          className="blade"
          d={`M${x + r} ${e} q${l % 2 ? 6 : -6} -14 ${l % 2 ? 10 : -10} -${22 + (l % 3) * 7}`}
        />
      ))}
    </g>
  ) : v === 3 ? (
    <g className="green sapling">
      <path className="trunk2" d={`M${x} ${e} v-38`} />
      <ellipse className="crown2" cx={x} cy={e - 52} rx="22" ry="18" />
      <ellipse className="crown2 c2" cx={x - 14} cy={e - 42} rx="14" ry="11" />
    </g>
  ) : (
    <g className="green grass">
      {[-18, -8, 2, 12].map((r, l) => (
        <path
          key={l}
          className="blade"
          d={`M${x + r} ${e} q${l % 2 ? 5 : -5} -12 ${l % 2 ? 8 : -8} -${18 + (l % 3) * 6}`}
        />
      ))}
    </g>
  );

const Bin = ({ x }) => (
  <g className="bin">
    <path className="body" d={`M${x} ${e} l5 -40 h34 l5 40 z`} />
    <path className="lid" d={`M${x - 4} ${e - 40} h52 v-7 h-52 z`} />
  </g>
);

export function FarStreet() {
  return (
    <g className="street">
      <Hedge x={-742} w={150} />
      <ParkBench x={-520} />
      <StreetLamp x={-424} />
      <StreetLamp x={-60} />
      <Car x={-320} />
      <Hydrant x={-176} />
      <Bike x={-104} />
      <Hedge x={16} w={120} />
      <Bin x={196} />
      <Sign x={264} />
      <StreetLamp x={640} />
      <StreetLamp x={1140} />
      <Hedge x={1200} w={130} />
      <Bin x={1264} />
      <Bike x={1360} />
      <Car x={1520} flip />
      <StreetLamp x={1600} />
      <ParkBench x={1690} />
      <Hydrant x={1806} />
    </g>
  );
}

export function NearStreet() {
  return (
    <g className="near">
      <path className="path" d={`M470 ${e} h96 l30 22 H440 z`} />
      {[0, 1].map((a) => (
        <path
          key={a}
          className="ln path-ln"
          d={`M${452 + a * 12} ${e + 8 + a * 7} h${112 + a * 14}`}
        />
      ))}
      <g className="fence">
        <path className="ln rail" d={`M-760 ${e - 26} H438 M596 ${e - 26} H1900`} />
        <path className="ln rail" d={`M-760 ${e - 12} H438 M596 ${e - 12} H1900`} />
        {Array.from(
          {
            length: 58,
          },
          (a, c) => -752 + c * 46,
        )
          .filter((a) => a < 438 || a > 596)
          .map((a) => (
            <path key={a} className="ln pale" d={`M${a} ${e + 2} V${e - 36}`} />
          ))}
      </g>
      <g className="post">
        <path className="ln stem" d={`M624 ${e + 2} V${e - 44}`} />
        <path className="box" d={`M608 ${e - 44} h34 v22 h-34 z`} />
        <path className="flag" d={`M642 ${e - 44} v-14 l10 5 z`} />
      </g>
      {[
        [-662, 2],
        [-410, 2],
        [-262, 3],
        [-96, 2],
        [132, 2],
        [286, 3],
        [1010, 2],
        [1180, 3],
        [1436, 2],
        [1620, 2],
        [1852, 3],
      ].map(([a, c], r) => (
        <Grass key={r} x={a} v={c} />
      ))}
    </g>
  );
}
