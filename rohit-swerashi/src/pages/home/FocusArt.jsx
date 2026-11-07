const oe = 0.866;

const Y = (e, t) => (e - t) * oe;

const G = (e, t, a = 0) => (e + t) * 0.5 - a;

const u = (e, t, a = 0) => `${Y(e, t).toFixed(1)},${G(e, t, a).toFixed(1)}`;

function IsoBox({ x, y, w, d, h, cls = "" }) {
  return (
    <g className={`iso ${cls}`}>
      <polygon
        className="f-left"
        points={`${u(x, y + d)} ${u(x + w, y + d)} ${u(x + w, y + d, h)} ${u(x, y + d, h)}`}
      />
      <polygon
        className="f-right"
        points={`${u(x + w, y)} ${u(x + w, y + d)} ${u(x + w, y + d, h)} ${u(x + w, y, h)}`}
      />
      <polygon
        className="f-top"
        points={`${u(x, y, h)} ${u(x + w, y, h)} ${u(x + w, y + d, h)} ${u(x, y + d, h)}`}
      />
    </g>
  );
}

const IsoCast = ({ x, y, w, d }) => (
  <polygon
    className="cast"
    points={`${u(x, y)} ${u(x + w, y)} ${u(x + w, y + d)} ${u(x, y + d)}`}
  />
);

const IsoPads = ({ x, y, cols, rows, gap = 26, z = 0 }) => (
  <g className="pads">
    {Array.from(
      {
        length: cols * rows,
      },
      (f, p) => {
        const m = x + (p % cols) * gap;
        const w = y + Math.floor(p / cols) * gap;
        return <circle key={p} className="pad" cx={Y(m, w)} cy={G(m, w, z)} r="1.8" />;
      },
    )}
  </g>
);

const IsoLed = ({ x, y, z = 0, cls = "" }) => (
  <g className={`ledg ${cls}`}>
    <circle className="led-halo" cx={Y(x, y)} cy={G(x, y, z)} r="9" />
    <circle className="led" cx={Y(x, y)} cy={G(x, y, z)} r="3.6" />
  </g>
);

const IsoSilk = ({ x, y, z = 0, t }) => (
  <text className="silk" x={Y(x, y)} y={G(x, y, z)} textAnchor="middle">
    {t}
  </text>
);

const IsoWire = ({ a, b }) => (
  <path className="wire" d={`M${u(a[0], a[1], 1)} L${u(b[0], b[1], 1)}`} />
);

function IsoProduct() {
  return (
    <svg
      className="sv-art"
      viewBox="-250 -154 500 308"
      role="img"
      aria-label="Product design · an artboard assembling itself"
    >
      <g className="scene">
        <IsoBox x={-108} y={-108} w={216} d={216} h={9} cls="plate" />
        <IsoPads x={-92} y={-92} cols={8} rows={8} gap={26} z={9} />
        <IsoCast x={-86} y={-86} w={84} d={84} />
        <IsoCast x={14} y={-86} w={72} d={54} />
        <IsoCast x={-86} y={16} w={172} d={70} />
        <g className="drop d1">
          <IsoBox x={-86} y={-86} w={84} d={84} h={26} />
        </g>
        <g className="drop d2">
          <IsoBox x={14} y={-86} w={72} d={54} h={16} />
        </g>
        <g className="drop d3">
          <IsoBox x={-86} y={16} w={172} d={70} h={20} cls="hot" />
          <IsoLed x={70} y={30} z={20} />
        </g>
        <g className="drop d2">
          {[0, 1, 2].map((e) => (
            <path
              key={e}
              className="rule"
              d={`M${u(22, -74 + e * 14, 16)} L${u(78, -74 + e * 14, 16)}`}
            />
          ))}
        </g>
        <g className="tap">
          <path className="ln" d={`M${Y(-2, 48)} ${G(-2, 48, 88)} v-34`} />
          <circle className="dot" cx={Y(-2, 48)} cy={G(-2, 48, 86)} r="5" />
        </g>
        <path className="dim" d={`M${u(-108, 118)} L${u(108, 118)}`} />
        <path
          className="dim"
          d={`M${u(-108, 112)} L${u(-108, 124)} M${u(108, 112)} L${u(108, 124)}`}
        />
        <IsoSilk x={0} y={140} t="6 STARTUPS" />
        <IsoSilk x={-150} y={-40} t="R1" />
        <IsoSilk x={140} y={-70} t="S" />
      </g>
    </svg>
  );
}

