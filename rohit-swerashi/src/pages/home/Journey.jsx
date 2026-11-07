import { dimLines } from "../../components/ui";
import { gsap, prefersReduced } from "../../lib/fx";
import React from "react";

export function Journey({ title, sub, lessonLabel, items }) {
  const root = React.useRef(null);
  const track = React.useRef(null);
  React.useEffect(() => {
    if (prefersReduced()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 961px) and (min-height: 620px)", () => {
      // Held here because gsap can still ask for this after the page has left and the ref is gone.
      const el = track.current;
      const dist = () => el.scrollWidth - window.innerWidth;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      tl.to(track.current, { x: () => -dist(), ease: "none", duration: 1 }, 0);
      tl.fromTo(".rs-j-fill", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, 0);
      tl.to(root.current, { "--rs-j-a": 1, ease: "none", duration: 1 }, 0);
    });
    return () => mm.revert();
  }, []);
  return (
    <section className="rs-j" id="journey-home" ref={root}>
      <div className="rs-j-track" ref={track}>
        <header className="rs-j-head">
          <h2>{dimLines(title)}</h2>
          <p>{sub}</p>
        </header>
        <div className="rs-j-line" aria-hidden="true">
          <i className="rs-j-fill" />
        </div>
        {items.map((e) => (
          <article className={`rs-j-stop${e.now ? " is-now" : ""}`} key={e.t}>
            <span className="y">{e.y}</span>
            <span className="dot" aria-hidden="true" />
            <h3>{e.t}</h3>
            <p>{e.d}</p>
            <p className="l">
              <b>{lessonLabel}</b>
              {e.l}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
