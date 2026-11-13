import { Lines, dimLines, Reveal, Button } from "../../components/ui";
import { Street } from "./Street";
import { SignWhenShown } from "../../components/Signature";

export function Hero({ titleLines, sub, ctaLabel, ctaHref, cta2Label, cta2Href, brands }) {
  return (
    <header className="sv-hero rs-hero" id="top">
      <div className="sv-wrap">
        <div className="sv-hero-grid">
          <Lines as="h1" lines={dimLines(titleLines)} srPrefix="Rohit Swerashi:" />
          <Reveal className="sv-hero-right">
            <p>{sub}</p>
            <div className="rs-hero-act">
              <SignWhenShown className="rs-hero-sign" />
              <div className="sv-hero-cta">
                <Button href={ctaHref}>{ctaLabel}</Button>
                <Button href={cta2Href || "/about"} variant="ghost">
                  {cta2Label || "About me"}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
        <Street items={brands} variant="line" />
      </div>
    </header>
  );
}
