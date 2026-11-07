import { Footer } from "../components/Footer";
import { SiteNav } from "../components/SiteNav";
import { Tools } from "../components/Tools";
import { dimLines } from "../components/ui";
import { AI_TOOLS } from "../content/ai";
import { COPY } from "../content/copy";
import { WORK } from "../content/work";
import { useTheme, useHashScroll, useSmoothScroll } from "../lib/motion";
import { BuildLog } from "./ai/Log";
import { Era, EraHero } from "./ai/Era";
import { Workflow } from "./ai/Workflow";

function Ai() {
  const [e, n] = useTheme();
  useHashScroll();
  useSmoothScroll();
  const r = COPY.ai;
  return (
    <div className={`site-root sv-ai-page ${e ? "is-dark" : ""}`}>
      <SiteNav dark={e} onToggleDark={n} />
      <header className="sv-hero sv-ai-hero" id="top">
        <div className="sv-wrap">
          <EraHero />
        </div>
      </header>
      <BuildLog
        entries={WORK}
        title={dimLines(COPY.work.spotlightTitle ?? ["Here's what I built with *AI.*"])}
        sub={COPY.work.spotlightDesc}
      />
      <Workflow title={r.loopTitle} sub={r.loopSub} phases={r.phases} />
      <Era />
      <Tools tools={AI_TOOLS} title={dimLines(r.stackTitle)} sub={r.stackSub} />
      <Footer />
    </div>
  );
}

export default Ai;
