import { SectionHead } from "./ui";
import { useStaggerReveal } from "../lib/motion";
import React from "react";

export function Ledger({ entries, title, sub }) {
  const a = React.useRef(null);
  useStaggerReveal(a, ".sv-card", {
    from: 0.96,
    rise: 12,
    start: 0.94,
    span: 0.36,
    overlap: 0.5,
  });
  return (
    <section className="sv-wrap sv-pad" id="profile" data-badge="Companies">
      <SectionHead lines={title} sub={sub} />
      <div className={`sv-board ${entries.length % 3 === 0 ? "is-c3" : "is-c4"}`} ref={a}>
        {entries.map((e, n) => (
          <article key={e.name} className="sv-card">
            <span className="ix">A{n + 1}</span>
            <h3>{e.name}</h3>
            <span className="role">{e.role}</span>
            <p>{e.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
