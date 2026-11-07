import { SectionHead, dimLines, Reveal } from "../../components/ui";

export function Honours({ title, sub, backersLabel, backers, years }) {
  return (
    <section className="sv-wrap sv-pad" id="built" data-badge="The list">
      <SectionHead lines={dimLines(title)} sub={sub} />
      <Reveal className="rs-backers">
        <span>{backersLabel}</span>
        <ul>
          {backers.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </Reveal>
      <div className="rs-years">
        {years.map((y) => (
          <div className="rs-year" key={y.y}>
            <h3>{y.y}</h3>
            <div className="rs-year-grid">
              {y.items.map((e) => (
                <Reveal as="article" key={e.t} className={`rs-honour${e.top ? " is-top" : ""}`}>
                  <span className="k">{e.c}</span>
                  <h4>{e.t}</h4>
                  <p>{e.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
