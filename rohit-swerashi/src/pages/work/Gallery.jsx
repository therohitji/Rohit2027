import { SectionHead, Reveal } from "../../components/ui";
import { assetUrl } from "../../lib/asset";
import { re, Lightbox } from "./Lightbox";
import React from "react";

export function Gallery({ shots, tabs, title, sub, initialTab }) {
  var p;
  const [r, f] = React.useState(initialTab ?? ((p = tabs[0]) == null ? undefined : p.key) ?? "");
  const [g, m] = React.useState(0);
  const [o, w] = React.useState(null);
  const d = React.useRef(null);
  const [x, y] = React.useState(4);
  React.useLayoutEffect(() => {
    const c = d.current;
    if (!c) return;
    const b = () => {
      const L = c.querySelector(".sv-archive");
      if (!L) return;
      const I = getComputedStyle(L).gridTemplateColumns.split(" ").filter(Boolean).length;
      I > 0 && y(I);
    };
    b();
    const j = new ResizeObserver(b);
    j.observe(c);
    return () => j.disconnect();
  }, []);
  const k = x * re;
  const S = React.useMemo(
    () =>
      shots
        .filter((c) => (c.group || "web") === r && c.url)
        .slice()
        .sort((c, b) => (c.order ?? 0) - (b.order ?? 0))
        .map((c) => ({
          ...c,
          url: assetUrl(c.url),
          full: c.full ? assetUrl(c.full) : undefined,
        })),
    [shots, r],
  );
  const E = Math.max(1, Math.ceil(S.length / k));
  const N = Math.min(g, E - 1);
  const t = React.useMemo(() => S.slice(N * k, (N + 1) * k), [S, N, k]);
  const v = React.useCallback(
    (c) => {
      w((b) => (b == null ? b : (b + c + t.length) % t.length));
    },
    [t.length],
  );
  const h = (c) => {
    var b;
    m(c);
    w(null);
    (b = document.getElementById("archive")) == null ||
      b.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };
  return (
    <section className="sv-wrap sv-pad" id="work-gallery" data-badge="Screenshots" ref={d}>
      <SectionHead lines={title} sub={sub} />
      <div className="sv-tabs" role="tablist">
        {tabs.map((c) => {
          const b = shots.filter((j) => (j.group || "web") === c.key && j.url).length;
          return (
            <button
              key={c.key}
              role="tab"
              aria-selected={c.key === r}
              className={c.key === r ? "is-on" : ""}
              onClick={() => {
                f(c.key);
                m(0);
                w(null);
              }}
            >
              {c.label}
              <span className="count">{b}</span>
            </button>
          );
        })}
      </div>
      {S.length === 0 ? (
        <p className="sv-archive-empty">Nothing here yet, new screenshots are on their way.</p>
      ) : (
        <>
          <Reveal key={`${r}-${N}`} className="sv-archive">
            {t.map((c, b) => (
              <button
                key={c.id}
                className="sv-shot"
                onClick={() => w(b)}
                aria-label={`Open ${c.title}`}
              >
                <span className="frame">
                  <img src={c.url} alt={c.title} loading="lazy" />
                </span>
              </button>
            ))}
          </Reveal>
          {E > 1 && (
            <nav className="sv-pager" aria-label="Screenshot pages">
              <button onClick={() => h(N - 1)} disabled={N === 0} aria-label="Previous page">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              {Array.from(
                {
                  length: E,
                },
                (c, b) => (
                  <button
                    key={b}
                    className={b === N ? "is-on" : ""}
                    aria-current={b === N ? "page" : undefined}
                    onClick={() => h(b)}
                  >
                    {String(b + 1).padStart(2, "0")}
                  </button>
                ),
              )}
              <button onClick={() => h(N + 1)} disabled={N === E - 1} aria-label="Next page">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          )}
        </>
      )}
      {o != null && <Lightbox shots={t} index={o} onClose={() => w(null)} onStep={v} />}
    </section>
  );
}
