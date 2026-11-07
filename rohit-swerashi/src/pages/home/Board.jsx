import { dimLines } from "../../components/ui";
import { gsap, prefersReduced, scrollToY, ScrollTrigger } from "../../lib/fx";
import React from "react";
import { Link } from "react-router-dom";

export function Board({ title, labels, items }) {
  const pin = React.useRef(null);
  const trig = React.useRef(null);
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    if (prefersReduced()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 961px) and (min-height: 620px)", () => {
      trig.current = ScrollTrigger.create({
        trigger: pin.current,
        start: "top top",
        end: () => `+=${(items.length - 1) * window.innerHeight * 0.9}`,
        pin: true,
        onUpdate: (s) => setStep(Math.round(s.progress * (items.length - 1))),
      });
      return () => {
        trig.current = null;
      };
    });
    return () => mm.revert();
  }, [items.length]);
  const go = (i) => {
    const s = trig.current;
    if (s) scrollToY(s.start + (i / (items.length - 1)) * (s.end - s.start) + 1);
    else setStep(i);
  };
  React.useEffect(() => {
    const row = pin.current?.querySelector(".rs-tabs");
    const on = row?.querySelector(".is-on");
    if (on && row.scrollWidth > row.clientWidth) row.scrollTo({ left: on.offsetLeft - 8, behavior: "smooth" });
  }, [step]);
  const it = items[step];
  const nodes = React.useRef(null);
  const [wires, setWires] = React.useState([]);
  React.useLayoutEffect(() => {
    const box = nodes.current;
    const link = (a, b, ax, bx) => {
      const x1 = a.offsetLeft + a.offsetWidth * ax;
      const y1 = a.offsetTop + a.offsetHeight;
      const x2 = b.offsetLeft + b.offsetWidth * bx;
      const y2 = b.offsetTop;
      const m = (y1 + y2) / 2;
      return `M${x1} ${y1} C${x1} ${m}, ${x2} ${m}, ${x2} ${y2}`;
    };
    const draw = () => {
      const [a, b, c] = box.querySelectorAll(".rs-node");
      setWires([link(a, b, 0.62, 0.3), link(b, c, 0.3, 0.72)]);
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [step]);
  return (
    <section className="rs-board" id="companies">
      <div className="rs-board-pin" ref={pin}>
        {items.map((e, i) =>
          e.img ? (
            <img key={e.id} className={`${i === step ? "is-on" : ""}${e.left ? " is-left" : ""}`} src={e.img} alt={`${e.name}, by Rohit Swerashi`} decoding="async" />
          ) : (
            <div key={e.id} className={`rs-board-bg ${e.bg} ${i === step ? "is-on" : ""}`} />
          ),
        )}
        <div className="rs-board-shade" />
        <div className="rs-board-in">
          <div className="rs-board-left">
            <h2>{dimLines(title)}</h2>
            <div className="rs-board-name" key={it.id}>
              <small>
                {it.span} · {it.role}
              </small>
              <b>{it.name}</b>
              <Link className="sv-btn sv-btn--accent" to={it.href}>
                Read the story →
              </Link>
            </div>
          </div>
          <div className="rs-board-panel">
            <div className="rs-tabs" role="tablist" aria-label="Companies">
              {items.map((e, i) => (
                <button
                  key={e.id}
                  id={`board-tab-${e.id}`}
                  type="button"
                  role="tab"
                  aria-selected={i === step}
                  className={i === step ? "is-on" : ""}
                  onClick={() => go(i)}
                >
                  {e.name}
                </button>
              ))}
            </div>
            <div className="rs-nodes" key={it.id} ref={nodes}>
              <svg aria-hidden="true">
                {wires.map((d) => (
                  <path key={d} d={d} pathLength="1" />
                ))}
              </svg>
              <article className="rs-node n1">
                <small>{labels[0]}</small>
                <p>{it.p}</p>
              </article>
              <article className="rs-node n2">
                <small>{labels[1]}</small>
                <p>{it.m}</p>
              </article>
              <article className="rs-node n3">
                <small>{labels[2]}</small>
                <b>{it.v}</b>
                <p>{it.l}</p>
              </article>
            </div>
            <div className="rs-board-bar" aria-hidden="true">
              <i style={{ width: `${((step + 1) / items.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
