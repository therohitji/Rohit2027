import { NOT_FOUND, OG_IMAGE, PAGES, SITE_URL } from "../content/seo";
import React from "react";
import { useLocation } from "react-router-dom";

function setTag(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta");
    const m = selector.match(/\[([a-z:]+)="([^"]+)"\]/i);
    if (m) el.setAttribute(m[1], m[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export function RouteMeta() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    const p = PAGES[path] ?? NOT_FOUND;
    const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
    document.title = p.title;
    setTag('meta[name="robots"]', "content", p.noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
    setTag('meta[name="description"]', "content", p.desc);
    setTag('meta[name="keywords"]', "content", p.keywords ?? "Rohit Swerashi");
    setTag('link[rel="canonical"]', "href", url);
    setTag('meta[property="og:title"]', "content", p.title);
    setTag('meta[property="og:description"]', "content", p.desc);
    setTag('meta[property="og:url"]', "content", url);
    setTag('meta[property="og:image"]', "content", OG_IMAGE);
    setTag('meta[name="twitter:title"]', "content", p.title);
    setTag('meta[name="twitter:description"]', "content", p.desc);
  }, [pathname]);
  return null;
}
