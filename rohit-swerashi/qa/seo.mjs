// Checks what a search engine receives, with no JavaScript. node qa/seo.mjs [baseUrl]  Exit code 0 = all green.
import { readFileSync } from "node:fs";
import { PAGES, SITE_URL } from "../src/content/seo.js";
const BASE = process.argv[2] || "http://127.0.0.1:5189";
const results = [];
const check = (name, ok, extra = "") => { results.push(ok); console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? "  — " + extra : ""}`); };
const tag = (html, re) => (html.match(re) || [])[1];
const seenT = new Map(), seenD = new Map();
for (const [path, p] of Object.entries(PAGES)) {
  const res = await fetch(BASE + path);
  const html = await res.text();
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const title = tag(html, /<title>([^<]*)<\/title>/);
  const desc = tag(html, /<meta name="description" content="([^"]*)"/);
  const canon = tag(html, /<link rel="canonical" href="([^"]*)"/);
  const robots = tag(html, /<meta name="robots" content="([^"]*)"/);
  const body = html.split('<div id="root">')[1] || "";
  const text = body.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const h1 = (body.match(/<h1[\s>]/g) || []).length;
  let ld = null;
  try { ld = JSON.parse(tag(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/)); } catch {}
  const types = ld ? ld["@graph"].map((g) => g["@type"]) : [];
  check(`${path} status 200, title ends with the name`, res.status === 200 && title && title.length <= 62 && /Rohit Swerashi/.test(title), `${title} (${title?.length})`);
  check(`${path} description 110 to 165 characters, names him`, desc && desc.length >= (p.noindex ? 40 : 110) && desc.length <= 165 && (p.noindex || /Rohit Swerashi/.test(desc)), `${desc?.length}`);
  check(`${path} canonical and robots`, canon === url && (p.noindex ? /noindex/.test(robots) : /^index/.test(robots)), `${canon} ${robots}`);
  check(`${path} one h1, readable text without JavaScript`, h1 === 1 && text.length > (p.noindex ? 200 : path === "/contact" ? 400 : 900), `h1 ${h1}, ${text.length} chars`);
  check(`${path} structured data`, types.includes("Person") && types.some((t) => /WebPage|ProfilePage/.test(t)), types.join(","));
  check(`${path} no empty social tags, absolute share image`, !/content=""/.test(html) && new RegExp(`og:image" content="${SITE_URL}/`).test(html) && /<meta name="twitter:card"/.test(html));
  check(`${path} every image has alt`, !/<img(?![^>]*\balt=)[^>]*>/.test(body));
  if (seenT.has(title)) check(`${path} unique title`, false, title); seenT.set(title, path);
  if (seenD.has(desc)) check(`${path} unique description`, false); seenD.set(desc, path);
}
check("Home names him in the h1 and in visible text", await (async () => { const h = await (await fetch(BASE + "/")).text(); return /<h1[^>]*>[\s\S]*?Rohit Swerashi[\s\S]*?<\/h1>/.test(h) && /I'm Rohit Swerashi|I&#x27;m Rohit Swerashi/.test(h); })());
const robots = await (await fetch(BASE + "/robots.txt")).text();
check("robots.txt allows crawling and names the sitemap", /Allow: \//.test(robots) && !/Disallow: \/\s*$/m.test(robots) && robots.includes(`${SITE_URL}/sitemap.xml`));
const map = await (await fetch(BASE + "/sitemap.xml")).text();
const locs = [...map.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
check("sitemap lists every indexable page, no redirects or noindex", locs.length === Object.values(PAGES).filter((p) => !p.noindex).length + 1 && !locs.some((l) => /privacy|films|work/.test(l.replace("experience", ""))), `${locs.length} URLs`);
for (const l of locs) { const r = await fetch(BASE + l.replace(SITE_URL, "")); check(`sitemap URL answers 200: ${l.replace(SITE_URL, "") || "/"}`, r.status === 200); }
for (const f of ["favicon.ico", "favicon.svg", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "site.webmanifest", "llms.txt", "assets/og.png"]) { const r = await fetch(`${BASE}/${f}`); check(`${f} present`, r.status === 200); }
const idx = readFileSync("dist/index.html", "utf8");
check("no noindex left on the home page, no em dashes", !/noindex/.test(idx) && !/[—–]/.test(idx));
const facts = await (await fetch(BASE + "/facts")).text();
check("facts page is indexable", !/noindex/.test(facts) && /canonical" href="https:\/\/www\.rohitswerashi\.com\/facts"/.test(facts));
for (const path of ["/", "/about", "/experience/genios", "/facts"]) { const h = await (await fetch(BASE + path)).text(); check(`${path} carries the analytics tag`, h.includes("gtm.js?id=GTM-K5MJZSJM")); }
const priv = await (await fetch(BASE + "/privacy")).text();
check("privacy page says analytics runs", /uses Google Analytics/.test(priv) && !/does not run analytics/.test(priv));
const fails = results.filter((x) => !x).length;
console.log(`\n${results.length - fails}/${results.length} passed`);
process.exit(fails ? 1 : 0);
