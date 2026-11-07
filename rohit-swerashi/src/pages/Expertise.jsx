import { Footer } from "../components/Footer";
import { SiteNav } from "../components/SiteNav";
import { dimLines, Reveal } from "../components/ui";
import { COPY } from "../content/copy";
import { useTheme, useHashScroll, useSmoothScroll } from "../lib/motion";
import { DotCube } from "./DotCube";
import React from "react";
import { Link } from "react-router-dom";

function ResultLabel({ row }) {
  if (!row.href) return <span>{row.l}</span>;
  return row.href.startsWith("/") ? (
    <Link to={row.href}>{row.l} →</Link>
  ) : (
    <a href={row.href} target="_blank" rel="noopener noreferrer">
      {row.l} ↗
    </a>
  );
}

function Case({ row, labels }) {
  const word = !/\d/.test(row.v);
  return (
    <Reveal as="article" className="rs-case">
      <div className="rs-case-main">
        <span className="k">{labels[0]}</span>
        <h3>{row.s}</h3>
        <div className="rs-case-how">
          <p>
            <b>{labels[1]}</b>
            {row.b}
          </p>
          <span className="to" aria-hidden="true">
            →
          </span>
          <p>
            <b>{labels[2]}</b>
            {row.d}
          </p>
        </div>
      </div>
      <div className="rs-case-res">
        <span className="k">{labels[3]}</span>
        <b className={word ? "is-word" : ""}>{row.v}</b>
        <ResultLabel row={row} />
      </div>
    </Reveal>
  );
}

function Stage({ stage, labels }) {
  return (
    <section className="rs-stage" id={stage.id}>
      <div className="sv-wrap rs-stage-grid">
        <header className="rs-stage-side">
          <span className="k">
            {stage.chip} · {stage.rows.length} problems
          </span>
          <h2>{dimLines(stage.title)}</h2>
          <p>{stage.sub}</p>
        </header>
        <div className="rs-cases">
          {stage.rows.map((r) => (
            <Case key={r.s} row={r} labels={labels} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Rejected({ c }) {
  const [yc, sr, inv] = [15, 6, 500];
  const dots = React.useMemo(
    () => Array.from({ length: yc + sr + inv }, (_, i) => (i < yc ? "y" : i < yc + sr ? "s" : "")),
    [yc, sr, inv],
  );
  const swatch = ["#e0b896", "var(--sv-ink)", "var(--rs-no)"];
  return (
    <section id="rejected">
      <div className="sv-wrap rs-rej-grid">
        <div>
          <h2>{dimLines(c.rejTitle)}</h2>
          <p>{c.rejSub}</p>
          <Reveal as="blockquote" className="rs-rej-q">
            {c.rejQuote}
          </Reveal>
        </div>
        <div>
          <div className="rs-dots" role="img" aria-label="One square for each rejection: at least 15 from Y Combinator, 6 from a16z Speedrun and 500 from investors">
            {dots.map((d, i) => (
              <i key={i} className={d} />
            ))}
          </div>
          <div className="rs-rej-key">
            {c.rej.map((x, i) => (
              <div key={x.l}>
                <b>{x.v}</b>
                <span>
                  <em style={{ background: swatch[i] }} />
                  {x.l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  const [dark, toggle] = useTheme();
  useHashScroll();
  useSmoothScroll();
  const c = COPY.expertise;
  const count = c.stages.reduce((n, s) => n + s.rows.length, 0);
  const chapters = React.useMemo(
    () => [
      ...c.stages.map((s) => [s.id, s.chip]),
      ["rejected", "Rejected"],
      ["adds-up", "Adds up to"],
    ],
    [c],
  );
  const [active, setActive] = React.useState(chapters[0][0]);
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    chapters.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [chapters]);
  React.useEffect(() => {
    const chip = document.querySelector(".rs-x-rail a.is-on");
    const bar = chip?.parentElement;
    if (bar) bar.scrollLeft = chip.offsetLeft - (bar.clientWidth - chip.offsetWidth) / 2;
  }, [active]);
  return (
    <div className={`site-root rs-x ${dark ? "is-dark" : ""}`}>
      <SiteNav dark={dark} onToggleDark={toggle} />
      <header className="rs-x-hero" id="top">
        <div className="sv-wrap">
          <div className="rs-x-top">
            <h1>{dimLines(c.title)}</h1>
            <DotCube />
          </div>
          <div className="rs-x-foot">
            <p className="lead">{c.intro}</p>
            <dl className="rs-x-tally">
              <div>
                <dt>{c.tallyLabel}</dt>
                <dd>{count}</dd>
              </div>
              {c.tally.map((t) => (
                <div key={t.l}>
                  <dt>{t.l}</dt>
                  <dd>{t.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>
      <div className="rs-x-rail">
        <nav className="sv-wrap" aria-label="Chapters">
          {chapters.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? "is-on" : ""}>
              {label}
            </a>
          ))}
        </nav>
      </div>
      {c.stages.map((s) => (
        <Stage key={s.id} stage={s} labels={c.labels} />
      ))}
      <Rejected c={c} />
      <section id="adds-up">
        <div className="sv-wrap">
          <header className="rs-add-head">
            <h2>{dimLines(c.addTitle)}</h2>
            <p>{c.addSub}</p>
          </header>
          <div className="rs-caps">
            {c.add.map((e) => (
              <Reveal key={e.t} className="rs-cap">
                <h3>{e.t}</h3>
                <ul>
                  {e.can.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <p>{e.p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="rs-exec">
            <span>{c.execLeft}</span>
            <b>{c.execRight}</b>
          </Reveal>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Expertise;
