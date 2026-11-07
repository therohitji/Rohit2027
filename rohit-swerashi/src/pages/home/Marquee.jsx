import { Button, Lines, dimLines } from "../../components/ui";
import { prefersReduced } from "../../lib/fx";
import React from "react";

const HOLD = 6500;
const TOTAL = 16;
const LINKEDIN = "https://www.linkedin.com/in/rohitswerashi/details/recommendations/";

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

export function Marquee({ title, sub, items }) {
  const [on, setOn] = React.useState(0);
  const [held, setHeld] = React.useState(false);
  React.useEffect(() => {
    if (held || prefersReduced()) return;
    const t = setTimeout(() => setOn((x) => (x + 1) % items.length), HOLD);
    return () => clearTimeout(t);
  }, [on, held, items.length]);
  const row = React.useRef(null);
  React.useEffect(() => {
    const el = row.current;
    const b = el?.children[on];
    if (b && el.scrollWidth > el.clientWidth) el.scrollTo({ left: b.offsetLeft - el.offsetLeft - 20, behavior: "smooth" });
  }, [on]);
  const q = items[on];
  return (
    <section className="rs-mq" id="words">
      <div className="sv-wrap rs-mq-in">
        <div className="rs-mq-head">
          <Lines lines={dimLines(title)} />
          <p>{sub}</p>
          <Button href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            Read them on LinkedIn
          </Button>
        </div>
        <figure className="rs-mq-now" key={q.t}>
          <blockquote>{q.d}</blockquote>
          <figcaption>
            <span className="rs-mq-av" aria-hidden="true">
              {initials(q.t)}
            </span>
            <span>
              <b>{q.t}</b>
              <small>{q.k}</small>
            </span>
          </figcaption>
          {!held && <i className="rs-mq-run" style={{ "--hold": `${HOLD}ms` }} aria-hidden="true" />}
        </figure>
        <div className="rs-mq-people" role="tablist" aria-label="Who said it" ref={row}>
          {items.map((p, i) => (
            <button
              key={p.t}
              type="button"
              role="tab"
              aria-selected={i === on}
              className={i === on ? "is-on" : ""}
              onClick={() => {
                setHeld(true);
                setOn(i);
              }}
            >
              <span className="rs-mq-who">
                <span className="rs-mq-av" aria-hidden="true">
                  {initials(p.t)}
                </span>
                <span>
                  <b>{p.t}</b>
                  <small>{p.k}</small>
                </span>
              </span>
              <span className="rs-mq-peek">{p.d}</span>
            </button>
          ))}
          <a className="rs-mq-more" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            <b>+{TOTAL - items.length} more</b>
            <small>On LinkedIn</small>
          </a>
        </div>
      </div>
    </section>
  );
}
