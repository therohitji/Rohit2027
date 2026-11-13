import { PROJECTS } from "../content/projects";
import { SIG_TOTAL } from "../content/signature";
import { Signature } from "./Signature";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const It = () => {
  try {
    return localStorage.getItem("rs-theme") !== "light";
  } catch {
    return false;
  }
};

const se = 8;

const xe = 38;

const he = 480 + (se - 1) * xe;

const ue = 520 + (se - 1) * xe;

const Et = 260;

const xt = 340;

// The first visit opens on the signature being written, so the curtain waits for the pen.
const BOOT_SPEED = 1.35;

const me = Math.round((SIG_TOTAL / BOOT_SPEED) * 1000) + 750;

const Pt = me + 1500;

const Ct = [
  [/^\/$/, "Welcome"],
  [/^\/experience\/.+/, "Story"],
  [/^\/experience$/, "Experience"],
  [/^\/expertise$/, "Expertise"],
  [/^\/recognition$/, "Recognition"],
  [/^\/ai$/, "AI"],
  [/^\/about$/, "Profile"],
  [/^\/contact$/, "Contact"],
  [/^\/privacy$/, "Privacy"],
  [/^\/archive\/sections$/, "The shelf"],
];

const fe = (e) => {
  var s;
  var o;
  var i;
  const t = (s = /^\/experience\/([^/]+)$/.exec(e)) == null ? undefined : s[1];
  return (
    (t && ((o = PROJECTS[t]) == null ? undefined : o.name)) ||
    ((i = Ct.find(([n]) => n.test(e))) == null ? undefined : i[1]) ||
    "Rohit Swerashi"
  );
};

const Dt = (e) =>
  e === "/" ||
  e === "/experience" ||
  e === "/expertise" ||
  e === "/recognition" ||
  e === "/ai" ||
  e === "/about" ||
  e === "/contact" ||
  e === "/privacy" ||
  /^\/experience\/[^/]+$/.test(e);

const Pe = () =>
  typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const L = (() => {
  try {
    return typeof window > "u" || Pe() || sessionStorage.getItem("sv-boot-seen")
      ? false
      : (sessionStorage.setItem("sv-boot-seen", "1"), true);
  } catch {
    return false;
  }
})();

export function RouteCover() {
  const e = useNavigate();
  const t = useLocation();
  const [a, s] = React.useState(L ? "covered" : "idle");
  const [o, i] = React.useState(() => (L ? "Rohit Swerashi" : fe(window.location.pathname)));
  const [n, d] = React.useState(L);
  const [r, p] = React.useState(L);
  const h = React.useRef(null);
  const m = React.useRef(false);
  const u = React.useRef([]);
  const I = () => {
    u.current.forEach(clearTimeout);
    u.current = [];
  };
  const C = (w, f) => {
    u.current.push(window.setTimeout(f, w));
  };
  React.useEffect(() => () => I(), []);
  const H = React.useCallback(
    (w) => {
      if (!m.current) {
        if (Pe()) {
          e(w);
          window.scrollTo(0, 0);
          return;
        }
        m.current = true;
        I();
        i(fe(w.split("?")[0]));
        d(false);
        p(false);
        s("arm");
        requestAnimationFrame(() => requestAnimationFrame(() => s("cover")));
        C(Et, () => d(true));
        C(he, () => {
          e(w);
          window.scrollTo(0, 0);
          s("covered");
        });
        C(he + xt, () => {
          d(false);
          s("reveal");
          C(ue + 60, () => {
            s("idle");
            m.current = false;
          });
        });
      }
    },
    [e],
  );
  React.useEffect(() => {
    var oe;
    if (!L) return;
    document.documentElement.style.overflow = "hidden";
    let w = 0;
    let f = false;
    let b = false;
    const D = performance.now();
    const y = {
      pct: 0,
    };
    const B = ((oe = document.fonts) == null ? undefined : oe.ready) ?? Promise.resolve();
    Promise.all([B, new Promise((V) => setTimeout(V, me))]).then(() => {
      f = true;
    });
    const x = () => {
      b ||
        ((b = true),
        (document.documentElement.style.overflow = ""),
        d(false),
        s("reveal"),
        window.setTimeout(() => {
          s("idle");
          p(false);
        }, ue + 60));
    };
    const W = (V) => {
      var re;
      if (!b) {
        y.pct = f ? Math.min(100, y.pct + 7) : Math.min(92, ((V - D) / me) * 92);
        (re = h.current) == null || re.style.setProperty("--p", y.pct.toFixed(2));
        if (y.pct >= 100) {
          x();
          return;
        }
        w = requestAnimationFrame(W);
      }
    };
    w = requestAnimationFrame(W);
    const De = window.setTimeout(x, Pt);
    return () => {
      cancelAnimationFrame(w);
      clearTimeout(De);
      document.documentElement.style.overflow = "";
    };
  }, []);
  React.useEffect(() => {
    window.__svGo = H;
    const w = (f) => {
      var x;
      var W;
      if (f.defaultPrevented || f.button !== 0 || f.metaKey || f.ctrlKey || f.shiftKey || f.altKey)
        return;
      const b =
        (W = (x = f.target) == null ? undefined : x.closest) == null
          ? undefined
          : W.call(x, "a[href]");
      if (
        !b ||
        (b.target && b.target !== "" && b.target !== "_self") ||
        b.hasAttribute("download") ||
        b.hasAttribute("data-no-route")
      )
        return;
      const D = b.getAttribute("href") || "";
      if (!D || D.startsWith("#") || /^(mailto:|tel:)/i.test(D)) return;
      let y;
      try {
        y = new URL(D, window.location.href);
      } catch {
        return;
      }
      if (y.origin !== window.location.origin) return;
      const B = y.pathname + y.search;
      Dt(y.pathname) &&
        y.pathname !== t.pathname &&
        (f.preventDefault(), f.stopPropagation(), H(B));
    };
    document.addEventListener("click", w, true);
    return () => {
      document.removeEventListener("click", w, true);
      delete window.__svGo;
    };
  }, [H, t.pathname]);
  const ae = React.useRef(t.pathname);
  React.useEffect(() => {
    ae.current !== t.pathname &&
      ((ae.current = t.pathname), !m.current && !t.hash && window.scrollTo(0, 0));
  }, [t.pathname, t.hash]);
  const E = ["sv-curtain"];
  It() && E.push("is-dark");
  a !== "idle" && E.push("is-on");
  a === "cover" && E.push("is-cover");
  a === "covered" && E.push("is-covered");
  a === "reveal" && E.push("is-reveal");
  n && E.push("show-label");
  return (
    <div className={E.join(" ")} aria-hidden="true">
      {Array.from(
        {
          length: se,
        },
        (w, f) => (
          <div
            key={f}
            className="sv-curtain-col"
            style={{
              "--i": f,
            }}
          />
        ),
      )}
      <div className={`sv-curtain-label${r ? " is-boot" : ""}`} ref={h}>
        {r ? (
          <Signature play speed={BOOT_SPEED} className="sv-curtain-sign" />
        ) : (
          <span className="name">
            {o}
            <span className="d">.</span>
          </span>
        )}
      </div>
    </div>
  );
}