function IsoAi() {
  const e = [
    {
      x: -112,
      y: -112,
      h: 46,
      t: "PLAN",
      cls: "s1",
    },
    {
      x: 30,
      y: -112,
      h: 34,
      t: "BUILD",
      cls: "s2",
    },
    {
      x: 30,
      y: 30,
      h: 52,
      t: "CHECK",
      cls: "s3",
    },
    {
      x: -112,
      y: 30,
      h: 38,
      t: "SHIP",
      cls: "s4",
    },
  ];
  const t = (a) => [a.x + 41, a.y + 41];
  return (
    <svg
      className="sv-art"
      viewBox="-250 -168 500 308"
      role="img"
      aria-label="AI workflow · a ring of stations with a pulse going round it"
    >
      <g className="scene">
        <IsoBox x={-130} y={-130} w={260} d={260} h={8} cls="plate" />
        <IsoPads x={-114} y={-114} cols={9} rows={9} gap={28} z={8} />
        <g className="wires">
          {e.map((a, r) => (
            <IsoWire key={r} a={t(a)} b={t(e[(r + 1) % e.length])} />
          ))}
        </g>
        {e.map((a, r) => (
          <g key={r}>
            <IsoCast x={a.x} y={a.y} w={82} d={82} />
            <g className={`stn ${a.cls}`}>
              <IsoBox x={a.x} y={a.y} w={82} d={82} h={a.h} />
              <polygon
                className="die"
                points={`${u(a.x + 16, a.y + 16, a.h)} ${u(a.x + 66, a.y + 16, a.h)} ${u(a.x + 66, a.y + 66, a.h)} ${u(a.x + 16, a.y + 66, a.h)}`}
              />
              <IsoLed x={a.x + 41} y={a.y + 41} z={a.h} cls={`l${r + 1}`} />
              <IsoSilk x={a.x + 41} y={a.y + 96} t={a.t} />
            </g>
          </g>
        ))}
        <circle className="pulse" r="6.5" cx={Y(-71, -71)} cy={G(-71, -71, 3)} />
      </g>
    </svg>
  );
}

function IsoSystem() {
  const e = [
    {
      x: -82,
      y: -82,
    },
    {
      x: 2,
      y: -82,
    },
    {
      x: -82,
      y: 2,
    },
    {
      x: 2,
      y: 2,
    },
  ];
  return (
    <svg
      className="sv-art"
      viewBox="-250 -164 500 308"
      role="img"
      aria-label="Design systems · tokens falling into a stack that builds itself"
    >
      <g className="scene">
        <IsoBox x={-116} y={-116} w={232} d={232} h={8} cls="plate" />
        <IsoPads x={-100} y={-100} cols={8} rows={8} gap={28} z={8} />
        {e.map((t, a) => (
          <g key={a}>
            <IsoCast x={t.x} y={t.y} w={80} d={80} />
            <g className={`build b${a + 1}`}>
              <IsoBox x={t.x} y={t.y} w={80} d={80} h={38} />
              <polygon
                className="die"
                points={`${u(t.x + 14, t.y + 14, 38)} ${u(t.x + 66, t.y + 14, 38)} ${u(t.x + 66, t.y + 66, 38)} ${u(t.x + 14, t.y + 66, 38)}`}
              />
            </g>
          </g>
        ))}
        <g className="build b5">
          <IsoBox x={-40} y={-40} w={80} d={80} h={38} cls="hot" />
          <IsoLed x={0} y={0} z={38} />
        </g>
        <path className="rail" d={`M${u(-160, -60, 2)} L${u(-160, 70, 2)}`} />
        <g className="tok t1">
          <IsoBox x={-172} y={-52} w={24} d={24} h={24} cls="tok-a" />
        </g>
        <g className="tok t2">
          <IsoBox x={-172} y={-6} w={24} d={24} h={24} cls="tok-b" />
        </g>
        <g className="tok t3">
          <IsoBox x={-172} y={40} w={24} d={24} h={24} cls="tok-c" />
        </g>
        <IsoSilk x={-160} y={100} t="MENTOR" />
        <IsoSilk x={0} y={140} t="10,000+" />
      </g>
    </svg>
  );
}

const gs = [IsoProduct, IsoAi, IsoSystem];

export function FocusArt({ index }) {
  const TTag = gs[index % gs.length];
  return <TTag />;
}
