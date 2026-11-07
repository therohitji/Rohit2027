import { Footer } from "../components/Footer";
import { SiteNav } from "../components/SiteNav";
import { Reveal, Lines, dimLines, Arrow } from "../components/ui";
import { COPY } from "../content/copy";
import { SITE } from "../content/site";
import { useTheme, useSmoothScroll } from "../lib/motion";

function Privacy() {
  const [c, r] = useTheme();
  const a = COPY.privacy || {};
  useSmoothScroll();
  return (
    <div className={`site-root sv-fill ${c ? "is-dark" : ""}`}>
      <SiteNav dark={c} onToggleDark={r} />
      <header className="sv-hero sv-cn-hero" id="top">
        <div className="sv-wrap sv-cn-content">
          <Reveal as="div" className="sv-page-meta">
            {a.updated}
          </Reveal>
          <Lines as="h1" lines={dimLines(a.heroTitle)} />
          <Reveal as="p" className="sv-cn-sub">
            {a.heroSub}
          </Reveal>
        </div>
      </header>
      <section className="sv-legal-sec">
        <div className="sv-wrap">
          <div className="sv-prose">
            {(a.sections || []).map((l) => (
              <Reveal key={l.h} className="sv-prose-block">
                <h2>{l.h}</h2>
                {l.p.map((o, n) => (
                  <p key={n}>{o}</p>
                ))}
              </Reveal>
            ))}
            <Reveal className="sv-prose-block">
              <h2>{a.contactLabel}</h2>
              <p>
                <a className="sv-tlink" href={`mailto:${SITE.email}`}>
                  {SITE.email} <Arrow dir="e" />
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Privacy;
