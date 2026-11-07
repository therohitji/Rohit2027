import { Reveal, Lines, Button } from "../../components/ui";
import { Whiteboard } from "./Whiteboard";

export function Outro({ email, sub, title, availability, workbench = true, signoff = true }) {
  return (
    <section className="sv-wrap sv-pad sv-outro" id="contact">
      {signoff && (
        <Reveal className="sv-signoff sv-ink-surface">
          <div className="head">
            <span className="fig">The sign-off</span>
          </div>
          <div className="sv-outro-grid">
            <Lines lines={title} />
            <div
              className="sv-hero-cta"
              style={{
                margin: 0,
              }}
            >
              <Button href={`mailto:${email}`}>{email}</Button>
              <Button href="/experience" variant="ghost">
                View selected work
              </Button>
            </div>
          </div>
          <p className="note">{sub}</p>
        </Reveal>
      )}
      {workbench && (
        <>
          <Whiteboard />
        </>
      )}
    </section>
  );
}
