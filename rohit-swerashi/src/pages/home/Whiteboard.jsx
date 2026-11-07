import { WHITEBOARDS } from "../../content/whiteboard";
import { prefersReduced } from "../../lib/fx";
import { useMediaQuery } from "../../lib/motion";
import React from "react";

const VIEW_W = 1180;
const VIEW_H = 560;
const HOLD = 4200;

function Card({ node, cls, innerRef }) {
  return (
    <article
      ref={innerRef}
      className={`rs-sc-node${node.kind ? ` is-${node.kind}` : ""}${node.hub ? " is-hub" : ""} ${cls}`}
      style={{ left: node.x, top: node.y, width: node.w }}
    >
      {node.chip && (
        <span className="rs-sc-chip">
          <i />
          {node.chip}
        </span>
      )}
      <div className="rs-sc-card">
        {node.label && <small>{node.label}</small>}
        {node.title && <h4>{node.title}</h4>}
        {node.role && <em className="r">{node.role}</em>}
        {node.body && <p className="r">{node.body}</p>}
        {node.rows && (
          <dl>
            {node.rows.map(([k, v], i) => (
              <div className="r" key={k} style={{ "--i": i }}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}
        {node.list && (
          <ul>
            {node.list.map((v, i) => (
              <li className="r" key={v} style={{ "--i": i }}>
                {v}
              </li>
            ))}
          </ul>
        )}
        {node.status && <span className={`rs-sc-status r is-${node.tone}`}>{node.status}</span>}
        {node.lesson && (
          <p className="rs-sc-lesson">
            <b>What it taught me</b>
            {node.lesson}
          </p>
        )}
        {node.proof && (
          <div className="rs-sc-proof r" style={{ "--i": 3 }}>
            <b>{node.proof}</b>
            <span>{node.proofSub}</span>
          </div>
        )}
      </div>
    </article>
  );
}

function wirePath(a, b, vertical) {
  if (vertical) {
    const x1 = a.x + a.w / 2;
    const y1 = a.y + a.h;
    const x2 = b.x + b.w / 2;
    const y2 = b.y;
    const m = (y1 + y2) / 2;
    return `M${x1} ${y1} C${x1} ${m}, ${x2} ${m}, ${x2} ${y2}`;
  }
  const x1 = a.x + a.w;
  const y1 = a.y + a.h / 2;
  const x2 = b.x;
  const y2 = b.y + b.h / 2;
  const m = (x1 + x2) / 2;
  return `M${x1} ${y1} C${m} ${y1}, ${m} ${y2}, ${x2} ${y2}`;
}

// One board: cards arrive one by one, the wires draw themselves, the camera follows, then it pulls back to show the whole path.
function Scene({ scene }) {
  const stage = React.useRef(null);
  const refs = React.useRef({});
  const still = prefersReduced();
  const last = Math.max(...scene.nodes.map((n) => n.at));
  const fits = scene.w <= VIEW_W;
  const [step, setStep] = React.useState(still ? last + 1 : 0);
  const [zoom, setZoom] = React.useState(1);
  const [boxes, setBoxes] = React.useState(null);
  const [seen, setSeen] = React.useState(false);
  React.useLayoutEffect(() => {
    const el = stage.current;
    const measure = () => {
      setZoom(el.clientWidth / VIEW_W);
      const next = {};
      for (const n of scene.nodes) {
        const r = refs.current[n.id];
        if (r) next[n.id] = { x: r.offsetLeft, y: r.offsetTop, w: r.offsetWidth, h: r.offsetHeight };
      }
      setBoxes(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [scene]);
  React.useEffect(() => {
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.2 });
    io.observe(stage.current);
    return () => io.disconnect();
  }, []);
  React.useEffect(() => {
    if (still || !seen) return;
    const wait = step > last ? HOLD : step === last ? scene.ms + 900 : scene.ms;
    const t = setTimeout(() => setStep((s) => (s > last ? 0 : s + 1)), wait);
    return () => clearTimeout(t);
  }, [step, seen, still, last, scene.ms]);
  const overview = step > last;
  const active = scene.nodes.find((n) => n.at === Math.min(step, last));
  let camera = `translate(0px, 0px) scale(${zoom})`;
  if (!fits && boxes) {
    if (overview) {
      const s = zoom * Math.min(VIEW_W / scene.w, VIEW_H / scene.h);
      camera = `translate(${(VIEW_W * zoom - scene.w * s) / 2}px, ${(VIEW_H * zoom - scene.h * s) / 2}px) scale(${s})`;
    } else {
      const b = boxes[active.id];
      const x = Math.min(0, Math.max(VIEW_W - scene.w, VIEW_W * 0.52 - (b.x + b.w / 2)));
      camera = `translate(${x * zoom}px, 0px) scale(${zoom})`;
    }
  }
  const at = Object.fromEntries(scene.nodes.map((n) => [n.id, n.at]));
  const pointer = boxes && boxes[active.id];
  return (
    <div className="rs-sc-stage" ref={stage}>
      <div className="rs-sc-world" style={{ width: scene.w, height: scene.h, transform: camera }}>
        <svg className="rs-sc-wires" width={scene.w} height={scene.h} aria-hidden="true">
          {boxes &&
            scene.wires.map(([a, b, v], i) => {
              if (!boxes[a] || !boxes[b]) return null;
              const d = wirePath(boxes[a], boxes[b], v === "v");
              const on = at[b] <= step;
              return (
                <g key={`${a}${b}`} className={on ? "is-on" : ""}>
                  <mask id={`${scene.id}-m${i}`} maskUnits="userSpaceOnUse" x="0" y="0" width={scene.w} height={scene.h}>
                    <path className="rs-sc-draw" d={d} pathLength="1" />
                  </mask>
                  <path className="rs-sc-wire" d={d} mask={`url(#${scene.id}-m${i})`} />
                  {on && !still && (
                    <circle className="rs-sc-pulse" r="3.5">
                      <animateMotion dur="2.4s" repeatCount="indefinite" path={d} />
                    </circle>
                  )}
                </g>
              );
            })}
        </svg>
        {scene.nodes.map((n) => (
          <Card
            key={n.id}
            node={n}
            innerRef={(el) => (refs.current[n.id] = el)}
            cls={`${n.at <= step ? "is-in" : ""}${n.at === step ? " is-now" : ""}`}
          />
        ))}
        {pointer && !overview && !still && (
          <span className="rs-sc-cursor" style={{ transform: `translate(${pointer.x + pointer.w - 74}px, ${pointer.y + pointer.h - 10}px)` }} aria-hidden="true">
            <svg viewBox="0 0 12 17" width="14" height="20">
              <path d="M0 0 L0 13 L3.2 9.8 L5.6 15 L8 14 L5.6 9 L10 8.6 Z" />
            </svg>
            <i>Rohit</i>
          </span>
        )}
      </div>
      <span className="rs-sc-progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${Math.min(1, (step + 1) / (last + 1))})` }} />
      </span>
    </div>
  );
}

// On a phone: one swipeable row, with each lesson folded into its launch.
function Column({ scene }) {
  const cards = [];
  for (const n of scene.nodes) {
    if (n.kind === "note" && cards.length) cards[cards.length - 1] = { ...cards[cards.length - 1], lesson: n.body };
    else cards.push(n);
  }
  return (
    <div className="rs-sc-swipe">
      <div className="rs-sc-column" key={scene.id}>
        {cards.map((n) => (
          <Card key={n.id} node={n} cls="is-in" />
        ))}
      </div>
      <p className="rs-sc-hint">Swipe to see all {cards.length}</p>
    </div>
  );
}

export function Whiteboard() {
  const [tab, setTab] = React.useState(0);
  const narrow = useMediaQuery("(max-width: 900px)");
  const scene = WHITEBOARDS[tab];
  return (
    <div className="rs-wb">
      <div className="rs-wb-bar">
        <span className="rs-wb-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <div className="rs-wb-tabs" role="tablist" aria-label="How I work">
          {WHITEBOARDS.map((s, i) => (
            <button key={s.id} type="button" role="tab" aria-selected={i === tab} className={`rs-wb-tab${i === tab ? " is-on" : ""}`} onClick={() => setTab(i)}>
              <b>{s.tab}</b>
              <span>{s.sub}</span>
            </button>
          ))}
        </div>
      </div>
      {narrow ? <Column scene={scene} /> : <Scene key={scene.id} scene={scene} />}
    </div>
  );
}
