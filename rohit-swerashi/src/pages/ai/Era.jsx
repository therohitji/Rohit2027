import { Arrow, Lines, Reveal, dimLines } from "../../components/ui";
import { ERA } from "../../content/era";
import { gsap, prefersReduced } from "../../lib/fx";
import React from "react";

function Stats({ items, cls = "" }) {
  return (
    <div className={`rs-era-stats n-${items.length} ${cls}`}>
      {items.map((s) => (
        <div key={s.l}>
          <b>{s.v}</b>
          <span>{s.l}</span>
          {s.src && <small>{s.src}</small>}
        </div>
      ))}
    </div>
  );
}

const LOOP = ["Read", "Reason", "Delegate", "Proof", "Learn"];

// The loop GeniOS runs, going round on its own.
function EraLoop() {
  const [on, setOn] = React.useState(0);
  React.useEffect(() => {
    if (prefersReduced()) return;
    const t = setInterval(() => setOn((x) => (x + 1) % LOOP.length), 1500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="rs-era-loop" aria-label="Read, reason, delegate, proof, learn">
      <svg viewBox="0 0 400 400" aria-hidden="true">
        <circle className="ring" cx="200" cy="200" r="150" />
        <circle className="pulse" r="5">
          {!prefersReduced() && <animateMotion dur="7.5s" repeatCount="indefinite" path="M200 50 a150 150 0 1 1 -0.01 0" />}
        </circle>
      </svg>
      <b className="hub">GeniOS</b>
      {LOOP.map((t, i) => {
        const a = (i / LOOP.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <span key={t} className={i === on ? "is-on" : ""} style={{ left: `${50 + 37.5 * Math.cos(a)}%`, top: `${50 + 37.5 * Math.sin(a)}%` }}>
            {t}
          </span>
        );
      })}
    </div>
  );
}

export function EraHero() {
  return (
    <>
      <div className="sv-hero-grid rs-era-top">
        <div>
          <Lines as="h1" lines={dimLines(ERA.title)} />
          <Reveal as="p" className="rs-era-sub">
            {ERA.sub}
          </Reveal>
        </div>
        <Reveal>
          <EraLoop />
        </Reveal>
      </div>
      <Stats items={ERA.stats} cls="is-hero" />
    </>
  );
}

function Path() {
  const root = React.useRef(null);
  React.useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".rs-era-fill",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".rs-era-path", start: "top 60%", end: "bottom 60%", scrub: true } },
      );
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section className="sv-wrap sv-pad rs-era-sec" id="path" ref={root}>
      <header className="rs-era-head">
        <Lines lines={dimLines(ERA.pathTitle)} />
        <Reveal as="p">{ERA.pathSub}</Reveal>
      </header>
      <ol className="rs-era-path">
        <i className="rs-era-fill" aria-hidden="true" />
        {ERA.path.map((p, i) => (
          <Reveal as="li" key={p.t} className={p.now ? "is-now" : ""}>
            <span className="dot" aria-hidden="true" />
            <article>
              <header>
                <small>Build {i + 1}</small>
                <h3>{p.t}</h3>
                <em>{p.proof}</em>
              </header>
              <dl>
                <div>
                  <dt>What I thought</dt>
                  <dd>{p.thought}</dd>
                </div>
                <div>
                  <dt>What I built</dt>
                  <dd>{p.did}</dd>
                </div>
              </dl>
              <p className="learned">
                <span>What it taught me</span>
                {p.learned}
              </p>
            </article>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Memory() {
  return (
    <section className="sv-wrap sv-pad rs-era-sec" id="memory">
      <header className="rs-era-head">
        <Lines lines={dimLines(ERA.memoryTitle)} />
        <Reveal as="p">{ERA.memorySub}</Reveal>
      </header>
      <div className="rs-era-chapters">
        {ERA.memory.map((m, i) => (
          <Reveal as="article" key={m.t} className="rs-era-chapter">
            <div>
              <small>{String(i + 1).padStart(2, "0")}</small>
              <h3>{m.t}</h3>
              <p>{m.d}</p>
              {m.pull && <blockquote>{m.pull}</blockquote>}
            </div>
            {m.stats && <Stats items={m.stats} cls="is-side" />}
          </Reveal>
        ))}
      </div>
      <Reveal className="rs-era-stack">
        <h3>{ERA.stackTitle}</h3>
        <ol>
          {ERA.stack.map((s, i) => (
            <li key={s.t} className={s.hot ? "is-hot" : ""} style={{ "--i": i }}>
              <b>{s.t}</b>
              <span>{s.s}</span>
            </li>
          ))}
        </ol>
      </Reveal>
      <Reveal className="rs-era-compare">
        <h3>{ERA.compareTitle}</h3>
        <div className="rs-sy-table">
          <table>
            <thead>
              <tr>
                {ERA.compare.head.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ERA.compare.rows.map((r) => (
                <tr key={r[0]}>
                  {r.map((c, j) => (j === 0 ? <th key={j}>{c}</th> : <td key={j} data-l={ERA.compare.head[j]} className={j === 3 ? "is-hot" : ""}>{c}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}

function Rules() {
  return (
    <section className="sv-wrap sv-pad rs-era-sec" id="rules">
      <header className="rs-era-head">
        <Lines lines={dimLines(ERA.rulesTitle)} />
      </header>
      <div className="rs-era-rules">
        <Reveal className="is-yes">
          <h3>What we do</h3>
          <ul>
            {ERA.yes.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="is-no">
          <h3>What we will not do</h3>
          <ul>
            {ERA.no.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Future() {
  return (
    <section className="sv-wrap sv-pad rs-era-sec" id="future">
      <header className="rs-era-head">
        <Lines lines={dimLines(ERA.futureTitle)} />
      </header>
      <ol className="rs-era-future">
        {ERA.future.map(([t, d], i) => (
          <Reveal as="li" key={t}>
            <small>{String(i + 1).padStart(2, "0")}</small>
            <b>{t}</b>
            <p>{d}</p>
          </Reveal>
        ))}
      </ol>
      <a className="sv-btn sv-btn--ghost rs-era-more" href="https://thegenios.com/manifesto/" target="_blank" rel="noopener noreferrer">
        Read the manifesto
        <Arrow />
      </a>
    </section>
  );
}

function Writing() {
  return (
    <section className="sv-wrap sv-pad rs-era-sec" id="writing-era">
      <header className="rs-era-head">
        <Lines lines={dimLines(ERA.writingTitle)} />
        <Reveal as="p">{ERA.writingSub}</Reveal>
      </header>
      <div className="rs-era-articles">
        {ERA.writing.map((w) => (
          <a key={w.t} href={w.href} target="_blank" rel="noopener noreferrer" className={w.wide ? "is-wide" : ""}>
            <small>{w.k}</small>
            <b>{w.t}</b>
            <p>{w.d}</p>
            <Arrow />
          </a>
        ))}
      </div>
    </section>
  );
}

export function Era() {
  return (
    <>
      <Path />
      <Memory />
      <Rules />
      <Future />
      <Writing />
    </>
  );
}
