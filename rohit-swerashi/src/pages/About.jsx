import { Footer } from "../components/Footer";
import { Ledger } from "../components/Ledger";
import { SiteNav } from "../components/SiteNav";
import { Lines, dimLines, Reveal } from "../components/ui";
import { COPY } from "../content/copy";
import { LIFE_SHOTS } from "../content/gallery";
import { Moments } from "./about/Moments";
import { SITE, COMPANIES } from "../content/site";
import { useTheme, useSmoothScroll } from "../lib/motion";
import { AboutHero } from "./about/AboutHero";
import { Beliefs } from "./about/Beliefs";
import { Timeline } from "./about/Timeline";
import { Credo } from "./about/Credo";
import { Ebook } from "./about/Ebook";
import { LifeStrip } from "./about/LifeStrip";

function About() {
  const [a, t] = useTheme();
  useSmoothScroll();
  const c = COPY.about;
  return (
    <div className={`site-root ${a ? "is-dark" : ""}`}>
      <SiteNav dark={a} onToggleDark={t} />
      <AboutHero lead={c.heroLead} />
      <section className="sv-wrap sv-pad sv-ab-statement" id="profile" data-badge="Profile">
        <div className="sv-ab-statement-grid">
          <Lines as="h2" lines={dimLines(c.statement)} />
          <Reveal className="aside">
            <p>{c.statementBody}</p>
          </Reveal>
        </div>
      </section>
      <LifeStrip shots={LIFE_SHOTS} />
      <Credo
        title={dimLines(c.credTitle)}
        meta={c.credMeta}
        lead={c.credLead}
        tail={
          <>
            {c.credTail}{" "}
            <span className="hl">{c.credTailHl}</span>
          </>
        }
      />
      <Timeline title={c.journeyTitle} sub={c.journeyLead} items={c.timeline} lessonLabel={c.lessonLabel} />
      <Beliefs title={c.principlesTitle} sub={c.principlesSub} items={c.beliefs} />
      <Ledger
        entries={COMPANIES.map((n) => ({
          name: n.name,
          role: n.role,
          note: n.note,
        }))}
        title={dimLines(c.companiesTitle)}
        sub={c.companiesNote}
      />
      <Ebook />
      <Moments />
      <Footer />
    </div>
  );
}

export default About;
