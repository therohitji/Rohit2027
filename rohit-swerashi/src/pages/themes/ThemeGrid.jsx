import { Arrow } from "../../components/ui";
import { assetUrl } from "../../lib/asset";
import { h, ThemeBench } from "./ThemeBench";

export function ThemeGrid({ themes, cta, soon }) {
  return (
    <div className="sv-th" role="list">
      {themes.map((e, r) => (
        <a
          key={e.id}
          className="sv-th-cell"
          href={e.href}
          target="_blank"
          rel="noopener noreferrer"
          role="listitem"
          aria-label={`${e.name} · ${e.kind}. Opens ${h(e.href)} in a new tab`}
        >
          <span
            className="sv-th-frame"
            style={{
              aspectRatio: `${e.w} / ${e.h}`,
            }}
          >
            <img
              src={assetUrl(e.image)}
              alt={`${e.name} · theme preview`}
              width={e.w}
              height={e.h}
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </span>
          <span className="sv-th-cap">
            <span className="sv-th-meta">
              <span className="no">{String(r + 1).padStart(2, "0")}</span>
              <span className="host">{h(e.href)}</span>
            </span>
            <span className="nm">{e.name}</span>
            <span className="kd">{e.kind}</span>
            <span className="sp">{e.specs.join(" · ")}</span>
            <span className="go">
              {cta}
              <Arrow dir="ne" />
            </span>
          </span>
        </a>
      ))}
      {soon && themes.length < 3 && (
        <div
          className="sv-th-cell is-soon"
          role="listitem"
          aria-label={`${soon.name} · ${soon.cta}`}
        >
          <span
            className="sv-th-frame"
            style={{
              aspectRatio: themes[0] ? `${themes[0].w} / ${themes[0].h}` : "59 / 30",
            }}
          >
            <ThemeBench />
            <span className="tag">
              {"Plate "}
              {String(themes.length + 1).padStart(2, "0")}
              {" · in progress"}
            </span>
          </span>
          <span className="sv-th-cap">
            <span className="sv-th-meta">
              <span className="no">{String(themes.length + 1).padStart(2, "0")}</span>
            </span>
            <span className="nm">{soon.name}</span>
            <span className="kd">{soon.kind}</span>
            <span className="sp">{soon.specs}</span>
            <span className="go is-soon">{soon.cta}</span>
          </span>
        </div>
      )}
    </div>
  );
}
