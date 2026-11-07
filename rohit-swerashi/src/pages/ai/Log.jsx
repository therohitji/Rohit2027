import { Arrow, SectionHead, Reveal } from "../../components/ui";
import { assetUrl } from "../../lib/asset";
import { useMediaQuery } from "../../lib/motion";
import { p } from "./Rig";
import React from "react";
import { Link } from "react-router-dom";

function ReportFigure({ entry, eager }) {
  const r = React.useRef(null);
  React.useEffect(() => {
    const t = r.current;
    t && (eager ? t.play().catch(() => {}) : t.pause());
  }, [eager]);
  return entry.video ? (
    <video
      ref={r}
      src={assetUrl(entry.video)}
      muted
      loop
      playsInline
      autoPlay={eager}
      preload="metadata"
      draggable={false}
    />
  ) : entry.image ? (
    <img
      src={assetUrl(entry.image)}
      alt={`${entry.name} · preview`}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  ) : null;
}

function ReportBlock({ block }) {
  return Array.isArray(block) ? (
    <ul>
      {block.map((n, r) => (
        <li key={r}>{n}</li>
      ))}
    </ul>
  ) : typeof block == "string" ? (
    <p>{block}</p>
  ) : "sec" in block ? (
    <h4 className="sec">
      <span>{block.sec}</span>
    </h4>
  ) : "h" in block ? (
    <h4>{block.h}</h4>
  ) : (
    <figure>
      <img src={assetUrl(block.img)} alt={block.cap ?? ""} loading="lazy" decoding="async" />
      {block.cap && <figcaption>{block.cap}</figcaption>}
    </figure>
  );
}

function ReportSheet({ entry, index, onClose }) {
  var t;
  React.useEffect(() => {
    const l = (x) => {
      x.key === "Escape" && onClose();
    };
    window.addEventListener("keydown", l);
    const d = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", l);
      document.body.style.overflow = d;
    };
  }, [onClose]);
  return (
    <div
      className="sv-report-sheet"
      role="dialog"
      aria-modal="true"
      aria-label={entry.name}
      onClick={onClose}
    >
      <article className="sheet" onClick={(l) => l.stopPropagation()}>
        <header>
          <span className="meta">
            {"Report "}
            {String(index + 1).padStart(2, "0")}
            {" · "}
            {entry.badge}
            {" · "}
            {entry.date}
          </span>
          <h3>{entry.name}</h3>
          {entry.link && (
            <a
              className="sv-btn sv-btn--line visit"
              href={entry.link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {entry.link.label}
              <Arrow />
            </a>
          )}
          <button type="button" className="close" onClick={onClose} aria-label="Close report">
            ✕
          </button>
        </header>
        <div className="scroll">
          {(entry.image || entry.video) && (
            <div className="plate">
              <ReportFigure entry={entry} eager />
            </div>
          )}
          <div className="body">
            {(entry.full ?? [entry.lead]).map((l, d) => (
              <ReportBlock key={d} block={l} />
            ))}
          </div>
          {(t = entry.tags) != null && t.length ? (
            <div className="tags">
              {entry.tags.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          ) : null}
          {(entry.reacts || entry.comments) && (
            <div className="stats">
              {[entry.reacts, entry.comments].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export function BuildLog({ entries, title, sub }) {
  const t = !useMediaQuery("(min-width: 961px)");
  const [l, d] = React.useState(0);
  const [x, $] = React.useState(null);
  const v = (o) => {
    if (t && o !== l) {
      d(o);
      return;
    }
    $(o);
  };
  return (
    <section className="sv-wrap sv-pad" id="ai-work" data-badge="Working with AI">
      <SectionHead lines={title} sub={sub} />
      <Reveal className={`sv-log ${t ? "is-flat" : ""}`}>
        <div className="sv-log-index">
          {entries.map((o, i) => (
            <button
              key={o.name}
              type="button"
              className={`sv-log-row ${i === l ? "is-act" : ""}`}
              aria-current={i === l}
              onMouseEnter={() => {
                t || d(i);
              }}
              onFocus={() => {
                t || d(i);
              }}
              onClick={() => v(i)}
            >
              <span className="no">{String(i + 1).padStart(2, "0")}</span>
              <span className="id">
                <span className="name">{o.name}</span>
              </span>
              <span className="fold">
                <span className="fold-in">
                  <span className="lead">{o.lead}</span>
                  {t && i === l && (o.image || o.video) ? (
                    <span className="rowvis" aria-hidden="true">
                      <ReportFigure entry={o} eager />
                    </span>
                  ) : null}
                  <span className="more">
                    {"Read the report "}
                    <Arrow dir="e" />
                  </span>
                </span>
              </span>
            </button>
          ))}
          <Link className="sv-btn sv-btn--line sv-log-cta" to="/contact">
            Let's build with AI
            <Arrow />
          </Link>
        </div>
        <div className="sv-log-stage" onClick={() => $(l)}>
          {entries.map((o, i) => (
            <figure key={o.name} className={`sv-log-media ${i === l ? "is-on" : ""}`}>
              <ReportFigure entry={o} eager={i === l} />
            </figure>
          ))}
        </div>
      </Reveal>
      {x != null && entries[x] && (
        <ReportSheet entry={entries[x]} index={x} onClose={() => $(null)} />
      )}
    </section>
  );
}
