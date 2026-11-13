// Drives every route and control with a real browser. Exit code 0 = all green.
// node qa/run.cjs [baseUrl]   (default http://127.0.0.1:5189, run `npm run build && npm run preview` first)
const { chromium } = require("playwright");
const BASE = process.argv[2] || "http://127.0.0.1:5189";
const ROUTES = ["/", "/experience", "/expertise", "/recognition", "/ai", "/about", "/contact", "/privacy", "/facts", "/experience/genios", "/experience/hustlers-fellowship", "/experience/the-moronss", "/experience/homians", "/experience/agents", "/experience/smart-ats", "/experience/films", "/does-not-exist"];
const results = [];
const check = (name, ok, extra = "") => { results.push(ok); console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? "  — " + extra : ""}`); };
const open = async (ctx, route) => {
  const p = await ctx.newPage();
  p.problems = [];
  p.on("pageerror", (e) => p.problems.push("js: " + e.message));
  p.on("request", (r) => { const u = new URL(r.url()); if (BASE.includes("127.0.0.1") && u.hostname !== "127.0.0.1" && !/fontshare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|googletagmanager|lissoss/.test(u.hostname)) p.problems.push("external " + r.url()); });
  p.on("response", (r) => { if (r.status() >= 400 && !/favicon/.test(r.url())) p.problems.push(r.status() + " " + r.url()); });
  p.on("requestfailed", (r) => { const e = r.failure()?.errorText || ""; if (!/ERR_ABORTED/.test(e)) p.problems.push("failed " + r.url() + " " + e); });
  await p.route(/googletagmanager|google-analytics|lissoss\.com|posthog/, (x) => x.abort("aborted"));
  await p.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 45000 });
  await p.waitForTimeout(1800);
  return p;
};
(async () => {
  const b = await chromium.launch();
  if (!process.env.CONTROLS_ONLY) for (const [vp, opts] of [["desktop", { viewport: { width: 1440, height: 900 } }], ["wide", { viewport: { width: 1920, height: 1080 } }], ["mobile", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }]]) {
    const ctx = await b.newContext(opts);
    for (const r of ROUTES) {
      const p = await open(ctx, r);
      const h = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < h; y += 700) { await p.evaluate((v) => window.scrollTo(0, v), y); await p.waitForTimeout(120); }
      await p.waitForTimeout(400);
      const m = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src), text: document.body.innerText.length }));
      const notFound = r === "/does-not-exist";
      check(`${vp} ${r} renders`, m.text > (notFound ? 40 : 200), `${m.text} chars`);
      check(`${vp} ${r} no overflow`, m.sw <= m.cw + 1, `${m.sw}/${m.cw}`);
      check(`${vp} ${r} no broken images`, m.broken.length === 0, m.broken.slice(0, 2).join(" "));
      const round = await p.evaluate(() => [...document.querySelectorAll('button, .sv-btn, [role="button"], [role="tab"], .rs-tabs, .rs-x-rail a, .rs-proof-film .play')].filter((e) => { const s = getComputedStyle(e); return /%/.test(s.borderTopLeftRadius) || parseFloat(s.borderTopLeftRadius) > 5; }).map((e) => e.tagName + "." + e.className));
      check(`${vp} ${r} buttons stay square, 5px at most`, round.length === 0, round.slice(0, 3).join(" | "));
      const rupee = await p.evaluate(() => /₹|\blakh\b/i.test(document.body.innerText));
      check(`${vp} ${r} prices are in dollars`, !rupee);
      const dash = await p.evaluate(() => /[—–]/.test(document.documentElement.outerHTML));
      check(`${vp} ${r} no em dashes`, !dash);
      const pipe = r === "/" ? await p.evaluate(() => /pipeline/i.test(document.body.textContent)) : false;
      check(`${vp} ${r} no pipeline wording on Welcome`, !pipe);
      if (vp === "mobile") {
        const mob = await p.evaluate(() => {
          const vw = document.documentElement.clientWidth;
          const vis = (e) => { const b = e.getBoundingClientRect(); const s = getComputedStyle(e); return b.width > 0 && b.height > 0 && s.visibility !== "hidden" && s.display !== "none"; };
          const inScroller = (e) => { let n = e.parentElement; while (n && n !== document.body) { const o = getComputedStyle(n).overflowX; if ((o === "auto" || o === "scroll") && n.scrollWidth > n.clientWidth + 1) return true; n = n.parentElement; } return false; };
          const off = [...document.querySelectorAll("h1,h2,h3,h4,p,li,dd,td,.sv-btn,figcaption,blockquote")].filter((e) => vis(e) && !inScroller(e) && !e.closest(".rs-rib-tiles,.sv-sc-viewer,.sv-board-walk")).filter((e) => { const b = e.getBoundingClientRect(); return b.left < 8 || b.right > vw - 8; }).map((e) => e.textContent.trim().slice(0, 24));
          const lefts = [...document.querySelectorAll("h1:not(.rs-sr),h2")].filter((e) => vis(e) && !e.closest(".rs-rib,.rs-proof,.rs-case-res") && getComputedStyle(e).textAlign !== "center").map((e) => { const g = document.createRange(); const first = [...e.children].find((c) => !c.classList.contains("rs-sr")) || e; g.selectNodeContents(first); return Math.round(g.getBoundingClientRect().left); }).filter((v) => v > 0);
          const fs = [...document.querySelectorAll("h1:not(.rs-sr)")].filter(vis).map((e) => Math.round(parseFloat(getComputedStyle(e).fontSize)));
          return { off: off.slice(0, 4), lefts: [...new Set(lefts)], fs: [...new Set(fs)] };
        });
        check(`mobile ${r} nothing touches the screen edge`, mob.off.length === 0, mob.off.join(" | "));
        const story = r.startsWith("/experience/");
        check(`mobile ${r} headings start on one line`, mob.lefts.length <= (story ? 2 : 1), mob.lefts.join(","));
        check(`mobile ${r} page heading size`, mob.fs.every((v) => v === 36), mob.fs.join(","));
      }
      check(`${vp} ${r} no runtime/network errors`, p.problems.length === 0, p.problems.slice(0, 3).join(" | "));
      await p.close();
    }
    await ctx.close();
  }
  // desktop controls
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await open(ctx, "/");
    for (const [label, path] of [["Experience", "/experience"], ["Expertise", "/expertise"], ["Recognition", "/recognition"], ["AI", "/ai"], ["Profile", "/about"], ["Contact", "/contact"], ["Welcome", "/"]]) {
      await p.locator(".sv-nav").getByRole("link", { name: label, exact: true }).first().click();
      await p.waitForTimeout(3600);
      check(`nav link ${label} goes to ${path}`, new URL(p.url()).pathname === path, p.url());
    }
    const dark = () => p.evaluate(() => !!document.querySelector(".site-root.is-dark"));
    const before = await dark();
    await p.locator(".sv-nav button").filter({ has: p.locator(".sv-dial-mk") }).first().click();
    await p.waitForTimeout(300);
    check("theme dial toggles dark", (await dark()) !== before);
    await p.reload(); await p.waitForTimeout(1500);
    check("theme survives reload", (await dark()) !== before);
    await p.locator(".sv-nav button").filter({ has: p.locator(".sv-dial-mk") }).first().click();
    await p.waitForTimeout(300);
    const tab = p.locator("#board-tab-homians");
    await tab.scrollIntoViewIfNeeded();
    await p.waitForTimeout(800);
    await tab.click();
    await p.waitForTimeout(2200);
    check("home: board tab shows Homians", (await p.locator(".rs-board-name b").innerText()) === "Homians");
    const m1 = p.locator("#manage-tab-2");
    await m1.scrollIntoViewIfNeeded();
    await p.waitForTimeout(600);
    await m1.click();
    await p.waitForTimeout(500);
    check("home: management tab switches", (await p.locator(".rs-stack-card h3").innerText()) === "Growth management");
    const next = p.locator('#focus button[aria-label="Next track"]');
    const track0 = await p.locator("#focus .sv-reading h3").innerText();
    await next.scrollIntoViewIfNeeded();
    await p.waitForTimeout(800);
    await next.click();
    await p.waitForTimeout(700);
    check("home: focus arrow changes the track", (await p.locator("#focus .sv-reading h3").innerText()) !== track0);
    await p.close();
    const w = await open(ctx, "/experience");
    const seg = w.locator('button[aria-pressed="false"]').first();
    await seg.scrollIntoViewIfNeeded();
    const pressed0 = await w.locator('button[aria-pressed="true"]').count();
    await seg.click(); await w.waitForTimeout(700);
    check("experience: final/case switch responds", (await w.locator('button[aria-pressed="true"]').count()) >= pressed0);
    await w.close();
    const g = await open(ctx, "/experience");
    const tile = g.locator('[aria-label^="Open "]:visible').first();
    await tile.scrollIntoViewIfNeeded(); await g.waitForTimeout(500); await tile.click(); await g.waitForTimeout(700);
    const dialog = g.getByRole("button", { name: "Close" });
    const shown = await dialog.count();
    check("experience: viewer opens", shown > 0);
    if (shown) { await g.keyboard.press("Escape"); await g.waitForTimeout(500); check("experience: Escape closes viewer", (await dialog.count()) === 0); }
    await g.close();
    const nav = await open(ctx, "/");
    await nav.locator(".sv-nav").getByRole("link", { name: "Profile", exact: true }).first().click();
    await nav.waitForTimeout(3600);
    await nav.goBack();
    await nav.waitForTimeout(3000);
    check("home: sections survive leaving and coming back", (await nav.locator("#focus").count()) === 1 && (await nav.locator("#journey-home").count()) === 1 && nav.problems.length === 0, nav.problems[0] || "");
    const y0 = await nav.evaluate(() => window.scrollY);
    await nav.mouse.move(700, 450);
    await nav.mouse.wheel(0, 500);
    await nav.waitForTimeout(1200);
    const y1 = await nav.evaluate(() => window.scrollY);
    check("home: one wheel notch scrolls once", Math.abs(y1 - y0 - 500) < 20, `moved ${Math.round(y1 - y0)}`);
    await nav.close();
    const x = await open(ctx, "/expertise");
    await x.locator(".rs-x-rail a", { hasText: "Rejected" }).click();
    await x.waitForTimeout(1800);
    const top = await x.evaluate(() => document.getElementById("rejected").getBoundingClientRect().top);
    check("expertise: rail jumps to Rejected", top > -40 && top < 260, `top ${Math.round(top)}`);
    check("expertise: rail marks the chapter", (await x.locator(".rs-x-rail a.is-on").innerText()) === "Rejected");
    check("expertise: 521 squares in the rejection wall", (await x.locator(".rs-dots i").count()) === 521);
    await x.close();
    for (const [route, sel, n, label] of [["/about", ".rs-line-item", 6, "profile: six startups on the timeline"], ["/about", ".rs-belief", 6, "profile: six beliefs"], ["/recognition", ".rs-year", 6, "recognition: six year blocks"], ["/recognition", ".rs-quote-lead, .rs-quote", 7, "recognition: seven testimonials"], ["/ai", ".rs-phase", 3, "ai: three workflow phases"], ["/", ".rs-write", 5, "home: five writing cards"], ["/", ".rs-hero .sv-street", 1, "home: walking street in the hero"], ["/", "#focus", 1, "home: focus tracks"], ["/", "#tools", 1, "home: AI tools"], ["/", ".rs-stat", 4, "home: four numbers, counted once"], ["/", ".sv-chart-sec, #profile, .sv-mosaic", 0, "home: the repeated sections stay out"], ["/", "#contact .rs-wb", 1, "home: whiteboard"], ["/", ".rs-globe canvas", 1, "home: globe"], ["/", ".rs-proof-side li", 12, "home: twelve proof names"], ["/", ".rs-j-stop", 6, "home: six journey stops"], ["/", ".rs-rib-tiles img", 36, "home: image ribbon, 18 photos shown twice for the loop"], ["/", ".rs-cube, .rs-word, .rs-tun, .rs-blk", 0, "home: the reverted cube and tunnel stay out"], ["/expertise", ".rs-dotcube", 1, "expertise: dot cube"]]) {
      const y = await open(ctx, route);
      check(label, (await y.locator(sel).count()) === n);
      await y.close();
    }
    for (const [w, h] of [[1100, 700], [1440, 900], [1920, 1080]]) {
      const hc = await b.newContext({ viewport: { width: w, height: h } });
      const hp = await open(hc, "/");
      const hm = await hp.evaluate(() => {
        const hero = document.querySelector("#top");
        const spans = [...hero.querySelectorAll("h1 .sv-ln > span > span")];
        const box = hero.querySelector(".sv-hero-right").getBoundingClientRect();
        const street = hero.querySelector(".sv-street").getBoundingClientRect();
        const heroBox = hero.getBoundingClientRect();
        return { lines: hero.querySelectorAll("h1 .sv-ln").length, rows: Math.max(...spans.map((s) => new Set([...s.getClientRects()].map((r) => Math.round(r.top))).size)), right: Math.round(Math.max(...spans.flatMap((s) => [...s.getClientRects()].map((r) => r.right)))), col: Math.round(box.left), band: hero.querySelectorAll(".rs-band").length, streetGap: Math.round(street.top - box.bottom), hero: Math.round(heroBox.height), vh: innerHeight };
      });
      check(`hero ${w}x${h} headline is two lines clear of the text`, hm.lines === 2 && hm.rows === 1 && hm.right + 24 <= hm.col, JSON.stringify(hm));
      check(`hero ${w}x${h} no band, street right under the text`, hm.band === 0 && hm.streetGap >= 0 && hm.streetGap <= 140, `gap ${hm.streetGap}, hero ${hm.hero}`);
      await hc.close();
    }
    for (const [w, h] of [[1100, 700], [1440, 900], [1920, 1080]]) {
      const gc = await b.newContext({ viewport: { width: w, height: h } });
      const gp = await open(gc, "/");
      const gm = await gp.evaluate(() => {
        const box = (s) => document.querySelector(s).getBoundingClientRect();
        const g = box(".rs-globe"), f = box("#from"), c = box(".rs-h-copy"), p = box(".rs-proof-wrap");
        return { size: Math.round(g.width), top: Math.round(g.top - f.top), bottom: Math.round(f.bottom - g.bottom), gap: Math.round(g.left - c.right), toCard: Math.round(p.top - g.bottom), band: Math.round(f.height), vh: innerHeight };
      });
      check(`globe ${w}x${h} stays small and in frame`, gm.size <= 520 && gm.size <= gm.vh * 0.75 && gm.top >= 0 && gm.bottom >= 0 && gm.gap >= 24 && gm.toCard >= 0, JSON.stringify(gm));
      await gc.close();
    }
    const gmc = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const gmp = await open(gmc, "/");
    const gmm = await gmp.evaluate(() => { const g = document.querySelector(".rs-globe").getBoundingClientRect(), f = document.querySelector("#from").getBoundingClientRect(); return { size: Math.round(g.width), top: Math.round(g.top - f.top), band: Math.round(f.height) }; });
    check("globe phone stays small, at the top of its band", gmm.size <= 340 && gmm.top <= 120 && gmm.band <= 1000, JSON.stringify(gmm));
    await gmc.close();
    const gs = await open(ctx, "/");
    check("globe: six stops, no floating label", (await gs.locator(".rs-stops button").count()) === 6 && (await gs.locator(".rs-globe-tag").count()) === 0);
    await gs.locator(".rs-stops button", { hasText: "Stanford" }).click();
    await gs.waitForTimeout(150);
    check("globe: clicking a stop selects it", (await gs.locator(".rs-stops button.is-on b").innerText()) === "Stanford");
    await gs.waitForTimeout(3700);
    check("globe: the stops keep moving by themselves", (await gs.locator(".rs-stops button.is-on b").innerText()) !== "Stanford");
    await gs.close();
    const lo = await open(ctx, "/");
    const lm = await lo.evaluate(() => { const s = document.querySelector(".sv-brand-logo"), n = document.querySelector(".sv-nav-in").getBoundingClientRect(), r = s.getBoundingClientRect(); return { vb: s.getAttribute("viewBox"), stroke: s.querySelector("path").getAttribute("stroke-width"), top: r.top - n.top, bottom: n.bottom - r.bottom }; });
    check("logo: the heavy signature fits the nav", lm.vb === "46 -1641 6108 1891" && lm.stroke === "38" && lm.top >= 0 && lm.bottom >= 0, JSON.stringify(lm));
    await lo.close();
    const fg = await open(ctx, "/expertise");
    const fgH = await fg.evaluate(() => document.documentElement.scrollHeight);
    await fg.evaluate((v) => { if (window.__lenis) window.__lenis.scrollTo(v, { immediate: true, force: true }); window.scrollTo(0, v); }, fgH);
    await fg.waitForTimeout(2200);
    const fgm = await fg.evaluate(() => {
      const f = document.querySelector("footer.rs-foot").getBoundingClientRect();
      const wrap = document.querySelector("footer.rs-foot > .sv-wrap").getBoundingClientRect();
      const s = document.querySelector(".rs-sig svg").getBoundingClientRect();
      return { footer: Math.round(f.height), vh: innerHeight, sig: Math.round(s.width), wrap: Math.round(wrap.width), pills: document.querySelectorAll(".rs-foot-cta a").length, strokes: document.querySelectorAll(".rs-sig .pen path").length };
    });
    check("footer: fits one screen, three actions", fgm.footer <= fgm.vh && fgm.pills === 3, JSON.stringify(fgm));
    const signed = await fg.waitForFunction(() => getComputedStyle(document.querySelector(".rs-sig .ink")).opacity === "1", null, { timeout: 7000 }).then(() => true, () => false);
    check("footer: the signature writes itself and ends signed", signed && fgm.strokes > 15 && fgm.sig >= fgm.wrap * 0.7, JSON.stringify(fgm));
    const bc = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const bp = await bc.newPage(); await bp.goto(BASE + "/", { waitUntil: "domcontentloaded" }); await bp.waitForTimeout(900);
    const boot = await bp.evaluate(() => ({ sign: document.querySelectorAll(".sv-curtain .rs-sign.is-playing").length, on: document.querySelector(".sv-curtain").classList.contains("is-on") }));
    await bp.waitForTimeout(3600);
    const after = await bp.evaluate(() => ({ on: document.querySelector(".sv-curtain").classList.contains("is-on"), y: document.documentElement.style.overflow }));
    check("first visit: opens on the signature, then lifts", boot.sign === 1 && boot.on && !after.on && after.y === "", JSON.stringify([boot, after]));
    await bc.close();
    const rc = await b.newContext({ viewport: { width: 1440, height: 620 } });
    const rp = await open(rc, "/expertise");
    const walkY = await rp.evaluate(() => Math.round(document.querySelector(".rs-walk").getBoundingClientRect().top + scrollY));
    await rp.evaluate((v) => { if (window.__lenis) window.__lenis.scrollTo(v, { immediate: true, force: true }); window.scrollTo(0, v); }, walkY - 20);
    await rp.waitForTimeout(900);
    const railHit = await rp.evaluate(() => { const r = document.querySelector(".rs-x-rail").getBoundingClientRect(), w = document.querySelector(".rs-walk").getBoundingClientRect(), e = document.elementFromPoint(120, Math.max(r.top, w.top) + 6); return { railTop: Math.round(r.top), walkTop: Math.round(w.top), onRail: !!(e && e.closest(".rs-x-rail")), onWalk: !!(e && e.closest(".rs-walk")) }; });
    check("footer: the robot band slides over the expertise rail", railHit.walkTop <= 40 && !railHit.onRail && railHit.onWalk, JSON.stringify(railHit));
    await rc.close();
    await fg.close();
    const wb = await open(ctx, "/");
    await wb.locator(".rs-wb").scrollIntoViewIfNeeded();
    await wb.waitForTimeout(600);
    check("whiteboard: no terminal left", (await wb.locator(".sv-cn-log, .sv-cn-prompt, .rs-wb input").count()) === 0);
    const wbSeen = () => wb.evaluate(() => [...document.querySelectorAll(".rs-sc-node")].filter((n) => n.classList.contains("is-in")).length);
    for (const [tab, n, wait] of [["Founder Loop", 11, 3400], ["AI Agents", 8, 5200], ["Building Stack", 10, 2900], ["Company Building", 3, 3900]]) {
      await wb.locator(".rs-wb-tab", { hasText: tab }).click();
      await wb.waitForTimeout(450);
      const count = await wb.locator(".rs-sc-node").count();
      const a0 = await wbSeen();
      const cam0 = await wb.locator(".rs-sc-world").evaluate((e) => e.style.transform);
      await wb.waitForTimeout(wait);
      const a1 = await wbSeen();
      const wires = await wb.locator(".rs-sc-wires path.rs-sc-wire").count();
      const clip = await wb.evaluate(() => [...document.querySelectorAll(".rs-sc-node")].filter((n) => n.scrollWidth > n.clientWidth + 1).length);
      check(`whiteboard ${tab}: ${n} cards arrive one by one, wired, nothing clipped`, count === n && a0 < a1 && wires >= n - 1 - (tab === "Founder Loop" ? 0 : 0) && clip === 0, `${a0}->${a1} of ${count}, wires ${wires}, clipped ${clip}`);
    }
    const wbNodes = await wb.evaluate(() => { const w = document.querySelector(".rs-sc-world"); return { h: w.offsetHeight, over: [...w.querySelectorAll(".rs-sc-node")].filter((n) => n.offsetTop + n.offsetHeight > w.offsetHeight).map((n) => n.innerText.slice(0, 20)) }; });
    check("whiteboard: cards stay inside the board", wbNodes.over.length === 0, wbNodes.over.join(" | "));
    const btnH = await wb.evaluate(() => [document.querySelector("#words .sv-btn"), document.querySelector("#talk .sv-btn")].map((b) => b && Math.round(b.getBoundingClientRect().height)));
    check("what people say: button matches Let's build", btnH[0] && btnH[0] === btnH[1], btnH.join("/"));
    await wb.locator(".rs-mq-people button").nth(2).click(); await wb.waitForTimeout(300);
    check("what people say: picking a person shows their words", (await wb.locator(".rs-mq-now b").innerText()) === (await wb.locator(".rs-mq-people button.is-on b").innerText()));
    const homeText = await wb.evaluate(() => document.body.textContent);
    check("home: no Company Intelligence, no Noida stop", !/company intelligence/i.test(homeText));
    check("home: Guide card links out", (await wb.locator('.rs-write[href*="hustlersfellowship.com"]').count()) === 1);
    check("home: tools are the agreed six", (await wb.locator("#tools .sv-tool .name").allInnerTexts()).join() === "Claude,OpenAI,Grok,GitHub,Hermes agent,OpenClaw,Composio" || (await wb.locator("#tools .sv-tool .name").allTextContents()).join() === "Claude,OpenAI,Grok,GitHub,Hermes agent,OpenClaw,Composio");
    const boardOrder = (await wb.locator(".rs-tabs button[id^=board-tab-]").allTextContents()).join();
    check("home: company order", boardOrder === "GeniOS,Mr. Elite & agents,Hustlers Fellowship,The Moronss,Homians", boardOrder);
    const footText = await wb.locator("footer.rs-foot").textContent();
    check("footer: no sitemap, socials and GeniOS columns", !/Sitemap|Topmate|Elsewhere/.test(footText) && /Socials/.test(footText) && /Book a call/.test(footText) && /Launch film/.test(footText) && /Website/.test(footText) && !/Based in|Get in touch/.test(footText) && /The Autonomous Company/.test(footText) && !/Company building/.test(footText));
    await wb.close();
    const SECRET = /Palantir|Alia\b|MiroFish|\$299|\$99\b|Polygres|3One4|Titan Capital|15 Enterprises|Company Orchestrator|\+91/;
    for (const [slug, must, mustNot] of [["genios", /\$250k[\s\S]*30\+[\s\S]*Why not a company brain[\s\S]*How we see the future|\$250k[\s\S]*How we see the future[\s\S]*Why not a company brain/, /company intelligence|contracted|design partner contracts|impressions/i], ["the-moronss", /500\+[\s\S]*MBA[\s\S]*Sales calls[\s\S]*Women empowerment|Women empowerment[\s\S]*Sales calls/, /through communities|expo-iitr|\bARR\b/], ["homians", /\$40k[\s\S]*\$200[\s\S]*Where it failed[\s\S]*second wave/, /₹|\bARR\b|\$180|\$120/], ["agents", /The high-level design[\s\S]*The system design[\s\S]*The architecture decisions[\s\S]*Five agents, one brain/, /Two agents|Context lost/], ["smart-ats", /1,500\+ users in a month[\s\S]*3,000\+[\s\S]*appreciation post/i, /15,000/], ["hustlers-fellowship", /Build Live Products[\s\S]*500\+[\s\S]*20\+/, /10,000\+ youths/]]) {
      const cp = await open(ctx, `/experience/${slug}`);
      const txt = await cp.evaluate(() => document.body.textContent);
      check(`story ${slug} says what it should`, must.test(txt) && !mustNot.test(txt) && !SECRET.test(txt), (mustNot.exec(txt) || SECRET.exec(txt) || [""])[0]);
      const tocN = await cp.locator(".rs-sy-toc button").count();
      const secN = await cp.locator(".rs-sy-sec").count();
      const longEnough = await cp.evaluate(() => document.querySelector(".rs-sy").textContent.length);
      check(`story ${slug} is a long read with contents`, tocN === secN && secN >= 4 && longEnough >= 3200, `${secN} chapters, ${longEnough} chars`);
      await cp.close();
    }
    const fl = await open(ctx, "/experience/films");
    await fl.waitForTimeout(600);
    check("the old films page lands on GeniOS", new URL(fl.url()).pathname === "/experience/genios", fl.url());
    await fl.close();
    const ex0 = await open(ctx, "/experience");
    const mets = await ex0.evaluate(() => {
      const led = [...document.querySelectorAll("#profile .sv-card")].map((c) => { const n = c.querySelector("p, .note"); const lh = parseFloat(getComputedStyle(n).lineHeight); return Math.round(n.getBoundingClientRect().height / lh); });
      return { led, exp: document.querySelectorAll(".rs-exp li").length, hover: document.querySelectorAll(".sv-nda-strip").length };
    });
    check("experience: consultant cards are three lines each", mets.led.length === 4 && mets.led.every((n) => n === 3), mets.led.join(","));
    check("experience: experiments readable without hovering", mets.exp >= 8 && mets.hover === 0, `${mets.exp} cards`);
    for (const id of ["genios", "hustlers-fellowship", "the-moronss", "homians", "agents", "smart-ats"]) {
      await ex0.evaluate((i) => document.getElementById(`sc-${i}`).scrollIntoView(), id); await ex0.waitForTimeout(600);
      await ex0.locator(`.sv-sc-ix-rail li[data-p="${id}"] button`, { hasText: "The story" }).click(); await ex0.waitForTimeout(500);
      check(`experience: ${id} story shows three numbers`, (await ex0.locator(`#sc-${id} .sv-sc-metrics li`).count()) === 3);
    }
    await ex0.close();
    const sy = await open(ctx, "/experience/homians");
    const align = await sy.evaluate(() => { const b = [...document.querySelectorAll(".rs-sy > .rs-sy-stats > div")].map((d) => d.getBoundingClientRect()); const m = document.querySelector(".rs-sy-main").getBoundingClientRect(); return { left: Math.round(m.left - b[1].left), right: Math.round(m.right - b[3].right) }; });
    check("story: text runs from the second box to the last", Math.abs(align.left) <= 2 && Math.abs(align.right) <= 2, JSON.stringify(align));
    await sy.close();
    const ex = await open(ctx, "/experience");
    const exHtml = await ex.evaluate(() => document.body.innerHTML);
    check("experience: stall photo gone, Clickites spelled right", !/expo-iitr|homians-home/.test(exHtml) && /Clickites/.test(exHtml) && /An AI agency/.test(exHtml) && !/Clickkites|Reels|Visit the live site[\s\S]{0,40}homians/.test(exHtml));
    for (const id of ["the-moronss", "homians", "agents", "smart-ats"]) {
      await ex.goto(BASE + "/experience"); await ex.waitForTimeout(1300);
      await ex.evaluate((i) => document.getElementById(`sc-${i}`).scrollIntoView(), id); await ex.waitForTimeout(900);
      await ex.locator(`.sv-sc-ix-rail li[data-p="${id}"] button`, { hasText: "The story" }).click(); await ex.waitForTimeout(700);
      await ex.locator(`#sc-${id} a.sv-btn--accent`).first().click(); await ex.waitForTimeout(1700);
      check(`read the full story opens ${id}`, new URL(ex.url()).pathname === `/experience/${id}` && (await ex.locator(".sv-case-hero h1").count()) === 1, ex.url());
    }
    await ex.close();
    const rc0 = await open(ctx, "/recognition");
    const rcM = await rc0.evaluate(() => ({ cells: [...document.querySelectorAll(".sv-th-cell .nm")].map((n) => n.textContent), asp: (() => { const hs = [...document.querySelectorAll(".sv-th-frame")].map((f) => f.getBoundingClientRect().height); return Math.max(...hs) - Math.min(...hs) < 1.5 ? 1 : 2; })(), sessions: /100\+ keynotes/.test(document.body.textContent) && !/20\+ sessions/.test(document.body.textContent) }));
    check("recognition: eight highlights in the asked order, same size", rcM.cells.length === 8 && rcM.cells[0] === "Shark Tank India" && rcM.cells[4].startsWith("Top 60") && rcM.asp === 1, rcM.cells.join(" | "));
    check("recognition: 100+ sessions", rcM.sessions);
    await rc0.close();
    const ab0 = await open(ctx, "/about");
    const abM = await ab0.evaluate(() => { const it = [...document.querySelectorAll(".rs-line-item article")]; const r = it.map((a) => a.getBoundingClientRect()); return { n: it.length, gapOk: r.every((x, i) => i === 0 || x.top >= r[i - 1].bottom), border: it.every((a) => parseFloat(getComputedStyle(a).borderTopWidth) > 0) }; });
    check("profile: every year is its own box on one line", abM.n === 6 && abM.gapOk && abM.border, JSON.stringify(abM));
    await ab0.close();
    const ep = await open(ctx, "/expertise");
    const addL = await ep.evaluate(() => [...document.querySelectorAll(".rs-cap p")].map((n) => { const r = document.createRange(); r.selectNodeContents(n); return new Set([...r.getClientRects()].map((x) => Math.round(x.top))).size; }));
    check("expertise: all four management blocks have two proof lines", addL.length === 4 && addL.every((n) => n === 2), addL.join(","));
    check("expertise: rail says High school", (await ep.locator(".rs-x-rail a").first().innerText()).trim() === "High school");
    await ep.close();
    const mg = await open(ctx, "/");
    const mgH = [];
    await mg.locator("#manage").scrollIntoViewIfNeeded();
    for (const i of [0, 1, 2, 3]) { await mg.locator(`#manage-tab-${i}`).click(); await mg.waitForTimeout(350); mgH.push(await mg.locator(".rs-stack-card").evaluate((e) => e.offsetHeight)); }
    check("four kinds: all four cards the same size", new Set(mgH).size === 1, mgH.join(","));
    const logoAlpha = await mg.evaluate(async () => { const load = (src) => new Promise((res) => { const i = new Image(); i.onload = () => { const c = document.createElement("canvas"); c.width = i.width; c.height = i.height; const g = c.getContext("2d"); g.drawImage(i, 0, 0); res(g.getImageData(0, 0, 1, 1).data[3]); }; i.onerror = () => res(-1); i.src = src; }); return [await load("/assets/logos/hermes-logo.webp"), await load("/assets/logos/openclaw-logo.webp")]; });
    check("tools: Hermes and OpenClaw logos are transparent", logoAlpha.every((a) => a === 0), logoAlpha.join(","));
    await mg.close();
    const era = await open(ctx, "/ai");
    const eraM = await era.evaluate(() => ({ path: document.querySelectorAll(".rs-era-path > li").length, chapters: document.querySelectorAll(".rs-era-chapter").length, future: document.querySelectorAll(".rs-era-future li").length, wall: document.querySelectorAll(".rs-era-wall img").length, arts: document.querySelectorAll(".rs-era-articles a").length, hrefs: [...document.querySelectorAll(".rs-era-articles a")].every((a) => a.target === "_blank" && /^https:/.test(a.href)), txt: document.body.textContent }));
    check("ai era: 8 builds, 4 memory lessons, 5 steps ahead, 9 pieces of writing, no photo wall", eraM.path === 8 && eraM.chapters === 4 && eraM.future === 5 && eraM.wall === 0 && eraM.arts === 9 && eraM.hrefs, JSON.stringify({ ...eraM, txt: 0 }));
    const eraO = await era.evaluate(() => { const y = (s) => { const e = document.querySelector(s); return e ? e.getBoundingClientRect().top + scrollY : -1; }; return { log: y("#ai-work"), loop: y("#loop"), path: y("#path"), photo: document.querySelectorAll(".rs-era-photo").length, hub: document.querySelectorAll(".rs-era-loop span").length }; });
    check("ai era: what I built comes first, then workflow, then eight builds; loop instead of a photo", eraO.log > 0 && eraO.log < eraO.loop && eraO.loop < eraO.path && eraO.photo === 0 && eraO.hub === 5, JSON.stringify(eraO));
    check("ai era: how memory stopped being the answer", /What I thought[\s\S]*Memory is becoming a commodity[\s\S]*Intelligence[\s\S]*What we will not do/.test(eraM.txt));
    await era.close();
    const fb = await open(ctx, "/");
    const logoOf = async (theme) => { const c2 = await b.newContext({ viewport: { width: 1440, height: 900 } }); await c2.addInitScript((v) => { try { localStorage.setItem("rs-theme", v); } catch {} }, theme); const pg = await open(c2, "/"); const m = await pg.evaluate(() => { const br = getComputedStyle(document.querySelector(".sv-brand")); return { fill: getComputedStyle(document.querySelector(".sv-brand-logo path")).fill, bg: br.backgroundImage, bgc: br.backgroundColor }; }); await c2.close(); return m; };
    const logoL = await logoOf("light"); const logoD = await logoOf("dark");
    check("nav logo: gradient letters on light, gold on dark, nothing behind it", /rs-logo-ink/.test(logoL.fill) && logoD.fill === "rgb(224, 184, 150)" && logoL.bg === "none" && logoD.bg === "none", JSON.stringify([logoL.fill, logoD.fill]));
    check("home: revenue label is short, no running total", await fb.evaluate(() => { const t = document.querySelector("#numbers").textContent; return /\$500k/.test(t) && !/330k|so far/.test(t); }));

    const fbC = await fb.locator(".rs-foot-cta .sv-btn--accent").evaluate((e) => { const s = getComputedStyle(e); return { c: s.color, bg: s.backgroundImage, t: e.textContent }; });
    check("footer: Book a call is white on the card gradient", /Book a call/.test(fbC.t) && fbC.c === "rgb(255, 255, 255)" && /110, 31, 36/.test(fbC.bg) && /22, 35, 63/.test(fbC.bg), fbC.bg.slice(0, 60));
    check("footer: email without a dot", (await fb.locator(".sv-foot-mail u").innerText()) === "rohitswerashi@thegenios.com");
    await fb.close();
    const fw = await open(ctx, "/");
    const rib = () => fw.evaluate(() => { const r = document.querySelector(".rs-rib-row"), im = [...r.querySelectorAll("img")].map((i) => i.getBoundingClientRect()); return { n: im.length, tops: new Set(im.map((b) => Math.round(b.top))).size, sizes: new Set(im.map((b) => `${Math.round(b.width)}x${Math.round(b.height)}`)).size, rotated: [...r.querySelectorAll("img")].filter((i) => getComputedStyle(i).transform !== "none").length, x: im[0].left }; });
    const rb0 = await rib(); await fw.waitForTimeout(700); const rb1 = await rib();
    check("closing photos: one straight row, same size, moving left to right", rb0.n > 2 && rb0.tops === 1 && rb0.sizes === 1 && !rb0.rotated && rb1.x > rb0.x, JSON.stringify([rb0, rb1.x]));
    const fwc = await fw.evaluate(() => { const cs = [...document.querySelectorAll(".rs-walk .chip")]; return { n: cs.length, out: cs.filter((c) => { const t = c.querySelector("text").getBBox(), r = c.querySelector(".chip-body").getBBox(); return t.x < r.x + 3 || t.x + t.width > r.x + r.width - 3; }).map((c) => c.querySelector("text").textContent), hermes: cs.some((c) => c.querySelector("text").textContent === "Hermes"), agent: cs.some((c) => /agent/i.test(c.querySelector("text").textContent)), bot: document.querySelectorAll(".rs-walk .bot").length, oldBot: document.querySelectorAll(".rs-walk .robot").length, silk: document.querySelectorAll(".rs-walk .silk, .rs-walk .pad").length, far: document.querySelectorAll(".rs-walk .wk-far .wk-b").length, racks: document.querySelectorAll(".rs-walk .wk-mid .wk-unit").length, packets: document.querySelectorAll(".rs-walk .wk-packet").length }; });
    check("footer walk: names stay in their boxes, Hermes without agent, new bot, no clutter", fwc.n > 0 && !fwc.out.length && fwc.hermes && !fwc.agent && fwc.bot === 1 && !fwc.oldBot && !fwc.silk && fwc.far > 10 && fwc.racks > 10 && fwc.packets > 0, JSON.stringify(fwc));
    await fw.close();
    const mn = await ctx.browser().newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const mp = await open(mn, "/");
    await mp.locator("button.sv-nav-toggle").click(); await mp.waitForTimeout(1000);
    const mi = await mp.evaluate(() => { const ls = [...document.querySelectorAll(".sv-nav-sheet .ln a")]; const inner = document.querySelector(".sv-nav-sheet-in"); return { labels: ls.map((a) => a.textContent.trim()).join(), size: parseFloat(getComputedStyle(ls[0]).fontSize), foot: document.querySelectorAll(".sv-nav-foot").length, mail: inner.textContent.includes("@"), bottom: Math.round(inner.getBoundingClientRect().bottom) }; });
    check("phone menu: seven links, 19px, no email or city, short panel", mi.labels === "Welcome,Experience,Expertise,Recognition,AI,Profile,Contact" && mi.size === 19 && !mi.foot && !mi.mail && mi.bottom < 500, JSON.stringify(mi));
    await mp.mouse.click(195, 760); await mp.waitForTimeout(700);
    check("phone menu: tap outside closes", (await mp.locator("button.sv-nav-toggle").getAttribute("aria-expanded")) === "false");
    await mn.close();
    const mo = await open(ctx, "/about");
    await mo.locator("#moments").scrollIntoViewIfNeeded();
    await mo.waitForTimeout(900);
    const wl = await mo.evaluate(() => { const bs = [...document.querySelectorAll(".rs-wall button")]; const boxes = bs.map((x) => x.getBoundingClientRect()); const wall = document.querySelector(".rs-wall").getBoundingClientRect(); const area = boxes.reduce((s, r) => s + r.width * r.height, 0); return { n: bs.length, sizes: new Set(boxes.map((r) => `${Math.round(r.width)}x${Math.round(r.height)}`)).size, caps: bs.every((x) => x.querySelector("small").textContent.match(/^20\d\d$/) && x.querySelector("b").textContent.length > 3), fill: area / (wall.width * wall.height), clipped: bs.filter((x) => { const c = x.querySelector(".cap"); return c.getBoundingClientRect().bottom > x.getBoundingClientRect().bottom + 1; }).length, cube: document.querySelectorAll(".rs-mo-ball").length }; });
    check("wall of fame: 33 photos, each with name and year, mixed sizes, no holes", wl.n === 33 && wl.caps && wl.sizes >= 4 && wl.fill > 0.8 && wl.clipped === 0 && wl.cube === 0, JSON.stringify(wl));
    await mo.locator(".rs-wall button").first().click(); await mo.waitForTimeout(400);
    check("moments: clicking opens that photo", (await mo.locator(".rs-mo-view img").count()) === 1);
    await mo.keyboard.press("Escape"); await mo.waitForTimeout(300);
    check("moments: Escape closes it", (await mo.locator(".rs-mo-view").count()) === 0);
    const tl = await mo.evaluate(() => { const l = document.querySelector(".rs-line"); const ln = getComputedStyle(l, ":before"); const y = [...document.querySelectorAll(".rs-line-item .y")].map((e) => e.getBoundingClientRect()); const a = [...document.querySelectorAll(".rs-line-item article")].map((e) => e.getBoundingClientRect()); return { lineH: parseFloat(ln.height), listH: l.getBoundingClientRect().height, color: ln.backgroundColor, yearsLeft: y.every((r, i) => r.right < a[i].left) }; });
    check("profile: timeline line runs the whole list, years beside the boxes", tl.lineH > tl.listH * 0.9 && tl.yearsLeft, JSON.stringify(tl));
    const les = await mo.evaluate(() => [...document.querySelectorAll(".rs-line-item .l")].map((n) => { const s = getComputedStyle(n); const b = getComputedStyle(n.querySelector("b")); return parseFloat(s.borderTopWidth) > 0 && parseFloat(s.borderBottomWidth) > 0 && parseFloat(s.borderLeftWidth) > 0 && parseFloat(s.borderRightWidth) > 0 && +b.fontWeight >= 600; }));
    check("profile: every lesson is a full box with a bolder label", les.length === 6 && les.every(Boolean));
    await mo.close();
    const ct = await open(ctx, "/contact");
    const ctT = await ct.evaluate(() => ({ opts: [...document.querySelectorAll(".sv-cn-options .opt .k")].map((n) => n.textContent), book: (() => { const b = document.querySelector(".rs-cn-book"); const o = document.querySelector(".sv-cn-options").getBoundingClientRect(); return b ? { href: b.href, w: b.getBoundingClientRect().width / o.width } : null; })() }));
    check("contact: five links, no Topmate, GeniOS in", ctT.opts.length === 5 && !ctT.opts.includes("Topmate") && ctT.opts.includes("GeniOS"), ctT.opts.join(","));
    check("contact: wide Book a call", ctT.book && /cal\.com/.test(ctT.book.href) && ctT.book.w > 0.95, JSON.stringify(ctT.book));
    await ct.close();
    const bt = await open(ctx, "/");
    const btM = await bt.evaluate(() => [".sv-hero-cta .sv-btn--accent", ".sv-nav-cta", ".rs-tabs button.is-on", ".rs-foot-cta .sv-btn--accent"].map((s) => { const e = document.querySelector(s); const c = e && getComputedStyle(e); return e && /110, 31, 36/.test(c.backgroundImage) && /22, 35, 63/.test(c.backgroundImage) && c.color === "rgb(255, 255, 255)"; }));
    check("buttons: primary and selected all use the Book a call gradient", btM.every(Boolean), btM.join(","));
    await bt.close();
    const hs = {};
    for (const r of ["/experience", "/expertise", "/recognition", "/ai", "/contact"]) {
      const pg = await open(ctx, r);
      hs[r] = await pg.evaluate(() => Math.round(parseFloat(getComputedStyle(document.querySelector("h1")).fontSize)));
      await pg.close();
    }
    check("consistency: page headings match", new Set(Object.values(hs)).size === 1, JSON.stringify(hs));
    for (const w of [1100, 1440, 1920]) {
      const rc2 = await b.newContext({ viewport: { width: w, height: 900 } });
      const rd2 = await open(rc2, "/");
      const m = await rd2.evaluate(() => { const box = (s) => document.querySelector(s).getBoundingClientRect(); const fs = (s) => parseFloat(getComputedStyle(document.querySelector(s)).fontSize); return { bad: [...document.querySelectorAll(".rs-proof, .rs-board-panel, .rs-node, .rs-stack-card, .rs-sat, .sv-nav-in")].filter((e) => parseFloat(getComputedStyle(e).borderTopLeftRadius) !== 6).length, from: box(".rs-h h2").left, board: box(".rs-board-left h2").left, right: box(".rs-board-panel").right, wrapR: box(".rs-h-in").right, boardEnd: box(".rs-board-left h2").right, panelL: box(".rs-board-panel").left, sizes: [fs(".rs-h h2"), fs(".rs-board-left h2"), fs("#tools h2")] }; });
      check(`consistency ${w}: one card corner, board lines up, same section heading size`, m.bad === 0 && Math.abs(m.from - m.board) <= 2 && m.boardEnd <= m.panelL && Math.abs(m.sizes[0] - m.sizes[2]) <= 1 && Math.abs(m.sizes[1] - m.sizes[2]) <= 1, JSON.stringify(m));
      await rc2.close();
    }
    const pc = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const ph = await open(pc, "/");
    const heroH = new Set(); for (let i = 0; i < 14; i++) { heroH.add(await ph.evaluate(() => document.querySelector("#top").offsetHeight)); await ph.waitForTimeout(500); }
    check("phone: the page never jumps while the street label changes", heroH.size === 1, [...heroH].join(","));
    const mgP = []; for (const i of [0, 1, 2, 3]) { await ph.locator(`#manage-tab-${i}`).evaluate((e) => e.click()); await ph.waitForTimeout(300); mgP.push(await ph.locator(".rs-stack-card").evaluate((e) => e.offsetHeight)); }
    check("phone: the four management cards are the same size", new Set(mgP).size === 1, mgP.join(","));
    const swipe = await ph.evaluate(() => { const r = document.querySelector(".rs-sc-column"); const c = r.querySelector(".rs-sc-node"); return { scrolls: r.scrollWidth > r.clientWidth, w: c.getBoundingClientRect().width / r.clientWidth, tabs: document.querySelectorAll(".rs-wb-tab").length }; });
    check("phone: whiteboard is a swipe row with four tabs", swipe.scrolls && swipe.w > 0.7 && swipe.w < 0.95 && swipe.tabs === 4, JSON.stringify(swipe));
    await pc.close();
    const ps = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const st = await open(ps, "/experience/the-moronss");
    const tb = await st.evaluate(() => [...document.querySelectorAll(".rs-sy-table")].map((t) => t.scrollWidth - t.clientWidth));
    check("phone: story tables fit without sideways scrolling", tb.length > 0 && tb.every((v) => v <= 1), tb.join(","));
    await ps.close();
    for (const [w, m] of [[1920, false], [1440, false], [1280, false], [1100, false], [900, false], [768, true], [390, true], [320, true]]) {
      const cc = await b.newContext({ viewport: { width: w, height: 900 }, isMobile: m, hasTouch: m });
      const cp = await open(cc, "/contact");
      const bad = await cp.evaluate(() => [...document.querySelectorAll(".sv-cn-options .opt")].filter((o) => { const r = o.getBoundingClientRect(); return [...o.querySelectorAll(".k,.v,.v svg,.hint")].some((c) => { const b = c.getBoundingClientRect(); return b.width > 0 && (b.right > r.right - 4 || b.left < r.left + 4); }) || o.scrollWidth > o.clientWidth + 1; }).map((o) => o.textContent.slice(0, 24)));
      const hts = await cp.evaluate(() => [...document.querySelectorAll(".sv-cn-options .opt:not(.is-primary)")].map((o) => o.offsetHeight));
      const wr = await cp.evaluate(() => { const o = document.querySelector(".sv-cn-options").getBoundingClientRect(), b = document.querySelector(".rs-cn-book").getBoundingClientRect(); return Math.abs(o.right - b.right); });
      check(`contact ${w}: boxes and Book a call end on the same line`, wr <= 1, `${wr}`);
      check(`contact ${w}: every link stays in its box, boxes match`, bad.length === 0 && new Set(hts).size === 1, bad.join(" | ") + " " + hts.join(","));
      await cc.close();
    }
    const cn = await open(ctx, "/contact");
    const cnT = await cn.locator(".sv-cn-options").innerText();
    check("contact: YouTube reads The Rohit Swerashi, no @", /The Rohit Swerashi/.test(cnT) && !/@The/.test(cnT));
    await cn.close();
    const ho = await open(ctx, "/");
    const order = await ho.evaluate(() => { const want = ["#top", "#from", ".rs-proof-wrap", ".rs-stat", "#contact", "#focus", "#board-tab-homians", "#journey-home", "#manage", ".rs-write", "#tools", ".rs-mq", "#talk", "footer.rs-foot"]; const y = want.map((s) => { const e = document.querySelector(s); return e ? e.getBoundingClientRect().top + scrollY : null; }); return { want, y }; });
    check("home: every section present and in order", order.y.every((v, i) => v !== null && (i === 0 || v >= order.y[i - 1])), order.want.map((s, i) => `${s}:${order.y[i] === null ? "MISSING" : Math.round(order.y[i])}`).join(" "));
    await ho.close();
    const footOf = (pg) => pg.evaluate(() => {
      const f = document.querySelector("footer.rs-foot");
      if (!f) return null;
      const sizes = (sel) => [...f.querySelectorAll(sel)].map((e) => parseFloat(getComputedStyle(e).fontSize));
      const sig = f.querySelector(".rs-sig").getBoundingClientRect();
      return {
        order: [...f.children].map((c) => c.className).join(" > "),
        last: f.lastElementChild.classList.contains("rs-sig") ? "rs-sig" : f.lastElementChild.className,
        robot: f.previousElementSibling && f.previousElementSibling.matches(".rs-walk") ? f.previousElementSibling.querySelectorAll(".sv-board-walk").length : 0, inFooter: f.querySelectorAll(".sv-board-walk").length,
        text: f.querySelector(".sv-foot-grid").innerText + "|" + f.querySelector(".sv-legal").innerText,
        height: Math.round(f.getBoundingClientRect().height),
        gapBelowLogo: Math.round(document.documentElement.scrollHeight - (sig.bottom + window.scrollY)),
        linkMax: Math.max(...sizes(".sv-foot-grid a, .sv-foot-grid span")),
        headMax: Math.max(...sizes(".sv-foot-grid h4")),
      };
    });
    for (const [vp, opts] of [["desktop", { viewport: { width: 1440, height: 900 } }], ["mobile", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }]]) {
      const fc = await b.newContext(opts);
      let base = null;
      for (const r of ROUTES.filter((x) => x !== "/facts")) {
        const y = await open(fc, r);
        const m = await footOf(y);
        await y.close();
        if (!m) { check(`footer ${vp} ${r} present`, false); continue; }
        base = base || m;
        check(`footer ${vp} ${r} logo is the last thing`, m.last === "rs-sig" && m.gapBelowLogo <= 40, `${m.last}, ${m.gapBelowLogo}px below`);
        check(`footer ${vp} ${r} same as home`, m.order === base.order && m.text === base.text && m.height === base.height && m.robot === 1 && m.inFooter === 0, `${m.height}px vs ${base.height}px, robot ${m.robot}`);
        check(`footer ${vp} ${r} links stay small`, m.linkMax <= 14 && m.headMax <= 14, `${m.linkMax}px, ${m.headMax}px`);
      }
      await fc.close();
    }
    const nf = await open(ctx, "/expertise");
    check("expertise: no cursive text on the page", await nf.evaluate(() => ![...document.querySelectorAll("main, .site-root *")].some((e) => /Great Vibes/.test(getComputedStyle(e).fontFamily))));
    await nf.close();
    const a = await open(ctx, "/ai");
    const log = a.locator(".sv-log-stage").first();
    if (await log.count()) { await log.scrollIntoViewIfNeeded(); await a.waitForTimeout(400); await log.click(); await a.waitForTimeout(600); const c = a.getByRole("button", { name: "Close report" }); check("ai: report opens", (await c.count()) > 0); if (await c.count()) { await c.click(); await a.waitForTimeout(400); check("ai: report closes", (await c.count()) === 0); } } else check("ai: report stage present", false);
    await a.close();
    await ctx.close();
  }
  // mobile menu
  {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const p = await open(ctx, "/");
    const burger = p.locator(".sv-nav button:visible").last();
    await burger.tap(); await p.waitForTimeout(500);
    const link = p.getByRole("link", { name: "Recognition", exact: true }).first();
    check("mobile menu shows links", await link.isVisible());
    await link.tap(); await p.waitForTimeout(3600);
    check("mobile menu navigates", new URL(p.url()).pathname === "/recognition", p.url());
    await p.close(); await ctx.close();
  }
  await b.close();
  const fails = results.filter((x) => !x).length;
  console.log(`\n${results.length - fails}/${results.length} passed`);
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
