import { Footer } from "../components/Footer";
import { SiteNav } from "../components/SiteNav";
import { Tools } from "../components/Tools";
import { dimLines } from "../components/ui";
import { AI_TOOLS } from "../content/ai";
import { COPY } from "../content/copy";
import { MOSAIC } from "../content/gallery";
import { FOCUS, SITE, STREET_BRANDS, STATS } from "../content/site";
import { useTheme, useHashScroll, useSmoothScroll } from "../lib/motion";
import { Board } from "./home/Board";
import { Focus } from "./home/Focus";
import { GlobeBand } from "./home/GlobeBand";
import { Hero } from "./home/Hero";
import { Journey } from "./home/Journey";
import { Manage } from "./home/Manage";
import { Marquee } from "./home/Marquee";
import { Numbers } from "./home/Numbers";
import { Outro } from "./home/Outro";
import { ProofCard } from "./home/ProofCard";
import { Ribbon } from "./home/Ribbon";
import { Writing } from "./home/Writing";

function Home() {
  const [e, t] = useTheme();
  const a = COPY.home;
  const about = COPY.about;
  const r = FOCUS.map((c) => ({
    title: c.title,
    years: `${c.yr}${c.unit.replace("+ yrs", "+ YEARS").toUpperCase()}`.replace(/\s+/g, " ").trim(),
    desc: c.desc,
    short: `${c.yr}${c.unit.replace(" yrs", "")} YRS`.toUpperCase(),
  }));
  const l = MOSAIC.shots;
  useHashScroll();
  useSmoothScroll(0.07);
  return (
    <div className={`site-root ${e ? "is-dark" : ""}`}>
      <SiteNav dark={e} onToggleDark={t} />
      <Hero
        titleLines={a.heroTitle}
        sub={a.heroSub}
        ctaLabel={a.heroCta}
        ctaHref={a.heroCtaHref}
        cta2Label={a.heroCta2}
        cta2Href={a.heroCta2Href}
        brands={STREET_BRANDS.map((c) => ({
          name: c.name,
          role: c.role,
        }))}
      />
      <GlobeBand title={a.globeTitle} sub={a.globeSub} stops={a.globeStops} dark={e} />
      <ProofCard title={a.proofTitle} film={a.proofFilm} names={a.proofNames} />
      <Numbers
        statement={a.statement}
        sub={a.statementSub}
        link={{ label: a.statsCta, href: a.statsCtaHref }}
        stats={STATS.map((c) => ({ value: c.v, label: c.l, parts: c.parts }))}
      />
      <Outro
        email={SITE.email}
        availability={SITE.availability}
        title={dimLines(["Let's build *something.*"])}
        sub={COPY.contact.heroSub}
        signoff={false}
      />
      <Focus tracks={r} title={dimLines(a.focusTitle)} sub={a.focusSub} />
      <Board title={a.boardTitle} labels={a.boardLabels} items={a.board} />
      <Journey
        title={about.journeyTitle}
        sub={about.journeyLead}
        lessonLabel={about.lessonLabel}
        items={about.timeline}
      />
      <Manage title={a.manageTitle} sub={a.manageSub} foot={a.manageFoot} items={a.manage} />
      <Writing title={a.writingTitle} sub={a.writingSub} items={a.writing} />
      <Tools tools={AI_TOOLS} title={dimLines(a.toolsTitle)} sub={a.toolsSub} />
      <Marquee title={COPY.themes.quotesTitle} sub={COPY.themes.quotesSub} items={COPY.themes.quotes} />
      <Ribbon
        title={a.ctaTitle}
        sub={a.ctaSub}
        cta={a.ctaLabel}
        ctaHref={a.ctaHref}
        images={l.map((s) => `/${s.src}`)}
      />
      <Footer />
    </div>
  );
}

export default Home;
