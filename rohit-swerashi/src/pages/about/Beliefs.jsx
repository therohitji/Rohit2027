import { SectionHead, dimLines, Reveal } from "../../components/ui";

export function Beliefs({ title, sub, items }) {
  return (
    <section className="sv-wrap sv-pad" id="believe" data-badge="Principles">
      <SectionHead lines={dimLines(title)} sub={sub} />
      <div className="rs-beliefs">
        {items.map((e) => (
          <Reveal key={e.t} className={`rs-belief${e.size ? ` is-${e.size}` : ""}`}>
            <span className="k">{e.k}</span>
            <h3>{e.t}</h3>
            <p>{e.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
