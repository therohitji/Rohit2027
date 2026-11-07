import { SectionHead, dimLines } from "../../components/ui";
import { prefersReduced } from "../../lib/fx";
import React from "react";

export function Manage({ title, sub, foot, items }) {
  const [i, setI] = React.useState(0);
  const [held, setHeld] = React.useState(false);
  React.useEffect(() => {
    if (held || prefersReduced()) return;
    const t = setInterval(() => setI((x) => (x + 1) % items.length), 5200);
    return () => clearInterval(t);
  }, [held, items.length]);
  const it = items[i];
  return (
    <section className="rs-manage" id="manage">
      <div className="sv-wrap">
        <SectionHead lines={dimLines(title)} sub={sub} />
        <div className="rs-stack" key={it.t}>
          <div className="rs-stack-back b1" />
          <div className="rs-stack-back b2" />
          <article className="rs-stack-card">
            <img src={it.img} alt={`Rohit Swerashi, ${it.t}`} decoding="async" />
            <div>
              <h3>{it.t}</h3>
              <ul>
                {it.can.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </article>
          {it.proof.map((p, k) => (
            <div className={`rs-sat s${k + 1}`} key={p}>
              {p}
            </div>
          ))}
        </div>
        <div className="rs-tabs rs-tabs-light" role="tablist" aria-label="Kinds of management">
          {items.map((e, k) => (
            <button
              key={e.t}
              id={`manage-tab-${k}`}
              type="button"
              role="tab"
              aria-selected={k === i}
              className={k === i ? "is-on" : ""}
              onClick={() => {
                setHeld(true);
                setI(k);
              }}
            >
              {e.short}
            </button>
          ))}
        </div>
        <p className="rs-manage-foot">{foot}</p>
      </div>
    </section>
  );
}
