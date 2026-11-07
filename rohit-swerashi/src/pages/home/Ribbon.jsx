import { Button, dimLines, Lines } from "../../components/ui";
import React from "react";

export function Ribbon({ title, sub, cta, ctaHref, images }) {
  return (
    <section className="rs-rib" id="talk">
      <div className="sv-wrap rs-rib-copy">
        <Lines as="h2" lines={dimLines(title)} />
        <p>{sub}</p>
        <Button href={ctaHref}>{cta}</Button>
      </div>
      <div className="rs-rib-tiles" aria-hidden="true">
        <div className="rs-rib-row" style={{ "--rs-rib-n": images.length }}>
          {[...images, ...images].map((s, i) => (
            <img key={i} src={s} alt="" decoding="async" />
          ))}
        </div>
      </div>
    </section>
  );
}
