import React from "react";
import { useReveal } from "../lib/motion";

export function Arrow({ dir = "ne" }) {
  return (
    <svg
      className={`sv-ar sv-ar--${dir}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5.5 18.5 L18.5 5.5" />
      <path d="M9.5 5.5 H18.5 V14.5" />
    </svg>
  );
}

export function Reveal({ children, as: AsTag = "div", className = "", ...n }) {
  const [r, l] = useReveal();
  return (
    <AsTag ref={r} className={`sv-rv ${l ? "is-in" : ""} ${className}`} {...n}>
      {children}
    </AsTag>
  );
}

export function Lines({ lines, as: AsTag = "h2", className = "", srPrefix }) {
  const [n, r] = useReveal();
  return (
    <AsTag ref={n} className={`sv-lines ${r ? "is-in" : ""} ${className}`}>
      {srPrefix && <span className="rs-sr">{srPrefix} </span>}
      {lines.map((l, o) => (
        <React.Fragment key={o}>
          <span className="sv-ln">
            <span>{l}</span>
          </span>{" "}
        </React.Fragment>
      ))}
    </AsTag>
  );
}

export function dimLines(s, t = []) {
  return (s != null && s.length ? s : t).map((n, r) => {
    const l = n.split(/\*([^*]+)\*/g);
    return (
      <span key={r}>
        {l.map((o, i) =>
          i % 2 ? (
            <span key={i} className="sv-dim">
              {o}
            </span>
          ) : (
            o
          ),
        )}
      </span>
    );
  });
}

export function Button({
  href,
  children,
  variant = "accent",
  arrow = true,
  arrowDir,
  className = "",
  ...o
}) {
  const i = `sv-btn sv-btn--${variant} ${className}`;
  const u = arrowDir ?? (href != null && href.startsWith("#") ? "sw" : "ne");
  const f = (
    <>
      {children}
      {arrow && <Arrow dir={u} />}
    </>
  );
  return href ? (
    <a className={i} href={href} {...o}>
      {f}
    </a>
  ) : (
    <button className={i} type="button" {...o}>
      {f}
    </button>
  );
}

export function SectionHead({ lines, sub, className = "" }) {
  return (
    <div className={`sv-head ${className}`}>
      <Lines lines={lines} />
      {sub && (
        <Reveal as="p" className="sv-sub">
          {sub}
        </Reveal>
      )}
    </div>
  );
}
