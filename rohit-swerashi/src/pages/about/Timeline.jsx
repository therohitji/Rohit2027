import { SectionHead, dimLines, Reveal } from "../../components/ui";

export function Timeline({ title, sub, items, lessonLabel }) {
  return (
    <section className="sv-wrap sv-pad" id="journey" data-badge="The journey">
      <SectionHead lines={dimLines(title)} sub={sub} />
      <ol className="rs-line">
        {items.map((e) => (
          <Reveal as="li" key={e.t} className={`rs-line-item${e.now ? " is-now" : ""}`}>
            <span className="y">{e.y}</span>
            <span className="dot" aria-hidden="true" />
            <article>
              <div>
                <h3>{e.t}</h3>
                <p className="d">{e.d}</p>
              </div>
              <p className="l">
                <b>{lessonLabel}</b>
                {e.l}
              </p>
            </article>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
