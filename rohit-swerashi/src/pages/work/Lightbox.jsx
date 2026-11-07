import React from "react";

export const re = 5;

export function Lightbox({ shots, index, onClose, onStep }) {
  React.useEffect(() => {
    const r = (g) => {
      g.key === "Escape"
        ? onClose()
        : g.key === "ArrowRight"
          ? onStep(1)
          : g.key === "ArrowLeft" && onStep(-1);
    };
    window.addEventListener("keydown", r);
    const f = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("sv-lb-open");
    return () => {
      window.removeEventListener("keydown", r);
      document.body.style.overflow = f;
      document.body.classList.remove("sv-lb-open");
    };
  }, [onClose, onStep]);
  const n = shots[index];
  return n ? (
    <div
      className="sv-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={n.title}
      onClick={onClose}
    >
      <div className="sv-lb-inner" onClick={(r) => r.stopPropagation()}>
        <div className="sv-lb-bar">
          <span>
            {"Plate "}
            {String(index + 1).padStart(2, "0")}
            {" / "}
            {String(shots.length).padStart(2, "0")}
            {" · "}
            {n.title}
          </span>
          <button onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <img src={n.full ?? n.url} alt={n.title} />
        <div className="sv-lb-nav">
          <button onClick={() => onStep(-1)} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button onClick={() => onStep(1)} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
