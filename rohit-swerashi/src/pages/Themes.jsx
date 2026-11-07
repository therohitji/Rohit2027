import { Footer } from "../components/Footer";
import { RailHead } from "../components/RailHead";
import { SiteNav } from "../components/SiteNav";
import { dimLines } from "../components/ui";
import { COPY } from "../content/copy";
import { THEMES } from "../content/themes";
import { useTheme, useHashScroll, useSmoothScroll } from "../lib/motion";
import { Honours } from "./themes/Honours";
import { Quotes } from "./themes/Quotes";
import { ThemeGrid } from "./themes/ThemeGrid";

function Themes() {
  const [i, t] = useTheme();
  useHashScroll();
  useSmoothScroll();
  const a = COPY.themes;
  return (
    <div className={`site-root ${i ? "is-dark" : ""}`}>
      <SiteNav dark={i} onToggleDark={t} />
      <section className="sv-wrap sv-work-top sv-th-top" id="themes">
        <RailHead
          title={dimLines(a.title)}
          sub={a.intro}
          hero={{
            cta: {
              label: a.cta,
              href: a.ctaHref,
            },
          }}
        />
        <ThemeGrid
          themes={THEMES}
          cta={a.cardCta}
          soon={{
            name: a.soonName,
            kind: a.soonKind,
            specs: a.soonSpecs,
            cta: a.soonCta,
          }}
        />
      </section>
      <Honours
        title={a.buildTitle}
        sub={a.buildSub}
        backersLabel={a.backersLabel}
        backers={a.backers}
        years={a.honours}
      />
      <Quotes title={a.quotesTitle} sub={a.quotesSub} items={a.quotes} />
      <Footer />
    </div>
  );
}

export default Themes;
