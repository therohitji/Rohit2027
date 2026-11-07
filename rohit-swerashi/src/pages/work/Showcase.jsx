import { Arrow } from "../../components/ui";
import { COPY } from "../../content/copy";
import {
  PROJECT_ORDER,
  HIDDEN_PROJECTS,
  PROJECTS,
  PROJECT_SHOTS,
  PROJECT_KINDS,
} from "../../content/projects";
import { WORK_FEED } from "../../content/work";
import { assetUrl } from "../../lib/asset";
import { useMediaQuery, isInView } from "../../lib/motion";
import React from "react";
import { Link } from "react-router-dom";

export const M = () => ({
  finalLabel: "Final work",
  caseLabel: "Case study",
  caseCta: "Read the full case study",
  liveCta: "Visit the live site",
  processLabel: "From the process",
  ...(COPY.showcase ?? {}),
});

const A = (s) => (s.ar ?? 1.5) < 0.6;

function useStoredModes(s) {
  const l = [];
  for (const a of s?.blocks ?? []) {
    const i = a.k === "figure" ? [a] : a.k === "duo" ? a.items : [];
    for (const n of i)
      n != null &&
        n.src &&
        !/\/ph-\d+\.svg$/.test(n.src) &&
        l.push({
          src: n.src,
          cap: n.cap ?? s.name,
        });
  }
  return l;
}

export function he() {
  const s = new Map(WORK_FEED.map((l) => [l.id, l]));
  return PROJECT_ORDER.filter((l) => !HIDDEN_PROJECTS.includes(l))
    .map((l) => {
      var g;
      var m;
      const a = PROJECTS[l] ?? {};
      const i = s.get(l) ?? {};
      const n = PROJECT_SHOTS[l];
      let r = (g = n?.final) != null && g.length ? n.final : useStoredModes(a);
      !r.length &&
        i.image &&
        (r = [
          {
            src: i.image,
            cap: a.name ?? i.name ?? l,
          },
        ]);
      const f =
        a.metrics ??
        ((m = (a.blocks ?? []).find((o) => o.k === "metrics")) == null ? undefined : m.items) ??
        [];
      return {
        id: l,
        name: a.name ?? i.name ?? l,
        kind: i.kind || PROJECT_KINDS[l] || a.type || "",
        year: a.year ?? i.date ?? "",
        tagline: a.tagline ?? i.lead ?? "",
        href: `/experience/${l}`,
        live: a.live,
        liveLabel: a.liveLabel,
        accent: a.accent,
        badge: n?.badge,
        final: r.map((o) => ({
          ...o,
          src: assetUrl(o.src),
        })),
        process: (n?.process ?? []).map((o) => ({
          ...o,
          src: assetUrl(o.src),
        })),
        meta: (a.meta ?? []).filter(([o]) => o === "Role" || o === "Tools" || o === "Backing"),
        metrics: f,
      };
    })
    .filter((l) => l.final.length);
}

const W = (s) =>
  s.accent
    ? {
        "--sv-case": s.accent,
      }
    : {};

function ModeSwitch({ mode, onChange, count, label }) {
  const n = M();
  return (
    <div
      className={`sv-sc-switch ${mode === "case" ? "is-case" : ""}`}
      role="group"
      aria-label={label}
    >
      <i className="thumb" aria-hidden="true" />
      <button type="button" aria-pressed={mode === "final"} onClick={() => onChange("final")}>
        {n.finalLabel}
        {count != null && <span className="n">{count}</span>}
      </button>
      <button type="button" aria-pressed={mode === "case"} onClick={() => onChange("case")}>
        {n.caseLabel}
      </button>
    </div>
  );
}

