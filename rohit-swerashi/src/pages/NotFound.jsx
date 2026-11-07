import { RobotSide } from "../components/BoardWalk";
import { Footer } from "../components/Footer";
import { SiteNav } from "../components/SiteNav";
import { Reveal, Lines, dimLines, Arrow } from "../components/ui";
import { COPY } from "../content/copy";
import { useTheme, useSmoothScroll } from "../lib/motion";
import React from "react";
import { Link } from "react-router-dom";

const S = 2e3;

const j = 400;

const p = ["/that-page", "/old-link", "/startup-1", "/startup-2"];

const e = 200;

function FileSheet({ x, label, t }) {
  return (
    <g className="file" transform={`translate(${x} ${e - 22})`}>
      <path className="sheet" d="M6 -8 h30 v6 h-30 z" />
      <path
        className={`folder f${t % 4}`}
        d="M0 -4 h16 l4 -4 h24 q3 0 3 3 v10 q0 3 -3 3 h-44 q-3 0 -3 -3 v-6 q0 -3 3 -3 z"
      />
      <text className="silk file-silk" x="22" y="4" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

function NotFound() {
  const [i, r] = useTheme();
  const t = COPY.notFound || {};
  useSmoothScroll();
  const [h, d] = React.useState(0);
  const n = React.useRef(0);
  const N = () => {
    d((a) => a + 1);
    window.clearTimeout(n.current);
    n.current = window.setTimeout(() => d(0), S);
  };
  React.useEffect(() => () => window.clearTimeout(n.current), []);
  return (
    <div className={`site-root sv-fill ${i ? "is-dark" : ""}`}>
      <SiteNav dark={i} onToggleDark={r} />
      <header className="sv-hero sv-cn-hero" id="top">
        <div className="sv-wrap sv-cn-content sv-404-center">
          <Reveal as="div" className="sv-page-meta">
            Not on file
          </Reveal>
          <Lines as="h1" lines={dimLines(t.heroTitle)} />
          <Reveal as="p" className="sv-cn-sub">
            {t.heroSub}
          </Reveal>
          <Reveal className="sv-404-cta">
            <Link className="sv-btn sv-btn--accent" to="/">
              {t.ctaLabel}
              <Arrow />
            </Link>
          </Reveal>
          <Reveal className={`sv-404 ${h ? "is-met" : ""}`}>
            <div
              className="sv-404-view"
              onClick={N}
              role="img"
              aria-label="A robot in the site's file room, checking folders from a conveyor against a cabinet of pages. Click and it stops to say the page is not in here."
            >
              <svg viewBox="0 0 900 250" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
                <path className="rail" d={`M0 ${e} H900`} />
                <path className="sig" d={`M20 ${e + 22} h130 l18 -18 M60 ${e + 34} h250`} />
                <path className="sig" d={`M560 ${e + 30} h180 l16 -16 M760 ${e + 40} h120`} />
                {[110, 320, 700, 850].map((a) => (
                  <circle key={a} className="via" cx={a} cy={e + 22} r="3.2" />
                ))}
                <g className="belt-run" clipPath="url(#sv-404-belt)">
                  <defs>
                    <clipPath id="sv-404-belt">
                      <rect x="30" y={e - 60} width="420" height="60" />
                    </clipPath>
                  </defs>
                  <g className="flow">
                    {[0, 1].map((a) => (
                      <g key={a} transform={`translate(${a * j} 0)`}>
                        {p.map((x, m) => (
                          <FileSheet key={x} x={40 + m * (j / p.length)} label={x} t={m} />
                        ))}
                      </g>
                    ))}
                  </g>
                </g>
                <rect className="belt" x="30" y={e - 20} width="420" height="7" rx="3.5" />
                {[52, 130, 208, 286, 364, 434].map((a) => (
                  <circle key={a} className="roller" cx={a} cy={e - 8} r="6.4" />
                ))}
                <text className="silk" x="240" y={e + 16} textAnchor="middle">
                  J7 · INTAKE
                </text>
                <g transform={`translate(497 ${e}) scale(-1 1)`}>
                  <RobotSide x={0} y={0} />
                </g>
                <g className="chip">
                  {[590, 630, 670, 710, 750, 790].map((a) => (
                    <path key={a} className="pin" d={`M${a} ${e - 6} v6`} />
                  ))}
                  <rect className="case" x="565" y={e - 128} width="250" height="122" rx="9" />
                  <circle className="dot" cx="583" cy={e - 110} r="3.4" />
                  <circle className="led" cx="797" cy={e - 110} r="3" />
                  <rect className="drawer" x="585" y={e - 104} width="210" height="24" rx="3" />
                  <rect
                    className="drawer is-out"
                    x="527"
                    y={e - 74}
                    width="210"
                    height="24"
                    rx="3"
                  />
                  <rect className="drawer" x="585" y={e - 44} width="210" height="24" rx="3" />
                  <path className="pull" d={`M683 ${e - 94} h14 M683 ${e - 34} h14`} />
                  <path className="pull is-hot" d={`M625 ${e - 64} h14`} />
                  <g className="leaf">
                    <rect className="page" x="547" y={e - 88} width="20" height="26" rx="1.5" />
                    <path
                      className="page-ln"
                      d={`M551 ${e - 81} h12 M551 ${e - 76} h12 M551 ${e - 71} h8`}
                    />
                  </g>
                  <text className="silk" x="690" y={e + 16} textAnchor="middle">
                    U404 · PAGE STORE
                  </text>
                </g>
                <g className="lost">
                  <path className="page tossed" d={`M846 ${e - 42} l16 -6 4 10 -16 6 z`} />
                  <path className="page tossed" d={`M856 ${e - 34} l14 2 -2 12 -14 -2 z`} />
                  <path className="bin" d={`M840 ${e - 34} h38 l-5 34 h-28 z`} />
                  <path className="bin-lip" d={`M836 ${e - 34} h46`} />
                  <text className="silk" x="859" y={e + 16} textAnchor="middle">
                    LOST+FOUND
                  </text>
                </g>
              </svg>
              {h > 0 && (
                <span key={h} className="sv-404-hi" aria-hidden="true">
                  {t.bubble}
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </header>
      <Footer />
    </div>
  );
}

export default NotFound;
