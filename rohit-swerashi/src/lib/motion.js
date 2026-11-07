import React from "react";

const oe = 0.09;

const de = 16;

const he = 0.4;

function anchorTop(s) {
  const t =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--sv-nav-h")) || 62;
  return Math.max(0, s.getBoundingClientRect().top + window.scrollY - t - 18);
}

function startSmoothScroll({ ease = oe } = {}) {
  if (typeof window > "u") return () => {};
  const t = window.matchMedia("(pointer: coarse)").matches;
  const a = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const n = (m) => {
    var M;
    var j;
    if (m.defaultPrevented || m.button !== 0 || m.metaKey || m.ctrlKey || m.shiftKey || m.altKey)
      return;
    const v = (j = (M = m.target).closest) == null ? undefined : j.call(M, 'a[href^="#"]');
    if (!v) return;
    const N = v.getAttribute("href").slice(1);
    if (!N) return;
    const g = document.getElementById(N);
    if (!g) return;
    m.preventDefault();
    const d = anchorTop(g);
    if (window.__lenis) {
      window.__lenis.scrollTo(d);
      return;
    }
    if (a) {
      window.scrollTo(0, d);
      return;
    }
    if (t) {
      window.scrollTo({
        top: d,
        behavior: "smooth",
      });
      return;
    }
    r = Math.min(u(), Math.max(0, d));
    p();
  };
  document.addEventListener("click", n);
  if (t || a || window.__lenis) return () => document.removeEventListener("click", n);
  let r = window.scrollY;
  let l = r;
  let o = 0;
  let i = window.scrollY;
  const u = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const f = () => {
    o && cancelAnimationFrame(o);
    o = 0;
  };
  const c = () => {
    const m = r - l;
    if (Math.abs(m) < he) {
      l = r;
      window.scrollTo(0, l);
      i = window.scrollY;
      o = 0;
      return;
    }
    l += m * ease;
    window.scrollTo(0, l);
    i = window.scrollY;
    o = requestAnimationFrame(c);
  };
  const p = () => {
    o || (o = requestAnimationFrame(c));
  };
  const y = (m) => {
    var g;
    var d;
    if (m.ctrlKey || Math.abs(m.deltaX) > Math.abs(m.deltaY)) return;
    const v =
      (d = (g = m.target).closest) == null
        ? undefined
        : d.call(g, ".sv-cn-log, .sv-report-sheet .scroll, [data-own-wheel]");
    if (v && v.scrollHeight > v.clientHeight) return;
    m.preventDefault();
    const N =
      m.deltaMode === 1
        ? m.deltaY * de
        : m.deltaMode === 2
          ? m.deltaY * window.innerHeight
          : m.deltaY;
    r = Math.min(u(), Math.max(0, r + N));
    p();
  };
  const C = () => {
    Math.abs(window.scrollY - i) < 2 || ((r = l = window.scrollY), (i = window.scrollY), f());
  };
  window.addEventListener("wheel", y, {
    passive: false,
  });
  window.addEventListener("scroll", C, {
    passive: true,
  });
  return () => {
    f();
    document.removeEventListener("click", n);
    window.removeEventListener("wheel", y);
    window.removeEventListener("scroll", C);
  };
}

export function isInView(s) {
  const t = s.getBoundingClientRect();
  return t.top < window.innerHeight && t.bottom > 0 && t.width > 0;
}

export function useReveal(s = 0.16) {
  const t = React.useRef(null);
  const [a, n] = React.useState(false);
  React.useEffect(() => {
    const r = t.current;
    if (!r || a) return;
    let l = 0;
    let o = 0;
    const i = () => {
      n(true);
    };
    const u = () =>
      isInView(r) ? ((l = requestAnimationFrame(i)), (o = window.setTimeout(i, 260)), true) : false;
    const f = new IntersectionObserver(
      (p) =>
        p.forEach((y) => {
          y.isIntersecting && i();
        }),
      {
        threshold: s,
      },
    );
    f.observe(r);
    u();
    const c = () => {
      document.hidden || u();
    };
    document.addEventListener("visibilitychange", c);
    return () => {
      f.disconnect();
      document.removeEventListener("visibilitychange", c);
      cancelAnimationFrame(l);
      clearTimeout(o);
    };
  }, [a, s]);
  return [t, a];
}

export function useSmoothScroll(s) {
  React.useEffect(
    () =>
      startSmoothScroll({
        ease: s,
      }),
    [s],
  );
}

