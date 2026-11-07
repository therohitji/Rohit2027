import { Ledger } from "../components/Ledger";
import { Footer } from "../components/Footer";
import { RailHead } from "../components/RailHead";
import { SiteNav } from "../components/SiteNav";
import { dimLines } from "../components/ui";
import { COPY } from "../content/copy";
import { SCREENSHOTS } from "../content/gallery";
import { useTheme, useHashScroll, useSmoothScroll } from "../lib/motion";
import { Gallery } from "./work/Gallery";
import { Nda } from "./work/Nda";
import { M, he, ShowcaseIndex } from "./work/Showcase";
import React from "react";

function Work() {
  const [s, l] = useTheme();
  useHashScroll();
  useSmoothScroll();
  const a = COPY.work;
  const i = M();
  const n = he();
  const [r, f] = React.useState({});
  const g = React.useCallback((o) => r[o] ?? "final", [r]);
  const m = React.useCallback(
    (o, w) =>
      f((d) => ({
        ...d,
        [o]: w,
      })),
    [],
  );
  return (
    <div className={`site-root sv-sc-page ${s ? "is-dark" : ""}`}>
      <SiteNav dark={s} onToggleDark={l} />
      <section className="sv-wrap sv-work-top sv-sc-top">
        <RailHead
          title={dimLines(i.heroTitle, ["The work,", "*as it shipped.*"])}
          sub={i.heroIntro}
          hero={{
            cta: {
              label: a.railCtaShots,
              href: a.railCtaShotsHref ?? "#work-gallery",
            },
          }}
        />
      </section>
      <ShowcaseIndex projects={n} modeOf={g} setMode={m} />
      <Ledger entries={a.consulting} title={dimLines(a.consultTitle)} sub={a.consultSub} />
      <Nda title={a.ndaTitle} names={a.ndaNames ?? []} />
      <Gallery
        shots={SCREENSHOTS}
        initialTab="web"
        tabs={[
          {
            key: "web",
            label: a.galleryTabWeb ?? "Websites",
          },
          {
            key: "apps",
            label: a.galleryTabApps ?? "Apps",
          },
        ]}
        title={dimLines(a.galleryHeading)}
        sub={a.galleryIntro}
      />
      <Footer />
    </div>
  );
}

export default Work;
