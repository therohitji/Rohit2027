import { Arrow } from "../../components/ui";
import { scrollToY } from "../../lib/fx";
import { assetUrl } from "../../lib/asset";
import React from "react";
import { Link } from "react-router-dom";

function StoryLink({ label, href }) {
  if (href.startsWith("/"))
    return (
      <Link className="sv-btn sv-btn--ghost rs-sy-link" to={href}>
        {label}
        <Arrow dir="e" />
      </Link>
    );
  return (
    <a className="sv-btn sv-btn--ghost rs-sy-link" href={href} target="_blank" rel="noopener noreferrer">
      {label}
      <Arrow />
    </a>
  );
}

function Stats({ items }) {
  return (
    <div className={`rs-sy-stats n-${items.length}`}>
      {items.map((s) => (
        <div key={s.l} className={s.hot ? "is-hot" : ""}>
          <b>{s.v}</b>
          <span>{s.l}</span>
          {s.src && <small>{s.src}</small>}
        </div>
      ))}
    </div>
  );
}

function Block({ b }) {
  switch (b.k) {
    case "p":
      return <p>{b.text}</p>;
    case "bullets":
      return (
        <ul className="rs-sy-bullets">
          {b.items.map(([lead, text]) => (
            <li key={lead}>
              <b>{lead}</b> {text}
            </li>
          ))}
        </ul>
      );
    case "stats":
      return <Stats items={b.items} />;
    case "pull":
      return (
        <blockquote className="rs-sy-pull">
          <p>{b.text}</p>
          {b.who && <cite>{b.who}</cite>}
        </blockquote>
      );
    case "fig":
      return (
        <figure className="rs-sy-fig">
          <img src={assetUrl(b.src)} alt={b.cap || ""} loading="lazy" decoding="async" />
          {b.cap && <figcaption>{b.cap}</figcaption>}
        </figure>
      );
    case "duo":
      return (
        <div className="rs-sy-duo">
          {b.items.map((i) => (
            <figure className="rs-sy-fig" key={i.src}>
              <img src={assetUrl(i.src)} alt={i.cap} loading="lazy" decoding="async" />
              <figcaption>{i.cap}</figcaption>
            </figure>
          ))}
        </div>
      );
    case "link":
      return <StoryLink label={b.label} href={b.href} />;
    case "note":
      return (
        <aside className="rs-sy-note">
          <span>Worked example</span>
          <p>{b.text}</p>
        </aside>
      );
    case "table":
      return (
        <div className="rs-sy-table">
          <table>
            <thead>
              <tr>
                {b.head.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={r[0]} className={i === b.hot ? "is-hot" : ""}>
                  {r.map((c, j) => (j === 0 ? <th key={j}>{c}</th> : <td key={j} data-l={b.head[j]}>{c}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "steps":
      return (
        <ol className="rs-sy-steps">
          {b.items.map(([t, d], i) => (
            <li key={t}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <b>{t}</b>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      );
    case "timeline":
      return (
        <ol className="rs-sy-time">
          {b.items.map(([when, t, d]) => (
            <li key={t}>
              <span>{when}</span>
              <div>
                <b>{t}</b>
                <p>{d}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "layers":
      return (
        <ol className="rs-sy-layers">
          {b.items.map(([t, d], i) => (
            <li key={t}>
              <small>L{i + 1}</small>
              <b>{t}</b>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      );
    case "quotes":
      return (
        <div className="rs-sy-quotes">
          {b.items.map((q) => (
            <figure key={q.who}>
              <blockquote>{q.q}</blockquote>
              <figcaption>
                <b>{q.who}</b>
                <small>{q.role}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      );
    case "loops":
      return (
        <div className="rs-sy-loops">
          {[b.a, b.b].map((l) => (
            <div key={l.t} className={l.lossy ? "is-lossy" : "is-closed"}>
              <span>{l.t}</span>
              <ol>
                {l.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

// A long read in the shape of the GeniOS manifesto: numbers first, then chapters with a contents list that follows you.
export function Story({ story, results }) {
  const sections = [];
  for (const b of story.blocks) {
    if (b.k === "h") sections.push({ ...b, body: [] });
    else if (sections.length) sections[sections.length - 1].body.push(b);
  }
  if (results?.length) sections.push({ t: "What shipped", body: [{ k: "bullets", items: results.map((r, i) => [`${String(i + 1).padStart(2, "0")}.`, r]) }] });
  const [on, setOn] = React.useState(0);
  const [read, setRead] = React.useState(0);
  const root = React.useRef(null);
  React.useEffect(() => {
    const onScroll = () => {
      const el = root.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setRead(Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - window.innerHeight))));
      const heads = [...el.querySelectorAll("[data-sec]")];
      let cur = 0;
      heads.forEach((s, i) => {
        if (s.getBoundingClientRect().top < window.innerHeight * 0.35) cur = i;
      });
      setOn(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const jump = (i) => {
    const s = root.current.querySelectorAll("[data-sec]")[i];
    scrollToY(s.getBoundingClientRect().top + window.scrollY - 100);
  };
  return (
    <div className="rs-sy" ref={root}>
      <i className="rs-sy-progress" style={{ transform: `scaleX(${read})` }} aria-hidden="true" />
      <p className="rs-sy-lead">{story.lead}</p>
      <Stats items={story.stats} />
      <div className="rs-sy-body">
        <nav className="rs-sy-toc" aria-label="On this page">
          <span>On this page</span>
          <ol>
            {sections.map((s, i) => (
              <li key={s.t}>
                <button type="button" className={i === on ? "is-on" : ""} onClick={() => jump(i)}>
                  <small>{String(i + 1).padStart(2, "0")}</small> {s.t}
                </button>
              </li>
            ))}
          </ol>
          <em>{story.read}</em>
        </nav>
        <div className="rs-sy-main">
          <aside className="rs-sy-take">
            <span>Key takeaways</span>
            <ul>
              {story.take.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </aside>
          {sections.map((s, i) => (
            <section key={s.t} data-sec="" className="rs-sy-sec">
              <header>
                <small>{String(i + 1).padStart(2, "0")}</small>
                <h2>{s.t}</h2>
                {s.kick && <p className="rs-sy-kick">{s.kick}</p>}
              </header>
              {s.body.map((b, j) => (
                <Block key={j} b={b} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
