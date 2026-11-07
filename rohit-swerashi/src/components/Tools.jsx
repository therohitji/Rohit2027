import { SectionHead } from "./ui";
import { assetUrl } from "../lib/asset";
import { useStaggerReveal } from "../lib/motion";
import React from "react";

function ToolMark({ tool, className = "" }) {
  return (
    <span className={`sv-mark ${className}`}>
      {tool.kind === "ring" ? (
        <span className="ring" role="img" aria-label={`${tool.name} logo`} />
      ) : (
        <img
          src={assetUrl(`assets/logos/${tool.id}.${tool.ext || "webp"}`)}
          alt={`${tool.name} logo`}
          loading="eager"
          decoding="async"
          draggable={false}
          style={{
            opacity: tool.opt != null ? Math.min(1, tool.opt) : 1,
          }}
        />
      )}
    </span>
  );
}

export function Tools({ tools, title, sub }) {
  const o = React.useRef(null);
  useStaggerReveal(o, ".sv-tool", {
    from: 0.88,
    rise: 18,
    start: 0.9,
    span: 0.5,
    overlap: 0.7,
  });
  return (
    <section className="sv-wrap sv-pad" id="tools" data-badge="AI tools">
      <SectionHead lines={title} sub={sub} />
      <div className="sv-tools" ref={o}>
        {tools.map((r) => (
          <div key={r.id} className="sv-tool">
            <div className={`mark${r.wide ? " is-wide" : ""}`} style={r.bg ? { background: r.bg } : undefined}>
              <ToolMark tool={r} />
            </div>
            <span className="name">{r.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
