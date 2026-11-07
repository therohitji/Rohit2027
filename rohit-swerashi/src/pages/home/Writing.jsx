import { SectionHead, dimLines, Reveal } from "../../components/ui";

export function Writing({ title, sub, items }) {
  return (
    <section className="sv-wrap sv-pad" id="writing" data-badge="Writing">
      <SectionHead lines={dimLines(title)} sub={sub} />
      <div className="rs-writing">
        {items.map((e) => {
          const body = (
            <>
              {e.img && <img src={e.img} alt={e.t} loading="lazy" decoding="async" />}
              <span className="txt">
                <span className="k">{e.k}</span>
                <span className="t">
                  {e.t}
                  {e.href ? " ↗" : ""}
                </span>
                <span className="d">{e.d}</span>
              </span>
            </>
          );
          const cls = `rs-write${e.img ? " is-lead" : ""}`;
          return e.href ? (
            <Reveal
              key={e.t}
              as="a"
              className={cls}
              href={e.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {body}
            </Reveal>
          ) : (
            <Reveal key={e.t} className={cls}>
              {body}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
