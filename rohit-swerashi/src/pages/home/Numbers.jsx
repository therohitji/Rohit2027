import { gsap, prefersReduced, useCountUp } from "../../lib/fx";
import React from "react";
import { Link } from "react-router-dom";

function Stat({ value, label, parts }) {
  const ref = useCountUp();
  return (
    <div className="rs-stat">
      <b ref={ref}>{value}</b>
      <span>{label}</span>
      {parts && (
        <ul className="rs-stat-parts">
          {parts.map(([v, l]) => (
            <li key={l}>
              <em>{v}</em> {l}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Numbers({ statement, sub, link, stats }) {
  const root = React.useRef(null);
  React.useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.from(".rs-say i", {
        opacity: 0.14,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: ".rs-say", start: "top 78%", end: "bottom 42%", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section className="sv-wrap rs-numbers" id="numbers" ref={root}>
      <div className="rs-numbers-left">
        <h2 className="rs-say">
          {statement.split(" ").map((w, i) => (
            <i key={i}>{w} </i>
          ))}
        </h2>
        <p>{sub}</p>
        <Link className="rs-more" to={link.href}>
          {link.label} →
        </Link>
      </div>
      <div className="rs-numbers-right">
        {stats.map((s) => (
          <Stat key={s.label} value={s.value} label={s.label} parts={s.parts} />
        ))}
      </div>
    </section>
  );
}
