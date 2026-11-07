import { Footer } from "../components/Footer";
import { SiteNav } from "../components/SiteNav";
import { Reveal, Arrow, Lines } from "../components/ui";
import { STORIES } from "../content/stories";
import { PROJECTS, PROJECT_ORDER } from "../content/projects";
import { WORK_FEED } from "../content/work";
import { useTheme, useSmoothScroll } from "../lib/motion";
import { Story } from "./work/Story";
import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";

const _ = (l) => (l <= 0.0031308 ? l * 12.92 : 1.055 * l ** (1 / 2.4) - 0.055);

const B = (l) => (l <= 0.04045 ? l / 12.92 : ((l + 0.055) / 1.055) ** 2.4);

const g = 0.74;

function I(l) {
  const o = /^#([0-9a-f]{6})$/i.exec(l.trim());
  if (!o) return l;
  const [e, a, d] = [0, 2, 4].map((i) => B(parseInt(o[1].slice(i, i + 2), 16) / 255));
  const m = Math.cbrt(0.4122214708 * e + 0.5363325363 * a + 0.0514459929 * d);
  const n = Math.cbrt(0.2119034982 * e + 0.6806995451 * a + 0.1073969566 * d);
  const t = Math.cbrt(0.0883024619 * e + 0.2817188376 * a + 0.6299787005 * d);
  if (0.2104542553 * m + 0.793617785 * n - 0.0040720468 * t >= g) return l;
  const j = 1.9779984951 * m - 2.428592205 * n + 0.4505937099 * t;
  const v = 0.0259040371 * m + 0.7827717662 * n - 0.808675766 * t;
  const p = (g + 0.3963377774 * j + 0.2158037573 * v) ** 3;
  const u = (g - 0.1055613458 * j - 0.0638541728 * v) ** 3;
  const N = (g - 0.0894841775 * j - 1.291485548 * v) ** 3;
  return `#${[
    4.0767416621 * p - 3.3077115913 * u + 0.2309699292 * N,
    -1.2684380046 * p + 2.6097574011 * u - 0.3413193965 * N,
    -0.0041960863 * p - 0.7034186147 * u + 1.707614701 * N,
  ]
    .map((i) => Math.max(0, Math.min(255, Math.round(_(i) * 255))))
    .map((i) => i.toString(16).padStart(2, "0"))
    .join("")}`;
}

function CaseStudy() {
  var v;
  const [l, o] = useTheme();
  useSmoothScroll();
  const { slug = "" } = useParams();
  const a = PROJECTS[slug];
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  if (slug === "films") return <Navigate to="/experience/genios" replace />;
  if (!a) return <Navigate to="/experience" replace />;
  const story = STORIES[slug];
  const d = WORK_FEED.find((c) => c.id === slug) ?? {};
  const n = PROJECT_ORDER;
  const t = n[(n.indexOf(slug) + 1) % n.length];
  const x = PROJECTS[t];
  const j = (v = WORK_FEED.find((c) => c.id === t)) == null ? undefined : v.image;
  return (
    <div
      className={`site-root sv-case ${l ? "is-dark" : ""}`}
      style={{
        "--sv-case": a.accent ? (l ? I(a.accent) : a.accent) : "var(--sv-accent-2)",
      }}
    >
      <SiteNav dark={l} onToggleDark={o} />
      <header className="sv-hero sv-case-hero">
        <div className="sv-wrap">
          <Reveal as={Link} className="sv-case-back" to="/experience">
            ← All experience
          </Reveal>
          <Lines as="h1" lines={[a.name]} />
          <Reveal as="p" className="sv-case-tagline">
            {a.tagline}
          </Reveal>
          <Reveal className="sv-case-bar">
            {(a.meta ?? []).map(([c, i]) => (
              <div key={c}>
                <div className="k">{c}</div>
                <div className="v">
                  {c === "Live" && a.live ? (
                    <a href={a.live} target="_blank" rel="noopener noreferrer">
                      {i}
                      <Arrow />
                    </a>
                  ) : (
                    i
                  )}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </header>
      <div className="sv-wrap sv-pad sv-case-body">
        <div className="sv-case-sheet">
          {d.image && (
            <Reveal className="sv-case-shot sv-ink-surface sv-case-lead">
              <img
                src={d.image}
                alt={`${a.name} · ${a.tagline ?? "case study"}`}
                decoding="async"
              />
            </Reveal>
          )}
          <Story story={story} results={a.results} />
          {x && (
            <Reveal className="sv-next">
              <Link className="card" to={`/experience/${t}`}>
                <span className="copy">
                  <span className="lbl">Next case study</span>
                  <span className="name">
                    {x.name} <Arrow dir="e" />
                  </span>
                  {x.tagline && <span className="sv-next-tag">{x.tagline}</span>}
                  <span className="sv-btn sv-btn--ghost sv-next-go">
                    Explore project
                    <Arrow dir="e" />
                  </span>
                </span>
                {j && (
                  <span className="media">
                    <img src={j} alt={`${x.name} · preview`} loading="lazy" decoding="async" />
                  </span>
                )}
              </Link>
            </Reveal>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CaseStudy;
