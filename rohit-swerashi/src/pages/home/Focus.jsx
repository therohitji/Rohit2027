import { Lines, Reveal } from "../../components/ui";
import { FocusArt } from "./FocusArt";
import React from "react";

const je = 220;

export function Focus({ tracks, title, sub }) {
  const [r, l] = React.useState(0);
  const [c, f] = React.useState(0);
  const [p, m] = React.useState("rest");
  React.useEffect(() => {
    if (r === c) return;
    m("out");
    const h = window.setTimeout(() => {
      f(r);
      m("in");
    }, je);
    return () => window.clearTimeout(h);
  }, [r, c]);
  React.useEffect(() => {
    if (p !== "in") return;
    const h = requestAnimationFrame(() => m("rest"));
    return () => cancelAnimationFrame(h);
  }, [p, c]);
  const w = (h) => l(Math.min(tracks.length - 1, Math.max(0, h)));
  const g = tracks[c];
  return (
    <section id="focus" className="sv-inst-sec" data-badge="Tracks">
      <div className="sv-inst-track">
        <div className="sv-inst-pin">
          <div
            className="sv-wrap"
            style={{
              width: "100%",
            }}
          >
            <div className="sv-inst-head">
              <Lines lines={title} />
              {sub && (
                <Reveal as="p" className="sv-inst-sub">
                  {sub}
                </Reveal>
              )}
            </div>
            <div className="sv-inst">
              <div key={c} className="sv-dial-box">
                <FocusArt index={c} />
              </div>
              <div
                className={`sv-reading ${p === "out" ? "is-out" : ""} ${p === "in" ? "is-in" : ""}`}
              >
                <h3 className="sv-fade">{g.title}</h3>
                <div className="yrs sv-fade">{g.years}</div>
                <p className="sv-fade">{g.desc}</p>
                <div className="sv-rnav">
                  <button aria-label="Previous track" disabled={c === 0} onClick={() => w(c - 1)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M15 5l-7 7 7 7" />
                    </svg>
                  </button>
                  <button
                    aria-label="Next track"
                    disabled={c === tracks.length - 1}
                    onClick={() => w(c + 1)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
