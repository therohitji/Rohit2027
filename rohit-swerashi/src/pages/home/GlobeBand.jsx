import { Lines, dimLines, Reveal } from "../../components/ui";
import { gsap, prefersReduced } from "../../lib/fx";
import { Globe, GLOBE_HOLD } from "./Globe";
import React from "react";

export function GlobeBand({ title, sub, stops, dark }) {
  const root = React.useRef(null);
  const jumpTo = React.useRef(() => {});
  const [on, setOn] = React.useState(0);
  React.useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".rs-globe",
        { scale: 0.9 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 25%", scrub: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section className="rs-h" id="from" ref={root}>
      <div className="sv-wrap rs-h-in">
        <div className="rs-h-copy">
          <Lines lines={dimLines(title)} />
          <Reveal className="rs-h-sub">
            <p>{sub}</p>
          </Reveal>
          <div className="rs-route" style={{ "--rs-hold": `${GLOBE_HOLD}ms`, "--rs-at": on / (stops.length - 1) }}>
            <div className="rs-route-from">Varanasi</div>
            <div className="rs-stops">
              {stops.map((s, k) => (
                <button
                  key={s.t}
                  type="button"
                  className={`${k === on ? "is-on" : ""}${k < on ? " is-past" : ""}`}
                  aria-pressed={k === on}
                  aria-label={`${s.t}: ${s.d}`}
                  onClick={() => jumpTo.current(k)}
                >
                  <i aria-hidden="true" />
                  <b>{s.t}</b>
                </button>
              ))}
            </div>
            <div className="rs-route-now" key={stops[on].t}>
              <b>{stops[on].t}</b>
              <span>{stops[on].d}</span>
            </div>
          </div>
        </div>
        <Globe stops={stops} dark={dark} onStop={setOn} jumpTo={jumpTo} />
      </div>
    </section>
  );
}
