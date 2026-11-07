import { Reveal, Lines, dimLines, Arrow } from "../../components/ui";
import { COPY } from "../../content/copy";

export function Ebook() {
  const a = COPY.about;
  const t = String(a.ebookCoverTitle || "")
    .split("/")
    .filter(Boolean);
  const c = a.ebookPoints || [];
  return (
    <section className="sv-wrap sv-pad sv-ebook" id="ebook" data-badge="Guides">
      <div className="sv-ebook-grid">
        <Reveal className="sv-ebook-plate">
          <div className="book" aria-hidden="true">
            <span className="pages" />
            <span className="cover">
              <span className="k">{a.ebookCoverKind}</span>
              <span className="ttl">
                {t.map((n, o) => (
                  <span key={o}>
                    {n}
                    {o < t.length - 1 && <br />}
                  </span>
                ))}
              </span>
              <span className="rule" />
              <span className="by">{a.ebookCoverBy}</span>
            </span>
            <span className="spine" />
          </div>
          <span className="shelf" aria-hidden="true" />
        </Reveal>
        <div className="sv-ebook-read">
          <Lines as="h2" lines={dimLines(a.ebookTitle)} />
          <Reveal as="p" className="sv-ebook-lead">
            {a.ebookLead}
          </Reveal>
          <Reveal as="ul" className="sv-ebook-points">
            {c.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </Reveal>
          <Reveal className="sv-ebook-cta">
            <a
              className="sv-btn sv-btn--accent"
              href={a.ebookHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {a.ebookCta}
              <Arrow />
            </a>
            <span className="note">{a.ebookNote}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
