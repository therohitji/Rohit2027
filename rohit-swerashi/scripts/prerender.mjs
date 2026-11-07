// After `vite build`: writes one real HTML file per page, with its own title, description,
// structured data and readable text, so a search engine gets the page without running JavaScript.
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { NOT_FOUND, OG_IMAGE, PAGES, SITE_NAME, SITE_URL, jsonLd } from "../src/content/seo.js";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const PORT = 5199;
const dist = join(process.cwd(), "dist");
const template = readFileSync(join(dist, "index.html"), "utf8");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function head(path, p) {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const lines = [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.desc)}" />`,
    `<meta name="keywords" content="${esc(p.keywords ?? SITE_NAME)}" />`,
    `<meta name="robots" content="${p.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}" />`,
    `<meta name="author" content="${SITE_NAME}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:type" content="${path === "/" || p.profile ? "profile" : "website"}" />`,
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.desc)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${SITE_NAME}, founder of GeniOS" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@rohit_swerashi" />`,
    `<meta name="twitter:title" content="${esc(p.title)}" />`,
    `<meta name="twitter:description" content="${esc(p.desc)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ];
  if (PAGES[path]) lines.push(`<script type="application/ld+json">${JSON.stringify(jsonLd(path)).replace(/</g, "\\u003c")}</script>`);
  return lines.join("\n    ");
}

const fill = (h, body) => template.replace(/<!--seo:start-->[\s\S]*<!--seo:end-->/, h).replace('<div id="root"></div>', `<div id="root">${body}</div>`);

const server = spawn("npx", ["vite", "preview", "--host", "127.0.0.1", "--port", String(PORT), "--strictPort"], { stdio: "ignore", detached: true });
const stop = () => { try { process.kill(-server.pid); } catch {} };
for (let i = 0; i < 60; i++) {
  try { await fetch(`http://127.0.0.1:${PORT}/`); break; } catch { await new Promise((r) => setTimeout(r, 250)); }
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await ctx.addInitScript(() => { try { sessionStorage.setItem("sv-boot-seen", "1"); localStorage.setItem("rs-theme", "dark"); } catch {} });

async function capture(path) {
  const page = await ctx.newPage();
  await page.goto(`http://127.0.0.1:${PORT}${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const body = await page.evaluate(() => {
    const root = document.getElementById("root").cloneNode(true);
    root.querySelectorAll('.sv-curtain, canvas, svg, [aria-hidden="true"], .rs-mo-view').forEach((n) => n.remove());
    root.querySelectorAll("[style]").forEach((n) => n.removeAttribute("style"));
    return root.innerHTML;
  });
  await page.close();
  return body;
}

try {
  const out = {};
  for (const path of Object.keys(PAGES)) out[path] = await capture(path);
  const missing = await capture("/this-page-does-not-exist");
  for (const [path, body] of Object.entries(out)) {
    const file = path === "/" ? join(dist, "index.html") : join(dist, path.slice(1), "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, fill(head(path, PAGES[path]), body));
    console.log(`  ${path} ${(body.length / 1024).toFixed(0)} KB`);
  }
  writeFileSync(join(dist, "404.html"), fill(head("/404", NOT_FOUND), missing));
  const today = new Date().toISOString().slice(0, 10);
  const urls = Object.entries(PAGES).filter(([, p]) => !p.noindex).map(([path]) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`));
  urls.push(`${SITE_URL}/facts`);
  writeFileSync(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
  console.log(`prerendered ${Object.keys(out).length} pages, 404, sitemap with ${urls.length} URLs`);
} finally {
  await browser.close();
  stop();
}
