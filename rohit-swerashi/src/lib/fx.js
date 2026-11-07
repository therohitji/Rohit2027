// Scroll and motion helpers shared by the page sections.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function startSmoothPage() {
  if (window.__lenis || prefersReduced() || window.matchMedia("(pointer: coarse)").matches) return;
  const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  window.__lenis = lenis;
}

export function scrollToY(y) {
  if (window.__lenis) window.__lenis.scrollTo(y);
  else window.scrollTo({ top: y, behavior: prefersReduced() ? "auto" : "smooth" });
}

// Rolls a number like "$40k" or "10,000+" up from zero the first time it is seen.
export function useCountUp() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    const final = el.textContent;
    const m = final.match(/^(\D*)([\d,]+)(.*)$/);
    if (!m) return;
    const target = parseInt(m[2].replace(/,/g, ""), 10);
    const commas = m[2].includes(",");
    const state = { v: 0 };
    const paint = () => {
      const n = Math.round(state.v);
      el.textContent = m[1] + (commas ? n.toLocaleString("en-US") : n) + m[3];
    };
    const tween = gsap.to(state, {
      v: target,
      duration: 1.6,
      ease: "power3.out",
      onUpdate: paint,
      onComplete: () => (el.textContent = final),
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      el.textContent = final;
    };
  }, []);
  return ref;
}

export function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}
