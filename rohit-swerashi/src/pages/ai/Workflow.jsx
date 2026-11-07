import { SectionHead, dimLines, Reveal } from "../../components/ui";

export function Workflow({ title, sub, phases }) {
  return (
    <section className="sv-wrap sv-pad" id="loop" data-badge="The workflow">
      <SectionHead lines={dimLines(title)} sub={sub} />
      <div className="rs-flow">
        {phases.map((p) => (
          <div className="rs-phase" key={p.name}>
            <header>
              <span className="dot" aria-hidden="true" />
              <h3>{p.name}</h3>
              <p>{p.sub}</p>
            </header>
            <div className="rs-phase-steps">
              {p.steps.map((s) => (
                <Reveal as="article" key={s.t} className="rs-step">
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