export function useInView(s = 0) {
  const t = React.useRef(null);
  const [a, n] = React.useState(false);
  React.useEffect(() => {
    const r = t.current;
    if (!r) return;
    const l = new IntersectionObserver((u) => u.forEach((f) => n(f.isIntersecting)), {
      threshold: s,
    });
    l.observe(r);
    const o = () => n(isInView(r));
    o();
    const i = () => {
      document.hidden || o();
    };
    document.addEventListener("visibilitychange", i);
    return () => {
      l.disconnect();
      document.removeEventListener("visibilitychange", i);
    };
  }, [s]);
  return [t, a];
}

export function useMediaQuery(s) {
  const [t, a] = React.useState(() => (typeof window < "u" ? window.matchMedia(s).matches : false));
  React.useEffect(() => {
    const n = window.matchMedia(s);
    const r = () => a(n.matches);
    r();
    n.addEventListener("change", r);
    return () => n.removeEventListener("change", r);
  }, [s]);
  return t;
}

export function useScrollProgress(s, t) {
  const { steps, stepVh = 95, enabled = true } = t;
  const [l, o] = React.useState(0);
  React.useEffect(() => {
    const i = s.current;
    if (!i) return;
    if (!enabled) {
      i.style.height = "auto";
      return;
    }
    i.style.height = `calc(100vh + ${(steps - 1) * stepVh}vh)`;
    let u = 0;
    const f = () => {
      u = 0;
      const p = i.getBoundingClientRect();
      const y = p.height - window.innerHeight;
      y <= 0 || o(Math.min(1, Math.max(0, -p.top / y)));
    };
    const c = () => {
      u || (u = requestAnimationFrame(f));
    };
    f();
    window.addEventListener("scroll", c, {
      passive: true,
    });
    window.addEventListener("resize", c);
    return () => {
      window.removeEventListener("scroll", c);
      window.removeEventListener("resize", c);
      u && cancelAnimationFrame(u);
    };
  }, [s, steps, stepVh, enabled]);
  return enabled ? l : null;
}

export function useHashScroll(s = []) {
  React.useEffect(() => {
    const t = window.location.hash.slice(1);
    if (!t) return;
    const a = requestAnimationFrame(() => {
      var n;
      (n = document.getElementById(t)) == null ||
        n.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
    });
    return () => cancelAnimationFrame(a);
  }, s);
}

export function useStaggerReveal(s, t, a = {}) {
  const { from = 0.9, rise = 16, start = 0.78, span = 0.68, overlap = 0.85 } = a;
  React.useEffect(() => {
    const u = s.current;
    if (!u) return;
    const f = () => Array.from(u.querySelectorAll(t));
    let c = f();
    if (!c.length) return;
    const p = () => {
      c.forEach((j) => {
        j.style.opacity = "1";
        j.style.transform = "none";
      });
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      p();
      return;
    }
    if (document.hidden) {
      p();
      return;
    }
    const y = (j, $, w) => Math.min(w, Math.max($, j));
    const C = (j) => {
      const w = j - 1;
      return 1 + (1.7 + 1) * w * w * w + 1.7 * w * w;
    };
    const m = () =>
      c.forEach((j) => {
        j.style.willChange = "transform, opacity";
      });
    m();
    let v = 0;
    let N = -1;
    const g = () => {
      v = 0;
      const j = c.length;
      const $ = 1 / j;
      const w = u.getBoundingClientRect();
      const E = y((window.innerHeight * start - w.top) / (window.innerHeight * span), 0, 1);
      if (E !== N) {
        N = E;
        for (let A = 0; A < j; A++) {
          const k = y((E - A * $) / ($ * overlap), 0, 1);
          const O = C(k);
          c[A].style.opacity = y(k * 1.6, 0, 1).toFixed(3);
          c[A].style.transform =
            `translateY(${((1 - O) * rise).toFixed(2)}px) scale(${(from + (1 - from) * O).toFixed(4)})`;
        }
      }
    };
    const d = () => {
      v || (v = requestAnimationFrame(g));
    };
    g();
    const M = new MutationObserver(() => {
      c = f();
      c.length && (m(), (N = -1), g());
    });
    M.observe(u, {
      childList: true,
      subtree: true,
    });
    window.addEventListener("scroll", d, {
      passive: true,
    });
    window.addEventListener("resize", d);
    return () => {
      M.disconnect();
      window.removeEventListener("scroll", d);
      window.removeEventListener("resize", d);
      v && cancelAnimationFrame(v);
    };
  }, [s, t, from, rise, start, span, overlap]);
}

const THEME_KEY = "rs-theme";

export function useTheme() {
  const [s, t] = React.useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) !== "light";
    } catch {
      return true;
    }
  });
  React.useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, s ? "dark" : "light");
    } catch {}
  }, [s]);
  return [s, React.useCallback(() => t((a) => !a), [])];
}
