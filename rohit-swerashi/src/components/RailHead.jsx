import { Lines, Reveal, Arrow } from "./ui";

export function RailHead({ title, sub, hero }) {
  return (
    <div className="sv-rail-head is-lifted">
      <div className="lede">
        <Lines as="h1" lines={title} />
      </div>
      <div className="aside">
        <Reveal as="p" className="sv-rail-lead">
          {sub}
        </Reveal>
        {(hero?.cta || hero?.secondary) && (
          <Reveal className="sv-rail-ctas">
            {hero.cta && (
              <a className="sv-btn sv-btn--accent" href={hero.cta.href}>
                {hero.cta.label}
                <Arrow dir="sw" />
              </a>
            )}
            {hero.secondary && (
              <a className="sv-btn sv-btn--ghost" href={hero.secondary.href}>
                {hero.secondary.label}
                <Arrow dir="sw" />
              </a>
            )}
          </Reveal>
        )}
      </div>
    </div>
  );
}
