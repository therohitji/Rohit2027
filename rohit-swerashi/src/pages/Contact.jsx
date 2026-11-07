import { Footer } from "../components/Footer";
import { SiteNav } from "../components/SiteNav";
import { Reveal, Lines, dimLines, Arrow } from "../components/ui";
import { COPY } from "../content/copy";
import { SITE } from "../content/site";
import { useTheme, useSmoothScroll } from "../lib/motion";
import { Door } from "./contact/Door";
import React from "react";

const NAMES = { LinkedIn: "Rohit Swerashi", X: "Rohit Swerashi", YouTube: "The Rohit Swerashi", GeniOS: "thegenios.com" };

const ts = () => SITE.socials.filter((a) => NAMES[a.label]).map((a) => [a.label, a.url, NAMES[a.label]]);

function Contact() {
  const [a, c] = useTheme();
  useSmoothScroll();
  const r = COPY.contact;
  const [l, t] = React.useState(false);
  const o = (x) => {
    var d;
    (d = navigator.clipboard) != null &&
      d.writeText &&
      (x.preventDefault(),
      navigator.clipboard
        .writeText(SITE.email)
        .then(() => {
          t(true);
          window.setTimeout(() => t(false), 1600);
        })
        .catch(() => {
          window.location.href = `mailto:${SITE.email}`;
        }));
  };
  return (
    <div className={`site-root sv-fill ${a ? "is-dark" : ""}`}>
      <SiteNav dark={a} onToggleDark={c} />
      <main className="sv-hero sv-cn-hero" id="top">
        <div className="sv-wrap sv-cn-content">
          <Reveal as="div" className="sv-page-meta">
            {"Contact · "}
            {SITE.location}
          </Reveal>
          <Lines as="h1" lines={dimLines(r.heroTitle)} />
          <Reveal as="p" className="sv-cn-sub">
            {r.heroSub}
          </Reveal>
          <Reveal className="sv-cn-options">
            <a
              className={`opt is-primary ${l ? "is-copied" : ""}`}
              href={`mailto:${SITE.email}`}
              onClick={o}
            >
              <span className="k">Email</span>
              <span className="v">{SITE.email}</span>
              <span className="hint" aria-hidden="true">
                {l ? "Copied" : "Copy"}
              </span>
            </a>
            {ts().map(([x, d, i]) => (
              <a key={x} className="opt" href={d} target="_blank" rel="noopener noreferrer">
                <span className="k">{x}</span>
                <span className="v">
                  {i} <Arrow />
                </span>
              </a>
            ))}
          </Reveal>
          <a className="sv-btn sv-btn--accent rs-cn-book" href="https://cal.com/rohitswerashi/genios" target="_blank" rel="noopener noreferrer">
            Book a call
            <small>30 min</small>
          </a>
          <Door />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Contact;