function ShowcaseCase({ p, onOpenProcess }) {
  const a = M();
  return (
    <div className="sv-sc-case">
      <div className="top">
        <div className="lead">
          <span className="sv-sc-eye">
            {a.caseLabel}
            {" · "}
            {p.year}
          </span>
          <p className="sv-sc-tag">{p.tagline}</p>
        </div>
        {p.meta.length > 0 && (
          <dl className="sv-sc-meta">
            {p.meta.map(([i, n]) => (
              <div key={i}>
                <dt>{i}</dt>
                <dd>{n}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      {p.metrics.length > 0 && (
        <ul className="sv-sc-metrics">
          {p.metrics.slice(0, 3).map(([i, n]) => (
            <li key={n}>
              <b>{i}</b>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="foot">
        <div className="sv-sc-links">
          <Link className="sv-btn sv-btn--accent" to={p.href}>
            {a.caseCta}
            <Arrow />
          </Link>
          {p.live && (
            <a
              className="sv-btn sv-btn--ghost"
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.liveLabel ?? a.liveCta}
              <Arrow />
            </a>
          )}
        </div>
        {p.process.length > 0 && (
          <div className="sv-sc-process">
            <span className="sv-sc-eye">{a.processLabel}</span>
            <div className="plates">
              {p.process.slice(0, 2).map((i, n) => (
                <button
                  key={i.src}
                  type="button"
                  onClick={() => (onOpenProcess == null ? undefined : onOpenProcess(n))}
                  aria-label={`Open ${i.cap}`}
                >
                  <img src={i.src} alt={i.cap} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ShowcaseViewer({ p, shots, index, onIndex, onClose }) {
  const r = shots.length;
  const f = React.useCallback((d) => onIndex((index + d + r) % r), [index, r, onIndex]);
  const g = React.useRef(null);
  const m = React.useRef(null);
  React.useEffect(() => {
    const d = (x) => {
      x.key === "Escape"
        ? onClose()
        : x.key === "ArrowRight"
          ? f(1)
          : x.key === "ArrowLeft" && f(-1);
    };
    window.addEventListener("keydown", d);
    return () => window.removeEventListener("keydown", d);
  }, [onClose, f]);
  React.useEffect(() => {
    const d = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("sv-lb-open");
    return () => {
      document.body.style.overflow = d;
      document.body.classList.remove("sv-lb-open");
    };
  }, []);
  React.useEffect(() => {
    const d = g.current;
    const x = d == null ? undefined : d.children[index];
    !d ||
      !x ||
      d.scrollTo({
        left: x.offsetLeft - d.clientWidth / 2 + x.offsetWidth / 2,
        behavior: "smooth",
      });
  }, [index]);
  const o = shots[index];
  if (!o) return null;
  const w = A(o);
  return (
    <div
      className="sv-sc-viewer"
      role="dialog"
      aria-modal="true"
      aria-label={`${p.name} · ${o.cap}`}
      onPointerDown={(d) => {
        m.current = {
          x: d.clientX,
          y: d.clientY,
        };
      }}
      onPointerUp={(d) => {
        const x = m.current;
        m.current = null;
        if (!x || d.pointerType !== "touch") return;
        const y = d.clientX - x.x;
        Math.abs(y) > 50 && Math.abs(y) > Math.abs(d.clientY - x.y) && f(y < 0 ? 1 : -1);
      }}
    >
      <div className="bar">
        <span className="who">
          <b>{p.name}</b>
          <span>{p.kind}</span>
        </span>
        <span className="cap">{o.cap}</span>
        <span className="count">
          {String(index + 1).padStart(2, "0")}
          {" / "}
          {String(r).padStart(2, "0")}
        </span>
        <Link className="case" to={p.href}>
          {M().caseLabel}
          <Arrow />
        </Link>
        <button type="button" className="x" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
      <div
        className="view"
        onClick={(d) => {
          d.target === d.currentTarget && onClose();
        }}
      >
        {w ? (
          <div key={o.src} className="scroll" data-own-wheel="">
            <img src={o.src} alt={o.cap} />
          </div>
        ) : (
          <img key={o.src} className="one" src={o.src} alt={o.cap} />
        )}
        {r > 1 && (
          <>
            <button
              type="button"
              className="go prev"
              onClick={() => f(-1)}
              aria-label="Previous screen"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button type="button" className="go next" onClick={() => f(1)} aria-label="Next screen">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
      {r > 1 && (
        <div className="thumbs" ref={g}>
          {shots.map((d, x) => (
            <button
              key={d.src}
              type="button"
              className={x === index ? "is-on" : ""}
              onClick={() => onIndex(x)}
              aria-label={`Screen ${x + 1}: ${d.cap}`}
              aria-current={x === index ? "true" : undefined}
            >
              <img src={d.src} alt={d.cap} loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ShowcaseProbe() {
  const [s, l] = React.useState(null);
  const a = React.useCallback(
    (n, r, f) =>
      l({
        p: n,
        shots: r,
        i: f,
      }),
    [],
  );
  const i = s && (
    <ShowcaseViewer
      p={s.p}
      shots={s.shots}
      index={s.i}
      onIndex={(n) =>
        l(
          (r) =>
            r && {
              ...r,
              i: n,
            },
        )
      }
      onClose={() => l(null)}
    />
  );
  return {
    show: a,
    node: i,
  };
}

const $ = 3;

export function ShowcaseIndex({ projects, modeOf, setMode }) {
  var N;
  const i = ShowcaseProbe();
  const n = useMediaQuery("(min-width: 961px)");
  const r = React.useRef(null);
  const f = React.useRef(null);
  const g = React.useRef(null);
  const m = React.useRef(null);
  const [o, w] = React.useState(((N = projects[0]) == null ? undefined : N.id) ?? "");
  const [d, x] = React.useState({});
  const y = M();
  const k = projects.map((t) => `${t.id}:${modeOf(t.id)}:${d[t.id] ? 1 : 0}`).join("|");
  React.useEffect(() => {
    const t = r.current;
    if (!t) return;
    const v = {
      rootMargin: "-48% 0px -48% 0px",
    };
    const h = new IntersectionObserver((p) => {
      p.forEach((c) => {
        c.isIntersecting && w(c.target.dataset.p);
      });
    }, v);
    t.querySelectorAll(".sv-sc-ix-group").forEach((p) => h.observe(p));
    return () => h.disconnect();
  }, [k]);
  React.useEffect(() => {
    const t = r.current;
    const v = m.current;
    if (!t || !v) return;
    let h = 0;
    const p = () => {
      h = 0;
      const b = v.getBoundingClientRect();
      const j = (window.innerHeight * 0.5 - b.top) / Math.max(1, b.height);
      v.style.setProperty("--p", String(Math.min(1, Math.max(0, j))));
    };
    const c = () => {
      h || (h = requestAnimationFrame(p));
    };
    p();
    window.addEventListener("scroll", c, {
      passive: true,
    });
    window.addEventListener("resize", c);
    return () => {
      window.removeEventListener("scroll", c);
      window.removeEventListener("resize", c);
      cancelAnimationFrame(h);
    };
  }, [n]);
  const S = (t, v) => {
    setMode(t, v);
    requestAnimationFrame(() => {
      const h = document.getElementById(`sc-${t}`);
      if (!h) return;
      const p = parseFloat(getComputedStyle(h).getPropertyValue("--sv-nav-h")) || 62;
      const c = h.getBoundingClientRect().top;
      c < p && window.scrollTo(0, c + window.scrollY - p - 24);
    });
  };
  React.useEffect(() => {
    const t = f.current;
    if (!t) return;
    const v = () => {
      t.toggleAttribute("data-above", t.scrollTop > 2);
      t.toggleAttribute("data-below", t.scrollTop < t.scrollHeight - t.clientHeight - 2);
    };
    v();
    t.addEventListener("scroll", v, {
      passive: true,
    });
    const h = new ResizeObserver(v);
    h.observe(t);
    t.querySelectorAll("li").forEach((p) => h.observe(p));
    return () => {
      t.removeEventListener("scroll", v);
      h.disconnect();
    };
  }, [n, projects.length]);
  React.useEffect(() => {
    const t = r.current;
    if (!t) return;
    const v = Array.from(t.querySelectorAll(".sv-sc-ix-row:not(.is-in)"));
    const h = (j) => j.classList.add("is-in");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.forEach(h);
      return;
    }
    const p = new IntersectionObserver(
      (j) =>
        j.forEach((L) => {
          L.isIntersecting && (h(L.target), p.unobserve(L.target));
        }),
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      },
    );
    v.forEach((j) => p.observe(j));
    const c = () => {
      document.hidden ||
        v.forEach((j) => {
          isInView(j) && h(j);
        });
    };
    const b = window.setTimeout(c, 260);
    document.addEventListener("visibilitychange", c);
    return () => {
      p.disconnect();
      clearTimeout(b);
      document.removeEventListener("visibilitychange", c);
    };
  }, [k]);
  React.useEffect(() => {
    const t = f.current;
    const v = t == null ? undefined : t.querySelector(`li[data-p="${o}"]`);
    t &&
      v &&
      t.scrollHeight > t.clientHeight &&
      t.scrollTo({
        top: Math.max(0, v.offsetTop - 64),
        behavior: "smooth",
      });
    const h = g.current;
    const p = h == null ? undefined : h.querySelector(`[data-p="${o}"]`);
    h &&
      p &&
      h.scrollTo({
        left: p.offsetLeft - h.clientWidth / 2 + p.offsetWidth / 2,
        behavior: "smooth",
      });
  }, [o, n]);
  const E = (t) => {
    const v = document.getElementById(`sc-${t}`);
    const h = g.current;
    if (!v || !h) return;
    const p = (parseFloat(getComputedStyle(h).top) || 0) + h.offsetHeight + 14;
    const c = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: v.getBoundingClientRect().top + window.scrollY - p,
      behavior: c ? "auto" : "smooth",
    });
  };
  return (
    <section className="sv-wrap sv-pad sv-sc-index">
      <div className="sv-sc-ix">
        {n ? (
          <aside className="sv-sc-ix-rail" ref={f} data-own-wheel="">
            <ol>
              {projects.map((t) => {
                const v = t.id === o;
                const h = modeOf(t.id);
                return (
                  <li key={t.id} data-p={t.id} className={v ? "is-on" : ""} style={W(t)}>
                    <a href={`#sc-${t.id}`}>
                      {t.name}
                      {t.badge && <Badge text={t.badge} />}
                    </a>
                    <div
                      className="more"
                      aria-hidden={!v}
                      {...(v
                        ? {}
                        : {
                            inert: "",
                          })}
                    >
                      <div>
                        <span className="kd">
                          {t.kind}
                          <i />
                          {t.year}
                        </span>
                        <p className="tg">{t.tagline}</p>
                        <ModeSwitch
                          mode={h}
                          onChange={(p) => S(t.id, p)}
                          count={t.final.length}
                          label={`Show ${t.name} as`}
                        />
                        <Link className="case" to={t.href}>
                          {y.caseCta}
                          <Arrow />
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </aside>
        ) : (
          <nav className="sv-sc-ix-bar" ref={g} aria-label="Projects">
            {projects.map((t) => (
              <button
                key={t.id}
                type="button"
                data-p={t.id}
                style={W(t)}
                className={t.id === o ? "is-on" : ""}
                aria-current={t.id === o ? "true" : undefined}
                onClick={() => E(t.id)}
              >
                {t.name}
              </button>
            ))}
          </nav>
        )}
        <div className="sv-sc-ix-flow" ref={r}>
          {n && <i className="sv-sc-ix-rule" ref={m} aria-hidden="true" />}
          {projects.map((t) => (
            <ShowcaseGroup
              key={t.id}
              p={t}
              mode={modeOf(t.id)}
              setMode={(v) => S(t.id, v)}
              showAll={!!d[t.id]}
              onShowAll={() =>
                x((v) => ({
                  ...v,
                  [t.id]: true,
                }))
              }
              open={i.show}
              withHead={!n}
            />
          ))}
        </div>
      </div>
      {i.node}
    </section>
  );
}

const Badge = ({ text }) => <span className="sv-sc-badge">{text}</span>;

const P = (s) => s.currentTarget.classList.add("is-loaded");

function ShowcaseGroup({ p, mode, setMode, showAll, onShowAll, open, withHead }) {
  const g = showAll ? p.final : p.final.slice(0, $);
  return (
    <div className={`sv-sc-ix-group is-${mode}`} id={`sc-${p.id}`} data-p={p.id} style={W(p)}>
      <div className="sv-sc-ix-head">
        <div className="id">
          <h2>
            {p.name}
            {withHead && p.badge && <Badge text={p.badge} />}
          </h2>
        </div>
        {withHead && (
          <ModeSwitch
            mode={mode}
            onChange={setMode}
            count={p.final.length}
            label={`Show ${p.name} as`}
          />
        )}
      </div>
      {mode === "final" ? (
        <>
          <div className="sv-sc-ix-rows">
            {g.map((m, o) => (
              <div key={m.src} className="sv-sc-ix-row">
                <button
                  type="button"
                  data-p={p.id}
                  data-i={o}
                  className={`sv-sc-ix-fig ${A(m) ? "is-tall" : ""}`}
                  style={{
                    "--ar": m.ar ?? 1.5,
                  }}
                  onClick={() => open(p, p.final, o)}
                  aria-label={`Open ${m.cap}`}
                >
                  {A(m) ? (
                    <span className="pan">
                      <img src={m.src} alt={m.cap} loading="lazy" decoding="async" onLoad={P} />
                    </span>
                  ) : (
                    <img src={m.src} alt={m.cap} loading="lazy" decoding="async" onLoad={P} />
                  )}
                  {withHead && <span className="cap">{m.cap}</span>}
                </button>
              </div>
            ))}
          </div>
          {!showAll && p.final.length > $ && (
            <button type="button" className="sv-sc-ix-more" onClick={onShowAll}>
              {"Show the other "}
              {p.final.length - $}
              {" screens"}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          )}
        </>
      ) : (
        <ShowcaseCase p={p} onOpenProcess={(m) => open(p, p.process, m)} />
      )}
    </div>
  );
}
