import { Logo } from "./Logo";
import { NAV_ITEMS, NAV_CTA } from "../content/site";
import { routeEnabled } from "../lib/routes";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export const S = "/";

export const DialMark = () =>
  NAV_ITEMS.map((s) => ({
    label: s.label,
    to: s.href,
  })).filter((s) => !s.to || routeEnabled(s.to));

function ne(s, t, a) {
  return (n) => {
    a == null || a();
    !(n.defaultPrevented || n.metaKey || n.ctrlKey || n.shiftKey || n.button !== 0) &&
      t === s &&
      (n.preventDefault(), (window.location.href = s), window.location.reload());
  };
}

function NavItem({ item, pathname, onClick }) {
  const n = ne(item.to ?? S, pathname, onClick);
  if (item.to) {
    const l =
      item.to === S ? pathname === S : pathname === item.to || pathname.startsWith(`${item.to}/`);
    return (
      <Link to={item.to} aria-current={l ? "page" : undefined} onClick={n}>
        {item.label}
      </Link>
    );
  }
  return pathname === S ? (
    <a href={item.hash} onClick={onClick}>
      {item.label}
    </a>
  ) : (
    <Link to={`${S}${item.hash}`} onClick={onClick}>
      {item.label}
    </Link>
  );
}

function ThemeDial({ dark }) {
  return (
    <svg className={`sv-dial-mk ${dark ? "is-dark" : ""}`} viewBox="0 0 20 20" aria-hidden="true">
      <circle className="rim" cx="10" cy="10" r="6.6" />
      <path className="half" d="M10 3.4a6.6 6.6 0 0 0 0 13.2z" />
    </svg>
  );
}

export function SiteNav({ dark, onToggleDark }) {
  const [n, r] = React.useState(false);
  const { pathname } = useLocation();
  const o = DialMark();
  React.useEffect(() => {
    const c = (p) => {
      p.key === "Escape" && r(false);
    };
    window.addEventListener("keydown", c);
    return () => window.removeEventListener("keydown", c);
  }, []);
  React.useEffect(() => {
    if (!n) return;
    const c = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = c;
    };
  }, [n]);
  const i = ne(S, pathname);
  const u = React.useRef(null);
  const f = React.useRef(n);
  f.current = n;
  React.useEffect(() => {
    const c = u.current;
    const p = c == null ? undefined : c.closest(".site-root");
    if (!c || !p) return;
    const y = 20;
    const C = 6;
    let m = window.scrollY;
    let v = m;
    let N = true;
    let g = 0;
    const d = (w) => {
      p.classList.contains("is-nav-away") !== w && p.classList.toggle("is-nav-away", w);
    };
    const M = () => {
      g = 0;
      const w = window.scrollY;
      if (w !== m) {
        const E = w > m;
        E !== N && ((N = E), (v = m));
        m = w;
      }
      f.current || w <= c.offsetHeight
        ? d(false)
        : N && w - v > C
          ? d(true)
          : !N && v - w >= y && d(false);
    };
    const j = () => {
      g || (g = requestAnimationFrame(M));
    };
    const $ = () => d(false);
    window.addEventListener("scroll", j, {
      passive: true,
    });
    c.addEventListener("focusin", $);
    return () => {
      window.removeEventListener("scroll", j);
      c.removeEventListener("focusin", $);
      cancelAnimationFrame(g);
      d(false);
    };
  }, []);
  return (
    <nav className="sv-nav" ref={u}>
      <div className="sv-nav-in">
        <Link className="sv-brand" to={S} onClick={i} aria-label="Rohit Swerashi · home">
          <Logo className="sv-brand-logo" />
        </Link>
        <div className="sv-nav-links">
          {DialMark().map((c) => (
            <NavItem key={c.label} item={c} pathname={pathname} />
          ))}
        </div>
        {onToggleDark && (
          <button
            className="sv-lights"
            onClick={onToggleDark}
            aria-pressed={!!dark}
            aria-label={dark ? "Switch to light" : "Switch to dark"}
          >
            <ThemeDial dark={!!dark} />
          </button>
        )}
        <Link className="sv-btn sv-btn--accent sv-nav-cta" to={NAV_CTA.href}>
          {NAV_CTA.label}
        </Link>
        <button
          className="sv-nav-toggle"
          aria-label={n ? "Close menu" : "Open menu"}
          aria-expanded={n}
          aria-controls="sv-nav-menu"
          onClick={() => r((c) => !c)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div
        className={`sv-nav-sheet ${n ? "is-open" : ""}`}
        id="sv-nav-menu"
        aria-hidden={!n}
        onClick={(c) => c.target === c.currentTarget && r(false)}
      >
        <div className="sv-nav-sheet-in">
          <nav className="links">
            {o.map((c, p) => (
              <span
                key={c.label}
                className="ln"
                style={{
                  "--i": p,
                }}
              >
                <NavItem item={c} pathname={pathname} onClick={() => r(false)} />
              </span>
            ))}
            <span
              className="ln"
              style={{
                "--i": o.length,
              }}
            >
              <Link to={NAV_CTA.href} onClick={() => r(false)}>
                {NAV_CTA.label}
              </Link>
            </span>
          </nav>
        </div>
      </div>
    </nav>
  );
}
