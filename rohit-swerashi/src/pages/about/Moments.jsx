import { Lines, dimLines } from "../../components/ui";
import { ERA } from "../../content/era";
import { MOMENTS } from "../../content/moments";
import React from "react";

export function Moments() {
  const photos = MOMENTS;
  const [open, setOpen] = React.useState(null);
  React.useEffect(() => {
    if (open === null) return;
    window.__lenis?.stop();
    const key = (e) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft") setOpen((i) => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", key);
    return () => {
      window.__lenis?.start();
      window.removeEventListener("keydown", key);
    };
  }, [open, photos.length]);
  return (
    <section className="rs-era-rooms" id="moments">
      <div className="sv-wrap">
        <div className="rs-era-head">
          <Lines lines={dimLines(["Moments,", "*as they happened.*"])} />
          <p>{ERA.roomsSub}</p>
        </div>
      </div>
      <div className="rs-wall">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            className={p.c >= 6 ? "is-big" : p.r >= 6 ? "is-tall" : ""}
            style={{ "--c": p.c, "--r": p.r }}
            onClick={() => setOpen(i)}
            aria-label={`Open photo: ${p.t}, ${p.y}`}
          >
            <span className="ph">
              <img src={p.src} style={{ objectPosition: p.pos }} alt={`Rohit Swerashi, ${p.t}, ${p.y}`} loading="lazy" decoding="async" />
            </span>
            <span className="cap">
              <b>{p.t}</b>
              <small>{p.y}</small>
            </span>
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="rs-mo-view" role="dialog" aria-modal="true" aria-label="Photo" onClick={() => setOpen(null)}>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={photos[open].src} alt={`Rohit Swerashi, ${photos[open].t}, ${photos[open].y}`} />
            <figcaption>
              <span>
                {photos[open].t}, {photos[open].y}
              </span>
              <span>
                {open + 1} of {photos.length}
              </span>
            </figcaption>
          </figure>
          <button type="button" className="rs-mo-x" aria-label="Close" onClick={() => setOpen(null)}>
            ×
          </button>
          <button type="button" className="rs-mo-nav is-prev" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + photos.length) % photos.length); }}>
            ‹
          </button>
          <button type="button" className="rs-mo-nav is-next" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % photos.length); }}>
            ›
          </button>
        </div>
      )}
    </section>
  );
}
