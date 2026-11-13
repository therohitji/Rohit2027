import { BoardWalk } from "./BoardWalk";
import { SignOnView } from "./Signature";
import { WALK_TOOLS } from "../content/ai";
import { SITE } from "../content/site";
import { Arrow } from "./ui";
import { Link } from "react-router-dom";

const BOOK = "https://cal.com/rohitswerashi/genios";

const SOCIALS = ["LinkedIn", "X", "YouTube"];

const GENIOS = [
  ["Book a call", BOOK],
  ["Website", "https://thegenios.com"],
  ["Launch film", "https://www.youtube.com/watch?v=TBRYimZnkhk"],
];

// The same footer on every page, so it takes no props.
export function Footer() {
  const { email, availability, location, socials } = SITE;
  return (
    <>
      <section className="rs-walk" aria-label="Tools I work with">
        <div className="sv-wrap">
          <BoardWalk
            chips={WALK_TOOLS.map((name) => ({ name, role: "Daily kit" }))}
          />
        </div>
      </section>
      <footer className="sv-footer rs-foot">
        <div className="sv-wrap">
          <div className="rs-foot-top">
            <div className="sv-foot-grid">
              <div>
              <h4>Socials</h4>
              {socials
                .filter((i) => SOCIALS.includes(i.label))
                .map((i) => (
                  <a key={i.url} href={i.url} target="_blank" rel="noopener noreferrer">
                    {i.label} <Arrow />
                  </a>
                ))}
            </div>
            <div>
              <h4>GeniOS</h4>
              {GENIOS.map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer">
                  {label} <Arrow />
                </a>
              ))}
            </div>
            <div>
              <h4>Reach me</h4>
              <a className="sv-foot-mail" href={`mailto:${email}`}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                <u>{email}</u>
              </a>
              <span>{location}</span>
              <span>The Autonomous Company · GeniOS</span>
            </div>
          </div>
          <div className="rs-foot-cta">
              <a className="sv-btn sv-btn--accent" href={BOOK} target="_blank" rel="noopener noreferrer">
              Book a call <small>30 min</small>
            </a>
              <Link className="sv-btn sv-btn--ghost" to="/experience">
                See my work <small>Six startups</small>
              </Link>
              <Link className="sv-btn sv-btn--ghost is-mid" to="/about">
                Read my profile
              </Link>
            </div>
          </div>
          <div className="sv-legal">
            <span className="rs-foot-tag">{availability}</span>
            <span>
              {"© "}
              {new Date().getFullYear()}
              {" Rohit Swerashi · "}
              <Link to="/privacy">Privacy</Link>
            </span>
          </div>
        </div>
        <SignOnView className="rs-sig" />
      </footer>
    </>
  );
}
