import { SectionHead, dimLines, Reveal } from "../../components/ui";

function Person({ q }) {
  return (
    <footer className="rs-person">
      <span className="mono" aria-hidden="true">
        {q.t[0]}
      </span>
      <span>
        <b>{q.t}</b>
        <small>{q.k}</small>
      </span>
    </footer>
  );
}

export function Quotes({ title, sub, items }) {
  const [lead, ...rest] = items;
  return (
    <section className="sv-wrap sv-pad" id="quotes" data-badge="In their words">
      <SectionHead lines={dimLines(title)} sub={sub} />
      <Reveal as="blockquote" className="rs-quote-lead">
        <p>{lead.d}</p>
        <Person q={lead} />
      </Reveal>
      <div className="rs-quotes">
        {rest.map((q) => (
          <Reveal as="blockquote" key={q.t} className="rs-quote">
            <p>{q.d}</p>
            <Person q={q} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
